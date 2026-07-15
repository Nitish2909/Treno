import express from "express";
import {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";
import { verifyToken } from "../middleware/auth.js";
import {
  validateCreateBooking,
  validateCancelBooking,
} from "../validators/bookingValidator.js";

const router = express.Router();

// All booking routes require authentication
router.use(verifyToken);

router.post("/", validateCreateBooking, createBooking);
router.get("/stats", getUserBookings);
router.get("/my-bookings",getUserBookings)
router.get("/:bookingId", getBookingById);
router.post("/:bookingId/cancel", validateCancelBooking, cancelBooking);

export default router;
