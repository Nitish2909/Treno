import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    type: 'all', // 'all', 'domestic', 'international'
    categories: [], // array of category slugs
    priceRange: [0, 100000],
    duration: [], // array of duration ranges
    difficulty: [], // 'easy', 'moderate', 'hard'
    rating: 0, // minimum rating
    searchQuery: '',
    destinations: [],
  },
  sortBy: 'popularity', // 'popularity', 'price_low', 'price_high', 'duration_short', 'duration_long', 'rating'
  page: 1,
  limit: 12,
  viewMode: 'grid', // 'grid', 'list'
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.page = 1 // reset page when filters change
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload
      state.filters[key] = value
      state.page = 1
    },
    toggleCategory: (state, action) => {
      const category = action.payload
      const idx = state.filters.categories.indexOf(category)
      if (idx === -1) {
        state.filters.categories.push(category)
      } else {
        state.filters.categories.splice(idx, 1)
      }
      state.page = 1
    },
    toggleDifficulty: (state, action) => {
      const difficulty = action.payload
      const idx = state.filters.difficulty.indexOf(difficulty)
      if (idx === -1) {
        state.filters.difficulty.push(difficulty)
      } else {
        state.filters.difficulty.splice(idx, 1)
      }
      state.page = 1
    },
    toggleDuration: (state, action) => {
      const duration = action.payload
      const idx = state.filters.duration.indexOf(duration)
      if (idx === -1) {
        state.filters.duration.push(duration)
      } else {
        state.filters.duration.splice(idx, 1)
      }
      state.page = 1
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
      state.page = 1
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload
      state.page = 1
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
      state.page = 1
    },
    clearSingleFilter: (state, action) => {
      const key = action.payload
      if (key in initialState.filters) {
        state.filters[key] = initialState.filters[key]
        state.page = 1
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      state.page = 1
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
  },
})

export const {
  setFilters,
  setFilter,
  toggleCategory,
  toggleDifficulty,
  toggleDuration,
  setPriceRange,
  setSearchQuery,
  clearFilters,
  clearSingleFilter,
  setSortBy,
  setPage,
  setViewMode,
} = tripSlice.actions

export default tripSlice.reducer

// Selectors
export const selectFilters = (state) => state.trip.filters
export const selectSortBy = (state) => state.trip.sortBy
export const selectPage = (state) => state.trip.page
export const selectLimit = (state) => state.trip.limit
export const selectViewMode = (state) => state.trip.viewMode
export const selectActiveFilterCount = (state) => {
  const { filters } = state.trip
  let count = 0
  if (filters.type !== 'all') count++
  if (filters.categories.length) count++
  if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100000) count++
  if (filters.duration.length) count++
  if (filters.difficulty.length) count++
  if (filters.rating > 0) count++
  if (filters.searchQuery) count++
  return count
}
