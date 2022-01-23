// checks the user is authenticated or not
const jwt = require('jsonwebtoken');
const User = require('../Modals/userModels');
const ErrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // finding cookies on res.cookies

  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler('Login first to access this resource', 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});
