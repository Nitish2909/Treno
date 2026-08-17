import { body } from "express-validator";

// ── Create Trip 
export const validateCreateTrip = [
  body("title")
    .trim()
    .notEmpty().withMessage("Trip title is required.")
    .isLength({ min: 5, max: 150 }).withMessage("Title must be between 5 and 150 characters."),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required.")
    .isLength({ min: 50 }).withMessage("Description must be at least 50 characters."),

  body("shortDescription")
    .optional()
    .trim()
    .isLength({ max: 300 }).withMessage("Short description must not exceed 300 characters."),

  body("type")
    .notEmpty().withMessage("Trip type is required.")
    .isIn(["domestic", "international"]).withMessage("Type must be 'domestic' or 'international'."),

  body("difficulty")
    .optional()
    .isIn(["easy", "moderate", "hard"]).withMessage("Difficulty must be 'easy', 'moderate', or 'hard'."),

  body("duration.days")
    .notEmpty().withMessage("Duration in days is required.")
    .isInt({ min: 1, max: 60 }).withMessage("Duration days must be between 1 and 60."),

  body("duration.nights")
    .notEmpty().withMessage("Duration in nights is required.")
    .isInt({ min: 0, max: 60 }).withMessage("Duration nights must be between 0 and 60."),

  body("groupSize.min")
    .optional()
    .isInt({ min: 1 }).withMessage("Minimum group size must be at least 1."),

  body("groupSize.max")
    .optional()
    .isInt({ min: 1 }).withMessage("Maximum group size must be at least 1.")
    .custom((value, { req }) => {
      if (req.body.groupSize?.min && parseInt(value) < parseInt(req.body.groupSize.min)) {
        throw new Error("Maximum group size must be greater than or equal to minimum group size.");
      }
      return true;
    }),

  body("price.original")
    .notEmpty().withMessage("Original price is required.")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number."),

  body("price.discounted")
    .optional()
    .isFloat({ min: 0 }).withMessage("Discounted price must be a positive number.")
    .custom((value, { req }) => {
      if (req.body.price?.original && parseFloat(value) > parseFloat(req.body.price.original)) {
        throw new Error("Discounted price must be less than or equal to the original price.");
      }
      return true;
    }),

  body("price.currency")
    .optional()
    .isIn(["INR", "USD", "EUR", "GBP"]).withMessage("Unsupported currency."),

  body("location.from")
    .optional()
    .trim()
    .notEmpty().withMessage("Departure location cannot be empty."),

  body("location.destinations")
    .optional()
    .isArray({ min: 1 }).withMessage("At least one destination is required.")
    .customSanitizer((destinations) => 
    destinations.map((d) => (typeof d === 'string' ? d.trim().toLowerCase() : d))
  ),

  body("location.state")
    .optional()
    .trim(),

  body("location.country")
    .optional()
    .trim(),

  body("category")
    .notEmpty().withMessage("Category is required.")
    .isMongoId().withMessage("Category must be a valid ID."),

  body("highlights")
    .optional()
    .isArray().withMessage("Highlights must be an array."),

  body("inclusions")
    .optional()
    .isArray().withMessage("Inclusions must be an array."),

  body("exclusions")
    .optional()
    .isArray().withMessage("Exclusions must be an array."),

  body("tags")
    .optional()
    .isArray().withMessage("Tags must be an array."),

  body("itinerary")
    .optional()
    .isArray().withMessage("Itinerary must be an array."),

  body("itinerary.*.day")
    .optional()
    .isInt({ min: 1 }).withMessage("Itinerary day must be a positive integer."),

  body("itinerary.*.title")
    .optional()
    .trim()
    .notEmpty().withMessage("Itinerary day title is required."),

  body("faqs")
    .optional()
    .isArray().withMessage("FAQs must be an array."),

  body("faqs.*.question")
    .optional()
    .trim()
    .notEmpty().withMessage("FAQ question cannot be empty."),

  body("faqs.*.answer")
    .optional()
    .trim()
    .notEmpty().withMessage("FAQ answer cannot be empty."),

  body("startDates")
    .optional()
    .isArray().withMessage("Start dates must be an array."),

  body("startDates.*.date")
    .optional()
    .isISO8601().withMessage("Start date must be a valid ISO 8601 date."),

  body("startDates.*.slots")
    .optional()
    .isInt({ min: 0 }).withMessage("Slots must be a non-negative integer."),
];

// ── Update Trip 
export const validateUpdateTrip = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 }).withMessage("Title must be between 3 and 150 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 50 }).withMessage("Description must be at least 50 characters."),

  body("type")
    .optional()
    .isIn(["domestic", "international"]).withMessage("Type must be 'domestic' or 'international'."),

  body("difficulty")
    .optional()
    .isIn(["easy", "moderate", "hard"]).withMessage("Difficulty must be 'easy', 'moderate', or 'hard'."),

  body("duration.days")
    .optional()
    .isInt({ min: 1, max: 60 }).withMessage("Duration days must be between 1 and 60."),

  body("duration.nights")
    .optional()
    .isInt({ min: 0, max: 60 }).withMessage("Duration nights must be between 0 and 60."),

  body("price.original")
    .optional()
    .isFloat({ min: 0 }).withMessage("Price must be a positive number."),

  body("price.discounted")
    .optional()
    .isFloat({ min: 0 }).withMessage("Discounted price must be a positive number."),

  body("category")
    .optional()
    .isMongoId().withMessage("Category must be a valid ID."),
];


// import { body } from "express-validator";

// ── Create Trip ───────────────────────────────────────────────────────────────
// export const validateCreateTrip = [
//   body("title")
//     .trim()
//     .notEmpty().withMessage("Trip title is required.")
//     .isLength({ min: 5, max: 150 }).withMessage("Title must be between 5 and 150 characters."),

//   body("description")
//     .trim()
//     .notEmpty().withMessage("Description is required.")
//     .isLength({ min: 50 }).withMessage("Description must be at least 50 characters."),

//   body("shortDescription")
//     .optional()
//     .trim()
//     .isLength({ max: 300 }).withMessage("Short description must not exceed 300 characters."),

//   body("type")
//     .notEmpty().withMessage("Trip type is required.")
//     .isIn(["domestic", "international"]).withMessage("Type must be 'domestic' or 'international'."),

//   body("difficulty")
//     .optional()
//     .isIn(["easy", "moderate", "hard"]).withMessage("Difficulty must be 'easy', 'moderate', or 'hard'."),

//   body("durationDays")
//     .notEmpty().withMessage("Duration in days is required.")
//     .isInt({ min: 1, max: 60 }).withMessage("Duration days must be between 1 and 60."),

//   body("durationNights")
//     .notEmpty().withMessage("Duration in nights is required.")
//     .isInt({ min: 0, max: 60 }).withMessage("Duration nights must be between 0 and 60."),

//   body("minGroupSize")
//     .optional()
//     .isInt({ min: 1 }).withMessage("Minimum group size must be at least 1."),

//   body("maxGroupSize")
//     .optional()
//     .isInt({ min: 1 }).withMessage("Maximum group size must be at least 1."),

//   body("originalPrice")
//     .notEmpty().withMessage("Original price is required.")
//     .isFloat({ min: 0 }).withMessage("Price must be a positive number."),

//   body("discountedPrice")
//     .optional()
//     .isFloat({ min: 0 }).withMessage("Discounted price must be a positive number."),

//   body("currency")
//     .optional()
//     .isIn(["INR", "USD", "EUR", "GBP"]).withMessage("Unsupported currency."),

//   body("from")
//     .optional()
//     .trim()
//     .notEmpty().withMessage("Departure location cannot be empty."),

//   body("destinations")
//     .optional()
//     .isArray({ min: 1 }).withMessage("At least one destination is required."),

//   body("state")
//     .optional()
//     .trim(),

//   body("country")
//     .optional()
//     .trim(),

//   body("category")
//     .notEmpty().withMessage("Category is required.")
//     .isMongoId().withMessage("Category must be a valid ID."),

//   body("highlights")
//     .optional()
//     .isArray().withMessage("Highlights must be an array."),

//   body("inclusions")
//     .optional()
//     .isArray().withMessage("Inclusions must be an array."),

//   body("exclusions")
//     .optional()
//     .isArray().withMessage("Exclusions must be an array."),

//   body("tags")
//     .optional()
//     .isArray().withMessage("Tags must be an array."),

//   body("itinerary")
//     .optional()
//     .isArray().withMessage("Itinerary must be an array."),

//   body("itinerary.*.day")
//     .optional()
//     .isInt({ min: 1 }).withMessage("Itinerary day must be a positive integer."),

//   body("itinerary.*.title")
//     .optional()
//     .trim()
//     .notEmpty().withMessage("Itinerary day title is required."),

//   body("faqs")
//     .optional()
//     .isArray().withMessage("FAQs must be an array."),

//   body("faqs.*.question")
//     .optional()
//     .trim()
//     .notEmpty().withMessage("FAQ question cannot be empty."),

//   body("faqs.*.answer")
//     .optional()
//     .trim()
//     .notEmpty().withMessage("FAQ answer cannot be empty."),

//   body("startDates")
//     .optional()
//     .isArray().withMessage("Start dates must be an array."),

//   body("startDates.*.date")
//     .optional()
//     .isISO8601().withMessage("Start date must be a valid ISO 8601 date."),

//   body("startDates.*.slots")
//     .optional()
//     .isInt({ min: 0 }).withMessage("Slots must be a non-negative integer."),
// ];

// ── Update Trip ───────────────────────────────────────────────────────────────
// export const validateUpdateTrip = [
//   body("title")
//     .optional()
//     .trim()
//     .isLength({ min: 5, max: 150 }).withMessage("Title must be between 5 and 150 characters."),

//   body("description")
//     .optional()
//     .trim()
//     .isLength({ min: 50 }).withMessage("Description must be at least 50 characters."),

//   body("type")
//     .optional()
//     .isIn(["domestic", "international"]).withMessage("Type must be 'domestic' or 'international'."),

//   body("difficulty")
//     .optional()
//     .isIn(["easy", "moderate", "hard"]).withMessage("Difficulty must be 'easy', 'moderate', or 'hard'."),

//   body("durationDays")
//     .optional()
//     .isInt({ min: 1, max: 60 }).withMessage("Duration days must be between 1 and 60."),

//   body("durationNights")
//     .optional()
//     .isInt({ min: 0, max: 60 }).withMessage("Duration nights must be between 0 and 60."),

//   body("originalPrice")
//     .optional()
//     .isFloat({ min: 0 }).withMessage("Price must be a positive number."),

//   body("discountedPrice")
//     .optional()
//     .isFloat({ min: 0 }).withMessage("Discounted price must be a positive number."),

//   body("category")
//     .optional()
//     .isMongoId().withMessage("Category must be a valid ID."),
// ];