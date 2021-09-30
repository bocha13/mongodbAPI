const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  console.log(err);

  if (err.name == "CastError") {
    const message = `Request not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicated keys
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    errir = new ErrorResponse(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(error.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message });
};

module.exports = errorHandler;
