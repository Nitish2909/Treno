import React, { useState } from 'react';
import { Phone, X } from 'lucide-react'; 
import corporateTourImg from "../assets/corporate-tour.png";
import CustomCorporateTripForm from '../components/common/CustomCorporateTripForm';
import CustomCorporatePop from '../components/common/CustomCorporatePop';


const CorporateTour = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Functions to handle open and close operations
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="relative w-full max-w-7xl mx-auto overflow-hidden bg-white shadow-lg rounded-2xl">
      {/* Background Banner Image */}
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] overflow-hidden">
        <img
          src={corporateTourImg}
          alt="Corporate Experiences"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative -mt-6 bg-white rounded-t-3xl pt-4 px-6 pb-8 md:px-12 md:pb-12 shadow-md">
        {/* Top Handle / Accent Bar */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

        <div className="flex flex-col items-start gap-3">
          {/* Main Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004A59]">
            Corporate Experiences: Built for Every Business Need
          </h2>

          {/* Subheading */}
          <p className="text-gray-600 text-sm md:text-base font-normal">
            Beyond the Boardroom - Curated Corporate Experiences for Teams That Mean Business
          </p>

          {/* CTA Button */}
          <button 
            onClick={openModal}
            className="mt-3 flex items-center gap-2 bg-[#FFEB00] hover:bg-[#ebd800] text-black font-semibold text-sm md:text-base py-3 px-6 rounded-full transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Get Your Customized Quote</span>
          </button>
        </div>
      </div>

      {/* Modal / Popup Layer */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={closeModal} // Closes modal when clicking backdrop
        >
          {/* Modal Content Box */}
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-8 transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the form
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Custom Corporate Form */}
            {/* <CustomCorporateTripForm onClose={closeModal} /> */}

              <CustomCorporatePop onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CorporateTour;