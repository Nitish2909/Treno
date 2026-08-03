

import React, { useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetFeaturedTripsQuery } from "../../store/api/tripApi.js";
import { CardSkeletonGrid } from "../common/Loader.jsx";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "../../store/slices/wishlistSlice.js";

const FALLBACK_TRIPS = [
  {
    _id: "1",
    title: "Manali to Leh Bike Expedition",
    slug: "manali-leh-bike-expedition",
    category: "Adventure",
    type: "domestic",
    duration: { days: 10, nights: 9 },
    difficulty: "hard",
    price: { original: 25000, discounted: 18999 },
    images: [
      {
        url: "https://images.pexels.com/photos/1694621/pexels-photo-1694621.jpeg",
        alt: "Manali Leh",
      },
    ],
    rating: { average: 4.8, count: 234 },
    location: { from: "Manali", destinations: ["Leh"] },
    isFeatured: true,
    isPopular: true,
  },
  {
    _id: "2",
    title: "Kerala Backwaters & Beaches",
    slug: "kerala-backwaters-beaches",
    category: "Beach",
    type: "domestic",
    duration: { days: 6, nights: 5 },
    difficulty: "easy",
    price: { original: 15000, discounted: 10999 },
    images: [
      {
        url: "https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg",
        alt: "Kerala",
      },
    ],
    rating: { average: 4.6, count: 189 },
    location: { from: "Kochi", destinations: ["Alleppey", "Varkala"] },
    isFeatured: true,
    isPopular: false,
  },
  {
    _id: "3",
    title: "Rajasthan Royal Heritage Tour",
    slug: "rajasthan-royal-heritage-tour",
    category: "Cultural",
    type: "domestic",
    duration: { days: 8, nights: 7 },
    difficulty: "easy",
    price: { original: 20000, discounted: 14999 },
    images: [
      {
        url: "https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg",
        alt: "Rajasthan",
      },
    ],
    rating: { average: 4.7, count: 312 },
    location: { from: "Delhi", destinations: ["Jaipur", "Jodhpur", "Udaipur"] },
    isFeatured: true,
    isPopular: true,
  },
  {
    _id: "4",
    title: "Spiti Valley Cold Desert Trek",
    slug: "spiti-valley-cold-desert-trek",
    category: "Trekking",
    type: "domestic",
    duration: { days: 7, nights: 6 },
    difficulty: "moderate",
    price: { original: 18000, discounted: 13499 },
    images: [
      {
        url: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
        alt: "Spiti",
      },
    ],
    rating: { average: 4.9, count: 156 },
    location: { from: "Shimla", destinations: ["Kaza", "Key Monastery"] },
    isFeatured: true,
    isPopular: false,
  },
  {
    _id: "5",
    title: "Goa Party & Relaxation Package",
    slug: "goa-party-relaxation",
    category: "Beach",
    type: "domestic",
    duration: { days: 5, nights: 4 },
    difficulty: "easy",
    price: { original: 12000, discounted: 8999 },
    images: [
      {
        url: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
        alt: "Goa",
      },
    ],
    rating: { average: 4.5, count: 421 },
    location: { from: "Mumbai", destinations: ["North Goa", "South Goa"] },
    isFeatured: false,
    isPopular: true,
  },
  {
    _id: "6",
    title: "Andaman Islands Escape",
    slug: "andaman-islands-escape",
    category: "Beach",
    type: "domestic",
    duration: { days: 6, nights: 5 },
    difficulty: "easy",
    price: { original: 28000, discounted: 22499 },
    images: [
      {
        url: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
        alt: "Andaman",
      },
    ],
    rating: { average: 4.8, count: 198 },
    location: { from: "Chennai", destinations: ["Port Blair", "Havelock"] },
    isFeatured: true,
    isPopular: true,
  },
];

// Helper sub-component for wishlist state on individual trip items
function WishlistButton({ trip }) {
  const dispatch = useDispatch();
  const tripId = trip?._id || trip?.id;
  const isWishlisted = useSelector(selectIsInWishlist(tripId));

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ tripId, tripData: trip }));
  };

  return (
    <button
      onClick={handleWishlist}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center
        shadow-md transition-all duration-200 ${
          isWishlisted
            ? "bg-red-500 text-white scale-110"
            : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-red-400 backdrop-blur-md"
        }`}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
    </button>
  );
}

export default function IndiaTrips() {
  const scrollContainerRef = useRef(null);
  const { data, isLoading, isError } = useGetFeaturedTripsQuery(6);

  const trips = isError || !data?.data ? FALLBACK_TRIPS : data.data;

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Safely extract string from category field (whether string or populated object)
  const getCategoryName = (category, fallbackTag) => {
    if (!category) return fallbackTag || "Featured";
    if (typeof category === "string") return category;
    if (typeof category === "object")
      return category.name || category.title || fallbackTag || "Featured";
    return "Featured";
  };

  // Safely format price
  const formatPrice = (priceObj) => {
    if (!priceObj) return "N/A";
    if (typeof priceObj === "number") {
      return `₹${priceObj.toLocaleString("en-IN")}`;
    }
    if (typeof priceObj === "string") {
      return priceObj.startsWith("₹") ? priceObj : `₹${priceObj}`;
    }
    if (typeof priceObj === "object") {
      const val = priceObj.discounted ?? priceObj.original;
      if (typeof val === "number") {
        return `₹${val.toLocaleString("en-IN")}`;
      }
      if (typeof val === "string") {
        return val;
      }
    }
    return "N/A";
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen">
      {/* --- HERO BANNER SECTION --- */}
      <div className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden shadow-2xl mb-12">
        {/* Background Image */}
        <img
          src="https://images.pexels.com/photos/38068047/pexels-photo-38068047.jpeg"
          alt="India Trip"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Gradient Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-xl space-y-4">
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 backdrop-blur-md border border-amber-300/30 rounded-full text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Incredible India
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              India Trips
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm md:text-lg font-light leading-relaxed">
              A Journey Through Time, Colour And Culture. Explore handpicked
              destinations designed for memories that last a lifetime.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to="/trips"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-6 py-3 rounded-full shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore All</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- CAROUSEL / CARDS SECTION --- */}
      <div className="relative -mt-24 md:-mt-32 z-10">
        {/* Navigation Controls Header */}
        {/* <div className="flex items-center justify-end mb-4 px-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-amber-500 shadow-md transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white hover:text-amber-500 shadow-md transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div> */}

        {/* Scrollable Container / Loader */}
        {isLoading ? (
          <div className="pt-8">
            <CardSkeletonGrid count={4} />
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none scroll-smooth"
          >
            {trips.map((item, index) => {
              const imageUrl =
                item.images?.[0]?.url ||
                item.image ||
                "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80";

              const categoryTag = getCategoryName(item.category, item.tag);

              const destinationName =
                item.location?.destinations?.[0] ||
                item.location?.from ||
                item.title ||
                "Explore";

              const targetUri = item.slug || item._id || item.id;

              return (
                <Link
                  key={item._id || item.id || `trip-${index}`}
                  to={`/trips/${targetUri}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group relative flex-shrink-0 w-60 md:w-64 h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-900 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl block"
                >
                  {/* Card Image */}
                  <img
                    src={imageUrl}
                    alt={item.images?.[0]?.alt || item.title || "Destination"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Tag Badge */}
                  <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
                    {categoryTag}
                  </span>

                  {/* Wishlist Button */}
                  <WishlistButton trip={item} />

                  {/* Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end z-10">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{destinationName}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
                      <span className="text-xs text-gray-300">
                        Starting Price
                      </span>
                      <span className="text-lg font-extrabold text-white">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


