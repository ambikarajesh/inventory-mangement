const bcrypt = require('bcrypt');
const User = require('../models/user');
const {validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
exports.putSignup = (req, res, next) =>{
    console.log(req.body)
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Invalid Email or Password.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    bcrypt.hash(req.body.password, 10).then(hashPassword => {   
        const user = new User({email:req.body.email, password:hashPassword, name:req.body.name});
        return user.save();      
    }).then(result =>{        
        res.status(201).json({
            'message':'signup successfully',
            userId:result._id
        })
    }).catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })  
}

exports.postLogin = (req, res, next) => {
    let loadUser;
    User.findOne({email:req.body.email}).then(user =>{
        if(!user){
            const error = new Error('Invalid User Name or Password');
            error.statusCode = 401;        
            throw error;
        }
        loadUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then((Equal)=>{
        if(!Equal){
            const error = new Error('Invalid User Name or Password');
            error.statusCode = 401;        
            throw error;
        }
        const token = jwt.sign({email:loadUser, userId:loadUser._id}, 'validkey', {expiresIn:'1h'});
        res.status(200).json({
            message:'login successfully',
            token:token,
            userId:loadUser._id.toString()
        })
    }).catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })  
}