import crypto from "crypto";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/emailService.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { deleteTempFile } from "../utils/fileCleanup.js";
import { config } from "dotenv";
config()

//  Helpers 
export const generateTokens = async (user) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
};

export const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest("Validation failed", errors.array());
  }
};

// Controllers 

/**
 * POST /api/v1/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("An account with this email already exists.");
  }

  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const user = await User.create({
    name,
    email,
    password,
    phone,
    emailVerificationToken: crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex"),
    emailVerificationExpiry: verificationExpiry,
  });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  await sendEmail(email, "verifyEmail", { name, verificationUrl });
  await sendEmail(email, "welcome", { name });

  return new ApiResponse(
    201,
    { userId: user._id, email: user.email },
    "Registration successful. Please check your email to verify your account."
  ).send(res);
});

/**
 * POST /api/v1/auth/verify-email/:token
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) throw ApiError.badRequest("Verification token is required.");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpiry");

  if (!user) {
    throw ApiError.badRequest("Invalid or expired verification token. Please request a new one.");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  return new ApiResponse(200, null, "Email verified successfully. You can now log in.").send(res);
});

/**
 * POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  if (!user.isActive) {
    throw ApiError.forbidden("Your account has been deactivated. Please contact support.");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const userData = user.toPublicJSON();

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...cookieOptions })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(
      new ApiResponse(200, { user: userData, accessToken, refreshToken }, "Login successful.")
    );
});

/**
 * POST /api/v1/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Logged out successfully."));
});

/**
 * POST /api/v1/auth/refresh
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

    console.log(incomingToken)
  if (!incomingToken) {
    throw ApiError.unauthorized("Refresh token is missing.");
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token. Please log in again.");
  }

  const user = await User.findById(decoded._id).select("+refreshToken");
  if (!user || user.refreshToken !== incomingToken) {
    throw ApiError.unauthorized("Refresh token is invalid or has been revoked.");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15* 60 * 1000 })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed."));
});

/**
 * POST /api/v1/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always return success to prevent email enumeration
  if (!user) {
    return new ApiResponse(
      200,
      null,
      "If an account with that email exists, a password reset link has been sent."
    ).send(res);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.passwordResetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail(email, "forgotPassword", { name: user.name, resetUrl });

  return new ApiResponse(
    200,
    null,
    "Password reset link has been sent to your email address."
  ).send(res);
});

/**
 * POST /api/v1/auth/reset-password/:token
 */
export const resetPassword = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { token } = req.params;
  const { password } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiry: { $gt: Date.now() },
  }).select("+passwordResetToken +passwordResetExpiry");

  if (!user) {
    throw ApiError.badRequest("Invalid or expired password reset token. Please request a new one.");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  user.refreshToken = undefined; // Invalidate all sessions
  await user.save();

  return new ApiResponse(200, null, "Password reset successful. Please log in with your new password.").send(res);
});

/**
 * GET /api/v1/auth/profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "title slug thumbnail price duration type",
  });

  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, user.toPublicJSON(), "Profile fetched successfully.").send(res);
});

/**
 * PUT /api/v1/auth/profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const user = await User.findById(req.user._id);
  if (!user) throw ApiError.notFound("User not found.");

  const { name, phone } = req.body;

  if (name) user.name = name;
  if (phone) user.phone = phone;

  // Handle avatar upload
  if (req.file) {
    // Delete old avatar from cloudinary if exists
    if (user.avatar?.public_id) {
      await deleteFromCloudinary(user.avatar.public_id);
    }

    const result = await uploadToCloudinary(req.file.path, "Treno/avatars", {
      transformation: [{ width: 300, height: 300, crop: "fill", gravity: "face" }],
    });

    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    // Delete temp file after successful upload
    deleteTempFile(req.file.path);
  }

  await user.save({ validateBeforeSave: false });

  return new ApiResponse(200, user.toPublicJSON(), "Profile updated successfully.").send(res);
});

/**
 * PUT /api/v1/auth/change-password
 */
export const changePassword = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw ApiError.notFound("User not found.");

  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw ApiError.badRequest("Current password is incorrect.");
  }

  user.password = newPassword;
  user.refreshToken = undefined; // Invalidate all sessions
  await user.save();

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "Password changed successfully. Please log in again."));
});

/**
 * GET /api/v1/auth/wishlist
 */
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    select: "title slug thumbnail price duration type averageRating totalReviews isFeatured",
    match: { isActive: true },
  });

  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, user.wishlist, "Wishlist fetched successfully.").send(res);
});

/**
 * POST /api/v1/auth/wishlist/toggle/:tripId
 */
export const toggleWishlist = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) throw ApiError.notFound("User not found.");

  const wishlistIndex = user.wishlist.findIndex(
    (id) => id.toString() === tripId
  );

  let message;
  if (wishlistIndex === -1) {
    user.wishlist.push(tripId);
    message = "Trip added to wishlist.";
  } else {
    user.wishlist.splice(wishlistIndex, 1);
    message = "Trip removed from wishlist.";
  }

  await user.save({ validateBeforeSave: false });

  return new ApiResponse(
    200,
    { inWishlist: wishlistIndex === -1, wishlistCount: user.wishlist.length },
    message
  ).send(res);
});
