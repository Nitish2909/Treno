import { baseApi } from './baseApi.js'
import { setCredentials, logout } from '../slices/authSlice.js'
import { setWishlist, clearWishlist } from '../slices/wishlistSlice.js'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: data.data?.user, accessToken: data.data.accessToken }))
          if (data.wishlist) {
            dispatch(setWishlist(data.wishlist))
          }
        } catch {
          // error handled in component
        }
      },
      invalidatesTags: ['User'],
    }),

    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({ user: data.data?.user, accessToken: data.data?.accessToken }))
        } catch {
          // error handled in component
        }
      },
    }),
    verifyResetToken: builder.query({
      query: (token) => `/auth/reset-password/validate/${token}`,
    }),
    

    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch {
          // ignore errors, still logout locally
        } finally {
          dispatch(logout())
          dispatch(clearWishlist())
        }
      },
      invalidatesTags: ['User', 'Booking', 'Wishlist'],
    }),

    getProfile: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/update-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: '/auth/upload-avatar',
        method: 'POST',
        body: formData,
        headers: {}, // Let browser set Content-Type with boundary for FormData
      }),
      invalidatesTags: ['User'],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: data,
      }),
    }),

    

    getWishlist: builder.query({
      query: () => '/auth/wishlist',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setWishlist(data.wishlist || []))
        } catch {
          // ignore
        }
      },
      providesTags: ['Wishlist'],
    }),

    toggleWishlistApi: builder.mutation({
      query: (tripId) => ({
        url: `/auth/wishlist/${tripId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Wishlist'],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: '/messages',
        method: 'POST',
        body: data,
      }),
    }),
  }),


})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyResetTokenQuery,
  useLogoutUserMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetWishlistQuery,
  useSendMessageMutation,
  useToggleWishlistApiMutation,
} = authApi
