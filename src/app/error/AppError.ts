class AppError extends Error {
  public statusCode: number;
  public errorType: string;
  constructor(
    statusCode: number,
    message: string,
    errorType?: string,
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType || "";

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
