// import React from 'react'
// import { motion } from 'framer-motion'
// import { ArrowRight, Star, MapPin, Clock } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useGetFeaturedTripsQuery } from '../../store/api/tripApi.js'
// import { CardSkeletonGrid } from '../common/Loader.jsx'
// import TripCard from '../trip/TripCard.jsx'
// import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

// const FALLBACK_TRIPS = [
//   {
//     _id: '1', title: 'Manali to Leh Bike Expedition', slug: 'manali-leh-bike-expedition',
//     category: 'Adventure', type: 'domestic', duration: { days: 10, nights: 9 },
//     difficulty: 'hard', price: { original: 25000, discounted: 18999 },
//     images: [{ url: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg', alt: 'Manali Leh' }],
//     rating: { average: 4.8, count: 234 }, location: { from: 'Manali', destinations: ['Leh'] },
//     isFeatured: true, isPopular: true,
//   },
//   {
//     _id: '2', title: 'Kerala Backwaters & Beaches', slug: 'kerala-backwaters-beaches',
//     category: 'Beach', type: 'domestic', duration: { days: 6, nights: 5 },
//     difficulty: 'easy', price: { original: 15000, discounted: 10999 },
//     images: [{ url: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg', alt: 'Kerala' }],
//     rating: { average: 4.6, count: 189 }, location: { from: 'Kochi', destinations: ['Alleppey', 'Varkala'] },
//     isFeatured: true, isPopular: false,
//   },
//   {
//     _id: '3', title: 'Rajasthan Royal Heritage Tour', slug: 'rajasthan-royal-heritage-tour',
//     category: 'Cultural', type: 'domestic', duration: { days: 8, nights: 7 },
//     difficulty: 'easy', price: { original: 20000, discounted: 14999 },
//     images: [{ url: 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg', alt: 'Rajasthan' }],
//     rating: { average: 4.7, count: 312 }, location: { from: 'Delhi', destinations: ['Jaipur', 'Jodhpur', 'Udaipur'] },
//     isFeatured: true, isPopular: true,
//   },
//   {
//     _id: '4', title: 'Spiti Valley Cold Desert Trek', slug: 'spiti-valley-cold-desert-trek',
//     category: 'Trekking', type: 'domestic', duration: { days: 7, nights: 6 },
//     difficulty: 'moderate', price: { original: 18000, discounted: 13499 },
//     images: [{ url: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg', alt: 'Spiti' }],
//     rating: { average: 4.9, count: 156 }, location: { from: 'Shimla', destinations: ['Kaza', 'Key Monastery'] },
//     isFeatured: true, isPopular: false,
//   },
//   {
//     _id: '5', title: 'Goa Party & Relaxation Package', slug: 'goa-party-relaxation',
//     category: 'Beach', type: 'domestic', duration: { days: 5, nights: 4 },
//     difficulty: 'easy', price: { original: 12000, discounted: 8999 },
//     images: [{ url: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg', alt: 'Goa' }],
//     rating: { average: 4.5, count: 421 }, location: { from: 'Mumbai', destinations: ['North Goa', 'South Goa'] },
//     isFeatured: false, isPopular: true,
//   },
//   {
//     _id: '6', title: 'Andaman Islands Escape', slug: 'andaman-islands-escape',
//     category: 'Beach', type: 'domestic', duration: { days: 6, nights: 5 },
//     difficulty: 'easy', price: { original: 28000, discounted: 22499 },
//     images: [{ url: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg', alt: 'Andaman' }],
//     rating: { average: 4.8, count: 198 }, location: { from: 'Chennai', destinations: ['Port Blair', 'Havelock'] },
//     isFeatured: true, isPopular: true,
//   },
// ]

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// }

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1, y: 0,
//     transition: { duration: 0.5, ease: 'easeOut' },
//   },
// }

// export default function FeaturedTrips() {
//   const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })
//   const { data, isLoading, isError } = useGetFeaturedTripsQuery(6)

//   const trips = isError || !data?.trips ? FALLBACK_TRIPS : data.trips

//   return (
//     <section className="py-20 bg-white" ref={ref}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-14"
//         >
//           <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-sm font-semibold mb-4 border border-amber-200">
//             Curated For You
//           </span>
//           <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-bold text-slate-800 mb-4">
//             Featured Trips
//           </h2>
//           <p className="text-slate-500 text-lg max-w-2xl mx-auto">
//             Handpicked journeys for unforgettable experiences — from Himalayan peaks to tropical shores
//           </p>
//           {/* Decorative underline */}
//           <div className="flex items-center justify-center mt-6 gap-2">
//             <div className="w-12 h-1 bg-amber-500 rounded-full" />
//             <div className="w-3 h-3 bg-amber-400 rounded-full" />
//             <div className="w-12 h-1 bg-amber-500 rounded-full" />
//           </div>
//         </motion.div>

//         {/* Trip Cards */}
//         {isLoading ? (
//           <CardSkeletonGrid count={6} />
//         ) : (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate={isVisible ? 'visible' : 'hidden'}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
//           >
//             {trips.map((trip) => (
//               <motion.div key={trip._id} variants={itemVariants}>
//                 <TripCard trip={trip} />
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* View All Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isVisible ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="text-center mt-14"
//         >
//           <Link
//             to="/trips"
//             className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_25px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 group"
//           >
//             View All Trips
//             <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
//           </Link>

//         </motion.div>
//       </div>
//     </section>
//   )
// }

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetFeaturedTripsQuery } from "../../store/api/tripApi.js";
import { CardSkeletonGrid } from "../common/Loader.jsx";
import TripCard from "../trip/TripCard.jsx";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";

const FALLBACK_TRIPS = [
  {
    _id: "1",
    title: "Manali to Leh Bike Expedition",
    slug: "manali-leh-bike-expedition",
    category: "Adventure",
    type: "domestic",
    duration: { days: 10, nights: 9 },
    difficulty: "hard",
    price: { original: 25000, discounted: 18999 },
    images: [
      {
        url: "https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg",
        alt: "Manali Leh",
      },
    ],
    rating: { average: 4.8, count: 234 },
    location: { from: "Manali", destinations: ["Leh"] },
    isFeatured: true,
    isPopular: true,
  },
  {
    _id: "2",
    title: "Kerala Backwaters & Beaches",
    slug: "kerala-backwaters-beaches",
    category: "Beach",
    type: "domestic",
    duration: { days: 6, nights: 5 },
    difficulty: "easy",
    price: { original: 15000, discounted: 10999 },
    images: [
      {
        url: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg",
        alt: "Kerala",
      },
    ],
    rating: { average: 4.6, count: 189 },
    location: { from: "Kochi", destinations: ["Alleppey", "Varkala"] },
    isFeatured: true,
    isPopular: false,
  },
  {
    _id: "3",
    title: "Rajasthan Royal Heritage Tour",
    slug: "rajasthan-royal-heritage-tour",
    category: "Cultural",
    type: "domestic",
    duration: { days: 8, nights: 7 },
    difficulty: "easy",
    price: { original: 20000, discounted: 14999 },
    images: [
      {
        url: "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg",
        alt: "Rajasthan",
      },
    ],
    rating: { average: 4.7, count: 312 },
    location: { from: "Delhi", destinations: ["Jaipur", "Jodhpur", "Udaipur"] },
    isFeatured: true,
    isPopular: true,
  },
  {
    _id: "4",
    title: "Spiti Valley Cold Desert Trek",
    slug: "spiti-valley-cold-desert-trek",
    category: "Trekking",
    type: "domestic",
    duration: { days: 7, nights: 6 },
    difficulty: "moderate",
    price: { original: 18000, discounted: 13499 },
    images: [
      {
        url: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
        alt: "Spiti",
      },
    ],
    rating: { average: 4.9, count: 156 },
    location: { from: "Shimla", destinations: ["Kaza", "Key Monastery"] },
    isFeatured: true,
    isPopular: false,
  },
  {
    _id: "5",
    title: "Goa Party & Relaxation Package",
    slug: "goa-party-relaxation",
    category: "Beach",
    type: "domestic",
    duration: { days: 5, nights: 4 },
    difficulty: "easy",
    price: { original: 12000, discounted: 8999 },
    images: [
      {
        url: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
        alt: "Goa",
      },
    ],
    rating: { average: 4.5, count: 421 },
    location: { from: "Mumbai", destinations: ["North Goa", "South Goa"] },
    isFeatured: false,
    isPopular: true,
  },
  {
    _id: "6",
    title: "Andaman Islands Escape",
    slug: "andaman-islands-escape",
    category: "Beach",
    type: "domestic",
    duration: { days: 6, nights: 5 },
    difficulty: "easy",
    price: { original: 28000, discounted: 22499 },
    images: [
      {
        url: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
        alt: "Andaman",
      },
    ],
    rating: { average: 4.8, count: 198 },
    location: { from: "Chennai", destinations: ["Port Blair", "Havelock"] },
    isFeatured: true,
    isPopular: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function FeaturedTrips() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const { data, isLoading, isError } = useGetFeaturedTripsQuery(6);

  const trips = isError || !data?.trips ? FALLBACK_TRIPS : data.trips;

  return (
    <section
      ref={ref}
      className="relative py-28 bg-gradient-to-b from-slate-50 via-amber-50/20 to-slate-50 overflow-hidden"
  >
      {/* Background Video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          // src="https://www.pexels.com/download/video/3141208/"
          src="https://www.pexels.com/download/video/1851190/"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video> */}
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-700 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 border border-amber-500/20 backdrop-blur-sm shadow-sm">
            <Sparkles size={14} className="text-amber-500" />
            Curated For You
          </span>

          <h2 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4">
            Featured Trips
          </h2>

          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Handpicked journeys for unforgettable experiences — from Himalayan
            peaks to tropical shores.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center mt-6 gap-1.5">
            <div className="w-8 h-1 bg-gradient-to-r from-transparent to-amber-500 rounded-full" />
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full shadow-sm" />
            <div className="w-8 h-1 bg-gradient-to-l from-transparent to-amber-500 rounded-full" />
          </div>
        </motion.div>
        
        {/* Trip Cards Grid */}
        {isLoading ? (
          <CardSkeletonGrid count={6} />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            /*  Animate directly to 'visible' so re-renders don't reset back to 'hidden' */
            animate="visible"
            /*  Add viewport prop if you want scroll-triggered reveal without flickering */
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8"
          >
            {trips.map((trip) => (
              <motion.div
                /* Ensure trip._id is a stable string, not dynamic */
                key={trip._id}
                variants={itemVariants}
                className="h-full"
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            to="/trips"
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-xl transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_20px_35px_-5px_rgba(245,158,11,0.5)] hover:-translate-y-1 active:translate-y-0 group"
          >
            <span>Explore All Trips</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
