// import { useState, useEffect } from 'react'
// import { toast } from 'react-hot-toast'
// import { Plus, Trash2, Loader2 } from 'lucide-react'
// import { generateSlug } from '../../utils/helpers'
// import RichTextEditor from '../common/RichTextEditor'
// import ImageUploader from '../common/ImageUploader'
// import clsx from 'clsx'

// const EMPTY = {
//   title: '', slug: '', excerpt: '',
//   category: '', tags: [''],
//   featuredImage: '',
//   content: '',
//   metaTitle: '', metaDescription: '', keywords: '',
//   status: 'draft',
// }

// export default function BlogForm({ initialValues, categories = [], onSubmit, loading = false }) {
//   const [form, setForm]   = useState({ ...EMPTY, ...initialValues })
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     if (initialValues) setForm({ ...EMPTY, ...initialValues })
//   }, [initialValues])

//   function set(key, val) {
//     setForm((f) => ({ ...f, [key]: val }))
//     if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n })
//   }

//   function handleTitleChange(e) {
//     const title = e.target.value
//     set('title', title)
//     if (!initialValues?.slug) set('slug', generateSlug(title))
//   }

//   function validate() {
//     const e = {}
//     if (!form.title.trim())   e.title = 'Title is required'
//     if (!form.slug.trim())    e.slug  = 'Slug is required'
//     if (!form.content.replace(/<[^>]*>/g, '').trim()) e.content = 'Content is required'
//     setErrors(e)
//     return Object.keys(e).length === 0
//   }

//   function handleSubmit(status) {
//     if (!validate()) { toast.error('Please fix errors'); return }
//     onSubmit({ ...form, status })
//   }

//   const tagUpdate = (i, val) => {
//     const t = [...form.tags]; t[i] = val; set('tags', t)
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Main content */}
//       <div className="lg:col-span-2 space-y-5">
//         <div className="card card-body space-y-4">
//           <div>
//             <label className="form-label">Blog Title *</label>
//             <input className={clsx('form-input', errors.title && 'error')} value={form.title} onChange={handleTitleChange} placeholder="e.g. Top 10 Treks in Himachal Pradesh" />
//             {errors.title && <p className="form-error">{errors.title}</p>}
//           </div>
//           <div>
//             <label className="form-label">URL Slug *</label>
//             <input className={clsx('form-input', errors.slug && 'error')} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="top-10-treks-himachal" />
//             {errors.slug && <p className="form-error">{errors.slug}</p>}
//           </div>
//           <div>
//             <label className="form-label">Excerpt</label>
//             <textarea className="form-textarea" rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} placeholder="Brief summary (shown in cards)…" maxLength={200} />
//             <p className="form-hint">{form.excerpt.length}/200</p>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="card card-body">
//           <label className="form-label mb-2">Content *</label>
//           <RichTextEditor value={form.content} onChange={(v) => set('content', v)} placeholder="Write your blog post here…" minHeight={400} />
//           {errors.content && <p className="form-error mt-2">{errors.content}</p>}
//         </div>

//         {/* SEO */}
//         <div className="card card-body space-y-4">
//           <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2">SEO Settings</h3>
//           <div>
//             <label className="form-label">Meta Title</label>
//             <input className="form-input" value={form.metaTitle} onChange={(e) => set('metaTitle', e.target.value)} placeholder="SEO title (60 chars max)" maxLength={60} />
//           </div>
//           <div>
//             <label className="form-label">Meta Description</label>
//             <textarea className="form-textarea" rows={2} value={form.metaDescription} onChange={(e) => set('metaDescription', e.target.value)} placeholder="SEO description (160 chars max)" maxLength={160} />
//           </div>
//           <div>
//             <label className="form-label">Focus Keywords</label>
//             <input className="form-input" value={form.keywords} onChange={(e) => set('keywords', e.target.value)} placeholder="e.g. himachal trekking, mountain trails" />
//           </div>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div className="space-y-5">
//         {/* Publish actions */}
//         <div className="card card-body space-y-3">
//           <h3 className="text-sm font-semibold text-gray-800">Publish</h3>
//           <div className="flex flex-col gap-2">
//             <button
//               type="button"
//               className="btn btn-secondary w-full"
//               onClick={() => handleSubmit('draft')}
//               disabled={loading}
//             >
//               {loading && form.status === 'draft' && <Loader2 size={14} className="animate-spin" />}
//               Save as Draft
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary w-full"
//               onClick={() => handleSubmit('published')}
//               disabled={loading}
//             >
//               {loading && form.status === 'published' && <Loader2 size={14} className="animate-spin" />}
//               Publish
//             </button>
//           </div>
//         </div>

//         {/* Category */}
//         <div className="card card-body space-y-3">
//           <h3 className="text-sm font-semibold text-gray-800">Category</h3>
//           <select className="form-select" value={form.category} onChange={(e) => set('category', e.target.value)}>
//             <option value="">Uncategorized</option>
//             <option value="">Adventure</option>
//             {categories.map((c) => (
//               <option key={c._id} value={c._id}>{c.name}</option>
//             ))}
//           </select>
//         </div>

//         {/* Tags */}
//         <div className="card card-body space-y-3">
//           <h3 className="text-sm font-semibold text-gray-800">Tags</h3>
//           <div className="space-y-2">
//             {form.tags.map((tag, i) => (
//               <div key={i} className="flex gap-2">
//                 <input className="form-input flex-1 text-sm" value={tag} onChange={(e) => tagUpdate(i, e.target.value)} placeholder="tag name" />
//                 <button type="button" onClick={() => set('tags', form.tags.filter((_, idx) => idx !== i))} className="btn-icon text-danger-500 hover:bg-danger-50"><Trash2 size={13} /></button>
//               </div>
//             ))}
//             <button type="button" onClick={() => set('tags', [...form.tags, ''])} className="btn btn-secondary btn-sm w-full"><Plus size={13} /> Add Tag</button>
//           </div>
//         </div>

//         {/* Featured Image */}
//         <div className="card card-body space-y-3">
//           <h3 className="text-sm font-semibold text-gray-800">Featured Image</h3>
//           {form.featuredImage && typeof form.featuredImage === 'string' ? (
//             <div className="relative">
//               <img src={form.featuredImage} alt="featured" className="w-full rounded-lg object-cover" style={{ maxHeight: 160 }} />
//               <button type="button" onClick={() => set('featuredImage', '')} className="absolute top-2 right-2 btn-icon bg-white/80 hover:bg-white text-danger-500"><Trash2 size={13} /></button>
//             </div>
//           ) : (
//             <ImageUploader
//               value={form.featuredImage ? [form.featuredImage] : []}
//               onChange={(files) => set('featuredImage', files[0] || '')}
//               multiple={false}
//               maxFiles={1}
//               label="Upload featured image"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Plus, Trash2, Loader2 } from 'lucide-react'
import { generateSlug } from '../../utils/helpers'
import RichTextEditor from '../common/RichTextEditor'
import ImageUploader from '../common/ImageUploader'
import clsx from 'clsx'

const EMPTY = {
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

export default function BlogForm({ initialValues, categories = [], onSubmit, loading = false }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialValues })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...EMPTY,
        ...initialValues,
        tags: initialValues.tags?.length ? initialValues.tags : ['']
      })
    }
  }, [initialValues])

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key]) {
      setErrors((e) => {
        const n = { ...e }
        delete n[key]
        return n
      })
    }
  }

  function handleTitleChange(e) {
    const title = e.target.value
    set('title', title)
    if (!initialValues?.slug) set('slug', generateSlug(title))
  }

  function validate() {
    const e = {}
    if (!form.title?.trim()) e.title = 'Title is required'
    if (!form.slug?.trim()) e.slug = 'Slug is required'
    if (!form.content?.replace(/<[^>]*>/g, '').trim()) e.content = 'Content is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(status) {
    if (!validate()) {
      toast.error('Please fix errors')
      return
    }

    // Clean up empty tags before submitting
    const cleanTags = form.tags
      .map((t) => t.trim())
      .filter((t) => t !== '')

    onSubmit({
      ...form,
      tags: cleanTags,
      status
    })
  }

  const tagUpdate = (i, val) => {
    const t = [...form.tags]
    t[i] = val
    set('tags', t)
  }

  const removeTag = (i) => {
    const filtered = form.tags.filter((_, idx) => idx !== i)
    // Keep at least one empty input so the user can type
    set('tags', filtered.length > 0 ? filtered : [''])
  }

  // Safely extract the categories array whether it is passed as raw data, 
  // nested inside .categories, or nested inside .data.categories
  const resolvedCategories = Array.isArray(categories)
    ? categories
    : categories?.categories || categories?.data?.categories || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-5">
        <div className="card card-body space-y-4">
          <div>
            <label className="form-label">Blog Title *</label>
            <input
              className={clsx('form-input', errors.title && 'error')}
              value={form.title}
              onChange={handleTitleChange}
              placeholder="e.g. Top 10 Treks in Himachal Pradesh"
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>
          <div>
            <label className="form-label">URL Slug *</label>
            <input
              className={clsx('form-input', errors.slug && 'error')}
              value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="top-10-treks-himachal"
            />
            {errors.slug && <p className="form-error">{errors.slug}</p>}
          </div>
          <div>
            <label className="form-label">Excerpt</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Brief summary (shown in cards)…"
              maxLength={200}
            />
            <p className="form-hint">{form.excerpt?.length || 0}/200</p>
          </div>
        </div>

        {/* Content */}
        <div className="card card-body">
          <label className="form-label mb-2">Content *</label>
          <RichTextEditor
            value={form.content}
            onChange={(v) => set('content', v)}
            placeholder="Write your blog post here…"
            minHeight={400}
          />
          {errors.content && <p className="form-error mt-2">{errors.content}</p>}
        </div>

        {/* SEO */}
        <div className="card card-body space-y-4">
          <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2">
            SEO Settings
          </h3>
          <div>
            <label className="form-label">Meta Title</label>
            <input
              className="form-input"
              value={form.metaTitle}
              onChange={(e) => set('metaTitle', e.target.value)}
              placeholder="SEO title (60 chars max)"
              maxLength={60}
            />
          </div>
          <div>
            <label className="form-label">Meta Description</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={form.metaDescription}
              onChange={(e) => set('metaDescription', e.target.value)}
              placeholder="SEO description (160 chars max)"
              maxLength={160}
            />
          </div>
          <div>
            <label className="form-label">Focus Keywords</label>
            <input
              className="form-input"
              value={form.keywords}
              onChange={(e) => set('keywords', e.target.value)}
              placeholder="e.g. himachal trekking, mountain trails"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Publish actions */}
        <div className="card card-body space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Publish</h3>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="btn btn-secondary w-full flex items-center justify-center gap-2"
              onClick={() => handleSubmit('draft')}
              disabled={loading}
            >
              {loading && form.status === 'draft' && <Loader2 size={14} className="animate-spin" />}
              Save as Draft
            </button>
            <button
              type="button"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              onClick={() => handleSubmit('published')}
              disabled={loading}
            >
              {loading && form.status === 'published' && <Loader2 size={14} className="animate-spin" />}
              Publish
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="card card-body space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Category</h3>
          <select
            className="form-select w-full"
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
          >
            <option value="">Select Category</option>
            {resolvedCategories.map((c) => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="card card-body space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Tags</h3>
          <div className="space-y-2">
            {form.tags.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="form-input flex-1 text-sm"
                  value={tag}
                  onChange={(e) => tagUpdate(i, e.target.value)}
                  placeholder="tag name"
                />
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="btn-icon text-danger-500 hover:bg-danger-50"
                  aria-label="Delete tag"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set('tags', [...form.tags, ''])}
              className="btn btn-secondary btn-sm w-full flex items-center justify-center gap-1"
            >
              <Plus size={13} /> Add Tag
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="card card-body space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Featured Image</h3>
          {form.featuredImage && typeof form.featuredImage === 'string' ? (
            <div className="relative">
              <img
                src={form.featuredImage}
                alt="featured preview"
                className="w-full rounded-lg object-cover"
                style={{ maxHeight: 160 }}
              />
              <button
                type="button"
                onClick={() => set('featuredImage', '')}
                className="absolute top-2 right-2 btn-icon bg-white/80 hover:bg-white text-danger-500 p-1 rounded-full shadow"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ) : (
            <ImageUploader
              value={form.featuredImage ? [form.featuredImage] : []}
              onChange={(files) => set('featuredImage', files[0] || '')}
              multiple={false}
              maxFiles={1}
              label="Upload featured image"
            />
          )}
        </div>
      </div>
    </div>
  )
}