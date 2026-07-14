import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { MapPin, Users, Star, ChevronDown } from 'lucide-react';
import SearchBar from './SearchBar.jsx';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
    tag: 'Himalayas',
    title: 'Discover the Himalayas',
    subtitle: 'Stand atop the roof of the world and feel the mountain breeze carry your worries away.',
  },
  {
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg',
    tag: 'Goa',
    title: 'Escape to Paradise',
    subtitle: 'Golden sands, azure waters, and vibrant sunsets — your perfect coastal retreat awaits.',
  },
  {
    image: 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg',
    tag: 'Kerala',
    title: "Serenity in God's Own Country",
    subtitle: 'Drift through emerald backwaters and lush spice gardens in the land of timeless beauty.',
  },
  {
    // image: 'https://images.pexels.com/photos/2409953/pexels-photo-2409953.jpeg',
    image: 'https://images.pexels.com/photos/176880/pexels-photo-176880.jpeg',
    tag: 'Rajasthan',
    title: 'Royal Rajasthan Awaits',
    subtitle: 'Majestic forts, desert dunes, and royal hospitality — live like royalty in the desert kingdom.',
  },
];

const badges = [
  { icon: MapPin, label: '1000+ Curated Trips' },
  { icon: Users, label: '50K+ Happy Travelers' },
  { icon: Star, label: 'Expert Guided Tours' },
];

const taglineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

const tagline = 'Explore. Experience. Remember.';

export default function HeroBanner() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.hero-pagination' }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative h-full w-full">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
              style={{ backgroundImage: `url('${slide.image}?auto=compress&cs=tinysrgb&w=1920&q=80')` }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Slide Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
              {/* Location tag */}
              <motion.span
                variants={fadeUp}
                custom={0}
                initial="hidden"
                animate="visible"
                className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
              >
                <MapPin size={14} className="text-amber-400" />
                {slide.tag}
              </motion.span>

              {/* Main tagline — staggered words */}
              <motion.h1
                variants={taglineVariants}
                initial="hidden"
                animate="visible"
                className="mb-3 flex flex-wrap justify-center gap-x-3 font-['Playfair_Display',serif] text-4xl font-bold leading-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {tagline.split(' ').map((word, i) => (
                  <motion.span key={i} variants={wordVariant}>
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Slide title */}
              <motion.h2
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="visible"
                className="mb-3 text-xl font-semibold text-amber-300 sm:text-2xl"
              >
                {slide.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="visible"
                className="mb-8 max-w-xl text-base text-white/80 sm:text-lg"
              >
                {slide.subtitle}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                animate="visible"
                className="mb-10 flex flex-wrap justify-center gap-4"
              >
                <a
                  href="/trips"
                  className="rounded-full bg-amber-500 px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-500/40 hover:shadow-xl active:scale-95"
                >
                  Explore Trips
                </a>
                <a
                  href="/packages"
                  className="rounded-full border-2 border-white/70 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-gray-900 active:scale-95"
                >
                  View Packages
                </a>
              </motion.div>

              {/* SearchBar */}
              <motion.div
                variants={fadeUp}
                custom={4}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl"
              >
                <SearchBar />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-amber-500 focus:outline-none"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-amber-500 focus:outline-none"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination dots */}
      <div className="hero-pagination absolute bottom-24 left-1/2 z-20 -translate-x-1/2 [&_.swiper-pagination-bullet-active]:bg-amber-400 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:transition-all" />

      {/* Floating Badges — bottom-left */}
      <div className="absolute bottom-8 left-4 z-20 hidden flex-col gap-2 sm:flex">
        {badges.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20">
              <Icon size={14} className="text-amber-400" />
            </span>
            <span className="text-xs font-medium text-white">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </div>
  );
}
