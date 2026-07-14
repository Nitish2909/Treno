import { format, formatDistanceToNow, parseISO, differenceInDays } from 'date-fns'

// ===== Price Formatting =====
export const formatPrice = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatPriceShort = (amount) => {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return `₹${amount}`
}

export const calculateDiscount = (original, discounted) => {
  if (!original || !discounted || discounted >= original) return 0
  return Math.round(((original - discounted) / original) * 100)
}

// ===== Date Formatting =====
export const formatDate = (date, formatStr = 'dd MMM yyyy') => {
  if (!date) return ''
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, formatStr)
  } catch {
    return ''
  }
}

export const formatDateRelative = (date) => {
  if (!date) return ''
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  } catch {
    return ''
  }
}

export const formatDateRange = (startDate, endDate) => {
  if (!startDate) return ''
  const start = formatDate(startDate, 'dd MMM')
  if (!endDate) return start
  const end = formatDate(endDate, 'dd MMM yyyy')
  return `${start} - ${end}`
}

// ===== Duration Formatting =====
export const calculateDuration = (nights) => {
  if (!nights) return ''
  const days = nights + 1
  return `${days}D / ${nights}N`
}

export const formatDuration = (days) => {
  if (!days) return ''
  if (days === 1) return '1 Day'
  return `${days} Days`
}

export const getDurationRange = (days) => {
  if (days <= 3) return '1-3 days'
  if (days <= 6) return '4-6 days'
  if (days <= 10) return '7-10 days'
  return '10+ days'
}

// ===== String Utilities =====
export const getInitials = (name) => {
  if (!name) return 'U'
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export const truncateText = (text, maxLength = 100) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeWords = (str) => {
  if (!str) return ''
  return str.replace(/\b\w/g, (c) => c.toUpperCase())
}

// ===== Rating Utilities =====
export const generateStars = (rating) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)
  return {
    full: fullStars,
    half: hasHalf ? 1 : 0,
    empty: emptyStars,
    value: rating,
  }
}

export const getRatingColor = (rating) => {
  if (rating >= 4.5) return 'text-emerald-600 bg-emerald-50'
  if (rating >= 4.0) return 'text-green-600 bg-green-50'
  if (rating >= 3.0) return 'text-amber-600 bg-amber-50'
  if (rating >= 2.0) return 'text-orange-600 bg-orange-50'
  return 'text-red-600 bg-red-50'
}

export const getRatingLabel = (rating) => {
  if (rating >= 4.5) return 'Excellent'
  if (rating >= 4.0) return 'Very Good'
  if (rating >= 3.5) return 'Good'
  if (rating >= 3.0) return 'Average'
  return 'Poor'
}

// ===== Number Utilities =====
export const formatNumber = (num) => {
  if (!num) return '0'
  return new Intl.NumberFormat('en-IN').format(num)
}

export const formatCompactNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return String(num)
}

// ===== Color Utilities =====
export const getDifficultyColor = (difficulty) => {
  const map = {
    easy: 'bg-green-100 text-green-700',
    moderate: 'bg-amber-100 text-amber-700',
    hard: 'bg-orange-100 text-orange-700',
    challenging: 'bg-red-100 text-red-700',
    expert: 'bg-purple-100 text-purple-700',
  }
  return map[difficulty?.toLowerCase()] || 'bg-slate-100 text-slate-700'
}

export const getBookingStatusColor = (status) => {
  const map = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
    ongoing: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    completed: 'bg-green-100 text-green-700 border-green-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
    refunded: 'bg-purple-100 text-purple-700 border-purple-200',
  }
  return map[status?.toLowerCase()] || 'bg-slate-100 text-slate-700 border-slate-200'
}

// ===== URL Utilities =====
export const buildImageUrl = (url, width = 800, quality = 80) => {
  if (!url) return ''
  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`
  }
  return url
}

export const buildQueryString = (params) => {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  )
  return new URLSearchParams(filtered).toString()
}

// ===== Validation Utilities =====
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))
}

export const isValidAadhaar = (aadhaar) => {
  return /^\d{12}$/.test(aadhaar.replace(/\s/g, ''))
}

export const isValidPassport = (passport) => {
  return /^[A-Z][1-9][0-9]{7}$/.test(passport.toUpperCase())
}

// ===== GST Calculation =====
export const calculateGST = (amount, rate = 5) => {
  return Math.round((amount * rate) / 100)
}

export const calculateTotalWithGST = (amount, rate = 5) => {
  return amount + calculateGST(amount, rate)
}

// ===== Array Utilities =====
export const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const group = item[key]
    if (!result[group]) result[group] = []
    result[group].push(item)
    return result
  }, {})
}

export const uniqueBy = (arr, key) => {
  const seen = new Set()
  return arr.filter((item) => {
    const val = item[key]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}

// ===== Booking Utilities =====
export const calculateBookingTotal = (pricePerPerson, travelers, gstRate = 5) => {
  const subtotal = pricePerPerson * travelers
  const gst = calculateGST(subtotal, gstRate)
  return {
    subtotal,
    gst,
    total: subtotal + gst,
  }
}

export const getAvailableSeats = (capacity, booked) => {
  return Math.max(0, capacity - booked)
}

// ===== Read Time Calculation =====
export const calculateReadTime = (content) => {
  if (!content) return '1 min read'
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}
