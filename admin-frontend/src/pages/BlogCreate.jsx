// import { Helmet } from 'react-helmet-async'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
// import { useCreateBlogMutation, useGetCategoriesQuery } from '../store/api/adminApi'
// import BlogForm from '../components/blogs/BlogForm'
// import PageHeader from '../components/common/PageHeader'

// export default function BlogCreate() {
//   const navigate = useNavigate()
//   const [createBlog, { isLoading }] = useCreateBlogMutation()
//   const { data: catData } = useGetCategoriesQuery({})
//   const categories = catData?.categories || []

//   async function handleSubmit(data) {
//     try {
//       const payload = {
//         ...data,
//         featuredImage: typeof data.featuredImage === 'object' ? data.featuredImage?.preview || '' : data.featuredImage,
//         tags: data.tags.filter(Boolean),
//       }
//       const result = await createBlog(payload).unwrap()
//       toast.success('Blog created!')
//       navigate(`/admin/blogs/${result.blog?._id}/edit`, { replace: true })
//     } catch (err) {
//       toast.error(err?.data?.message || 'Failed to create blog')
//     }
//   }
//   return (
//     <>
//       <Helmet><title>Create Blog — Treno Admin</title></Helmet>
//       <PageHeader
//         title="Create Blog Post"
//         breadcrumbs={[
//           { label: 'Content' },
//           { label: 'Blogs', to: '/admin/blogs' },
//           { label: 'Create' },
//         ]}
//       />
//       <BlogForm categories={categories} onSubmit={handleSubmit} loading={isLoading} />
//     </>
//   )
// }

import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCreateBlogMutation, useGetCategoriesQuery } from '../store/api/adminApi'
import BlogForm from '../components/blogs/BlogForm'
import PageHeader from '../components/common/PageHeader'

// Explicit defaults for a clean creation state
const DEFAULT_BLOG_VALUES = {
  title: '',
  slug: '',
  excerpt: '',
  category: '',
  tags: [''],
  featuredImage: '',
  content: '',
  metaTitle: '',
  metaDescription: '',
  keywords: '',
  status: 'draft',
}

export default function BlogCreate() {
  const navigate = useNavigate()
  const [createBlog, { isLoading }] = useCreateBlogMutation()
  
  // FIXED: Added refetchOnMountOrArgChange to bypass cache when returning to this page
  const { data: catData, refetch } = useGetCategoriesQuery(
    {}, 
    { refetchOnMountOrArgChange: true }
  )
  
  const categories = catData?.categories || []

  // Alternative fallback: Force a manual refetch on mount to be absolutely sure
  useEffect(() => {
    refetch()
  }, [refetch])

  async function handleSubmit(data) {
    try {
      // Clean and sanitize the form inputs before sending to the database
      const payload = {
        ...data,
        // Safely extract preview URL if featuredImage is a local file object, otherwise fallback to standard string URL
        featuredImage: typeof data.featuredImage === 'object' 
          ? data.featuredImage?.preview || '' 
          : data.featuredImage || '',
        // Clean up empty tag strings
        tags: (data.tags || []).map(t => t.trim()).filter(Boolean),
      }

      const result = await createBlog(payload).unwrap()
      toast.success('Blog created successfully!')
      
      // Redirect safely to edit page if database returns the record ID, else fallback to listing page
      if (result?.blog?._id) {
        navigate(`/admin/blogs/${result.blog._id}/edit`, { replace: true })
      } else if (result?._id) {
        navigate(`/admin/blogs/${result._id}/edit`, { replace: true })
      } else {
        navigate('/admin/blogs', { replace: true })
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || 'Failed to create blog')
    }
  }

  return (
    <>
      <Helmet><title>Create Blog — Treno Admin</title></Helmet>
      <PageHeader
        title="Create Blog Post"
        breadcrumbs={[
          { label: 'Content' },
          { label: 'Blogs', to: '/admin/blogs' },
          { label: 'Create' },
        ]}
      />
      <BlogForm 
        initialValues={DEFAULT_BLOG_VALUES} 
        categories={categories} 
        onSubmit={handleSubmit} 
        loading={isLoading} 
      />
    </>
  )
}