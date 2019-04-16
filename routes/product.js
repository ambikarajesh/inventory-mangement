const express = require('express');
const {check} = require('express-validator/check');
const productController = require('../controllers/product');
const router = express.Router();
router.get('/products', productController.readProducts);
router.get('/product', productController.readProduct);
router.post('/product', [
                            check('PRODUCT_NAME').trim().isLength({ min: 5 }).withMessage('PRODUCT_NAME must be at least 5 chars long'),
                            check('UPC', "Invalid UPC").isInt(),
                            check('MANUFACTURER').trim().isLength({ min: 5 }).withMessage('MANUFACTURER must be at least 5 chars long'),
                            check('QUANTITY_ON_HAND', "Invalid QUANTITY_ON_HAND").isInt(),
                            check('STORAGE_LOCATION').isLength({ min: 5 }).withMessage('STORAGE_LOCATION must be at least 5 chars long'),
                        ], productController.createProduct);
router.put('/product/inc-product', [
                                        check('UPC', "Invalid UPC").isInt(),
                                        check('QUANTITY', "Invalid QUANTITY").isInt()
                                    ], productController.increaseProduct);
router.put('/product/dec-product', [
                                        check('UPC', "Invalid UPC").isInt(),
                                        check('QUANTITY', "Invalid QUANTITY").isInt()
                                    ], productController.decreaseProduct);
router.delete('/product/:UPC', productController.deleteProduct);
router.put('/product/:UPC',[
                                check('PRODUCT_NAME').trim().isLength({ min: 5 }).withMessage('PRODUCT_NAME must be at least 5 chars long'),
                                check('UPC', "Invalid UPC").isInt(),
                                check('MANUFACTURER').trim().isLength({ min: 5 }).withMessage('MANUFACTURER must be at least 5 chars long'),
                                check('QUANTITY_ON_HAND', "Invalid QUANTITY_ON_HAND").isInt(),
                                check('STORAGE_LOCATION').isLength({ min: 5 }).withMessage('STORAGE_LOCATION must be at least 5 chars long'),
                            ], productController.updateProduct);

module.exports = router;