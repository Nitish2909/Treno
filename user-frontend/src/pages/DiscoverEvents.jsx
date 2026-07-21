import React, { useState, useEffect } from "react";

const eventsData = [
  {
    id: 1,
    title: "Oktoberfest Munich",
    subtitle: "Munich",
    price: "₹2,09,990/-",
    heroImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    description:
      "Travel through Europe's most charming cities before reaching Munich's Oktoberfest - world's best beer celebration. Start in Prague's historic streets and Old Town magic, then cruise Budapest's Danube river while exploring grand palaces and vibrant nightlife. Discover Salzburg's baroque charm and Hallstatt's stunning alpine views before arriving in Munich for the legendary Oktoberfest. Step into giant tents filled with music, laughter, Bavarian food, and endless beer. Locals in traditional lederhosen and dirndls welcome you with songs and cheers. It's not just about beer - it's about German culture, parades, folk dances, and making friends from around the world.",
    upcomingEvent: {
      date: "15 Sep-2026",
      title: "11 Days Europe Trip with Oktoberfest | Community Trip",
      duration: "10 NIGHTS 11 DAYS",
      route: "Prague International Airport - Munich International Airport",
      breakdown: "3N Prague • 3N Budapest • 2N Salzburg • 2N Munich",
      features: ["Stay", "Breakfast", "Sightseeing & Activities", "Event ticket"],
      additionalFeatures: ["Local Transport", "Trip Assistance"],
    },
    guide: {
      venue: "Munich, Germany",
      crowd: "70,000 attendees",
      type: "Beer Festival",
      ticket: "Included",
    },
    gallery: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400",
    ],
  },
  {
    id: 2,
    title: "Zamna Festival",
    subtitle: "(Bali)",
    price: "₹1,49,990/-",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    description: "Experience the immersive underground music festival in Bali.",
    upcomingEvent: null,
    guide: { venue: "Bali, Indonesia", crowd: "25,000 attendees", type: "Music Festival", ticket: "Included" },
    gallery: [],
  },
  {
    id: 3,
    title: "Tomorrowland",
    subtitle: "(Thailand)",
    price: "₹1,89,990/-",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    description: "Step into the world of magical music and high energy stages.",
    upcomingEvent: null,
    guide: { venue: "Pattaya, Thailand", crowd: "100,000 attendees", type: "EDM Festival", ticket: "Included" },
    gallery: [],
  },
  {
    id: 4,
    title: "Ziro Festival",
    subtitle: "Arunachal",
    price: "₹45,000/-",
    heroImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    description: "Eco-friendly outdoor music festival in the valley of Arunachal Pradesh.",
    upcomingEvent: null,
    guide: { venue: "Ziro, India", crowd: "10,000 attendees", type: "Indie Music", ticket: "Included" },
    gallery: [],
  },
  {
    id: 5,
    title: "BTS Experience",
    subtitle: "(Singapore)",
    price: "₹99,990/-",
    heroImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800",
    description: "Live the ultimate K-pop concert and fan experience.",
    upcomingEvent: null,
    guide: { venue: "Singapore Stadium", crowd: "50,000 attendees", type: "Concert", ticket: "Included" },
    gallery: [],
  },
  {
    id: 6,
    title: "Exit Festival",
    subtitle: "(Egypt)",
    price: "₹1,20,000/-",
    heroImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    description: "Unforgettable music festival right by the Great Pyramids.",
    upcomingEvent: null,
    guide: { venue: "Giza, Egypt", crowd: "40,000 attendees", type: "Music Festival", ticket: "Included" },
    gallery: [],
  },
];

export default function DiscoverEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Keyboard Navigation & Scroll Lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      }
    };

    if (selectedEvent) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent]);

  return (
    <div className="bg-[#0b0f12] text-white min-h-screen p-6 md:p-12 relative font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            Discover Events:
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-1">
            Beyond Ordinary, Live The Story Worth Telling!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
          {eventsData.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-full aspect-square rounded-3xl overflow-hidden mb-3 bg-gray-800 transition-transform duration-300 group-hover:scale-105">
                <img
                  src={event.heroImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center font-bold text-sm md:text-base leading-tight">
                <div>{event.title}</div>
                {event.subtitle && (
                  <div className="text-gray-400 font-normal">{event.subtitle}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedEvent && (
        <div
          onClick={(e) => e.target === e.currentTarget && setSelectedEvent(null)}
          className="fixed inset-0 z-50 flex justify-center items-start sm:items-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto"
        >
          {/* Close button outside container for desktop */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="hidden sm:flex fixed top-6 right-8 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-50 transition"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Box */}
          <div className="relative w-full max-w-xl bg-[#121619] rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-800 my-0 sm:my-8 text-sm">
            {/* Mobile Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="sm:hidden absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Hero Banner Section */}
            <div className="relative h-72 sm:h-80 w-full">
              <img
                src={selectedEvent.heroImage}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121619] via-black/40 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedEvent.title}
                </h1>
                <p className="text-xs text-gray-300 mt-1 uppercase tracking-wider font-semibold">
                  Starts From
                </p>
                <div className="text-xl font-bold text-white">
                  {selectedEvent.price}{" "}
                  <span className="text-xs font-normal text-gray-300">
                    * Per Person
                  </span>
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-5 space-y-10">
              {/* Event Overview Text */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Upcoming Events Card */}
              {selectedEvent.upcomingEvent && (
                <div className="">
                  <div className="flex items-center gap-3 mb-4 mt-64">
                    <video src="https://www.pexels.com/download/video/34158991/" autoPlay loop playsInline muted />
                    <h3 className="font-bold text-base whitespace-nowrap">
                      Upcoming Events
                    </h3>
                    <div className="h-[1px] bg-gray-700 w-full" />
                  </div>
                  <div className="bg-[#181d21] rounded-xl p-4 border border-gray-800 space-y-3">
                    
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-black/60 px-2.5 py-1 rounded-md text-gray-200 font-semibold border border-gray-700">
                        {selectedEvent.upcomingEvent.date}
                      </span>
                      
                      <span className="font-medium text-gray-300 truncate">
                        {selectedEvent.upcomingEvent.title}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src={selectedEvent.heroImage}
                        alt="Thumbnail"
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="space-y-1 text-xs text-gray-300">
                        <p className="font-bold text-white text-xs">
                          {selectedEvent.upcomingEvent.duration} |{" "}
                          <span className="font-normal text-gray-400">
                            {selectedEvent.upcomingEvent.route}
                          </span>
                        </p>
                        <span className="inline-block bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-300">
                          {selectedEvent.upcomingEvent.breakdown}
                        </span>

                        <div className="flex flex-wrap gap-x-2 gap-y-1 pt-1 text-[11px] text-gray-300">
                          {selectedEvent.upcomingEvent.features.map((feat, i) => (
                            <span key={i} className="flex items-center gap-1">
                              <span className="text-green-400">✓</span> {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2.5 rounded-lg text-sm transition">
                      Book Now
                    </button>
                  </div>
                </div>
              )}

              {/* Event Guide */}
              {selectedEvent.guide && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-base whitespace-nowrap">
                      Event Guide
                    </h3>
                    <div className="h-[1px] bg-gray-700 w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-[#181d21] p-2.5 rounded-xl border border-gray-800">
                      <div className="bg-cyan-950/60 text-cyan-400 p-2 rounded-lg">📍</div>
                      <div>
                        <div className="text-[11px] text-gray-400">Venue</div>
                        <div className="text-xs font-semibold">{selectedEvent.guide.venue}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-2.5 rounded-xl border border-gray-800">
                      <div className="bg-cyan-950/60 text-cyan-400 p-2 rounded-lg">👥</div>
                      <div>
                        <div className="text-[11px] text-gray-400">Crowd</div>
                        <div className="text-xs font-semibold">{selectedEvent.guide.crowd}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-2.5 rounded-xl border border-gray-800">
                      <div className="bg-cyan-950/60 text-cyan-400 p-2 rounded-lg">🌴</div>
                      <div>
                        <div className="text-[11px] text-gray-400">Event Type</div>
                        <div className="text-xs font-semibold">{selectedEvent.guide.type}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-2.5 rounded-xl border border-gray-800">
                      <div className="bg-cyan-950/60 text-cyan-400 p-2 rounded-lg">🎟️</div>
                      <div>
                        <div className="text-[11px] text-gray-400">Event Ticket</div>
                        <div className="text-xs font-semibold">{selectedEvent.guide.ticket}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Event Gallery */}
              {selectedEvent.gallery?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-base whitespace-nowrap">
                      Event Gallery
                    </h3>
                    <div className="h-[1px] bg-gray-700 w-full" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 row-span-2 rounded-xl overflow-hidden h-48 sm:h-56">
                      <img
                        src={selectedEvent.gallery[0]}
                        alt="Gallery Large"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedEvent.gallery.slice(1, 5).map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden h-[92px] sm:h-[108px]">
                        <img
                          src={img}
                          alt={`Gallery ${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Tagline */}
              <div className="pt-2">
                <p className="text-xs text-gray-400 font-medium">Live the dream!</p>
                <h4 className="text-lg font-bold text-gray-200 mt-1">
                  European Charm, Culture & The World's Best Beer Fest
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}