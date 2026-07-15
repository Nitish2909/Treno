import { format, formatDistanceToNow, parseISO } from 'date-fns'

/**
 * Format a number as Indian Rupees price
 */
export function formatPrice(amount, currency = 'INR') {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a date string or Date object as "12 Jan 2024"
 */
export function formatDate(date) {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'dd MMM yyyy')
  } catch {
    return '—'
  }
}

/**
 * Format a date string or Date object as "12 Jan 2024, 10:30 AM"
 */
export function formatDateTime(date) {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'dd MMM yyyy, hh:mm a')
  } catch {
    return '—'
  }
}

/**
 * Human-readable relative time: "3 hours ago"
 */
export function timeAgo(date) {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  } catch {
    return '—'
  }
}

/**
 * Return Tailwind classes for status badges
 */
export function getStatusColor(status) {
  const map = {
    // Booking statuses
    pending:    'bg-warning-100 text-warning-600',
    confirmed:  'bg-primary-100 text-primary-600',
    completed:  'bg-success-100 text-success-600',
    cancelled:  'bg-danger-100 text-danger-600',
    // Payment statuses
    paid:       'bg-success-100 text-success-600',
    unpaid:     'bg-warning-100 text-warning-600',
    refunded:   'bg-gray-100 text-gray-600',
    partial:    'bg-blue-100 text-blue-600',
    // Review statuses
    approved:   'bg-success-100 text-success-600',
    rejected:   'bg-danger-100 text-danger-600',
    // Trip statuses
    active:     'bg-success-100 text-success-600',
    draft:      'bg-gray-100 text-gray-600',
    inactive:   'bg-danger-100 text-danger-600',
    // Blog statuses
    published:  'bg-success-100 text-success-600',
    // User statuses
    admin:      'bg-purple-100 text-purple-600',
    user:       'bg-blue-100 text-blue-600',
  }
  return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600'
}

/**
 * Truncate text to maxLen characters
 */
export function truncateText(text, maxLen = 50) {
  if (!text) return ''
  return text.length > maxLen ? text.slice(0, maxLen) + '…' : text
}

/**
 * Format file size in human-readable form
 */
export function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let size = bytes
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i++
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text) {
  if (!text) return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate percentage change between two numbers
 * Returns { value, isPositive, formatted }
 */
export function calculatePercentageChange(current, previous) {
  if (!previous || previous === 0) {
    return { value: 0, isPositive: true, formatted: '0%' }
  }
  const change = ((current - previous) / previous) * 100
  return {
    value: Math.abs(change),
    isPositive: change >= 0,
    formatted: `${Math.abs(change).toFixed(1)}%`,
  }
}

/**
 * Build query string from params object (skip nullish values)
 */
export function buildQueryString(params) {
  const qs = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') qs.set(k, v)
  })
  return qs.toString()
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Deep-clone a plain object / array (JSON safe)
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Download a Blob as a file
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a   = document.createElement('a')
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
