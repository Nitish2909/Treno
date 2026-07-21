import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Users,
  Compass
} from "lucide-react";
import DiscoverEvents from "./DiscoverEvents";

const HERO_SLIDES = [
  {
    title: "11 Days Europe Trip with Oktoberfest",
    subtitle: "Experience authentic Bavarian culture, scenic alpine views, and lively community celebrations.",
    tag: "Community Trip",
    duration: "11 Days / 10 Nights",
    location: "Munich & Central Europe",
    videoUrl: "https://www.pexels.com/download/video/34158991/",
  },
  {
    title: "8 Days Bali with Gili Island Trip",
    subtitle: "Zamna Festival Edition — dive into crystal waters, island vibes, and world-class soundscapes.",
    tag: "Festival Special",
    duration: "8 Days / 7 Nights",
    location: "Bali & Gili Islands",
    videoUrl: "https://www.pexels.com/download/video/33628595/",
  },
  {
    title: "Magic of Tomorrowland & Thailand",
    subtitle: "Bucket list journey combining high-energy festival nights with Bangkok's vibrant city life.",
    tag: "Bucket List",
    duration: "9 Days / 8 Nights",
    location: "Bangkok & Pattaya",
    videoUrl: "https://www.pexels.com/download/video/14670415/",
  },
  {
    title: "10 Days Alpine Wonders & Scenic Trains",
    subtitle: "Traverse snow-capped Swiss peaks, turquoise glacial lakes, and world-famous mountain passes.",
    tag: "Adventure Special",
    duration: "10 Days / 9 Nights",
    location: "Switzerland & Italian Lakes",
    videoUrl: "https://www.pexels.com/download/video/3015510/",
  },
  {
    title: "7 Days Cherry Blossoms & Neon Lights",
    subtitle: "Immerse yourself in Tokyo's futuristic skyline, historic shrines, and blooming spring gardens.",
    tag: "Cultural Expedition",
    duration: "7 Days / 6 Nights",
    location: "Tokyo, Kyoto & Mt. Fuji",
    videoUrl: "https://www.pexels.com/download/video/5737256/",
  },
  {
    title: "6 Days Aurora Borealis & Arctic Wonders",
    subtitle: "Chase the magical Northern Lights, ride husky sleds, and unwind in geothermal lagoons.",
    tag: "Winter Expedition",
    duration: "6 Days / 5 Nights",
    location: "Reykjavík & Golden Circle",
    videoUrl: "https://www.pexels.com/download/video/857032/",
  },
  {
    title: "12 Days Amalfi Coast & Tuscan Sunsets",
    subtitle: "Drive coastal highways, sip world-class wines, and explore timeless Mediterranean cliffside towns.",
    tag: "Luxury Getaway",
    duration: "12 Days / 11 Nights",
    location: "Rome, Florence & Amalfi",
    videoUrl: "https://www.pexels.com/download/video/2169880/",
  },
];

export default function EventsAndFestivals() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative w-full min-h-screen bg-slate-950 text-white overflow-hidden py-12 px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center">
      {/* CSS Keyframes injected for progress bar animation */}
      <style>{`
        @keyframes sliderProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* 1. BACKGROUND IMAGE BEHIND THE MAIN DIV */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Travel Background"
          className="w-full h-full object-cover object-center scale-105 filter blur-sm"
        />
        {/* Dark Overlay for visual readability & depth */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs" />
      </div>

      {/* Dynamic Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/15 blur-[120px] pointer-events-none rounded-full z-0" />

      {/* 2. MAIN DIV WITH REDUCED WIDTH & FLOATING CONTAINER */}
      <div className="relative z-10 w-full max-w-6xl mx-auto rounded-3xl group/slider min-h-[560px] sm:min-h-[580px] md:min-h-[480px] lg:min-h-[540px] bg-slate-900/90 border border-slate-700/60 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeSlide;
          return (
            <div
              key={index}
              data-active={isActive}
              className={`absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-12 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                isActive
                  ? "opacity-100 z-10 pointer-events-auto scale-100"
                  : "opacity-0 z-0 pointer-events-none scale-[0.97]"
              }`}
            >
              {/* LEFT CONTENT PANEL */}
              <div
                className={`col-span-1 md:col-span-7 lg:col-span-6 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 py-10 z-10 transition-all duration-700 ease-out ${
                  isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {/* Meta Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    {slide.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700/80 text-slate-300 backdrop-blur-md">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {slide.duration}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] text-white">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="mt-3 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
                  {slide.subtitle}
                </p>

                {/* Location & Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer">
                    <span>Explore Itinerary</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                  <div className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 backdrop-blur-md">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{slide.location}</span>
                  </div>
                </div>
              </div>

              {/* RIGHT VIDEO GRAPHIC PANEL */}
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

                {/* Gradient Overlays for Seamless Visual Blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-900 md:via-transparent md:to-transparent" />
              </div>
            </div>
          );
        })}

        {/* Directional Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 hover:scale-110 shadow-xl hidden md:flex cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 border border-white/10 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 hover:scale-110 shadow-xl hidden md:flex cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Progress Pagination Tickers */}
        <div className="absolute bottom-5 left-6 sm:left-10 md:left-12 flex items-center gap-2.5 z-30">
          {HERO_SLIDES.map((_, index) => {
            const isCurrent = index === activeSlide;
            return (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 bg-slate-800 border border-slate-700 cursor-pointer ${
                  isCurrent ? "w-14 bg-slate-800" : "w-3 hover:bg-slate-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {isCurrent && (
                  <span
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
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
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-6">
        <DiscoverEvents />
      </div>

      {/* KEY FEATURES / TRUST BAR UNDERNEATH */}
      {/* <div className="relative z-10 w-full max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FeatureCard
          icon={ShieldCheck}
          title="Verified Community"
          desc="100% vetted travelers & solo-friendly groups"
        />
        <FeatureCard
          icon={Users}
          title="Expert Captains"
          desc="Guided by local experts & experienced leads"
        />
        <FeatureCard
          icon={Compass}
          title="Curated Experiences"
          desc="Handpicked stays, VIP access & hidden gems"
        />
      </div> */}
    </section>
  );
}

// function FeatureCard({ icon: Icon, title, desc }) {
//   return (
//     <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl hover:border-slate-700/80 transition-colors">
//       <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
//         <Icon className="w-5 h-5" />
//       </div>
//       <div>
//         <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">{title}</h4>
//         <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
//       </div>
//     </div>
//   );
// }