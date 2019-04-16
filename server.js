const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoute = require('./routes/product');
const app = express();
const PORT =  8080;

const mongoDB_URI = `mongodb+srv://Ambika:Dec%401986@cluster0-btzl5.mongodb.net/Lavu_products`;
app.use(bodyParser.json());
app.use('/', productRoute)
mongoose.connect(encodeURI(mongoDB_URI)).then(result => {   
    app.listen(PORT, ()=>{
        console.log(`Server Start in port ${PORT}`);
    })
}).catch(err =>console.log(err))