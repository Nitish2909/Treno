import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const TOKEN_KEY = 'treno_admin_token'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().adminAuth?.token || localStorage.getItem(TOKEN_KEY)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)

      }
      return headers
    },
  }),
  tagTypes: [
    'Dashboard', 'Trip', 'Booking', 'User',
    'Review', 'Blog', 'Category', 'AdminProfile',
  ],
  endpoints: (builder) => ({
    /* ── Auth ───────────────────────────────────*/
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({ url: '/admin/auth/logout', method: 'POST' }),
    }),
    getAdminProfile: builder.query({
      query: () => '/admin/auth/profile',
      providesTags: ['AdminProfile'],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: '/admin/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['AdminProfile'],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: '/admin/auth/change-password',
        method: 'PUT',
        body: data,
      }),
    }),

    /* ── Dashboard ─────────────────────────────── */
    getDashboardStats: builder.query({
      query: () => '/admin/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
    getRevenueStats: builder.query({
      query: (period = 'monthly') => `/admin/dashboard/revenue?period=${period}`,
      providesTags: ['Dashboard'],
    }),
    getBookingAnalytics: builder.query({
      query: () => '/admin/dashboard/booking-analytics',
      providesTags: ['Dashboard'],
    }),
    getTopTrips: builder.query({
      query: () => '/admin/dashboard/top-trips',
      providesTags: ['Dashboard'],
    }),
    getRecentActivity: builder.query({
      query: () => '/admin/dashboard/recent-activity',
      providesTags: ['Dashboard'],
    }),

    /* ── Trips ─────────────────────────────────── */
    getAllTrips: builder.query({
      query: (params = {}) => ({
        url: '/admin/trips',
        params,
      }),
      providesTags: (result) =>
        result?.trips
          ? [
              ...result.trips.map(({ _id }) => ({ type: 'Trip', id: _id })),
              { type: 'Trip', id: 'LIST' },
            ]
          : [{ type: 'Trip', id: 'LIST' }],
    }),
    getTripById: builder.query({
      query: (id) => `/admin/trips/${id}`,
      providesTags: (_, __, id) => [{ type: 'Trip', id }],
    }),
    createTrip: builder.mutation({
      query: (data) => ({ url: '/admin/trips', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Trip', id: 'LIST' }],
    }),
    updateTrip: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/trips/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Trip', id }, { type: 'Trip', id: 'LIST' }],
    }),
    deleteTrip: builder.mutation({
      query: (id) => ({ url: `/admin/trips/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Trip', id: 'LIST' }],
    }),
    updateTripStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/trips/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Trip', id }, { type: 'Trip', id: 'LIST' }],
    }),
    uploadTripImages: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/trips/${id}/images`,
        method: 'POST',
        body: formData,
        // Let browser set multipart boundary
        headers: { 'Content-Type': undefined },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Trip', id }],
    }),

    /* ── Bookings ──────────────────────────────── */
    getAllBookings: builder.query({
      query: (params = {}) => ({ url: '/admin/bookings', params }),
      providesTags: (result) =>
        result?.bookings
          ? [
              ...result.bookings.map(({ _id }) => ({ type: 'Booking', id: _id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),
    getBookingById: builder.query({
      query: (id) => `/admin/bookings/${id}`,
      providesTags: (_, __, id) => [{ type: 'Booking', id }],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/bookings/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Booking', id }, { type: 'Booking', id: 'LIST' }],
    }),
    exportBookings: builder.mutation({
      query: (params = {}) => ({
        url: '/admin/bookings/export',
        method: 'POST',
        body: params,
        responseHandler: (response) => response.blob(),
      }),
    }),

    /* ── Users ─────────────────────────────────── */
    getAllUsers: builder.query({
      query: (params = {}) => ({ url: '/admin/users', params }),
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ _id }) => ({ type: 'User', id: _id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (_, __, id) => [{ type: 'User', id }],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),
    deactivateUser: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/admin/users/${id}/deactivate`,
        method: 'PATCH',
        body: { reason },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'User', id }, { type: 'User', id: 'LIST' }],
    }),

    /* ── Reviews ───────────────────────────────── */
    getAllReviews: builder.query({
      query: (params = {}) => ({ url: '/admin/reviews', params }),
      providesTags: (result) =>
        result?.reviews
          ? [
              ...result.reviews.map(({ _id }) => ({ type: 'Review', id: _id })),
              { type: 'Review', id: 'LIST' },
            ]
          : [{ type: 'Review', id: 'LIST' }],
    }),
    approveReview: builder.mutation({
      query: (id) => ({ url: `/admin/reviews/${id}/approve`, method: 'PATCH' }),
      invalidatesTags: (_, __, id) => [{ type: 'Review', id }, { type: 'Review', id: 'LIST' }],
    }),
    rejectReview: builder.mutation({
      query: (id) => ({ url: `/admin/reviews/${id}/reject`, method: 'PATCH' }),
      invalidatesTags: (_, __, id) => [{ type: 'Review', id }, { type: 'Review', id: 'LIST' }],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({ url: `/admin/reviews/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Review', id: 'LIST' }],
    }),
    addReviewResponse: builder.mutation({
      query: ({ id, response }) => ({
        url: `/admin/reviews/${id}/response`,
        method: 'POST',
        body: { response },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Review', id }, { type: 'Review', id: 'LIST' }],
    }),

    /* ── Blogs ─────────────────────────────────── */
    getAllBlogs: builder.query({
      query: (params = {}) => ({ url: '/admin/blogs', params }),
      providesTags: (result) =>
        result?.blogs
          ? [
              ...result.blogs.map(({ _id }) => ({ type: 'Blog', id: _id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),
    getBlogById: builder.query({
      query: (id) => `/admin/blogs/${id}`,
      providesTags: (_, __, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (data) => ({ url: '/admin/blogs', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),

    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/blogs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/admin/blogs/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
    publishBlog: builder.mutation({
      query: ({ id, published }) => ({
        url: `/admin/blogs/${id}/publish`,
        method: 'PATCH',
        body: { published },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Blog', id }, { type: 'Blog', id: 'LIST' }],
    }),

    /* ── Categories ────────────────────────────── */
    getCategories: builder.query({
      query: (params = {}) => ({ url: '/admin/categories', params }),
      providesTags: (result) =>
        result?.categories
          ? [
              ...result.categories.map(({ _id }) => ({ type: 'Category', id: _id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation({
      query: (data) => ({ url: '/admin/categories', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Category', id }, { type: 'Category', id: 'LIST' }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({ url: `/admin/categories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
})

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeAdminPasswordMutation,

  useGetDashboardStatsQuery,
  useGetRevenueStatsQuery,
  useGetBookingAnalyticsQuery,
  useGetTopTripsQuery,
  useGetRecentActivityQuery,

  useGetAllTripsQuery,
  useGetTripByIdQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useUpdateTripStatusMutation,
  useUploadTripImagesMutation,

  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingStatusMutation,
  useExportBookingsMutation,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeactivateUserMutation,

  useGetAllReviewsQuery,
  useApproveReviewMutation,
  useRejectReviewMutation,
  useDeleteReviewMutation,
  useAddReviewResponseMutation,

  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  usePublishBlogMutation,

  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = adminApi
