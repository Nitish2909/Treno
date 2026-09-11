
// import React, { useState, useEffect } from 'react';
// import { useSendInquiryMutation } from '../../store/api/authApi';

// const TripInquiry = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   // RTK Query Mutation Hook
//   const [sendMessage, { isLoading }] = useSendInquiryMutation();

//   const [formData, setFormData] = useState({
//     name: '',
//     destination: '',
//     countryCode: '+91',
//     phoneNumber: '',
//     email: '',
//     preferredDay: '',
//     preferredTime: '',
//   });

//   // Popup triggers every 20 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsOpen(true);
//     }, 20000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Execute RTK Query mutation
//       await sendMessage(formData).unwrap();

//       setSubmitted(true);
//       setTimeout(() => {
//         setIsOpen(false);
//         setSubmitted(false);
//         setFormData({
//           name: '',
//           destination: '',
//           countryCode: '+91',
//           phoneNumber: '',
//           email: '',
//           preferredDay: '',
//           preferredTime: '',
//         });
//       }, 1000);
//     } catch (err) {
//       alert(err?.data?.message || 'Something went wrong. Please try again.');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        
//         {/* Close Button */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 focus:outline-none"
//         >
//           ✕
//         </button>

//         {/* Modal Header */}
//         <div className="mb-6 pr-6">
//           <h2 className="text-2xl font-bold text-gray-900">Let's plan your dream trip!</h2>
//           <p className="mt-2 text-sm text-gray-500">
//             Drop a few details, and we'll craft an unforgettable adventure just for you!
//           </p>
//         </div>

//         {submitted ? (
//           <div className="py-8 text-center font-semibold text-green-700">
//             Thank you! Our experts will contact you soon.
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter Name"
//               required
//               className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
//             />

//             <select
//               name="destination"
//               value={formData.destination}
//               onChange={handleChange}
//               required
//               className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
//             >
//               <option value="" disabled>Select Destination</option>
//               <option value="Bali">Bali</option>
//               <option value="Europe">Europe</option>
//               <option value="Maldives">Maldives</option>
//             </select>

//             <div className="flex overflow-hidden rounded-full border border-gray-200">
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

//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter Email Address"
//               required
//               className="w-full rounded-full border border-gray-200 px-5 py-3 text-gray-700 placeholder-gray-400 focus:border-emerald-600 focus:outline-none"
//             />

//             <select
//               name="preferredDay"
//               value={formData.preferredDay}
//               onChange={handleChange}
//               required
//               className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
//             >
//               <option value="" disabled>Preferred day for the call</option>
//               <option value="Today">Today</option>
//               <option value="Tomorrow">Tomorrow</option>
//             </select>

//             <select
//               name="preferredTime"
//               value={formData.preferredTime}
//               onChange={handleChange}
//               required
//               className="w-full rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-700 focus:border-emerald-600 focus:outline-none"
//             >
//               <option value="" disabled>Preferred time for the call</option>
//               <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
//               <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
//             </select>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full rounded-full bg-[#276735] py-3.5 font-bold text-white transition-colors hover:bg-[#1e5029] disabled:opacity-50"
//             >
//               {isLoading ? 'Submitting...' : 'Talk to our Experts'}
//             </button>
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
      }, 1000);
    } catch (err) {
      alert(err?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 transition-all">
        
        {/* Subtle Decorative Background Element (Light Theme) */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-emerald-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-teal-50 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="relative mb-6 pr-8">
          <span className="inline-block rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-semibold text-emerald-800 mb-2">
            ✈️ Plan Your Trip
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Let's plan your <span className="text-emerald-600">dream trip!</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Drop a few details below and our travel experts will craft an unforgettable adventure just for you.
          </p>
        </div>

        {submitted ? (
          <div className="my-8 flex flex-col items-center justify-center py-8 text-center rounded-2xl bg-emerald-50 border border-emerald-100 p-6">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white text-xl">
              ✓
            </div>
            <h3 className="text-lg font-bold text-emerald-900">Request Sent!</h3>
            <p className="mt-1 text-sm text-emerald-700">
              Thank you! Our travel experts will contact you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative space-y-3.5">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
              />
            </div>

            <div>
              <select
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
              >
                <option value="" disabled>Select Destination</option>
                <option value="Bali">Bali</option>
                <option value="Europe">Europe</option>
                <option value="Maldives">Maldives</option>
              </select>
            </div>

            <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all">
              <div className="flex items-center bg-slate-100/80 px-4 text-xs font-semibold text-slate-600 border-r border-slate-200 shrink-0">
                IN +91
              </div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                name="preferredDay"
                value={formData.preferredDay}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
              >
                <option value="" disabled>Preferred Day</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
              </select>

              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
              >
                <option value="" disabled>Preferred Time</option>
                <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Talk to Our Experts'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TripInquiry;