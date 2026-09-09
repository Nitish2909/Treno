import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
    },
    countryCode: {
      type: String,
      default: '+91',
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    preferredDay: {
      type: String,
      required: [true, 'Preferred day is required'],
    },
    preferredTime: {
      type: String,
      required: [true, 'Preferred time is required'],
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', InquirySchema)
export default Inquiry;