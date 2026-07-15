import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

// Controllers
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUserRole,
  deactivateUser,
  getRevenueStats,
  getBookingAnalytics,
} from "../controllers/adminController.js";

import {
  getAllBookings,
  updateBookingStatus,
  getBookingStats,
  getBookingById,
} from "../controllers/bookingController.js";

import {
  createTrip,
  updateTrip,
  deleteTrip,
  addStartDate,
  updateStartDate,
  uploadTripPDF,
} from "../controllers/tripController.js";

import {
  createBlog,
  getAllAdminBlogs,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import {
  approveReview,
  addReviewResponse,
} from "../controllers/reviewController.js";

import {
  refundPayment,
} from "../controllers/paymentController.js";

// Middleware
import { uploadTripImages, uploadBlogImages, uploadSingleImage, uploadTripPDF as uploadTripPDFMiddleware } from "../middleware/upload.js";
import { validateCreateTrip, validateUpdateTrip } from "../validators/tripValidator.js";
import { authLimiter } from "./authRoutes.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post('/auth/login',authLimiter,adminLogin)

// All admin routes require authentication + admin role
router.use(verifyToken, isAdmin);


//  Dashboard 
router.get("/dashboard/stats", getDashboardStats);

//  Analytics 
router.get("/dashboard/revenue", getRevenueStats);
router.get("/dashboard/booking-analytics", getBookingAnalytics);

//  Users 
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/deactivate", deactivateUser);

//  Bookings 
router.get("/bookings", getAllBookings);
router.get("/bookings/stats", getBookingStats);
router.get("/bookings/:bookingId", getBookingById);
router.patch("/bookings/:bookingId/status", updateBookingStatus);

//  Trips 
router.post("/trips", uploadTripImages, validateCreateTrip, createTrip);
router.put("/trips/:id", uploadTripImages, validateUpdateTrip, updateTrip);
router.delete("/trips/:id", deleteTrip);
router.post("/trips/:id/start-dates", addStartDate);
router.put("/trips/:id/start-dates/:dateIndex", updateStartDate);
router.post("/trips/:id/pdf", uploadTripPDFMiddleware, uploadTripPDF);

//  Categories 
router.get("/categories", getAllCategories);
router.post("/categories", uploadSingleImage("image"), createCategory);
router.put("/categories/:id", uploadSingleImage("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

//  Blogs
router.get("/blogs", getAllAdminBlogs);
router.post("/blogs", uploadBlogImages, createBlog);
router.put("/blogs/:id", uploadBlogImages, updateBlog);
router.delete("/blogs/:id", deleteBlog);

//  Reviews 
router.patch("/reviews/:id/approve", approveReview);
router.post("/reviews/:id/response", addReviewResponse);

//  Payments 
router.post("/payments/:paymentId/refund", refundPayment);

export default router;
