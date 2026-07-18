import mongoose from "mongoose";
import User from "../models/User.js";
import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";
import Review from "../models/Review.js";
import Blog from "../models/Blog.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cookieOptions, generateTokens } from "./authController.js";


export const adminLogin = asyncHandler(async (req, res) => {
  // handleValidationErrors(req);

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  if (!user.isActive) {
    throw ApiError.forbidden("Your account has been deactivated. Please contact support.");
  }
  if(user.role !=='admin'){
    throw ApiError.unauthorized("You have no admin permissions")

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
    .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15* 60 * 1000 })
    .cookie("refreshToken", refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json(
      new ApiResponse(200, { admin: userData, token:accessToken, refreshToken }, "Login successful.")
    );
});

export const adminLogout = asyncHandler(async (req, res) => {
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
 * GET /api/v1/admin/dashboard/stats
 */
export const getDashboardStats = asyncHandler(async (_req, res) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalUsers,
    totalTrips,
    totalBookings,
    activeTrips,
    totalRevenueResult,
    monthlyRevenueResult,
    prevMonthRevenueResult,
    newUsersThisMonth,
    bookingsByStatus,
    recentBookings,
    topTrips,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Trip.countDocuments(),
    Booking.countDocuments(),
    Trip.countDocuments({ isActive: true }),

    Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),

    Booking.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),

    Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfPrevMonth, $lte: endOfPrevMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]),

    User.countDocuments({ createdAt: { $gte: startOfMonth } }),

    Booking.aggregate([
      { $group: { _id: "$bookingStatus", count: { $sum: 1 } } },
    ]),

    Booking.find()
      .populate("user", "name email")
      .populate("trip", "title")
      .sort("-createdAt")
      .limit(5)
      .lean(),

    Trip.find()
      .select("title slug totalBookings averageRating thumbnail")
      .sort("-totalBookings")
      .limit(5)
      .lean(),
  ]);

  const totalRevenue = totalRevenueResult[0]?.total || 0;
  const monthlyRevenue = monthlyRevenueResult[0]?.total || 0;
  const prevMonthRevenue = prevMonthRevenueResult[0]?.total || 0;
  const revenueGrowth = prevMonthRevenue > 0
    ? (((monthlyRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1)
    : 100;

  const statusMap = {};
  bookingsByStatus.forEach((s) => { statusMap[s._id] = s.count; });

  return new ApiResponse(
    200,
    {
      overview: {
        totalUsers,
        totalTrips,
        activeTrips,
        totalBookings,
        totalRevenue,
        newUsersThisMonth,
        monthlyRevenue,
        revenueGrowth: parseFloat(revenueGrowth),
      },
      bookingsByStatus: statusMap,
      recentBookings,
      topTrips,
    },
    "Dashboard stats fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/admin/users
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, role, search, isActive } = req.query;

  const query = {};
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === "true";
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(query)
      .select("-password -refreshToken -passwordResetToken -passwordResetExpiry")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean(),
    User.countDocuments(query),
  ]);

  return new ApiResponse(
    200,
    {
      users,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "Users fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/admin/users/:id
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password -refreshToken -passwordResetToken")
    .lean();

  if (!user) throw ApiError.notFound("User not found.");

  // Fetch booking stats
  const bookingStats = await Booking.aggregate([
    { $match: { user: user._id } },
    {
      $group: {
        _id: "$bookingStatus",
        count: { $sum: 1 },
        totalSpent: { $sum: "$finalAmount" },
      },
    },
  ]);

  return new ApiResponse(200, { user, bookingStats }, "User details fetched.").send(res);
});

/**
 * PATCH /api/v1/admin/users/:id/role
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    throw ApiError.badRequest("Role must be 'user' or 'admin'.");
  }

  // Prevent self-demotion
  if (req.params.id === req.user._id.toString() && role === "user") {
    throw ApiError.forbidden("You cannot change your own role.");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, user, `User role updated to '${role}'.`).send(res);
});

/**
 * PATCH /api/v1/admin/users/:id/deactivate
 */
export const deactivateUser = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  if (req.params.id === req.user._id.toString()) {
    throw ApiError.forbidden("You cannot deactivate your own account.");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: isActive !== false },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(
    200,
    user,
    `User account ${user.isActive ? "activated" : "deactivated"} successfully.`
  ).send(res);
});

/**
 * GET /api/v1/admin/analytics/revenue
 */
export const getRevenueStats = asyncHandler(async (req, res) => {
  const { year = new Date().getFullYear() } = req.query;

  const startOfYear = new Date(parseInt(year), 0, 1);
  const endOfYear = new Date(parseInt(year), 11, 31, 23, 59, 59);

  const monthlyStats = await Booking.aggregate([
    {
      $match: {
        paymentStatus: "paid",
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      },
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        revenue: { $sum: "$finalAmount" },
        bookings: { $sum: 1 },
        passengers: { $sum: "$numberOfPassengers" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill in missing months with zeroes
  const months = Array.from({ length: 12 }, (_, i) => {
    const found = monthlyStats.find((m) => m._id === i + 1);
    return {
      month: i + 1,
      monthName: new Date(2024, i, 1).toLocaleString("en-IN", { month: "long" }),
      revenue: found?.revenue || 0,
      bookings: found?.bookings || 0,
      passengers: found?.passengers || 0,
    };
  });

  const totalRevenue = months.reduce((sum, m) => sum + m.revenue, 0);
  const totalBookings = months.reduce((sum, m) => sum + m.bookings, 0);

  return new ApiResponse(
    200,
    { year: parseInt(year), months, totalRevenue, totalBookings },
    "Revenue stats fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/admin/analytics/bookings
 */
export const getBookingAnalytics = asyncHandler(async (_req, res) => {
  const [
    byType,
    byPaymentStatus,
    avgBookingValue,
    topDestinations,
    recentCancellations,
  ] = await Promise.all([
    // Bookings by trip type
    Booking.aggregate([
      {
        $lookup: {
          from: "trips",
          localField: "trip",
          foreignField: "_id",
          as: "tripData",
        },
      },
      { $unwind: "$tripData" },
      { $group: { _id: "$tripData.type", count: { $sum: 1 } } },
    ]),

    // Bookings by payment status
    Booking.aggregate([
      { $group: { _id: "$paymentStatus", count: { $sum: 1 } } },
    ]),

    // Average booking value
    Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, avg: { $avg: "$finalAmount" } } },
    ]),

    // Top destinations
    Booking.aggregate([
      {
        $lookup: {
          from: "trips",
          localField: "trip",
          foreignField: "_id",
          as: "tripData",
        },
      },
      { $unwind: "$tripData" },
      { $unwind: "$tripData.location.destinations" },
      {
        $group: {
          _id: "$tripData.location.destinations",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),

    // Recent cancellations
    Booking.find({ bookingStatus: "cancelled" })
      .populate("trip", "title")
      .populate("user", "name")
      .sort("-updatedAt")
      .limit(5)
      .select("bookingId cancellationReason refundAmount updatedAt")
      .lean(),
  ]);

  return new ApiResponse(
    200,
    {
      byType: Object.fromEntries(byType.map((b) => [b._id, b.count])),
      byPaymentStatus: Object.fromEntries(byPaymentStatus.map((b) => [b._id, b.count])),
      averageBookingValue: Math.round(avgBookingValue[0]?.avg || 0),
      topDestinations,
      recentCancellations,
    },
    "Booking analytics fetched successfully."
  ).send(res);
});
