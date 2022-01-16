const app = require('./app');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;

//setting up config file
dotenv.config({ path: 'Config/config.env' });



app.listen(port, () => {
  console.log(
    `Server is running at port ${port} in ${process.env.NODE_MODE} mode`
  );
});
