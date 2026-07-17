// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { Helmet } from 'react-helmet-async'
// import { toast } from 'react-hot-toast'
// import { Plus, Pencil, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react'
// import { useGetAllBlogsQuery, useDeleteBlogMutation, usePublishBlogMutation } from '../store/api/adminApi'
// import DataTable from '../components/common/DataTable'
// import StatusBadge from '../components/common/StatusBadge'
// import ConfirmDialog from '../components/common/ConfirmDialog'
// import PageHeader from '../components/common/PageHeader'
// import { formatDate, truncateText } from '../utils/helpers'
// import clsx from 'clsx'

// export default function Blogs() {
//   const navigate = useNavigate()
//   const [page, setPage]     = useState(1)
//   const [pageSize, setPageSize] = useState(10)
//   const [search, setSearch] = useState('')
//   const [status, setStatus] = useState('')
//   const [deleteId, setDeleteId] = useState(null)

//   const { data, isLoading }   = useGetAllBlogsQuery({ page, limit: pageSize, search, status })
//   const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation()
//   const [publishBlog] = usePublishBlogMutation()

//   const blogs = data?.blogs || []
//   const total = data?.total  || 0

//   async function handleDelete() {
//     try {
//       await deleteBlog(deleteId).unwrap()
//       toast.success('Blog deleted')
//       setDeleteId(null)
//     } catch (e) { toast.error(e?.data?.message || 'Delete failed') }
//   }

//   async function handleTogglePublish(blog) {
//     try {
//       await publishBlog({ id: blog._id, published: blog.status !== 'published' }).unwrap()
//       toast.success(blog.status === 'published' ? 'Blog unpublished' : 'Blog published')
//     } catch (e) { toast.error(e?.data?.message || 'Failed') }
//   }

//   const columns = [
//     {
//       key: 'featuredImage', label: 'Image', width: 70,
//       render: (val) => (
//         <img
//           src={val || 'https://placehold.co/56x40/e2e8f0/94a3b8?text=Blog'}
//           alt=""
//           className="w-14 h-10 object-cover rounded-lg border border-gray-200"
//         />
//       ),
//     },
//     {
//       key: 'title', label: 'Title', sortable: true,
//       render: (val, row) => (
//         <div>
//           <p className="font-medium text-gray-900">{truncateText(val, 45)}</p>
//           <p className="text-xs text-gray-400">{row.slug}</p>
//         </div>
//       ),
//     },
//     {
//       key: 'author', label: 'Author',
//       render: (v) => v?.name || '—',
//     },
//     {
//       key: 'status', label: 'Status',
//       render: (v) => <StatusBadge status={v} />,
//     },
//     {
//       key: 'views', label: 'Views', sortable: true,
//       render: (v) => (v || 0).toLocaleString(),
//     },
//     {
//       key: 'createdAt', label: 'Date', sortable: true,
//       render: (v) => formatDate(v),
//     },
//     {
//       key: 'actions', label: '',
//       render: (_, row) => (
//         <div className="flex items-center gap-1">
//           <button
//             className={`btn-icon ${row.status === 'published' ? 'text-success-600 hover:bg-success-50' : 'text-gray-400 hover:bg-gray-100'}`}
//             title="Toggle publish"
//             onClick={() => handleTogglePublish(row)}
//           >
//             {row.status === 'published' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
//           </button>
//           <button
//             className="btn-icon text-primary-500 hover:bg-primary-50"
//             onClick={() => navigate(`/admin/blogs/${row._id}/edit`)}
//           >
//             <Pencil size={14} />
//           </button>
//           <button
//             className="btn-icon text-danger-400 hover:bg-danger-50"
//             onClick={() => setDeleteId(row._id)}
//           >
//             <Trash2 size={14} />
//           </button>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <>
//       <Helmet><title>Blogs — Treno Admin</title></Helmet>
//       <PageHeader
//         title="Blogs"
//         breadcrumbs={[{ label: 'Content' }, { label: 'Blogs' }]}
//         actions={
//           <Link to="/admin/blogs/create" className="btn btn-primary">
//             <Plus size={15} /> New Blog
//           </Link>
//         }
//       />

//       {/* Filters */}
//       <div className="flex gap-3 mb-5">
//         <select className="form-select w-auto text-sm" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}>
//           <option value="">All Status</option>
//           <option value="draft">Draft</option>
//           <option value="published">Published</option>
//         </select>
//       </div>

//       <DataTable
//         columns={columns}
//         data={blogs}
//         loading={isLoading}
//         total={total}
//         page={page}
//         pageSize={pageSize}
//         onPageChange={setPage}
//         onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
//         searchable
//         searchPlaceholder="Search blogs…"
//         onSearch={(v) => { setSearch(v); setPage(1) }}
//         searchValue={search}
//         emptyText="No blogs found"
//       />

//       <ConfirmDialog
//         open={!!deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDelete}
//         title="Delete Blog?"
//         message="This blog post will be permanently deleted."
//         confirmLabel="Delete"
//         loading={deleting}
//       />
//     </>
//   )
// }



import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { useGetAllBlogsQuery, useDeleteBlogMutation, usePublishBlogMutation } from '../store/api/adminApi'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import ConfirmDialog from '../components/common/ConfirmDialog'
import PageHeader from '../components/common/PageHeader'
import { formatDate, truncateText } from '../utils/helpers'

export default function Blogs() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [deleteId, setDeleteId] = useState(null)

  const { data, isLoading } = useGetAllBlogsQuery(
    { page, limit: pageSize, search, status },
    { refetchOnMountOrArgChange: true }
  )
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation()
  const [publishBlog] = usePublishBlogMutation()

  const blogs = data?.blogs || []
  const total = data?.total || 0

  async function handleDelete() {
    try {
      await deleteBlog(deleteId).unwrap()
      toast.success('Blog deleted')
      setDeleteId(null)
    } catch (e) { 
      toast.error(e?.data?.message || 'Delete failed') 
    }
  }

  async function handleTogglePublish(blog) {
    try {
      await publishBlog({ id: blog._id, published: blog.status !== 'published' }).unwrap()
      toast.success(blog.status === 'published' ? 'Blog unpublished' : 'Blog published')
    } catch (e) { 
      toast.error(e?.data?.message || 'Failed') 
    }
  }

  const columns = [
    {
      key: 'featuredImage', label: 'Image', width: 70,
      render: (val) => (
        <img
          src={val || 'https://placehold.co/56x40/e2e8f0/94a3b8?text=Blog'}
          alt=""
          className="w-14 h-10 object-cover rounded-lg border border-gray-200"
        />
      ),
    },
    {
      key: 'title', label: 'Title', sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-gray-900">{truncateText(val, 45)}</p>
          <p className="text-xs text-gray-400">{row.slug}</p>
        </div>
      ),
    },
    {
      key: 'author', label: 'Author',
      render: (v) => v?.name || '—',
    },
    {
      key: 'status', label: 'Status',
      render: (v) => <StatusBadge status={v} />,
    },
    {
      key: 'views', label: 'Views', sortable: true,
      render: (v) => (v || 0).toLocaleString(),
    },
    {
      key: 'createdAt', label: 'Date', sortable: true,
      render: (v) => formatDate(v),
    },
    {
      key: 'actions', label: '',
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            className={`btn-icon ${row.status === 'published' ? 'text-success-600 hover:bg-success-50' : 'text-gray-400 hover:bg-gray-100'}`}
            title="Toggle publish"
            onClick={() => handleTogglePublish(row)}
          >
            {row.status === 'published' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
          </button>
          <button
            className="btn-icon text-primary-500 hover:bg-primary-50"
            onClick={() => navigate(`/admin/blogs/${row._id}/edit`)}
          >
            <Pencil size={14} />
          </button>
          <button
            className="btn-icon text-danger-400 hover:bg-danger-50"
            onClick={() => setDeleteId(row._id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <Helmet><title>Blogs — Treno Admin</title></Helmet>
      <PageHeader
        title="Blogs"
        breadcrumbs={[{ label: 'Content' }, { label: 'Blogs' }]}
        actions={
          <Link to="/admin/blogs/create" className="btn btn-primary">
            <Plus size={15} /> New Blog
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <select 
          className="form-select w-auto text-sm" 
          value={status} 
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={blogs}
        loading={isLoading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
        searchable
        searchPlaceholder="Search blogs…"
        onSearch={(v) => { setSearch(v); setPage(1) }}
        searchValue={search}
        emptyText="No blogs found"
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Blog?"
        message="This blog post will be permanently deleted."
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  )
}