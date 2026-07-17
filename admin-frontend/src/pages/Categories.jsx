import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react'
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../store/api/adminApi'
import CategoryForm from '../components/categories/CategoryForm'
import ConfirmDialog from '../components/common/ConfirmDialog'
import PageHeader from '../components/common/PageHeader'

export default function Categories() {
  const [formOpen, setFormOpen]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [deleteId, setDeleteId]   = useState(null)

  const { data, isLoading }         = useGetCategoriesQuery({})
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation()

  const categories = data?.data?.categories || []

  function openCreate() { setEditing(null); setFormOpen(true) }
  function openEdit(cat) { setEditing(cat); setFormOpen(true) }

  async function handleFormSubmit(formData) {
    try {
      if (editing) {
        await updateCategory({ id: editing._id, ...formData }).unwrap()
        toast.success('Category updated')
      } else {
        await createCategory(formData).unwrap()
        toast.success('Category created')
      }
      setFormOpen(false)
    } catch (e) {
      toast.error(e?.data?.message || 'Failed')
    }
  }

  async function handleDelete() {
    try {
      await deleteCategory(deleteId).unwrap()
      toast.success('Category deleted')
      setDeleteId(null)
    } catch (e) { toast.error(e?.data?.message || 'Delete failed') }
  }

  return (
    <>
      <Helmet><title>Categories — Treno Admin</title></Helmet>
      <PageHeader
        title="Categories"
        breadcrumbs={[{ label: 'Content' }, { label: 'Categories' }]}
        actions={
          <button className="btn btn-primary" onClick={openCreate}>
            <Plus size={15} /> Add Category
          </button>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton h-36" />
              <div className="p-4 space-y-2">
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
          <ImageIcon size={40} strokeWidth={1.5} />
          <p className="text-sm">No categories yet</p>
          <button className="btn btn-primary btn-sm" onClick={openCreate}><Plus size={13} /> Create first category</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div key={cat._id} className="card overflow-hidden group hover:shadow-card-hover transition-shadow duration-200">
              {/* Image */}
              <div className="relative h-36 bg-gray-100">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-300" />
                  </div>
                )}
                {/* Drag handle */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="drag-handle bg-white/80 rounded-lg p-1.5 shadow-sm">
                    <GripVertical size={14} className="text-gray-500" />
                  </div>
                </div>
                {/* Actions */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="bg-white/90 rounded-lg p-1.5 shadow-sm text-primary-600 hover:bg-primary-50 transition-colors"
                    onClick={() => openEdit(cat)}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="bg-white/90 rounded-lg p-1.5 shadow-sm text-danger-600 hover:bg-danger-50 transition-colors"
                    onClick={() => setDeleteId(cat._id)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="font-semibold text-gray-900">{cat.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-400">{cat.slug}</p>
                  <span className="text-xs bg-blue-50 text-blue-600 rounded-full px-2 py-0.5 font-medium">
                    {cat.tripsCount || 0} trips
                  </span>
                </div>
                {cat.description && (
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{cat.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialValues={editing}
        onSubmit={handleFormSubmit}
        loading={editing ? updating : creating}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="Trips in this category will become uncategorized."
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  )
}
