const Product = require('../Modals/productModals');

// create new product => /api/v1/admin/product/new

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//get all products => /api/v1/products
exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//get single product => /api/v1/product/:id

exports.getSingleProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product Not found',
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

// Update product => /api/v1/admin/product/:id

exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const productBody = req.body;
  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product Not found',
    });
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
};

// Delete Product=> /api/v1/admin/product/:id

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product Not found',
    });
  }

  // remove product
  await product.remove();

  res.status(200).json({
    success: false,
    message: 'Product is deleted',
  });
};
