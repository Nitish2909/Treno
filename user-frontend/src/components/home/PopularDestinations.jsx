
// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { MapPin, ArrowUpRight, Compass } from 'lucide-react';
// import { useGetAllDestinationQuery } from '../../store/api/destinationApi';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
//   },
// };

// function DestinationCard({ dest, large = false }) {
//   const navigate = useNavigate();

//   if (!dest) return null;

//   const handleNavigate = () => {
//     navigate(`/destinations/${dest.name}`, {
//       state: dest,
//     });
//   };

//   const displayName = dest.name
//     ? dest.name.charAt(0).toUpperCase() + dest.name.slice(1)
//     : '';

//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.3 }}
//       onClick={handleNavigate}
//       className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-900 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
//         large
//           ? 'col-span-1 sm:col-span-2 row-span-2 min-h-[380px] sm:min-h-[440px]'
//           : 'min-h-[200px] sm:min-h-[210px]'
//       }`}
//     >
//       {/* Background Image */}
//       <img
//         src={dest.image}
//         alt={dest.name}
//         className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//         loading="lazy"
//       />

//       {/* Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

//       {/* Top Badge */}
//       <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white shadow-sm">
//         <span>{dest.tripCount ?? dest.trips?.length ?? 0} Trips</span>
//         <ArrowUpRight
//           size={13}
//           className="text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
//         />
//       </div>

//       {/* Content Area */}
//       <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end">
//         {dest.state && (
//           <div className="flex items-center gap-1.5 text-amber-400 font-medium text-xs tracking-wider uppercase mb-1">
//             <MapPin size={12} className="shrink-0" />
//             <span className="truncate">{dest.state}</span>
//           </div>
//         )}

//         <h3
//           className={`font-serif font-bold text-white tracking-tight leading-snug drop-shadow-sm ${
//             large ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
//           }`}
//         >
//           {displayName}
//         </h3>

//         {/* Action Button Reveal */}
//         <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-3">
//           <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-950 px-3.5 py-1.5 text-xs font-semibold shadow-md hover:bg-amber-300 transition-colors">
//             <Compass size={13} />
//             Explore Destination
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default function PopularDestinations() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: '-60px' });

//   const { data, isLoading } = useGetAllDestinationQuery();
//   const destinationsData = data?.data?.data || [];

//   const [featuredDestination, ...restDestinations] = destinationsData;

//   return (
//     <section className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-14 text-center max-w-2xl mx-auto">
//           <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
//             Explore India
//           </span>
//           <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
//             Popular Destinations
//           </h2>
//           <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
//             Discover breathtaking places curated by thousands of passionate explorers.
//           </p>
//         </div>

//         {/* Loading Skeletons */}
//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
//             <div className="col-span-1 sm:col-span-2 row-span-2 min-h-[380px] bg-slate-200 animate-pulse rounded-3xl" />
//             {Array.from({ length: 4 }).map((_, i) => (
//               <div key={i} className="min-h-[200px] bg-slate-200 animate-pulse rounded-3xl" />
//             ))}
//           </div>
//         ) : (
//           <motion.div
//             ref={ref}
//             variants={containerVariants}
//             initial="hidden"
//             animate={inView ? 'visible' : 'hidden'}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
//           >
//             {/* Featured Hero Card */}
//             {featuredDestination && (
//               <DestinationCard dest={featuredDestination} large />
//             )}

//             {/* Remaining Grid Cards */}
//             {restDestinations.map((dest, i) => (
//               <DestinationCard key={dest._id || dest.id || i} dest={dest} />
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }



import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpRight, Compass } from 'lucide-react';
import { useGetAllDestinationQuery } from '../../store/api/destinationApi';

// Faster stagger animation to prevent visual delay
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

// Memoized card to avoid re-rendering all items unnecessarily
const DestinationCard = React.memo(function DestinationCard({ dest, large = false }) {
  const navigate = useNavigate();

  if (!dest) return null;

  const handleNavigate = () => {
      window.scrollTo(0, 0)
    navigate(`/destinations/${dest.name}`, {
      state: dest,
    });
  };

  const displayName = dest.name
    ? dest.name.charAt(0).toUpperCase() + dest.name.slice(1)
    : '';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={handleNavigate}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-900 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
        large
          ? 'col-span-1 sm:col-span-2 row-span-2 min-h-[380px] sm:min-h-[440px]'
          : 'min-h-[200px] sm:min-h-[210px]'
      }`}
    >
      {/* Background Image */}
      <img
      
        src={dest.image}
        alt={dest.name || 'Destination'}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

      {/* Top Badge */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white shadow-sm">
        <span>{dest.tripCount ?? dest.trips?.length ?? 0} Trips</span>
        <ArrowUpRight
          size={13}
          className="text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {/* Content Area */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end">
        {dest.state && (
          <div className="flex items-center gap-1.5 text-amber-400 font-medium text-xs tracking-wider uppercase mb-1">
            <MapPin size={12} className="shrink-0" />
            <span className="truncate">{dest.state}</span>
          </div>
        )}

        <h3
          className={`font-serif font-bold text-white tracking-tight leading-snug drop-shadow-sm ${
            large ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
          }`}
        >
          {displayName}
        </h3>

        {/* Action Button Reveal */}
        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-3">
          <span
           className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-950 px-3.5 py-1.5 text-xs font-semibold shadow-md hover:bg-amber-300 transition-colors">
            <Compass size={13} />
            Explore Destination
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default function PopularDestinations() {
  const { data, isLoading } = useGetAllDestinationQuery();

  // Memoize array extraction to eliminate redundant processing on render cycles
  const { featuredDestination, restDestinations } = useMemo(() => {
    const list = data?.data?.data || [];
    if (!list.length) return { featuredDestination: null, restDestinations: [] };
    const [featured, ...rest] = list;
    return { featuredDestination: featured, restDestinations: rest };
  }, [data]);

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            Explore India
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Popular Destinations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Discover breathtaking places curated by thousands of passionate explorers.
          </p>
        </div>

        {/* Loading Skeletons */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="col-span-1 sm:col-span-2 row-span-2 min-h-[380px] bg-slate-200 animate-pulse rounded-3xl" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-h-[200px] bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {/* Featured Hero Card */}
            {featuredDestination && (
              <DestinationCard dest={featuredDestination} large />
            )}

            {/* Remaining Grid Cards */}
            {restDestinations.map((dest, i) => (
              <DestinationCard key={dest._id || dest.id || i} dest={dest} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}