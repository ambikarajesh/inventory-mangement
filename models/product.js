const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    PRODUCT_NAME:{
        type:String,
        required:true
    },
    UPC:{
        type:Number,
        required:true
    },
    MANUFACTURER:{
        type:String,
        required:true
    },    
    QUANTITY_ON_HAND:{
        type:Number,
        required:true
    },
    STORAGE_LOCATION:{
        type:String,
        required:true
    },   
    LAST_ORDERED_AT:{
        type:Date,        
    }
}, {timestamps:true})

module.exports = mongoose.model('Product', ProductSchema);