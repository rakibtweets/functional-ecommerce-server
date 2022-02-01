const express = require('express');
const router = express.Router();
const {
  newOrder,
  loginUserOrder,
  getSingleOrder,
} = require('../Controllers/orderController');

const { isAuthenticatedUser } = require('../Middlewares/auth');

// Order Routes
router.post('/order/new', isAuthenticatedUser, newOrder);
router.get('/order/:id', isAuthenticatedUser, getSingleOrder);
router.get('/orders/me', isAuthenticatedUser, loginUserOrder);

module.exports = router;
