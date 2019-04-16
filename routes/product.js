const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();
router.get('/products', productController.getProducts);
router.post('/product', productController.createProduct);
router.delete('/product', productController.deleteProduct);
module.exports = router;