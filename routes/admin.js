const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);
//This will not receive any dynamic segment as it is a post request, data can be enclosed in the request we are sending

router.post('/delete-product', adminController.postDeleteProduct);
//Since it's a post request, we also don't need to enclose or encode any information in our url. We can put it in a request body instead.

module.exports = router;