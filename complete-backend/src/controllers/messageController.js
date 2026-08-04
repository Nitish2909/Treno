import Message from "../models/Message.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * POST /api/v1/messages
 * Creates a new user inquiry message
 */
export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // 1. Validate required fields according to Message schema
  if (!name || !email || !message || !subject) {
    throw ApiError.badRequest("Name, email, subject and message are required fields.");
  }

  // 2. Validate subject enum if provided
  const validSubjects = ["General Inquiry", "Booking Support","Feedback",'Trip Customization', 'Partnership'];
  if (subject && !validSubjects.includes(subject)) {
    throw ApiError.badRequest(
      `Invalid subject. Allowed options: ${validSubjects.join(", ")}`
    );
  }

  // 3. Create message entry in DB
  const newMessage = await Message.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  // 4. Return success response
  return new ApiResponse(
    201,
    newMessage,
    "Your message has been received successfully."
  ).send(res);
});

export const getMessages = asyncHandler(async (req,res)=>{

  const messages = await Message.find({});

  return new ApiResponse(
    200,
    messages,
    "Messages has been fetched successfully."
  ).send(res);
})