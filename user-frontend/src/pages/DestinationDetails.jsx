
import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowLeft, 
  Calendar, 
  Compass, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  PlusCircle,
  Package,
  ArrowRight
} from 'lucide-react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useGetDestinationByIdQuery } from '../store/api/destinationApi';
import TripCard from '../components/trip/TripCard';


const DestinationDetails = ({ destination: propDestination, TripCardCustom }) => {
  const { state } = useLocation();
  const { city } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetDestinationByIdQuery(city, { skip: !city });
  
  let destination = data?.data || [];

  const [activeImage, setActiveImage] = useState(destination?.image);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  if (isLoading && !destination) {
    return (
      <div className="max-w-6xl mx-auto p-12 text-center text-gray-500 animate-pulse">
        Loading destination details...
      </div>
    );
  }

  if (!destination) return null;

  // Normalization: Ensure trips is treated as an array regardless of key format
  const tripsList = destination.trips || destination.packages || (Array.isArray(destination) ? destination : []);

  const toggleAddOn = (addonId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const onBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/destinations');
    }
  };

  const addOnsTotal = destination.addOns
    ? destination.addOns
        .filter((addon) => selectedAddOns.includes(addon.id))
        .reduce((sum, addon) => sum + addon.price, 0)
    : 0;

  const totalPrice = (destination.pricing?.discountedPrice || 0) + addOnsTotal;


  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 animate-fadeIn">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Destinations
      </button>

      {/* Hero Banner */}
      <div className="relative h-[350px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl mb-6">
        <img 
          src={activeImage || destination.destination.image} 
          alt={destination.destination.name} 
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        
        <div className="absolute top-6 left-6 flex flex-wrap gap-2">
          {destination.destination.badge && (
            <span className="bg-amber-500 text-black text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
              {destination.destination.badge}
            </span>
          )}
          {destination.destination.pricing?.discountPercentage && (
            <span className="bg-red-500 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
              {destination.destination.pricing.discountPercentage}
            </span>
          )}
        </div>

      </div>


      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Details (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About {destination.destination.name}</h2>
            <p className="text-gray-600 leading-relaxed">{destination.destination.description}</p>
          </div>

          {destination.destination.highlights && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl text-gray-700 text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}


          {destination.addOns && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-500" /> Experience Upgrades & Add-ons
              </h3>
              <p className="text-xs text-gray-500 mb-4">Enhance your itinerary by selecting optional extra activities.</p>
              <div className="space-y-3">
                {destination.addOns.map((addon) => {
                  const isSelected = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50/40 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                        />
                        <span className="text-sm font-medium text-gray-800">{addon.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">+₹{addon.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info & Booking CTA */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-amber-100 sticky top-6 space-y-5">
            {destination.destination.pricing && (
              <div className="border-b pb-4">
                <span className="text-xs text-gray-400 font-medium uppercase block">Starting from</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                  {destination.destination.pricing.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{(destination.destination.pricing.originalPrice + addOnsTotal).toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-600">
                    / person
                  </span>
                </div>
                
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Trip Highlights</h4>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase">Best Season</p>
                  <p className="text-sm font-semibold text-gray-700">{destination.destination.bestTimeToVisit}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase">Known For</p>
                  <p className="text-sm font-semibold text-gray-700">{destination.destination.knownFor}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TRIP CARDS SECTION */}
      <div className="border-t border-gray-200 pt-10 mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-sm font-bold uppercase tracking-wider">
              <Package className="w-4 h-4" /> Available Trips
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
              Top Curated Packages for {destination.destination.name}
            </h2>
          </div>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full self-start md:self-auto font-medium">
            {tripsList.length} {tripsList.length === 1 ? 'Trip' : 'Trips'} Available
          </span>
        </div>

        {tripsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tripsList.map((tripItem, index) => (
              <TripCard key={tripItem._id || tripItem.id || index} trip={tripItem} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
            <Package className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No active trips listed right now</h3>
            <p className="text-sm text-gray-500 mt-1">
              Check back soon or contact support for customized itineraries to {destination.destination.name}.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};


export default DestinationDetails;