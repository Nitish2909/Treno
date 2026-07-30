// import React, { useState } from "react";
// import { MapPin, Globe, ChevronDown } from "lucide-react";
// import DestinationCard from "./DestinationCard";
// import DestinationDetails from "./DestinationDetails";
// import { useGetAllDestinationQuery } from "../store/api/destinationApi";

// const Destinations = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { data, isLoading } = useGetAllDestinationQuery();
//   const destinationData = data?.data?.data;
//   console.log(destinationData);

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">
//       {/* Header & Navigation */}
//       <header className="">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div
//             className="flex items-center gap-2 cursor-pointer"
//             onClick={() => setSelectedDestination(null)}
//           >
//             {/* <Globe className="w-6 h-6 text-amber-500" /> */}
//             {/* <span className="font-bold text-xl text-gray-800">Wanderlust</span> */}
//           </div>

//           {/* Quick Jump Dropdown Menu */}
//           <div className="relative">
//             {/* <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-amber-100 transition-colors"
//             >
//               <MapPin className="w-4 h-4" />
//               Destinations
//               <ChevronDown className="w-4 h-4" />
//             </button> */}

//             {/* Popover Card based on image UI */}
//             {isMenuOpen && (
//               <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
//                 <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
//                   {destinationData?.map((dest) => (
//                     <button
//                       key={dest.id}
//                       onClick={() => {
//                         setSelectedDestination(dest);
//                         setIsMenuOpen(false);
//                       }}
//                       className="flex items-center gap-2 text-left text-gray-700 hover:text-amber-600 transition-colors group text-sm font-medium"
//                     >
//                       <MapPin className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform shrink-0" />
//                       <span className="truncate">{dest.name}</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="pt-4 border-t border-gray-100">
//                   <button
//                     onClick={() => {
//                       setSelectedDestination(null);
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-700 text-sm"
//                   >
//                     <Globe className="w-4 h-4" />
//                     All Destinations
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {destinationData && (
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           {selectedDestination ? (
//             <DestinationDetails
//               destination={selectedDestination}
//               onBack={() => setSelectedDestination(null)}
//             />
//           ) : (
//             <div>
//               <div className="mb-8">
//                 <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
//                   Explore Top Destinations
//                 </h1>
//                 <p className="text-gray-500 mt-1">
//                   Pick a destination to explore detailed itineraries and
//                   highlights.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {destinationData.map((dest) => (
//                   <DestinationCard key={dest.id} destination={dest} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       )}

//       {/* Main View Area */}
//     </div>
//   );
// };

// export default Destinations;















import React, { useState } from "react";
import { MapPin, Globe, Search } from "lucide-react";
import DestinationCard from "./DestinationCard";
import DestinationDetails from "./DestinationDetails";
import { useGetAllDestinationQuery } from "../store/api/destinationApi";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, isLoading } = useGetAllDestinationQuery();
  const destinationData = data?.data?.data || [];

  const categories = ["All", "International", "Domestic"];

  // Filter Logic
  const filteredDestinations = destinationData.filter((dest) => {
    const matchesSearch =
      dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.country?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      dest.category?.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => setSelectedDestination(null)}
          >
            {/* Logo placeholder */}
          </div>

          {/* Quick Jump Dropdown Menu */}
          <div className="relative">
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-black/5 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mb-4 max-h-64 overflow-y-auto pr-1">
                  {destinationData.map((dest) => (
                    <button
                      key={dest.id}
                      onClick={() => {
                        setSelectedDestination(dest);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2.5 p-1.5 rounded-lg text-left text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all group text-sm font-medium"
                    >
                      <MapPin className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="truncate">{dest.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedDestination(null);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    All Destinations
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {selectedDestination ? (
          <DestinationDetails
            destination={selectedDestination}
            onBack={() => setSelectedDestination(null)}
          />
        ) : (
          <div>
            {/* --- search--- */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 mb-10 ring-1 ring-slate-900/5">
              {/* Search Bar Input */}
              <div className="relative flex items-center gap-3">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by name or country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:bg-white transition-all text-base border border-slate-200/60"
                  />
                </div>
                <button
                  type="button"
                  className="bg-[#00a8cc] hover:bg-[#0092b3] text-white px-7 py-3 rounded-xl font-medium shadow-md shadow-[#00a8cc]/20 transition-all hover:shadow-lg hover:shadow-[#00a8cc]/30 active:scale-[0.98]"
                >
                  Search
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2.5 mt-6 flex-wrap">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mr-1">
                  CATEGORY
                </span>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#00a8cc] text-white shadow-sm shadow-[#00a8cc]/20"
                          : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Top Destinations
              </h1>
              <p className="text-slate-500 mt-2 text-base">
                Pick a destination to explore detailed itineraries and highlights.
              </p>
            </div>

            {/* Destinations Grid */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-8 h-8 border-4 border-[#00a8cc] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium">Loading destinations...</p>
              </div>
            ) : filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((dest) => (
                  <DestinationCard key={dest.id} destination={dest} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <Globe className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 font-medium">No destinations found matching your criteria.</p>
                <p className="text-slate-400 text-sm mt-1">Try clearing your search or category filters.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Destinations;