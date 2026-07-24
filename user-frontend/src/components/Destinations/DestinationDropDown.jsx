import React, { useState } from 'react';
import { MapPin, Globe } from 'lucide-react';
import { destinations } from './destinationsData';

export default function DestinationDropdown({ onSelectDestination }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Card */}
      {isOpen && (
        <div className="w-[520px] bg-white rounded-3xl shadow-xl border border-gray-100 p-6 z-50">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {destinations.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectDestination(item)}
                className="flex items-center space-x-3 text-left group transition-all duration-150 p-1.5 rounded-lg hover:bg-orange-50"
              >
                <MapPin className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="text-slate-700 group-hover:text-amber-600 font-medium text-base">
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 my-4 pt-4">
            <button
              onClick={() => onSelectDestination('all')}
              className="flex items-center space-x-3 text-amber-600 hover:text-amber-700 font-bold text-lg w-full p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <Globe className="w-5 h-5 text-amber-600" />
              <span>All Destinations</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}