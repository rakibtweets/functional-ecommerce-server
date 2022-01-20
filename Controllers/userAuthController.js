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
