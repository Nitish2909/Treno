import { baseApi } from './baseApi.js'

export const destinationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDestination: builder.query({
      query: ({ page = 1, limit = 8 } = {}) => `/destinations/?page=${page}&limit=${limit}`,

      // 1. Ensures all pagination requests share the exact same cache entry
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },

      // 2. Appends incoming page data to existing cached data
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.page === 1) {
          // Reset cache if fetching the first page or refreshing
          return newItems
        }
        // Append new destination array into the existing cache
        currentCache.data.data.push(...newItems.data.data)
        // Keep pagination metadata updated
        currentCache.data.pagination = newItems.data.pagination
      },

      // 3. Triggers refetch whenever the page parameter changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page
      },

      providesTags: ['Destination'],
    }),

    getDestinationById: builder.query({
      query: (id) => `/destinations/destination/${id}`,
      providesTags: (result, error, id) => [{ type: 'Destination', id: id }],
    }),
  }),
})

export const {
  useGetAllDestinationQuery,
  useGetDestinationByIdQuery,
} = destinationApi