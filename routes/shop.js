const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);
//If we have another route like /products/delete (i.e a normal route and not a dynamic segment), the order does matter. If we place products/delete below the above one, the code gets parsed from top to bottom and if we did this type of ordering we will never reach that route since express js will fire it at that dynamic route(bcz delete will be treated as a dynamic segment).
//So if we have a dynamic segment and a specific route, we will need to put the more specific route above the dynamic one. So that the /products/delete/ will handle the request and there after it will not continue to the dynamic one bcz we don't fire next but if we have something that does not go into /products/delete then it will go into the dynamic route

router.get('/cart', shopController.getCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);
//We add this here bcz it is a customer action, our customers will manage the cart.

router.post('/cart', shopController.postCart);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;