import { body } from "express-validator";

// ── Create Booking ────────────────────────────────────────────────────────────
export const validateCreateBooking = [
  body("tripId")
    .notEmpty().withMessage("Trip ID is required.")
    .isMongoId().withMessage("Trip ID must be a valid MongoDB ObjectId."),

  body("startDate")
    .notEmpty().withMessage("Start date is required.")
    .isISO8601().withMessage("Start date must be a valid date.")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Start date must be in the future.");
      }
      return true;
    }),

  body("passengers")
    .notEmpty().withMessage("Passenger details are required.")
    .isArray({ min: 1 }).withMessage("At least one passenger is required."),

  body("passengers.*.name")
    .trim()
    .notEmpty().withMessage("Passenger name is required.")
    .isLength({ min: 2, max: 60 }).withMessage("Passenger name must be between 2 and 60 characters."),

  body("passengers.*.age")
    .notEmpty().withMessage("Passenger age is required.")
    .isInt({ min: 1, max: 120 }).withMessage("Passenger age must be between 1 and 120."),

  body("passengers.*.gender")
    .notEmpty().withMessage("Passenger gender is required.")
    .isIn(["male", "female", "other"]).withMessage("Gender must be 'male', 'female', or 'other'."),

  body("passengers.*.idType")
    .notEmpty().withMessage("ID type is required for each passenger.")
    .isIn(["aadhar", "passport", "driving_license", "voter_id", "pan"])
    .withMessage("ID type must be one of: aadhar, passport, driving_license, voter_id, pan."),

  body("passengers.*.idNumber")
    .trim()
    .notEmpty().withMessage("ID number is required for each passenger.")
    .isLength({ min: 4, max: 20 }).withMessage("ID number must be between 4 and 20 characters."),

  body("emergencyContact.name")
    .trim()
    .notEmpty().withMessage("Emergency contact name is required.")
    .isLength({ min: 2, max: 60 }).withMessage("Emergency contact name must be between 2 and 60 characters."),

  body("emergencyContact.phone")
    .trim()
    .notEmpty().withMessage("Emergency contact phone is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Emergency contact phone must be a valid 10-digit Indian mobile number."),

  body("specialRequirements")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Special requirements must not exceed 500 characters."),

  body("couponCode")
    .optional()
    .trim()
    .isLength({ max: 30 }).withMessage("Coupon code must not exceed 30 characters."),
];

// ── Cancel Booking ────────────────────────────────────────────────────────────
export const validateCancelBooking = [
  body("cancellationReason")
    .trim()
    .notEmpty().withMessage("Cancellation reason is required.")
    .isLength({ min: 10, max: 500 }).withMessage("Cancellation reason must be between 10 and 500 characters."),
];
