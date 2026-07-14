import { createSlice } from '@reduxjs/toolkit'

const loadWishlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items))
  } catch {
    // ignore
  }
}

const initialState = {
  items: loadWishlistFromStorage(), // array of trip IDs
  tripData: {}, // cached trip data by ID
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { tripId, tripData } = action.payload
      if (!state.items.includes(tripId)) {
        state.items.push(tripId)
        if (tripData) {
          state.tripData[tripId] = tripData
        }
        saveWishlistToStorage(state.items)
      }
    },
    removeFromWishlist: (state, action) => {
      const tripId = action.payload
      state.items = state.items.filter(id => id !== tripId)
      delete state.tripData[tripId]
      saveWishlistToStorage(state.items)
    },
    toggleWishlist: (state, action) => {
      const { tripId, tripData } = action.payload
      const idx = state.items.indexOf(tripId)
      if (idx === -1) {
        state.items.push(tripId)
        if (tripData) {
          state.tripData[tripId] = tripData
        }
      } else {
        state.items.splice(idx, 1)
        delete state.tripData[tripId]
      }
      saveWishlistToStorage(state.items)
    },
    setWishlist: (state, action) => {
      // Set from server response
      state.items = action.payload.map(trip => trip._id || trip.id)
      action.payload.forEach(trip => {
        state.tripData[trip._id || trip.id] = trip
      })
      saveWishlistToStorage(state.items)
    },
    clearWishlist: (state) => {
      state.items = []
      state.tripData = {}
      saveWishlistToStorage([])
    },
  },
})

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions

export default wishlistSlice.reducer

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistTripData = (state) => state.wishlist.tripData
export const selectIsInWishlist = (tripId) => (state) =>
  state.wishlist.items.includes(tripId)
export const selectWishlistCount = (state) => state.wishlist.items.length
