import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BadgePercent, Headphones, ShieldCheck } from 'lucide-react';

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountAnimation(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Happy Travelers', value: 50000, suffix: '+', color: 'text-amber-500' },
  { label: 'Destinations', value: 500, suffix: '+', color: 'text-teal-500' },
  { label: 'Curated Trips', value: 1000, suffix: '+', color: 'text-amber-500' },
  { label: 'Satisfaction Rate', value: 98, suffix: '%', color: 'text-teal-500' },
];

const FEATURES = [
  {
    icon: Users,
    title: 'Expert Guides',
    description:
      'Travel with certified local guides who bring 5+ years of field expertise, ensuring safe and enriching experiences.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-500',
    ringColor: 'ring-amber-100',
  },
  {
    icon: BadgePercent,
    title: 'Best Price Guarantee',
    description:
      "Found it cheaper elsewhere? We'll match the price — no questions asked. You always get the best deal with us.",
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    ringColor: 'ring-teal-100',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated travel support team is available round-the-clock via phone, chat, or email — wherever you are.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-500',
    ringColor: 'ring-amber-100',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure',
    description:
      'Every trip is fully verified, insured, and safety-audited. Travel with complete peace of mind.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-500',
    ringColor: 'ring-teal-100',
  },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, suffix, color, animate }) {
  const count = useCountAnimation(value, 2200, animate);
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm">
      <span className={`text-4xl font-extrabold ${color} tabular-nums`}>
        {count.toLocaleString('en-IN')}
        {suffix}
      </span>
      <span className="mt-1 text-sm font-medium text-gray-500">{label}</span>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, description, color, iconColor, ringColor, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className="group flex flex-col items-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${color} ring-4 ${ringColor} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={26} className={iconColor} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Bar */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} animate={statsInView} />
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="relative mb-3 inline-block font-['Playfair_Display',serif] text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Treno?
            <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-amber-400" />
          </h2>
          <p className="mt-6 text-base text-gray-500 sm:text-lg">
            We go beyond bookings — we craft memories that last a lifetime
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} {...feature} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
