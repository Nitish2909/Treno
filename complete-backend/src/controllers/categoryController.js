import Category from "../models/Category.js";
import Trip from "../models/Trip.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { deleteTempFile } from "../utils/fileCleanup.js";

/**
 * POST /api/v1/admin/categories
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, icon, isActive, order } = req.body;

  if (!name?.trim()) throw ApiError.badRequest("Category name is required.");

  const existing = await Category.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
  if (existing) throw ApiError.conflict(`Category "${name}" already exists.`);

  let image = {};
  if (req.file) {
    const result = await uploadToCloudinary(req.file.path, "Treno/categories");
    image = { url: result.secure_url, public_id: result.public_id };
    deleteTempFile(req.file.path);
  }

  const category = await Category.create({
    name,
    description,
    icon,
    image,
    isActive: isActive !== false,
    order: order || 0,
  });

  return new ApiResponse(201, category, "Category created successfully.").send(res);
});

/**
 * GET /api/v1/categories
 */
export const getActiveCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find({ isActive: true })
    .sort("order name")
    .lean();

  return new ApiResponse(200, categories, "Categories fetched successfully.").send(res);
});

/**
 * GET /api/v1/admin/categories
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));

  const [categories, total] = await Promise.all([
    Category.find()
      .sort("order name")
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean(),
    Category.countDocuments(),
  ]);

  return new ApiResponse(
    200,
    {
      categories,
      pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    },
    "All categories fetched."
  ).send(res);
});

/**
 * GET /api/v1/categories/:id
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound("Category not found.");

  return new ApiResponse(200, category, "Category fetched successfully.").send(res);
});

/**
 * PUT /api/v1/admin/categories/:id
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound("Category not found.");

  const { name, description, icon, isActive, order } = req.body;

  if (name) category.name = name;
  if (description !== undefined) category.description = description;
  if (icon !== undefined) category.icon = icon;
  if (isActive !== undefined) category.isActive = isActive;
  if (order !== undefined) category.order = order;

  if (req.file) {
    if (category.image?.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }
    const result = await uploadToCloudinary(req.file.path, "Treno/categories");
    category.image = { url: result.secure_url, public_id: result.public_id };
    deleteTempFile(req.file.path);
  }

  await category.save();

  return new ApiResponse(200, category, "Category updated successfully.").send(res);
});

/**
 * DELETE /api/v1/admin/categories/:id
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound("Category not found.");

  // Check if trips are using this category
  const tripCount = await Trip.countDocuments({ category: category._id });
  if (tripCount > 0) {
    throw ApiError.conflict(
      `Cannot delete category. ${tripCount} trip(s) are assigned to it. Reassign them first.`
    );
  }

  if (category.image?.public_id) {
    await deleteFromCloudinary(category.image.public_id);
  }

  await Category.findByIdAndDelete(req.params.id);

  return new ApiResponse(200, null, "Category deleted successfully.").send(res);
});
