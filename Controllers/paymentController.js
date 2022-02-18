const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');

const stripe = require('stripe');
stripe(process.env.STRIPE_SECRET_KEY);

// process stripe payments => /api/v1/payment/process

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });
  res.status(200).json({
    success: true,
    client_Secret: paymentIntent.client_Secret,
  });
});

// Send stripe api key to front end => /api/v1/paymentApi

exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    success: true,
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});