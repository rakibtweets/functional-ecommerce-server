const Product = require('../Modals/productModals');

const ErrorHandler = require('../Utils/errorHandler');
const catchAsyncErrors = require('../Middlewares/catchAsyncErrors');
const APIFeatures = require('../Utils/apiFeatures');

// create new product => /api/v1/admin/product/new

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  // current login user id
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all products => /api/v1/products
// get searched product => /api/v1/products?keyword=apple

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const searchQuery = req.query;
  const findProduct = Product.find();

  const resPerpage = 4; // product per page
  const productCount = await Product.countDocuments();
  const apiFeatures = new APIFeatures(findProduct, searchQuery)
    .search()
    .filter()
    .pagination(resPerpage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    productCount,
    count: products.length,
    products,
  });
});

//get single product => /api/v1/product/:id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product => /api/v1/admin/product/:id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const productBody = req.body;
  let product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  // update
  product = await Product.findByIdAndUpdate(id, productBody, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product=> /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404));
  }

  // remove product
  await product.remove();

  res.status(200).json({
    success: false,
    message: 'Product is deleted',
  });
});

//PRODUCT REVIEWS

// Create new reviews => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // if reviews exist => update
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    // if review doesn't exist => create and push reviews
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Product ratings
  product.ratings =
    product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All the reviews for specific product
//Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
