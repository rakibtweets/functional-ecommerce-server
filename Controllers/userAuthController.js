const mongoose = require('mongoose');
const User = require('../Modals/userModels');
const ErrrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'products/61oXGZ60GfL_fixco9',
      url: 'https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg',
    },
  });

  const token = user.getJwtToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check email and password and is entered by user or not
  if (!email || !password) {
    return next(new ErrrorHandler('Please enter email and password', 400));
  }

  // findind user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrrorHandler('Invalid Email or Password', 401));
  }
  // check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrrorHandler('Invalid Email or Password', 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
