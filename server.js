const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoute = require('./routes/product');
const key = require('./url');
const app = express();
const PORT =  8080;

const mongoDB_URI = `mongodb+srv://${key.mongoDB_User}:${key.mongoDB_Pwd}@cluster0-btzl5.mongodb.net/${key.mongoDB_DataBase}`;
const accesssLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'});
app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})
app.use(compression());
app.use(helmet());
app.use(morgan('combined', {stream:accesssLogStream}));
app.use('/', productRoute);

app.use((error, req, res, next)=>{
    res.status(error.statusCode).json({        
        status:error.status,
        message:error.message,
        errors:error.errors
    })
})

mongoose.connect(encodeURI(mongoDB_URI)).then(result => {   
    app.listen(PORT, ()=>{
        console.log(`Server Start in port ${PORT}`);
    })
}).catch(err =>console.log(err))