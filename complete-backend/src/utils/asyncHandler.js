/**
 * Async handler wrapper – eliminates try/catch boilerplate in route handlers.
 * Automatically forwards any errors thrown (or promise rejections) to Express's
 * next() error handler.
 *
 * @param {Function} fn - Async express route handler
 * @returns {Function}  - Wrapped handler 
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
