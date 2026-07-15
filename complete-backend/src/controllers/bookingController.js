import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/emailService.js";
import razorpay from "../config/razorpay.js";

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest("Validation failed", errors.array());
  }
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Calculate refund amount based on days until trip start
 */
const calculateRefundAmount = (booking, trip) => {
  const now = new Date();
  const startDate = new Date(booking.startDate);
  const daysUntilTrip = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));

  if (daysUntilTrip >= 30) return booking.finalAmount; // 100% refund
  if (daysUntilTrip >= 15) return Math.round(booking.finalAmount * 0.75); // 75% refund
  if (daysUntilTrip >= 7) return Math.round(booking.finalAmount * 0.5); // 50% refund
  if (daysUntilTrip >= 3) return Math.round(booking.finalAmount * 0.25); // 25% refund
  return 0; // No refund within 3 days
};

// ── Controllers ───────────────────────────────────────────────────────────────

/**
 * POST /api/v1/bookings
 */
export const createBooking = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const {
    tripId,
    startDate,
    passengers,
    emergencyContact,
    specialRequirements,
    couponCode,
  } = req.body;

  // Fetch trip
  const trip = await Trip.findOne({ _id: tripId, isActive: true });
  if (!trip) throw ApiError.notFound("Trip not found or is no longer available.");

  // Validate start date availability
  const requestedDate = new Date(startDate);
  const startDateEntry = trip.startDates.find(
    (sd) =>
      sd.available &&
      new Date(sd.date).toDateString() === requestedDate.toDateString()
  );

  if (trip.startDates.length > 0 && !startDateEntry) {
    throw ApiError.badRequest("Selected start date is not available for this trip.");
  }

  // Check slot availability
  if (startDateEntry && startDateEntry.slots < passengers.length) {
    throw ApiError.badRequest(
      `Only ${startDateEntry.slots} slot(s) available for this date.`
    );
  }

  // Check group size limits
  if (passengers.length > trip.groupSize.max) {
    throw ApiError.badRequest(
      `Maximum group size for this trip is ${trip.groupSize.max}.`
    );
  }

  // Price calculation
  const effectivePrice = trip.price.discounted || trip.price.original;
  const totalAmount = effectivePrice * passengers.length;

  let discountAmount = 0;
  // TODO: Apply coupon logic if needed
  const finalAmount = totalAmount - discountAmount;

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: finalAmount * 100, // in paise
    currency: trip.price.currency || "INR",
    receipt: `WO-${Date.now()}`,
    notes: {
      tripId: trip._id.toString(),
      tripTitle: trip.title,
      userId: req.user._id.toString(),
    },
  });

  // Create booking record
  const booking = await Booking.create({
    user: req.user._id,
    trip: trip._id,
    startDate: requestedDate,
    passengers,
    numberOfPassengers: passengers.length,
    totalAmount,
    discountAmount,
    finalAmount,
    couponCode: couponCode?.toUpperCase(),
    emergencyContact,
    specialRequirements,
    razorpayOrderId: razorpayOrder.id,
    paymentStatus: "pending",
    bookingStatus: "pending",
  });

  // Decrement slots temporarily (will confirm on payment verification)
  if (startDateEntry) {
    startDateEntry.slots -= passengers.length;
    await trip.save();
  }

  return new ApiResponse(
    201,
    {
      booking: {
        _id: booking._id,
        bookingId: booking.bookingId,
        finalAmount: booking.finalAmount,
        currency: trip.price.currency || "INR",
      },
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    },
    "Booking initiated. Please complete the payment."
  ).send(res);
});

/**
 * GET /api/v1/bookings
 */
export const getUserBookings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const query = { user: req.user._id };
  if (status) query.bookingStatus = status;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(50, parseInt(limit, 10));
  const skip = (pageNum - 1) * limitNum;

  const [bookings, total] = await Promise.all([
    Booking.find(query)
      .populate("trip", "title slug thumbnail duration location type")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Booking.countDocuments(query),
  ]);

  // ✅ PROPER EMPTY CHECK: Check array length
  if (!bookings || bookings.length === 0) {
    return new ApiResponse(
      200, 
      {
        bookings: [],
        pagination: {
          total: 0,
          page: pageNum,
          limit: limitNum,
          totalPages: 0,
        },
      }, 
      "No bookings found."
    ).send(res);
  }

  // Regular successful response
  return new ApiResponse(
    200,
    {
      bookings,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "Bookings fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/bookings/:bookingId
 */
export const getBookingById = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const query = { bookingId };
  // Non-admins can only see their own bookings
  if (req.user.role !== "admin") {
    query.user = req.user._id;
  }

  const booking = await Booking.findOne(query)
    .populate("user", "name email phone")
    .populate("trip", "title slug thumbnail duration location type price cancellationPolicy");

  if (!booking) throw ApiError.notFound("Booking not found.");

  return new ApiResponse(200, booking, "Booking details fetched successfully.").send(res);
});

/**
 * POST /api/v1/bookings/:bookingId/cancel
 */
export const cancelBooking = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const { cancellationReason } = req.body;
  const { bookingId } = req.params;

  const booking = await Booking.findOne({ bookingId, user: req.user._id }).populate(
    "trip",
    "title startDates"
  );

  if (!booking) throw ApiError.notFound("Booking not found.");

  if (["cancelled", "completed"].includes(booking.bookingStatus)) {
    throw ApiError.badRequest(`Booking is already ${booking.bookingStatus}.`);
  }

  // Compute refund
  const trip = await Trip.findById(booking.trip._id || booking.trip);
  const refundAmount =
    booking.paymentStatus === "paid" ? calculateRefundAmount(booking, trip) : 0;

  booking.bookingStatus = "cancelled";
  booking.cancellationReason = cancellationReason;
  booking.refundAmount = refundAmount;
  booking.refundStatus = booking.paymentStatus === "paid" ? "pending" : "not_applicable";

  // Re-open slots
  if (trip) {
    const startDateEntry = trip.startDates.find(
      (sd) => new Date(sd.date).toDateString() === new Date(booking.startDate).toDateString()
    );
    if (startDateEntry) {
      startDateEntry.slots += booking.numberOfPassengers;
      startDateEntry.available = true;
      await trip.save();
    }
  }

  await booking.save();

  // Send cancellation email
  const user = await User.findById(req.user._id);
  if (user) {
    await sendEmail(user.email, "bookingCancellation", {
      name: user.name,
      booking,
      trip: trip || { title: "N/A" },
    });
  }

  return new ApiResponse(
    200,
    {
      bookingId: booking.bookingId,
      refundAmount,
      refundStatus: booking.refundStatus,
    },
    `Booking cancelled. ${refundAmount > 0 ? `A refund of ₹${refundAmount} will be processed.` : "No refund applicable."}`
  ).send(res);
});

/**
 * GET /api/v1/admin/bookings – Admin: all bookings
 */
export const getAllBookings = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    status,
    paymentStatus,
    search,
    startDate,
    endDate,
    tripId,
    sort = "-createdAt",
  } = req.query;

  const query = {};
  if (status) query.bookingStatus = status;
  if (paymentStatus) query.paymentStatus = paymentStatus;
  if (tripId) query.trip = tripId;

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  if (search) {
    query.$or = [
      { bookingId: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const [bookings, total] = await Promise.all([
    Booking.find(query)
      .populate("user", "name email phone")
      .populate("trip", "title slug type")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Booking.countDocuments(query),
  ]);

  return new ApiResponse(
    200,
    {
      bookings,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "All bookings fetched successfully."
  ).send(res);
});

/**
 * PATCH /api/v1/admin/bookings/:bookingId/status
 */
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { bookingStatus } = req.body;

  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!validStatuses.includes(bookingStatus)) {
    throw ApiError.badRequest(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
  }

  const booking = await Booking.findOneAndUpdate(
    { bookingId },
    {
      bookingStatus,
      ...(bookingStatus === "completed" ? { completedAt: new Date() } : {}),
    },
    { new: true }
  )
    .populate("user", "name email")
    .populate("trip", "title");

  if (!booking) throw ApiError.notFound("Booking not found.");

  // Send confirmation email when status changes to confirmed
  if (bookingStatus === "confirmed") {
    await sendEmail(booking.user.email, "bookingConfirmation", {
      name: booking.user.name,
      booking,
      trip: booking.trip,
    });

    // Increment trip totalBookings
    await Trip.findByIdAndUpdate(booking.trip._id || booking.trip, {
      $inc: { totalBookings: 1 },
    });
  }

  return new ApiResponse(200, booking, `Booking status updated to '${bookingStatus}'.`).send(res);
});

/**
 * GET /api/v1/admin/bookings/stats
 */
export const getBookingStats = asyncHandler(async (_req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    completedBookings,
    monthlyRevenue,
    yearlyRevenue,
    totalRevenue,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ bookingStatus: "pending" }),
    Booking.countDocuments({ bookingStatus: "confirmed" }),
    Booking.countDocuments({ bookingStatus: "cancelled" }),
    Booking.countDocuments({ bookingStatus: "completed" }),
    Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),
    Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfYear },
        },
      },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),
    Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),
  ]);

  return new ApiResponse(
    200,
    {
      totalBookings,
      byStatus: {
        pending: pendingBookings,
        confirmed: confirmedBookings,
        cancelled: cancelledBookings,
        completed: completedBookings,
      },
      revenue: {
        total: totalRevenue[0]?.total || 0,
        thisMonth: monthlyRevenue[0]?.total || 0,
        thisYear: yearlyRevenue[0]?.total || 0,
      },
    },
    "Booking stats fetched successfully."
  ).send(res);
});
