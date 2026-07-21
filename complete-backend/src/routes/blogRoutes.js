import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  incrementViewCount,
  getBlogById
} from "../controllers/blogController.js";

const router = express.Router();

// Public routes
router.post("/",createBlog)
router.get("/", getAllBlogs);
// router.get("/:id",getBlogById)
router.get("/blog/:slug", getBlogBySlug);
router.post("/:slug/view", incrementViewCount);

export default router;
