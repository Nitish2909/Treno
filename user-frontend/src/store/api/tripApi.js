import { baseApi } from './baseApi.js'

export const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrips: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.type && params.type !== 'all') queryParams.set('type', params.type)
        if (params.categories?.length) queryParams.set('categories', params.categories.join(','))
        if (params.minPrice !== undefined) queryParams.set('minPrice', params.minPrice)
        if (params.maxPrice !== undefined) queryParams.set('maxPrice', params.maxPrice)
        if (params.duration?.length) queryParams.set('duration', params.duration.join(','))
        if (params.difficulty?.length) queryParams.set('difficulty', params.difficulty.join(','))
        if (params.rating) queryParams.set('minRating', params.rating)
        if (params.searchQuery) queryParams.set('search', params.searchQuery)
        if (params.sortBy) queryParams.set('sortBy', params.sortBy)
        if (params.page) queryParams.set('page', params.page)
        if (params.limit) queryParams.set('limit', params.limit)
        if (params.destination) queryParams.set('destination', params.destination)
        if (params.categorySlug) queryParams.set('category', params.categorySlug)
        const qs = queryParams.toString()
        return `/trips${qs ? `?${qs}` : ''}`
      },
      providesTags: (result) =>

        result.trips
          ?
          [
            ...result.trips?.map(({ _id }) => ({ type: 'Trip', id: _id })),
            { type: 'Trip', id: 'LIST' },
          ]
          : [{ type: 'Trip', id: 'LIST' }],
    }),

    getTripBySlug: builder.query({
      query: (slug) => `/trips/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Trip', id: slug }],
    }),

    getFeaturedTrips: builder.query({
      query: (limit = 6) => `/trips/featured?limit=${limit}`,
      providesTags: [{ type: 'Trip', id: 'FEATURED' }],
    }),

    getPopularTrips: builder.query({
      query: (limit = 8) => `/trips/popular?limit=${limit}`,
      providesTags: [{ type: 'Trip', id: 'POPULAR' }],
    }),

    getTripsByCategory: builder.query({
      query: ({ categorySlug, limit = 6 }) =>
        `/trips/category/${categorySlug}?limit=${limit}`,
      providesTags: (result, error, { categorySlug }) => [
        { type: 'Trip', id: `CATEGORY_${categorySlug}` },
      ],
    }),

    searchTrips: builder.query({
      query: (query) => `/trips/search?q=${encodeURIComponent(query)}`,
      providesTags: [{ type: 'Trip', id: 'SEARCH' }],
    }),

    getTripsByDestination: builder.query({
      query: ({ state, limit = 6 }) => `/trips/destination/${state}?limit=${limit}`,
      providesTags: (result, error, { state }) => [
        { type: 'Trip', id: `DESTINATION_${state}` },
      ],
    }),

    getTrendingTrips: builder.query({
      query: (limit = 10) => `/trips/trending?limit=${limit}`,
      providesTags: [{ type: 'Trip', id: 'TRENDING' }],
    }),

    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Category'],
    }),

    getDestinations: builder.query({
      query: () => '/destinations',
      providesTags: ['Destination'],
    }),

    getSimilarTrips: builder.query({
      query: ({ tripId, limit = 4 }) => `/trips/${tripId}/similar?limit=${limit}`,
      providesTags: (result, error, { tripId }) => [
        { type: 'Trip', id: `SIMILAR_${tripId}` },
      ],
    }),
  }),
})

export const {
  useGetAllTripsQuery,
  useGetTripBySlugQuery,
  useGetFeaturedTripsQuery,
  useGetPopularTripsQuery,
  useGetTripsByCategoryQuery,
  useSearchTripsQuery,
  useGetTripsByDestinationQuery,
  useGetTrendingTripsQuery,
  useGetCategoriesQuery,
  useGetDestinationsQuery,
  useGetSimilarTripsQuery,
} = tripApi
