const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());
app.use(express.json());

// import all the routes

const products = require('./Routes/products');

app.use('/api/v1', products);

module.exports = app;
