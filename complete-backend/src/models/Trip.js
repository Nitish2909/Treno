import mongoose from "mongoose";
import slugify from "slugify";

//  Sub-schemas 
const mealSchema = new mongoose.Schema(
  {
    breakfast: { type: Boolean, default: false },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  { _id: false }
);

const itineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, min: 1 },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    activities: [{ type: String, trim: true }],
    accommodation: { type: String, trim: true },
    meals: mealSchema,
  },
  { _id: false }
);

const startDateSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    available: { type: Boolean, default: true },
    slots: { type: Number, default: 15, min: 0 },
  },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    experience: { type: Number, min: 0 }, // years
    languages: [{ type: String, trim: true }],
  },
  { _id: false }
);

// ── Main Trip Schema 
const tripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [150, "Title must not exceed 150 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, "Short description must not exceed 300 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    type: {
      type: String,
      enum: ["domestic", "international"],
      required: [true, "Trip type is required"],
    },
    duration: {
      days: { type: Number, required: true, min: 1 },
      nights: { type: Number, required: true, min: 0 },
    },
    groupSize: {
      min: { type: Number, default: 1, min: 1 },
      max: { type: Number, default: 25 },
    },
    price: {
      original: { type: Number, required: true, min: 0 },
      discounted: { type: Number, min: 0 },
      currency: { type: String, default: "INR" },
    },
    location: {
      from: { type: String, trim: true },
      destinations: [{ type: String, trim: true }],
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "hard"],
      default: "easy",
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    thumbnail: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    itinerary: [itineraryDaySchema],
    inclusions: [{ type: String, trim: true }],
    exclusions: [{ type: String, trim: true }],
    thingsToCarry: [{ type: String, trim: true }],
    faqs: [
      {
        question: { type: String, trim: true, required: true },
        answer: { type: String, trim: true, required: true },
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      set: (v) => Math.round(v * 10) / 10, // round to 1 decimal place
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalBookings: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    departureMonths: [
      {
        type: String,
        enum: [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December",
        ],
      },
    ],
    startDates: [startDateSchema],
    cancellationPolicy: {
      type: String,
      trim: true,
    },
    highlights: [{ type: String, trim: true }],
    guide: guideSchema,
    pdfBrochure: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    seo: {
      metaTitle: { type: String, trim: true },
      metaDescription: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ---- Indexes 
tripSchema.index({ slug: 1 }, { unique: true });
tripSchema.index({ type: 1 });
tripSchema.index({ category: 1 });
tripSchema.index({ isActive: 1 });
tripSchema.index({ isFeatured: 1 });
tripSchema.index({ isPopular: 1 });
tripSchema.index({ "price.discounted": 1 });
tripSchema.index({ averageRating: -1 });
tripSchema.index({ totalBookings: -1 });
tripSchema.index({ createdAt: -1 });
tripSchema.index({ title: "text", description: "text", tags: "text", "location.destinations": "text" });

// ----- Virtuals 
tripSchema.virtual("discountPercent").get(function () {
  if (this.price?.original && this.price?.discounted) {
    return Math.round(
      ((this.price.original - this.price.discounted) / this.price.original) * 100
    );
  }
  return 0;
});

tripSchema.virtual("effectivePrice").get(function () {
  return this.price?.discounted || this.price?.original || 0;
});

// ----- Pre-save: Slug generation 
tripSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  let baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  //--- Ensure uniqueness
  let slug = baseSlug;
  let counter = 1;
  while (await mongoose.model("Trip").findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});

// ----- Pre-save: Set shortDescription if missing 
tripSchema.pre("save", function (next) {
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 200).trimEnd() + "...";
  }
  next();
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;



// import mongoose from "mongoose";
// import slugify from "slugify";

// // ── Sub-schemas ───────────────────────────────────────────────────────────────
// const mealSchema = new mongoose.Schema(
//   {
//     breakfast: { type: Boolean, default: false },
//     lunch: { type: Boolean, default: false },
//     dinner: { type: Boolean, default: false },
//   },
//   { _id: false }
// );

// const itineraryDaySchema = new mongoose.Schema(
//   {
//     day: { type: Number, required: true, min: 1 },
//     title: { type: String, required: true, trim: true },
//     description: { type: String, trim: true },
//     activities: [{ type: String, trim: true }],
//     accommodation: { type: String, trim: true },
//     meals: mealSchema,
//   },
//   { _id: false }
// );

// const startDateSchema = new mongoose.Schema(
//   {
//     date: { type: Date, required: true },
//     available: { type: Boolean, default: true },
//     slots: { type: Number, default: 15, min: 0 },
//   },
//   { _id: false }
// );

// const guideSchema = new mongoose.Schema(
//   {
//     name: { type: String, trim: true },
//     experience: { type: Number, min: 0 }, // years
//     languages: [{ type: String, trim: true }],
//   },
//   { _id: false }
// );

// // ── Main Trip Schema ──────────────────────────────────────────────────────────
// const tripSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Trip title is required"],
//       trim: true,
//       minlength: [5, "Title must be at least 5 characters"],
//       maxlength: [150, "Title must not exceed 150 characters"],
//     },
//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//     },
//     shortDescription: {
//       type: String,
//       trim: true,
//       maxlength: [300, "Short description must not exceed 300 characters"],
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: [true, "Category is required"],
//     },
//     type: {
//       type: String,
//       enum: ["domestic", "international"],
//       required: [true, "Trip type is required"],
//     },
    
//     // FLATTENED: Matches body("durationDays") & body("durationNights")
//     durationDays: { 
//       type: Number, 
//       required: [true, "Duration in days is required."], 
//       min: 1, 
//       max: 60 
//     },
//     durationNights: { 
//       type: Number, 
//       required: [true, "Duration in nights is required."], 
//       min: 0, 
//       max: 60 
//     },
    
//     // FLATTENED: Matches body("minGroupSize") & body("maxGroupSize")
//     minGroupSize: { type: Number, default: 1, min: 1 },
//     maxGroupSize: { type: Number, default: 25, min: 1 },
    
//     // FLATTENED: Matches body("originalPrice"), body("discountedPrice") & body("currency")
//     originalPrice: { type: Number, required: [true, "Original price is required."], min: 0 },
//     discountedPrice: { type: Number, min: 0 },
//     currency: { type: String, default: "INR", enum: ["INR", "USD", "EUR", "GBP"] },
    
//     // FLATTENED: Matches body("from"), body("destinations"), body("state") & body("country")
//     from: { type: String, trim: true },
//     destinations: [{ type: String, trim: true }],
//     state: { type: String, trim: true },
//     country: { type: String, trim: true, default: "India" },
    
//     difficulty: {
//       type: String,
//       enum: ["easy", "moderate", "hard"],
//       default: "easy",
//     },
//     images: [
//       {
//         url: { type: String, required: true },
//         public_id: { type: String, required: true },
//       },
//     ],
//     thumbnail: {
//       url: { type: String, default: "" },
//       public_id: { type: String, default: "" },
//     },
//     itinerary: [itineraryDaySchema],
//     inclusions: [{ type: String, trim: true }],
//     exclusions: [{ type: String, trim: true }],
//     thingsToCarry: [{ type: String, trim: true }],
//     faqs: [
//       {
//         question: { type: String, trim: true, required: true },
//         answer: { type: String, trim: true, required: true },
//       },
//     ],
//     reviews: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Review",
//       },
//     ],
//     averageRating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//       set: (v) => Math.round(v * 10) / 10,
//     },
//     totalReviews: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     totalBookings: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },
//     isPopular: {
//       type: Boolean,
//       default: false,
//     },
//     tags: [{ type: String, trim: true, lowercase: true }],
//     departureMonths: [
//       {
//         type: String,
//         enum: [
//           "January", "February", "March", "April", "May", "June",
//           "July", "August", "September", "October", "November", "December",
//         ],
//       },
//     ],
//     startDates: [startDateSchema],
//     cancellationPolicy: {
//       type: String,
//       trim: true,
//     },
//     highlights: [{ type: String, trim: true }],
//     guide: guideSchema,
//     pdfBrochure: {
//       url: { type: String, default: "" },
//       public_id: { type: String, default: "" },
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     seo: {
//       metaTitle: { type: String, trim: true },
//       metaDescription: { type: String, trim: true },
//       keywords: [{ type: String, trim: true }],
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // ── Indexes ───────────────────────────────────────────────────────────────────
// tripSchema.index({ slug: 1 }, { unique: true });
// tripSchema.index({ type: 1 });
// tripSchema.index({ category: 1 });
// tripSchema.index({ isActive: 1 });
// tripSchema.index({ isFeatured: 1 });
// tripSchema.index({ isPopular: 1 });
// tripSchema.index({ discountedPrice: 1 }); // Updated layout path
// tripSchema.index({ averageRating: -1 });
// tripSchema.index({ totalBookings: -1 });
// tripSchema.index({ createdAt: -1 });
// tripSchema.index({ title: "text", description: "text", tags: "text", destinations: "text" }); // Updated text index target

// // ── Virtuals ──────────────────────────────────────────────────────────────────
// tripSchema.virtual("discountPercent").get(function () {
//   if (this.originalPrice && this.discountedPrice) {
//     return Math.round(
//       ((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100
//     );
//   }
//   return 0;
// });

// tripSchema.virtual("effectivePrice").get(function () {
//   return this.discountedPrice || this.originalPrice || 0;
// });

// // ── Pre-save: Slug generation ─────────────────────────────────────────────────
// tripSchema.pre("save", async function (next) {
//   if (!this.isModified("title")) return next();

//   let baseSlug = slugify(this.title, {
//     lower: true,
//     strict: true,
//     trim: true,
//   });

//   let slug = baseSlug;
//   let counter = 1;
//   while (await mongoose.model("Trip").findOne({ slug, _id: { $ne: this._id } })) {
//     slug = `${baseSlug}-${counter++}`;
//   }

//   this.slug = slug;
//   next();
// });

// // ── Pre-save: Set shortDescription if missing ─────────────────────────────────
// tripSchema.pre("save", function (next) {
//   if (!this.shortDescription && this.description) {
//     this.shortDescription = this.description.substring(0, 200).trimEnd() + "...";
//   }
//   next();
// });

// const Trip = mongoose.model("Trip", tripSchema);
// export default Trip;