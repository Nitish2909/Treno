import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ─── Transporter -----------
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// ─── Base HTML template wrapper ───────────────────────────────────────────────
const htmlWrapper = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Treno</title>
  <style>
    body { margin: 0; padding: 0; background: #f4f6f9; font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); padding: 32px 40px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .body h2 { font-size: 22px; margin: 0 0 16px; color: #1a1a2e; }
    .body p { font-size: 15px; line-height: 1.7; color: #555; margin: 0 0 16px; }
    .info-box { background: #f8f9ff; border-left: 4px solid #FF6B35; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 24px 0; }
    .info-box p { margin: 4px 0; font-size: 14px; }
    .info-box strong { color: #1a1a2e; }
    .btn { display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: #fff !important; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; margin: 16px 0; }
    .divider { border: none; border-top: 1px solid #eee; margin: 28px 0; }
    .footer { background: #f8f9ff; padding: 24px 40px; text-align: center; font-size: 13px; color: #999; }
    .footer a { color: #FF6B35; text-decoration: none; }
    table.detail-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    table.detail-table th, table.detail-table td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #eee; font-size: 14px; }
    table.detail-table th { background: #f8f9ff; color: #666; font-weight: 600; }
    table.detail-table td { color: #333; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #e8f5e9; color: #2e7d32; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌍 Treno</h1>
      <p>Explore India & Beyond</p>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Treno. All rights reserved.</p>
      <p>
        <a href="${process.env.FRONTEND_URL || "https://tripwithtreno.com"}">Visit Website</a> &nbsp;|&nbsp;
        <a href="mailto:${process.env.SMTP_USER}">Contact Support</a>
      </p>
      <p style="margin-top:12px;font-size:11px;">
        You're receiving this email because you registered or made a booking on Treno.
      </p>
    </div>
  </div>
</body>
</html>
`;

// ─── Email Templates ──────────────────────────────────────────────────────────

const templates = {
  welcome: ({ name }) => ({
    subject: "Welcome to Treno! 🌍 Your Adventure Begins Here",
    html: htmlWrapper(`
      <h2>Welcome aboard, ${name}! 🎉</h2>
      <p>We're thrilled to have you join the Treno family. Your account has been created successfully.</p>
      <p>With Treno, you can:</p>
      <ul style="padding-left:20px;color:#555;line-height:2;">
        <li>Browse 500+ curated domestic and international tours</li>
        <li>Book hassle-free group trips</li>
        <li>Get expert travel guidance</li>
        <li>Experience India like never before</li>
      </ul>
      <div style="text-align:center;margin:32px 0;">
        <a class="btn" href="${process.env.FRONTEND_URL || "https://tripwithtreno"}/trips">Explore Trips</a>
      </div>
      <hr class="divider" />
      <p style="font-size:13px;color:#999;">If you didn't create this account, please ignore this email or contact our support team.</p>
    `),
  }),

  verifyEmail: ({ name, verificationUrl }) => ({
    subject: "Verify Your Email Address – Treno",
    html: htmlWrapper(`
      <h2>Hi ${name}, verify your email</h2>
      <p>Almost there! Click the button below to verify your email address and activate your account.</p>
      <div style="text-align:center;margin:32px 0;">
        <a class="btn" href="${verificationUrl}">Verify Email Address</a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="background:#f4f6f9;padding:12px;border-radius:6px;word-break:break-all;font-size:13px;">${verificationUrl}</p>
      <p style="font-size:13px;color:#999;">This link expires in 24 hours. If you didn't request this, please ignore this email.</p>
    `),
  }),

  forgotPassword: ({ name, resetUrl }) => ({
    subject: "Reset Your Treno Password",
    html: htmlWrapper(`
      <h2>Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset the password for your Treno account. Click the button below to reset it.</p>
      <div style="text-align:center;margin:32px 0;">
        <a class="btn" href="${resetUrl}">Reset Password</a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="background:#f4f6f9;padding:12px;border-radius:6px;word-break:break-all;font-size:13px;">${resetUrl}</p>
      <div class="info-box">
        <p>⏰ <strong>This link expires in 1 hour.</strong></p>
        <p>If you didn't request a password reset, please ignore this email. Your password will not change.</p>
      </div>
    `),
  }),

  bookingConfirmation: ({ name, booking, trip }) => ({
    subject: `Booking Confirmed! ${trip.title} – ${booking.bookingId}`,
    html: htmlWrapper(`
      <h2>Your booking is confirmed! 🎊</h2>
      <p>Hi ${name}, great news – your trip has been successfully booked. Here are your booking details:</p>
      <div class="info-box">
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Status:</strong> <span class="badge">Confirmed</span></p>
      </div>
      <table class="detail-table">
        <tr><th>Trip</th><td>${trip.title}</td></tr>
        <tr><th>Start Date</th><td>${new Date(booking.startDate).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td></tr>
        <tr><th>Passengers</th><td>${booking.numberOfPassengers}</td></tr>
        <tr><th>Duration</th><td>${trip.duration?.days || "N/A"} Days / ${trip.duration?.nights || "N/A"} Nights</td></tr>
        <tr><th>Amount Paid</th><td>₹${booking.finalAmount?.toLocaleString("en-IN")}</td></tr>
      </table>
      <p>Our team will reach out to you with further details about your trip. If you have any questions, don't hesitate to contact us.</p>
      <div style="text-align:center;margin:32px 0;">
        <a class="btn" href="${process.env.FRONTEND_URL || "https://tripwithtreno"}/bookings/${booking.bookingId}">View Booking Details</a>
      </div>
      <hr class="divider" />
      <p style="font-size:13px;color:#999;">Need help? Email us at <a href="mailto:${process.env.SMTP_USER}" style="color:#FF6B35;">${process.env.SMTP_USER}</a></p>
    `),
  }),

  bookingCancellation: ({ name, booking, trip }) => ({
    subject: `Booking Cancelled – ${booking.bookingId}`,
    html: htmlWrapper(`
      <h2>Booking Cancellation</h2>
      <p>Hi ${name},</p>
      <p>We're sorry to see you go! Your booking has been successfully cancelled.</p>
      <div class="info-box">
        <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        <p><strong>Trip:</strong> ${trip.title}</p>
        <p><strong>Cancellation Reason:</strong> ${booking.cancellationReason || "Not specified"}</p>
      </div>
      ${booking.refundAmount > 0
        ? `<p>A refund of <strong>₹${booking.refundAmount?.toLocaleString("en-IN")}</strong> will be credited to your original payment method within <strong>5-7 business days</strong>.</p>`
        : `<p>No refund is applicable as per our cancellation policy.</p>`
      }
      <p>We hope to host you on a future adventure. Browse our other trips:</p>
      <div style="text-align:center;margin:32px 0;">
        <a class="btn" href="${process.env.FRONTEND_URL || "https://tripwittreno.com"}/trips">Explore More Trips</a>
      </div>
    `),
  }),
};

// ─── Send Email Function ──────────────────────────────────────────────────────

/**
 * Send an email using a named template
 * @param {string} to         - Recipient email address
 * @param {string} template   - Template name (welcome|verifyEmail|forgotPassword|bookingConfirmation|bookingCancellation)
 * @param {object} data       - Template data variables
 */
export const sendEmail = async (to, template, data) => {
  try {
    const transporter = createTransporter();
    const { subject, html } = templates[template](data);

    const mailOptions = {
      from: `"Treno Travel" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(` Email send failed to ${to}:`, error.message);
    // Don't throw – email failures should not break the main flow
    return { success: false, error: error.message };
  }
};

/**
 * Send a custom plain email (no template)
 */
export const sendCustomEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"Treno Travel" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Custom email send failed:", error.message);
    return { success: false, error: error.message };
  }
};

export default { sendEmail, sendCustomEmail };
