
import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Bali",
    price: "₹22,500",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tag: "Popular",
  },
  {
    id: 2,
    name: "Maldives",
    price: "₹60,599",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    tag: "Luxury",
  },
  {
    id: 3,
    name: "Singapore",
    price: "₹44,999",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Thailand",
    price: "₹26,499",
    image:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    tag: "Trending",
  },
  {
    id: 5,
    name: "Vietnam",
    price: "₹34,999",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Kashmir",
    price: "₹24,499",
    image:
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Andaman",
    price: "₹34,999",
    image:
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
  },
];

export default function RomanticEscapes() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 font-sans antialiased">
      {/* Hero Banner Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[420px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 p-8 md:p-14 max-w-2xl text-white space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/30 text-amber-300 text-xs md:text-sm font-medium tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Handpicked Honeymoon Packages</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Romantic <span className="text-amber-400">Escapes</span>
          </h1>

          <p className="text-gray-200 text-base md:text-lg font-light tracking-wide">
            Where Forever Begins... Together! Craft unforgettable memories with
            tailored luxury getaways.
          </p>

          <div className="pt-2">
            <Link
              to="/trips"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Destinations Cards Section */}
      <div className="relative -mt-20 md:-mt-24 z-20 px-2 md:px-6">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Horizontal Scroll Area */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-2 [perspective:1000px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {destinations.map((place) => (
            <Link
              key={place.id}
              to="/trips"
              onClick={() => window.scrollTo(0, 0)}
              className="group relative flex-none w-[220px] md:w-[240px] h-[340px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer border border-white/20 transform-gpu [transform-style:preserve-3d] hover:-translate-y-3 hover:rotate-x-3 hover:-rotate-y-3 hover:scale-105"
            >
              {/* Card Image */}
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Top Bar inside Card */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 [transform:translateZ(20px)]">
                {place.tag ? (
                  <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
                    {place.tag}
                  </span>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  aria-label="Save to Wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white/80 hover:text-red-500 hover:bg-white transition-all"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Card Bottom Details */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1 [transform:translateZ(30px)]">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Getaway</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  {place.name}
                </h3>

                <div className="mt-2 pt-2 border-t border-white/20 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">
                      Starting From
                    </p>
                    <p className="text-lg font-extrabold text-white">
                      {place.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}