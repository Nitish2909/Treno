import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './api/baseApi.js'
import authReducer from './slices/authSlice.js'
import tripReducer from './slices/tripSlice.js'
import wishlistReducer from './slices/wishlistSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    wishlist: wishlistReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setCredentials', baseApi.reducerPath],
        ignoredPaths: [baseApi.reducerPath],
      },
    }).concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
})

// Enable refetchOnFocus and refetchOnReconnect
setupListeners(store.dispatch)

export default store
