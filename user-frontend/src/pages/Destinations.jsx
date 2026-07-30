import React, { useState } from "react";
import { MapPin, Globe, ChevronDown } from "lucide-react";
import DestinationCard from "./DestinationCard";
import DestinationDetails from "./DestinationDetails";
import { useGetAllDestinationQuery } from "../store/api/destinationApi";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, isLoading } = useGetAllDestinationQuery();
  const destinationData = data?.data?.data;
  console.log(destinationData);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header & Navigation */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelectedDestination(null)}
          >
            {/* <Globe className="w-6 h-6 text-amber-500" /> */}
            {/* <span className="font-bold text-xl text-gray-800">Wanderlust</span> */}
          </div>

          {/* Quick Jump Dropdown Menu */}
          <div className="relative">
            {/* <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-amber-100 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Destinations
              <ChevronDown className="w-4 h-4" />
            </button> */}

            {/* Popover Card based on image UI */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
                  {destinationData?.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => {
                        setSelectedDestination(dest);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-left text-gray-700 hover:text-amber-600 transition-colors group text-sm font-medium"
                    >
                      <MapPin className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="truncate">{dest.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setSelectedDestination(null);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    All Destinations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {destinationData && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedDestination ? (
            <DestinationDetails
              destination={selectedDestination}
              onBack={() => setSelectedDestination(null)}
            />
          ) : (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Explore Top Destinations
                </h1>
                <p className="text-gray-500 mt-1">
                  Pick a destination to explore detailed itineraries and
                  highlights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinationData.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* Main View Area */}
    </div>
  );
};

export default Destinations;
