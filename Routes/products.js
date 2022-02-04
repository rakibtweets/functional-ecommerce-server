const express = require('express');
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
} = require('../Controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/auth');
const router = express.Router();

// /api/v1/products
router.get('/products', isAuthenticatedUser, getProducts);

router.get('/product/:id', getSingleProduct);

router.post(
  '/admin/product/new',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  newProduct
);

//update product
router.put(
  '/admin/product/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateProduct
);
// delete product
router.delete(
  '/admin/product/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  deleteProduct
);

// Product Rating Update/Create
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/reviews', isAuthenticatedUser, getProductReviews);

module.exports = router;
