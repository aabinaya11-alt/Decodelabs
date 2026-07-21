/**
 * Middleware: handles requests to routes that do not exist.
 * Should be registered AFTER all valid routes.
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

/**
 * Centralized error handling middleware.
 * Catches any error passed via next(error) from anywhere in the app,
 * including synchronous throws inside async route handlers that are
 * wrapped with the asyncHandler utility.
 *
 * Must be registered LAST, after all other middleware and routes.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  // Log the full error server-side for debugging purposes
  console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${message}`);
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
