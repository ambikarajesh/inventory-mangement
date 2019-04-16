const Product = require('../models/product');

exports.createProduct = (req, res, next)=>{    
    const product = new Product({
        PRODUCT_NAME:req.body.PRODUCT_NAME,
        UPC:req.body.UPC,
        MANUFACTURER:req.body.MANUFACTURER,          
        QUANTITY_ON_HAND:req.body.QUANTITY_ON_HAND,
        STORAGE_LOCATION:req.body.STORAGE_LOCATION
        
    });
    product.save().then(result =>{
        res.status(201).json({
            status:"00",
            message: "Create Product Successfully",
            productId:result._id
        })
    }).catch(err=>{
        console.log(err);
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
        console.log(err)
    })
}

exports.deleteProduct = (req, res, next) => {
    Product.findOneAndRemove({UPC:req.body.UPC}).then(result=>{        
        if(result){
            res.status(204).json({
                status:'00',
                message:"Delete Product Successfully"
            })
        }else{
            res.status(404).json({
                status:'01',
                message:"Product is not found for Delete"
            })
        }  
        
    }).catch(err=>{
        console.log(err);
    })
}