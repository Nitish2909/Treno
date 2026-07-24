
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpRight, Compass } from 'lucide-react';

const DESTINATIONS = [
  {
    name: 'Ladakh',
    state: 'Jammu & Kashmir',
    stateSlug: 'jammu-kashmir',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tripCount: 48,
    featured: true,
  },
  {
    name: 'Goa',
    state: 'Goa',
    stateSlug: 'goa',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 36,
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    stateSlug: 'kerala',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 42,
  },
  {
    name: 'Rajasthan',
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    image: 'https://images.pexels.com/photos/36941609/pexels-photo-36941609.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 55,
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    stateSlug: 'manali-himachal',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 61,
  },
  {
    name: 'Andaman',
    state: 'Andaman & Nicobar',
    stateSlug: 'andaman',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 29,
  },
  {
    name: 'Lakshadweep',
    state: 'UT of Lakshadweep',
    stateSlug: 'lakshadweep',
    image: 'https://images.pexels.com/photos/21617942/pexels-photo-21617942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 29,
  },
  {
    name: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    stateSlug: 'himachal-pradesh',
    image: 'https://images.pexels.com/photos/13727745/pexels-photo-13727745.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 10,
  },
  {
    name: 'Nagaland',
    state: 'Nagaland',
    stateSlug: 'nagaland',
    image: 'https://images.pexels.com/photos/13727745/pexels-photo-13727745.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 10,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

function DestinationCard({ dest, large = false }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/destination/${dest.stateSlug}`)}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-slate-900 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
        large ? 'col-span-1 sm:col-span-2 row-span-2 min-h-[380px] sm:min-h-[440px]' : 'min-h-[200px] sm:min-h-[210px]'
      }`}
    >
      {/* Image with zoom effect */}
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent transition-opacity duration-300 group-hover:from-slate-950/90" />

      {/* Top Glassmorphic Badge */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white shadow-sm">
        <span>{dest.tripCount} Trips</span>
        <ArrowUpRight size={13} className="text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          {dest.name}
        </h3>

        {/* Action Button Reveal */}
        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-out group-hover:max-h-12 group-hover:opacity-100 group-hover:mt-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-950 px-3.5 py-1.5 text-xs font-semibold shadow-md hover:bg-amber-300 transition-colors">
            <Compass size={13} />
            Explore Destination
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PopularDestinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [featured, ...rest] = DESTINATIONS;

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

        {/* Responsive Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {/* Featured Hero Card */}
          <DestinationCard dest={featured} large />

          {/* Destination Grid */}
          {rest.map((dest, i) => (
            <DestinationCard key={`${dest.stateSlug}-${i}`} dest={dest} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}