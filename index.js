const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./Config/mongoDb');
const cloudinary = require('cloudinary').v2;
const port = process.env.PORT || 5000;

//setting up config file
dotenv.config({ path: 'Config/config.env' });

// handle uncaught excepion

process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.message} \n ${err.stack}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1);
});

// console.log(a); // reference error: uncaught error

// connecting to Database
connectDatabase();

//Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(port, () => {
  console.log(
    `Server is running at port ${port} in ${process.env.NODE_ENV} mode`
  );
});

// Handle unhandle Promise rejection

process.on('unhandledRejection', (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log('Shutting down the server due to unhandle promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
