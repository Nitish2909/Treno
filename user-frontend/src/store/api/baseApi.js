import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken, logout } from '../slices/authSlice.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

// Re-authenticate wrapper with token refresh
const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    )

    if (refreshResult?.data?.accessToken) {
      api.dispatch(setToken(refreshResult.data.accessToken))
      // Retry original request
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'User',
    'Trip',
    'Booking',
    'Review',
    'Blog',
    'Wishlist',
    'Category',
    'Destination',
  ],
  endpoints: () => ({}),
})

export default baseApi
