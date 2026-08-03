/**
 * Custom API Error class
 * Extends the native Error with statusCode and structured errors array
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode  - HTTP status code
   * @param {string} message     - Error message
   * @param {Array}  errors      - Additional error details (validation errors, etc.)
   * @param {string} stack       - Optional custom stack trace
   */
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // ── Convenience static factories 

  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static unprocessable(message = "Unprocessable Entity", errors = []) {
    return new ApiError(422, message, errors);
  }

  static tooMany(message = "Too many requests") {
    return new ApiError(429, message);
  }

  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
