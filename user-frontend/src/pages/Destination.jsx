import React from 'react';
import { MapPin, ArrowLeft, Calendar, Compass } from 'lucide-react';

export default function Destination({ destination, onBack }) {
  if (!destination) return null;

  const isAll = destination === 'all';

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Selector
        </button>

        {isAll ? (
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">All Destinations</h1>
            <p className="text-slate-600 mb-8">Explore incredible travel spots across India.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.data.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm mb-2">
                    <MapPin className="w-4 h-4" /> {item.tag}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold mb-4">
              <Compass className="w-4 h-4" /> {destination.tag}
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-4">{destination.name}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mb-8">{destination.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Best Season</p>
                <p className="text-slate-800 font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" /> Oct – March
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Ideal Duration</p>
                <p className="text-slate-800 font-semibold">4 to 7 Days</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Popular For</p>
                <p className="text-slate-800 font-semibold">Sightseeing & Culture</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}