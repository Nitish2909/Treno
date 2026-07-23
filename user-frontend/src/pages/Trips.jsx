// import { useState, useEffect, useCallback } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useParams, useSearchParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   Filter as FunnelIcon,
//   LayoutGrid as Squares2X2Icon,
//   List as ListBulletIcon,
//   Search as MagnifyingGlassIcon,
//   X as XMarkIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
// } from 'lucide-react'

// import { useGetAllTripsQuery } from '../store/api/tripApi.js'
// import {
//   selectFilters,
//   selectSortBy,
//   selectPage,
//   setPage,
//   setSortBy,
//   clearFilters,
//   clearSingleFilter,
// } from '../store/slices/tripSlice.js'
// import TripCard from '../components/trip/TripCard.jsx'
// import TripFilters from '../components/trip/TripFilters.jsx'
// import SEOHead from '../components/common/SEOHead.jsx'
// import { CardSkeletonGrid } from '../components/common/Loader.jsx'

// const SORT_OPTIONS = [
//   { value: 'popular', label: 'Most Popular' },
//   { value: 'price_asc', label: 'Price: Low to High' },
//   { value: 'price_desc', label: 'Price: High to Low' },
//   { value: 'duration_asc', label: 'Duration: Short to Long' },
//   { value: 'duration_desc', label: 'Duration: Long to Short' },
//   { value: 'rating', label: 'Highest Rated' },
//   { value: 'newest', label: 'Newest First' },
// ]

// const PAGE_SIZE = 12

// function useDebounce(value, delay) {
//   const [debounced, setDebounced] = useState(value)
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay)
//     return () => clearTimeout(t)
//   }, [value, delay])
//   return debounced
// }

// export default function Trips() {
//   const dispatch = useDispatch()
//   const { category: categoryParam } = useParams()
//   const [searchParams] = useSearchParams()

//   const filters = useSelector(selectFilters)
//   const sortBy = useSelector(selectSortBy)
//   const page = useSelector(selectPage)

  
//   const [searchInput, setSearchInput] = useState('')
//   const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

//   const debouncedSearch = useDebounce(searchInput, 400)

//   // Build combined query params dynamically
//   const queryParams = {
//     ...filters,
//     search: debouncedSearch || undefined,
//     sort:sortBy,
//     page,
//     limit: PAGE_SIZE,
//     category: categoryParam || filters.category || searchParams.get('category') || undefined,
//     destination: filters.destination || searchParams.get('destination') || undefined,
//   }

//   const { data, isLoading, isFetching, isError, error } = useGetAllTripsQuery(queryParams)

//   const trips = data?.data?.trips || []
  
//   // Access your backend's global counter instead of parsing array capacity length
//   const totalCount = data?.data?.totalCount || data?.data?.total || trips.length || 0
//   const totalPages = Math.ceil(totalCount / PAGE_SIZE)

//   // Reset to page 1 safely when filter states change
//   useEffect(() => {
//     dispatch(setPage(1))
//   }, [filters, debouncedSearch, sortBy, dispatch])

//   // Build active filter chips from redux filters
//   const activeFilterChips = Object.entries(filters)
//     .filter(([, val]) => val !== undefined && val !== null && val !== '')
//     .map(([key, val]) => ({ key, val: String(val) }))

//   const handleRemoveFilter = useCallback(
//     (key) => {
//       dispatch(clearSingleFilter(key))
//     },
//     [dispatch]
//   )

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return
//     dispatch(setPage(newPage))
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   const getPaginationRange = () => {
//     const delta = 2
//     const range = []
//     for (
//       let i = Math.max(2, page - delta);
//       i <= Math.min(totalPages - 1, page + delta);
//       i++
//     ) {
//       range.push(i)
//     }
//     if (page - delta > 2) range.unshift('...')
//     if (page + delta < totalPages - 1) range.push('...')
//     if (totalPages > 1) range.unshift(1)
//     if (totalPages > 1) range.push(totalPages)
//     return totalPages === 1 ? [1] : range
//   }

//   return (
//     <>
//       <SEOHead
//         title="All Trips | Treno"
//         description="Browse hundreds of curated trips across India and the world. Filter by destination, duration, budget, and category to find your perfect adventure."
//       />

//       <div className="min-h-screen bg-gray-50">
//         {/* Page Header */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             {/* Breadcrumb */}
//             <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
//               <Link to="/" className="hover:text-amber-500 transition-colors">
//                 Home
//               </Link>
//               <span>/</span>
//               <span className="text-gray-800 font-medium">Trips</span>
//               {categoryParam && (
//                 <>
//                   <span>/</span>
//                   <span className="text-gray-800 font-medium capitalize">{categoryParam}</span>
//                 </                >
//               )}
//             </nav>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 font-playfair">
//                   {categoryParam
//                     ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Trips`
//                     : 'All Trips'}
//                 </h1>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {isLoading ? (
//                     'Loading trips…'
//                   ) : (
//                     <>
//                       Showing{' '}
//                       <span className="font-semibold text-gray-700">
//                         {totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
//                         {Math.min(page * PAGE_SIZE, totalCount)}
//                       </span>{' '}
//                       of{' '}
//                       <span className="font-semibold text-gray-700">{totalCount}</span> trips
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex gap-8">
//             {/* ── Sidebar Filters (Desktop) ── */}
//             <aside className="hidden lg:block flex-shrink-0 w-[280px]">
//               <div className="sticky top-24">
//                 <TripFilters />
//               </div>
//             </aside>

//             {/* ── Main Content ── */}
//             <main className="flex-1 min-w-0">
//               {/* Toolbar */}
//               <div className="flex flex-wrap items-center gap-3 mb-5">
//                 {/* Search */}
//                 <div className="relative flex-1 min-w-[200px]">
//                   <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//                   <input
//                     type="text"
//                     placeholder="Search trips…"
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
//                   />
//                   {searchInput && (
//                     <button
//                       onClick={() => setSearchInput('')}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <XMarkIcon className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 {/* Sort */}
//                 <select
//                   value={sortBy}
//                   onChange={(e) => dispatch(setSortBy(e.target.value))}
//                   className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
//                 >
//                   {SORT_OPTIONS.map((opt) => (
//                     <option key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Mobile Filter Button */}
//                 <button
//                   onClick={() => setMobileFilterOpen(true)}
//                   className="lg:hidden flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white hover:bg-gray-50 transition"
//                 >
//                   <FunnelIcon className="w-4 h-4" />
//                   Filters
//                   {activeFilterChips.length > 0 && (
//                     <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                       {activeFilterChips.length}
//                     </span>
//                   )}
//                 </button>

//                 {/* View Mode Toggle */}
//                 <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white ml-auto">
//                   <button
//                     onClick={() => setViewMode('grid')}
//                     className={`p-2.5 ${
//                       viewMode === 'grid'
//                         ? 'bg-amber-500 text-white'
//                         : 'text-gray-500 hover:bg-gray-50'
//                     } transition`}
//                     title="Grid view"
//                   >
//                     <Squares2X2Icon className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode('list')}
//                     className={`p-2.5 ${
//                       viewMode === 'list'
//                         ? 'bg-amber-500 text-white'
//                         : 'text-gray-500 hover:bg-gray-50'
//                     } transition`}
//                     title="List view"
//                   >
//                     <ListBulletIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Active Filter Chips */}
//               {activeFilterChips.length > 0 && (
//                 <div className="flex flex-wrap items-center gap-2 mb-5">
//                   <span className="text-xs text-gray-500 font-medium">Active filters:</span>
//                   {activeFilterChips.map(({ key, val }) => (
//                     <span
//                       key={key}
//                       className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-full px-3 py-1"
//                     >
//                       <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
//                       <span className="font-semibold">{val}</span>
//                       <button
//                         onClick={() => handleRemoveFilter(key)}
//                         className="ml-1 hover:text-amber-600 transition"
//                       >
//                         <XMarkIcon className="w-3 h-3" />
//                       </button>
//                     </span>
//                   ))}
//                   <button
//                     onClick={() => dispatch(clearFilters())}
//                     className="text-xs text-red-500 hover:text-red-700 underline transition ml-1"
//                   >
//                     Clear all
//                   </button>
//                 </div>
//               )}

//               {/* Cards List & Container Views */}
//               {(isLoading || isFetching) ? (
//                 <CardSkeletonGrid count={PAGE_SIZE} />
//               ) : isError ? (
//                 <div className="flex flex-col items-center justify-center py-20 text-center">
//                   <div className="text-5xl mb-4">⚠️</div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     Something went wrong
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-4">
//                     {error?.data?.message || 'Unable to load trips. Please try again.'}
//                   </p>
//                   <button
//                     onClick={() => window.location.reload()}
//                     className="bg-amber-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition"
//                   >
//                     Retry
//                   </button>
//                 </div>
//               ) : trips.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex flex-col items-center justify-center py-24 text-center"
//                 >
//                   <div className="text-7xl mb-6">🗺️</div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
//                     No trips found
//                   </h3>
//                   <p className="text-gray-500 text-sm mb-6 max-w-xs">
//                     We couldn't find any trips matching your current filters. Try broadening your search or clearing the filters.
//                   </p>
//                   <button
//                     onClick={() => dispatch(clearFilters())}
//                     className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition"
//                   >
//                     Clear Filters
//                   </button>
//                 </motion.div>
//               ) : (
//                 <>
//                   <motion.div
//                     layout
//                     className={
//                       viewMode === 'grid'
//                         ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
//                         : 'flex flex-col gap-4'
//                     }
//                   >
//                     <AnimatePresence mode="popLayout">
//                       {trips.map((trip, idx) => (
//                         <motion.div
//                           key={trip._id || trip.id || idx}
//                           layout
//                           initial={{ opacity: 0, y: 16 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, scale: 0.95 }}
//                           transition={{ delay: idx * 0.04, duration: 0.3 }}
//                         >
//                           <TripCard trip={trip} viewMode={viewMode} />
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                   </motion.div>

//                   {/* Pagination Section */}
//                   {totalPages > 1 && (
//                     <div className="flex items-center justify-center gap-1 mt-10">
//                       <button
//                         onClick={() => handlePageChange(page - 1)}
//                         disabled={page === 1}
//                         className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//                       >
//                         <ChevronLeftIcon className="w-4 h-4" />
//                         Prev
//                       </button>

//                       {getPaginationRange().map((p, i) =>
//                         p === '...' ? (
//                           <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400">
//                             …
//                           </span>
//                         ) : (
//                           <button
//                             key={p}
//                             onClick={() => handlePageChange(p)}
//                             className={`w-9 h-9 text-sm rounded-lg border transition ${
//                               p === page
//                                 ? 'bg-amber-500 border-amber-500 text-white font-semibold'
//                                 : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
//                             }`}
//                           >
//                             {p}
//                           </button>
//                         )
//                       )}

//                       <button
//                         onClick={() => handlePageChange(page + 1)}
//                         disabled={page === totalPages}
//                         className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//                       >
//                         Next
//                         <ChevronRightIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </main>
//           </div>
//         </div>
//       </div>

//       {/* ── Mobile Filter Drawer ── */}
//       <AnimatePresence>
//         {mobileFilterOpen && (
//           <>
//             <motion.div
//               key="backdrop"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileFilterOpen(false)}
//               className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//             />
//             <motion.div
//               key="drawer"
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ type: 'spring', damping: 28, stiffness: 280 }}
//               className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
//             >
//               <div className="flex items-center justify-between p-4 border-b border-gray-100">
//                 <h2 className="font-semibold text-gray-800">Filters</h2>
//                 <button
//                   onClick={() => setMobileFilterOpen(false)}
//                   className="p-1 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <XMarkIcon className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
//               <div className="p-4">
//                 <TripFilters onApply={() => setMobileFilterOpen(false)} />
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }






import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Filter as FunnelIcon,
  LayoutGrid as Squares2X2Icon,
  List as ListBulletIcon,
  Search as MagnifyingGlassIcon,
  X as XMarkIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react'

import { useGetAllTripsQuery } from '../store/api/tripApi.js'
import {
  selectFilters,
  selectSortBy,
  selectPage,
  setPage,
  setSortBy,
  clearFilters,
  clearSingleFilter,
} from '../store/slices/tripSlice.js'
import TripCard from '../components/trip/TripCard.jsx'
import TripFilters from '../components/trip/TripFilters.jsx'
import SEOHead from '../components/common/SEOHead.jsx'
import { CardSkeletonGrid } from '../components/common/Loader.jsx'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'duration_asc', label: 'Duration: Short to Long' },
  { value: 'duration_desc', label: 'Duration: Long to Short' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
]

const PAGE_SIZE = 12

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function Trips() {
  const dispatch = useDispatch()
  const { category: categoryParam } = useParams()
  const [searchParams] = useSearchParams()

  const filters = useSelector(selectFilters)
  const sortBy = useSelector(selectSortBy)
  const page = useSelector(selectPage)

  const initialSearch = searchParams.get('search') || searchParams.get('q') || filters.search || ''
  const [searchInput, setSearchInput] = useState(initialSearch)
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const debouncedSearch = useDebounce(searchInput, 400)

  // Build combined query params dynamically
  const queryParams = {
    ...filters,
    search: debouncedSearch || undefined,
    sort: sortBy,
    page,
    limit: PAGE_SIZE,
    category: categoryParam || filters.category || searchParams.get('category') || undefined,
    destination: filters.destination || searchParams.get('destination') || undefined,
  }

  const { data, isLoading, isFetching, isError, error } = useGetAllTripsQuery(queryParams)

  const trips = data?.data?.trips || []
  
  // Access your backend's global counter instead of parsing array capacity length
  const totalCount = data?.data?.totalCount || data?.data?.total || trips.length || 0
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Reset to page 1 safely when filter states change
  useEffect(() => {
    dispatch(setPage(1))
  }, [filters, debouncedSearch, sortBy, dispatch])

  // Clear all filters along with search input state
  const handleClearAllFilters = useCallback(() => {
    setSearchInput('')
    dispatch(clearFilters())
  }, [dispatch])

  // Build active filter chips from redux filters & active search
  const activeFilterChips = Object.entries(filters)
    .filter(([key, val]) => val !== undefined && val !== null && val !== '' && key !== 'search')
    .map(([key, val]) => ({ key, val: String(val) }))

  if (debouncedSearch) {
    activeFilterChips.unshift({ key: 'search', val: debouncedSearch })
  }

  const handleRemoveFilter = useCallback(
    (key) => {
      if (key === 'search') {
        setSearchInput('')
      } else {
        dispatch(clearSingleFilter(key))
      }
    },
    [dispatch]
  )

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    dispatch(setPage(newPage))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPaginationRange = () => {
    const delta = 2
    const range = []
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i)
    }
    if (page - delta > 2) range.unshift('...')
    if (page + delta < totalPages - 1) range.push('...')
    if (totalPages > 1) range.unshift(1)
    if (totalPages > 1) range.push(totalPages)
    return totalPages === 1 ? [1] : range
  }

  return (
    <>
      <SEOHead
        title="All Trips | Treno"
        description="Browse hundreds of curated trips across India and the world. Filter by destination, duration, budget, and category to find your perfect adventure."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
              <Link to="/" className="hover:text-amber-500 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-800 font-medium">Trips</span>
              {categoryParam && (
                <>
                  <span>/</span>
                  <span className="text-gray-800 font-medium capitalize">{categoryParam}</span>
                </>
              )}
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 font-playfair">
                  {categoryParam
                    ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Trips`
                    : 'All Trips'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {isLoading ? (
                    'Loading trips…'
                  ) : (
                    <>
                      Showing{' '}
                      <span className="font-semibold text-gray-700">
                        {totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
                        {Math.min(page * PAGE_SIZE, totalCount)}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-gray-700">{totalCount}</span> trips
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* ── Sidebar Filters (Desktop) ── */}
            <aside className="hidden lg:block flex-shrink-0 w-[280px]">
              <div className="sticky top-24">
                <TripFilters />
              </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search trips…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-3 py-2.5 bg-white hover:bg-gray-50 transition"
                >
                  <FunnelIcon className="w-4 h-4" />
                  Filters
                  {activeFilterChips.length > 0 && (
                    <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeFilterChips.length}
                    </span>
                  )}
                </button>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white ml-auto">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 ${
                      viewMode === 'grid'
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-500 hover:bg-gray-50'
                    } transition`}
                    title="Grid view"
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 ${
                      viewMode === 'list'
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-500 hover:bg-gray-50'
                    } transition`}
                    title="List view"
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Filter Chips */}
              {activeFilterChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-xs text-gray-500 font-medium">Active filters:</span>
                  {activeFilterChips.map(({ key, val }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-full px-3 py-1"
                    >
                      <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="font-semibold">{val}</span>
                      <button
                        onClick={() => handleRemoveFilter(key)}
                        className="ml-1 hover:text-amber-600 transition"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs text-red-500 hover:text-red-700 underline transition ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Cards List & Container Views */}
              {(isLoading || isFetching) ? (
                <CardSkeletonGrid count={PAGE_SIZE} />
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {error?.data?.message || 'Unable to load trips. Please try again.'}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-amber-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition"
                  >
                    Retry
                  </button>
                </div>
              ) : trips.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="text-7xl mb-6">🗺️</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
                    No trips found
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">
                    We couldn't find any trips matching your current filters. Try broadening your search or clearing the filters.
                  </p>
                  <button
                    onClick={handleClearAllFilters}
                    className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    layout
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                        : 'flex flex-col gap-4'
                    }
                  >
                    <AnimatePresence mode="popLayout">
                      {trips.map((trip, idx) => (
                        <motion.div
                          key={trip._id || trip.id || idx}
                          layout
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.04, duration: 0.3 }}
                        >
                          <TripCard trip={trip} viewMode={viewMode} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination Section */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1 mt-10">
                      <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Prev
                      </button>

                      {getPaginationRange().map((p, i) =>
                        p === '...' ? (
                          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-gray-400">
                            …
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`w-9 h-9 text-sm rounded-lg border transition ${
                              p === page
                                ? 'bg-amber-500 border-amber-500 text-white font-semibold'
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Filters</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <TripFilters onApply={() => setMobileFilterOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}