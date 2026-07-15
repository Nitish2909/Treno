import express from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
  markHelpful,
} from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/auth.js";
import { uploadReviewImages } from "../middleware/upload.js";

const router = express.Router();

// Public
router.get("/trip/:tripId", getReviews);

// Protected
router.use(verifyToken);

router.post("/", uploadReviewImages, createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.post("/:id/helpful", markHelpful);

export default router;
