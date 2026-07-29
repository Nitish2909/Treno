import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
  getWishlist,
  toggleWishlist,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";
import {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
} from "../validators/authValidator.js";
import { uploadAvatar } from "../middleware/upload.js";


const router = express.Router();

// ── Auth-specific rate limiter (5 requests / hour) ────────────────────────────
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again after 1 hour.",
  },
  skip: (req) => process.env.NODE_ENV === "development",
});

// ── Public routes ─────────────────────────────────────────────────────────────
router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);
router.post("/refresh-token", refreshAccessToken);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", authLimiter, validateForgotPassword, forgotPassword);
router.post("/reset-password/:token", authLimiter, validateResetPassword, resetPassword);

// ── Protected routes ──────────────────────────────────────────────────────────
router.use(verifyToken);

router.get("/profile", getProfile);
router.put("/profile", uploadAvatar, validateUpdateProfile, updateProfile);
router.put("/change-password", validateChangePassword, changePassword);
router.post("/logout", logout);

// Wishlist
router.get("/wishlist", getWishlist);
router.post("/wishlist/toggle/:tripId", toggleWishlist);

export default router;
