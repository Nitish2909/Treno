import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Passenger name is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Passenger age is required"],
      min: [1, "Age must be at least 1"],
      max: [120, "Age must not exceed 120"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female", "other"],
    },
    idType: {
      type: String,
      required: [true, "ID type is required"],
      enum: ["aadhar", "passport", "driving_license", "voter_id", "pan"],
    },
    idNumber: {
      type: String,
      required: [true, "ID number is required"],
      trim: true,
    },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    passengers: {
      type: [passengerSchema],
      required: [true, "Passenger details are required"],
      validate: {
        validator: (arr) => arr.length >= 1,
        message: "At least one passenger is required",
      },
    },
    numberOfPassengers: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discountAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "upi", "card", "netbanking", "wallet", "emi", "offline"],
    },
    razorpayOrderId: {
      type: String,
      trim: true,
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
    },
    razorpaySignature: {
      type: String,
      trim: true,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    specialRequirements: {
      type: String,
      trim: true,
      maxlength: [500, "Special requirements must not exceed 500 characters"],
    },
    emergencyContact: {
      name: { type: String, trim: true, required: true },
      phone: { type: String, trim: true, required: true },
    },
    couponCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    refundAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    refundStatus: {
      type: String,
      enum: ["not_applicable", "pending", "processed", "failed"],
      default: "not_applicable",
    },
    refundInitiatedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes ───────────────────────────────────────────────────────────────────
bookingSchema.index({ bookingId: 1 }, { unique: true });
bookingSchema.index({ user: 1 });
bookingSchema.index({ trip: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ razorpayOrderId: 1 });

// ── Pre-save: Generate bookingId ──────────────────────────────────────────────
bookingSchema.pre("save", async function (next) {
  if (this.bookingId) return next();

  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomPart = Math.floor(10000 + Math.random() * 90000); // 5-digit random

  let bookingId = `WO-${datePart}-${randomPart}`;

  // Ensure uniqueness
  let exists = await mongoose.model("Booking").findOne({ bookingId });
  while (exists) {
    const newRandom = Math.floor(10000 + Math.random() * 90000);
    bookingId = `WO-${datePart}-${newRandom}`;
    exists = await mongoose.model("Booking").findOne({ bookingId });
  }

  this.bookingId = bookingId;
  next();
});

// ── Pre-save: Sync numberOfPassengers ─────────────────────────────────────────
bookingSchema.pre("save", function (next) {
  if (this.passengers) {
    this.numberOfPassengers = this.passengers.length;
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
