import { baseApi } from './baseApi.js'

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ tripId, page = 1, limit = 5, sortBy = 'newest' }) =>
        `/reviews?tripId=${tripId}&page=${page}&limit=${limit}&sortBy=${sortBy}`,
      providesTags: (result, error, { tripId }) => [{ type: 'Review', id: tripId }],
    }),

    getTripRatingSummary: builder.query({
      query: (tripId) => `/reviews/summary/${tripId}`,
      providesTags: (result, error, tripId) => [{ type: 'Review', id: `SUMMARY_${tripId}` }],
    }),

    createReview: builder.mutation({
      query: (reviewData) => ({
        url: '/reviews',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { tripId }) => [{ type: 'Review', id: tripId }],
    }),

    updateReview: builder.mutation({
      query: ({ reviewId, ...data }) => ({
        url: `/reviews/${reviewId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { tripId }) => [{ type: 'Review', id: tripId }],
    }),

    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    markHelpful: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}/helpful`,
        method: 'POST',
      }),
      invalidatesTags: ['Review'],
    }),

    reportReview: builder.mutation({
      query: ({ reviewId, reason }) => ({
        url: `/reviews/${reviewId}/report`,
        method: 'POST',
        body: { reason },
      }),
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useGetTripRatingSummaryQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useMarkHelpfulMutation,
  useReportReviewMutation,
} = reviewApi
