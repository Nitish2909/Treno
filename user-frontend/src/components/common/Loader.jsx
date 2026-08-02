/**
 * @file Loader.jsx
 * @description Reusable loader and skeleton components for Treno.
 *
 * Named exports:
 *  - FullPageLoader     — centred full-screen spinner with brand name
 *  - SkeletonCard       — single shimmer skeleton matching TripCard dimensions
 *  - InlineLoader       — small inline spinner
 *  - CardSkeletonGrid   — responsive grid of SkeletonCard elements
 *
 * Default export:
 *  - Loader             — convenience wrapper; selects variant via `variant` prop
 *
 * @example
 * // Full-page loading screen
 * <FullPageLoader />
 *
 * // Grid of shimmer cards while data loads
 * <CardSkeletonGrid count={6} />
 *
 * // Generic prop-driven usage
 * <Loader variant="spinner" />
 */

import clsx from "clsx";
import { Mountain,Plane } from "lucide-react";
// import { Link } from 'react-router-dom';
// import TrenoLogo from "../../assets/TrenoLogo.webp";

// ---------------------------------------------------------------------------
// Shimmer keyframe helper
// ---------------------------------------------------------------------------

/**
 * Base shimmer class string used across skeleton variants.
 * Tailwind's `animate-pulse` provides the breathing fade effect.
 */
const SHIMMER =
  "animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]";

// ---------------------------------------------------------------------------
// FullPageLoader
// ---------------------------------------------------------------------------

/**
 * Full-screen centred loading overlay with a spinning amber ring and brand logo.
 *
 * @param {{ message?: string }} props
 * @param {string} [props.message='Loading your adventure…'] - Optional caption below the logo.
 */
export function FullPageLoader({ message = "Loading your adventure…" }) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
    >
      {/* Outer spinning ring */}
      <div className="relative w-20 h-20">
        {/* Amber spinning arc */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="160 53.6"
            className="drop-shadow-sm"
          />
        </svg>

        {/* Brand icon centred inside ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
            <Plane size={22} className="text-white" />
          </span>
        </div>
      </div>

      {/* Brand name */}
      <p className='mt-5 text-2xl font-bold text-slate-800 font-["Playfair_Display",serif] tracking-tight'>
        Treno
      </p>

      {/* Caption */}
      <p className="mt-1.5 text-sm text-slate-400">{message}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// InlineLoader
// ---------------------------------------------------------------------------

/**
 * Small inline spinner — use inside buttons, cards, or list items.
 *
 * @param {{ size?: number, className?: string, color?: string }} props
 * @param {number} [props.size=18] - Width / height of the spinner in pixels.
 * @param {string} [props.className=''] - Extra Tailwind classes.
 * @param {string} [props.color='text-amber-500'] - Tailwind text-color class for the spinner.
 */
export function InlineLoader({
  size = 18,
  className = "",
  color = "text-amber-500",
}) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx("inline-flex items-center justify-center", className)}
    >
      <svg
        style={{ width: size, height: size }}
        className={clsx("animate-spin", color)}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="sr-only">Loading…</span>
    </span>
  );
}

// ---------------------------------------------------------------------------
// SkeletonCard
// ---------------------------------------------------------------------------

/**
 * Animated shimmer skeleton that matches the dimensions of a TripCard.
 *
 * @param {{ className?: string }} props
 * @param {string} [props.className=''] - Extra Tailwind classes for the wrapper.
 */
export function SkeletonCard({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "rounded-2xl overflow-hidden bg-slate-100 shadow-sm",
        className,
      )}
    >
      {/* Image placeholder */}
      <div className={clsx("w-full h-52", SHIMMER)} />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badge row */}
        <div className="flex items-center gap-2">
          <div className={clsx("h-5 w-16 rounded-full", SHIMMER)} />
          <div className={clsx("h-5 w-12 rounded-full", SHIMMER)} />
        </div>

        {/* Title */}
        <div className={clsx("h-5 w-3/4 rounded-md", SHIMMER)} />
        <div className={clsx("h-4 w-1/2 rounded-md", SHIMMER)} />

        {/* Meta row */}
        <div className="flex items-center gap-4 pt-1">
          <div className={clsx("h-4 w-20 rounded-md", SHIMMER)} />
          <div className={clsx("h-4 w-16 rounded-md", SHIMMER)} />
        </div>

        {/* Divider */}
        <div className={clsx("h-px w-full", SHIMMER)} />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className={clsx("h-3 w-16 rounded-md mb-1", SHIMMER)} />
            <div className={clsx("h-6 w-24 rounded-md", SHIMMER)} />
          </div>
          <div className={clsx("h-9 w-28 rounded-full", SHIMMER)} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardSkeletonGrid
// ---------------------------------------------------------------------------

/**
 * Responsive grid of SkeletonCard placeholders — drop in while trip data loads.
 *
 * @param {{ count?: number, className?: string }} props
 * @param {number}  [props.count=6]      - Number of skeleton cards to render.
 * @param {string}  [props.className=''] - Extra classes for the grid wrapper.
 */
export function CardSkeletonGrid({ count = 6, className = "" }) {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Default export — prop-driven convenience wrapper
// ---------------------------------------------------------------------------

/**
 * Generic Loader component. Selects the appropriate sub-component based on
 * the `variant` prop.
 *
 * @param {{
 *   variant?: 'fullpage' | 'skeleton' | 'inline' | 'card' | 'spinner',
 *   count?:   number,
 *   message?: string,
 *   className?: string,
 * }} props
 *
 * @param {'fullpage'|'skeleton'|'inline'|'card'|'spinner'} [props.variant='spinner']
 *   Which loader to render.
 * @param {number}  [props.count=6]      - Number of skeleton cards (variant="card" only).
 * @param {string}  [props.message]      - Custom message (variant="fullpage" only).
 * @param {string}  [props.className=''] - Extra classes forwarded to the rendered element.
 */
export default function Loader({
  variant = "spinner",
  count = 6,
  message,
  className = "",
}) {
  switch (variant) {
    case "fullpage":
      return <FullPageLoader message={message} />;

    case "skeleton":
      return <SkeletonCard className={className} />;

    case "card":
      return <CardSkeletonGrid count={count} className={className} />;

    case "inline":
    case "spinner":
    default:
      return <InlineLoader className={className} />;
  }
}
