import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

/**
 * @route   POST /api/v1/messages
 * @desc    Submit a new contact/inquiry message
 * @access  Public
 */
router.post("/", createMessage);
router.get("/",getMessages)

export default router;