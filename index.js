const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./Config/mongoDb');
const port = process.env.PORT || 5000;

//setting up config file
dotenv.config({ path: 'Config/config.env' });

// connecting to Database
connectDatabase();

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
