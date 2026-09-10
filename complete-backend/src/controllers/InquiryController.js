
import transporter from "../config/nodemailer.js";
import Inquiry from "../models/Inquiry.js";
import {config} from 'dotenv'
config()

// @desc    Create a new trip inquiry lead
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const { name, destination, countryCode, phoneNumber, email, preferredDay, preferredTime } = req.body;

    if (!name || !destination || !phoneNumber || !email || !preferredDay || !preferredTime) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const newInquiry = await Inquiry.create({
      name,
      destination,
      countryCode: countryCode || '+91',
      phoneNumber,
      email,
      preferredDay,
      preferredTime,
    });

    const mailOptions = {
      from:  `${process.env.EMAIL_USER}`,
      to: 'nitish.modris@gmail.com',
      subject: 'Hello from Node.js!',
      text: 'This is a plain text body for the custom email.',
      html: '<b>This is an HTML body</b> with custom styling.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error occurred:', error.message);
      }
      console.log('Email sent successfully:', info.response);
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      data: newInquiry,
    });
  } catch (error) {
    console.error('Error creating Inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all trip inquiries
// @route   GET /api/inquiries
// @access  Private / Admin
export const getInquiry = async (req, res) => {
  try {
    // Fetch inquiries sorted by newest first
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Server error. Could not retrieve inquiries.' });
  }
};






// import Inquiry from "../models/Inquiry.js";
// import transporter from "../config/nodemailer.js";

// // @desc    Create a new trip inquiry lead & send email
// // @route   POST /api/inquiries
// // @access  Public
// export const createInquiry = async (req, res) => {
//   try {
//     const { name, destination, countryCode, phoneNumber, email, preferredDay, preferredTime } = req.body;

//     if (!name || !destination || !phoneNumber || !email || !preferredDay || !preferredTime) {
//       return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
//     }

//     const newInquiry = await Inquiry.create({
//       name,
//       destination,
//       countryCode: countryCode || '+91',
//       phoneNumber,
//       email,
//       preferredDay,
//       preferredTime,
//     });

//     // Email Notification Setup
//     const mailOptions = {
//       from: `"Trip Inquiries" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL, // Admin recipient email
//       subject: `New Trip Inquiry: ${name} - ${destination}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
//           <h2 style="color: #276735;">New Trip Inquiry Received!</h2>
//           <hr style="border: none; border-top: 1px solid #eee;" />
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Destination:</strong> ${destination}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${countryCode || '+91'} ${phoneNumber}</p>
//           <p><strong>Preferred Day:</strong> ${preferredDay}</p>
//           <p><strong>Preferred Time:</strong> ${preferredTime}</p>
//           <hr style="border: none; border-top: 1px solid #eee;" />
//           <p style="font-size: 12px; color: #777;">Received on ${new Date().toLocaleString()}</p>
//         </div>
//       `,
//     };

//     // Send email asynchronously (won't block response if wrapped safely)
//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error("Failed to send email notification:", err);
//       } else {
//         console.log("Inquiry notification email sent:", info.response);
//       }
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Inquiry submitted successfully!',
//       data: newInquiry,
//     });
//   } catch (error) {
//     console.error('Error creating Inquiry:', error);
//     res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
//   }
// };

// // @desc    Get all trip inquiries
// // @route   GET /api/inquiries
// // @access  Private / Admin
// export const getInquiry = async (req, res) => {
//   try {
//     const inquiries = await Inquiry.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: inquiries.length,
//       data: inquiries,
//     });
//   } catch (error) {
//     console.error('Error fetching inquiries:', error);
//     res.status(500).json({ success: false, message: 'Server error. Could not retrieve inquiries.' });
//   }
// };