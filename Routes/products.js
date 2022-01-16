const express = require('express');
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require('../Controllers/productController');
const router = express.Router();

// /api/v1/products
router.get('/products', getProducts);

router.get('/product/:id', getSingleProduct);

router.post('/admin/product/new', newProduct);

//update product
router.put('/admin/product/:id', updateProduct);

module.exports = router;
