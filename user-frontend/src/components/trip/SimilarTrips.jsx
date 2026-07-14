import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import TripCard from './TripCard.jsx';
import { useGetSimilarTripsQuery } from '../../store/api/tripApi.js';

// ---------------------------------------------------------------------------
// Mock fallback data
// ---------------------------------------------------------------------------
const MOCK_TRIPS = [
  {
    _id: 'm1',
    title: 'Spiti Valley Expedition',
    slug: 'spiti-valley-expedition',
    category: 'Adventure',
    type: 'domestic',
    duration: { days: 8, nights: 7 },
    difficulty: 'hard',
    price: { original: 28000, discounted: 23800 },
    images: [{ url: 'https://source.unsplash.com/400x300/?spiti,mountains', alt: 'Spiti Valley' }],
    rating: { average: 4.7, count: 89 },
    location: { from: 'Delhi', destinations: ['Spiti Valley'] },
    isFeatured: false,
    isPopular: true,
    highlights: [],
    groupSize: { min: 6, max: 15 },
  },
  {
    _id: 'm2',
    title: 'Andaman Beach Bliss',
    slug: 'andaman-beach-bliss',
    category: 'Beach',
    type: 'domestic',
    duration: { days: 6, nights: 5 },
    difficulty: 'easy',
    price: { original: 35000, discounted: 29750 },
    images: [{ url: 'https://source.unsplash.com/400x300/?andaman,beach', alt: 'Andaman' }],
    rating: { average: 4.8, count: 142 },
    location: { from: 'Chennai', destinations: ['Port Blair', 'Havelock'] },
    isFeatured: true,
    isPopular: false,
    highlights: [],
    groupSize: { min: 2, max: 20 },
  },
  {
    _id: 'm3',
    title: 'Rajasthan Heritage Trail',
    slug: 'rajasthan-heritage-trail',
    category: 'Cultural',
    type: 'domestic',
    duration: { days: 7, nights: 6 },
    difficulty: 'easy',
    price: { original: 22000, discounted: 18700 },
    images: [{ url: 'https://source.unsplash.com/400x300/?rajasthan,palace', alt: 'Rajasthan' }],
    rating: { average: 4.5, count: 213 },
    location: { from: 'Delhi', destinations: ['Jaipur', 'Jodhpur', 'Udaipur'] },
    isFeatured: false,
    isPopular: true,
    highlights: [],
    groupSize: { min: 4, max: 25 },
  },
  {
    _id: 'm4',
    title: 'Bali Paradise Escape',
    slug: 'bali-paradise-escape',
    category: 'Honeymoon',
    type: 'international',
    duration: { days: 7, nights: 6 },
    difficulty: 'easy',
    price: { original: 75000, discounted: 63750 },
    images: [{ url: 'https://source.unsplash.com/400x300/?bali,temple', alt: 'Bali' }],
    rating: { average: 4.9, count: 176 },
    location: { from: 'Mumbai', destinations: ['Bali'] },
    isFeatured: true,
    isPopular: true,
    highlights: [],
    groupSize: { min: 2, max: 12 },
  },
  {
    _id: 'm5',
    title: 'Kedarnath Yatra',
    slug: 'kedarnath-yatra',
    category: 'Trekking',
    type: 'domestic',
    duration: { days: 5, nights: 4 },
    difficulty: 'moderate',
    price: { original: 15000, discounted: 12750 },
    images: [{ url: 'https://source.unsplash.com/400x300/?kedarnath,temple', alt: 'Kedarnath' }],
    rating: { average: 4.6, count: 98 },
    location: { from: 'Rishikesh', destinations: ['Kedarnath'] },
    isFeatured: false,
    isPopular: false,
    highlights: [],
    groupSize: { min: 5, max: 20 },
  },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function SimilarTrips({ tripId, currentTripSlug }) {
  const scrollRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
  } = useGetSimilarTripsQuery?.(tripId) ?? { data: null, isLoading: false, isError: true };

  const trips = (data?.trips ?? MOCK_TRIPS).filter((t) => t.slug !== currentTripSlug);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (!isLoading && trips.length === 0) return null;

  return (
    <section className="py-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-bold text-gray-800">You Might Also Like</h2>
        </div>

        {/* Custom nav arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-amber-50
              hover:border-amber-300 flex items-center justify-center transition-all duration-150 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-amber-50
              hover:border-amber-300 flex items-center justify-center transition-all duration-150 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth
          [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="shrink-0 snap-start
                  w-[calc(100%-1.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33%-0.5rem)]"
              >
                <TripCard loading compact />
              </div>
            ))
          : trips.map((trip, i) => (
              <motion.div
                key={trip._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="shrink-0 snap-start
                  w-[calc(100%-1.5rem)]
                  sm:w-[calc(50%-0.75rem)]
                  lg:w-[calc(33%-0.5rem)]
                  xl:w-[calc(28%-0.25rem)]"
              >
                <TripCard trip={trip} compact />
              </motion.div>
            ))}
      </div>
    </section>
  );
}
