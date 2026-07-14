import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle2,
  Utensils,
  Coffee,
  Sunset,
  Building2,
  Navigation,
  MapPin,
  CalendarDays,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyItinerary() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <CalendarDays className="w-12 h-12 mb-3 text-gray-300" />
      <p className="text-base font-medium text-gray-500">No itinerary available</p>
      <p className="text-sm mt-1">Detailed day-by-day plan will be added soon.</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Meal badge
// ---------------------------------------------------------------------------
function MealBadge({ label, included, icon: Icon }) {
  return (
    <span
      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
        ${included ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400 line-through'}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Single day accordion
// ---------------------------------------------------------------------------
function ItineraryDay({ item, isOpen, onToggle, isLast }) {
  const { day, title, description, activities, meals, accommodation, distance } = item;

  return (
    <div className="relative flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center shrink-0">
        {/* Numbered circle */}
        <motion.div
          animate={{ scale: isOpen ? 1.1 : 1, backgroundColor: isOpen ? '#f59e0b' : '#fde68a' }}
          transition={{ duration: 0.2 }}
          className="w-9 h-9 rounded-full flex items-center justify-center
            font-bold text-white text-sm shadow-md z-10 cursor-pointer select-none"
          style={{ backgroundColor: isOpen ? '#f59e0b' : '#fde68a', color: isOpen ? '#fff' : '#92400e' }}
          onClick={onToggle}
        >
          {day}
        </motion.div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-0.5 flex-1 mt-1 bg-amber-100 min-h-[32px]" />
        )}
      </div>

      {/* Content card */}
      <div className="flex-1 pb-6">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-left rounded-xl px-4 py-3
            bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200
            transition-all duration-200 group"
        >
          <div>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide">
              Day {day}
            </span>
            <h4 className="text-sm font-semibold text-gray-800 mt-0.5 group-hover:text-amber-600 transition-colors">
              {title}
            </h4>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            className="shrink-0 ml-2"
          >
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-amber-400 transition-colors" />
          </motion.div>
        </button>

        {/* Accordion body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-4 space-y-4">
                {/* Description */}
                {description && (
                  <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                )}

                {/* Activities */}
                {activities?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Activities
                    </p>
                    <ul className="space-y-1.5">
                      {activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          {act}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Meals */}
                {meals && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Meals
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <MealBadge label="Breakfast" included={meals.breakfast} icon={Coffee} />
                      <MealBadge label="Lunch" included={meals.lunch} icon={Utensils} />
                      <MealBadge label="Dinner" included={meals.dinner} icon={Sunset} />
                    </div>
                  </div>
                )}

                {/* Accommodation + Distance */}
                <div className="flex flex-wrap gap-4">
                  {accommodation && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700">Stay: </span>
                        {accommodation}
                      </span>
                    </div>
                  )}
                  {distance && (
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>
                        <span className="font-medium text-gray-700">Distance: </span>
                        {distance}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function TripItinerary({ itinerary = [], totalDays }) {
  const [openDay, setOpenDay] = useState(
    itinerary.length > 0 ? itinerary[0].day : null
  );

  if (!itinerary || itinerary.length === 0) {
    return <EmptyItinerary />;
  }

  const toggle = (day) => setOpenDay((prev) => (prev === day ? null : day));

  return (
    <section className="py-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-amber-500" />
        <h2 className="text-xl font-bold text-gray-800">Day-by-Day Itinerary</h2>
        {totalDays && (
          <span className="ml-auto text-sm text-gray-400 font-medium">
            {totalDays} {totalDays === 1 ? 'Day' : 'Days'} total
          </span>
        )}
      </div>

      {/* Expand / Collapse all */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpenDay(openDay ? null : itinerary[0]?.day)}
          className="text-xs text-amber-500 hover:text-amber-600 font-medium transition-colors"
        >
          {openDay ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {/* Timeline list */}
      <div className="pl-1">
        {itinerary.map((item, idx) => (
          <ItineraryDay
            key={item.day}
            item={item}
            isOpen={openDay === item.day}
            onToggle={() => toggle(item.day)}
            isLast={idx === itinerary.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
