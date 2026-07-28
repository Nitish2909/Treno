
// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//   Mountain,
//   Waves,
//   Zap,
//   Landmark,
//   Heart,
//   Compass,
//   Leaf,
//   Clock,
//   ArrowUpRight,
//   Sparkles,
// } from 'lucide-react';

// const CATEGORIES = [
//   {
//     name: 'Trekking',
//     slug: 'trekking',
//     icon: Mountain,
//     tripCount: 148,
//     gradient: 'from-indigo-500 to-indigo-700',
//     glowColor: 'group-hover:shadow-indigo-500/25',
//     accentBg: 'bg-indigo-500/10',
//     textColor: 'text-indigo-400',
//   },
//   {
//     name: 'Beach',
//     slug: 'beach',
//     icon: Waves,
//     tripCount: 96,
//     gradient: 'from-blue-400 to-blue-600',
//     glowColor: 'group-hover:shadow-blue-500/25',
//     accentBg: 'bg-blue-500/10',
//     textColor: 'text-blue-400',
//   },
//   {
//     name: 'Adventure',
//     slug: 'adventure',
//     icon: Zap,
//     tripCount: 112,
//     gradient: 'from-amber-400 to-orange-600',
//     glowColor: 'group-hover:shadow-orange-500/25',
//     accentBg: 'bg-orange-500/10',
//     textColor: 'text-orange-400',
//   },
//   {
//     name: 'Cultural',
//     slug: 'cultural',
//     icon: Landmark,
//     tripCount: 74,
//     gradient: 'from-amber-500 to-amber-700',
//     glowColor: 'group-hover:shadow-amber-500/25',
//     accentBg: 'bg-amber-500/10',
//     textColor: 'text-amber-400',
//   },
//   {
//     name: 'Honeymoon',
//     slug: 'honeymoon',
//     icon: Heart,
//     tripCount: 58,
//     gradient: 'from-rose-400 to-pink-600',
//     glowColor: 'group-hover:shadow-pink-500/25',
//     accentBg: 'bg-pink-500/10',
//     textColor: 'text-pink-400',
//   },
//   {
//     name: 'Backpacking',
//     slug: 'backpacking',
//     icon: Compass,
//     tripCount: 83,
//     gradient: 'from-teal-400 to-teal-600',
//     glowColor: 'group-hover:shadow-teal-500/25',
//     accentBg: 'bg-teal-500/10',
//     textColor: 'text-teal-400',
//   },
//   {
//     name: 'Wildlife',
//     slug: 'wildlife',
//     icon: Leaf,
//     tripCount: 47,
//     gradient: 'from-emerald-500 to-green-700',
//     glowColor: 'group-hover:shadow-green-500/25',
//     accentBg: 'bg-green-500/10',
//     textColor: 'text-green-400',
//   },
//   {
//     name: 'Weekend Getaways',
//     slug: 'weekend-getaways',
//     icon: Clock,
//     tripCount: 130,
//     gradient: 'from-purple-500 to-indigo-600',
//     glowColor: 'group-hover:shadow-purple-500/25',
//     accentBg: 'bg-purple-500/10',
//     textColor: 'text-purple-400',
//   },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.06 },
//   },
// };

// const cardVariant = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
//   },
// };

// export default function Categories() {
//   const navigate = useNavigate();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: '-60px' });

//   return (
//     <section className="relative overflow-hidden py-20 sm:py-28 ">
//       {/* Background Video */}
//       {/* <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 h-full w-full object-cover"
//       >
//          <source src="https://www.pexels.com/download/video/1851190/" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video> */}

//       {/* Dark Overlay for Text Readability */}
//       <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-[2px]" />

//       {/* Background Decor Elements */}
//       <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
//       <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="mb-14 text-center"
//         >
//           <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-300 ring-1 ring-inset ring-amber-400/30 backdrop-blur-md">
//             <Sparkles className="h-3.5 w-3.5 text-amber-400" />
//             <span>Curated Experiences</span>
//           </div>

//           <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
//             Explore by Category
//           </h2>
//           <p className="mx-auto mt-4 max-w-xl text-base text-slate-200 sm:text-lg">
//             Find the perfect trip style that matches your spirit of adventure.
//           </p>
//         </motion.div>

//         {/* Category Grid */}
//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? 'visible' : 'hidden'}
//           className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 lg:gap-6"
//         >
//           {CATEGORIES.map((cat) => {
//             const Icon = cat.icon;
//             return (
//               <motion.div
//                 key={cat.slug}
//                 variants={cardVariant}
//                 whileHover={{ y: -6, scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => navigate(`/trips/category/${cat.slug}`)}
//                 className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 hover:shadow-2xl ${cat.glowColor}`}
//               >
//                 {/* Subtle top indicator arrow */}
//                 <div className="absolute right-4 top-4 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
//                   <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                 </div>

//                 <div>
//                   {/* Icon with Ambient Glow */}
//                   <div className="relative mb-5 inline-block">
//                     <div className={`absolute inset-0 rounded-2xl ${cat.accentBg} blur-lg transition-all duration-300 group-hover:scale-125`} />
//                     <div
//                       className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:rotate-3`}
//                     >
//                       <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
//                     </div>
//                   </div>

//                   {/* Category Info */}
//                   <h3 className="text-base font-bold text-white sm:text-lg">
//                     {cat.name}
//                   </h3>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
//                   <span className="text-xs font-medium text-slate-300 group-hover:text-white">
//                     {cat.tripCount} destinations
//                   </span>
//                   <span className={`text-xs font-semibold ${cat.textColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
//                     Browse &rarr;
//                   </span>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }





import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mountain,
  Waves,
  Zap,
  Landmark,
  Heart,
  Compass,
  Leaf,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Trekking',
    slug: 'trekking',
    icon: Mountain,
    tripCount: 148,
    gradient: 'from-indigo-500 to-indigo-700',
    glowColor: 'group-hover:shadow-indigo-500/25',
    accentBg: 'bg-indigo-500/10',
    textColor: 'text-indigo-600',
  },
  {
    name: 'Beach',
    slug: 'beach',
    icon: Waves,
    tripCount: 96,
    gradient: 'from-blue-400 to-blue-600',
    glowColor: 'group-hover:shadow-blue-500/25',
    accentBg: 'bg-blue-500/10',
    textColor: 'text-blue-600',
  },
  {
    name: 'Adventure',
    slug: 'adventure',
    icon: Zap,
    tripCount: 112,
    gradient: 'from-amber-400 to-orange-600',
    glowColor: 'group-hover:shadow-orange-500/25',
    accentBg: 'bg-orange-500/10',
    textColor: 'text-orange-600',
  },
  {
    name: 'Cultural',
    slug: 'cultural',
    icon: Landmark,
    tripCount: 74,
    gradient: 'from-amber-500 to-amber-700',
    glowColor: 'group-hover:shadow-amber-500/25',
    accentBg: 'bg-amber-500/10',
    textColor: 'text-amber-600',
  },
  {
    name: 'Honeymoon',
    slug: 'honeymoon',
    icon: Heart,
    tripCount: 58,
    gradient: 'from-rose-400 to-pink-600',
    glowColor: 'group-hover:shadow-pink-500/25',
    accentBg: 'bg-pink-500/10',
    textColor: 'text-pink-600',
  },
  {
    name: 'Backpacking',
    slug: 'backpacking',
    icon: Compass,
    tripCount: 83,
    gradient: 'from-teal-400 to-teal-600',
    glowColor: 'group-hover:shadow-teal-500/25',
    accentBg: 'bg-teal-500/10',
    textColor: 'text-teal-600',
  },
  {
    name: 'Wildlife',
    slug: 'wildlife',
    icon: Leaf,
    tripCount: 47,
    gradient: 'from-emerald-500 to-green-700',
    glowColor: 'group-hover:shadow-green-500/25',
    accentBg: 'bg-green-500/10',
    textColor: 'text-green-600',
  },
  {
    name: 'Weekend Getaways',
    slug: 'weekend-getaways',
    icon: Clock,
    tripCount: 130,
    gradient: 'from-purple-500 to-indigo-600',
    glowColor: 'group-hover:shadow-purple-500/25',
    accentBg: 'bg-purple-500/10',
    textColor: 'text-purple-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function Categories() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Background Decor Elements */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-700 ring-1 ring-inset ring-amber-500/30">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Curated Experiences</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Explore by Category
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Find the perfect trip style that matches your spirit of adventure.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 lg:gap-6"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/trips/category/${cat.slug}`)}
                className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:border-slate-300 hover:bg-white hover:shadow-xl ${cat.glowColor}`}
              >
                {/* Subtle top indicator arrow */}
                <div className="absolute right-4 top-4 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-800">
                  <ArrowUpRight className="h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div>
                  {/* Icon with Ambient Glow */}
                  <div className="relative mb-5 inline-block">
                    <div className={`absolute inset-0 rounded-2xl ${cat.accentBg} blur-lg transition-all duration-300 group-hover:scale-125`} />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-md transition-transform duration-300 group-hover:rotate-3`}
                    >
                      <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Category Info */}
                  <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                    {cat.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3">
                  <span className="text-xs font-medium text-slate-500 group-hover:text-slate-800">
                    {cat.tripCount} destinations
                  </span>
                  <span className={`text-xs font-semibold ${cat.textColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
                    Browse &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}