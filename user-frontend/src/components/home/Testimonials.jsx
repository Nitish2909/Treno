import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bangalore, Karnataka',
    trip: 'Ladakh Expedition',
    rating: 5,
    avatar: null,
    initials: 'PS',
    avatarBg: 'bg-amber-400',
    review:
      'The Ladakh trip was nothing short of magical. Our guide Rohit was incredibly knowledgeable and made us feel safe throughout. Treno took care of every single detail — from stays to permits. Absolutely flawless!',
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    location: 'Mumbai, Maharashtra',
    trip: 'Goa Beach Escape',
    rating: 5,
    avatar: null,
    initials: 'AM',
    avatarBg: 'bg-teal-500',
    review:
      "Best travel experience I've ever had! The Goa package was perfectly curated. The beach shacks they chose were stunning and the support team was reachable at all hours. Already booked my next trip!",
  },
  {
    id: 3,
    name: 'Kavya Nair',
    location: 'Kochi, Kerala',
    trip: 'Kerala Backwater Bliss',
    rating: 5,
    avatar: null,
    initials: 'KN',
    avatarBg: 'bg-pink-500',
    review:
      "Even as a Keralite, this trip opened my eyes to corners of my own state I'd never seen. The houseboat experience was ethereal. Treno's team handled everything with a personal touch.",
  },
  {
    id: 4,
    name: 'Rohan Gupta',
    location: 'Delhi, NCR',
    trip: 'Manali Snow Adventure',
    rating: 4,
    avatar: null,
    initials: 'RG',
    avatarBg: 'bg-indigo-500',
    review:
      'Took my family to Manali for the first time and Treno made it stress-free. The kids loved the snow activities and our stay at the boutique resort was cosy and warm. Will definitely come back.',
  },
  {
    id: 5,
    name: 'Ananya Singh',
    location: 'Hyderabad, Telangana',
    trip: 'Royal Rajasthan Tour',
    rating: 5,
    avatar: null,
    initials: 'AS',
    avatarBg: 'bg-orange-400',
    review:
      'Rajasthan is a whole different world and Treno presented it beautifully — heritage hotels, camel rides, folk performances. Every day felt like stepping into history. Unmatched hospitality!',
  },
  {
    id: 6,
    name: 'Vikram Rao',
    location: 'Pune, Maharashtra',
    trip: 'Spiti Valley Trek',
    rating: 5,
    avatar: null,
    initials: 'VR',
    avatarBg: 'bg-green-500',
    review:
      'Spiti was on my bucket list for years and Treno delivered it beyond expectations. The itinerary balanced adventure with comfort perfectly. The guides were brilliant and the views — simply breathtaking.',
  },
  {
    id: 7,
    name: 'Nisha Patel',
    location: 'Ahmedabad, Gujarat',
    trip: 'Andaman Island Hopping',
    rating: 5,
    avatar: null,
    initials: 'NP',
    avatarBg: 'bg-cyan-500',
    review:
      'Our honeymoon in Andaman was dreamy, thanks to Treno. The glass-bottom boat ride, the bioluminescent beach, and the private sunset cruise — every moment was picture-perfect.',
  },
  {
    id: 8,
    name: 'Deepak Verma',
    location: 'Lucknow, Uttar Pradesh',
    trip: 'Meghalaya Discovery',
    rating: 5,
    avatar: null,
    initials: 'DV',
    avatarBg: 'bg-purple-500',
    review:
      "Meghalaya's living root bridges and misty waterfalls left me speechless. Treno's small-group format meant we got personal attention the whole time. Highly recommend for anyone seeking off-the-beaten-path magic.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}

function Avatar({ initials, bg }) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white shadow ${bg}`}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="bg-white py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="relative mb-3 inline-block font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 sm:text-4xl">
            What Travelers Say
            <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-amber-400" />
          </h2>
          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            Real experiences from our community of 50,000+ happy explorers
          </p>
        </motion.div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            pagination={{ clickable: true, el: '.testimonials-pagination' }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Quote icon */}
                  <Quote size={36} className="mb-3 fill-amber-100 text-amber-400" />

                  {/* Review text */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                    "{t.review}"
                  </p>

                  {/* Stars */}
                  <div className="mb-4">
                    <StarRating rating={t.rating} />
                  </div>

                  {/* Trip badge */}
                  <span className="mb-4 inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-semibold text-teal-700">
                    ✈ {t.trip}
                  </span>

                  {/* User info */}
                  <div className="flex items-center gap-3">
                    <Avatar initials={t.initials} bg={t.avatarBg} />
                    <div>
                      <p className="text-sm font-bold text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Arrows */}
          <button
            ref={prevRef}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-500 shadow transition hover:bg-amber-500 hover:text-white focus:outline-none"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            ref={nextRef}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-white text-amber-500 shadow transition hover:bg-amber-500 hover:text-white focus:outline-none"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Pagination */}
        <div className="testimonials-pagination mt-2 flex justify-center [&_.swiper-pagination-bullet-active]:bg-amber-500 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:bg-amber-200 [&_.swiper-pagination-bullet]:transition-all" />
      </div>
    </section>
  );
}