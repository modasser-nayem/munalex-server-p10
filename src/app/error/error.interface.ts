export type TErrorHandlerResponse = {
  statusCode: number;
  errorType: string;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};
