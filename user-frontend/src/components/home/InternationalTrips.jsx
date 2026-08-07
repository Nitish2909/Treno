import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetFeaturedTripsQuery } from '../../store/api/tripApi';

export default function InternationalTrips() {
  const scrollContainerRef = useRef(null);
  const { data, isLoading, isError } = useGetFeaturedTripsQuery(6);

  const trips = data?.data || [];

  console.log(trips);
  

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
        <div className="absolute inset-0 z-0 ">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"  />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Hero Section Content */}
        <div className="relative z-10 px-6 pt-10 pb-40 md:pt-16 md:pb-52 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6  ">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase ">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unforgettable Journeys</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              International Trips
            </h2>
            
            <p className="text-slate-300 text-base md:text-lg font-normal">
              Discover the world, one trip at a time. Handcrafted itineraries designed for memory making.
            </p>
          </div>

          <Link
            to="/trips"
            onClick={() => window.scrollTo(0, 0)}
            className="group inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-6 py-3 rounded-full shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Trip Cards Overlay Wrapper */}
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
            {isLoading && (
              <div className="text-slate-400 py-10 w-full text-center">Loading International Trips...</div>
            )}

            {isError && (
              <div className="text-red-400 py-10 w-full text-center">Failed to load trips.</div>
            )}

            {!isLoading && !isError && trips.filter(trip=>trip.type=="international").map((trip) => {
              // Extract fields dynamically from API structure
              const imageUrl = trip.images[0]?.url || trip.thumbnail?.url || 'https://via.placeholder.com/400';
              const priceFormatted = trip.price?.discounted 
                ? `₹${trip.price.discounted.toLocaleString('en-IN')}`
                : trip.price?.original 
                ? `₹${trip.price.original.toLocaleString('en-IN')}`
                : 'N/A';
              
              const subtitle = trip.duration?.days 
                ? `${trip.duration.days} Days / ${trip.duration.nights} Nights`
                : trip.location?.destinations?.[0] || trip.category?.name || '';

              const badgeTag = trip.isPopular 
                ? 'Popular' 
                : trip.isFeatured 
                ? 'Featured' 
                : trip.type || 'Trending';

              return (
                <Link
                  key={trip._id}
                  to={`/trips/${trip.slug}`}
                  className="group relative min-w-[240px] sm:min-w-[260px] md:min-w-[270px] h-[380px] rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shadow-xl snap-start cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/30 flex-shrink-0"
                >
                  {/* Background Image */}
                  <img
                    src={imageUrl}
                    alt={trip.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Badge Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-950/60 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-sm capitalize">
                      {badgeTag}
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
                      {subtitle}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {trip.title}
                    </h3>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-light">Starting Price</span>
                      <span className="text-lg font-extrabold text-white">
                        {priceFormatted}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}