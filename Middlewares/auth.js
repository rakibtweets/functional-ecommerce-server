const jwt = require('jsonwebtoken');
const User = require('../Modals/userModels');
const ErrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// checks the user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // finding token in res.cookies
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler('Login first to access this resource', 401));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

// authentication user roles (admin or user)
// handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log('~ req', req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
