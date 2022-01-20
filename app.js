const express = require('express');
const app = express();
const cors = require('cors');

const errorMiddleware = require('./Middlewares/error');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import all the routes

const products = require('./Routes/products');
const user = require('./Routes/userAuth');

app.use('/api/v1', products);
app.use('/api/v1', user);

//middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
