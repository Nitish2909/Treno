/**
 * @file Footer.jsx
 * @description Multi-column dark footer for Treno travel booking platform.
 */

import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
} from "lucide-react";
import TrenoLogo from "../../assets/Treno-Logo.png";

// ---------------------------------------------------------------------------
// Data Constants
// ---------------------------------------------------------------------------

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Trips", href: "/trips" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const POPULAR_DESTINATIONS = [
  { label: "Manali", href: "/destinations/manali" },
  { label: "Goa", href: "/destinations/goa" },
  { label: "Kerala", href: "/destinations/kerala" },
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Spiti Valley", href: "/destinations/spiti" },
  { label: "Andaman", href: "/destinations/andaman" },
  { label: "Meghalaya", href: "/destinations/meghalaya" },
  { label: "Shimla", href: "/destinations/shimla" },
  { label: "Sikkim", href: "/destinations/sikkim" },
  { label: "Agra", href: "/destinations/agra" },
  { label: "Kashmir", href: "/destinations/kashmir" },
  { label: "Varanasi", href: "/destinations/varanasi" },
  { label: "Nagaland", href: "/destinations/nagaland" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/treno.travels/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61580526790627#",
    icon: Facebook,
  },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/in/treno-your-travel-partner-9105073ab",
    icon: Linkedin,
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "Razorpay"];

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-white/10">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block group">
              {/* White badge wrapper to ensure dark logo elements pop clearly */}
              <div className="inline-flex items-center px-4 py-2.5 rounded-2xl  backdrop-blur-md  shadow-lg group-hover:bg-white/15 transition-all duration-300">
                <img
                  src={TrenoLogo}
                  alt="Treno Logo"
                  className="h-40 w-40 object-contain filter brightness-125 contrast-125"
                />
              </div>
            </Link>

            <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
              Treno - Your Trusted Travel Partner
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Treno- Your Trusted Travel Partner is your trusted travel companion for curated group trips,
              adventure getaways, and transformative journeys across India and
              beyond.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    <ChevronRight
                      size={14}
                      className="text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Popular Destinations */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              Top Destinations
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {POPULAR_DESTINATIONS.map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal-300 transition-colors duration-200"
                >
                  <MapPin
                    size={13}
                    className="text-slate-600 group-hover:text-teal-400 transition-colors flex-shrink-0"
                  />
                  <span className="truncate">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4 — Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Get In Touch
            </h4>
            <ul className="space-y-3.5">
              <li className="flex gap-3 text-slate-400 text-sm">
                <MapPin
                  size={17}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">
                  SCO 98, Sector 4-5, Urban State
                  <br />
                  Karnal, Haryana - 132001
                </span>
              </li>

              <li>
                <a
                  href="tel:+918816942362"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  <Phone size={17} className="text-amber-400 flex-shrink-0" />
                  +91 8816942362
                </a>
              </li>

              <li>
                <a
                  href="mailto:Trenotravel@gmail.com"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  <Mail size={17} className="text-amber-400 flex-shrink-0" />
                  Trenotravel@gmail.com
                </a>
              </li>

              <li className="flex gap-3 text-sm text-slate-400">
                <Clock
                  size={17}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <div className="space-y-0.5">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p className="text-xs text-slate-500">
                    Sunday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Bar */}
      <div className="border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright & Legal Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
              <span>
                © {new Date().getFullYear()} Treno. All rights reserved.
              </span>
              <div className="flex items-center gap-4">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <Link
                    key={label}
                    to={href}
                    onClick={() => window.scrollTo(0, 0)}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Payment Badge Labels */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 mr-2">We accept:</span>
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400"
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
