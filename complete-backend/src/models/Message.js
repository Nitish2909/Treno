import mongoose from "mongoose";
import slugify from "slugify";

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [50, "Name must not exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [10, "Phone number must not exceed 10 characters"],
        },
        subject: {
            type: String,
            enum: ["General Inquiry", "Booking Support","Feedback",'Trip Customization', 'Partnership'],
            default: "General Inquiry",
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            maxlength: [1000, "Message must not exceed 1000 characters"],
        }
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;