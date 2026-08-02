import express from "express";
import { createMessage } from "../controllers/messageController.js";

const router = express.Router();

/**
 * @route   POST /api/v1/messages
 * @desc    Submit a new contact/inquiry message
 * @access  Public
 */
router.post("/", createMessage);

export default router;