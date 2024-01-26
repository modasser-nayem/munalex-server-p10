import { ErrorRequestHandler } from "express";
import config from "../config";
import { ZodError } from "zod";
import zodErrorHandler from "../error/zodErrorHandler";
import duplicateErrorHandler from "../error/duplicateErrorHandler";
import AppError from "../error/AppError";

const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = err.message || "Something went wrong!";
  let statusCode = err.statusCode || 500;
  let errorType = err.errorType || "Server Error";
  let error = err || {};
  let stack = err.stack || "";

  if (err instanceof ZodError) {
    const result = zodErrorHandler(err);
    statusCode = result.statusCode;
    errorType = result.errorType;
    message = result.message;
    error = result.error;
  } else if (err.code === 11000) {
    const result = duplicateErrorHandler(err);
    statusCode = result.statusCode;
    errorType = result.errorType;
    message = result.message;
    error = result.error;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    if (err.errorType) {
      errorType = err.errorType;
    } else {
      errorType =
        statusCode === 400
          ? "Bad Request"
          : statusCode === 404
            ? "Not Found"
            : statusCode === 401
              ? "Unauthorized Access"
              : statusCode === 403
                ? "Forbidden Access"
                : statusCode === 500
                  ? "Server Error"
                  : "Something went wrong";
    }
    message = err.message;
    error = {};
  }

  res.status(statusCode).json({
    success: false,
    error_type: errorType,
    message: message,
    error: error,
    stack: config.node_env === "development" ? stack : null,
  });
};

export default globalErrorhandler;
