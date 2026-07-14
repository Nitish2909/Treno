import toast from 'react-hot-toast'

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

/**
 * Load the Razorpay checkout script dynamically
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true))
      existingScript.addEventListener('error', () => resolve(false))
      return
    }

    const script = document.createElement('script')
    script.src = RAZORPAY_SCRIPT_URL
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

/**
 * Initiate Razorpay payment
 * @param {Object} options
 * @param {string} options.orderId - Razorpay order ID from backend
 * @param {number} options.amount - Amount in paise (INR * 100)
 * @param {string} options.currency - Currency code (default: INR)
 * @param {string} options.bookingId - Internal booking ID
 * @param {Object} options.user - User details { name, email, phone }
 * @param {string} options.tripName - Trip name for display
 * @param {Function} options.onSuccess - Callback on successful payment
 * @param {Function} options.onFailure - Callback on failed/dismissed payment
 */
export const initiatePayment = async ({
  orderId,
  amount,
  currency = 'INR',
  bookingId,
  user,
  tripName,
  onSuccess,
  onFailure,
}) => {
  const loaded = await loadRazorpayScript()

  if (!loaded) {
    toast.error('Failed to load payment gateway. Please check your internet connection.')
    onFailure?.({ error: 'Script load failed' })
    return
  }

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID

  if (!keyId) {
    toast.error('Payment configuration missing. Please contact support.')
    onFailure?.({ error: 'Missing Razorpay key' })
    return
  }

  const options = {
    key: keyId,
    amount: amount, // in paise
    currency,
    name: 'Treno Travel',
    description: tripName ? `Booking: ${tripName}` : 'Trip Booking',
    image: '/logo.png',
    order_id: orderId,
    handler: function (response) {
      // Payment successful
      onSuccess?.({
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
        bookingId,
      })
    },
    prefill: {
      name: user?.name || '',
      email: user?.email || '',
      contact: user?.phone || '',
    },
    notes: {
      bookingId: bookingId || '',
      source: 'Treno Web',
    },
    theme: {
      color: '#F59E0B',
      backdrop_color: 'rgba(0, 0, 0, 0.6)',
    },
    modal: {
      ondismiss: function () {
        toast.error('Payment was cancelled. Your booking is on hold.')
        onFailure?.({ error: 'Payment dismissed by user', bookingId })
      },
      animation: true,
      backdropclose: false,
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
  }

  try {
    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', function (response) {
      toast.error(
        response.error?.description ||
          'Payment failed. Please try again or use a different payment method.'
      )
      onFailure?.({
        error: response.error,
        bookingId,
        code: response.error?.code,
      })
    })

    rzp.open()
  } catch (error) {
    toast.error('Unable to open payment gateway. Please try again.')
    onFailure?.({ error: error.message, bookingId })
  }
}

/**
 * Create a test payment (development only)
 */
export const createTestPayment = (amount) => {
  if (import.meta.env.PROD) return null
  return {
    orderId: `order_test_${Date.now()}`,
    amount: amount * 100,
    currency: 'INR',
  }
}

/**
 * Format amount from paise to INR
 */
export const paiseToRupees = (paise) => paise / 100

/**
 * Format amount from INR to paise
 */
export const rupeesToPaise = (rupees) => Math.round(rupees * 100)
