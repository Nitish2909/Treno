// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "User is required"],
//     },
//     trip: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Trip",
//       required: [true, "Trip is required"],
//     },
//     booking: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Booking",
//       required: [true, "Booking reference is required"],
//     },
//     rating: {
//       type: Number,
//       required: [true, "Rating is required"],
//       min: [1, "Rating must be at least 1"],
//       max: [5, "Rating must not exceed 5"],
//     },
//     title: {
//       type: String,
//       trim: true,
//       maxlength: [100, "Review title must not exceed 100 characters"],
//     },
//     comment: {
//       type: String,
//       required: [true, "Review comment is required"],
//       trim: true,
//       minlength: [10, "Comment must be at least 10 characters"],
//       maxlength: [2000, "Comment must not exceed 2000 characters"],
//     },
//     images: [
//       {
//         url: { type: String, required: true },
//         public_id: { type: String, required: true },
//       },
//     ],
//     isVerified: {
//       type: Boolean,
//       default: false, // true if booking is confirmed
//     },
//     isApproved: {
//       type: Boolean,
//       default: false, // admin approval before showing publicly
//     },
//     helpfulCount: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     helpfulVotes: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     response: {
//       text: { type: String, trim: true },
//       respondedAt: { type: Date },
//       respondedBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // ── Indexes 
// reviewSchema.index({ trip: 1, user: 1 });
// reviewSchema.index({ trip: 1, isApproved: 1 });
// reviewSchema.index({ user: 1 });
// reviewSchema.index({ booking: 1 }, { unique: true }); // One review per booking

// // ── Static: Recalculate trip average rating 
// reviewSchema.statics.calculateAverageRating = async function (tripId) {
//   const stats = await this.aggregate([
//     {
//       $match: {
//         trip: new mongoose.Types.ObjectId(tripId),
//         isApproved: true,
//       },
//     },
//     {
//       $group: {
//         _id: "$trip",
//         averageRating: { $avg: "$rating" },
//         totalReviews: { $sum: 1 },
//       },
//     },
//   ]);

//   const Trip = mongoose.model("Trip");

//   if (stats.length > 0) {
//     await Trip.findByIdAndUpdate(tripId, {
//       averageRating: Math.round(stats[0].averageRating * 10) / 10,
//       totalReviews: stats[0].totalReviews,
//     });
//   } else {
//     await Trip.findByIdAndUpdate(tripId, {
//       averageRating: 0,
//       totalReviews: 0,
//     });
//   }
// };

// // ── Post-save hook: Recalculate rating 
// reviewSchema.post("save", async function () {
//   await this.constructor.calculateAverageRating(this.trip);
// });

// // ── Post-remove hook 
// reviewSchema.post("findOneAndDelete", async function (doc) {
//   if (doc) {
//     await doc.constructor.calculateAverageRating(doc.trip);
//   }
// });

// const Review = mongoose.model("Review", reviewSchema);
// export default Review;




import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip is required"],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking reference is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Review title must not exceed 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
      minlength: [10, "Comment must be at least 10 characters"],
      maxlength: [2000, "Comment must not exceed 2000 characters"],
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    helpfulVotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    response: {
      text: { type: String, trim: true },
      respondedAt: { type: Date },
      respondedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

// ── Indexes
reviewSchema.index({ trip: 1, user: 1 });
reviewSchema.index({ trip: 1, isApproved: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ booking: 1 }, { unique: true });

// ── Static: Recalculate trip average rating
reviewSchema.statics.calculateAverageRating = async function (tripId) {
  const stats = await this.aggregate([
    {
      $match: {
        trip: new mongoose.Types.ObjectId(tripId.toString()),
        isApproved: true,
      },
    },
    {
      $group: {
        _id: "$trip",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const Trip = mongoose.model("Trip");

  if (stats.length > 0) {
    await Trip.findByIdAndUpdate(tripId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      totalReviews: stats[0].totalReviews,
    });
  } else {
    await Trip.findByIdAndUpdate(tripId, {
      averageRating: 0,
      totalReviews: 0,
    });
  }
};

// ── Hooks
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.trip);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.trip);
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;