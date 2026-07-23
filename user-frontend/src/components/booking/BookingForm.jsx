import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PassengerForm from './PassengerForm.jsx';
import PriceSummary from './PriceSummary.jsx';

//  helpers 

const emptyPassenger = () => ({
  fullName: '',
  age: '',
  gender: '',
  idType: '',
  idNumber: '',
  medicalNotes: '',
});

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

const formatDateDisplay = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(d);
  }
};

//  Step Progress Indicator 

const STEPS = [
  { label: 'Dates & Travelers' },
  { label: 'Passenger Details' },
  { label: 'Contact & Requirements' },
  { label: 'Review & Pay' },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-start justify-center mb-8 px-2">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center" style={{ minWidth: 56 }}>
              {/* Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                  done
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : active
                    ? 'bg-white border-amber-500 text-amber-600 shadow-lg ring-4 ring-amber-100'
                    : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {/* Label */}
              <span
                className={`mt-1.5 text-center leading-tight text-xs font-medium transition-colors ${
                  active ? 'text-amber-600' : done ? 'text-slate-500' : 'text-slate-400'
                }`}
                style={{ maxWidth: 64 }}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 mt-4 mx-1">
                <div
                  className={`h-0.5 rounded transition-all duration-500 ${
                    done ? 'bg-amber-500' : 'bg-slate-200'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

//  Validation helpers 

function validateStep1(form) {
  const errs = {};
  if (!form.selectedDate) errs.selectedDate = 'Please select a departure date.';
  if (!form.travelers || form.travelers < 1) errs.travelers = 'At least 1 traveler required.';
  return errs;
}

function validatePassenger(p) {
  const e = {};
  if (!p.fullName || p.fullName.trim().length < 3) e.fullName = 'Full name is required (min 3 chars).';
  const age = parseInt(p.age, 10);
  if (!p.age || isNaN(age) || age < 2 || age > 99) e.age = 'Age must be between 2 and 99.';
  if (!p.gender) e.gender = 'Please select a gender.';
  if (!p.idType) e.idType = 'Please select an ID type.';
  if (!p.idNumber || p.idNumber.trim().length < 4) e.idNumber = 'Please enter a valid ID number.';
  return e;
}

function validateStep2(passengers) {
  return passengers.map(validatePassenger);
}

function validateStep3(form) {
  const errs = {};
  if (!form.emergencyName || form.emergencyName.trim().length < 2)
    errs.emergencyName = 'Name is required.';
  if (!form.emergencyPhone || !/^\d{10}$/.test(form.emergencyPhone))
    errs.emergencyPhone = 'Enter a valid 10-digit phone number.';
  if (!form.emergencyRelationship || form.emergencyRelationship.trim().length < 2)
    errs.emergencyRelationship = 'Relationship is required.';
  if (!form.termsAccepted) errs.termsAccepted = 'You must accept the Terms of Service.';
  return errs;
}

//  Slide animation variants 

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ---------------
// MAIN COMPONENT
// ------------------

export default function BookingForm({ trip, onComplete }) {
  const maxGroup = trip?.groupSize?.max || 20;
  const pricePerPerson = trip?.price || 0;

  //  Core state 
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paying, setPaying] = useState(false);

  // Step 1
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  // Step 2
  const [passengers, setPassengers] = useState([emptyPassenger()]);
  const [passengerErrors, setPassengerErrors] = useState([{}]);

  // Step 3
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Errors
  const [step1Errors, setStep1Errors] = useState({});
  const [step3Errors, setStep3Errors] = useState({});

  // ── Derived 
  const subtotal = pricePerPerson * travelers;
  const hasDates = Array.isArray(trip?.startDates) && trip.startDates.length > 0;

  // ── Traveler count sync 
  const adjustTravelers = (n) => {
    const clamped = Math.max(1, Math.min(maxGroup, n));
    setTravelers(clamped);
    setPassengers((prev) => {
      if (clamped > prev.length) {
        return [...prev, ...Array(clamped - prev.length).fill(null).map(emptyPassenger)];
      }
      return prev.slice(0, clamped);
    });
    setPassengerErrors((prev) => {
      if (clamped > prev.length) {
        return [...prev, ...Array(clamped - prev.length).fill({})];
      }
      return prev.slice(0, clamped);
    });
  };

  // ── Navigation 
  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNext = () => {
    if (step === 0) {
      const errs = validateStep1({ selectedDate, travelers });
      setStep1Errors(errs);
      if (Object.keys(errs).length === 0) goTo(1);
    } else if (step === 1) {
      const allErrs = validateStep2(passengers);
      setPassengerErrors(allErrs);
      const hasErrors = allErrs.some((e) => Object.keys(e).length > 0);
      if (!hasErrors) goTo(2);
    } else if (step === 2) {
      const errs = validateStep3({
        emergencyName,
        emergencyPhone,
        emergencyRelationship,
        termsAccepted,
      });
      setStep3Errors(errs);
      if (Object.keys(errs).length === 0) goTo(3);
    }
  };

  const handleBack = () => goTo(step - 1);

  // ── Payment 
  const handlePay = async () => {
    setPaying(true);
    const bookingData = {
      tripId: trip?._id,
      selectedDate,
      travelers,
      passengers,
      emergencyContact: { name: emergencyName, phone: emergencyPhone, relationship: emergencyRelationship },
      specialRequirements,
      pickupLocation,
      totalAmount: subtotal,
    };
    try {
      await onComplete(bookingData);
    } finally {
      setPaying(false);
    }
  };

  // ── Passenger change handler 
  const handlePassengerChange = (idx, updated) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[idx] = updated;
      return next;
    });
  };

  // ---------------------------------
  // Render steps
  // ---------------------------------

  const renderStep = () => {
    switch (step) {
      // ── STEP 1 
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Select Date & Travelers</h2>

            {/* Date picker */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Departure Date <span className="text-red-500">*</span>
              </label>
              {hasDates ? (
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 bg-white ${
                    step1Errors.selectedDate ? 'border-red-400' : 'border-slate-300'
                  }`}
                >
                  <option value="">— Choose a departure date —</option>
                  {trip.startDates.map((d, i) => (
                    <option key={i} value={d}>
                      {formatDateDisplay(d)}
                    </option>
                  ))}
                </select>
              ) : (
                <div className={`rounded-xl border ${step1Errors.selectedDate ? 'border-red-400' : 'border-slate-300'}`}>
                  <DatePicker
                    selected={selectedDate ? new Date(selectedDate) : null}
                    onChange={(date) => setSelectedDate(date ? date.toISOString() : '')}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    placeholderText="Pick a departure date"
                    className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                    wrapperClassName="w-full"
                  />
                </div>
              )}
              {step1Errors.selectedDate && (
                <p className="mt-1 text-xs text-red-500">{step1Errors.selectedDate}</p>
              )}
            </div>

            {/* Travelers counter */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Number of Travelers
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => adjustTravelers(travelers - 1)}
                  disabled={travelers <= 1}
                  className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-lg"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-slate-800 w-8 text-center">{travelers}</span>
                <button
                  type="button"
                  onClick={() => adjustTravelers(travelers + 1)}
                  disabled={travelers >= maxGroup}
                  className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-lg"
                >
                  +
                </button>
                <span className="text-xs text-slate-400 ml-1">Max {maxGroup} travelers</span>
              </div>
              {step1Errors.travelers && (
                <p className="mt-1 text-xs text-red-500">{step1Errors.travelers}</p>
              )}
            </div>

            {/* Price preview */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {fmt(pricePerPerson)} × {travelers} traveler{travelers > 1 ? 's' : ''}
              </div>
              <div className="text-xl font-extrabold text-amber-600">{fmt(subtotal)}</div>
            </div>
          </div>
        );

      // ── STEP 2 
      case 1:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-800">Passenger Details</h2>
            <p className="text-sm text-slate-500">
              Fill in the details for all {travelers} traveler{travelers > 1 ? 's' : ''} as per their ID proof.
            </p>
            {passengers.map((p, i) => (
              <PassengerForm
                key={i}
                index={i}
                data={p}
                onChange={handlePassengerChange}
                errors={passengerErrors[i] || {}}
              />
            ))}
          </div>
        );

      // ── STEP 3 
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Contact & Special Requirements</h2>

            {/* Emergency contact */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Full name"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 ${
                      step3Errors.emergencyName ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {step3Errors.emergencyName && (
                    <p className="mt-1 text-xs text-red-500">{step3Errors.emergencyName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 ${
                      step3Errors.emergencyPhone ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {step3Errors.emergencyPhone && (
                    <p className="mt-1 text-xs text-red-500">{step3Errors.emergencyPhone}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={emergencyRelationship}
                    onChange={(e) => setEmergencyRelationship(e.target.value)}
                    placeholder="e.g. Spouse, Parent, Sibling"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 ${
                      step3Errors.emergencyRelationship ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
                    }`}
                  />
                  {step3Errors.emergencyRelationship && (
                    <p className="mt-1 text-xs text-red-500">{step3Errors.emergencyRelationship}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pickup location */}
            {Array.isArray(trip?.pickupPoints) && trip.pickupPoints.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Pickup Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="">— Select pickup point —</option>
                  {trip.pickupPoints.map((pt, i) => (
                    <option key={i} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Special requirements */}
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Special Requirements{' '}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                rows={3}
                placeholder="Dietary restrictions, medical conditions, accessibility needs, or any other special requests…"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              />
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                      termsAccepted ? 'bg-amber-500 border-amber-500' : 'border-slate-400 group-hover:border-amber-400'
                    }`}
                  >
                    {termsAccepted && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-amber-600 underline hover:text-amber-700" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/cancellation-policy" className="text-amber-600 underline hover:text-amber-700" target="_blank" rel="noopener noreferrer">
                    Cancellation Policy
                  </a>
                  .
                </span>
              </label>
              {step3Errors.termsAccepted && (
                <p className="mt-1 text-xs text-red-500 ml-8">{step3Errors.termsAccepted}</p>
              )}
            </div>
          </div>
        );

      // ── STEP 4 
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Review & Pay</h2>

            {/* Price summary */}
            <PriceSummary
              trip={trip}
              travelers={travelers}
              selectedDate={selectedDate}
            />

            {/* Booking summary */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-700">Booking Summary</h3>
              </div>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-slate-400 w-32 flex-shrink-0">Trip</span>
                  <span className="text-slate-800 font-medium">{trip?.title || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-400 w-32 flex-shrink-0">Departure</span>
                  <span className="text-slate-800">{formatDateDisplay(selectedDate) || '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-400 w-32 flex-shrink-0">Duration</span>
                  <span className="text-slate-800">{trip?.duration ? `${trip.duration} days` : '—'}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-slate-400 w-32 flex-shrink-0">Travelers</span>
                  <span className="text-slate-800">{travelers}</span>
                </div>
                {pickupLocation && (
                  <div className="flex gap-3">
                    <span className="text-slate-400 w-32 flex-shrink-0">Pickup</span>
                    <span className="text-slate-800">{pickupLocation}</span>
                  </div>
                )}
              </div>

              {/* Passengers list */}
              {passengers.length > 0 && (
                <div className="border-t border-slate-100 p-5 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Passengers</p>
                  {passengers.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="font-medium text-slate-700">{p.fullName || `Traveler ${i + 1}`}</span>
                      {p.age && <span className="text-slate-400 text-xs">Age {p.age}</span>}
                      {p.gender && (
                        <span className="text-slate-400 text-xs">· {p.gender}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pay button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={paying}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 disabled:cursor-wait text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              {paying ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing Payment…
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Pay with Razorpay · {fmt(subtotal)}
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              🔒 Secured by Razorpay · SSL encrypted
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // ── Main render 
  return (
    <div className="w-full max-w-2xl mx-auto">
      <StepIndicator current={step} />

      {/* Animated step content */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className={`flex mt-8 gap-3 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800 font-semibold text-sm transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow hover:shadow-md transition"
          >
            Proceed
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
