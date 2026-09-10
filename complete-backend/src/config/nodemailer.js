import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or use host/port for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use an App Password if using Gmail
  },
});

export default transporter;