const express = require('express');
const { getProducts, newProduct } = require('../Controllers/productController');
const router = express.Router();

// /api/v1/products
router.get('/products', getProducts);

router.post('/product/new', newProduct);

module.exports = router;
