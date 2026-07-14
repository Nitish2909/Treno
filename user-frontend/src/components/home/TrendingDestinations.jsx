import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, MapPin, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRENDING = [
  {
    name: 'Ladakh',
    location: 'Jammu & Kashmir',
    slug: 'ladakh',
    stateSlug: 'jammu-kashmir',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 48,
    trending: true,
  },
  {
    name: 'Spiti Valley',
    location: 'Himachal Pradesh',
    slug: 'spiti-valley',
    stateSlug: 'himachal-pradesh',
    image: 'https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 34,
    trending: true,
  },
  {
    name: 'Goa',
    location: 'Goa',
    slug: 'goa',
    stateSlug: 'goa',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 36,
    trending: false,
  },
  {
    name: 'Meghalaya',
    location: 'Meghalaya',
    slug: 'meghalaya',
    stateSlug: 'meghalaya',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 22,
    trending: true,
  },
  {
    name: 'Rajasthan',
    location: 'Rajasthan',
    slug: 'rajasthan',
    stateSlug: 'rajasthan',
    image: 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 55,
    trending: false,
  },
  {
    name: 'Andaman',
    location: 'Andaman & Nicobar',
    slug: 'andaman',
    stateSlug: 'andaman',
    image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 29,
    trending: true,
  },
  {
    name: 'Rishikesh',
    location: 'Uttarakhand',
    slug: 'rishikesh',
    stateSlug: 'uttarakhand',
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 41,
    trending: true,
  },
  {
    name: 'Coorg',
    location: 'Karnataka',
    slug: 'coorg',
    stateSlug: 'karnataka',
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800',
    tripCount: 18,
    trending: false,
  },
];

function DestinationCard({ dest }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/destination/${dest.stateSlug}`)}
      className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-md"
      style={{ width: '220px', height: '300px' }}
    >
      {/* Image */}
      <img
        src={dest.image}
        alt={dest.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Trending badge */}
      {dest.trending && (
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
          <Flame size={10} />
          Trending
        </span>
      )}

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-['Playfair_Display',serif] text-lg font-bold text-white">
          {dest.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1">
          <MapPin size={11} className="text-amber-400" />
          <span className="text-xs text-white/80">{dest.location}</span>
        </div>
        <span className="mt-2 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
          {dest.tripCount} trips available
        </span>
      </div>
    </div>
  );
}

export default function TrendingDestinations() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -460 : 460, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-8 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-1 flex items-center gap-2">
              <Flame size={20} className="text-amber-500" />
              <span className="text-sm font-semibold uppercase tracking-widest text-amber-500">
                Hot Right Now
              </span>
            </div>
            <h2 className="relative inline-block font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 sm:text-4xl">
              Trending This Season
              <span className="absolute -bottom-2 left-0 h-1 w-16 rounded-full bg-amber-400" />
            </h2>
          </motion.div>

          {/* Desktop scroll arrows */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TRENDING.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <DestinationCard dest={dest} />
            </motion.div>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400 sm:hidden">
          <TrendingUp size={12} />
          Swipe to explore more destinations
        </p>
      </div>
    </section>
  );
}
