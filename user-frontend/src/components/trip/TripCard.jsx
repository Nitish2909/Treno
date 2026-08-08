
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { motion } from "framer-motion";
// import {
//   Heart,
//   MapPin,
//   Clock,
//   Users,
//   Star,
//   Zap,
//   Globe,
//   Home,
// } from "lucide-react";
// import ImageWithFallback from "../common/ImageWithFallback.jsx";
// import {
//   formatPrice,
//   getDifficultyColor,
//   generateStars,
// } from "../../utils/helpers.js";
// import {
//   toggleWishlist,
//   selectIsInWishlist,
// } from "../../store/slices/wishlistSlice.js";

// // ---------------------------------------------------------------------------
// // Skeleton loader
// // ---------------------------------------------------------------------------
// function TripCardSkeleton({ compact }) {
//   return (
//     <div
//       className={`rounded-2xl overflow-hidden shadow-md bg-white animate-pulse ${
//         compact ? "max-w-xs" : ""
//       }`}
//     >
//       <div className={`bg-gray-200 ${compact ? "h-44" : "aspect-[4/3]"}`} />
//       <div className="p-4 space-y-3">
//         <div className="h-4 bg-gray-200 rounded w-3/4" />
//         <div className="h-3 bg-gray-200 rounded w-1/2" />
//         <div className="h-3 bg-gray-200 rounded w-2/3" />
//         <div className="flex justify-between items-center pt-2">
//           <div className="h-5 bg-gray-200 rounded w-1/3" />
//           <div className="h-8 bg-gray-200 rounded-full w-24" />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Difficulty pill colour helper
// // ---------------------------------------------------------------------------
// const difficultyColors = {
//   easy: "bg-green-100 text-green-700",
//   moderate: "bg-yellow-100 text-yellow-700",
//   hard: "bg-orange-100 text-orange-700",
// };


// // Main component

// export default function TripCard({
//   trip,
//   className = "",
//   compact = false,
//   loading = false,
// }) {
//   const dispatch = useDispatch();
//   const isWishlisted = useSelector(selectIsInWishlist(trip?._id));
//   const [imgLoaded, setImgLoaded] = useState(false);

//   if (loading) return <TripCardSkeleton compact={compact} />;
//   if (!trip) return null;

//   // Destructure properties from the trip schema object
//   const {
//     _id,
//     title,
//     slug, // <-- Extracted correctly to prevent /trips/undefined routes
//     category, // ID or populated object
//     type,
//     duration = {}, // nested object { days, nights }
//     difficulty,
//     price = {}, // nested object { original, discounted, currency }
//     location = {}, // nested object { from, destinations, state, country }
//     groupSize = {}, // nested object { min, max }
//     images,
//     averageRating,
//     totalReviews,
//     isFeatured,
//     isPopular,
//   } = trip;

//   // Destructure inner schema values safely
//   const { days: durationDays, nights: durationNights } = duration;
//   const {
//     original: originalPrice,
//     discounted: discountedPrice,
//     currency,
//   } = price;
//   const { from, destinations = [] } = location;
//   const { min: minGroupSize, max: maxGroupSize } = groupSize;

//   // Handle image mapping cleanly
//   const primaryImage = images[0] ?? {
//     url: trip.images[0]?.url || "",
//     alt: title,
//   };

//   // Calculate discount percentages safely
//   const discountPct =
//     originalPrice && discountedPrice
//       ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
//       : 0;

//   const diffClass =
//     (getDifficultyColor ? getDifficultyColor(difficulty) : null) ??
//     difficultyColors[difficulty] ??
//     "bg-gray-100 text-gray-600";

//   const stars = generateStars ? generateStars(averageRating ?? 0) : [];

//   // Generate location label text
//   const locationLabel =
//     from && destinations.length > 0
//       ? `${from} → ${destinations[0]}`
//       : (destinations[0] ?? from ?? "");

//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     dispatch(toggleWishlist({ tripId: _id, tripData: trip }));
//   };

//   // Safe wrapper for currency layout rendering
//   const displayFormattedPrice = (amount) => {
//     if (formatPrice) return formatPrice(amount);
//     const symbol =
//       currency === "USD"
//         ? "$"
//         : currency === "EUR"
//           ? "€"
//           : currency === "GBP"
//             ? "£"
//             : "₹";
//     return `${symbol}${amount?.toLocaleString()}`;
//   };

//   // Safe route fallback targeting either the custom string slug or base identifier
//   const dynamicTargetUri = slug || _id;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, ease: "easeOut" }}
//       className={`group relative overflow-hidden rounded-2xl bg-white
//         shadow-[0_2px_12px_rgba(0,0,0,0.08)]
//         hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
//         hover:-translate-y-1.5 transition-all duration-300 ${className}`}
//     >
//       {/* IMAGE AREA */}
//       <div
//         className={`relative overflow-hidden ${compact ? "h-44" : "aspect-[4/3]"} bg-gray-200`}
//       >
//         <ImageWithFallback
//           src={primaryImage.url}
//           alt={primaryImage.alt || title}
//           /* 
//        The bg-gray-200 on the parent handles smooth loading naturally. */
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           fallbackSrc="/images/trip-placeholder.jpg"
//         />

//         {/* Bottom gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

//         {/* TOP-LEFT: category + type badges */}
//         <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
//           {category && (
//             <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-white shadow">
//               {typeof category === "object" ? category.name : category}
//             </span>
//           )}
//           {type && (
//             <span
//               className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shadow
//           ${
//             type === "international"
//               ? "bg-teal-500 text-white"
//               : "bg-teal-100 text-teal-700"
//           }`}
//             >
//               {type === "international" ? (
//                 <span className="flex items-center gap-1">
//                   <Globe className="w-3 h-3" /> International
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1">
//                   <Home className="w-3 h-3" /> Domestic
//                 </span>
//               )}
//             </span>
//           )}
//         </div>

//         {/* TOP-RIGHT: Featured / Popular badge */}
//         {(isFeatured || isPopular) && (
//           <div className="absolute top-3 right-12 z-10 flex flex-col gap-1.5 items-end">
//             {isFeatured && (
//               <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow flex items-center gap-1">
//                 <Zap className="w-3 h-3" /> Featured
//               </span>
//             )}
//             {isPopular && !isFeatured && (
//               <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500 text-white shadow">
//                 🔥 Popular
//               </span>
//             )}
//           </div>
//         )}

//         {/* TOP-RIGHT: Wishlist button */}
//         <button
//           onClick={handleWishlist}
//           aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//           className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
//       shadow-md transition-all duration-200
//       ${
//         isWishlisted
//           ? "bg-red-500 text-white scale-110"
//           : "bg-white/80 text-gray-400 hover:bg-white hover:text-red-400"
//       }`}
//         >
//           <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
//         </button>

//         {/* BOTTOM of image: duration + difficulty pills */}
//         <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
//           {(durationDays !== undefined || durationNights !== undefined) && (
//             <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
//               <Clock className="w-3 h-3" />
//               {durationDays || 0}D/{durationNights || 0}N
//             </span>
//           )}
//           {difficulty && (
//             <span
//               className={`px-2.5 py-1 rounded-full text-xs font-semibold ${diffClass}`}
//             >
//               {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* CARD BODY */}
//       <div className={`bg-white ${compact ? "p-3" : "p-4"}`}>
//         {/* Title */}
//         <h3
//           className={`font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5
//             ${compact ? "text-sm" : "text-base"}`}
//         >
//           {title}
//         </h3>

//         {/* Location */}
//         {locationLabel && (
//           <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
//             <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
//             <span className="truncate">{locationLabel}</span>
//           </div>
//         )}

//         {/* Group size */}
//         {maxGroupSize && !compact && (
//           <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
//             <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
//             <span>
//               {minGroupSize || 1}–{maxGroupSize} people
//             </span>
//           </div>
//         )}

//         {/* Rating stars */}
//         {/* {averageRating !== undefined && (
//           <div className="flex items-center gap-1.5 mb-3">
//             <div className="flex items-center gap-0.5">
//               {stars.length > 0
//                 ? stars.map((s, i) => (
//                     <span key={i} className="text-amber-400 text-xs">
//                       {s}
//                     </span>
//                   ))
//                 : Array.from({ length: 5 }).map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-3.5 h-3.5 ${
//                         i < Math.round(averageRating)
//                           ? "text-amber-400 fill-amber-400"
//                           : "text-gray-300 fill-gray-300"
//                       }`}
//                     />
//                   ))}
//             </div>
//             <span className="text-xs font-semibold text-gray-700">
//               {averageRating.toFixed(1)}
//             </span>
//             <span className="text-xs text-gray-400">
//               ({totalReviews?.toLocaleString() || 0} reviews)
//             </span>
//           </div>
//         )} */}

//         {/* Price row */}
//         <div className="flex items-center justify-between gap-2">
//           <div className="flex flex-col">
//             {originalPrice && originalPrice !== discountedPrice && (
//               <span className="text-xs text-gray-400 line-through">
//                 {displayFormattedPrice(originalPrice)}
//               </span>
//             )}
//             <span
//               className={`font-bold text-amber-500 ${compact ? "text-base" : "text-lg"}`}
//             >
//               {displayFormattedPrice(discountedPrice ?? originalPrice)}
//             </span>
//             {discountPct > 0 && (
//               <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full w-fit">
//                 {discountPct}% off
//               </span>
//             )}
//           </div>

//           {/* View Details Link */}
//           <Link
//             to={`/trips/${dynamicTargetUri}`}
//             className={`shrink-0 border border-amber-400 text-amber-500 font-semibold rounded-full
//               hover:bg-amber-400 hover:text-white transition-colors duration-200
//               ${compact ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"}`}
//           >
//             Book Now
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Clock,
  Users,
  Star,
  Zap,
  Globe,
  Home,
  ArrowRight,
} from "lucide-react";
import ImageWithFallback from "../common/ImageWithFallback.jsx";
import {
  formatPrice,
  getDifficultyColor,
  generateStars,
} from "../../utils/helpers.js";
import {
  toggleWishlist,
  selectIsInWishlist,
} from "../../store/slices/wishlistSlice.js";

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------
function TripCardSkeleton({ compact }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white animate-pulse ${
        compact ? "max-w-xs" : ""
      }`}
    >
      <div className={`bg-slate-200 ${compact ? "h-48" : "aspect-[4/3]"}`} />
      <div className="p-5 space-y-3.5">
        <div className="h-4 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
        <div className="h-3 bg-slate-200 rounded-full w-2/3" />
        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <div className="h-6 bg-slate-200 rounded-lg w-1/3" />
          <div className="h-9 bg-slate-200 rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Difficulty pill colour helper
// ---------------------------------------------------------------------------
const difficultyColors = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  moderate: "bg-amber-50 text-amber-700 border-amber-200/60",
  hard: "bg-rose-50 text-rose-700 border-rose-200/60",
};

// Main component
export default function TripCard({
  trip,
  className = "",
  compact = false,
  loading = false,
}) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsInWishlist(trip?._id));
  const [imgLoaded, setImgLoaded] = useState(false);

  if (loading) return <TripCardSkeleton compact={compact} />;
  if (!trip) return null;

  // Destructure properties from the trip schema object
  const {
    _id,
    title,
    slug, // <-- Extracted correctly to prevent /trips/undefined routes
    category, // ID or populated object
    type,
    duration = {}, // nested object { days, nights }
    difficulty,
    price = {}, // nested object { original, discounted, currency }
    location = {}, // nested object { from, destinations, state, country }
    groupSize = {}, // nested object { min, max }
    images = [],
    averageRating,
    totalReviews,
    isFeatured,
    isPopular,
  } = trip;

  // Destructure inner schema values safely
  const { days: durationDays, nights: durationNights } = duration;
  const {
    original: originalPrice,
    discounted: discountedPrice,
    currency,
  } = price;
  const { from, destinations = [] } = location;
  const { min: minGroupSize, max: maxGroupSize } = groupSize;

  // Handle image mapping cleanly
  const primaryImage = images[0] ?? {
    url: trip?.images?.[0]?.url || "",
    alt: title,
  };

  // Calculate discount percentages safely
  const discountPct =
    originalPrice && discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const diffClass =
    (getDifficultyColor ? getDifficultyColor(difficulty) : null) ??
    difficultyColors[difficulty] ??
    "bg-slate-100 text-slate-600 border-slate-200";

  const stars = generateStars ? generateStars(averageRating ?? 0) : [];

  // Generate location label text
  const locationLabel =
    from && destinations.length > 0
      ? `${from} → ${destinations[0]}`
      : (destinations[0] ?? from ?? "");

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ tripId: _id, tripData: trip }));
  };

  // Safe wrapper for currency layout rendering
  const displayFormattedPrice = (amount) => {
    if (formatPrice) return formatPrice(amount);
    const symbol =
      currency === "USD"
        ? "$"
        : currency === "EUR"
          ? "€"
          : currency === "GBP"
            ? "£"
            : "₹";
    return `${symbol}${amount?.toLocaleString()}`;
  };

  // Safe route fallback targeting either the custom string slug or base identifier
  const dynamicTargetUri = slug || _id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white
        border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
        hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:border-amber-200/50
        hover:-translate-y-1.5 transition-all duration-300 ease-out ${className}`}
    >
      {/* IMAGE AREA */}
      <div
        className={`relative overflow-hidden ${
          compact ? "h-48" : "aspect-[4/3]"
        } bg-slate-100`}
      >
        <ImageWithFallback
          src={primaryImage.url}
          alt={primaryImage.alt || title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          fallbackSrc="/images/trip-placeholder.jpg"
        />

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/20 pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

        {/* TOP-LEFT: category + type badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 max-w-[calc(100%-4rem)]">
          {category && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/90 text-white backdrop-blur-md shadow-sm border border-amber-400/30">
              {typeof category === "object" ? category.name : category}
            </span>
          )}
          {type && (
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm flex items-center gap-1 ${
                type === "international"
                  ? "bg-teal-500/90 text-white border-teal-400/30"
                  : "bg-white/90 text-slate-800 border-white/50"
              }`}
            >
              {type === "international" ? (
                <>
                  <Globe className="w-3 h-3" /> International
                </>
              ) : (
                <>
                  <Home className="w-3 h-3 text-teal-600" /> Domestic
                </>
              )}
            </span>
          )}
        </div>

        {/* TOP-RIGHT: Featured / Popular badge */}
        {(isFeatured || isPopular) && (
          <div className="absolute top-3.5 right-14 z-10 flex flex-col gap-1.5 items-end">
            {isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/90 text-slate-950 shadow-md backdrop-blur-md border border-amber-300/50 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-slate-950" /> Featured
              </span>
            )}
            {isPopular && !isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white shadow-md backdrop-blur-md border border-rose-400/30 flex items-center gap-1">
                🔥 Popular
              </span>
            )}
          </div>
        )}

        {/* TOP-RIGHT: Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center
            backdrop-blur-md shadow-lg transition-all duration-300 active:scale-95
            ${
              isWishlisted
                ? "bg-rose-500 text-white shadow-rose-500/30 scale-105"
                : "bg-white/70 text-slate-700 hover:bg-white hover:text-rose-500 hover:scale-110 border border-white/60"
            }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${
              isWishlisted ? "fill-current scale-110" : ""
            }`}
          />
        </button>

        {/* BOTTOM of image: duration + difficulty pills */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 gap-2">
          {(durationDays !== undefined || durationNights !== undefined) && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 text-slate-100 text-xs font-medium backdrop-blur-md border border-white/10 shadow-sm">
              <Clock className="w-3 h-3 text-amber-400" />
              {durationDays || 0}D / {durationNights || 0}N
            </span>
          )}
          {difficulty && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm ${diffClass}`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* CARD BODY */}
      <div
        className={`bg-white flex flex-col justify-between flex-grow ${
          compact ? "p-4" : "p-5"
        }`}
      >
        <div>
          {/* Title */}
          <h3
            className={`font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-200 line-clamp-2 leading-snug mb-2 ${
              compact ? "text-base" : "text-lg tracking-tight"
            }`}
          >
            {title}
          </h3>

          {/* Details Row (Location & Group Size) */}
          <div className="space-y-1.5 mb-4">
            {locationLabel && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">{locationLabel}</span>
              </div>
            )}

            {maxGroupSize && !compact && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                <Users className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>
                  {minGroupSize || 1}–{maxGroupSize} Guests
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price & CTA Section */}
        <div className="pt-3 border-t border-slate-100 flex items-end justify-between gap-2 mt-auto">
          <div className="flex flex-col">
            {discountPct > 0 && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full w-fit mb-1">
                Save {discountPct}%
              </span>
            )}
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-black text-slate-900 ${
                  compact ? "text-lg" : "text-xl"
                }`}
              >
                {displayFormattedPrice(discountedPrice ?? originalPrice)}
              </span>
              {originalPrice && originalPrice !== discountedPrice && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  {displayFormattedPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* View Details Link */}
          <Link
            to={`/trips/${dynamicTargetUri}`}
            className={`group/btn shrink-0 inline-flex items-center gap-1.5 font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-amber-500/20 active:scale-95 ${
              compact
                ? "px-3.5 py-1.5 text-xs bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950"
                : "px-4 py-2 text-xs bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950"
            }`}
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}