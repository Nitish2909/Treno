import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails,
  handleWebhook,
} from "../controllers/paymentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Webhook – must be raw body, NOT authenticated
// Note: express.raw() is mounted on this path in server.js
router.post("/webhook", handleWebhook);

// Protected routes
router.use(verifyToken);

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyPayment);
router.get("/:paymentId", getPaymentDetails);

export default router;
