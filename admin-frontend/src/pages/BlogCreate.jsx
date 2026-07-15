import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCreateBlogMutation, useGetCategoriesQuery } from '../store/api/adminApi'
import BlogForm from '../components/blogs/BlogForm'
import PageHeader from '../components/common/PageHeader'

export default function BlogCreate() {
  const navigate = useNavigate()
  const [createBlog, { isLoading }] = useCreateBlogMutation()
  const { data: catData } = useGetCategoriesQuery({})
  const categories = catData?.categories || []

  async function handleSubmit(data) {
    try {
      const payload = {
        ...data,
        featuredImage: typeof data.featuredImage === 'object' ? data.featuredImage?.preview || '' : data.featuredImage,
        tags: data.tags.filter(Boolean),
      }
      const result = await createBlog(payload).unwrap()
      toast.success('Blog created!')
      navigate(`/admin/blogs/${result.blog?._id}/edit`, { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create blog')
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
      <BlogForm categories={categories} onSubmit={handleSubmit} loading={isLoading} />
    </>
  )
}
