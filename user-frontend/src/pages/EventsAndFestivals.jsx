import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Check,
  Ticket,
} from "lucide-react";
import DiscoverEvents from "./DiscoverEvents";
import { Link, useNavigate } from "react-router-dom";

const HERO_SLIDES = [
  {
    title: "11 Days Europe Trip with Oktoberfest",
    subtitle:
      "Experience authentic Bavarian culture, scenic alpine views, and lively community celebrations.",
    tag: "Community Trip",
    duration: "11 Days / 10 Nights",
    location: "Munich & Central Europe",
    videoUrl: "https://www.pexels.com/download/video/34158991/",
  },
  {
    title: "8 Days Bali with Gili Island Trip",
    subtitle:
      "Zamna Festival Edition — dive into crystal waters, island vibes, and world-class soundscapes.",
    tag: "Festival Special",
    duration: "8 Days / 7 Nights",
    location: "Bali & Gili Islands",
    videoUrl: "https://www.pexels.com/download/video/33628595/",
  },
  {
    title: "Magic of Tomorrowland & Thailand",
    subtitle:
      "Bucket list journey combining high-energy festival nights with Bangkok's vibrant city life.",
    tag: "Bucket List",
    duration: "9 Days / 8 Nights",
    location: "Bangkok & Pattaya",
    videoUrl: "https://www.pexels.com/download/video/14670415/",
  },
  {
    title: "10 Days Alpine Wonders & Scenic Trains",
    subtitle:
      "Traverse snow-capped Swiss peaks, turquoise glacial lakes, and world-famous mountain passes.",
    tag: "Adventure Special",
    duration: "10 Days / 9 Nights",
    location: "Switzerland & Italian Lakes",
    videoUrl: "https://www.pexels.com/download/video/3015510/",
  },
  {
    title: "7 Days Cherry Blossoms & Neon Lights",
    subtitle:
      "Immerse yourself in Tokyo's futuristic skyline, historic shrines, and blooming spring gardens.",
    tag: "Cultural Expedition",
    duration: "7 Days / 6 Nights",
    location: "Tokyo, Kyoto & Mt. Fuji",
    videoUrl: "https://www.pexels.com/download/video/5737256/",
  },
];

const MONTHLY_EVENTS = {
  september: [
    {
      id: "sep-1",
      dateDay: "15",
      dateMonth: "Sep",
      category: "OKTOBERFEST MUNICH",
      title: "11 Days Europe Trip with Oktoberfest | Community Trip",
      duration: "10 NIGHTS 11 DAYS",
      route: "Prague International Airport - Munich International Airport",
      stops: ["3N Prague", "3N Budapest", "2N Salzburg", "2N Munich"],
      inclusions: [
        "Stay",
        "Breakfast",
        "Sightseeing & Activities",
        "Event ticket",
        "Local Transport",
        "Trip Assistance",
      ],
      badge: "Event Tickets Additional",
      price: "2,09,990/-",
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "sep-2",
      dateDay: "23",
      dateMonth: "Sep",
      category: "ZIRO FESTIVAL",
      title: "7 Days Ziro Music Festival Tour Package",
      duration: "6 NIGHTS 7 DAYS",
      route: "Guwahati Airport/Khanapara - Guwahati Airport/Khanapara",
      stops: [
        "Guwahati",
        "Tezpur",
        "Ziro Valley",
        "Ziro Valley Music Festival",
        "Apatani Tribal Village",
        "Guwahati",
      ],
      inclusions: [
        "Stay",
        "Breakfast",
        "Sightseeing & Activities",
        "Local Transport",
        "Trip Assistance",
      ],
      price: "44,999/-",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    },
  ],
  october: [
    {
      id: "oct-1",
      dateDay: "12",
      dateMonth: "Oct",
      category: "ZAMNA BALI",
      title: "8 Days Bali with Gili Island Trip | Zamna Festival Edition",
      duration: "7 NIGHTS 8 DAYS",
      route:
        "Ngurah Rai International Airport - Ngurah Rai International Airport",
      stops: ["3N Seminyak", "2N Gili Trawangan", "2N Ubud"],
      inclusions: [
        "Stay",
        "Breakfast",
        "Sightseeing & Activities",
        "Event ticket",
        "Local Transport",
      ],
      badge: "Festival Pass Included",
      price: "89,990/-",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    },
  ],
  december: [
    {
      id: "dec-1",
      dateDay: "28",
      dateMonth: "Dec",
      category: "NEW YEAR SPECIAL",
      title: "6 Days Northern Lights & Arctic New Year Celebration",
      duration: "5 NIGHTS 6 DAYS",
      route: "Keflavík International Airport - Keflavík International Airport",
      stops: ["3N Reykjavík", "2N Golden Circle"],
      inclusions: [
        "Stay",
        "Breakfast",
        "Sightseeing & Activities",
        "Local Transport",
        "Trip Assistance",
      ],
      price: "1,45,000/-",
      image:
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
    },
  ],
};

const ALL_PACKAGES = [
  {
    id: "pkg-1",
    duration: "10 NIGHTS 11 DAYS",
    date: "15 SEPTEMBER 2026",
    category: "Oktoberfest Munich",
    title: "11 Days Europe Trip with Oktoberfest | Community Trip",
    stops: ["3N Prague", "3N Budapest", "2N Salzburg", "2N Munich"],
    price: "2,09,990/-",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "pkg-2",
    duration: "7 NIGHTS 8 DAYS",
    date: "11 OCTOBER 2026",
    category: "Zamna Festival (Bali)",
    title: "8 Days Bali With Gili Island Trip - Zamna Festival Edition",
    stops: ["Ubud", "ATV Ride", "Bali Swing", "Gili Island", "Kuta", "Za..."],
    price: "62,999/-",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "pkg-3",
    duration: "5 NIGHTS 6 DAYS",
    date: "10 DECEMBER 2026",
    category: "Tomorrowland (Thailand)",
    title: "Magic of Tomorrowland: Bucket List Thailand Trip with Bangkok",
    stops: ["Bangkok", "Pattaya", "Tomorrowland Festival", "Bangkok"],
    price: "2,29,990/-",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "pkg-4",
    duration: "6 NIGHTS 7 DAYS",
    date: "23 SEPTEMBER 2026",
    category: "Ziro Festival",
    title: "7 Days Ziro Music Festival Tour Package",
    stops: ["Guwahati", "Tezpur", "Ziro Valley", "Ziro Valley Music Fest..."],
    price: "44,999/-",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
  },
];

export default function EventsAndFestivals() {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () =>
    setActiveSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );

  return (
    <section className="relative w-full min-h-screen bg-slate-950 text-white overflow-hidden py-12 px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center mt-7">
      <style>{`
        @keyframes sliderProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* 1. BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Travel Background"
          className="w-full h-full object-cover object-center scale-105 filter blur-sm opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full z-0" />
      <div className="absolute top-3/4 left-1/3 w-[400px] h-[300px] bg-orange-600/10 blur-[130px] pointer-events-none rounded-full z-0" />

      {/* 2. HERO SLIDER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto rounded-3xl group/slider min-h-[560px] sm:min-h-[580px] md:min-h-[480px] lg:min-h-[540px] bg-slate-900/80 border border-slate-700/50 shadow-2xl shadow-amber-500/5 backdrop-blur-2xl overflow-hidden ring-1 ring-white/10">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={index}
              data-active={isActive}
              className={`absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto scale-100"
                  : "opacity-0 z-0 pointer-events-none scale-[0.98]"
              }`}
            >
              <div
                className={`col-span-1 md:col-span-7 lg:col-span-6 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 py-10 z-10 transition-all duration-700 ease-out ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25">
                    <Sparkles className="w-3.5 h-3.5" />
                    {slide.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700/80 text-amber-300 backdrop-blur-md shadow-inner">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {slide.duration}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-sm">
                  {slide.title}
                </h1>

                <p className="mt-3.5 text-xs sm:text-sm text-slate-300/90 font-normal leading-relaxed max-w-lg">
                  {slide.subtitle}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => {
                      navigate("/trips");
                    }}
                    className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/30 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Explore Packages</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 backdrop-blur-md shadow-inner hover:border-slate-600 transition-colors">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate font-medium">
                      {slide.location}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`col-span-1 md:col-span-5 lg:col-span-6 w-full h-full relative order-first md:order-last overflow-hidden transition-all duration-1000 ease-in-out ${
                  isActive ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              >
                <video
                  key={slide.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center"
                  src={slide.videoUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent md:bg-gradient-to-r md:from-slate-900 md:via-slate-900/40 md:to-transparent" />
              </div>
            </div>
          );
        })}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/60 border border-white/15 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:bg-amber-400 hover:border-amber-400 hover:text-slate-950 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 hidden md:flex cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/60 border border-white/15 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:bg-amber-400 hover:border-amber-400 hover:text-slate-950 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/30 hidden md:flex cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-6 sm:left-10 md:left-12 flex items-center gap-2.5 z-30">
          {HERO_SLIDES.map((_, index) => {
            const isCurrent = index === activeSlide;
            return (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 bg-slate-800/90 border border-slate-700/80 cursor-pointer ${
                  isCurrent ? "w-16 bg-slate-800" : "w-3 hover:bg-slate-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {isCurrent && (
                  <span
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-sm shadow-amber-500/50"
                    style={{
                      animation: "sliderProgress 5500ms linear forwards",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DISCOVER EVENTS SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-8">
        <DiscoverEvents />
      </div>

      {/* MONTHLY EVENTS LIST SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-14 flex flex-col gap-12">
        <MonthEventSection
          monthTitle="SEPTEMBER-2026"
          events={MONTHLY_EVENTS.september}
        />
        <MonthEventSection
          monthTitle="OCTOBER-2026"
          events={MONTHLY_EVENTS.october}
        />
        <MonthEventSection
          monthTitle="DECEMBER-2026"
          events={MONTHLY_EVENTS.december}
        />
      </div>

      {/* EXPLORE ALL EVENT PACKAGES SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
        {/* Header with Title and Nav Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-800 to-slate-800" />
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.25em] text-amber-400/90 uppercase px-6 text-center drop-shadow-sm">
            EXPLORE ALL EVENT PACKAGES
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-slate-800 to-slate-800" />
        </div>

        {/* Carousel Container */}
        <div className="relative group/cards">
          {/* Left Arrow */}
          <button className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-amber-400 hover:bg-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xl shadow-black/50">
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Cards Grid / Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            {ALL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="group flex flex-col bg-slate-900/70 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 backdrop-blur-md"
              >
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/70 backdrop-blur-md border border-white/10 text-amber-400">
                    {pkg.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Meta header */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pb-2 border-b border-slate-800/50">
                      <span className="text-amber-400/90 font-semibold">
                        {pkg.duration}
                      </span>
                      <span>{pkg.date}</span>
                    </div>

                    {/* Title */}
                    <p className="text-xs font-semibold text-slate-100 mt-3 line-clamp-2 leading-relaxed group-hover:text-amber-300 transition-colors">
                      {pkg.title}
                    </p>

                    {/* Stop tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                      {pkg.stops.map((stop, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-300"
                        >
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-6 flex items-center justify-between pt-3.5 border-t border-slate-800/60">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block leading-none tracking-wider">
                        STARTS FROM
                      </span>
                      <span className="text-sm font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                        {pkg.price}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {" "}
                        /Per Person
                      </span>
                    </div>
                    <Link
                      to="/trips"
                      onClick={() => window.scrollTo(0, 0)}
                      className="px-4 py-1.5 rounded-full border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-400 hover:text-slate-950 text-xs text-amber-300 font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:shadow-amber-500/20"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:border-amber-400 hover:bg-slate-900 flex items-center justify-center transition-all cursor-pointer shadow-xl shadow-black/50">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-6 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors" />
        </div>
      </div>
    </section>
  );
}

function MonthEventSection({ monthTitle, events }) {
  if (!events || events.length === 0) return null;

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="text-xs font-bold tracking-[0.2em] text-amber-400/90 uppercase">
          {monthTitle}
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 via-slate-800/60 to-transparent" />
      </div>

      <div className="flex flex-col gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="group relative flex gap-4 sm:gap-6 items-start p-4 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-900/70 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3 pt-1 shrink-0">
              <div className="flex flex-col items-center justify-center bg-slate-800/70 border border-slate-700/60 p-2.5 rounded-xl shadow-inner min-w-[50px]">
                <Calendar className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-xl sm:text-2xl font-black text-white leading-none">
                  {event.dateDay}
                </span>
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider mt-0.5">
                  {event.dateMonth}
                </span>
              </div>
              <div className="w-1.5 h-full min-h-[120px] bg-gradient-to-b from-amber-400 to-orange-500 rounded-full ml-1 hidden sm:block opacity-80" />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">
              <div className="relative w-full lg:w-56 h-40 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 bg-slate-900 shadow-md">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col items-center justify-end p-3 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {event.category.split(" ")[0]}
                  </span>
                  <span className="text-sm font-black text-white leading-tight drop-shadow-sm">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between h-full py-0.5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400/90">
                    {event.category}
                  </h3>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-amber-200 transition-colors">
                    {event.title}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium mt-1.5">
                    {event.duration}{" "}
                    <span className="text-slate-600 font-normal">|</span>{" "}
                    {event.route}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                    {event.stops.map((stop, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-800/90 text-slate-300 border border-slate-700/60 shadow-xs"
                      >
                        {stop}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 mt-4 text-xs text-slate-300">
                    {event.inclusions.map((inc, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{inc}</span>
                      </span>
                    ))}
                    {event.badge && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                        <Ticket className="w-3 h-3 text-amber-400" />
                        {event.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 pt-3 border-t border-slate-800/60">
                  <Link
                    to="/trips"
                    onClick={() => window.scrollTo(0, 0)}
                    className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
                  >
                    Book Now
                  </Link>
                  <div className="text-xs text-slate-400">
                    STARTS FROM{" "}
                    <span className="text-base font-extrabold text-white ml-1">
                      {event.price}
                    </span>{" "}
                    /Per Person
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
