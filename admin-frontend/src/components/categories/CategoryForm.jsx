import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import Modal from '../common/Modal'
import { generateSlug } from '../../utils/helpers'
import clsx from 'clsx'

const EMPTY = { name: '', slug: '', description: '', image: '' }

export default function CategoryForm({ open, onClose, initialValues, onSubmit, loading = false }) {
  const [form, setForm]     = useState({ ...EMPTY })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(initialValues ? { ...EMPTY, ...initialValues } : { ...EMPTY })
      setErrors({})
    }
  }, [open, initialValues])

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n })
  }

  function handleNameChange(e) {
    const name = e.target.value
    set('name', name)
    if (!initialValues?.slug) set('slug', generateSlug(name))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.slug.trim()) e.slug = 'Slug is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialValues ? 'Edit Category' : 'Create Category'}
      size="sm"
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading && <Loader2 size={14} className="animate-spin" />}
            {initialValues ? 'Update' : 'Create'}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="form-label">Category Name *</label>
          <input
            className={clsx('form-input', errors.name && 'error')}
            value={form.name}
            onChange={handleNameChange}
            placeholder="e.g. Adventure Trips"
            autoFocus
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>
        <div>
          <label className="form-label">URL Slug *</label>
          <input
            className={clsx('form-input', errors.slug && 'error')}
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="adventure-trips"
          />
          {errors.slug && <p className="form-error">{errors.slug}</p>}
        </div>
        <div>
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            rows={2}
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Brief category description…"
          />
        </div>
        <div>
          <label className="form-label">Image URL</label>
          <input
            className="form-input"
            value={form.image}
            onChange={(e) => set('image', e.target.value)}
            placeholder="https://…/category-image.jpg"
          />
          {form.image && (
            <img src={form.image} alt="preview" className="mt-2 h-16 w-full object-cover rounded-lg border border-gray-200" />
          )}
        </div>
      </div>
    </Modal>
  )
}
