import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check as CheckIcon,
  Copy as DocumentDuplicateIcon,
  CalendarDays as CalendarDaysIcon,
  Users as UsersIcon,
  IndianRupee as CurrencyRupeeIcon,
  Ticket as TicketIcon,
  ArrowRight as ArrowRightIcon,
  Share2 as ShareIcon,
  CheckCircle as CheckCircleIcon,
} from 'lucide-react'
import { toast } from 'react-hot-toast'

import SEOHead from '../components/common/SEOHead.jsx'
import { useGetBookingByIdQuery } from '../store/api/bookingApi.js'

//  Confetti Particle 
const CONFETTI_COLORS = [
  '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#F97316', '#06B6D4',
]

function ConfettiParticle({ color, x, delay, duration, size }) {
  return (
    <motion.div
      className="absolute top-0 pointer-events-none rounded-sm"
      style={{
        left: `${x}%`,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        originX: '50%',
        originY: '0%',
      }}
      initial={{ y: -20, opacity: 1, rotate: 0, scaleX: 1 }}
      animate={{
        y: ['0%', '90vh'],
        opacity: [1, 1, 0],
        rotate: [0, Math.random() > 0.5 ? 360 : -360],
        scaleX: [1, 0.5, 1],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeIn',
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
      }}
    />
  )
}

function ConfettiRain({ count = 40 }) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
      size: Math.random() * 8 + 6,
    }))
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {particles.current.map((p, i) => (
        <ConfettiParticle key={i} {...p} />
      ))}
    </div>
  )
}

//  Animated Check 
function AnimatedCheck() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      {/* Outer ring pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-100"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
      />
      {/* Circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
      >
        {/* Checkmark */}
        <motion.div
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <CheckIcon className="w-12 h-12 text-white stroke-[3]" />
        </motion.div>
      </motion.div>
    </div>
  )
}

//  Copyable Text 
function CopyableText({ value, label }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 font-mono text-sm bg-gray-100 hover:bg-amber-50 px-2.5 py-1 rounded-lg transition group"
      title={`Copy ${label}`}
    >
      <span className="text-gray-700">{value}</span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CheckCircleIcon className="w-4 h-4 text-green-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <DocumentDuplicateIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

//  Skeleton 
function ConfirmationSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center px-4 py-16 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-6" />
      <div className="h-8 bg-gray-200 rounded w-64 mb-3" />
      <div className="h-5 bg-gray-200 rounded w-48 mb-10" />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Component 
export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(true)

  const { data, isLoading, isError } = useGetBookingByIdQuery(bookingId)
  const booking = data?.booking || null

  // Stop confetti after 6 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 6000)
    return () => clearTimeout(t)
  }, [])

  const handleDownloadInvoice = async () => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/invoice`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (!res.ok) throw new Error('Invoice not available.')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Treno-Invoice-${bookingId}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      toast.error('Invoice download failed. Please try again later.')
    }
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🎉 I just booked *${booking?.tripTitle || 'an amazing trip'}* with Treno!\n\nBooking ID: ${bookingId}\nCheck it out: ${window.location.origin}/trips`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  if (isLoading) return <ConfirmationSkeleton />

  if (isError || !booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Booking details unavailable</h2>
        <p className="text-gray-500 mb-6 max-w-xs">
          We couldn't load your booking. Don't worry — if your payment was successful, we'll send
          a confirmation email shortly.
        </p>
        <div className="flex gap-3">
          <Link
            to="/my-bookings"
            className="bg-amber-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition text-sm"
          >
            My Bookings
          </Link>
          <Link
            to="/trips"
            className="border border-gray-200 px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition text-sm"
          >
            Explore Trips
          </Link>
        </div>
      </div>
    )
  }

  const maskedPaymentId = booking.paymentId
    ? '…' + booking.paymentId.slice(-8)
    : '—'

  return (
    <>
      <SEOHead
        title={`Booking Confirmed! | Treno`}
        description="Your trip booking is confirmed. Get ready for an amazing adventure!"
      />

      {/* Confetti */}
      <AnimatePresence>{showConfetti && <ConfettiRain count={50} />}</AnimatePresence>

      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-amber-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* ── Success Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <AnimatedCheck />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-playfair mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-500 text-lg">Your adventure awaits! 🌍</p>
          </motion.div>

          {/* ── Booking Details Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-6"
          >
            {/* Header strip */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                Booking ID
              </p>
              <div className="mt-1">
                <CopyableText value={bookingId} label="Booking ID" />
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Trip Name */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <TicketIcon className="w-4 h-4 text-amber-400" />
                  Trip
                </span>
                <span className="text-sm font-semibold text-gray-800 text-right">
                  {booking.tripTitle}
                </span>
              </div>

              {/* Travel Dates */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-amber-400" />
                  Travel Date
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {booking.travelDate || booking.selectedDate}
                </span>
              </div>

              {/* Travelers */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-amber-400" />
                  Travelers
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {booking.travelers} Person{booking.travelers > 1 ? 's' : ''}
                </span>
              </div>

              {/* Payment ID */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <CurrencyRupeeIcon className="w-4 h-4 text-amber-400" />
                  Payment ID
                </span>
                <span className="text-sm font-mono text-gray-700">{maskedPaymentId}</span>
              </div>

              {/* Total Amount */}
              <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-700">Total Paid</span>
                <span className="text-lg font-extrabold text-green-600">
                  ₹{booking.totalAmount?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Passenger List ── */}
          {booking.passengers?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-amber-500" />
                Passengers
              </h2>
              <div className="divide-y divide-gray-100">
                {booking.passengers.map((passenger, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-sm flex-shrink-0">
                        {passenger.name?.charAt(0)?.toUpperCase() || idx + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {passenger.name}
                        </p>
                        {passenger.email && (
                          <p className="text-xs text-gray-400">{passenger.email}</p>
                        )}
                      </div>
                    </div>
                    {passenger.age && (
                      <span className="text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
                        Age: {passenger.age}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Next Steps ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8"
          >
            <h2 className="font-bold text-blue-900 text-base mb-4">
              📋 What happens next?
            </h2>
            <ol className="space-y-3">
              {[
                {
                  step: '1',
                  text: 'A confirmation email with your booking details has been sent to your registered email address.',
                },
                {
                  step: '2',
                  text: 'Our trip coordinator will contact you within 24 hours to share the full trip itinerary and packing list.',
                },
                {
                  step: '3',
                  text: 'Your trip leader will reach out 24 hours before departure with meetup details and last-minute instructions.',
                },
                {
                  step: '4',
                  text: 'You can view and manage your booking anytime from My Bookings.',
                },
              ].map(({ step, text }) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <p className="text-sm text-blue-800 leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* ── Action Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <button
              onClick={handleDownloadInvoice}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-amber-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Invoice
            </button>

            <Link
              to="/my-bookings"
              className="flex-1 flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-xl transition"
            >
              My Bookings
              <ArrowRightIcon className="w-4 h-4" />
            </Link>

            <Link
              to="/trips"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 rounded-xl transition"
            >
              Explore More Trips
            </Link>
          </motion.div>

          {/* ── Share Buttons ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-sm text-gray-500">Share your adventure with friends 🎉</p>
            <div className="flex gap-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-full transition"
              >
                <ShareIcon className="w-4 h-4" />
                Copy Link
              </button>
            </div>

            {/* Celebration emoji strip */}
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-2xl mt-2"
            >
              🎒✈️🏔️🌅🗺️
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
