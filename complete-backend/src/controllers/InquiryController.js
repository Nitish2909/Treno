// import Inquiry from "../models/Inquiry.js";

// // @desc    Create a new trip inquiry lead
// // @route   POST /api/leads
// // @access  Public
// const createInquiry = async (req, res) => {
//   try {
//     const { name, destination, countryCode, phoneNumber, email, preferredDay, preferredTime } = req.body;

//     // Basic Validation
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

// export default createInquiry;


import Inquiry from "../models/Inquiry.js";

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