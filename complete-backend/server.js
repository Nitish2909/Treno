import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRoutes from "./src/routes/authRoutes.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Database Connection 
connectDB();

//  Global Rate Limiter (100 req / 15 min) 
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

//  Security Middleware 
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

console.log(process.env.CORS_ORIGIN)

app.use(
  cors({
    origin: [process.env.ADMIN_URL,process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Razorpay-Signature",
    ],
  })
);

// app.use(
//   cors({
//     origin:"http://localhost:5173",
//     credentials:true
//   })
// )

app.use(fileUpload({
  useTempFiles:true
}))

app.use(globalLimiter);
app.use(mongoSanitize());
app.use(xssClean());
app.use(compression());

//  Request Parsing 
// Webhook needs raw body – mount before json parser
app.use(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//  Logging 
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Health Check 
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Treno API is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

//  API Routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/trips", tripRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/admin", adminRoutes);

//  404 Handler 
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

//  Global Error Handler 
app.use(errorHandler);

//  Start Server 
const server = app.listen(PORT, () => {
  console.log(` Treno Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.info("SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    console.info("Process terminated.");
    process.exit(0);
  });
});

export default app;
