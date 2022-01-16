const express = require('express');
const { getProducts } = require('../Controllers/productController');
const router = express.Router();

// /api/v1/products

router.get('/products', getProducts);

module.exports = router;
