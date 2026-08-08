import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter as FunnelIcon,
  LayoutGrid as Squares2X2Icon,
  List as ListBulletIcon,
  Search as MagnifyingGlassIcon,
  X as XMarkIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Sparkles,
  AlertCircle,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

import { useGetAllTripsQuery } from "../store/api/tripApi.js";
import {
  selectFilters,
  selectSortBy,
  selectPage,
  setPage,
  setSortBy,
  clearFilters,
  clearSingleFilter,
} from "../store/slices/tripSlice.js";
import TripCard from "../components/trip/TripCard.jsx";
import TripFilters from "../components/trip/TripFilters.jsx";
import SEOHead from "../components/common/SEOHead.jsx";
import { CardSkeletonGrid } from "../components/common/Loader.jsx";

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "duration_asc", label: "Duration: Short to Long" },
  { value: "duration_desc", label: "Duration: Long to Short" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

const PAGE_SIZE = 12;

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Packages() {
  const dispatch = useDispatch();
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();

  const filters = useSelector(selectFilters);
  const sortBy = useSelector(selectSortBy);
  const page = useSelector(selectPage);

  const initialSearch =
    searchParams.get("search") || searchParams.get("q") || filters.search || "";
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 400);

  // Build combined query params dynamically
  const queryParams = {
    ...filters,
    search: debouncedSearch || undefined,
    sort: sortBy,
    page,
    limit: PAGE_SIZE,
    category:
      categoryParam ||
      filters.category ||
      searchParams.get("category") ||
      undefined,
    destination:
      filters.destination || searchParams.get("destination") || undefined,
  };

  const { data, isLoading, isFetching, isError, error } =
    useGetAllTripsQuery(queryParams);

  const trips = data?.data?.trips || [];

  const totalCount =
    data?.data?.totalCount || data?.data?.total || trips.length || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Reset to page 1 safely when filter states change
  useEffect(() => {
    dispatch(setPage(1));
  }, [filters, debouncedSearch, sortBy, dispatch]);

  // Clear all filters along with search input state
  const handleClearAllFilters = useCallback(() => {
    setSearchInput("");
    dispatch(clearFilters());
  }, [dispatch]);

  // Build active filter chips from redux filters & active search
  const activeFilterChips = Object.entries(filters)
    .filter(
      ([key, val]) =>
        val !== undefined && val !== null && val !== "" && key !== "search",
    )
    .map(([key, val]) => ({ key, val: String(val) }));

  if (debouncedSearch) {
    activeFilterChips.unshift({ key: "search", val: debouncedSearch });
  }

  const handleRemoveFilter = useCallback(
    (key) => {
      if (key === "search") {
        setSearchInput("");
      } else {
        dispatch(clearSingleFilter(key));
      }
    },
    [dispatch],
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift("...");
    if (page + delta < totalPages - 1) range.push("...");
    if (totalPages > 1) range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return totalPages === 1 ? [1] : range;
  };

  return (
    <>
      <SEOHead
        title="Packages | Treno | Best and Affordable Packages"
        description="Browse hundreds of curated trips across India and the world. Filter by destination, duration, budget, and category to find your perfect adventure."
      />

      <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
        {/* Hero Section */}
        <section className="relative min-h-[380px] sm:min-h-[440px] bg-slate-950 text-white flex items-center justify-center px-4 sm:px-8 lg:px-12 overflow-hidden py-16 sm:py-20">
          <img
            src="https://images.pexels.com/photos/8479653/pexels-photo-8479653.jpeg"
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative max-w-5xl mx-auto w-full z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-inner"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>The Package Collection</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] font-playfair bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-300"
            >
              Curated escapes,
              <br className="hidden sm:inline" /> hand-picked one trip at a
              time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed text-balance"
            >
              Hundred-plus journeys across India and the world — each one tested
              by trip designers who've walked the route.
            </motion.p>
          </div>
        </section>

        {/* Page Header / Breadcrumb Bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-1 font-medium">
                  <Link
                    to="/"
                    className="hover:text-amber-600 transition-colors"
                  >
                    Home
                  </Link>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-800 font-semibold">Packages</span>
                  {categoryParam && (
                    <>
                      <span className="text-slate-300">/</span>
                      <span className="text-amber-600 font-semibold capitalize">
                        {categoryParam}
                      </span>
                    </>
                  )}
                </nav>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-playfair tracking-tight">
                  {categoryParam
                    ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Trips`
                    : "All Packages"}
                </h1>
              </div>

              <div className="text-xs sm:text-sm text-slate-500 font-medium bg-slate-100/80 px-3 py-1.5 rounded-full self-start sm:self-auto border border-slate-200/60">
                {isLoading ? (
                  <span className="animate-pulse">Loading trips…</span>
                ) : (
                  <>
                    Showing{" "}
                    <span className="font-bold text-slate-900">
                      {totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
                      {Math.min(page * PAGE_SIZE, totalCount)}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-900">
                      {totalCount}
                    </span>{" "}
                    Packages
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* ── Sidebar Filters (Desktop) ── */}
            <aside className="hidden lg:block flex-shrink-0 w-[280px]">
              <div className="sticky top-24 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                    <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                    <span>Filters</span>
                  </div>
                  {activeFilterChips.length > 0 && (
                    <button
                      onClick={handleClearAllFilters}
                      className="text-xs font-medium text-rose-600 hover:text-rose-700 transition"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <TripFilters />
              </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center gap-3 mb-6">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px]">
                  <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search destinations, packages…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    className="text-sm font-medium border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50/50 text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer transition-all appearance-none pr-9"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium border border-slate-200 rounded-xl px-4 py-2.5 bg-slate-50/50 text-slate-700 hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  <FunnelIcon className="w-4 h-4 text-amber-500" />
                  <span>Filters</span>
                  {activeFilterChips.length > 0 && (
                    <span className="bg-amber-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {activeFilterChips.length}
                    </span>
                  )}
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-100/80 p-1 gap-1 ml-auto">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-amber-600 shadow-sm font-semibold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Grid view"
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === "list"
                        ? "bg-white text-amber-600 shadow-sm font-semibold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="List view"
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Filter Chips */}
              {activeFilterChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6 bg-white border border-slate-200/80 p-3 rounded-2xl shadow-sm">
                  <span className="text-xs text-slate-500 font-semibold tracking-wide uppercase mr-1">
                    Active filters:
                  </span>
                  {activeFilterChips.map(({ key, val }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium rounded-lg px-3 py-1.5 shadow-xs"
                    >
                      <span className="capitalize text-amber-700/80">
                        {key.replace(/_/g, " ")}:
                      </span>
                      <span className="font-semibold text-amber-900">
                        {val}
                      </span>
                      <button
                        onClick={() => handleRemoveFilter(key)}
                        className="ml-0.5 hover:bg-amber-100 p-0.5 rounded text-amber-800 transition"
                      >
                        <XMarkIcon className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs text-rose-600 font-semibold hover:text-rose-700 underline transition ml-auto px-2 py-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Cards List & State Displays */}
              {isLoading || isFetching ? (
                <CardSkeletonGrid count={PAGE_SIZE} />
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center">
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Something went wrong
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md mb-6">
                    {error?.data?.message ||
                      "Unable to load trips. Please try again."}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
                  >
                    Retry
                  </button>
                </div>
              ) : trips.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-center"
                >
                  <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-5 ring-8 ring-amber-50/50">
                    <MapPin className="w-10 h-10 stroke-[1.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-playfair">
                    No trips found
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-sm leading-relaxed">
                    We couldn't find any trips matching your current filters.
                    Try broadening your search or clearing active filters.
                  </p>
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    layout
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-4"
                    }
                  >
                    <AnimatePresence mode="popLayout">
                      {trips.map((trip, idx) => (
                        <motion.div
                          key={trip._id || trip.id || idx}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            delay: idx * 0.03,
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                        >
                          <TripCard trip={trip} viewMode={viewMode} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination Section */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-12 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm w-fit mx-auto">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Prev
                      </button>

                      <div className="flex items-center gap-1 px-1">
                        {getPaginationRange().map((p, i) =>
                          p === "..." ? (
                            <span
                              key={`ellipsis-${i}`}
                              className="px-2 py-1 text-xs font-bold text-slate-400"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={p}
                              onClick={() => handlePageChange(p)}
                              className={`w-8 h-8 text-xs font-bold rounded-xl transition-all ${
                                p === page
                                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105"
                                  : "bg-transparent text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              {p}
                            </button>
                          ),
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                      >
                        Next
                        <ChevronRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Drawer ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                  <span>Filters</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto flex-1">
                <TripFilters onApply={() => setMobileFilterOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
