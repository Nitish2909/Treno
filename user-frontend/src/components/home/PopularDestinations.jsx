import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Map } from 'lucide-react';

const DESTINATIONS = [
  {
    name: 'Ladakh',
    state: 'Jammu & Kashmir',
    stateSlug: 'jammu-kashmir',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tripCount: 48,
    featured: true, // large card
  },
  {
    name: 'Goa',
    state: 'Goa',
    stateSlug: 'goa',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 36,
    featured: false,
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    stateSlug: 'kerala',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 42,
    featured: false,
  },
  {
    name: 'Rajasthan',
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    image: 'https://images.pexels.com/photos/36941609/pexels-photo-36941609.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 55,
    featured: false,
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    stateSlug: 'himachal-pradesh',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 61,
    featured: false,
  },
  {
    name: 'Andaman',
    state: 'Andaman & Nicobar',
    stateSlug: 'andaman',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 29,
    featured: false,
  },
   {
    name: 'Lakhsdweep',
    state: '',
    stateSlug: '',
    image: 'https://images.pexels.com/photos/21617942/pexels-photo-21617942.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 29,
    featured: false,
  },
  {
    name: 'Himachal Pradesh',
    state: 'Himachal Pradesh',
    stateSlug: 'himachal-pradesh',
    image: 'https://images.pexels.com/photos/13727745/pexels-photo-13727745.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 10,
    featured: true, 
  },

    {
    name: 'Nagaland',
    state: 'nagaland',
    stateSlug: 'nagaland',
    image: 'https://images.pexels.com/photos/13727745/pexels-photo-13727745.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 10,
    featured: true, 
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' },
  }),
};

function DestinationCard({ dest, large = false, index = 0 }) {
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onClick={() => navigate(`/destination/${dest.stateSlug}`)}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md ${
        large ? 'row-span-2' : ''
      }`}
      style={{ minHeight: large ? '400px' : '190px' }}
    >
      {/* Image */}
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

      {/* Trip count badge */}
      <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
        {dest.tripCount} Trips
      </span>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3
          className={`font-['Playfair_Display',serif] font-bold text-white drop-shadow ${
            large ? 'text-3xl' : 'text-xl'
          }`}
        >
          {dest.name}
        </h3>
        <div className="mt-1 flex items-center gap-1">
          <MapPin size={12} className="text-amber-400" />
          <span className="text-xs text-white/80">{dest.state}</span>
        </div>

        {/* Explore label — appears on hover */}
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <Map size={11} />
          Explore
        </span>
      </div>
    </motion.div>
  );
}

export default function PopularDestinations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [featured, ...rest] = DESTINATIONS;

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="relative mb-3 inline-block font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 sm:text-4xl">
            Popular Destinations
            <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-amber-400" />
          </h2>
          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            India's most beloved travel destinations — chosen by thousands of explorers
          </p>
        </motion.div>

        {/* Masonry-style CSS Grid */}
        <motion.div
          ref={ref}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 grid-rows-[190px_190px] gap-4 sm:grid-cols-3 lg:grid-cols-4"
          style={{ gridAutoRows: '190px' }}
        >
          {/* Large featured card spans 2 rows and 1 col on desktop */}
          <div className="col-span-2 row-span-2 sm:col-span-1 lg:col-span-2">
            <DestinationCard dest={featured} large index={0} />
          </div>

          {/* Remaining 4 smaller cards */}
          {rest.slice(0, 15).map((dest, i) => (
            <DestinationCard key={dest.stateSlug} dest={dest} index={i + 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
