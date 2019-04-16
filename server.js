const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoute = require('./routes/product');
const app = express();
const PORT =  8080;

const mongoDB_URI = `mongodb+srv://Ambika:Dec%401986@cluster0-btzl5.mongodb.net/Lavu_products`;
app.use(bodyParser.json());
app.use('/', productRoute);

app.use((error, req, res, next)=>{
    res.status(error.statusCode).json({
        status:error.status,
        message:error.message
    })
})

mongoose.connect(encodeURI(mongoDB_URI)).then(result => {   
    app.listen(PORT, ()=>{
        console.log(`Server Start in port ${PORT}`);
    })
}).catch(err =>console.log(err))