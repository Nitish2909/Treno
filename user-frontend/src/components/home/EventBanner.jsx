import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GoaSunBurn from "../../assets/Goa-Sunburn.mp4"
import PUSHKARFAIR from "../../assets/pushkar-camel-fair.mp4"
import CALIFORNIA from "../../assets/CALIFORNIA.mp4"
import ARUNACHAL from "../../assets/arunachal-ziro-festival.mp4"
const bannerData = [
  {
    id: 1,
    title: "THAILAND'S",
    mainHeader: "TOMORROWLAND",
    tagline: "where the magic",
    subHeader: "NEVER ENDS",
    price: "INR 2,29,990/-",
    duration: "5N–6D",
    // Festival Stage & Lights
    videoSrc: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4"
  },
  {
    id: 2,
    title: "BALI'S",
    mainHeader: "SUMMER FEST",
    tagline: "feel the vibe",
    subHeader: "ALL NIGHT LONG",
    price: "INR 1,89,990/-",
    duration: "4N–5D",
    // Tropical Beach / Party Vibe
    videoSrc: "https://www.pexels.com/download/video/36735618/"
  },
  // --- Indian Festivals ---
  {
    id: 3,
    title: "GOA'S",
    mainHeader: "SUNBURN FESTIVAL",
    tagline: "asia's biggest",
    subHeader: "EDM EXPERIENCE",
    price: "INR 45,990/-",
    duration: "3N–4D",
    // Crowd Raving & Laser Lights
    videoSrc: GoaSunBurn
  },
  {
    id: 4,
    title: "ARUNACHAL'S",
    mainHeader: "ZIRO FESTIVAL",
    tagline: "echoes in the valley",
    subHeader: "MUSIC & NATURE",
    price: "INR 38,500/-",
    duration: "4N–5D",
    // Outdoor Camping & Acoustic Fest Vibe
    videoSrc: ARUNACHAL
  },
  {
    id: 5,
    title: "PUSHKAR'S",
    mainHeader: "CAMEL FAIR & FEST",
    tagline: "experience rich",
    subHeader: "RAJASTHANI HERITAGE",
    price: "INR 29,990/-",
    duration: "3N–4D",
    // Desert Sunset Vibe
    videoSrc: PUSHKARFAIR
  },
  {
    id: 6,
    title: "KASHMIR'S",
    mainHeader: "TULIP & WINTER FEST",
    tagline: "heaven on earth",
    subHeader: "VALLEY CELEBRATION",
    price: "INR 34,990/-",
    duration: "4N–5D",
    videoSrc: "https://www.pexels.com/download/video/26592632/"
  },
  // --- International Festivals ---
  {
    id: 7,
    title: "CALIFORNIA'S",
    mainHeader: "COACHELLA",
    tagline: "desert beats &",
    subHeader: "ICONIC ART",
    price: "INR 3,49,990/-",
    duration: "6N–7D",
    // Concert Stage Crowd
    videoSrc: CALIFORNIA
  },

  {
    id: 8,
    title: "SINGAPORE'S",
    mainHeader: "ULTRA MUSIC FESTIVAL",
    tagline: "futuristic beats",
    subHeader: "MARINA BAY LIGHTS",
    price: "INR 1,95,000/-",
    duration: "3N–4D",
    videoSrc: "https://www.pexels.com/download/video/5245433/"
  },
  {
    id: 9,
    title: "MALAYSIA'S",
    mainHeader: "RAINFOREST MUSIC FEST",
    tagline: "rhythms of nature",
    subHeader: "BORNEO SOUNDS",
    price: "INR 1,25,000/-",
    duration: "4N–5D",
    videoSrc: "https://www.pexels.com/download/video/3895039/"
  },

  {
    id: 10,
    title: "EGYPT'S",
    mainHeader: "SUN FESTIVAL",
    tagline: "ancient wonders &",
    subHeader: "ABU SIMBEL LIGHTS",
    price: "INR 1,75,000/-",
    duration: "5N–6D",
    videoSrc: "https://videos.pexels.com/video-files/4125883/4125883-hd_1920_1080_25fps"
  },
  {
    id: 11,
    title: "NEW ZEALAND'S",
    mainHeader: "RHYTHM & VINES",
    tagline: "first to see the sun",
    subHeader: "NEW YEAR MUSIC FEST",
    price: "INR 3,15,000/-",
    duration: "6N–7D",
    videoSrc: "https://videos.pexels.com/video-files/2882110/2882110-hd_1920_1080_24fps.mp4"
  },
  {
    id: 12,
    title: "ICELAND'S",
    mainHeader: "SECRET SOLSTICE",
    tagline: "party under the",
    subHeader: "MIDNIGHT SUN",
    price: "INR 2,95,000/-",
    duration: "5N–6D",
    videoSrc: "https://www.pexels.com/download/video/29415864/"
  }
 
];

export default function EventBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000);

    // Cleanup timer on unmount or slide change
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-8xl mx-auto p-4 font-sans">
      {/* Banner Container */}
      <div className="relative overflow-hidden shadow-2xl h-[320px] md:h-[420px] w-full rounded ">
        
        {/* Background Video */}
        <video
          key={bannerData[currentIndex].videoSrc} // Forces DOM reload for fresh video start
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        >
          <source src={bannerData[currentIndex].videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />

        {/* Content Container */}
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 text-white max-w-xl">
          <span className="tracking-[0.25em] text-xs md:text-sm font-semibold text-gray-200 uppercase mb-1">
            {bannerData[currentIndex].title}
          </span>

          <h1 className="text-3xl md:text-5xl font-black tracking-wider text-amber-200 drop-shadow-lg">
            {bannerData[currentIndex].mainHeader}
          </h1>

          <p className="font-serif italic text-2xl md:text-4xl text-amber-100 my-1 font-light">
            {bannerData[currentIndex].tagline}
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-widest text-amber-300 drop-shadow-md mb-6">
            {bannerData[currentIndex].subHeader}
          </h2>

          {/* Pricing Box */}
          <div className="inline-block border-2 border-amber-200/80 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-sm w-fit">
            <div className="text-[10px] tracking-widest uppercase font-bold text-gray-300 text-center mb-0.5">
              Starting Price
            </div>
            <div className="text-xl md:text-2xl font-bold text-amber-200 tracking-tight">
              {bannerData[currentIndex].price}
            </div>
            <div className="flex justify-between items-center text-[9px] text-gray-300 font-semibold mt-0.5 border-t border-amber-200/40 pt-0.5 gap-3">
              <span>Per Person</span>
              <span className="bg-amber-200 text-black px-1.5 py-0.5 rounded-sm font-bold">
                {bannerData[currentIndex].duration}
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        {bannerData.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dynamic Pagination Dots */}
      {bannerData.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {bannerData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}