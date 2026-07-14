import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Clock,
  Users,
  Star,
  Zap,
  Globe,
  Home,
} from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback.jsx';
import { formatPrice, getDifficultyColor, generateStars } from '../../utils/helpers.js';
import { toggleWishlist, selectIsInWishlist } from '../../store/slices/wishlistSlice.js';

// ---------------------------------------------------------------------------
// Skeleton loader
// ---------------------------------------------------------------------------
function TripCardSkeleton({ compact }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-md bg-white animate-pulse ${
        compact ? 'max-w-xs' : ''
      }`}
    >
      <div className={`bg-gray-200 ${compact ? 'h-44' : 'aspect-[4/3]'}`} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded-full w-24" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Difficulty pill colour helper (fallback if helpers not available yet)
// ---------------------------------------------------------------------------
const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-orange-100 text-orange-700',
  challenging: 'bg-red-100 text-red-700',
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function TripCard({ trip, className = '', compact = false, loading = false }) {
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsInWishlist(trip?._id));
  const [imgLoaded, setImgLoaded] = useState(false);

  if (loading) return <TripCardSkeleton compact={compact} />;
  if (!trip) return null;

  const {
    _id,
    title,
    slug,
    category,
    type,
    duration,
    difficulty,
    price,
    images,
    rating,
    location,
    isFeatured,
    isPopular,
    highlights,
    groupSize,
  } = trip;

  const primaryImage = images?.[0] ?? { url: '', alt: title };
  const discountPct =
    price?.original && price?.discounted
      ? Math.round(((price.original - price.discounted) / price.original) * 100)
      : 0;

  const diffClass =
    (getDifficultyColor ? getDifficultyColor(difficulty) : null) ??
    difficultyColors[difficulty] ??
    'bg-gray-100 text-gray-600';

  const stars = generateStars ? generateStars(rating?.average ?? 0) : [];

  const destinations = location?.destinations ?? [];
  const locationLabel =
    location?.from && destinations.length
      ? `${location.from} → ${destinations[0]}`
      : destinations[0] ?? location?.from ?? '';

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({ tripId: _id, tripData: trip }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-2xl bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.08)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]
        hover:-translate-y-1.5 transition-all duration-300 ${className}`}
    >
      {/* ------------------------------------------------------------------ */}
      {/* IMAGE AREA                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className={`relative overflow-hidden ${compact ? 'h-44' : 'aspect-[4/3]'}`}>
        <ImageWithFallback
          src={primaryImage.url}
          alt={primaryImage.alt || title}
          className={`w-full h-full object-cover transition-transform duration-500
            group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          fallbackSrc="/images/trip-placeholder.jpg"
        />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* TOP-LEFT: category + type badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {category && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-white shadow">
              {category}
            </span>
          )}
          {type && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shadow
                ${type === 'international'
                  ? 'bg-teal-500 text-white'
                  : 'bg-teal-100 text-teal-700'}`}
            >
              {type === 'international' ? (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> International
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Home className="w-3 h-3" /> Domestic
                </span>
              )}
            </span>
          )}
        </div>

        {/* TOP-RIGHT: Featured / Popular badge */}
        {(isFeatured || isPopular) && (
          <div className="absolute top-3 right-12 z-10 flex flex-col gap-1.5 items-end">
            {isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow flex items-center gap-1">
                <Zap className="w-3 h-3" /> Featured
              </span>
            )}
            {isPopular && !isFeatured && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500 text-white shadow">
                🔥 Popular
              </span>
            )}
          </div>
        )}

        {/* TOP-RIGHT: Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center
            shadow-md transition-all duration-200
            ${isWishlisted
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-400'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* BOTTOM of image: duration + difficulty pills */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          {duration && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
              <Clock className="w-3 h-3" />
              {duration.days}D/{duration.nights}N
            </span>
          )}
          {difficulty && (
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${diffClass}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CARD BODY                                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className={`bg-white ${compact ? 'p-3' : 'p-4'}`}>
        {/* Title */}
        <h3
          className={`font-semibold text-gray-800 line-clamp-2 leading-snug mb-1.5
            ${compact ? 'text-sm' : 'text-base'}`}
        >
          {title}
        </h3>

        {/* Location */}
        {locationLabel && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span className="truncate">{locationLabel}</span>
          </div>
        )}

        {/* Group size */}
        {groupSize && !compact && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <Users className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{groupSize.min}–{groupSize.max} people</span>
          </div>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {stars.length > 0
                ? stars.map((s, i) => (
                    <span key={i} className="text-amber-400 text-xs">
                      {s}
                    </span>
                  ))
                : Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.round(rating.average)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300 fill-gray-300'
                      }`}
                    />
                  ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {rating.average?.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              ({rating.count?.toLocaleString()} reviews)
            </span>
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {price?.original && price.original !== price.discounted && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice ? formatPrice(price.original) : `₹${price.original.toLocaleString()}`}
              </span>
            )}
            <span className={`font-bold text-amber-500 ${compact ? 'text-base' : 'text-lg'}`}>
              {formatPrice ? formatPrice(price?.discounted ?? price?.original) : `₹${(price?.discounted ?? price?.original)?.toLocaleString()}`}
            </span>
            {discountPct > 0 && (
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full w-fit">
                {discountPct}% off
              </span>
            )}
          </div>

          {/* View Details */}
          <Link
            to={`/trips/${slug}`}
            className={`shrink-0 border border-amber-400 text-amber-500 font-semibold rounded-full
              hover:bg-amber-400 hover:text-white transition-colors duration-200
              ${compact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
