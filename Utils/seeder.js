const Product = require('../Modals/productModals');
const dotenv = require('dotenv');
const connectDatabase = require('../Config/mongoDb');

const products = require('../data/product.json');

// setting the dotEnv file

dotenv.config({ path: 'Config/config.env' });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted');
    await Product.insertMany(products);
    console.log('All Products are added.');

    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

seedProducts();
