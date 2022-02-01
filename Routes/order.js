const express = require('express');
const router = express.Router();
const { newOrder } = require('../Controllers/orderController');

const { isAuthenticatedUser } = require('../Middlewares/auth');

// Order Routes
router.post('/order/new', isAuthenticatedUser, newOrder);

module.exports = router;
