import crypto from "crypto";
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/emailService.js";
import razorpay from "../config/razorpay.js";

/**
 * POST /api/v1/payments/create-order
 * Create a fresh Razorpay order (used when booking already exists but payment needs retry)
 */
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) throw ApiError.badRequest("Booking ID is required.");

  const booking = await Booking.findOne({ bookingId, user: req.user._id });
  if (!booking) throw ApiError.notFound("Booking not found.");

  if (booking.paymentStatus === "paid") {
    throw ApiError.badRequest("This booking has already been paid.");
  }

  const trip = await Trip.findById(booking.trip).select("title price");

  const order = await razorpay.orders.create({
    amount: booking.finalAmount * 100,
    currency: trip?.price?.currency || "INR",
    receipt: booking.bookingId,
    notes: {
      bookingId: booking.bookingId,
      userId: req.user._id.toString(),
    },
  });

  // Update the booking with new order ID
  booking.razorpayOrderId = order.id;
  await booking.save({ validateBeforeSave: false });

  return new ApiResponse(
    200,
    {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingId: booking.bookingId,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    },
    "Razorpay order created successfully."
  ).send(res);
});

/**
 * POST /api/v1/payments/verify
 * Verify Razorpay payment signature
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

  if (!razorpayOrderId || !razorpayPaymentId
    || !razorpaySignature) {
    throw ApiError.badRequest("Payment verification details are incomplete.");
  }

  // Verify signature using HMAC SHA256
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId
      }|${razorpayPaymentId
      }`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    // Mark payment as failed
    if (bookingId) {
      await Booking.findOneAndUpdate(
        { bookingId },
        { paymentStatus: "failed" }
      );
    }
    throw ApiError.badRequest("Payment verification failed. Invalid signature.");
  }

  // Update booking
  const booking = await Booking.findOneAndUpdate(
    { razorpayOrderId:razorpayOrderId },
    {
      paymentStatus: "paid",
      bookingStatus: "confirmed",
      razorpayPaymentId: razorpayPaymentId
      ,
      razorpaySignature: razorpaySignature,
    },
    { new: true }
  ).populate("trip", "title slug duration");

  if (!booking) throw ApiError.notFound("Booking not found for this order.");

  // Increment trip booking count
  await Trip.findByIdAndUpdate(booking.trip._id || booking.trip, {
    $inc: { totalBookings: 1 },
  });

  // Send confirmation email
  const user = await User.findById(booking.user);
  if (user) {
    await sendEmail(user.email, "bookingConfirmation", {
      name: user.name,
      booking,
      trip: booking.trip,
    });
  }

  return new ApiResponse(
    200,
    {
      bookingId: booking.bookingId,
      paymentId: razorpayPaymentId,
      status: "paid",
    },
    "Payment verified successfully. Booking confirmed!"
  ).send(res);
});

/**
 * GET /api/v1/payments/:paymentId
 */
export const getPaymentDetails = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const booking = await Booking.findOne({
    razorpayPaymentId: paymentId,
    ...(req.user.role !== "admin" ? { user: req.user._id } : {}),
  })
    .populate("user", "name email")
    .populate("trip", "title");

  if (!booking) throw ApiError.notFound("Payment record not found.");

  // Optionally fetch live details from Razorpay
  let razorpayDetails = null;
  try {
    razorpayDetails = await razorpay.payments.fetch(paymentId);
  } catch {
    // Not critical if Razorpay fetch fails
  }

  return new ApiResponse(
    200,
    { booking, razorpayDetails },
    "Payment details fetched."
  ).send(res);
});

/**
 * POST /api/v1/admin/payments/:paymentId/refund
 */
export const refundPayment = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const { amount, reason = "Requested by customer" } = req.body;

  const booking = await Booking.findOne({ razorpayPaymentId: paymentId });
  if (!booking) throw ApiError.notFound("Booking not found for this payment.");

  if (booking.paymentStatus !== "paid") {
    throw ApiError.badRequest("Refund can only be initiated for paid bookings.");
  }

  const refundAmount = amount
    ? Math.min(parseInt(amount), booking.finalAmount)
    : booking.refundAmount || booking.finalAmount;

  if (refundAmount <= 0) {
    throw ApiError.badRequest("Refund amount must be greater than zero.");
  }

  // Initiate refund via Razorpay
  const refund = await razorpay.payments.refund(paymentId, {
    amount: refundAmount * 100, // paise
    notes: { reason },
  });

  booking.paymentStatus = "refunded";
  booking.refundStatus = "processed";
  booking.refundAmount = refundAmount;
  booking.refundInitiatedAt = new Date();
  await booking.save({ validateBeforeSave: false });

  return new ApiResponse(
    200,
    {
      refundId: refund.id,
      amount: refundAmount,
      status: refund.status,
    },
    "Refund initiated successfully."
  ).send(res);
});

/**
 * POST /api/v1/payments/webhook
 * Handle Razorpay webhook events (raw body required)
 */
export const handleWebhook = asyncHandler(async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (webhookSecret) {
    const signature = req.headers["x-razorpay-signature"];
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body) // raw body
      .digest("hex");

    if (signature !== expectedSignature) {
      throw ApiError.unauthorized("Webhook signature verification failed.");
    }
  }

  const event = JSON.parse(req.body.toString());
  const eventType = event.event;

  switch (eventType) {
    case "payment.captured": {
      const payment = event.payload.payment.entity;
      await Booking.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          paymentStatus: "paid",
          bookingStatus: "confirmed",
          razorpayPaymentId: payment.id,
          paymentMethod: payment.method,
        }
      );
      break;
    }

    case "payment.failed": {
      const payment = event.payload.payment.entity;
      await Booking.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { paymentStatus: "failed" }
      );
      break;
    }

    case "refund.processed": {
      const refund = event.payload.refund.entity;
      await Booking.findOneAndUpdate(
        { razorpayPaymentId: refund.payment_id },
        { refundStatus: "processed", paymentStatus: "refunded" }
      );
      break;
    }

    default:
      console.log(`Unhandled Razorpay webhook event: ${eventType}`);
  }

  // Razorpay expects a 200 OK quickly
  res.status(200).json({ received: true });
});
