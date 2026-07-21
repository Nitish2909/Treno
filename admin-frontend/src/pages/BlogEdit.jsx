// import { Helmet } from 'react-helmet-async'
// import { useParams } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
// import { Loader2, AlertCircle } from 'lucide-react'
// import { useGetBlogByIdQuery, useUpdateBlogMutation, useGetCategoriesQuery } from '../store/api/adminApi'
// import BlogForm from '../components/blogs/BlogForm'
// import PageHeader from '../components/common/PageHeader'

// export default function BlogEdit() {
//   const { id }   = useParams()
//   const { data, isLoading, isError } = useGetBlogByIdQuery(id)
//   const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation()
//   const { data: catData } = useGetCategoriesQuery({})
//   const categories = catData?.categories || []

//   async function handleSubmit(formData) {
//     try {
//       const payload = {
//         id,
//         ...formData,
//         featuredImage: typeof formData.featuredImage === 'object' ? formData.featuredImage?.preview || '' : formData.featuredImage,
//         tags: formData.tags.filter(Boolean),
//       }
//       await updateBlog(payload).unwrap()
//       toast.success('Blog updated!')
//     } catch (err) {
//       toast.error(err?.data?.message || 'Failed to update blog')
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 size={32} className="animate-spin text-primary-500" />
//       </div>
//     )
//   }

//   if (isError || !data?.blog) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
//         <AlertCircle size={40} strokeWidth={1.5} />
//         <p>Blog not found</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <Helmet><title>Edit Blog — Treno Admin</title></Helmet>
//       <PageHeader
//         title="Edit Blog Post"
//         breadcrumbs={[
//           { label: 'Content' },
//           { label: 'Blogs', to: '/admin/blogs' },
//           { label: data.blog.title },
//         ]}
//       />
//       <BlogForm
//         initialValues={data.blog}
//         categories={categories}
//         onSubmit={handleSubmit}
//         loading={updating}
//       />
//     </>
//   )
// }




import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Loader2, AlertCircle } from 'lucide-react'
import { useGetBlogByIdQuery, useUpdateBlogMutation, useGetCategoriesQuery } from '../store/api/adminApi'
import BlogForm from '../components/blogs/BlogForm'
import PageHeader from '../components/common/PageHeader'

export default function BlogEdit() {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetBlogByIdQuery(id)
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation()
  
  // FIXED: Added refetchOnMountOrArgChange configuration so newly added categories update instantly from cache
  const { data: catData } = useGetCategoriesQuery({}, { refetchOnMountOrArgChange: true })
  const categories = catData?.data.categories || []
  console.log(data)
  console.log(categories)
  

  async function handleSubmit(formData) {
    try {
      const payload = {
        id,
        ...formData,
        featuredImage: typeof formData.featuredImage === 'object' ? formData.featuredImage?.preview || '' : formData.featuredImage,
        tags: formData.tags.filter(Boolean),
      }
      await updateBlog(payload).unwrap()
      toast.success('Blog updated!')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update blog')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertCircle size={40} strokeWidth={1.5} />
        <p>Blog not found</p>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Edit Blog — Treno Admin</title></Helmet>
      <PageHeader
        title="Edit Blog Post"
        breadcrumbs={[
          { label: 'Content' },
          { label: 'Blogs', to: '/admin/blogs' },
          { label: data.data.title },
        ]}
      />
      <BlogForm
        initialValues={data.data}
        categories={categories}
        onSubmit={handleSubmit}
        loading={updating}
      />
    </>
  )
}
