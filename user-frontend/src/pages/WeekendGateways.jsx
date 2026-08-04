import React from 'react';
import { 
  ShieldCheck, 
  Home, 
  Users, 
  Clock, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- DATA ---
const BEST_SELLING = [
  {
    id: 1,
    title: 'Zanskar Group Adventure From Delhi: Shinkhu La & Gonbo Rangjon',
    price: '₹9,499/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: '31 Jul, 7 Aug +8 batches',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Tirthan Valley Summer',
    price: '₹8,499/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: '30 Jul, 6 Aug +3 batches',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: '3D Kasol Kheerganga Trek: Ultimate Parvati Valley Group Trip',
    price: '₹9,499/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: '7 Aug, 14 Aug +2 batches',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: '5 Days Jibhi Manali Kasol Trip from Delhi | Himachal Community Tour',
    price: '₹14,999/-',
    duration: '4N/5D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
  },
];

const WEEKEND_BREAKS = [
  {
    id: 5,
    title: 'Kareri Lake Trek with Mcleodganj: 3 Days Trip From Delhi',
    price: '₹7,999/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Offbeat Shangarh Tour: Meadows, Waterfalls & Treks',
    price: '₹8,999/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Zanskar Group Adventure From Delhi: Shinkhu La & Gonbo Rangjon',
    price: '₹9,499/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: '31 Jul, 7 Aug +3 batches',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: '3D Bir Billing Escape: Paragliding, Rajgundha Valley & Prashar Lake',
    price: '₹11,499/-',
    duration: '2N/3D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  },
];

const EXTENDED_ESCAPES = [
  {
    id: 9,
    title: 'Mcleodganj Bir Tirthan',
    price: '₹20,499/-',
    duration: '4N/5D',
    location: 'Delhi - Delhi',
    dates: '26 Sep, 2 Oct',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    title: '5 Days Jibhi Manali Kasol Trip from Delhi | Himachal Community Tour',
    price: '₹14,999/-',
    duration: '4N/5D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 11,
    title: 'Bir Kasol Kheerganga',
    price: '₹18,999/-',
    duration: '4N/5D',
    location: 'Delhi - Delhi',
    dates: 'No Upcoming Batches',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
];

// --- CARD COMPONENT ---
const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate('/trips')}
      className="relative h-[420px] rounded-2xl overflow-hidden group shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between p-5 cursor-pointer border border-gray-100/10"
    >
      {/* Background Image with subtle zoom */}
      <img
        src={trip.image}
        alt={trip.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      
      {/* Multi-stage Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/20 group-hover:via-slate-950/50 transition-colors duration-300" />

      {/* Top Badge: Price Tag */}
      <div className="relative z-10 flex justify-end">
        <div className="bg-amber-400/95 backdrop-blur-md text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 group-hover:bg-amber-300 transition-colors">
          <span>{trip.price}</span>
          <span className="font-normal text-[10px] text-slate-800">onwards</span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 text-white space-y-3.5">
        {/* Title */}
        <h3 className="font-bold text-base line-clamp-2 leading-snug tracking-tight group-hover:text-amber-300 transition-colors duration-300">
          {trip.title}
        </h3>

        {/* Info Rows in Glass Card Container */}
        <div className="text-[12px] text-slate-200 space-y-2 font-medium bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{trip.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{trip.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-white/15">
            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{trip.dates}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function WeekendGetawaysPage() {
  return (
    <div className="min-h-screen bg-slate-100/70 font-sans text-slate-800 pb-20">
      
      {/* 1. HERO SECTION */}
      <div 
        className="relative h-[340px] md:h-[420px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
        <div className="relative z-10 px-4 max-w-3xl space-y-3">
          <span className="inline-block px-3 py-1 bg-amber-400/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
            Escape the Routine
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight drop-shadow-md">
            Weekend Getaways
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-200 drop-shadow">
            Unforgettable Weekend Trips 
          </p>
        </div>
      </div>

      {/* 2. FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 mb-16">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-slate-200/60">
          <h2 className="text-center text-2xl font-black text-slate-900 mb-8 tracking-tight">
            Why Travel With Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Feature 1 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-amber-500/10 rounded-2xl p-4 flex items-center justify-center text-amber-600 shadow-inner group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-10 h-10 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Top Notch</h3>
              <p className="font-semibold text-slate-500 text-sm">Hospitality</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-teal-500/10 rounded-2xl p-4 flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <Home className="w-10 h-10 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Beautiful</h3>
              <p className="font-semibold text-slate-500 text-sm">Handpicked Stays</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-sky-500/10 rounded-2xl p-4 flex items-center justify-center text-sky-600 shadow-inner group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                <Users className="w-10 h-10 stroke-[1.75]" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Fun Team Captains</h3>
              <p className="font-semibold text-slate-500 text-sm">Experienced Guides</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRIP SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        
        {/* Section: Best-Selling Weekend Trips */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-1.5 bg-amber-500 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Best-Selling Weekend Trips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {BEST_SELLING.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* Section: Perfect Long Weekend Breaks */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-1.5 bg-teal-600 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Perfect Long Weekend Breaks: 2N/ 3D Trips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {WEEKEND_BREAKS.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* Section: Beyond the Weekend: Extended Escapes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-1.5 bg-sky-600 rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Beyond the Weekend: Extended Escapes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {EXTENDED_ESCAPES.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}