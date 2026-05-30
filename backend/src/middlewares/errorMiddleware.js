import ApiError from '../utils/apiError.js';
import { env } from '../config/env.js';

const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // Transform native errors to standard ApiError instances
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, err.errors || [], err.stack);
  }

  // Log error using console.error
  console.error({
    message: error.message,
    statusCode: error.statusCode,
    errors: error.errors,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
  });

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  };

  res.status(error.statusCode).json(response);
};

export default errorMiddleware;
