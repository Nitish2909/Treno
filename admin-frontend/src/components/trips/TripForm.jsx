import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {
  Plus, Trash2, ChevronDown, ChevronUp, Info, Image, DollarSign,
  MapPin, Layers, Calendar, List, HelpCircle, Tag, Loader2,
} from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import clsx from 'clsx'
import ImageUploader from '../common/ImageUploader'
import RichTextEditor from '../common/RichTextEditor'
import { generateSlug } from '../../utils/helpers'
import { useGetCategoriesQuery } from '../../store/api/adminApi'

const SECTIONS = [
  { id: 'basic',      label: 'Basic Info',   icon: Info     },
  { id: 'media',      label: 'Media',        icon: Image    },
  { id: 'pricing',    label: 'Pricing',      icon: DollarSign },
  { id: 'location',   label: 'Location',     icon: MapPin   },
  { id: 'details',    label: 'Details',      icon: Layers   },
  { id: 'itinerary',  label: 'Itinerary',    icon: List     },
  { id: 'dates',      label: 'Start Dates',  icon: Calendar },
  { id: 'faqs',       label: 'FAQs',         icon: HelpCircle },
  { id: 'seo',        label: 'SEO & Policy', icon: Tag      },
]

const TRIP_TYPES = ['Adventure', 'Cultural', 'Beach', 'Mountain', 'Wildlife', 'City Tour', 'Pilgrimage', 'Other']
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme']
const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP']

function SectionTab({ sections, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1 mb-6 bg-gray-100 p-1.5 rounded-xl">
      {sections.map((s) => {
        const Icon = s.icon
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150',
              active === s.id
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            <Icon size={13} />
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

function ListEditor({ label, values = [], onChange, placeholder = 'Add item…' }) {
  function add() { onChange([...values, '']) }
  function update(i, val) { const a = [...values]; a[i] = val; onChange(a) }
  function remove(i) { onChange(values.filter((_, idx) => idx !== i)) }

  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2">
          <input
            className="form-input flex-1"
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
          />
          <button type="button" onClick={() => remove(i)} className="btn-icon text-danger-500 hover:bg-danger-50">
            <Trash2 size={15} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn btn-secondary btn-sm">
        <Plus size={13} /> Add {label}
      </button>
    </div>
  )
}

function ItineraryEditor({ days = [], onChange }) {
  function addDay() {
    onChange([...days, { day: days.length + 1, title: '', description: '', activities: [], accommodation: '', meals: { breakfast: false, lunch: false, dinner: false } }])
  }
  function removeDay(i) { onChange(days.filter((_, idx) => idx !== i)) }
  function updateDay(i, key, val) {
    const d = [...days]
    d[i] = { ...d[i], [key]: val }
    onChange(d)
  }
  function toggleMeal(i, meal) {
    const d = [...days]
    d[i] = { ...d[i], meals: { ...d[i].meals, [meal]: !d[i].meals?.[meal] } }
    onChange(d)
  }

  return (
    <div className="space-y-4">
      {days.map((day, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Day {day.day || i + 1}</span>
            <button type="button" onClick={() => removeDay(i)} className="btn-icon text-danger-500 hover:bg-danger-50"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Day Title *</label>
              <input className="form-input" value={day.title} onChange={(e) => updateDay(i, 'title', e.target.value)} placeholder="e.g. Arrival in Manali" />
            </div>
            <div>
              <label className="form-label">Accommodation</label>
              <input className="form-input" value={day.accommodation} onChange={(e) => updateDay(i, 'accommodation', e.target.value)} placeholder="Hotel / Campsite name" />
            </div>
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows={2} value={day.description} onChange={(e) => updateDay(i, 'description', e.target.value)} placeholder="What happens on this day…" />
          </div>
          <div>
            <label className="form-label">Meals Included</label>
            <div className="flex gap-4">
              {['breakfast', 'lunch', 'dinner'].map((m) => (
                <label key={m} className="flex items-center gap-1.5 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" checked={!!day.meals?.[m]} onChange={() => toggleMeal(i, m)} />
                  <span className="capitalize">{m}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={addDay} className="btn btn-secondary btn-sm">
        <Plus size={13} /> Add Day
      </button>
    </div>
  )
}

function StartDatesEditor({ dates = [], onChange }) {
  function add() { onChange([...dates, { date: null, slots: 15 }]) }
  function remove(i) { onChange(dates.filter((_, idx) => idx !== i)) }
  function update(i, key, val) {
    const d = [...dates]
    d[i] = { ...d[i], [key]: val }
    onChange(d)
  }

  return (
    <div className="space-y-3">
      {dates.map((d, i) => (
        <div key={i} className="flex items-end gap-3">
          <div className="flex-1">
            <label className="form-label">Departure Date</label>
            <DatePicker
              selected={d.date ? new Date(d.date) : null}
              onChange={(date) => update(i, 'date', date?.toISOString())}
              dateFormat="dd MMM yyyy"
              placeholderText="Select date"
              className="form-input w-full"
              minDate={new Date()}
            />
          </div>
          <div className="w-32">
            <label className="form-label">Total Slots</label>
            <input type="number" min={1} max={500} className="form-input" value={d.slots} onChange={(e) => update(i, 'slots', Number(e.target.value))} />
          </div>
          <button type="button" onClick={() => remove(i)} className="btn-icon text-danger-500 hover:bg-danger-50 mb-0.5"><Trash2 size={15} /></button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn btn-secondary btn-sm"><Plus size={13} /> Add Date</button>
    </div>
  )
}

const EMPTY_FORM = {
  title: '', slug: '', category: '', type: '', description: '', shortDescription: '',
  images: [], thumbnail: '',
  originalPrice: '', discountedPrice: '', currency: 'INR',
  from: '', destinations: [''], state: '', country: 'India',
  difficulty: 'Moderate', minGroupSize: 2, maxGroupSize: 20,
  highlights: [''],
  durationDays: 1, durationNights: 0,
  inclusions: [''], exclusions: [''], thingsToCarry: [''],
  itinerary: [],
  startDates: [],
  faqs: [{ question: '', answer: '' }],
  tags: [''], cancellationPolicy: '',
  featured: false, popular: false,
}

export default function TripForm({ initialValues, onSubmit, loading = false }) {
  const [section, setSection] = useState('basic')
  const [form, setForm]       = useState({ ...EMPTY_FORM, ...initialValues })
  const [errors, setErrors]   = useState({})
  const { data: catData, isLoading }     = useGetCategoriesQuery({})

  // console.log(catData.data);
  
  const categories = catData?.data?.categories || []
  

  useEffect(() => {
    if (initialValues) setForm({ ...EMPTY_FORM, ...initialValues })
  }, [initialValues])

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n })
  }

  function handleTitleChange(e) {
    const title = e.target.value
    set('title', title)
    if (!initialValues?.slug) set('slug', generateSlug(title))
  }

  function validate() {
    const e = {}
    if (!form.title.trim())            e.title = 'Title is required'
    if (!form.slug.trim())             e.slug  = 'Slug is required'
    if (!form.category)                e.category = 'Category is required'
    if (!form.description.trim())      e.description = 'Description is required'
    if (!form.originalPrice)           e.originalPrice = 'Price is required'
    if (!form.from.trim())             e.from = 'Departure city is required'
    if (form.durationDays < 1)         e.durationDays = 'Must be at least 1 day'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix form errors before submitting')
      return
    }
    onSubmit(form)
  }

  const faqUpdate = (i, key, val) => {
    const f = [...form.faqs]
    f[i] = { ...f[i], [key]: val }
    set('faqs', f)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <SectionTab sections={SECTIONS} active={section} onSelect={setSection} />

      {/* ── BASIC INFO ───────────────────── */}
      {section === 'basic' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Trip Title *</label>
              <input className={clsx('form-input', errors.title && 'error')} value={form.title} onChange={handleTitleChange} placeholder="e.g. Spiti Valley Adventure" />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>
            <div>
              <label className="form-label">URL Slug *</label>
              <input className={clsx('form-input', errors.slug && 'error')} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="spiti-valley-adventure" />
              {errors.slug && <p className="form-error">{errors.slug}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Category *</label>
              <select className={clsx('form-select', errors.category && 'error')} value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option value="">Select category…</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              {errors.category && <p className="form-error">{errors.category}</p>}
            </div>
            <div>
              <label className="form-label">Trip Type</label>
              <select className="form-select" value={form.type} onChange={(e) => set('type', e.target.value)}>
                <option value="">Select type…</option>
                {TRIP_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="form-label">Short Description</label>
            <textarea className="form-textarea" rows={2} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} placeholder="Brief summary shown in cards (max 160 chars)" maxLength={160} />
            <p className="form-hint">{form.shortDescription.length}/160</p>
          </div>
          <div>
            <label className="form-label">Full Description *</label>
            <RichTextEditor value={form.description} onChange={(v) => set('description', v)} placeholder="Detailed trip description…" />
            {errors.description && <p className="form-error">{errors.description}</p>}
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary-500" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">Featured Trip</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-primary-500" checked={form.popular} onChange={(e) => set('popular', e.target.checked)} />
              <span className="text-sm font-medium text-gray-700">Popular Trip</span>
            </label>
          </div>
        </div>
      )}

      {/* ── MEDIA ───────────────────────── */}
      {section === 'media' && (
        <div className="space-y-5">
          <div>
            <label className="form-label">Trip Images (up to 10)</label>
            <ImageUploader value={form.images} onChange={(v) => set('images', v)} multiple maxFiles={10} label="Upload Trip Images" />
          </div>
          <div>
            <label className="form-label">Thumbnail URL</label>
            <input className="form-input" value={form.thumbnail} onChange={(e) => set('thumbnail', e.target.value)} placeholder="https://…/thumbnail.jpg or leave empty to use first image" />
            {form.thumbnail && (
              <img src={form.thumbnail} alt="thumbnail preview" className="mt-2 h-24 w-40 object-cover rounded-lg border border-gray-200" />
            )}
          </div>
        </div>
      )}

      {/* ── PRICING ─────────────────────── */}
      {section === 'pricing' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Currency</label>
              <select className="form-select" value={form.currency} onChange={(e) => set('currency', e.target.value)}>
                {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Original Price *</label>
              <input type="number" min={0} className={clsx('form-input', errors.originalPrice && 'error')} value={form.originalPrice} onChange={(e) => set('originalPrice', e.target.value)} placeholder="12000" />
              {errors.originalPrice && <p className="form-error">{errors.originalPrice}</p>}
            </div>
            <div>
              <label className="form-label">Discounted Price</label>
              <input type="number" min={0} className="form-input" value={form.discountedPrice} onChange={(e) => set('discountedPrice', e.target.value)} placeholder="9999" />
              <p className="form-hint">Leave blank if no discount</p>
            </div>
          </div>
          {form.originalPrice && form.discountedPrice && (
            <div className="bg-success-50 border border-success-100 rounded-lg px-4 py-3 text-sm text-success-700">
              Discount: {Math.round(((form.originalPrice - form.discountedPrice) / form.originalPrice) * 100)}% off
            </div>
          )}
        </div>
      )}

      {/* ── LOCATION ────────────────────── */}
      {section === 'location' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Departure From *</label>
              <input className={clsx('form-input', errors.from && 'error')} value={form.from} onChange={(e) => set('from', e.target.value)} placeholder="e.g. Delhi" />
              {errors.from && <p className="form-error">{errors.from}</p>}
            </div>
            <div>
              <label className="form-label">State</label>
              <input className="form-input" value={form.state} onChange={(e) => set('state', e.target.value)} placeholder="e.g. Himachal Pradesh" />
            </div>
          </div>
          <div>
            <label className="form-label">Country</label>
            <input className="form-input" value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="India" />
          </div>
          <div>
            <label className="form-label">Destinations (places visited)</label>
            <ListEditor label="Destination" values={form.destinations} onChange={(v) => set('destinations', v)} placeholder="e.g. Kaza, Tabo, Nako" />
          </div>
        </div>
      )}

      {/* ── DETAILS ─────────────────────── */}
      {section === 'details' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Duration (Days) *</label>
              <input type="number" min={1} className={clsx('form-input', errors.durationDays && 'error')} value={form.durationDays} onChange={(e) => set('durationDays', Number(e.target.value))} />
              {errors.durationDays && <p className="form-error">{errors.durationDays}</p>}
            </div>
            <div>
              <label className="form-label">Duration (Nights)</label>
              <input type="number" min={0} className="form-input" value={form.durationNights} onChange={(e) => set('durationNights', Number(e.target.value))} />
            </div>
            <div>
              <label className="form-label">Difficulty</label>
              <select className="form-select" value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Min Group Size</label>
              <input type="number" min={1} className="form-input" value={form.minGroupSize} onChange={(e) => set('minGroupSize', Number(e.target.value))} />
            </div>
            <div>
              <label className="form-label">Max Group Size</label>
              <input type="number" min={1} className="form-input" value={form.maxGroupSize} onChange={(e) => set('maxGroupSize', Number(e.target.value))} />
            </div>
          </div>
          <div>
            <label className="form-label">Highlights</label>
            <ListEditor label="Highlight" values={form.highlights} onChange={(v) => set('highlights', v)} placeholder="e.g. Snow-capped peaks" />
          </div>
          <div>
            <label className="form-label">Inclusions</label>
            <ListEditor label="Inclusion" values={form.inclusions} onChange={(v) => set('inclusions', v)} placeholder="e.g. Accommodation on twin sharing basis" />
          </div>
          <div>
            <label className="form-label">Exclusions</label>
            <ListEditor label="Exclusion" values={form.exclusions} onChange={(v) => set('exclusions', v)} placeholder="e.g. Airfare / train tickets" />
          </div>
          <div>
            <label className="form-label">Things to Carry</label>
            <ListEditor label="Item" values={form.thingsToCarry} onChange={(v) => set('thingsToCarry', v)} placeholder="e.g. Warm jacket" />
          </div>
        </div>
      )}

      {/* ── ITINERARY ───────────────────── */}
      {section === 'itinerary' && (
        <div>
          <ItineraryEditor days={form.itinerary} onChange={(v) => set('itinerary', v)} />
        </div>
      )}

      {/* ── START DATES ─────────────────── */}
      {section === 'dates' && (
        <div>
          <StartDatesEditor dates={form.startDates} onChange={(v) => set('startDates', v)} />
        </div>
      )}

      {/* ── FAQs ────────────────────────── */}
      {section === 'faqs' && (
        <div className="space-y-4">
          {form.faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">FAQ #{i + 1}</span>
                <button type="button" onClick={() => set('faqs', form.faqs.filter((_, idx) => idx !== i))} className="btn-icon text-danger-500 hover:bg-danger-50"><Trash2 size={14} /></button>
              </div>
              <div>
                <label className="form-label">Question</label>
                <input className="form-input" value={faq.question} onChange={(e) => faqUpdate(i, 'question', e.target.value)} placeholder="e.g. Is this trip suitable for beginners?" />
              </div>
              <div>
                <label className="form-label">Answer</label>
                <textarea className="form-textarea" rows={2} value={faq.answer} onChange={(e) => faqUpdate(i, 'answer', e.target.value)} placeholder="Detailed answer…" />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => set('faqs', [...form.faqs, { question: '', answer: '' }])} className="btn btn-secondary btn-sm"><Plus size={13} /> Add FAQ</button>
        </div>
      )}

      {/*  SEO & POLICY  */}
      {section === 'seo' && (
        <div className="space-y-5">
          <div>
            <label className="form-label">Tags (for search)</label>
            <ListEditor label="Tag" values={form.tags} onChange={(v) => set('tags', v)} placeholder="e.g. himachal, snow, adventure" />
          </div>
          <div>
            <label className="form-label">Cancellation Policy</label>
            <textarea className="form-textarea" rows={5} value={form.cancellationPolicy} onChange={(e) => set('cancellationPolicy', e.target.value)} placeholder="Describe the cancellation and refund policy…" />
          </div>
        </div>
      )}

      {/*  Submit  */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          {Object.keys(errors).length > 0 && (
            <span className="text-danger-600 font-medium">{Object.keys(errors).length} error(s) — please review all sections</span>
          )}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => window.history.back()} className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? 'Saving…' : initialValues ? 'Update Trip' : 'Create Trip'}
          </button>
        </div>
      </div>
    </form>
  )
}
