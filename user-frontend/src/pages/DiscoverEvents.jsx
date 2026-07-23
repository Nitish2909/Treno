import React, { useState, useEffect } from "react";

const eventsData = [
  {
    id: 1,
    title: "Oktoberfest Munich",
    subtitle: "Munich",
    price: "₹2,09,990/-",
    credit: "Credit : Oktoberfest Munich",
    heroImage:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    description:
      "Travel through Europe's most charming cities before reaching Munich's Oktoberfest - world's best beer celebration. Start in Prague's historic streets, then cruise Budapest's Danube river before arriving in Munich for legendary tents filled with music, Bavarian food, and endless beer.",
    tagline: "European Charm, Culture & The World's Best Beer Fest",
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
    ],
  },
  {
    id: 2,
    title: "Zamna Festival (Bali)",
    subtitle: "(Bali)",
    price: "₹62,999/-",
    credit: "Credit : Savaya Bali",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    description:
      "Imagine exploring Bali's tropical beauty by day and dancing above the ocean by night. This Zamna Festival Special Bali Trip is where island adventures meet one of the world's most iconic electronic music festivals. Wander through Ubud and Kuta, swing over lush rice terraces, ride ATVs, and escape to Gili Islands.",
    tagline: "Island Adventures, Cliffside Vibe & World Class Beats",
    upcomingEvent: {
      date: "11 Oct-2026",
      title: "8 Days Bali With Gili Island Trip - Zamna Festival Edition",
      duration: "7 NIGHTS 8 DAYS",
      route: "Ngurah Rai International Airport - Ngurah Rai Int...",
      breakdown: "Ubud • ATV Ride • Bali Swing • Gili Island • Kuta • Zamna Festival",
      features: ["Stay", "Breakfast", "Sightseeing & Activities", "Event Ticket"],
      additionalFeatures: ["Local Transport", "Trip Assistance"],
    },
    guide: {
      venue: "Bali",
      crowd: "50,000 attendees",
      type: "Electronic Music Festival",
      ticket: "Included",
    },
    gallery: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400",
    ],
  },
  {
    id: 3,
    title: "Tomorrowland",
    subtitle: "(Thailand)",
    price: "₹1,89,990/-",
    credit: "Credit : Tomorrowland Official",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    description:
      "Step into the world of magical music, high-energy stages, and world-renowned DJs in Pattaya, Thailand.",
    tagline: "The Magic of Tomorrowland in Tropical Paradise",
    upcomingEvent: {
      date: "05 Nov-2026",
      title: "6 Days Pattaya & Bangkok - Tomorrowland Special",
      duration: "5 NIGHTS 6 DAYS",
      route: "Suvarnabhumi Airport - Suvarnabhumi Airport",
      breakdown: "3N Pattaya • 2N Bangkok",
      features: ["Stay", "Breakfast", "Sightseeing", "Event Ticket"],
      additionalFeatures: ["Local Transport"],
    },
    guide: {
      venue: "Pattaya, Thailand",
      crowd: "100,000 attendees",
      type: "EDM Festival",
      ticket: "Included",
    },
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
    ],
  },
];

export default function DiscoverEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
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
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
            Discover Events:
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-1">
            Beyond Ordinary, Live The Story Worth Telling!
          </p>
        </div>

        {/* Grid */}
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
                  <div className="text-gray-400 font-normal">
                    {event.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedEvent && (
        <div
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedEvent(null)
          }
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
        >
          {/* Close button Desktop */}
          <button
            onClick={() => setSelectedEvent(null)}
            className="hidden sm:flex fixed top-6 right-8 bg-white text-black font-bold w-8 h-8 rounded-full items-center justify-center z-50 hover:bg-gray-200 transition"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-lg max-h-[90vh] bg-[#121619] rounded-2xl overflow-y-auto shadow-2xl border border-gray-800 text-sm my-auto scrollbar-thin scrollbar-thumb-gray-700">
            {/* Close button Mobile */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="sm:hidden absolute top-4 right-4 z-30 bg-white text-black font-bold w-7 h-7 rounded-full flex items-center justify-center"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Hero Image Section */}
            <div className="relative h-64 sm:h-72 w-full">
              {selectedEvent.credit && (
                <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-gray-200">
                  {selectedEvent.credit}
                </div>
              )}
              <img
                src={selectedEvent.heroImage}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121619] via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-5 right-5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedEvent.title}
                </h1>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">
                  STARTS FROM
                </p>
                <div className="text-xl font-bold text-white">
                  {selectedEvent.price}{" "}
                  <span className="text-xs font-normal text-gray-400">
                    - Per Person
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-6">
              <p className="text-gray-300 text-xs leading-relaxed">
                {selectedEvent.description}
              </p>

              {/* Upcoming Events Section */}
              {selectedEvent.upcomingEvent && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-sm whitespace-nowrap text-white">
                      Upcoming Events
                    </h3>
                    <div className="h-[1px] bg-gray-800 w-full" />
                  </div>

                  <div className="bg-[#181d21] rounded-xl p-4 border border-gray-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-black px-2.5 py-1 rounded-md text-gray-200 font-semibold border border-gray-700 text-[11px]">
                        {selectedEvent.upcomingEvent.date}
                      </span>
                      <span className="font-semibold text-white truncate text-xs">
                        {selectedEvent.upcomingEvent.title}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <img
                        src={selectedEvent.heroImage}
                        alt="Thumbnail"
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="space-y-1 text-xs text-gray-300">
                        <p className="font-bold text-white text-[11px]">
                          {selectedEvent.upcomingEvent.duration} |{" "}
                          <span className="font-normal text-gray-400">
                            {selectedEvent.upcomingEvent.route}
                          </span>
                        </p>
                        <span className="inline-block bg-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-300 font-medium">
                          {selectedEvent.upcomingEvent.breakdown}
                        </span>

                        <div className="flex flex-wrap gap-x-2 gap-y-1 pt-1 text-[10px] text-gray-300">
                          {selectedEvent.upcomingEvent.features.map(
                            (feat, i) => (
                              <span key={i} className="flex items-center gap-1">
                                <span className="text-green-400">✓</span> {feat}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-black font-bold py-2.5 rounded-xl text-xs transition">
                      Book Now
                    </button>
                  </div>
                </div>
              )}

              {/* Event Guide */}
              {selectedEvent.guide && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-sm whitespace-nowrap text-white">
                      Event Guide
                    </h3>
                    <div className="h-[1px] bg-gray-800 w-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-3 bg-[#181d21] p-3 rounded-xl border border-gray-800">
                      <div className="bg-white text-black p-1.5 rounded-full text-xs font-bold w-7 h-7 flex items-center justify-center">
                        📍
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">Venue</div>
                        <div className="text-xs font-semibold text-white">
                          {selectedEvent.guide.venue}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-3 rounded-xl border border-gray-800">
                      <div className="bg-white text-black p-1.5 rounded-full text-xs font-bold w-7 h-7 flex items-center justify-center">
                        👥
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">Crowd</div>
                        <div className="text-xs font-semibold text-white">
                          {selectedEvent.guide.crowd}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-3 rounded-xl border border-gray-800">
                      <div className="bg-white text-black p-1.5 rounded-full text-xs font-bold w-7 h-7 flex items-center justify-center">
                        🌴
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">
                          Event Type
                        </div>
                        <div className="text-xs font-semibold text-white">
                          {selectedEvent.guide.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#181d21] p-3 rounded-xl border border-gray-800">
                      <div className="bg-white text-black p-1.5 rounded-full text-xs font-bold w-7 h-7 flex items-center justify-center">
                        🎟️
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400">
                          Event Ticket
                        </div>
                        <div className="text-xs font-semibold text-white">
                          {selectedEvent.guide.ticket}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Event Gallery */}
              {selectedEvent.gallery?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-sm whitespace-nowrap text-white">
                      Event Gallery
                    </h3>
                    <div className="h-[1px] bg-gray-800 w-full" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 row-span-2 rounded-xl overflow-hidden h-44 sm:h-52">
                      <img
                        src={selectedEvent.gallery[0]}
                        alt="Gallery main"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedEvent.gallery.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden h-20 sm:h-24"
                      >
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

              {/* Dynamic Tagline */}
              {selectedEvent.tagline && (
                <div className="pt-2">
                  <p className="text-xs text-gray-400 font-medium">
                    Live the dream!
                  </p>
                  <h4 className="text-base font-bold text-gray-200 mt-0.5">
                    {selectedEvent.tagline}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}