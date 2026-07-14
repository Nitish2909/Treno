import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Star, SlidersHorizontal } from 'lucide-react';
import {
  setFilter,
  toggleCategory,
  setPriceRange,
  toggleDuration,
  toggleDifficulty,
  clearFilters,
} from '../../store/slices/tripSlice.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { label: 'Trekking', count: 42 },
  { label: 'Beach', count: 28 },
  { label: 'Adventure', count: 35 },
  { label: 'Cultural', count: 19 },
  { label: 'Honeymoon', count: 24 },
  { label: 'Backpacking', count: 31 },
  { label: 'Wildlife', count: 17 },
  { label: 'Weekend Getaways', count: 56 },
];

const DURATIONS = [
  { label: '1-3 Days', value: '1-3' },
  { label: '4-6 Days', value: '4-6' },
  { label: '7-10 Days', value: '7-10' },
  { label: '10+ Days', value: '10+' },
];

const DIFFICULTIES = [
  { label: 'Easy', value: 'easy', color: 'bg-green-100 text-green-700' },
  { label: 'Moderate', value: 'moderate', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Hard', value: 'hard', color: 'bg-orange-100 text-orange-700' },
  { label: 'Challenging', value: 'challenging', color: 'bg-red-100 text-red-700' },
];

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

// ---------------------------------------------------------------------------
// Collapsible section wrapper
// ---------------------------------------------------------------------------
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-0 py-4">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between text-sm font-semibold text-gray-700 hover:text-amber-500 transition-colors"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dual price range slider
// ---------------------------------------------------------------------------
function PriceRangeSlider({ min, max, onChange }) {
  const handleMin = (e) => {
    const val = Math.min(Number(e.target.value), max - 1000);
    onChange(val, max);
  };
  const handleMax = (e) => {
    const val = Math.max(Number(e.target.value), min + 1000);
    onChange(min, val);
  };
  const minPct = ((min - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
  const maxPct = ((max - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-6 flex items-center">
        {/* Track */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
        {/* Active range */}
        <div
          className="absolute h-1.5 bg-amber-400 rounded-full"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={min}
          onChange={handleMin}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-amber-400
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={max}
          onChange={handleMax}
          className="absolute w-full h-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-amber-400
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        <span>₹{min.toLocaleString()}</span>
        <span>₹{max.toLocaleString()}</span>
      </div>
      {/* Number input fallbacks */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-400 mb-1 block">Min</label>
          <input
            type="number"
            value={min}
            min={MIN_PRICE}
            max={max - 1000}
            step={500}
            onChange={handleMin}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700
              focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-400 mb-1 block">Max</label>
          <input
            type="number"
            value={max}
            min={min + 1000}
            max={MAX_PRICE}
            step={500}
            onChange={handleMax}
            className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-gray-700
              focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function TripFilters({ onClose }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.trip?.filters ?? {});
  const {
    type: tripType = 'all',
    categories = [],
    priceRange = [MIN_PRICE, MAX_PRICE],
    duration: durations = [],
    difficulty: difficulties = [],
    rating: minRating = 0,
  } = filters;

  // Count active filters
  const activeCount = [
    tripType !== 'all' ? 1 : 0,
    categories.length,
    priceRange[0] > MIN_PRICE || priceRange[1] < MAX_PRICE ? 1 : 0,
    durations.length,
    difficulties.length,
    minRating > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <aside className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-auto max-h-[calc(100vh-6rem)] sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <span className="font-bold text-gray-800 text-sm">Filters</span>
          {activeCount > 0 && (
            <span className="bg-amber-400 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              onClick={() => dispatch(clearFilters())}
              className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
            >
              Clear All
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="ml-1 p-1 rounded-full hover:bg-gray-100 transition-colors md:hidden"
              aria-label="Close filters"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="px-5">
        {/* ---------------------------------------------------------------- */}
        {/* 1. Trip Type */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Trip Type">
          <div className="flex gap-2 flex-wrap">
            {['all', 'domestic', 'international'].map((t) => (
              <button
                key={t}
                onClick={() => dispatch(setFilter({ key: 'type', value: t }))}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
                  ${tripType === t
                    ? t === 'international'
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'bg-amber-400 border-amber-400 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-600'}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* ---------------------------------------------------------------- */}
        {/* 2. Categories */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Categories">
          <div className="space-y-2">
            {CATEGORIES.map(({ label, count }) => {
              const checked = categories.includes(label);
              return (
                <label
                  key={label}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150
                        ${checked ? 'bg-amber-400 border-amber-400' : 'border-gray-300 group-hover:border-amber-300'}`}
                      onClick={() => dispatch(toggleCategory(label))}
                    >
                      {checked && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => dispatch(toggleCategory(label))}
                    />
                    <span className={`text-sm transition-colors ${checked ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>
                      {label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">({count})</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Price Range */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Price Range">
          <PriceRangeSlider
            min={priceRange[0]}
            max={priceRange[1]}
            onChange={(min, max) => dispatch(setPriceRange([min, max]))}
          />
        </FilterSection>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Duration */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Duration">
          <div className="space-y-2">
            {DURATIONS.map(({ label, value }) => {
              const checked = durations.includes(value);
              return (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150
                      ${checked ? 'bg-amber-400 border-amber-400' : 'border-gray-300 group-hover:border-amber-300'}`}
                    onClick={() => dispatch(toggleDuration(value))}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => dispatch(toggleDuration(value))} />
                  <span className={`text-sm ${checked ? 'text-amber-600 font-medium' : 'text-gray-600'}`}>{label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* ---------------------------------------------------------------- */}
        {/* 5. Difficulty */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Difficulty">
          <div className="space-y-2">
            {DIFFICULTIES.map(({ label, value, color }) => {
              const checked = difficulties.includes(value);
              return (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150
                      ${checked ? 'bg-amber-400 border-amber-400' : 'border-gray-300 group-hover:border-amber-300'}`}
                    onClick={() => dispatch(toggleDifficulty(value))}
                  >
                    {checked && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => dispatch(toggleDifficulty(value))} />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* ---------------------------------------------------------------- */}
        {/* 6. Minimum Rating */}
        {/* ---------------------------------------------------------------- */}
        <FilterSection title="Minimum Rating">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => dispatch(setFilter({ key: 'rating', value: star === minRating ? 0 : star }))}
                className="transition-transform hover:scale-110 focus:outline-none"
                aria-label={`Set minimum rating ${star}`}
              >
                <Star
                  className={`w-6 h-6 transition-colors duration-150
                    ${star <= minRating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 fill-gray-200 hover:text-amber-300'}`}
                />
              </button>
            ))}
            {minRating > 0 && (
              <span className="ml-2 text-xs text-gray-500">{minRating}+ stars</span>
            )}
          </div>
        </FilterSection>
      </div>

      {/* Apply button (mobile) */}
      {onClose && (
        <div className="px-5 pb-5 pt-2 md:hidden">
          <button
            onClick={onClose}
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl transition-colors"
          >
            Apply Filters
            {activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>
      )}
    </aside>
  );
}
