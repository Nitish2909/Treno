import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

/**
 * Global error handler middleware.
 * Must be registered with 4 parameters to be recognised by Express.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // ── Convert known error types to ApiError ────────────────────────────────

  // Mongoose – CastError (invalid ObjectId)
  if (err.name === "CastError") {
    error = new ApiError(
      400,
      `Invalid ${err.path}: "${err.value}" is not a valid ID.`
    );
  }

  // Mongoose – Duplicate key (unique constraint violation)
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    const value = err.keyValue?.[field];
    error = new ApiError(
      409,
      `Duplicate value: "${value}" already exists for field "${field}".`
    );
  }

  // Mongoose – Validation error
  else if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = new ApiError(422, "Validation failed", errors);
  }

  // JWT – Token errors
  else if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token. Please log in again.");
  }

  else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token has expired. Please log in again.");
  }

  // Multer – File too large
  else if (err.code === "LIMIT_FILE_SIZE") {
    error = new ApiError(400, "File size exceeds the allowed limit.");
  }

  else if (err.code === "LIMIT_UNEXPECTED_FILE") {
    error = new ApiError(400, "Unexpected file field in upload request.");
  }

  // ── Default: ensure it is an ApiError ────────────────────────────────────
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message =
      process.env.NODE_ENV === "production" && statusCode === 500
        ? "Internal Server Error"
        : error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error.errors || []);
  }

  // ── Log errors (not 4xx in production to reduce noise) ───────────────────
  if (process.env.NODE_ENV !== "production" || error.statusCode >= 500) {
    console.error(`[${new Date().toISOString()}] ERROR ${error.statusCode}: ${error.message}`);
    if (process.env.NODE_ENV === "development") {
      console.error(err.stack);
    }
  }

  // ── Send response ────────────────────────────────────────────────────────
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors?.length ? error.errors : undefined,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
