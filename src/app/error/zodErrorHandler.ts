import { ZodError } from "zod";
import { TErrorHandlerResponse } from "./error.interface";

const zodErrorHandler = (err: ZodError): TErrorHandlerResponse => {
  const errorType = "Validation Error";
  const message = "Please provide expected data";
  const error = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  return {
    statusCode: 400,
    errorType: errorType,
    message: message,
    error: error,
  };
};

export default zodErrorHandler;
