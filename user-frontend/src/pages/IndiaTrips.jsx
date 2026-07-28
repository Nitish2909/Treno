import React, { useRef } from "react";
import {
  Compass,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

// Destinations with high-resolution Pexels images
const destinations = [
  {
    id: 1,
    title: "Leh Ladakh",
    tag: "Adventure",

    image:
      "https://images.pexels.com/photos/1583244/pexels-photo-1583244.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Spiti Valley",
    tag: "Road Trip",

    image:
      "https://images.pexels.com/photos/2403251/pexels-photo-2403251.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Kashmir",
    tag: "Scenic",

    image:
      "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 4,
    title: "Meghalaya",
    tag: "Nature",

    image:
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 5,
    title: "Zanskar",
    tag: "Trekking",

    image:
      "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 6,
    title: "Himachal",
    tag: "Popular",

    image:
      "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 7,
    title: "Sikkim",
    tag: "Culture",

    image:
      "https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function IndiaTrips() {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="relative">
        {/* --- Hero Banner --- */}
        <div
          className="relative h-[420px] w-full rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl transition-all duration-500"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.3)), url('https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          }}
        >
          {/* Subtle Ambient Light Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute left-6 top-10 md:left-12 md:top-14 max-w-lg text-white z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Journeys
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-3">
              India Trips
            </h1>

            <p className="text-xs sm:text-sm font-medium tracking-wide text-slate-200 mb-8 uppercase opacity-90 leading-relaxed">
              A Journey Through Time, Colour & Culture
            </p>

            <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold px-7 py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-orange-500/20 active:scale-95">
              <span>Explore All Destinations</span>
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* --- Overlay Destination Carousel --- */}
        <div className="relative -mt-32 px-2 sm:px-6 z-20">
          {/* Scroll Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all duration-300 focus:outline-none hidden md:flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth py-6 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {destinations.map((item) => (
              <div
                key={item.id}
                className="group relative min-w-[200px] sm:min-w-[220px] md:min-w-[240px] h-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/20 flex-shrink-0"
              >
                {/* Background Image with Zoom Effect */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {item.tag}
                  </span>
                </div>

                {/* Hover Quick Action Badge */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="p-1.5 rounded-full bg-white text-slate-900 shadow-md">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 flex flex-col justify-end">
                  <div className="flex items-center gap-1 text-amber-400 text-[11px] font-medium mb-1">
                    <MapPin className="w-3 h-3" />
                    <span>India</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                    <span className="text-[11px] text-slate-300">
                      Starting price
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all duration-300 focus:outline-none hidden md:flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
