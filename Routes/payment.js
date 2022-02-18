const express = require('express');
const { processPayment } = require('../Controllers/paymentController');
const { isAuthenticatedUser } = require('../Middlewares/auth');
const router = express.Router();

router.post('/payment/process', isAuthenticatedUser, processPayment);

module.exports = router;
