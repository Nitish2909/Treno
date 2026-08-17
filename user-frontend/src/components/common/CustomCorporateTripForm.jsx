import React, { useState } from 'react';
import { User, Phone, Mail, Globe, Calendar, Users, X } from 'lucide-react';

const CustomCorporateTripForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    pax: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Banner Section */}
        <div className="relative md:w-1/2 min-h-[300px] md:min-h-full bg-cover bg-center p-6 flex flex-col justify-end text-white" 
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop')` }}>
          
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wide leading-snug">
              Request a Corporate Trip Quote
            </h2>

            {/* Pill Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full">
                Corporate offsites
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full">
                Group Bonding games
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full">
                Dedicated team
              </span>
              <span className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-3 py-1.5 rounded-full">
                Retreat to Refresh
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-6 md:p-8 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g: John Smith"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <span className="px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 flex items-center justify-center">
                  +91
                </span>
                <div className="relative flex-1 flex items-center">
                  <Phone className="absolute left-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Email Id */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Id <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative flex items-center">
                <Globe className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Select a destination"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Date and Pax Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date of Travel */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Date of Travel (tentative)
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full pl-9 pr-2 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-xs text-gray-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* No. of PAX */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  No. of PAX (tentative)
                </label>
                <div className="relative flex items-center">
                  <Users className="absolute left-3 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="pax"
                    value={formData.pax}
                    onChange={handleChange}
                    placeholder="Enter your group size"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-xs text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 active:scale-[0.99] text-black font-semibold py-3 px-4 rounded-full shadow-md transition duration-200"
            >
              Get Your Customised Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomCorporateTripForm;