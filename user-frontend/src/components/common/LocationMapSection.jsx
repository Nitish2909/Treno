
import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Navigation, 
  Clock, 
  Phone, 
  Mail, 
  Layers, 
  Maximize2, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function LocationMapSection() {
  const addressText = "SCO 98, Sector 4-5, Urban Estate, Karnal, Haryana 132001";
  const encodedAddress = encodeURIComponent(addressText);

  // Dynamic Map State
  const [mapType, setMapType] = useState('m'); // 'm' = Roadmap, 'k' = Satellite
  const [zoomLevel, setZoomLevel] = useState(16); // 16 = Street level
  const [activeTab, setActiveTab] = useState('location'); // 'location' | 'contact'
  const [copied, setCopied] = useState(false);

  // Dynamic Google Maps Embed URL
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;
  
  // Direct Action Links
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8 sm:py-14">
      <div className="relative group">
        
        {/* Soft Multi-color Ambient Glow Background */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-amber-600/20 rounded-[2.5rem] blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

        {/* Outer Wrapper Card */}
        <div className="relative rounded-[2rem] overflow-hidden border border-slate-200/90 bg-white shadow-2xl shadow-slate-300/40">
          
          {/* Top Status Header */}
          <div className="bg-slate-950 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-100 tracking-wide flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                Treno Headquarters
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Location</span>
              </div>
            </div>
          </div>

          {/* Interactive Map & Glass Card Canvas */}
          <div className="relative min-h-[480px] sm:min-h-[540px] w-full flex flex-col md:flex-row">
            
            {/* Embedded Interactive Google Map */}
            <div className="w-full h-[360px] md:h-auto md:absolute md:inset-0 bg-slate-100">
              <iframe
                title="Treno HQ Location on Google Maps"
                src={googleMapsEmbedUrl}
                className="w-full h-full border-0 contrast-[103%] transition-all duration-500"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Map Custom Control Overlay (Top Right Desktop) */}
            <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-lg text-white text-xs">
              <button
                onClick={() => setMapType(mapType === 'm' ? 'k' : 'm')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium ${
                  mapType === 'k' 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'hover:bg-white/10 text-slate-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {mapType === 'm' ? 'Satellite' : 'Roadmap'}
              </button>

              <div className="h-4 w-[1px] bg-white/20"></div>

              <button
                onClick={() => setZoomLevel(zoomLevel === 16 ? 18 : 16)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-all font-medium"
                title="Toggle Zoom Detail"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                {zoomLevel === 16 ? 'Close Up' : 'Default'}
              </button>
            </div>

            {/* Glassmorphic Multi-Tab Details Card */}
            <div className="p-4 sm:p-6 md:p-8 md:absolute md:top-6 md:left-6 md:max-w-md w-full z-10 pointer-events-none">
              <div className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/80 space-y-4">
                
                {/* Header Title */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white rounded-2xl shadow-lg shadow-amber-500/25">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                        Treno HQ
                      </h3>
                      <p className="text-amber-600 text-[11px] font-bold uppercase tracking-wider">
                        Corporate Office
                      </p>
                    </div>
                  </div>

                  {/* Navigation Tab Toggle */}
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('location')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === 'location'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Address
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        activeTab === 'contact'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      Contact
                    </button>
                  </div>
                </div>

                {/* Tab Content 1: Address Details */}
                {activeTab === 'location' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-100">
                      <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                        {addressText}
                      </p>
                    </div>

                    {/* Primary Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Navigation className="w-4 h-4 fill-current" />
                        Directions
                      </a>

                      <button
                        onClick={handleCopy}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-slate-500" />
                            <span>Copy Address</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tab Content 2: Contact Info */}
                {activeTab === 'contact' && (
                  <div className="space-y-3 py-1 animate-fadeIn">
                    <div className="flex items-center gap-3 p-3 bg-slate-50/90 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                      <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>+91-8816942362</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50/90 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                      <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Trenotravel@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50/90 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Mon - Sat: 9:30 AM - 6:00 PM IST</span>
                    </div>
                  </div>
                )}

                {/* Footer External App Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">View on app</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-amber-600 hover:text-amber-700 underline underline-offset-4"
                  >
                    Open Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}