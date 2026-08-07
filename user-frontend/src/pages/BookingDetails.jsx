import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Users,
  PhoneCall,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Tag,
  MapPin,
  Menu,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useGetBookingByIdQuery } from '../store/api/bookingApi.js';

// Status styling helper
const getStatusBadge = (status) => {
  const styles = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
    paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    failed: 'bg-red-50 text-red-700 border-red-200',
    refunded: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const icons = {
    confirmed: <CheckCircle2 className="w-3.5 h-3.5" />,
    completed: <CheckCircle2 className="w-3.5 h-3.5" />,
    pending: <Clock className="w-3.5 h-3.5" />,
    cancelled: <XCircle className="w-3.5 h-3.5" />,
    paid: <CheckCircle2 className="w-3.5 h-3.5" />,
    failed: <XCircle className="w-3.5 h-3.5" />,
    refunded: <ShieldCheck className="w-3.5 h-3.5" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
        styles[status] || 'bg-gray-50 text-gray-700 border-gray-200'
      }`}
    >
      {icons[status]}
      {status?.replace('_', ' ')}
    </span>
  );
};

export default function BookingDetails() {
  const { id } = useParams(); // Extracts booking ID from URL route: /dashboard/bookings/:id
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data, isLoading, isError, error } = useGetBookingByIdQuery(id);

  // Fallback for nested API response structures (e.g., data.data or data directly)
  const booking = data?.data || data?.booking || data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-amber-600 font-medium">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading booking details...</span>
        </div>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="max-w-3xl mx-auto my-12 px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <div>
            <h3 className="text-lg font-bold text-red-900">Unable to load booking details</h3>
            <p className="text-sm text-red-600 mt-1">
              {error?.data?.message || 'The requested booking could not be found or an error occurred.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/bookings')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  const {
    bookingId,
    trip,
    startDate,
    passengers = [],
    totalAmount,
    discountAmount = 0,
    finalAmount,
    paymentStatus,
    paymentMethod,
    bookingStatus,
    specialRequirements,
    emergencyContact,
    couponCode,
    cancellationReason,
    refundAmount = 0,
    refundStatus,
    createdAt,
  } = booking;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs text-gray-400 font-mono">
            Booked on: {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Main Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-semibold tracking-wider text-amber-600 uppercase">
                Booking Reference
              </span>
              <h1 className="text-2xl font-bold text-gray-900 font-mono mt-0.5">
                #{bookingId || id}
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-right sm:text-left">
                <span className="text-xs text-gray-400 block">Booking Status</span>
                {getStatusBadge(bookingStatus)}
              </div>
              <div className="text-right sm:text-left">
                <span className="text-xs text-gray-400 block">Payment Status</span>
                {getStatusBadge(paymentStatus)}
              </div>
            </div>
          </div>

          {/* Trip Summary Overview */}
          {trip && (
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {trip.image || trip.coverImage ? (
                <img
                  src={trip.image || trip.coverImage}
                  alt={trip.name}
                  className="w-full sm:w-32 h-24 rounded-xl object-cover"
                />
              ) : null}
              <div className="space-y-1.5 flex-1">
                <h2
                  className="text-xl font-bold text-gray-900"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {trip.name || 'Trip Details'}
                </h2>
                {trip.destination && (
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    {trip.destination}
                  </p>
                )}
                <p className="text-sm text-gray-600 flex items-center gap-1.5 pt-1">
                  <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  Departure Date:{' '}
                  <span className="font-semibold text-gray-900">
                    {new Date(startDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Passenger Info (Spans 2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                Passenger Details ({passengers.length})
              </h3>
              <div className="divide-y divide-gray-100">
                {passengers.map((p, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                      <span className="text-xs px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 capitalize">
                        {p.gender} • {p.age} yrs
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      ID Proof: <span className="uppercase font-medium text-gray-700">{p.idType?.replace('_', ' ')}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions & Emergency Contact */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-600" />
                Contact & Special Instructions
              </h3>
              
              {emergencyContact && (
                <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-100/60 space-y-1">
                  <p className="text-xs font-semibold text-amber-800 uppercase">Emergency Contact</p>
                  <p className="text-sm font-medium text-gray-900">{emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">{emergencyContact.phone}</p>
                </div>
              )}

              {specialRequirements ? (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Special Requirements</p>
                  <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {specialRequirements}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No special requirements specified.</p>
              )}
            </div>

            {/* Cancellation & Refund Notice (If cancelled) */}
            {bookingStatus === 'cancelled' && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 space-y-3">
                <h3 className="text-base font-bold text-red-900 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Cancellation & Refund Details
                </h3>
                {cancellationReason && (
                  <p className="text-sm text-red-700">
                    <span className="font-semibold">Reason:</span> {cancellationReason}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-red-200/60 text-sm">
                  <span className="text-red-700 font-medium">Refund Status:</span>
                  {getStatusBadge(refundStatus)}
                </div>
                {refundAmount > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-700 font-medium">Refund Amount:</span>
                    <span className="font-bold text-red-900">₹{refundAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment & Invoice Breakdown Sidebar (1 col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                Payment Summary
              </h3>

              <div className="space-y-2.5 text-sm border-b border-gray-100 pb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Base Amount</span>
                  <span>₹{totalAmount?.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Discount {couponCode ? `(${couponCode})` : ''}
                    </span>
                    <span>-₹{discountAmount?.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total Paid</span>
                  <span className="text-amber-600">₹{finalAmount?.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-2 text-xs text-gray-500 pt-1">
                <div className="flex justify-between">
                  <span>Method:</span>
                  <span className="font-semibold text-gray-700 uppercase">
                    {paymentMethod || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <span className="font-semibold text-gray-700 capitalize">
                    {paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}