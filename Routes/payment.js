const express = require('express');
const {
  processPayment,
  sendStripeApi,
} = require('../Controllers/paymentController');
const { isAuthenticatedUser } = require('../Middlewares/auth');
const router = express.Router();

router.post('/payment/process', isAuthenticatedUser, processPayment);
router.get('/paymentApi', isAuthenticatedUser, sendStripeApi);

module.exports = router;
