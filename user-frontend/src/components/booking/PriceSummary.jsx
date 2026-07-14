import React from 'react';
import { formatPrice } from '../../utils/helpers.js';

const CONVENIENCE_FEE = 99;
const GST_RATE = 0.05;

export default function PriceSummary({ trip, travelers, selectedDate, promoCode, promoDiscount }) {
  const pricePerPerson = trip?.price || 0;
  const base = pricePerPerson * (travelers || 1);
  const discount = promoDiscount || 0;
  const discountedBase = base - discount;
  const gst = Math.round(discountedBase * GST_RATE);
  const total = discountedBase + gst + CONVENIENCE_FEE;
  const savings = discount;

  const fmt = (n) => {
    if (typeof formatPrice === 'function') return formatPrice(n);
    return `₹${n.toLocaleString('en-IN')}`;
  };

  const formatDateStr = (dateVal) => {
    if (!dateVal) return '—';
    try {
      return new Date(dateVal).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return String(dateVal);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 shadow-md bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-4">
        <h3 className="text-white font-bold text-base">Price Summary</h3>
        <p className="text-amber-100 text-xs mt-0.5 truncate">{trip?.title || 'Trip'}</p>
      </div>

      <div className="p-5 space-y-1">
        {/* Trip dates */}
        {selectedDate && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Departure: <strong className="text-slate-700">{formatDateStr(selectedDate)}</strong></span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-dashed border-slate-200 my-3" />

        {/* Base Price */}
        <div className="flex justify-between items-center text-sm py-1">
          <span className="text-slate-600">
            {fmt(pricePerPerson)} × {travelers || 1} traveler{(travelers || 1) > 1 ? 's' : ''}
          </span>
          <span className="font-medium text-slate-800">{fmt(base)}</span>
        </div>

        {/* Promo Discount */}
        {promoCode && discount > 0 && (
          <div className="flex justify-between items-center text-sm py-1">
            <span className="text-emerald-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Promo: <strong>{promoCode}</strong>
            </span>
            <span className="font-semibold text-emerald-600">−{fmt(discount)}</span>
          </div>
        )}

        {/* GST */}
        <div className="flex justify-between items-center text-sm py-1">
          <span className="text-slate-500">GST (5%)</span>
          <span className="text-slate-700">{fmt(gst)}</span>
        </div>

        {/* Convenience Fee */}
        <div className="flex justify-between items-center text-sm py-1">
          <span className="text-slate-500">Convenience fee</span>
          <span className="text-slate-700">{fmt(CONVENIENCE_FEE)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-3" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-slate-700 font-semibold">Total Payable</span>
          <span className="text-2xl font-extrabold text-amber-500">{fmt(total)}</span>
        </div>

        {/* Savings Badge */}
        {savings > 0 && (
          <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-semibold text-emerald-700">
              You save {fmt(savings)} with this promo!
            </span>
          </div>
        )}

        {/* Notes */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Price is per person. Includes accommodation, transport and guided tours.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-500">
            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Free cancellation up to 7 days before departure.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
