const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();
router.get('/products', productController.getProducts);
router.post('/product', productController.createProduct);
router.delete('/product/:productId', productController.deleteProduct);
router.put('/product/:productId', productController.updateProduct);

module.exports = router;