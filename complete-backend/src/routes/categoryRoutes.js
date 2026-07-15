import express from "express";
import {
  getActiveCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

// Public routes
router.get("/", getActiveCategories);
router.get("/:id", getCategoryById);

export default router;
