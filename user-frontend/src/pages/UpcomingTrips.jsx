import React, { useState, useMemo, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  MapPin,
  Calendar,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  Tag,
  Check
} from "lucide-react";
import TrenoLogo from "../assets/TrenoLogo.webp";
import { Link } from "react-router-dom";

// Enhanced Sample Data with structured fields for precise filtering
const TRIPS_DATA = [
  {
    id: 1,
    title: "Ladakh Adventure Bike Trip | Tso Moriri, Umling La and Turtuk",
    nights: 8,
    duration: "8N/9D",
    location: "Leh Airport - Leh Airport",
    category: "India",
    month: "Aug-26",
    dates: ["15 Aug", "22 Aug"],
    extraBatches: "+6 batches",
    originalPrice: 38999,
    discountedPrice: 33999,
    rating: 4.9,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Bhutan Road Trip with Phobjikha Valley",
    nights: 7,
    duration: "7N/8D",
    location: "Bagdogra Airport - Siliguri Hotel",
    category: "International",
    month: "Aug-26",
    dates: ["15 Aug", "29 Aug"],
    extraBatches: "+13 batches",
    originalPrice: 54999,
    discountedPrice: 44999,
    rating: 4.8,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Best of Meghalaya Group Tour | Witness the Monsoon Magic",
    nights: 5,
    duration: "5N/6D",
    location: "Guwahati - Guwahati",
    category: "India",
    month: "Sep-26",
    dates: ["15 Aug", "29 Aug"],
    extraBatches: null,
    originalPrice: 28999,
    discountedPrice: 24499,
    rating: 4.7,
    badge: "Monsoon Special",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "6 Days Zanskar Bike Trip from Manali | Monasteries and Mountains",
    nights: 5,
    duration: "5N/6D",
    location: "Delhi - Delhi",
    category: "India",
    month: "Sep-26",
    dates: ["15 Aug", "22 Aug"],
    extraBatches: "+5 batches",
    originalPrice: 26999,
    discountedPrice: 23999,
    rating: 4.9,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "7 Days Thrilling Ladakh Tour with Umling La - Classic Value Circuit",
    nights: 6,
    duration: "6N/7D",
    location: "Leh - Leh",
    category: "India",
    month: "Oct-26",
    dates: ["15 Aug", "22 Aug"],
    extraBatches: "+7 batches",
    originalPrice: 28999,
    discountedPrice: 24999,
    rating: 4.6,
    badge: null,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "6 Days Vietnam Backpacking Trip | Hanoi, Ha Long Bay, Da Nang",
    nights: 5,
    duration: "5N/6D",
    location: "Noi Bai Airport - Da Nang Airport",
    category: "International",
    month: "Oct-26",
    dates: ["15 Aug", "23 Aug"],
    extraBatches: "+12 batches",
    originalPrice: 38999,
    discountedPrice: 34999,
    rating: 4.9,
    badge: "Featured",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&auto=format&fit=crop",
  },
];

const MONTHS = [
  "All Months",
  "Aug-26",
  "Sep-26",
  "Oct-26",
  "Nov-26",
  "Dec-26",
  "Jan-27",
  "Feb-27",
  "Mar-27",
  "Apr-27",
];

export default function UpcomingTripsPage() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All"); // 'All', 'India', 'International'
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [durationRange, setDurationRange] = useState(16);
  const [budgetRange, setBudgetRange] = useState(400000);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const carouselRef = useRef(null);

  // Scroll carousel horizontally
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter & Sort Logic
  const filteredTrips = useMemo(() => {
    return TRIPS_DATA.filter((trip) => {
      // Category Filter
      if (selectedCategory !== "All" && trip.category !== selectedCategory) {
        return false;
      }
      // Month Filter
      if (selectedMonth !== "All Months" && trip.month !== selectedMonth) {
        return false;
      }
      // Duration Filter
      if (trip.nights > durationRange) {
        return false;
      }
      // Budget Filter
      if (trip.discountedPrice > budgetRange) {
        return false;
      }
      // Search Query Filter
      if (
        searchQuery.trim() !== "" &&
        !trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trip.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.discountedPrice - b.discountedPrice;
      if (sortBy === "price-high") return b.discountedPrice - a.discountedPrice;
      if (sortBy === "duration") return a.nights - b.nights;
      return 0; // recommended / default
    });
  }, [selectedCategory, selectedMonth, durationRange, budgetRange, searchQuery, sortBy]);

  // Reset Filters Handler
  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedMonth("All Months");
    setDurationRange(16);
    setBudgetRange(400000);
    setSearchQuery("");
    setSortBy("recommended");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedMonth !== "All Months" ||
    durationRange < 16 ||
    budgetRange < 400000 ||
    searchQuery !== "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HERO / HEADER SECTION */}
      <div className="relative w-full h-[300px] sm:h-[340px] overflow-hidden bg-slate-900">
        <img
          src="https://images.pexels.com/photos/6274178/pexels-photo-6274178.jpeg"
          alt="Upcoming Trips Header"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Header Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 text-center">
          <Link to="/" className="group relative mb-3">
            <div className="absolute -inset-2 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            <img
              src={TrenoLogo}
              alt="Treno Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 transform group-hover:scale-105 transition-all duration-300 relative z-10 object-contain drop-shadow-2xl"
            />
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Curated Expeditions
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-lg">
            Upcoming <span className="text-cyan-400">Trips</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-lg font-medium">
            Find your next unforgettable journey across handpicked Indian and International destinations.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TOP SEARCH & MOBILE FILTER TRIGGER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search destination or trip title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Mobile Trigger Controls */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
              )}
            </button>

            <div className="flex items-center gap-2 ml-auto sm:ml-0">
              <span className="text-xs font-semibold text-slate-500 shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-medium text-slate-700 py-2.5 px-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration: Shortest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          
          {/* SIDEBAR FILTERS (DESKTOP) */}
          <aside className="hidden lg:block w-72 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm shrink-0 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Destination / Category Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Destination Category
              </h3>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {["All", "India", "International"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-cyan-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-5 border-slate-100" />

            {/* Duration Range Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Max Duration
                </h3>
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
                  Up to {durationRange} Nights
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                value={durationRange}
                onChange={(e) => setDurationRange(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>2 Nights</span>
                <span>16 Nights</span>
              </div>
            </div>

            <hr className="my-5 border-slate-100" />

            {/* Budget Range Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Max Budget
                </h3>
                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
                  ₹{budgetRange.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="400000"
                step="5000"
                value={budgetRange}
                onChange={(e) => setBudgetRange(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mt-1">
                <span>₹10,000</span>
                <span>₹4,00,000</span>
              </div>
            </div>

            <hr className="my-5 border-slate-100" />

            {/* Month List Checklist */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Select Month
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {MONTHS.map((m) => (
                  <label
                    key={m}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMonth === m
                        ? "bg-cyan-50 text-cyan-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span onClick={() => setSelectedMonth(m)} className="flex-1">
                      {m}
                    </span>
                    {selectedMonth === m && <Check className="w-3.5 h-3.5 text-cyan-600" />}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0">
            
            {/* TOP MONTH CAROUSEL SELECTOR */}
            <div className="relative flex items-center gap-2 mb-6 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm">
              <button
                onClick={() => scrollCarousel("left")}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 shrink-0 transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>

              <div
                ref={carouselRef}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none scroll-smooth px-1"
              >
                {MONTHS.map((month) => {
                  const isActive = selectedMonth === month;
                  return (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shrink-0 whitespace-nowrap ${
                        isActive
                          ? "bg-cyan-500 text-white shadow-sm shadow-cyan-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                      }`}
                    >
                      {month}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => scrollCarousel("right")}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 shrink-0 transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            {/* RESULTS COUNT & STATUS */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">
                Available Expeditions{" "}
                <span className="text-sm font-semibold text-slate-400 ml-1">
                  ({filteredTrips.length})
                </span>
              </h2>

              {hasActiveFilters && (
                <span className="text-xs text-slate-500 italic">
                  Filtered Results
                </span>
              )}
            </div>

            {/* TRIPS GRID */}
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTrips.map((trip) => {
                  const discountPercent = Math.round(
                    ((trip.originalPrice - trip.discountedPrice) / trip.originalPrice) * 100
                  );

                  return (
                    <div
                      key={trip.id}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                      {/* Image Banner Container */}
                      <div className="h-52 w-full relative overflow-hidden bg-slate-100">
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                        {/* Badges Overlay */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          {trip.badge ? (
                            <span className="bg-cyan-500/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-sm">
                              {trip.badge}
                            </span>
                          ) : (
                            <span />
                          )}
                          <span className="bg-slate-900/80 text-white backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-medium border border-white/20">
                            {trip.category}
                          </span>
                        </div>

                        {/* Month Indicator on Image */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{trip.month} Batch</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2 group-hover:text-cyan-600 transition-colors mb-3">
                            {trip.title}
                          </h3>

                          {/* Quick Info Tags */}
                          <div className="space-y-2 text-xs text-slate-500 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="font-semibold text-slate-700">{trip.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                              <span className="truncate">{trip.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-slate-400 shrink-0" />
                              <span>
                                Next: <strong className="text-slate-800">{trip.dates.join(", ")}</strong>{" "}
                                {trip.extraBatches && (
                                  <span className="text-cyan-600 font-bold ml-1">
                                    {trip.extraBatches}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Footer Bar */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs line-through text-slate-400 font-medium">
                                ₹{trip.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                {discountPercent}% OFF
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-black text-slate-900">
                                ₹{trip.discountedPrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400 font-semibold">/person</span>
                            </div>
                          </div>

                          <button className="bg-slate-900 group-hover:bg-cyan-500 text-white p-2.5 rounded-xl transition-colors duration-300 shadow-sm flex items-center justify-center">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center my-4">
                <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No trips matched your criteria
                </h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">
                  Try adjusting your filters, budget slider, or selected month to see available itineraries.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs px-6 py-2.5 rounded-xl transition shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-950/50 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full ml-auto p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-500" /> Filter Trips
                </h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Destination Category Filter */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Destination Category
                </h3>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
                  {["All", "India", "International"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition ${
                        selectedCategory === cat
                          ? "bg-white text-cyan-600 shadow-sm"
                          : "text-slate-600"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Range Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Max Duration
                  </h3>
                  <span className="text-xs font-bold text-cyan-600">
                    {durationRange} Nights
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  value={durationRange}
                  onChange={(e) => setDurationRange(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Budget Range Slider */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Max Budget
                  </h3>
                  <span className="text-xs font-bold text-cyan-600">
                    ₹{budgetRange.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="400000"
                  step="5000"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={handleClearFilters}
                className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 text-xs font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}