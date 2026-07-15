# Treno Travel Booking API

A production-ready REST API backend for a travel booking platform . Built with Node.js, Express, MongoDB/Mongoose, JWT authentication, Razorpay payments, Cloudinary media storage, and Nodemailer email notifications.

---

##  Quick Start

```bash
# 1. Clone and install
npm install

# 2. Set up environment variables
cp .env .env
# Edit .env with your credentials

# 3. Run in development mode
npm run dev

# 4. Run in production
npm start
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js ≥ 18, ES Modules |
| Framework | Express 4 |
| Database | MongoDB + Mongoose 8 |
| Auth | JWT (access 15m, refresh 7d) + bcryptjs |
| Payments | Razorpay |
| Media | Cloudinary v2 |
| Email | Nodemailer (SMTP) |
| Security | Helmet, CORS, mongo-sanitize, xss-clean |
| Rate Limiting | express-rate-limit |
| Validation | express-validator |
| Upload | Multer (disk -> temp -> Cloudinary) |
| Logging | Morgan |

---

## 📁 Project Structure

```
├── server.js                    # App entry point
├── src/
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   ├── cloudinary.js        # Cloudinary v2 config + helpers
│   │   └── razorpay.js          # Razorpay config
│   ├── utils/
│   │   ├── ApiError.js          # Custom error class
│   │   ├── ApiResponse.js       # Standard response wrapper
│   │   ├── asyncHandler.js      # Async try/catch wrapper
│   │   ├── emailService.js      # Nodemailer + HTML templates
│   │   └── fileCleanup.js       # Temp file deletion utilities
│   ├── middleware/
│   │   ├── auth.js              # JWT verifyToken + optionalAuth
│   │   ├── admin.js             # isAdmin role guard
│   │   ├── errorHandler.js      # Global error handler
│   │   └── upload.js            # Multer configurations
│   ├── validators/
│   │   ├── authValidator.js     # Auth route validation rules
│   │   ├── tripValidator.js     # Trip route validation rules
│   │   └── bookingValidator.js  # Booking validation rules
│   ├── models/
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Trip.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── Blog.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── tripController.js
│   │   ├── bookingController.js
│   │   ├── paymentController.js
│   │   ├── reviewController.js
│   │   ├── blogController.js
│   │   ├── categoryController.js
│   │   └── adminController.js
│   └── routes/
│       ├── authRoutes.js
│       ├── tripRoutes.js
│       ├── bookingRoutes.js
│       ├── paymentRoutes.js
│       ├── reviewRoutes.js
│       ├── blogRoutes.js
│       ├── categoryRoutes.js
│       └── adminRoutes.js
└── uploads/temp/                # Temporary file storage (auto-created)
```

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Health Check
```
GET  /health
```

---

### 🔐 Authentication  `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | ❌ | Register new user (sends verification email) |
| POST | `/login` | ❌ | Login with email/password |
| POST | `/logout` | ✅ | Logout (clears tokens) |
| POST | `/refresh` | ❌ | Refresh access token |
| GET | `/verify-email/:token` | ❌ | Verify email address |
| POST | `/forgot-password` | ❌ | Send password reset email |
| POST | `/reset-password/:token` | ❌ | Reset password with token |
| GET | `/profile` | ✅ | Get current user profile |
| PUT | `/profile` | ✅ | Update profile (name, phone, avatar) |
| PUT | `/change-password` | ✅ | Change password |
| GET | `/wishlist` | ✅ | Get user's wishlist |
| POST | `/wishlist/toggle/:tripId` | ✅ | Add/remove trip from wishlist |

**Register Body:**
```json
{
  "name": "Nitish Kuamr",
  "email": "nitish@example.com",
  "password": "Password1",
  "phone": "9876543210"
}
```

**Login Body:**
```json
{
  "email": "nitish@example.com",
  "password": "Password1"
}
```

---

### 🗺 Trips  `/api/v1/trips`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Optional | Get all trips (filter/search/sort/paginate) |
| GET | `/featured` | ❌ | Get featured trips |
| GET | `/popular` | ❌ | Get popular trips |
| GET | `/search?q=goa` | ❌ | Search trips |
| GET | `/category/:slug` | ❌ | Get trips by category slug |
| GET | `/:slug` | Optional | Get single trip by slug |
| POST | `/` | 🔑 Admin | Create trip (multipart/form-data) |
| PUT | `/:id` | 🔑 Admin | Update trip |
| DELETE | `/:id` | 🔑 Admin | Delete trip + Cloudinary assets |
| POST | `/:id/start-dates` | 🔑 Admin | Add departure date |
| PUT | `/:id/start-dates/:idx` | 🔑 Admin | Update departure date |
| POST | `/:id/pdf` | 🔑 Admin | Upload PDF brochure |

**Query Parameters for GET /trips:**

| Param | Type | Description |
|-------|------|-------------|
| `type` | string | `domestic` or `international` |
| `category` | string | Category ObjectId |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `minDays` | number | Minimum duration (days) |
| `maxDays` | number | Maximum duration (days) |
| `difficulty` | string | `easy`, `moderate`, `hard` |
| `search` | string | Full-text search |
| `sort` | string | `-createdAt`, `price.discounted`, `-averageRating`, etc. |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (max: 50, default: 12) |
| `isFeatured` | boolean | Filter featured trips |
| `isPopular` | boolean | Filter popular trips |
| `tags` | string | Comma-separated tags |
| `state` | string | State filter |
| `country` | string | Country filter |

**Create Trip (multipart/form-data) Fields:**
```
title, description, shortDescription, type, category, difficulty
duration[days], duration[nights]
groupSize[min], groupSize[max]
price[original], price[discounted], price[currency]
location[from], location[destinations][], location[state], location[country]
highlights[], inclusions[], exclusions[], thingsToCarry[], tags[]
itinerary (JSON string), faqs (JSON string), startDates (JSON string)
guide (JSON string), seo (JSON string), cancellationPolicy
thumbnail (file), images[] (files)
```

---

### 📅 Bookings  `/api/v1/bookings`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | ✅ | Create booking + Razorpay order |
| GET | `/` | ✅ | Get user's bookings (paginated) |
| GET | `/:bookingId` | ✅ | Get booking details |
| POST | `/:bookingId/cancel` | ✅ | Cancel booking |

**Create Booking Body:**
```json
{
  "tripId": "64abc123...",
  "startDate": "2025-06-15",
  "passengers": [
    {
      "name": "Nitish Kumar",
      "age": 23,
      "gender": "male",
      "idType": "aadhar",
      "idNumber": "1234-5678-9012"
    }
  ],
  "emergencyContact": {
    "name": "Priya Sharma",
    "phone": "9876543210"
  },
  "specialRequirements": "Vegetarian meals please",
  "couponCode": "TRENO10"
}
```

**Response includes:**
```json
{
  "booking": { "bookingId": "WO-20250615-12345", "finalAmount": 12999 },
  "razorpayOrder": { "id": "order_abc123", "amount": 1299900, "currency": "INR" },
  "razorpayKeyId": "rzp_test_..."
}
```

---

### 💳 Payments  `/api/v1/payments`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/create-order` | ✅ | Create/retry Razorpay order |
| POST | `/verify` | ✅ | Verify payment signature |
| GET | `/:paymentId` | ✅ | Get payment details |
| POST | `/webhook` | ❌ (signature) | Razorpay webhook handler |

**Verify Payment Body:**
```json
{
  "razorpay_order_id": "order_abc123",
  "razorpay_payment_id": "pay_xyz789",
  "razorpay_signature": "...",
  "bookingId": "WO-20250615-12345"
}
```

---

### ⭐ Reviews  `/api/v1/reviews`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/trip/:tripId` | ❌ | Get approved reviews for a trip |
| POST | `/` | ✅ | Submit review (completed bookings only) |
| PUT | `/:id` | ✅ | Update own review |
| DELETE | `/:id` | ✅ | Delete own review |
| POST | `/:id/helpful` | ✅ | Toggle helpful vote |

**Create Review Body (multipart/form-data):**
```
tripId, bookingId, rating (1-5), title, comment, images[] (optional)
```

---

### 📝 Blogs  `/api/v1/blogs`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ | Get all published blogs (paginated) |
| GET | `/:slug` | ❌ | Get blog by slug |
| POST | `/:slug/view` | ❌ | Increment view count |

---

### 🏷 Categories  `/api/v1/categories`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ | Get all active categories |
| GET | `/:id` | ❌ | Get category by ID |

---

### 🔑 Admin Routes  `/api/v1/admin`

All routes require `Authorization: Bearer <access_token>` with `role: admin`.

#### Dashboard
```
GET  /dashboard/stats           – Overview: users, trips, bookings, revenue
GET  /analytics/revenue?year=2025  – Monthly revenue breakdown
GET  /analytics/bookings        – Booking analytics
```

#### Users
```
GET    /users                   – All users (filterable)
GET    /users/:id               – User detail + booking stats
PATCH  /users/:id/role          – Update user role { "role": "admin" }
PATCH  /users/:id/deactivate    – Activate/deactivate { "isActive": false }
```

#### Bookings
```
GET    /bookings                – All bookings (admin view)
GET    /bookings/stats          – Booking statistics
GET    /bookings/:bookingId     – Booking detail
PATCH  /bookings/:bookingId/status  – Update status { "bookingStatus": "confirmed" }
```

#### Trips
```
POST   /trips                   – Create trip
PUT    /trips/:id               – Update trip
DELETE /trips/:id               – Delete trip
POST   /trips/:id/start-dates   – Add departure date
PUT    /trips/:id/start-dates/:idx  – Edit departure date
POST   /trips/:id/pdf           – Upload PDF brochure
```

#### Categories
```
GET    /categories              – All categories (paginated)
POST   /categories              – Create category
PUT    /categories/:id          – Update category
DELETE /categories/:id          – Delete category (fails if trips exist)
```

#### Blogs
```
GET    /blogs                   – All blogs (draft + published)
POST   /blogs                   – Create blog
PUT    /blogs/:id               – Update blog
DELETE /blogs/:id               – Delete blog
```

#### Reviews
```
PATCH  /reviews/:id/approve     – Approve/unapprove { "approved": true }
POST   /reviews/:id/response    – Add admin response { "text": "..." }
```

#### Payments
```
POST   /payments/:paymentId/refund  – Initiate refund { "amount": 5000 }
```

---

## 🔒 Security

- **Helmet** – Sets secure HTTP headers
- **CORS** – Configurable allowed origins
- **Rate Limiting** – 100 req/15min globally, 5 req/hour for auth routes
- **mongo-sanitize** – Prevents NoSQL injection
- **xss-clean** – Sanitizes user input against XSS
- **bcryptjs** – Password hashing with saltRounds: 12
- **JWT** – Stateless auth with short-lived access tokens (15m) + long-lived refresh tokens (7d)
- **Crypto HMAC** – Razorpay webhook and payment signature verification

---

## 📧 Email Templates

The email service (`src/utils/emailService.js`) includes:

| Template | Trigger |
|----------|---------|
| `welcome` | On registration |
| `verifyEmail` | On registration (includes verification link) |
| `forgotPassword` | On forgot-password request |
| `bookingConfirmation` | On payment verified / booking confirmed |
| `bookingCancellation` | On booking cancellation |

---

## 💰 Cancellation Policy

Refund calculated based on days until trip start:

| Days Until Trip | Refund |
|----------------|--------|
| ≥ 30 days | 100% |
| 15–29 days | 75% |
| 7–14 days | 50% |
| 3–6 days | 25% |
| < 3 days | 0% |

---

## 📦 Booking ID Format

Bookings are assigned a unique human-readable ID:

```
WO-YYYYMMDD-XXXXX
Example: WO-20250615-84721
```

---

## 🖼 Cloudinary Folder Structure

```
Treno/
├── avatars/          – User profile pictures
├── trips/
│   ├── thumbnails/   – Trip thumbnail images
│   ├── images/       – Trip gallery images
│   └── pdfs/         – Trip PDF brochures
├── blogs/
│   ├── featured/     – Blog featured images
│   └── images/       – Blog body images
├── categories/       – Category images
└── reviews/          – Review images
```

---

## 🧪 Development Notes

- Set `NODE_ENV=development` to:
  - Use `morgan` dev logging
  - Include stack traces in error responses
  - Skip auth rate limiting
- Use MongoDB Compass or Atlas to inspect data
- Multer stores uploads in `uploads/temp/` before Cloudinary upload; temp files are always deleted after processing

---

## 📄 License

MIT © Treno Team
