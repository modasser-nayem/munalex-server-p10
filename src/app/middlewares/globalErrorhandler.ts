import { ErrorRequestHandler } from "express";
import config from "../config";

const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = err.message || "Something went wrong!";
  let statusCode = err.statusCode || 500;
  let errorType = err.errorType || "Server Error";
  let error = err;
  let stack = err.stack;

  res.status(statusCode).json({
    success: false,
    error_type: errorType,
    message: message,
    error: error,
    stack: config.node_env === "development" ? stack : null,
  });
};

export default globalErrorhandler;
