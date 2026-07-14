import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// Size config
// ---------------------------------------------------------------------------
const SIZE_MAP = {
  sm: { star: 'w-3.5 h-3.5', text: 'text-xs', gap: 'gap-0.5' },
  md: { star: 'w-5 h-5', text: 'text-sm', gap: 'gap-1' },
  lg: { star: 'w-7 h-7', text: 'text-base', gap: 'gap-1.5' },
};

// ---------------------------------------------------------------------------
// SVG star — supports full, half, empty fills
// ---------------------------------------------------------------------------
function StarSVG({ fill = 'empty', className = '', onClick, onMouseEnter, onMouseLeave }) {
  const id = React.useId?.() ?? Math.random().toString(36).slice(2);
  const clipId = `half-${id}`;

  return (
    <svg
      viewBox="0 0 20 20"
      className={`${className} ${onClick ? 'cursor-pointer select-none' : ''} transition-transform duration-100 ${onClick ? 'hover:scale-110' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
    >
      {fill === 'half' && (
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="10" height="20" />
          </clipPath>
        </defs>
      )}

      {/* Background star (empty) */}
      <path
        d="M10 1l2.39 4.845 5.346.777-3.868 3.77.913 5.323L10 13.255l-4.781 2.46.913-5.323L2.264 6.622l5.346-.777L10 1z"
        className="fill-gray-200"
      />

      {/* Foreground fill */}
      {fill !== 'empty' && (
        <path
          d="M10 1l2.39 4.845 5.346.777-3.868 3.77.913 5.323L10 13.255l-4.781 2.46.913-5.323L2.264 6.622l5.346-.777L10 1z"
          className="fill-amber-400"
          clipPath={fill === 'half' ? `url(#${clipId})` : undefined}
        />
      )}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function StarRating({
  rating = 0,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onChange,
  showCount = false,
  count,
  className = '',
}) {
  const [hovered, setHovered] = useState(null);
  const { star: starClass, text: textClass, gap: gapClass } = SIZE_MAP[size] ?? SIZE_MAP.md;

  const displayRating = interactive && hovered !== null ? hovered : rating;

  const getFill = (starIndex) => {
    const val = displayRating - (starIndex - 1); // 1-indexed
    if (val >= 1) return 'full';
    if (val >= 0.5) return 'half';
    return 'empty';
  };

  const handleClick = (starIndex) => {
    if (!interactive) return;
    // Clicking the same star again resets to 0
    const next = starIndex === Math.round(rating) ? 0 : starIndex;
    onChange?.(next);
  };

  return (
    <div className={`inline-flex items-center ${gapClass} ${className}`}>
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((starIndex) => (
        <StarSVG
          key={starIndex}
          fill={getFill(starIndex)}
          className={starClass}
          onClick={interactive ? () => handleClick(starIndex) : undefined}
          onMouseEnter={interactive ? () => setHovered(starIndex) : undefined}
          onMouseLeave={interactive ? () => setHovered(null) : undefined}
        />
      ))}

      {showCount && count != null && (
        <span className={`ml-1 text-gray-500 font-medium ${textClass}`}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
