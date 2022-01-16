const express = require('express');
const {
  getProducts,
  newProduct,
  getSingleProduct,
} = require('../Controllers/productController');
const router = express.Router();

// /api/v1/products
router.get('/products', getProducts);

router.get('/product/:id', getSingleProduct);

router.post('/product/new', newProduct);

module.exports = router;
