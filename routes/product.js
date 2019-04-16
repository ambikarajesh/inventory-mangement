const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();
router.get('/products', productController.readProducts);
router.post('/product', productController.createProduct);
router.put('/product/inc-product', productController.increaseProduct);
router.put('/product/dec-product', productController.decreaseProduct);
router.delete('/product/:UPC', productController.deleteProduct);
router.put('/product/:UPC', productController.updateProduct);

module.exports = router;