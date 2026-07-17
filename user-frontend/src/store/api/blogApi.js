import { baseApi } from './baseApi.js'

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams()
        if (params.category) queryParams.set('category', params.category)
        if (params.search) queryParams.set('search', params.search)
        if (params.page) queryParams.set('page', params.page)
        if (params.limit) queryParams.set('limit', params.limit || 9)
        if (params.featured) queryParams.set('featured', params.featured)
        const qs = queryParams.toString()
        return `/blogs${qs ? `?${qs}` : ''}`
      },
      providesTags: (result) =>
        result?.blog
          ? [
              ...result.blogs.map(({ _id }) => ({ type: 'Blog', id: _id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),

    getBlogBySlug: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),

    getFeaturedBlogs: builder.query({
      query: (limit = 3) => `/blogs/featured?limit=${limit}`,
      providesTags: [{ type: 'Blog', id: 'FEATURED' }],
    }),

    getRelatedBlogs: builder.query({
      query: ({ blogId, limit = 3 }) => `/blogs/${blogId}/related?limit=${limit}`,
      providesTags: (result, error, { blogId }) => [{ type: 'Blog', id: `RELATED_${blogId}` }],
    }),

    getBlogCategories: builder.query({
      query: () => '/blogs/categories',
      providesTags: [{ type: 'Blog', id: 'CATEGORIES' }],
    }),
  }),
})

export const {
  useGetAllBlogsQuery,
  useGetBlogBySlugQuery,
  useGetFeaturedBlogsQuery,
  useGetRelatedBlogsQuery,
  useGetBlogCategoriesQuery,
} = blogApi
