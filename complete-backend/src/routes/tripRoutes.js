import express from "express";
import {
  getAllTrips,
  getTripBySlug,
  getFeaturedTrips,
  getPopularTrips,
  searchTrips,
  getTripsByCategory,
  createTrip,
  updateTrip,
  deleteTrip,
  addStartDate,
  updateStartDate,
  uploadTripPDF,
  getTripById,
} from "../controllers/tripController.js";
import { verifyToken, optionalAuth } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { validateCreateTrip, validateUpdateTrip } from "../validators/tripValidator.js";
import { uploadTripImages, uploadTripPDF as uploadTripPDFMiddleware } from "../middleware/upload.js";

const router = express.Router();

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/", optionalAuth, getAllTrips);
router.get("/featured", getFeaturedTrips);
router.get("/popular", getPopularTrips);
router.get("/search", searchTrips);
router.get("/category/:slug", getTripsByCategory);
router.get("/:slug", optionalAuth, getTripBySlug);
router.get("/trip/:id",getTripById)

// ── Admin-only routes ─────────────────────────────────────────────────────────
router.use(verifyToken, isAdmin);

router.post("/", uploadTripImages, validateCreateTrip, createTrip);
router.put("/:id", uploadTripImages, validateUpdateTrip, updateTrip);
router.delete("/:id", deleteTrip);

// Start date management
router.post("/:id/start-dates", addStartDate);
router.put("/:id/start-dates/:dateIndex", updateStartDate);

// PDF brochure upload
router.post("/:id/pdf", uploadTripPDFMiddleware, uploadTripPDF);

export default router;
