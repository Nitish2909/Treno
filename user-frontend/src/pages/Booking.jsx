import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CalendarDays,
  Users,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";

const ArrowLeftIcon = ArrowLeft;
const ChevronRightIcon = ChevronRight;
const CalendarDaysIcon = CalendarDays;
const UsersIcon = Users;
const ClockIcon = Clock;
const MapPinIcon = MapPin;
const ExclamationTriangleIcon = AlertTriangle;
import { toast } from "react-hot-toast";

import BookingForm from "../components/booking/BookingForm.jsx";
import SEOHead from "../components/common/SEOHead.jsx";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentMutation,
  useCreateBookingMutation,
} from "../store/api/bookingApi.js";
import { useGetTripByIdQuery } from "../store/api/tripApi.js";
import { initiatePayment } from "../utils/razorpay.js";
import { useAuth } from "../hooks/useAuth.js";
import { authApi } from "../store/api/authApi.js";
import { useSelector } from "react-redux";

// Trip Summary Card
function TripSummaryCard({ trip, startDate, travelers }) {
  console.log(trip);

  if (!trip) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse space-y-3">
        <div className="h-40 bg-gray-200 rounded-xl" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  const subtotal = trip.price.original * travelers;
  console.log(subtotal);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Trip image */}
      {trip.images?.[0] && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={trip.images[0].url}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent " />
          {trip.category && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {trip.category.name}
            </span>
          )}
          {trip.type && (
            <span className="absolute top-3 left-64 bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {trip.type}
            </span>
          )}
        </div>
      )}

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base font-playfair leading-snug mb-3">
          {trip.title}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{trip.location.from || trip.startingFrom}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <ClockIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>{trip.duration?.days}</span> */}
            <ClockIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              {trip.duration?.days} {trip.duration?.days === 1 ? "Day" : "Days"}{" "}
              / {trip.duration?.nights}{" "}
              {trip.duration?.nights === 1 ? "Night" : "Nights"}
            </span>
          </div>
          {startDate && (
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>{startDate.label || startDate}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              {travelers} Traveler{travelers > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Price summary */}
        <div className="border-t border-gray-100 pt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>
              ₹{trip.price?.original.toLocaleString("en-IN")} × {travelers}
            </span>
            <span>₹{subtotal?.toLocaleString("en-IN")}</span>
          </div>
          {trip.price.original && trip.price.original > trip.price.discounted && (
            <div className="flex justify-between text-green-600 text-xs">
              <span>Savings</span>
              <span>
                − ₹
                {(
                  (trip.price.original - trip.price.discounted) *
                  travelers
                )?.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-gray-900 text-base pt-1.5 border-t border-gray-100">
            <span>Total</span>
            <span>₹{(subtotal-(trip.price.original - trip.price.discounted)*travelers)?.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

//  Main Component
export default function Booking() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const {state:{travelers}} = useLocation()
  const { user } = useSelector((state) => state.auth);
  // const [trip,setTrip] = useState("")
  // console.log(user)
  console.log(tripId);
  const {
    data: t,
    isLoading: tripLoading,
    isError: tripError,
  } = useGetTripByIdQuery(tripId, {
    skip: !tripId,
    refetchOnMountOrChange: true,
  });
  console.log(t);
  const trip = t?.data?.trip;

  // console.log(t)
  // let data = {}
  // async function getTripById(tripId){
  //   const result = await fetch(`http://localhost:5000/api/v1/trips/trip/${tripId}`,{
  //   method:"GET",
  //   headers:{"Content-Type":"application/json"},
  //   credentials:"include"
  //   })
  //   data = await result.json()
  //   console.log(data)
  // }

  // // const trip = data?.data?.trip || null
  // const tripData = data.trip;
  // useEffect(()=>{
  //   getTripById(tripId)
  //   setTrip(tripData)
  // },[tripData,tripId])

  const [createBooking, { isLoading: creatingBooking }] =
    useCreateBookingMutation();
  const [initiatePaymentMutation, { isLoading: initiatingPayment }] =
    useInitiatePaymentMutation();
  const [verifyPayment, { isLoading: verifyingPayment }] =
    useVerifyPaymentMutation();

  const [bookingFormData, setBookingFormData] = useState(null);
  const [paymentStep, setPaymentStep] = useState("idle"); // 'idle' | 'creating' | 'payment' | 'verifying' | 'done'

  // Guard: redirect to login if not authenticated
  // useEffect(() => {
  //   if (user === null) {
  //     toast.error('Please log in to book a trip.')
  //     navigate('/login', { state: { from: `/booking/${tripId}` } })
  //   }
  // }, [user, navigate, tripId])

  const isProcessing =
    creatingBooking ||
    initiatingPayment ||
    verifyingPayment ||
    paymentStep !== "idle";

  /**
   * Called by BookingForm once the form is complete.
   * @param {object} formData - {passengers, emergencyContact, specialRequirements, startDate, travelers}
   */
  const handleFormComplete = async (formData) => {
    if (!trip) return;
    setBookingFormData(formData);

    try {
      // Step 1: Create booking in backend
      setPaymentStep("creating");
      const bookingPayload = {
        tripId: trip._id,
        passengers: formData.passengers,
        emergencyContact: formData.emergencyContact,
        specialRequirements: formData.specialRequirements,
        startDate: formData.startDate,
        travelers: formData.travelers,
      };

      const createResult = await createBooking(bookingPayload).unwrap();

      const {
        booking: { _id: bookingId },
        razorpayOrder: { id: razorpayOrderId, amount, currency = "INR" },
      } = createResult?.data || {};

      if (!razorpayOrderId) throw new Error("Failed to create payment order.");

      // Step 2: Open Razorpay modal using onSuccess and onFailure callbacks
      setPaymentStep("payment");

      const paymentResult = await new Promise((resolve, reject) => {
        initiatePayment({
          orderId: razorpayOrderId,
          amount,
          currency,
          bookingId,
          user,
          tripName: trip.title,
          onSuccess: (res) => resolve(res),
          onFailure: (err) => reject(err),
        });
      });

      // Step 3: Verify payment backend side
      setPaymentStep("verifying");
      await verifyPayment({
        bookingId,
        razorpayPaymentId: paymentResult.razorpayPaymentId,
        razorpayOrderId: paymentResult.razorpayOrderId,
        razorpaySignature: paymentResult.razorpaySignature,
      }).unwrap();

      // Step 4: Navigate to confirmation page
      setPaymentStep("done");
      toast.success("Booking confirmed! 🎉");
      navigate(`/booking/confirm/${bookingId}`);
    } catch (err) {
      setPaymentStep("idle");

      const message =
        err?.data?.message ||
        err?.error?.description ||
        (typeof err?.error === "string" ? err.error : null) ||
        err?.message ||
        "Payment failed or was cancelled. Please try again.";

      if (
        typeof message === "string" &&
        message.toLowerCase().includes("cancel")
      ) {
        toast("Payment was cancelled.", { icon: "❌" });
      } else {
        toast.error(message);
      }
    }
  };

  //  Render
  return (
    <>
      <SEOHead
        title={`Book ${trip?.title || "Trip"} | Treno`}
        description="Complete your booking securely. Fill in passenger details and pay online."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back
            </button>
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-amber-500">
                Home
              </Link>
              <ChevronRightIcon className="w-3 h-3" />
              <Link to="/trips" className="hover:text-amber-500">
                Trips
              </Link>
              <ChevronRightIcon className="w-3 h-3" />
              {trip && (
                <>
                  <Link
                    to={`/trips/${trip.slug}`}
                    className="hover:text-amber-500 line-clamp-1 max-w-[140px]"
                  >
                    {trip.title}
                  </Link>
                  <ChevronRightIcon className="w-3 h-3" />
                </>
              )}
              <span className="text-gray-800 font-medium">Booking</span>
            </nav>
          </div>
        </div>

        {/* Payment progress overlay */}
        {paymentStep !== "idle" && paymentStep !== "done" && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-10 flex flex-col items-center gap-4 shadow-2xl mx-4 max-w-sm w-full"
            >
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-800 font-semibold text-center">
                {paymentStep === "creating" && "Creating your booking…"}
                {paymentStep === "payment" && "Opening payment gateway…"}
                {paymentStep === "verifying" && "Verifying payment…"}
              </p>
              <p className="text-xs text-gray-400 text-center">
                Please do not close or refresh this page.
              </p>
            </motion.div>
          </div>
        )}

        {/* ── Trip Error ── */}
        {tripError && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  Unable to load trip
                </h3>
                <p className="text-sm text-red-700">
                  We couldn't fetch the trip details. Please go back and try
                  again.
                </p>
                <button
                  onClick={() => navigate(-1)}
                  className="mt-3 text-sm text-red-600 underline hover:text-red-800"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        {trip && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left: Booking Form */}
              <div className="flex-1 min-w-0">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 font-playfair">
                    Complete Your Booking
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in passenger details and proceed to secure payment.
                  </p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-8">
                  {["Passenger Details", "Review & Pay"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      {i > 0 && <div className="h-px w-8 bg-gray-200" />}
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-amber-500 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`text-sm hidden sm:block ${
                            i === 0
                              ? "font-semibold text-gray-800"
                              : "text-gray-400"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <BookingForm
                  trip={trip}
                  onComplete={handleFormComplete}
                  isSubmitting={isProcessing}
                />
              </div>

              {/* Right: Trip Summary (sticky) */}
              <div className="w-full lg:w-[340px] flex-shrink-0 lg:sticky lg:top-24">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                  Your Trip
                </h2>
                <TripSummaryCard
                  trip={trip}
                  startDate={bookingFormData?.startDate}
                  travelers={travelers || 1}
                />

                {/* Security badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  100% Secure Payment · SSL Encrypted
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
