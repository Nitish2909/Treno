/**
 * @file ImageWithFallback.jsx
 * @description Resilient image component for Treno.
 *
 * Features:
 *  - Shows an animated shimmer skeleton while the image loads.
 *  - Fades the image in once it has fully loaded.
 *  - Falls back to `fallbackSrc` if the primary `src` fails to load.
 *  - If `fallbackSrc` is also absent (or also errors), renders a branded
 *    gradient placeholder div with an icon, so the layout never breaks.
 *
 * @example
 * <ImageWithFallback
 *   src={trip.coverImage}
 *   alt={trip.title}
 *   fallbackSrc="/assets/images/trip-placeholder.jpg"
 *   className="w-full h-52 object-cover"
 * />
 */

import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { ImageOff } from 'lucide-react';

// ---------------------------------------------------------------------------
// Shimmer helper (reused from Loader conventions)
// ---------------------------------------------------------------------------

const SHIMMER_CLASSES =
  'animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';

// ---------------------------------------------------------------------------
// Gradient placeholder (shown when both src and fallbackSrc fail)
// ---------------------------------------------------------------------------

/**
 * @param {{ className?: string, alt?: string }} props
 */
function GradientPlaceholder({ className = '', alt = '' }) {
  return (
    <div
      role="img"
      aria-label={alt || 'Image unavailable'}
      className={clsx(
        'flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300',
        className,
      )}
    >
      <ImageOff size={32} className="text-slate-400 mb-1" strokeWidth={1.5} />
      <span className="text-xs text-slate-400 font-medium">Image unavailable</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Image component with loading skeleton, fade-in animation, and fallback support.
 *
 * @param {{
 *   src?:          string,
 *   alt?:          string,
 *   fallbackSrc?:  string,
 *   className?:    string,
 *   wrapperClass?: string,
 *   eager?:        boolean,
 * } & import('react').ImgHTMLAttributes<HTMLImageElement>} props
 *
 * @param {string}  [props.src]             - Primary image URL.
 * @param {string}  [props.alt='']          - Accessible alt text.
 * @param {string}  [props.fallbackSrc]     - Secondary URL used when `src` fails.
 * @param {string}  [props.className='']    - Tailwind classes applied to the `<img>` element.
 * @param {string}  [props.wrapperClass=''] - Tailwind classes applied to the outer wrapper `<div>`.
 * @param {boolean} [props.eager=false]     - When true, uses `loading="eager"` instead of `"lazy"`.
 */
export default function ImageWithFallback({
  src,
  alt          = '',
  fallbackSrc,
  className    = '',
  wrapperClass = '',
  eager        = false,
  ...rest
}) {
  // Track whether the image has finished loading
  const [loaded,        setLoaded]        = useState(false);
  // Track how many times we've tried a new src (0 = primary, 1 = fallback, 2 = give up)
  const [errorCount,    setErrorCount]    = useState(0);
  // The active src we hand to <img>
  const [activeSrc,     setActiveSrc]     = useState(src);

  // Called once the browser has decoded and displayed the image
  const handleLoad = useCallback(() => setLoaded(true), []);

  // Called when the <img> fails to load
  const handleError = useCallback(() => {
    if (errorCount === 0 && fallbackSrc && fallbackSrc !== activeSrc) {
      // Try the fallback
      setErrorCount(1);
      setActiveSrc(fallbackSrc);
      setLoaded(false);
    } else {
      // Nothing left to try — give up (errorCount ≥ 1 or no fallback)
      setErrorCount(2);
    }
  }, [errorCount, fallbackSrc, activeSrc]);

  // ── Complete failure — render gradient placeholder ───────────────────────
  if (errorCount >= 2 || (!src && !fallbackSrc)) {
    return (
      <GradientPlaceholder
        className={clsx('w-full h-full', className, wrapperClass)}
        alt={alt}
      />
    );
  }

  // ── Normal render ────────────────────────────────────────────────────────
  return (
    <div className={clsx('relative overflow-hidden', wrapperClass)}>
      {/* Shimmer skeleton shown while loading */}
      {!loaded && (
        <div
          aria-hidden="true"
          className={clsx('absolute inset-0', SHIMMER_CLASSES)}
        />
      )}

      {/* Actual image */}
      <img
        src={activeSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          // Base classes
          'w-full h-full object-cover block',
          // Fade-in transition
          'transition-opacity duration-500 ease-in',
          // Hide (but keep in DOM) while loading so the skeleton shows beneath
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...rest}
      />
    </div>
  );
}
