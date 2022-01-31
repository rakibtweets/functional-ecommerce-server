const mongoose = require('mongoose');
const User = require('../Modals/userModels');
const ErrrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');
const sendToken = require('../Utils/JwtToken');
const sendEmail = require('../Utils/sendEmail');
const crypto = require('crypto');

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
  )}/api/v1/password/reset/${resetToken}`;

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

// Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // compare database
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrrorHandler('Password reset token is invalid or expired', 400)
    );
  }

  // check password
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrrorHandler('Password does not match', 400));
  }
  // setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// Get current logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update/Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // check old/previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrrorHandler('Old password is incorrect', 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatat: TODO

  // save update profile to database
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
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

// Admin Routes

// Get all users => /api/v1/admin/users

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  const totalUser = users.length;
  res.status(200).json({
    success: true,
    totalUser,
    users,
  });
});
