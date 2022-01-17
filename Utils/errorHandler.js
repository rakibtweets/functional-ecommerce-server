// error handler class

// error is the parent class of errrHandler

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
//super represent the constructor of the parent class

module.exports = ErrorHandler;
