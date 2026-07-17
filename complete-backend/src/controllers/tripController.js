import mongoose from "mongoose";
import { validationResult } from "express-validator";
import Trip from "../models/Trip.js";
import Category from "../models/Category.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary, deleteManyFromCloudinary } from "../config/cloudinary.js";
import { deleteTempFile, deleteTempFiles, extractTempFilePaths } from "../utils/fileCleanup.js";

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest("Validation failed", errors.array());
  }
};

/**
 * GET /api/v1/trips
 * Public – supports filtering, searching, sorting, pagination
 */
export const getAllTrips = asyncHandler(async (req, res) => {
  const {
    type,
    category,
    minPrice,
    maxPrice,
    minDays,
    maxDays,
    difficulty,
    search,
    sort = "-createdAt",
    page = 1,
    limit = 12,
    isFeatured,
    isPopular,
    tags,
    state,
    country,
  } = req.query;

  const query = { isActive: true };

  if (type) query.type = type;
  if (difficulty) query.difficulty = difficulty;
  if (category) query.category = category;
  if (state) query["location.state"] = new RegExp(state, "i");
  if (country) query["location.country"] = new RegExp(country, "i");
  if (isFeatured === "true") query.isFeatured = true;
  if (isPopular === "true") query.isPopular = true;

  if (minPrice || maxPrice) {
    query["price.discounted"] = {};
    if (minPrice) query["price.discounted"].$gte = Number(minPrice);
    if (maxPrice) query["price.discounted"].$lte = Number(maxPrice);
  }

  if (minDays || maxDays) {
    query["duration.days"] = {};
    if (minDays) query["duration.days"].$gte = Number(minDays);
    if (maxDays) query["duration.days"].$lte = Number(maxDays);
  }

  if (tags) {
    const tagArray = tags.split(",").map((t) => t.trim().toLowerCase());
    query.tags = { $in: tagArray };
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { "location.destinations": { $regex: search, $options: "i" } },
      { "location.state": { $regex: search, $options: "i" } },
    ];
  }

  
  // Allowed sort fields
  const allowedSortFields = [
    "createdAt", "-createdAt",
    "price.discounted", "-price.discounted",
    "averageRating", "-averageRating",
    "totalBookings", "-totalBookings",
    "duration.days", "-duration.days",
  ];
  const sortField = allowedSortFields.includes(sort) ? sort : "-createdAt";

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [trips, total] = await Promise.all([
    Trip.find(query)
      .populate("category", "name slug icon")
      .select("-itinerary -faqs -reviews -thingsToCarry")
      .sort(sortField)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Trip.countDocuments(query),
  ]);

  return new ApiResponse(
    200,
    {
      trips,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    },
    "Trips fetched successfully."
  ).send(res);
});

export const getTripById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate MongoID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid trip ID format.");
  }

  const trip = await Trip.findById(id)
    .populate("category", "name slug icon")
    .populate("createdBy", "name email"); // Optional: populates user who created it

  if (!trip) {
    throw new ApiError(404, "Trip not found.");
  }

  return new ApiResponse(
    200, 
    { trip }, 
    "Trip retrieved successfully."
  ).send(res);
});
/**
 * GET /api/v1/trips/featured
 */
export const getFeaturedTrips = asyncHandler(async (_req, res) => {
  const trips = await Trip.find({ isActive: true, isFeatured: true })
    .populate("category", "name slug icon")
    .select("title slug thumbnail price duration type averageRating totalReviews location isFeatured isPopular")
    .sort("-createdAt")
    .limit(8)
    .lean();

  return new ApiResponse(200, trips, "Featured trips fetched successfully.").send(res);
});

/**
 * GET /api/v1/trips/popular
 */
export const getPopularTrips = asyncHandler(async (_req, res) => {
  const trips = await Trip.find({ isActive: true, isPopular: true })
    .populate("category", "name slug icon")
    .select("title slug thumbnail price duration type averageRating totalReviews totalBookings location")
    .sort("-totalBookings -averageRating")
    .limit(8)
    .lean();

  return new ApiResponse(200, trips, "Popular trips fetched successfully.").send(res);
});

/**
 * GET /api/v1/trips/search
 */
export const searchTrips = asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q || q.trim().length < 2) {
    throw ApiError.badRequest("Search query must be at least 2 characters.");
  }

  const trips = await Trip.find({
    isActive: true,
    $or: [
      { title: { $regex: q, $options: "i" } },
      { "location.destinations": { $regex: q, $options: "i" } },
      { "location.state": { $regex: q, $options: "i" } },
      { tags: { $regex: q, $options: "i" } },
    ],
  })
    .select("title slug thumbnail price duration type location")
    .limit(Math.min(20, parseInt(limit)))
    .lean();

  return new ApiResponse(200, trips, "Search results fetched.").send(res);
});

/**
 * GET /api/v1/trips/category/:slug
 */
export const getTripsByCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { page = 1, limit = 12 } = req.query;

  const category = await Category.findOne({ slug, isActive: true });
  if (!category) throw ApiError.notFound("Category not found.");

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const [trips, total] = await Promise.all([
    Trip.find({ isActive: true, category: category._id })
      .select("-itinerary -faqs -reviews")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Trip.countDocuments({ isActive: true, category: category._id }),
  ]);

  return new ApiResponse(
    200,
    {
      category,
      trips,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "Category trips fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/trips/:slug
 */
export const getTripBySlug = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ slug: req.params.slug, isActive: true })
    .populate("category", "name slug icon")
    .populate({
      path: "reviews",
      match: { isApproved: true },
      select: "user rating title comment createdAt isVerified response",
      populate: { path: "user", select: "name avatar" },
      options: { sort: { createdAt: -1 }, limit: 5 },
    })
    .populate("createdBy", "name avatar");

  if (!trip) throw ApiError.notFound("Trip not found.");

  return new ApiResponse(200, trip, "Trip details fetched successfully.").send(res);
});

/**
 * POST /api/v1/admin/trips
 */
export const createTrip = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const tempFilePaths = extractTempFilePaths(req.files);

  try {
    const body = { ...req.body };

    // Parse JSON strings (sent from multipart/form-data)
    const jsonFields = [
      "duration", "groupSize", "price", "location", "itinerary",
      "inclusions", "exclusions", "thingsToCarry", "faqs", "highlights",
      "tags", "departureMonths", "startDates", "guide", "seo",
    ];
    for (const field of jsonFields) {
      if (typeof body[field] === "string") {
        try {
          body[field] = JSON.parse(body[field]);
        } catch {
          // leave as string if parse fails
        }
      }
    }

    // Upload thumbnail
    let thumbnail = {};
    if (req.files?.thumbnail?.[0]) {
      const thumbResult = await uploadToCloudinary(
        req.files.thumbnail[0].tempFilePath,
        "Treno/trips/thumbnails"
      );
      thumbnail = {
        url: thumbResult.secure_url,
        public_id: thumbResult.public_id,
      };
    }

    // Upload gallery images
    let images = [];
    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map((file) =>
        uploadToCloudinary(file.tempFilePath, "Treno/trips/images")
      );
      const results = await Promise.all(uploadPromises);
      images = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
    }

    const trip = await Trip.create({
      ...body,
      thumbnail,
      images,
      createdBy: req.user._id,
    });

    // Increment category tripCount
    await Category.findByIdAndUpdate(trip.category, { $inc: { tripCount: 1 } });

    // Cleanup temp files
    deleteTempFiles(tempFilePaths);

    return new ApiResponse(201, trip, "Trip created successfully.").send(res);
  } catch (error) {
    deleteTempFiles(tempFilePaths);
    throw error;
  }
});

/**
 * PUT /api/v1/admin/trips/:id
 */
export const updateTrip = asyncHandler(async (req, res) => {
  handleValidationErrors(req);

  const trip = await Trip.findById(req.params.id);
  if (!trip) throw ApiError.notFound("Trip not found.");

  const tempFilePaths = extractTempFilePaths(req.files);

  try {
    const body = { ...req.body };

    const jsonFields = [
      "duration", "groupSize", "price", "location", "itinerary",
      "inclusions", "exclusions", "thingsToCarry", "faqs", "highlights",
      "tags", "departureMonths", "startDates", "guide", "seo",
    ];
    for (const field of jsonFields) {
      if (typeof body[field] === "string") {
        try {
          body[field] = JSON.parse(body[field]);
        } catch {}
      }
    }

    // Upload new thumbnail
    if (req.files?.thumbnail?.[0]) {
      if (trip.thumbnail?.public_id) {
        await deleteFromCloudinary(trip.thumbnail.public_id);
      }
      const result = await uploadToCloudinary(
        req.files.thumbnail[0].tempFilePath,
        "Treno/trips/thumbnails"
      );
      body.thumbnail = { url: result.secure_url, public_id: result.public_id };
    }

    console.log(req.files)
    // Append new gallery images
    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map((file) =>
        uploadToCloudinary(file.tempFilePath, "Treno/trips/images")
      );
      const results = await Promise.all(uploadPromises);
      const newImages = results.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
      body.images = [...(trip.images || []), ...newImages];
    }

    // Handle category change
    if (body.category && body.category.toString() !== trip.category.toString()) {
      await Promise.all([
        Category.findByIdAndUpdate(trip.category, { $inc: { tripCount: -1 } }),
        Category.findByIdAndUpdate(body.category, { $inc: { tripCount: 1 } }),
      ]);
    }

    Object.assign(trip, body);
    await trip.save();

    deleteTempFiles(tempFilePaths);

    return new ApiResponse(200, trip, "Trip updated successfully.").send(res);
  } catch (error) {
    deleteTempFiles(tempFilePaths);
    throw error;
  }
});

/**
 * DELETE /api/v1/admin/trips/:id
 */
export const deleteTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) throw ApiError.notFound("Trip not found.");

  // Delete all cloudinary images
  const publicIds = [
    ...(trip.images || []).map((img) => img.public_id),
    trip.thumbnail?.public_id,
    trip.pdfBrochure?.public_id,
  ].filter(Boolean);

  if (publicIds.length) {
    await deleteManyFromCloudinary(publicIds);
  }

  // Decrement category count
  await Category.findByIdAndUpdate(trip.category, { $inc: { tripCount: -1 } });

  await Trip.findByIdAndDelete(req.params.id);

  return new ApiResponse(200, null, "Trip deleted successfully.").send(res);
});

/**
 * POST /api/v1/admin/trips/:id/start-dates
 */
export const addStartDate = asyncHandler(async (req, res) => {
  const { date, slots, available } = req.body;

  if (!date) throw ApiError.badRequest("Date is required.");

  const trip = await Trip.findById(req.params.id);
  if (!trip) throw ApiError.notFound("Trip not found.");

  trip.startDates.push({ date: new Date(date), slots: slots || 15, available: available !== false });
  trip.startDates.sort((a, b) => a.date - b.date);

  await trip.save();

  return new ApiResponse(200, trip.startDates, "Start date added successfully.").send(res);
});

/**
 * PUT /api/v1/admin/trips/:id/start-dates/:dateIndex
 */
export const updateStartDate = asyncHandler(async (req, res) => {
  const { dateIndex } = req.params;
  const { date, slots, available } = req.body;

  const trip = await Trip.findById(req.params.id);
  if (!trip) throw ApiError.notFound("Trip not found.");

  const index = parseInt(dateIndex);
  if (index < 0 || index >= trip.startDates.length) {
    throw ApiError.notFound("Start date not found at given index.");
  }

  if (date) trip.startDates[index].date = new Date(date);
  if (slots !== undefined) trip.startDates[index].slots = slots;
  if (available !== undefined) trip.startDates[index].available = available;

  await trip.save();

  return new ApiResponse(200, trip.startDates, "Start date updated successfully.").send(res);
});

/**
 * POST /api/v1/admin/trips/:id/pdf
 */
export const uploadTripPDF = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) throw ApiError.notFound("Trip not found.");

  if (!req.file) throw ApiError.badRequest("PDF file is required.");

  try {
    // Delete old PDF if exists
    if (trip.pdfBrochure?.public_id) {
      await deleteFromCloudinary(trip.pdfBrochure.public_id, "raw");
    }

    const result = await uploadToCloudinary(req.file.tempFilePath, "Treno/trips/pdfs", {
      resource_type: "raw",
      format: "pdf",
    });

    trip.pdfBrochure = { url: result.secure_url, public_id: result.public_id };
    await trip.save();

    deleteTempFile(req.file.tempFilePath);

    return new ApiResponse(200, trip.pdfBrochure, "PDF uploaded successfully.").send(res);
  } catch (error) {
    deleteTempFile(req.file?.tempFilePat);
    throw error;
  }
});
