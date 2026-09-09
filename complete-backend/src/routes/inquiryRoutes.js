import express from "express"
const router = express.Router();
import { createInquiry,getInquiry } from "../controllers/InquiryController.js";

router.post('/', createInquiry);
router.get('/', getInquiry)

export default router;