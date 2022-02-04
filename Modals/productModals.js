const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name'],
    trim: true,
    maxlength: [100, 'Product name cannot be exceed 100 character'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxlength: [5, 'Product price cannot be exceed 100 digit'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select category for product',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxlength: [5, 'Product name cannot exceed 5 character'],
    default: 0.0,
  },
  numOfReviews: {
    type: Number,
    default: 0.0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('product', productSchema);
