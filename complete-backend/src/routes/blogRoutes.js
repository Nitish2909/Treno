import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  incrementViewCount,
  getBlogById
} from "../controllers/blogController.js";
import isAdmin from "../middleware/admin.js";

const router = express.Router();

// Public routes
router.post("/",isAdmin,createBlog)
router.get("/", getAllBlogs);
router.get("/:id",getBlogById)
router.get("/blog/:slug", getBlogBySlug);
router.post("/:slug/view", isAdmin, incrementViewCount);

export default router;
