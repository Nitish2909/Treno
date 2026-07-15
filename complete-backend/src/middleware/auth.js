import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * verifyToken – protects routes that require a logged-in user.
 * Reads bearer token from Authorization header or cookie.
 */
export const verifyToken = asyncHandler(async (req, _res, next) => {
  let token;

  // 1. Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Fallback to cookie
  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  console.log(token)
  if (!token) {
    throw ApiError.unauthorized("Access token is missing. Please log in.");
  }

  // 3. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Access token has expired. Please refresh your session.");
    }
    throw ApiError.unauthorized("Invalid access token.");
  }

  // 4. Load user from DB (ensure account still exists & is active)
  const user = await User.findById(decoded._id).select(
    "-password -refreshToken -passwordResetToken -passwordResetExpiry"
  );

  if (!user) {
    throw ApiError.unauthorized("User account not found or has been deleted.");
  }

  req.user = user;
  next();
});

/**
 * optionalAuth – attaches user to req if a valid token is present,
 * but does NOT throw if the token is absent/invalid.
 * Useful for public routes that may show extra data for logged-in users.
 */
export const optionalAuth = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token && req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select(
      "-password -refreshToken -passwordResetToken -passwordResetExpiry"
    );
    req.user = user || null;
  } catch {
    req.user = null;
  }

  next();
});
