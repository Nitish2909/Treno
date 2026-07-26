import React from 'react';

const ID_FORMATS = {
  'Aadhaar Card': '12-digit number (e.g. 1234 5678 9012)',
  'PAN Card': '10-character alphanumeric (e.g. ABCDE1234F)',
  Passport: 'Letter + 7 digits (e.g. A1234567)',
  'Driving License': 'State code + digits (e.g. DL0420110149646)',
};

const GENDER_OPTIONS = ['male', 'female', 'other'];
const ID_TYPES = ["aadhar", "passport", "driving_license", "voter_id", "pan"];

export default function PassengerForm({ index, data, onChange, errors }) {
  const handle = (field, value) => {
    onChange(index, { ...data, [field]: value });
  };

  const err = errors || {};

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
      {/* Header */}
      <div className="bg-amber-500 px-5 py-3 flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-white text-amber-600 font-bold text-sm flex items-center justify-center">
          {index + 1}
        </span>
        <h3 className="text-white font-semibold text-sm tracking-wide">
          Traveler {index + 1}
        </h3>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handle('name', e.target.value)}
            placeholder="As per ID proof"
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 ${
              err.name ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
            }`}
          />
          {err.name && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {err.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={data.age || ''}
            onChange={(e) => handle('age', e.target.value)}
            min={2}
            max={99}
            placeholder="e.g. 28"
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 ${
              err.age ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
            }`}
          />
          {err.age && (
            <p className="mt-1 text-xs text-red-500">{err.age}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {GENDER_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handle('gender', g)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition ${
                  data.gender === g
                    ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                    : 'border-slate-300 text-slate-600 hover:border-amber-400 hover:text-amber-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {err.gender && (
            <p className="mt-1 text-xs text-red-500">{err.gender}</p>
          )}
        </div>

        {/* ID Proof Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            ID Proof Type <span className="text-red-500">*</span>
          </label>
          <select
            value={data.idType || ''}
            onChange={(e) => handle('idType', e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 bg-white ${
              err.idType ? 'border-red-400 bg-red-50' : 'border-slate-300'
            }`}
          >
            <option value="">Select ID type</option>
            {ID_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {err.idType && (
            <p className="mt-1 text-xs text-red-500">{err.idType}</p>
          )}
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            ID Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.idNumber || ''}
            onChange={(e) => handle('idNumber', e.target.value.toUpperCase())}
            placeholder={data.idType ? ID_FORMATS[data.idType] : 'Select ID type first'}
            className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 font-mono ${
              err.idNumber ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white'
            }`}
          />
          {data.idType && (
            <p className="mt-1 text-xs text-slate-400">{ID_FORMATS[data.idType]}</p>
          )}
          {err.idNumber && (
            <p className="mt-1 text-xs text-red-500">{err.idNumber}</p>
          )}
        </div>

        {/* Medical Notes */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Medical Notes{' '}
            <span className="text-slate-400 font-normal normal-case">(Optional)</span>
          </label>
          <textarea
            value={data.medicalNotes || ''}
            onChange={(e) => handle('medicalNotes', e.target.value)}
            rows={2}
            placeholder="Any medical conditions, allergies or special needs for this traveler…"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-amber-400 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
