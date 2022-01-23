const express = require('express');
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./Middlewares/error');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import all the routes

const products = require('./Routes/products');
const user = require('./Routes/userAuth');

app.use('/api/v1', products);
app.use('/api/v1', user);

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
