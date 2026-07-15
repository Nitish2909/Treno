import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  incrementViewCount,
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.post("/",createBlog)
router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);
router.post("/:slug/view", incrementViewCount);

export default router;
