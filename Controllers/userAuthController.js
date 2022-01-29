const mongoose = require('mongoose');
const User = require('../Modals/userModels');
const ErrrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');
const sendToken = require('../Utils/JwtToken');
const sendEmail = require('../Utils/sendEmail');

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

  sendToken(user, 200, res);
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

  sendToken(user, 200, res);
});

// Fotgot Password => /api/v1/password/forgot

exports.fotgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrrorHandler('User not Found with this email', 404));
  }

  // Get the reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'E-commerce Password Recovery',
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrrorHandler(error.message, 500));
  }
});

// LogOut User => api/v1/logOut

exports.logOutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logged Out',
  });
});
