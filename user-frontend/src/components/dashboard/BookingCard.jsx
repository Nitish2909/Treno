import React, { useState } from 'react';
import { getBookingStatusColor, formatPrice, formatDate } from '../../utils/helpers.js';
import { useCancelBookingMutation } from '../../store/api/bookingApi.js';

//  Status config 

const STATUS_STYLES = {
  pending:   { label: 'Pending',   bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-400' },
  confirmed: { label: 'Confirmed', bg: 'bg-blue-100',    text: 'text-blue-700',    dot: 'bg-blue-400' },
  ongoing:   { label: 'Ongoing',   bg: 'bg-teal-100',    text: 'text-teal-700',    dot: 'bg-teal-400' },
  completed: { label: 'Completed', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100',     text: 'text-red-600',     dot: 'bg-red-400' },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}

//  Confirmation modal 

function CancelModal({ bookingId, onConfirm, onClose, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-10 animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19H19a2 2 0 001.75-2.97L13.75 4a2 2 0 00-3.5 0L3.25 16.03A2 2 0 005.07 19z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Cancel Booking?</h3>
            <p className="text-xs text-slate-500">Booking #{bookingId}</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Are you sure you want to cancel this booking? Refunds are subject to our{' '}
          <a href="/cancellation-policy" className="text-amber-600 underline" target="_blank" rel="noopener noreferrer">
            cancellation policy
          </a>
          .
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition disabled:opacity-50"
          >
            Keep Booking
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Cancelling…
              </>
            ) : (
              'Yes, Cancel'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

//  Main component 

export default function BookingCard({ booking, onCancel }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBooking, { isLoading: cancelling }] = useCancelBookingMutation();

  const {
    _id,
    bookingId,
    trip,
    status,
    startDate,
    endDate,
    travelers,
    totalAmount,
    createdAt,
  } = booking;

  const canCancel = status === 'confirmed' || status === 'pending';
  const canReview = status === 'completed';

  const fmt = (n) => {
    if (typeof formatPrice === 'function') return formatPrice(n);
    return `₹${Number(n).toLocaleString('en-IN')}`;
  };

  const fmtDate = (d) => {
    if (typeof formatDate === 'function') return formatDate(d);
    if (!d) return '—';
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return String(d);
    }
  };

  const handleConfirmCancel = async () => {
    try {
      await cancelBooking(_id).unwrap();
      setShowCancelModal(false);
      if (typeof onCancel === 'function') onCancel(_id);
    } catch (err) {
      console.error('Cancel failed:', err);
    }
  };

  const tripImage = trip?.images?.[0] || null;
  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.pending;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-0">
          {/* ── Left: Trip image ── */}
          <div className="sm:w-28 sm:h-auto h-36 flex-shrink-0">
            {tripImage ? (
              <img
                src={tripImage}
                alt={trip?.title || 'Trip'}
                className="w-full h-full object-cover sm:rounded-l-2xl"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 sm:rounded-l-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* ── Middle: Details ── */}
          <div className="flex-1 p-4 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800 text-base truncate leading-tight">
                  {trip?.title || 'Trip'}
                </h3>
                {trip?.location && (
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {trip.location}
                  </p>
                )}
              </div>
              {/* Status badge (visible on mobile, top-right) */}
              <div className="sm:hidden">
                <StatusBadge status={status} />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              {/* Dates */}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {fmtDate(startDate)}{endDate ? ` – ${fmtDate(endDate)}` : ''}
              </span>
              {/* Travelers */}
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {travelers} traveler{travelers !== 1 ? 's' : ''}
              </span>
              {/* Duration */}
              {trip?.duration && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {trip.duration} days
                </span>
              )}
            </div>

            {/* Booking ID + booked on */}
            <div className="mt-2 flex flex-wrap gap-x-3 text-xs text-slate-400">
              <span>
                ID: <span className="font-mono text-slate-500">{bookingId || _id?.slice(-8)?.toUpperCase()}</span>
              </span>
              {createdAt && (
                <span>Booked on {fmtDate(createdAt)}</span>
              )}
            </div>
          </div>

          {/* ── Right: Status + Amount + Actions ── */}
          <div className="flex sm:flex-col flex-row items-center sm:items-end justify-between sm:justify-start gap-3 px-4 pb-4 sm:p-4 sm:border-l sm:border-slate-100">
            {/* Status badge (desktop) */}
            <div className="hidden sm:block">
              <StatusBadge status={status} />
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className="text-xs text-slate-400">Total paid</p>
              <p className="text-lg font-extrabold text-slate-800">{fmt(totalAmount)}</p>
            </div>

            {/* Action buttons */}
            <div className="flex sm:flex-col flex-row gap-2 mt-auto">
              {/* View Details */}
              <a
                href={`/dashboard/bookings/${_id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600 text-xs font-semibold transition whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </a>

              {/* Cancel */}
              {canCancel && (
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 text-xs font-semibold transition whitespace-nowrap"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              )}

              {/* Write Review */}
              {canReview && (
                <a
                  href={`/trips/${trip?.slug}/review?booking=${_id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition whitespace-nowrap shadow-sm"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Write Review
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <CancelModal
          bookingId={bookingId || _id?.slice(-8)?.toUpperCase()}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowCancelModal(false)}
          isLoading={cancelling}
        />
      )}
    </>
  );
}
