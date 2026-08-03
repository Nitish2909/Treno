import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Temp Upload Directory 
const TEMP_DIR = path.join(__dirname, "../../uploads/temp");

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ─── Storage Engine 
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// ─── File Filters 
const imageFilter = (_req, file, cb) => {
  const ALLOWED_TYPES = /jpeg|jpg|png|gif|webp|avif/;
  const extOk = ALLOWED_TYPES.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = ALLOWED_TYPES.test(file.mimetype.split("/")[1]);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, JPG, PNG, GIF, WEBP, AVIF) are allowed."), false);
  }
};

const pdfFilter = (_req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const imagePdfFilter = (_req, file, cb) => {
  const imgTypes = /jpeg|jpg|png|gif|webp|avif/;
  const isImage =
    imgTypes.test(path.extname(file.originalname).toLowerCase()) &&
    imgTypes.test(file.mimetype.split("/")[1]);
  const isPdf = file.mimetype === "application/pdf";

  if (isImage || isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only image files and PDFs are allowed."), false);
  }
};

// ─── Multer Instances 
const imageUploader = multer({
  storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    files: 10,
  },
});

const pdfUploader = multer({
  storage,
  fileFilter: pdfFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
    files: 1,
  },
});

const mixedUploader = multer({
  storage,
  fileFilter: imagePdfFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 10,
  },
});

// ─── Exported Upload Helpers 

/** Single image upload – field name: "image" by default */
export const uploadSingleImage = (fieldName = "image") =>
  imageUploader.single(fieldName);

/** Multiple images – up to `maxCount` files from field `fieldName` */
export const uploadMultipleImages = (fieldName = "images", maxCount = 10) =>
  imageUploader.array(fieldName, maxCount);

/** Multiple different fields */
export const uploadFields = (fields = []) =>
  mixedUploader.fields(fields);

/** Single PDF upload */
export const uploadSinglePDF = (fieldName = "document") =>
  pdfUploader.single(fieldName);

/** Mixed (images + PDF) any */
export const uploadMixed = (fields = []) =>
  mixedUploader.fields(fields);

// ─── Pre-configured upload sets 

/** For trip creation: thumbnail + images gallery */
export const uploadTripImages = uploadFields([
  { name: "thumbnail", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

/** For blog: featured image + body images */
export const uploadBlogImages = uploadFields([
  { name: "featuredImage", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

/** For user avatar */
export const uploadAvatar = uploadSingleImage("avatar");

/** For review images */
export const uploadReviewImages = uploadMultipleImages("images", 5);

/** For trip PDF (itinerary, etc.) */
export const uploadTripPDF = uploadSinglePDF("pdf");

export default {
  uploadSingleImage,
  uploadMultipleImages,
  uploadFields,
  uploadSinglePDF,
  uploadMixed,
  uploadTripImages,
  uploadBlogImages,
  uploadAvatar,
  uploadReviewImages,
  uploadTripPDF,
};
