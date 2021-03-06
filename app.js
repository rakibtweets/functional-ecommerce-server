const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: './Config/config.env' });

const errorMiddleware = require('./Middlewares/error');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// import all the routes

const products = require('./Routes/products');
const user = require('./Routes/userAuth');
const order = require('./Routes/order');
const payment = require('./Routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
