/**
 * @file Footer.jsx
 * @description Multi-column dark footer for Treno travel booking platform.
 * Includes newsletter subscription, quick links, destinations, contact info,
 * social links, and a bottom bar with legal/payment info.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Mountain,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import TrenoLogo from "../../assets/TrenoLogo.webp";
// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/** @type {{ label: string, href: string }[]} */
const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Trips", href: "/trips" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const isScrolled = scrollY > 50;

/** @type {{ label: string, href: string }[]} */
const POPULAR_DESTINATIONS = [
  { label: "Manali", href: "/destinations/manali" },
  { label: "Goa", href: "/destinations/goa" },
  { label: "Kerala", href: "/destinations/kerala" },
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Spiti Valley", href: "/destinations/spiti" },
  { label: "Andaman", href: "/destinations/andaman" },
  { label: "Meghalaya", href: "/destinations/meghalaya" },
];

/** @type {{ label: string, href: string, icon: import('react').ElementType }[]} */
const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

/** @type {{ label: string, href: string }[]} */
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "Razorpay"];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * Newsletter subscription form section.
 */
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(
    /** @type {'idle'|'loading'|'success'|'error'} */ ("idle"),
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    // Simulate async subscription — replace with real API call
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setMessage("You're in! Welcome to the Treno family 🎉");
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-white/5 rounded-2xl p-6 sm:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          Newsletter
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Join{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            50,000+
          </span>{" "}
          Travelers
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Get exclusive travel deals, hidden gems, and trip inspiration
          delivered straight to your inbox. No spam — ever.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full py-3 px-6 text-teal-400 text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                  setMessage("");
                }}
                placeholder="Enter your email address"
                className={clsx(
                  "w-full px-4 py-3 rounded-full bg-white/10 border text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors",
                  status === "error"
                    ? "border-red-500/60"
                    : "border-white/10 hover:border-white/20",
                )}
              />
              {status === "error" && (
                <p className="text-red-400 text-xs mt-1.5 pl-4">{message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors whitespace-nowrap shadow-lg shadow-amber-900/30"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Subscribing…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Subscribe
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Treno multi-column dark footer.
 */
export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <NewsletterSection />
      </div>

      {/* ── Decorative divider ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Four columns ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center justify-center flex-shrink-0 group relative"
            >
              {/* Soft background glow adjusted for the larger logo profile */}
              <div
                className={clsx(
                  "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
                  isScrolled ? "bg-slate-900" : "bg-white",
                )}
              />

              {/* Significantly larger logo profile (w-40 h-40 / 96px) */}
              <img
                src={TrenoLogo}
                alt="Treno Logo"
                className="w-40 h-40 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg "
              />
            </Link>

            {/* Tagline */}
            <p className="text-amber-400/80 text-sm font-medium italic">
              Explore. Experience. Remember.
            </p>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed">
              Treno is your trusted travel companion for curated group trips,
              adventure getaways, and transformative journeys across India and
              beyond. We make every trip unforgettable.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center transition-colors group"
                >
                  <Icon size={16} className="transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
                  >
                    <ChevronRight
                      size={13}
                      className="text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Popular Destinations */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Popular Destinations
            </h4>
            <ul className="space-y-2.5">
              {POPULAR_DESTINATIONS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
                  >
                    <MapPin
                      size={13}
                      className="text-teal-500/60 group-hover:text-amber-400 transition-colors flex-shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact Us */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex gap-3">
                <MapPin
                  size={16}
                  className="text-amber-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm text-slate-400 leading-relaxed">
                  SCO 98, Sector 4-5, Urban State
                  <br />
                  Karnal, Haryana — 132001
                </span>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
                >
                  <Phone size={15} className="text-amber-500 flex-shrink-0" />
                  +91 81999 11983
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:hello@Treno.in"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
                >
                  <Mail size={15} className="text-amber-500 flex-shrink-0" />
                  hello@Treno.in
                </a>
              </li>

              {/* Working hours */}
              <li className="flex gap-3">
                <Clock
                  size={15}
                  className="text-amber-500 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm text-slate-400">
                  <p>Mon – Sat: 9:00 AM – 7:00 PM</p>
                  <p>Sunday: 10:00 AM – 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright + Legal links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
              <span className="text-xs text-slate-500">
                © {new Date().getFullYear()} Treno. All rights reserved.
              </span>
              <span className="text-slate-700 hidden sm:inline">|</span>
              {LEGAL_LINKS.map(({ label, href }, idx) => (
                <span key={label} className="flex items-center gap-4">
                  <Link
                    to={href}
                    className="text-xs text-slate-500 hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </Link>
                  {idx < LEGAL_LINKS.length - 1 && (
                    <span className="text-slate-700">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Payment method labels */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-slate-600 mr-1">We accept:</span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-slate-400"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
