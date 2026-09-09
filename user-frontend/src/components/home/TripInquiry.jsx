// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSendInquiryMutation } from '../../store/api/authApi';


// const TripInquiry = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const [formData, setFormData] = useState({
//     name: '',
//     destination: '',
//     countryCode: '+91',
//     phoneNumber: '',
//     email: '',
//     preferredDay: '',
//     preferredTime: '',
//   });

//   // Timer logic to pop up every 20 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsOpen(true);
//     }, 20000); // 20000ms = 20 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Replace URL with your backend API endpoint
//       const response = await axios.post('http://localhost:5000/api/leads', formData);

//       if (response.data.success) {
//         setSubmitted(true);
//         setTimeout(() => {
//           setIsOpen(false);
//           setSubmitted(false);
//           setFormData({
//             name: '',
//             destination: '',
//             countryCode: '+91',
//             phoneNumber: '',
//             email: '',
//             preferredDay: '',
//             preferredTime: '',
//           });
//         }, 1000);
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity">
//       <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 m-3">
        
//         {/* Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 focus:outline-none"
//           aria-label="Close"
//         >
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Modal Header */}
//         <div className="mb-6 pr-6">
//           <h2 className="text-2xl font-bold text-gray-900">Let's plan your dream trip!</h2>
//           <p className="mt-2 text-sm text-gray-500 leading-relaxed">
//             Drop a few details, and we'll craft an unforgettable adventure just for you!
//           </p>
//         </div>

//         {submitted ? (
//           <div className="py-8 text-center text-green-700 font-semibold">
//             Thank you! Our experts will contact you soon.
//           </div>
//         ) : (
//           /* Form Fields */
//           <form onSubmit={handleSubmit} className="space-y-4">
            
//             {/* Name */}
//             <div>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter Name"
//                 required
//                 className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
//               />
//             </div>

//             {/* Destination Dropdown */}
//             <div>
//               <select
//                 name="destination"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
//               >
//                 <option value="" disabled>Select Destination</option>
//                 <option value="Bali">Bali</option>
//                 <option value="Europe">Europe</option>
//                 <option value="Maldives">Maldives</option>
//                 <option value="Thailand">Thailand</option>
//                 <option value="Dubai">Dubai</option>
//                 <option value="Dubai">Australia</option>
//                 <option value="Dubai">New Zeland</option>
//                 <option value="Dubai">Goa</option>
//                 <option value="Dubai">Dubai</option>
//                 <option value="Dubai">Dubai</option>
//               </select>
//             </div>

//             {/* Phone Number Input with Prefix */}
//             <div className="flex rounded-full border border-gray-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
//               <div className="flex items-center bg-gray-50 px-4 text-xs font-bold text-gray-700 border-r border-gray-200">
//                 IN +91
//               </div>
//               <input
//                 type="tel"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 required
//                 className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
//               />
//             </div>

//             {/* Email Address */}
//             <div>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter Email Address"
//                 required
//                 className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
//               />
//             </div>

//             {/* Preferred Day Dropdown */}
//             <div>
//               <select
//                 name="preferredDay"
//                 value={formData.preferredDay}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
//               >
//                 <option value="" disabled>Preferred day for the call</option>
//                 <option value="Today">Today</option>
//                 <option value="Tomorrow">Tomorrow</option>
//                 <option value="Tomorrow">2-3 Days</option>
//                 <option value="Weekend">This Weekend</option>
//               </select>
//             </div>

//             {/* Preferred Time Dropdown */}
//             <div>
//               <select
//                 name="preferredTime"
//                 value={formData.preferredTime}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
//               >
//                 <option value="" disabled>Preferred time for the call</option>
//                 <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
//                 <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
//                 <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
//                 <option value="Anytime">Anytime</option>
//               </select>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-full bg-[#276735] py-3.5 text-center font-bold text-white transition-colors hover:bg-[#1e5029] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50"
//               >
//                 {loading ? 'Submitting...' : 'Talk to our Experts'}
//               </button>
//             </div>

//           </form>
//         )}

//       </div>
//     </div>
//   );
// };

// export default TripInquiry;








import React, { useState, useEffect } from 'react';
import { useSendInquiryMutation } from '../../store/api/authApi';

const TripInquiry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // RTK Query Mutation Hook
  const [sendMessage, { isLoading }] = useSendInquiryMutation();

  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    countryCode: '+91',
    phoneNumber: '',
    email: '',
    preferredDay: '',
    preferredTime: '',
  });

  // Popup triggers every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Execute RTK Query mutation
      await sendMessage(formData).unwrap();

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          name: '',
          destination: '',
          countryCode: '+91',
          phoneNumber: '',
          email: '',
          preferredDay: '',
          preferredTime: '',
        });
      }, 2000);
    } catch (err) {
      alert(err?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-6">
          <h2 className="text-2xl font-bold text-gray-900">Let's plan your dream trip!</h2>
          <p className="mt-2 text-sm text-gray-500">
            Drop a few details, and we'll craft an unforgettable adventure just for you!
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center font-semibold text-green-700">
            Thank you! Our experts will contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              required
              className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
            />

            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
            >
              <option value="" disabled>Select Destination</option>
              <option value="Bali">Bali</option>
              <option value="Europe">Europe</option>
              <option value="Maldives">Maldives</option>
            </select>

            <div className="flex overflow-hidden rounded-full border border-gray-200">
              <div className="flex items-center bg-gray-50 px-4 text-xs font-bold text-gray-700 border-r border-gray-200">
                IN +91
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              required
              className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
            />

            <select
              name="preferredDay"
              value={formData.preferredDay}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
            >
              <option value="" disabled>Preferred day for the call</option>
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
            </select>

            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
            >
              <option value="" disabled>Preferred time for the call</option>
              <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
              <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#276735] py-3.5 font-bold text-white transition-colors hover:bg-[#1e5029] disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Talk to our Experts'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TripInquiry;