import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title must not exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, "Excerpt must not exceed 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      trim: true,
      enum: [
        "travel-tips",
        "destination-guide",
        "adventure",
        "food-travel",
        "budget-travel",
        "solo-travel",
        "group-travel",
        "culture",
        "photography",
        "news",
        "other",
      ],
      default: "other",
    },
    tags: [{ type: String, trim: true, lowercase: true }],
    featuredImage: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    publishedAt: {
      type: Date,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    readTime: {
      type: Number, // in minutes
      default: 0,
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

// ── Indexes ───────────────────────────────────────────────────────────────────
blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ status: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ title: "text", content: "text", tags: "text" });

// ── Pre-save: Slug + readTime + publishedAt ───────────────────────────────────
blogSchema.pre("save", async function (next) {
  // Slug
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let counter = 1;
    while (
      await mongoose.model("Blog").findOne({ slug, _id: { $ne: this._id } })
    ) {
      slug = `${baseSlug}-${counter++}`;
    }
    this.slug = slug;
  }

  // Calculate read time (avg 200 words/min)
  if (this.isModified("content") && this.content) {
    const wordCount = this.content
      .replace(/<[^>]*>/g, "") // strip HTML tags
      .split(/\s+/)
      .filter(Boolean).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // Auto-extract excerpt if missing
  if (!this.excerpt && this.content) {
    const plainText = this.content.replace(/<[^>]*>/g, "");
    this.excerpt = plainText.substring(0, 200).trimEnd() + "...";
  }

  // Set publishedAt when first published
  if (this.isModified("status") && this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
