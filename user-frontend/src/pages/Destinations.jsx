
// import React, { useState } from "react";
// import { MapPin, Globe, Search } from "lucide-react";
// import DestinationCard from "./DestinationCard";
// import DestinationDetails from "./DestinationDetails";
// import { useGetAllDestinationQuery } from "../store/api/destinationApi";

// const Destinations = () => {
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   // Search & Filter State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const { data, isLoading } = useGetAllDestinationQuery();
//   const destinationData = data?.data?.data || [];

//   const categories = ["All", "International", "Domestic"];

//   // Filter Logic
//   const filteredDestinations = destinationData.filter((dest) => {
//     const matchesSearch =
//       dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       dest.country?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "All" ||
//       dest.category?.toLowerCase() === selectedCategory.toLowerCase();

//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
//           <div
//             className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80"
//             onClick={() => setSelectedDestination(null)}
//           >
//             {/* Logo placeholder */}
//           </div>

//           {/* Quick Jump Dropdown Menu */}
//           <div className="relative">
//             {isMenuOpen && (
//               <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl ring-1 ring-black/5 p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
//                 <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mb-4 max-h-64 overflow-y-auto pr-1">
//                   {destinationData.map((dest) => (
//                     <button
//                       key={dest.id}
//                       onClick={() => {
//                         setSelectedDestination(dest);
//                         setIsMenuOpen(false);
//                       }}
//                       className="flex items-center gap-2.5 p-1.5 rounded-lg text-left text-slate-600 hover:text-cyan-600 hover:bg-slate-50 transition-all group text-sm font-medium"
//                     >
//                       <MapPin className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform shrink-0" />
//                       <span className="truncate">{dest.name}</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="pt-3 border-t border-slate-100">
//                   <button
//                     onClick={() => {
//                       setSelectedDestination(null);
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors text-sm"
//                   >
//                     <Globe className="w-4 h-4" />
//                     All Destinations
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {selectedDestination ? (
//           <DestinationDetails
//             destination={selectedDestination}
//             onBack={() => setSelectedDestination(null)}
//           />
//         ) : (
//           <div>
//             {/* --- search--- */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/80 mb-10 ring-1 ring-slate-900/5">
//               {/* Search Bar Input */}
//               <div className="relative flex items-center gap-3">
//                 <div className="relative flex-1 flex items-center">
//                   <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     placeholder="Search by name or country..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a8cc] focus:bg-white transition-all text-base border border-slate-200/60"
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="bg-[#00a8cc] hover:bg-[#0092b3] text-white px-7 py-3 rounded-xl font-medium shadow-md shadow-[#00a8cc]/20 transition-all hover:shadow-lg hover:shadow-[#00a8cc]/30 active:scale-[0.98]"
//                 >
//                   Search
//                 </button>
//               </div>

//               {/* Category Filters */}
//               <div className="flex items-center gap-2.5 mt-6 flex-wrap">
//                 <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mr-1">
//                   CATEGORY
//                 </span>
//                 {categories.map((cat) => {
//                   const isActive = selectedCategory === cat;
//                   return (
//                     <button
//                       key={cat}
//                       onClick={() => setSelectedCategory(cat)}
//                       className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
//                         isActive
//                           ? "bg-[#00a8cc] text-white shadow-sm shadow-[#00a8cc]/20"
//                           : "bg-slate-50 text-slate-600 border border-slate-200/60 hover:bg-slate-100 hover:text-slate-900"
//                       }`}
//                     >
//                       {cat}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="mb-8">
//               <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//                 Explore Top Destinations
//               </h1>
//               <p className="text-slate-500 mt-2 text-base">
//                 Pick a destination to explore detailed itineraries and highlights.
//               </p>
//             </div>

//             {/* Destinations Grid */}
//             {isLoading ? (
//               <div className="flex flex-col items-center justify-center py-20 text-slate-400">
//                 <div className="w-8 h-8 border-4 border-[#00a8cc] border-t-transparent rounded-full animate-spin mb-4"></div>
//                 <p className="text-sm font-medium">Loading destinations...</p>
//               </div>
//             ) : filteredDestinations.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredDestinations.map((dest) => (
//                   <DestinationCard key={dest.id} destination={dest} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
//                 <Globe className="w-10 h-10 text-slate-300 mx-auto mb-3" />
//                 <p className="text-slate-600 font-medium">No destinations found matching your criteria.</p>
//                 <p className="text-slate-400 text-sm mt-1">Try clearing your search or category filters.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Destinations;



import React, { useState, useEffect } from "react";
import { MapPin, Globe, Search, Sparkles, ChevronRight, X, Compass, ArrowLeft, ArrowRight } from "lucide-react";
import DestinationCard from "./DestinationCard";
import DestinationDetails from "./DestinationDetails";
import { useGetAllDestinationQuery } from "../store/api/destinationApi";

const Destinations = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading } = useGetAllDestinationQuery();
  const destinationData = data?.data?.data || [];

  const categories = ["All", "International", "Domestic"];

  // Reset pagination when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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

  // Calculate Paginated Items
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDestinations = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);

  // Helper to generate page numbers with ellipsis (...)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {selectedDestination ? (
          <DestinationDetails
            destination={selectedDestination}
            onBack={() => setSelectedDestination(null)}
          />
        ) : (
          <div className="space-y-10">
            {/* Hero Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-semibold tracking-wide uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Travel Experiences</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight leading-tight">
                Explore Top Destinations
              </h1>
              <p className="text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto">
                Pick a destination to explore detailed itineraries, local secrets, and tailored journey highlights.
              </p>
            </div>

            {/* Advanced Glassmorphic Search Container */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800/80 ring-1 ring-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              {/* Search Bar Input */}
              <div className="relative flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by destination name or country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-10 py-4 bg-slate-950/80 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-base border border-slate-800 shadow-inner"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3.5 p-1 rounded-full text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 active:scale-[0.98] flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 mt-6 flex-wrap pt-4 border-t border-slate-800/60">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-500 uppercase mr-2">
                  Filter By Category:
                </span>
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-105"
                          : "bg-slate-950/50 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Destinations Grid / States */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-slate-900/40 rounded-3xl p-4 border border-slate-800/60 animate-pulse space-y-4"
                  >
                    <div className="w-full h-48 bg-slate-800/60 rounded-2xl" />
                    <div className="h-6 bg-slate-800/60 rounded-lg w-3/4" />
                    <div className="h-4 bg-slate-800/60 rounded-lg w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentDestinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} />
                  ))}
                </div>

                {/* Styled Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-8 pb-4">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                        currentPage === 1
                          ? "border-slate-800 text-slate-600 bg-slate-900/30 cursor-not-allowed"
                          : "border-slate-700 text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={index} className="px-2 text-slate-500 font-bold select-none">
                          ...
                        </span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(page)}
                          className={`w-11 h-11 rounded-full text-sm font-semibold transition-all flex items-center justify-center ${
                            currentPage === page
                              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 scale-105"
                              : "border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-600 hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                        currentPage === totalPages
                          ? "border-slate-800 text-slate-600 bg-slate-900/30 cursor-not-allowed"
                          : "border-slate-700 text-slate-300 bg-slate-900/80 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800/80 backdrop-blur-sm max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mx-auto mb-4 border border-slate-700/50">
                  <Globe className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">No matching destinations</h3>
                <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
                  We couldn't find anything matching "{searchTerm}". Try clearing your query or switching filter tabs.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-sm font-semibold transition-colors border border-slate-700/50"
                >
                  Clear Active Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Destinations;