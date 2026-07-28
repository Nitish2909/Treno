import { baseApi } from './baseApi.js'

export const destinationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    getAllDestination: builder.query({
      query: (bookingId) => `/destinations`,
      providesTags: (result, error, destinations) => [{ type: 'Booking', id: destinations }],
    }),

    getDestinationById: builder.query({
      query: (id) => `/destinations/destination/${id}`,
      providesTags: (result, error, destinationId) => [{ type: 'Booking', id: destinationId }],
    }),

    
  }),
})

export const {
  useGetAllDestinationQuery,
  useGetDestinationByIdQuery
} = destinationApi
