const express = require('express');
const router = express.Router();
const {
  newOrder,
  loginUserOrder,
  getSingleOrder,
  getAllOrders,
  updateOrder,
} = require('../Controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../Middlewares/auth');

// Order Routes
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/me', isAuthenticatedUser, loginUserOrder);

//ADMIN Routes
router.get(
  '/admin/orders',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  getAllOrders
);
router.put(
  '/admin/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  updateOrder
);

module.exports = router;
