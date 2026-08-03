import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import {Link} from "react-router-dom"

const destinations = [
  {
    id: 1,
    name: 'Europe',
    subtitle: 'Classic Heritage & Iconic Landmarks',
    price: '₹89,990',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Vietnam',
    subtitle: 'Emerald Waters & Scenic Landscapes',
    price: '₹34,999',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Bali',
    subtitle: 'Tropical Paradise & Sacred Temples',
    price: '₹22,500',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    name: 'Thailand',
    subtitle: 'Vibrant Nightlife & Exotic Beaches',
    price: '₹26,499',
    tag: 'Budget Friendly',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 5,
    name: 'Japan',
    subtitle: 'The Land of the Rising Sun',
    price: '₹1,29,990',
    tag: 'Luxury',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 6,
    name: 'Kenya',
    subtitle: "Nature's Hidden Magic Awaits",
    price: '₹1,49,990',
    tag: 'Wildlife Safari',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 7,
    name: 'Sri Lanka',
    subtitle: 'Island Magic & Deep Sea Diving',
    price: '₹32,999',
    tag: 'Adventure',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800',
  },
];

export default function InternationalTrips() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans">
      
      {/* Hero Banner Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-800">
        
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000"
            alt="Bhutan Temple Background"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          />
          {/* Gradient Overlays for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Hero Section Content */}
        <div className="relative z-10 px-6 pt-10 pb-40 md:pt-16 md:pb-52 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unforgettable Journeys</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              International Trips
            </h2>
            
            <p className="text-slate-300 text-base md:text-lg font-normal">
              Discover the world, one destination at a time. Handcrafted itineraries designed for memory making.
            </p>
          </div>

           <Link
                to="/trips"
                className="group inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-6 py-3 rounded-full shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span onClick={() => {window.scrollTo(0, 0);}}>
                  Explore All
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
        </div>

        {/* Destination Cards Overlay Wrapper */}
        <div className="-mt-32 pb-8 px-4 md:px-8 relative z-20">
          
          {/* Carousel Control Buttons */}
          <div className="flex items-center justify-end gap-2 mb-4 px-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 shadow-md backdrop-blur-md transition-all active:scale-95 hover:border-amber-400/50"
              aria-label="Previous Slide"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 shadow-md backdrop-blur-md transition-all active:scale-95 hover:border-amber-400/50"
              aria-label="Next Slide"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group relative min-w-[240px] sm:min-w-[260px] md:min-w-[270px] h-[380px] rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shadow-xl snap-start cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/30 flex-shrink-0"
              >
                {/* Background Image with Zoom Effect */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/60 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-sm">
                    {destination.tag}
                  </span>
                </div>

                {/* Action Icon on Hover */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom Details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end">
                  <span className="text-xs font-medium text-amber-300/90 tracking-wide line-clamp-1 mb-1">
                    {destination.subtitle}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {destination.name}
                  </h3>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-light">Starting Price</span>
                    <span className="text-lg font-extrabold text-white">
                      {destination.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}