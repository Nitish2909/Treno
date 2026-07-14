import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Tag, Lightbulb, Map, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const PERKS = [
  { icon: Tag, label: 'Exclusive Deals', desc: 'Members-only discounts up to 30% off' },
  { icon: Lightbulb, label: 'Travel Tips', desc: 'Expert advice & packing guides' },
  { icon: Map, label: 'Destination Guides', desc: 'Curated itineraries for every budget' },
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      setStatus('error');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-slate-800" />
      {/* Decorative circles */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-teal-600/30 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/40"
        >
          <Mail size={28} className="text-white" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 font-['Playfair_Display',serif] text-3xl font-bold text-white sm:text-4xl"
        >
          Get Travel Inspiration in Your Inbox
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 text-base text-teal-100/80 sm:text-lg"
        >
          Join 50,000+ travelers who receive exclusive deals, travel tips and destination guides.{' '}
          <span className="font-medium text-white">No spam — ever.</span>
        </motion.p>

        {/* Perks row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {PERKS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20">
                <Icon size={16} className="text-amber-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-[11px] text-teal-200/80">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-teal-400/30 bg-teal-500/20 px-8 py-8 backdrop-blur-sm"
              >
                <CheckCircle size={48} className="text-amber-400" />
                <h3 className="text-xl font-bold text-white">You're in! 🎉</h3>
                <p className="text-sm text-teal-100">
                  Welcome to the Treno family. Expect amazing travel stories in your inbox soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs text-teal-300 underline hover:text-white"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
                noValidate
              >
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`w-full rounded-xl border py-3.5 pl-10 pr-4 text-sm text-gray-800 outline-none placeholder-gray-400 transition focus:ring-2 ${
                      status === 'error'
                        ? 'border-red-400 focus:ring-red-300'
                        : 'border-transparent focus:ring-amber-400'
                    } bg-white`}
                    disabled={status === 'submitting'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all hover:bg-amber-400 hover:shadow-amber-400/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    'Subscribe Free'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {status === 'error' && errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 flex items-center justify-center gap-1.5 text-xs text-red-300"
              >
                <AlertCircle size={12} />
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {status !== 'success' && (
            <p className="mt-4 text-xs text-teal-300/70">
              🔒 Your privacy is protected. Unsubscribe anytime.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
