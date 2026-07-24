import React from 'react';
import { 
  ShieldCheck, 
  Home, 
  Users, 
  Clock, 
  MapPin, 
  Calendar 
} from 'lucide-react';

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
  return (
    <div className="relative h-[420px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-4 cursor-pointer">
      {/* Background Image */}
      <img
        src={trip.image}
        alt={trip.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Top Badge: Price Tag */}
      <div className="relative z-10 flex justify-end">
        <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <span>{trip.price}</span>
          <span className="font-normal text-[10px] text-gray-800">onwards</span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 text-white space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 leading-snug">
          {trip.title}
        </h3>

        {/* Info Rows */}
        <div className="text-[11px] text-gray-300 space-y-1.5 font-light">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{trip.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{trip.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1 border-t border-white/20">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
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
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800 pb-16">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[300px] md:h-[380px] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
            Weekend Getaways
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-200">
            Weekend Trips From Delhi
          </p>
        </div>
      </div>

      {/* 2. FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-4 my-12">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Weekend Getaways From Delhi
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 mb-3 bg-amber-50 rounded-2xl p-4 flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-12 h-12 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Top Notch</h3>
            <p className="font-bold text-gray-800 text-lg">Hospitality</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 mb-3 bg-teal-50 rounded-2xl p-4 flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-105 transition-transform">
              <Home className="w-12 h-12 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Beautiful</h3>
            <p className="font-bold text-gray-800 text-lg">Handpicked Stays</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 mb-3 bg-sky-50 rounded-2xl p-4 flex items-center justify-center text-sky-600 shadow-sm group-hover:scale-105 transition-transform">
              <Users className="w-12 h-12 stroke-[1.5]" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mt-3">Fun Team Captains</h3>
          </div>
        </div>
      </section>

      {/* 3. TRIP SECTIONS CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Section: Best-Selling Weekend Trips */}
        <section>
          <h2 className="text-xl font-bold text-teal-900 mb-6">
            Best-Selling Weekend Trips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {BEST_SELLING.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* Section: Perfect Long Weekend Breaks */}
        <section>
          <h2 className="text-xl font-bold text-teal-900 mb-6">
            Perfect Long Weekend Breaks: 2N/ 3D Trips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {WEEKEND_BREAKS.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

        {/* Section: Beyond the Weekend: Extended Escapes */}
        <section>
          <h2 className="text-xl font-bold text-teal-900 mb-6">
            Beyond the Weekend: Extended Escapes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {EXTENDED_ESCAPES.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}