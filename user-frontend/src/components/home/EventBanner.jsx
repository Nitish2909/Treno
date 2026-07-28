// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import PUSHKARFAIR from "../../assets/pushkar-camel-fair.mp4"
// import CALIFORNIA from "../../assets/CALIFORNIA.mp4"
// import ARUNACHAL from "../../assets/arunachal-ziro-festival.mp4"
// const bannerData = [
//   {
//     id: 1,
//     title: "THAILAND'S",
//     mainHeader: "TOMORROWLAND",
//     tagline: "where the magic",
//     subHeader: "NEVER ENDS",
//     price: "INR 2,29,990/-",
//     duration: "5N–6D",
//     // Festival Stage & Lights
//     videoSrc: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4"
//   },
//    {
//     id: 2,
//     title: "SINGAPORE'S",
//     mainHeader: "ULTRA MUSIC FESTIVAL",
//     tagline: "futuristic beats",
//     subHeader: "MARINA BAY LIGHTS",
//     price: "INR 1,95,000/-",
//     duration: "3N–4D",
//     videoSrc: "https://www.pexels.com/download/video/5245433/"
//   },
//   {
//     id: 3,
//     title: "BALI'S",
//     mainHeader: "SUMMER FEST",
//     tagline: "feel the vibe",
//     subHeader: "ALL NIGHT LONG",
//     price: "INR 1,89,990/-",
//     duration: "4N–5D",
//     // Tropical Beach / Party Vibe
//     videoSrc: "https://www.pexels.com/download/video/36735618/"
//   },
//   // --- Indian Festivals ---
//   {
//     id: 4,
//     title: "GOA'S",
//     mainHeader: "SUNBURN FESTIVAL",
//     tagline: "asia's biggest",
//     subHeader: "EDM EXPERIENCE",
//     price: "INR 45,990/-",
//     duration: "3N–4D",
//     // Crowd Raving & Laser Lights
//     videoSrc: "https://www.pexels.com/download/video/27806813/"
//   },
//   {
//     id: 5,
//     title: "ARUNACHAL'S",
//     mainHeader: "ZIRO FESTIVAL",
//     tagline: "echoes in the valley",
//     subHeader: "MUSIC & NATURE",
//     price: "INR 38,500/-",
//     duration: "4N–5D",
//     // Outdoor Camping & Acoustic Fest Vibe
//     videoSrc: ARUNACHAL
//   },

//   {
//     id: 6,
//     title: "KASHMIR'S",
//     mainHeader: "TULIP & WINTER FEST",
//     tagline: "heaven on earth",
//     subHeader: "VALLEY CELEBRATION",
//     price: "INR 34,990/-",
//     duration: "4N–5D",
//     videoSrc: "https://www.pexels.com/download/video/26592632/"
//   },

 
// ];

// export default function EventBanner() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Auto-slide effect every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
//     }, 5000);

//     // Cleanup timer on unmount or slide change
//     return () => clearInterval(timer);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div className="relative w-full max-w-8xl mx-auto p-4 font-sans">
//       {/* Banner Container */}
//       <div className="relative overflow-hidden shadow-2xl h-[320px] md:h-[420px] w-full rounded ">
        
//         {/* Background Video */}
//         <video
//           key={bannerData[currentIndex].videoSrc} // Forces DOM reload for fresh video start
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
//         >
//           <source src={bannerData[currentIndex].videoSrc} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Dark Gradient Overlay for Readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-10" />

//         {/* Content Container */}
//         <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 text-white max-w-xl">
//           <span className="tracking-[0.25em] text-xs md:text-sm font-semibold text-gray-200 uppercase mb-1">
//             {bannerData[currentIndex].title}
//           </span>

//           <h1 className="text-3xl md:text-5xl font-black tracking-wider text-amber-200 drop-shadow-lg">
//             {bannerData[currentIndex].mainHeader}
//           </h1>

//           <p className="font-serif italic text-2xl md:text-4xl text-amber-100 my-1 font-light">
//             {bannerData[currentIndex].tagline}
//           </p>

//           <h2 className="text-2xl md:text-4xl font-extrabold tracking-widest text-amber-300 drop-shadow-md mb-6">
//             {bannerData[currentIndex].subHeader}
//           </h2>

//           {/* Pricing Box */}
//           <div className="inline-block border-2 border-amber-200/80 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-sm w-fit">
//             <div className="text-[10px] tracking-widest uppercase font-bold text-gray-300 text-center mb-0.5">
//               Starting Price
//             </div>
//             <div className="text-xl md:text-2xl font-bold text-amber-200 tracking-tight">
//               {bannerData[currentIndex].price}
//             </div>
//             <div className="flex justify-between items-center text-[9px] text-gray-300 font-semibold mt-0.5 border-t border-amber-200/40 pt-0.5 gap-3">
//               <span>Per Person</span>
//               <span className="bg-amber-200 text-black px-1.5 py-0.5 rounded-sm font-bold">
//                 {bannerData[currentIndex].duration}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Carousel Navigation Buttons */}
//         {bannerData.length > 1 && (
//           <>
//             <button 
//               onClick={handlePrev}
//               className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition cursor-pointer"
//               aria-label="Previous Slide"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>

//             <button 
//               onClick={handleNext}
//               className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 text-gray-800 p-2 rounded-full shadow-md hover:bg-white hover:scale-105 transition cursor-pointer"
//               aria-label="Next Slide"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           </>
//         )}
//       </div>

//       {/* Dynamic Pagination Dots */}
//       {bannerData.length > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-4">
//           {bannerData.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
//                 idx === currentIndex ? 'w-6 bg-amber-400' : 'w-2 bg-gray-300 hover:bg-gray-400'
//               }`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bannerData = [
  {
    id: 1,
    title: "THAILAND'S",
    mainHeader: "TOMORROWLAND",
    tagline: "where the magic",
    subHeader: "NEVER ENDS",
    price: "INR 2,29,990/-",
    duration: "5N–6D",
    imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 2,
    title: "SINGAPORE'S",
    mainHeader: "ULTRA MUSIC FESTIVAL",
    tagline: "futuristic beats",
    subHeader: "MARINA BAY LIGHTS",
    price: "INR 1,95,000/-",
    duration: "3N–4D",
    imageSrc: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 3,
    title: "BALI'S",
    mainHeader: "SUMMER FEST",
    tagline: "feel the vibe",
    subHeader: "ALL NIGHT LONG",
    price: "INR 1,89,990/-",
    duration: "4N–5D",
    imageSrc: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80"
  },
  // --- Indian Festivals ---
  {
    id: 4,
    title: "GOA'S",
    mainHeader: "SUNBURN FESTIVAL",
    tagline: "asia's biggest",
    subHeader: "EDM EXPERIENCE",
    price: "INR 45,990/-",
    duration: "3N–4D",
    imageSrc: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 5,
    title: "ARUNACHAL'S",
    mainHeader: "ZIRO FESTIVAL",
    tagline: "echoes in the valley",
    subHeader: "MUSIC & NATURE",
    price: "INR 38,500/-",
    duration: "4N–5D",
    imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 6,
    title: "KASHMIR'S",
    mainHeader: "TULIP & WINTER FEST",
    tagline: "heaven on earth",
    subHeader: "VALLEY CELEBRATION",
    price: "INR 34,990/-",
    duration: "4N–5D",
    imageSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
  },
  // --- Added New Festivals ---
  {
    id: 7,
    title: "RAJASTHAN'S",
    mainHeader: "PUSHKAR CAMEL FAIR",
    tagline: "colors of heritage",
    subHeader: "DESERT CARNIVAL",
    price: "INR 28,990/-",
    duration: "3N–4D",
    imageSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 8,
    title: "JAPAN'S",
    mainHeader: "FUJI ROCK FESTIVAL",
    tagline: "music in the mist",
    subHeader: "MOUNTAIN SOUNDS",
    price: "INR 2,15,000/-",
    duration: "4N–5D",
    imageSrc: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 9,
    title: "CALIFORNIA'S",
    mainHeader: "COACHELLA VIBES",
    tagline: "desert dreams & art",
    subHeader: "INDIO VALLEY",
    price: "INR 3,45,000/-",
    duration: "5N–6D",
    imageSrc: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 10,
    title: "LADAKH'S",
    mainHeader: "HEMIS FESTIVAL",
    tagline: "mystic masked dances",
    subHeader: "MONASTERY LIGHTS",
    price: "INR 42,990/-",
    duration: "5N–6D",
    imageSrc: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&q=80"
  },
  {
    id: 11,
    title: "DUBAI'S",
    mainHeader: "DESERT SOUNDS FEST",
    tagline: "dunes & electronic beats",
    subHeader: "ARABIAN NIGHTS",
    price: "INR 1,25,000/-",
    duration: "3N–4D",
    imageSrc: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
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
        
        {/* Background Image */}
        <img
          key={bannerData[currentIndex].imageSrc}
          src={bannerData[currentIndex].imageSrc}
          alt={bannerData[currentIndex].mainHeader}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />

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