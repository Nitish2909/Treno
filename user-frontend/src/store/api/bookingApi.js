import { baseApi } from './baseApi.js'

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),

    initiatePayment: builder.mutation({
      query: (data) => ({
        url: '/bookings/initiate-payment',
        method: 'POST',
        body: data,
      }),
    }),

    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payments/verify-payment',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),

    getUserBookings: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.status) queryParams.set('status', params.status)
        if (params.page) queryParams.set('page', params.page)
        if (params.limit) queryParams.set('limit', params.limit || 10)
        const qs = queryParams.toString()
        return `/bookings/my-bookings${qs ? `?${qs}` : ''}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.data?.bookings.map(({ _id }) => ({ type: 'Booking', id: _id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),

    getBookingById: builder.query({
      query: (bookingId) => `/bookings/${bookingId}`,
      providesTags: (result, error, bookingId) => [{ type: 'Booking', id: bookingId }],
    }),

    cancelBooking: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: 'PUT',
        body: { reason },
      }),
      invalidatesTags: (result, error, { bookingId }) => [
        { type: 'Booking', id: bookingId },
        { type: 'Booking', id: 'LIST' },
      ],
    }),

    downloadInvoice: builder.query({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/invoice`,
        responseHandler: (response) => response.blob(),
      }),
    }),

    getBookingStats: builder.query({
      query: () => '/bookings/user-booking-stats',
      providesTags: [{ type: 'Booking', id: 'STATS' }],
    }),
  }),
})

export const {
  useCreateBookingMutation,
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
  useGetUserBookingsQuery,
  useGetBookingByIdQuery,
  useCancelBookingMutation,
  useDownloadInvoiceQuery,
  useGetBookingStatsQuery,
} = bookingApi
