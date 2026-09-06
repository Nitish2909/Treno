
// import React, { useRef } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   MapPin,
//   Sparkles,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const destinations = [
//   {
//     id: 1,
//     name: "Bali",
//     price: "₹22,500",
//     image:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
//     tag: "Popular",
//   },
//   {
//     id: 2,
//     name: "Maldives",
//     price: "₹60,599",
//     image:
//       "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
//     tag: "Luxury",
//   },
//   {
//     id: 3,
//     name: "Singapore",
//     price: "₹44,999",
//     image:
//       "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 4,
//     name: "Thailand",
//     price: "₹26,499",
//     image:
//       "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
//     tag: "Trending",
//   },
//   {
//     id: 5,
//     name: "Vietnam",
//     price: "₹34,999",
//     image:
//       "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 6,
//     name: "Kashmir",
//     price: "₹24,499",
//     image:
//       "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     id: 7,
//     name: "Andaman",
//     price: "₹34,999",
//     image:
//       "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// export default function RomanticEscapes() {
//   const scrollContainerRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -320 : 320;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8 font-sans antialiased">
//       {/* Hero Banner Container */}
//       <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] md:min-h-[420px] flex items-center">
//         {/* Background Image with Gradient Overlay */}
//         <div
//           className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')`,
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

//         {/* Hero Content */}
//         <div className="relative z-10 p-8 md:p-14 max-w-2xl text-white space-y-4">
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-300/30 text-amber-300 text-xs md:text-sm font-medium tracking-wide">
//             <Sparkles className="w-4 h-4" />
//             <span>Handpicked Honeymoon Packages</span>
//           </div>

//           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
//             Romantic <span className="text-amber-400">Escapes</span>
//           </h1>

//           <p className="text-gray-200 text-base md:text-lg font-light tracking-wide">
//             Where Forever Begins... Together! Craft unforgettable memories with
//             tailored luxury getaways.
//           </p>

//           <div className="pt-2">
//             <Link
//               to="/trips"
//               onClick={() => window.scrollTo(0, 0)}
//               className="inline-block px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
//             >
//               Explore Packages
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Destinations Cards Section */}
//       <div className="relative -mt-20 md:-mt-24 z-20 px-2 md:px-6">
//         {/* Scroll Left Button */}
//         <button
//           onClick={() => scroll("left")}
//           aria-label="Scroll Left"
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>

//         {/* Horizontal Scroll Area */}
//         <div
//           ref={scrollContainerRef}
//           className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-2 [perspective:1000px]"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {destinations.map((place) => (
//             <Link
//               key={place.id}
//               to="/trips"
//               onClick={() => window.scrollTo(0, 0)}
//               className="group relative flex-none w-[220px] md:w-[240px] h-[340px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer border border-white/20 transform-gpu [transform-style:preserve-3d] hover:-translate-y-3 hover:rotate-x-3 hover:-rotate-y-3 hover:scale-105"
//             >
//               {/* Card Image */}
//               <img
//                 src={place.image}
//                 alt={place.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />

//               {/* Top Bar inside Card */}
//               <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 [transform:translateZ(20px)]">
//                 {place.tag ? (
//                   <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold tracking-wider uppercase rounded-full">
//                     {place.tag}
//                   </span>
//                 ) : (
//                   <span />
//                 )}

//                 <button
//                   type="button"
//                   aria-label="Save to Wishlist"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white/80 hover:text-red-500 hover:bg-white transition-all"
//                 >
//                   <Heart className="w-4 h-4 fill-current" />
//                 </button>
//               </div>

//               {/* Gradient Overlay for Text Visibility */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

//               {/* Card Bottom Details */}
//               <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1 [transform:translateZ(30px)]">
//                 <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
//                   <MapPin className="w-3.5 h-3.5" />
//                   <span>Getaway</span>
//                 </div>

//                 <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
//                   {place.name}
//                 </h3>

//                 <div className="mt-2 pt-2 border-t border-white/20 flex justify-between items-end">
//                   <div>
//                     <p className="text-[10px] uppercase tracking-wider text-gray-300 font-medium">
//                       Starting From
//                     </p>
//                     <p className="text-lg font-extrabold text-white">
//                       {place.price}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Scroll Right Button */}
//         <button
//           onClick={() => scroll("right")}
//           aria-label="Scroll Right"
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center border border-gray-100"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>
//     </div>
//   );
// }






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
import India from "../../assets/India.png"

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

export default function RomanticEscapes() {
  const scrollContainerRef = useRef(null);
  const { data, isLoading, isError } = useGetFeaturedTripsQuery(6);

  // Only use data from the backend. Fallback to an empty array if there's an error or no data.
  const trips = !isError && data?.data ? data.data : [];

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
    <section className="relative w-full max-w-7xl mx-auto px-4 py-8 bg-slate-50 min-h-screen overflow-hidden">
      {/* --- HERO BANNER SECTION --- */}
      <div className="relative w-full h-[380px] md:h-[440px] rounded-3xl overflow-hidden shadow-2xl mb-12">
        {/* Background Image */}
        <img
          src={India}
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
              Romantic Escapes
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
            {trips.filter(trip=>trip.category=="Romantic").map((item, index) => {
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