import { validationResult } from "express-validator";
import Blog from "../models/Blog.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary, deleteFromCloudinary, deleteManyFromCloudinary } from "../config/cloudinary.js";
import { deleteTempFiles, extractTempFilePaths } from "../utils/fileCleanup.js";

const handleValidationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest("Validation failed", errors.array());
  }
};

/**
 * POST /api/v1/admin/blogs
 */
export const createBlog = asyncHandler(async (req, res) => {
  const tempFilePaths = extractTempFilePaths(req.files);

  try {
    const body = { ...req.body };

    if (typeof body.tags === "string") {
      try { body.tags = JSON.parse(body.tags); } catch { body.tags = body.tags.split(",").map(t => t.trim()); }
    }
    if (typeof body.seo === "string") {
      try { body.seo = JSON.parse(body.seo); } catch {}
    }

    // Upload featured image
    let featuredImage = {};
    if (req.files?.featuredImage?.[0]) {
      const result = await uploadToCloudinary(
        req.files.featuredImage[0].path,
        "Treno/blogs/featured"
      );
      featuredImage = { url: result.secure_url, public_id: result.public_id };
    }

    // Upload body images
    let images = [];
    if (req.files?.images?.length) {
      const uploads = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.path, "Treno/blogs/images")
        )
      );
      images = uploads.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
    }

    const blog = await Blog.create({
      ...body,
      featuredImage,
      images,
      author: req.user._id,
    });

    deleteTempFiles(tempFilePaths);

    return new ApiResponse(201, blog, "Blog created successfully.").send(res);
  } catch (error) {
    deleteTempFiles(tempFilePaths);
    throw error;
  }
});

/**
 * GET /api/v1/blogs
 */
export const getAllBlogs = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    tags,
    search,
    sort = "-publishedAt",
  } = req.query;

  const query = { status: "published" };
  if (category) query.category = category;
  if (tags) {
    const tagArray = tags.split(",").map((t) => t.trim());
    query.tags = { $in: tagArray };
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .populate("author", "name avatar")
      .select("-content -images")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Blog.countDocuments(query),
  ]);

  return new ApiResponse(
    200,
    {
      blogs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    },
    "Blogs fetched successfully."
  ).send(res);
});

/**
 * GET /api/v1/blogs/:slug
 */
export const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug, status: "published" })
    .populate("author", "name avatar");

  if (!blog) throw ApiError.notFound("Blog post not found.");

  return new ApiResponse(200, blog, "Blog fetched successfully.").send(res);
});

/**
 * POST /api/v1/blogs/:slug/view
 */
export const incrementViewCount = asyncHandler(async (req, res) => {
  await Blog.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { viewCount: 1 } }
  );
  res.status(200).json({ success: true });
});

/**
 * GET /api/v1/admin/blogs
 */
export const getAllAdminBlogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, search } = req.query;

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;

  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .populate("author", "name")
      .select("-content")
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Blog.countDocuments(query),
  ]);

  return new ApiResponse(
    200,
    {
      blogs,
      pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    },
    "All blogs fetched."
  ).send(res);
});

/**
 * PUT /api/v1/admin/blogs/:id
 */
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw ApiError.notFound("Blog not found.");

  const tempFilePaths = extractTempFilePaths(req.files);

  try {
    const body = { ...req.body };
    if (typeof body.tags === "string") {
      try { body.tags = JSON.parse(body.tags); } catch { body.tags = body.tags.split(",").map(t => t.trim()); }
    }
    if (typeof body.seo === "string") {
      try { body.seo = JSON.parse(body.seo); } catch {}
    }

    if (req.files?.featuredImage?.[0]) {
      if (blog.featuredImage?.public_id) {
        await deleteFromCloudinary(blog.featuredImage.public_id);
      }
      const result = await uploadToCloudinary(
        req.files.featuredImage[0].path,
        "Treno/blogs/featured"
      );
      body.featuredImage = { url: result.secure_url, public_id: result.public_id };
    }

    if (req.files?.images?.length) {
      const uploads = await Promise.all(
        req.files.images.map((f) =>
          uploadToCloudinary(f.path, "Treno/blogs/images")
        )
      );
      const newImages = uploads.map((r) => ({ url: r.secure_url, public_id: r.public_id }));
      body.images = [...(blog.images || []), ...newImages];
    }

    Object.assign(blog, body);
    await blog.save();

    deleteTempFiles(tempFilePaths);

    return new ApiResponse(200, blog, "Blog updated successfully.").send(res);
  } catch (error) {
    deleteTempFiles(tempFilePaths);
    throw error;
  }
});

/**
 * DELETE /api/v1/admin/blogs/:id
 */

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw ApiError.notFound("Blog not found.");

  const publicIds = [
    ...(blog.images || []).map((img) => img.public_id),
    blog.featuredImage?.public_id,
  ].filter(Boolean);

  if (publicIds.length) {
    await deleteManyFromCloudinary(publicIds);
  }

  await Blog.findByIdAndDelete(req.params.id);

  return new ApiResponse(200, null, "Blog deleted successfully.").send(res);
});
