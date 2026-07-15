import { configureStore } from '@reduxjs/toolkit'
import adminAuthReducer from './slices/adminAuthSlice'
import { adminApi } from './api/adminApi'

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware),
})
