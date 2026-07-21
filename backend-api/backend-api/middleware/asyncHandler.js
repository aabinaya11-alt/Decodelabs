/**
 * Wraps an async route handler/controller function and forwards any
 * thrown error to Express's next() function, so it reaches our
 * centralized error handling middleware instead of crashing the app.
 *
 * Usage:
 *   router.get("/", asyncHandler(itemController.getAllItems));
 *
 * @param {Function} fn - async (req, res, next) => {...}
 * @returns {Function} wrapped middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
