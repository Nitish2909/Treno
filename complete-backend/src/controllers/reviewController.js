import { validationResult } from "express-validator";
import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { deleteTempFiles, extractTempFilePaths } from "../utils/fileCleanup.js";

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest("Validation failed", errors.array());
  }
};

/**
 * POST /api/v1/reviews
 */
export const createReview = asyncHandler(async (req, res) => {
  const { tripId, bookingId, rating, title, comment } = req.body;
  const tempFilePaths = extractTempFilePaths(req.files);

  try {
    if (!tripId || !bookingId || !rating || !comment) {
      throw ApiError.badRequest("tripId, bookingId, rating, and comment are required.");
    }

    // Verify booking belongs to user and trip is completed
    const booking = await Booking.findOne({
      bookingId,
      user: req.user._id,
      trip: tripId,
    });

    if (!booking) {
      throw ApiError.notFound("Booking not found for this trip and user.");
    }

    if (booking.bookingStatus !== "completed") {
      throw ApiError.badRequest("You can only review trips you have completed.");
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ booking: booking._id });
    if (existingReview) {
      throw ApiError.conflict("You have already submitted a review for this booking.");
    }

    // Upload review images
    let images = [];
    if (req.files?.length) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.path, "Treno/reviews")
      );
      const results = await Promise.all(uploadPromises);
      images = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
    }

    const review = await Review.create({
      user: req.user._id,
      trip: tripId,
      booking: booking._id,
      rating: parseInt(rating),
      title,
      comment,
      images,
      isVerified: true, // Verified because booking exists
      isApproved: false, // Requires admin approval
    });

    deleteTempFiles(tempFilePaths);

    return new ApiResponse(201, review, "Review submitted successfully. It will be visible after admin approval.").send(res);
  } catch (error) {
    deleteTempFiles(tempFilePaths);
    throw error;
  }
});

/**
 * GET /api/v1/reviews/trip/:tripId
 */
export const getReviews = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

  const trip = await Trip.findById(tripId).select("_id");
  if (!trip) throw ApiError.notFound("Trip not found.");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const query = { trip: tripId, isApproved: true };

  const [reviews, total] = await Promise.all([
    Review.find(query)
      .populate("user", "name avatar")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Review.countDocuments(query),
  ]);

  // Rating distribution
  const ratingDist = await Review.aggregate([
    { $match: { trip: trip._id, isApproved: true } },
    { $group: { _id: "$rating", count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
  ]);

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratingDist.forEach((r) => { distribution[r._id] = r.count; });

  return new ApiResponse(
    200,
    {
      reviews,
      ratingDistribution: distribution,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "Reviews fetched successfully."
  ).send(res);
});

/**
 * PUT /api/v1/reviews/:id
 */
export const updateReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
  if (!review) throw ApiError.notFound("Review not found or you are not the author.");

  if (rating) review.rating = parseInt(rating);
  if (title) review.title = title;
  if (comment) review.comment = comment;

  review.isApproved = false; // Re-approval needed after edit

  await review.save();

  return new ApiResponse(200, review, "Review updated. It will be visible after re-approval.").send(res);
});

/**
 * DELETE /api/v1/reviews/:id
 */
export const deleteReview = asyncHandler(async (req, res) => {
  const query = { _id: req.params.id };
  if (req.user.role !== "admin") query.user = req.user._id;

  const review = await Review.findOne(query);
  if (!review) throw ApiError.notFound("Review not found.");

  // Delete images from cloudinary
  if (review.images?.length) {
    for (const img of review.images) {
      await deleteFromCloudinary(img.public_id);
    }
  }

  await Review.findByIdAndDelete(review._id);

  // Recalculate trip rating
  await Review.calculateAverageRating(review.trip);

  return new ApiResponse(200, null, "Review deleted successfully.").send(res);
});

/**
 * PATCH /api/v1/admin/reviews/:id/approve
 */
export const approveReview = asyncHandler(async (req, res) => {
  const { approved } = req.body;

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isApproved: approved !== false },
    { new: true }
  );

  if (!review) throw ApiError.notFound("Review not found.");

  // Recalculate after approval change
  await Review.calculateAverageRating(review.trip);

  return new ApiResponse(
    200,
    review,
    `Review ${review.isApproved ? "approved" : "unapproved"} successfully.`
  ).send(res);
});

/**
 * POST /api/v1/admin/reviews/:id/response
 */
export const addReviewResponse = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) throw ApiError.badRequest("Response text is required.");

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    {
      response: {
        text,
        respondedAt: new Date(),
        respondedBy: req.user._id,
      },
    },
    { new: true }
  );

  if (!review) throw ApiError.notFound("Review not found.");

  return new ApiResponse(200, review, "Response added to review.").send(res);
});

/**
 * POST /api/v1/reviews/:id/helpful
 */
export const markHelpful = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw ApiError.notFound("Review not found.");

  const userId = req.user._id;
  const alreadyVoted = review.helpfulVotes.includes(userId);

  if (alreadyVoted) {
    // Remove vote
    review.helpfulVotes = review.helpfulVotes.filter(
      (id) => id.toString() !== userId.toString()
    );
    review.helpfulCount = Math.max(0, review.helpfulCount - 1);
  } else {
    review.helpfulVotes.push(userId);
    review.helpfulCount += 1;
  }

  await review.save({ validateBeforeSave: false });

  return new ApiResponse(
    200,
    { helpful: !alreadyVoted, helpfulCount: review.helpfulCount },
    alreadyVoted ? "Removed helpful vote." : "Marked as helpful."
  ).send(res);
});
