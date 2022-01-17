const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./Config/mongoDb');
const port = process.env.PORT || 5000;

//setting up config file
dotenv.config({ path: 'Config/config.env' });

// connecting to Database
connectDatabase();

app.listen(port, () => {
  console.log(
    `Server is running at port ${port} in ${process.env.NODE_ENV} mode`
  );
});
