import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Leaf,
  Users,
  Star,
  Award,
  Globe,
  Heart,
  Camera,
} from "lucide-react";
import SEOHead from "../components/common/SEOHead.jsx";

//  Animated counter

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CountUp target={target} suffix={suffix} duration={duration} />
        </motion.span>
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}

function CountUp({ target, suffix, duration }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useCountUp(isInView ? target : 0, duration);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function useCountUp(target, duration) {
  const { useState, useEffect } =
    require !== undefined
      ? {
          useState: (v) => {
            const [s, ss] = [0, () => {}];
            return [v, ss];
          },
          useEffect: () => {},
        }
      : { useState: () => [0, () => {}], useEffect: () => {} };
  return [target];
}

// Simpler inline approach for the counter
function SimpleCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        <motion.span
          initial={{ textContent: 0 }}
          animate={{ textContent: target }}
          transition={{ duration: 2, ease: "easeOut" }}
          onUpdate={(v) => {
            // handled via CSS counter animation below
          }}
        >
          {target.toLocaleString()}
          {suffix}
        </motion.span>
      ) : (
        <span>0{suffix}</span>
      )}
    </span>
  );
}

//  Section reveal animation

function RevealSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

//  Data
const STATS = [
  {
    label: "50,000+ Travelers",
    sub: "Happy explorers",
    icon: Users,
    num: "50,000+",
  },
  {
    label: "500+ Destinations",
    sub: "Across the globe",
    icon: Globe,
    num: "500+",
  },
  {
    label: "1,000+ Trips",
    sub: "Curated journeys",
    icon: Camera,
    num: "1,000+",
  },
  { label: "5 Years", sub: "Of experience", icon: Award, num: "5 Yrs" },
];

const TEAM = [
  {
    name: "Mukesh Kumar",
    role: "Founder & CEO",
    bio: " quit his corporate job in 2018 to turn his passion for travel into Treno. He has personally visited 40+ countries.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "",
    role: "Chief Technology Officer",
    bio: "leads our tech stack and ensures every digital touchpoint is seamless — from booking to check-in.",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    name: "",
    role: "Head of Operations",
    bio: "With 15 years in travel logistics, Vikram ensures every itinerary runs like clockwork across all our destinations.",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    name: "",
    role: "Lead Guide & Trainer",
    bio: "Anjali has led 500+ treks in the Himalayas. She trains our guide network and writes our safety protocols.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    name: "",
    role: "Head of Marketing",
    bio: " crafts stories that inspire wanderlust. He manages our brand voice across social, content, and campaigns.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    name: "",
    role: "Customer Care Lead",
    bio: "heads our support team and guarantees every traveller feels looked after, before, during, and after their trip.",
    gradient: "from-sky-400 to-blue-500",
  },
];

const VALUES = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every trip is risk-assessed and our guides are trained in first aid, route safety, and emergency protocols.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Leaf,
    title: "Sustainable Travel",
    description:
      "We partner with eco-certified accommodations, offset carbon emissions, and run zero-plastic trek programmes.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Heart,
    title: "Local Community",
    description:
      "At least 60% of our spending on every trip flows directly to local guides, homestays, and artisans.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Star,
    title: "Authentic Experiences",
    description:
      "We design trips that connect you with real culture — not just tourist facades — through local immersion.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
];

const TIMELINE = [
  {
    year: "2022",
    text: "Treno founded with a team of 4 in a tiny Delhi apartment, running weekend treks for 100 travellers.",
  },
  {
    year: "2023",
    text: "Expanded to 50 destinations across India. Crossed 5,000 happy travellers.",
  },
  {
    year: "2024",
    text: "Pivoted to virtual tours during the pandemic. Launched the Treno travel community.",
  },
  {
    year: "2025",
    text: "Relaunched on-ground trips. Introduced international packages. Reached 15,000 travellers.",
  },
  {
    year: "2026",
    text: "Launched the Treno app. Crossed 500 curated trips and 30,000 travellers.",
  },

];

const PARTNERS = [
  "MakeMyTrip",
  "Cleartrip",
  "IRCTC",
  "Air India",
  "IndiGo",
  "Ministry of Tourism",
];

//  Component
export default function About() {
  return (
    <>
      <SEOHead
        title="About Trip With Treno | Best Travel Agency in Karnal | Tour & Travel Experts"
        description="Learn about Trip With Treno, a trusted travel agency in Karnal. We specialize in domestic and international tour packages, flight booking, hotel booking, honeymoon packages, family vacations, group tours, customized travel experiences, and affordable holiday packages."
        keywords={[
          "About Trip With Treno",
          "Trip With Treno",
          "TripWithTreno",
          "Travel Agency in Karnal",
          "Best Travel Agency in Karnal",
          "Tour Operator Karnal",
          "Travel Company Karnal",
          "Travel Services Karnal",
          "Travel Consultant Karnal",
          "Holiday Packages Karnal",
          "Tour Packages Karnal",
          "Domestic Tour Packages",
          "International Tour Packages",
          "Customized Tour Packages",
          "Family Tour Packages",
          "Honeymoon Packages",
          "Group Tour Packages",
          "Adventure Tours",
          "Corporate Travel Services",
          "Flight Booking",
          "Hotel Booking",
          "Train Ticket Booking",
          "Bus Booking",
          "Cab Booking",
          "Visa Assistance",
          "Travel Insurance",
          "Affordable Holiday Packages",
          "Trusted Travel Company",
          "Travel Experts in Karnal",
        ]}
      />
      {/* 1. Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: "40vh", minHeight: 280 }}
      >
        <img
          src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg"
          alt="About Treno"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-amber-900/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-amber-300 font-semibold uppercase tracking-widest text-sm mb-3">
            Our Story
          </p>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white">
            About Treno
          </h1>
          <p className="mt-4 text-amber-100 text-lg max-w-xl mx-auto">
            Born from wanderlust, built on trust
          </p>
        </motion.div>
      </section>

      {/* 2. Mission statement */}
      <RevealSection className="py-20 bg-white text-center px-4">
        <p className="text-amber-500 font-semibold uppercase tracking-widest text-sm mb-4">
          Our Mission
        </p>
        <blockquote className="font-playfair text-2xl md:text-4xl font-bold text-slate-800 max-w-3xl mx-auto leading-tight">
          "We believe every journey is a story waiting to be written."
        </blockquote>
        <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Treno Your Travel Partner exists to make extraordinary travel accessible to everyone —
          whether you are a solo adventurer, a couple seeking romance, or a
          group of friends chasing thrills. We handle the logistics so you can
          focus on the moments.
        </p>
      </RevealSection>

      {/* 3. Our Story */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-screen-xl mx-auto">
          <RevealSection className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
              Our Story
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              From a weekend trek to India's most trusted travel brand
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Text left */}
            <RevealSection delay={0.1}>
              <p className="text-slate-700 leading-relaxed text-base mb-4">
                Treno Your Travel Partner was born in 2023 when founder Mukesh Kumar decided that
                the best way to explore India was with a group of strangers who
                quickly become friends. Starting with just 100 travellers on
                weekend Himalayan treks, we quickly grew into a full-service
                travel company.
              </p>
              <p className="text-slate-700 leading-relaxed text-base mb-4">
                We turned our passion for exploration into a thriving, resilient
                community of global wanderers. As travel entered a bold new era,
                we didn't just return—we accelerated. Today, Treno is trusted by
                over 50,000 travelers exploring 500+ unforgettable destinations
                across India and beyond.
              </p>
              <p className="text-slate-700 leading-relaxed text-base">
                Our philosophy has never changed: curate authentic experiences,
                prioritise safety, empower local communities, and make every
                journey feel like a story worth telling.
              </p>
            </RevealSection>

            {/* Timeline right */}
            <RevealSection delay={0.2}>
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-amber-200" />
                {TIMELINE.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative mb-6 last:mb-0"
                  >
                    <div className="absolute -left-3.5 top-1 w-5 h-5 rounded-full bg-amber-500 border-2 border-white shadow-sm flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm ml-4">
                      <span className="text-amber-600 font-bold text-sm">
                        {item.year}
                      </span>
                      <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 4. Stats */}
      <section className="py-20 bg-amber-500">
        <div className="max-w-screen-xl mx-auto px-4">
          <RevealSection className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold text-white">
              Treno by the Numbers
            </h2>
          </RevealSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <RevealSection key={idx} delay={idx * 0.1}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                    <Icon className="w-8 h-8 text-amber-100 mx-auto mb-3" />
                    <div className="text-3xl md:text-4xl font-extrabold text-white font-playfair">
                      {stat.num}
                    </div>
                    <p className="text-amber-100 text-xs mt-1 font-medium">
                      {stat.sub}
                    </p>
                    <p className="text-white/80 text-sm font-semibold mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Team */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-screen-xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="text-amber-500 font-semibold uppercase tracking-widest text-sm mb-2">
              The People
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
              Meet Our Team
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              A passionate bunch of travellers, technologists, and storytellers
              united by wanderlust.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <RevealSection key={idx} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 text-center">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} mx-auto mb-4 flex items-center justify-center`}
                  >
                    <span className="text-2xl font-extrabold text-white">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 text-sm font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Values */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-screen-xl mx-auto">
          <RevealSection className="text-center mb-12">
            <p className="text-amber-500 font-semibold uppercase tracking-widest text-sm mb-2">
              What We Stand For
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
              Our Values
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <RevealSection key={idx} delay={idx * 0.1}>
                  <div
                    className={`${val.bg} rounded-2xl p-6 h-full border border-slate-100`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${val.color}`} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-base mb-2">
                      {val.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Partners */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-screen-xl mx-auto">
          <RevealSection className="text-center mb-10">
            <p className="text-amber-500 font-semibold uppercase tracking-widest text-sm mb-2">
              Trust &amp; Recognition
            </p>
            <h2 className="font-playfair text-2xl font-bold text-slate-800">
              Our Partners &amp; Certifications
            </h2>
          </RevealSection>
          <RevealSection>
            <div className="flex flex-wrap justify-center gap-6">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 font-semibold text-sm hover:bg-amber-50 hover:border-amber-200 transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-20 bg-amber-500 px-4">
        <RevealSection className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Join 50,000+ travellers who have explored the world with Treno. Your
            next adventure is one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/trips"
              onClick={()=>{window.scrollTo(0,0)}}
              className="inline-block bg-white text-amber-600 font-bold px-8 py-4 rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
            >
              Explore Trips
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-transparent text-white border-2 border-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </RevealSection>
      </section>
    </>
  );
}
