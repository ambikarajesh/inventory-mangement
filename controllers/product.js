const moment = require('moment');
const Product = require('../models/product');

exports.createProduct = (req, res, next)=>{    
    const product = new Product({
        PRODUCT_NAME:req.body.PRODUCT_NAME,
        UPC:req.body.UPC,
        MANUFACTURER:req.body.MANUFACTURER,          
        QUANTITY_ON_HAND:req.body.QUANTITY_ON_HAND,
        STORAGE_LOCATION:req.body.STORAGE_LOCATION,
        LAST_ORDERED_AT: orderDate()
    });
    product.save().then(result =>{
        res.status(201).json({
            status:"00",
            message: "Create Product Successfully",
            product:result
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;            
        }    
        next(err);
    })
       
}

exports.getProducts = (req, res, next) =>{
    Product.find().then(products=>{
        res.status(200).json({
            status:"00",
            message:'Fetch Products Successfully',
            products:products
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;            
        }    
        next(err);
    })
}

exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndRemove(req.params.productId).then(item=>{
            if(!item){
                const error = new Error("Product is not found for delete");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                status:'00',
                message:"Delete Product Successfully"
            })
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;            
            }    
            next(err);
        })  
}


exports.updateProduct = (req, res, next) =>{
    Product.findById(req.params.productId).then(item=>{
        if(!item){
            const error = new Error("Product is not found for update");
            error.statusCode = 404;
            throw error;
        }
        item.PRODUCT_NAME = req.body.PRODUCT_NAME;
        item.UPC = req.body.UPC;
        item.MANUFACTURER = req.body.MANUFACTURER;
        item.QUANTITY_ON_HAND = req.body.QUANTITY_ON_HAND;
        item.STORAGE_LOCATION = req.body.STORAGE_LOCATION;
        return item.save();
    }).then(result=>{
        res.status(200).json({
            status:'00',
            message:"Update Product Successfully",
            product:result
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;            
        }    
        next(err);
    })
}

const orderDate = ()=>{
    const date = new Date();
    const strDate = date.toLocaleDateString();
    const actualDate = moment(strDate, 'MM-DD-YYYY');
    const formatDate = actualDate.format('YYYY-MM-DD');
    const replaceStr = '/';
    return formatDate.replace(new RegExp(replaceStr, 'g'), '-');
}