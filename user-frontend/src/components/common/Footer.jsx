// /**
//  * @file Footer.jsx
//  * @description Multi-column dark footer for Treno travel booking platform.
//  * Includes newsletter subscription, quick links, destinations, contact info,
//  * social links, and a bottom bar with legal/payment info.
//  */

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import clsx from "clsx";
// import {
//   Mountain,
//   Instagram,
//   Facebook,
//   Twitter,
//   Youtube,
//   Linkedin,
//   MapPin,
//   Phone,
//   Mail,
//   Clock,
//   Send,
//   ExternalLink,
//   ChevronRight,
// } from "lucide-react";
// import TrenoLogo from "../../assets/TrenoLogo.webp";
// // ---------------------------------------------------------------------------
// // Data
// // ---------------------------------------------------------------------------

// /** @type {{ label: string, href: string }[]} */
// const QUICK_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "All Trips", href: "/trips" },
//   { label: "About Us", href: "/about" },
//   { label: "Blog", href: "/blog" },
//   { label: "Contact", href: "/contact" },
//   { label: "Careers", href: "/careers" },
// ];

// const isScrolled = scrollY > 50;

// /** @type {{ label: string, href: string }[]} */
// const POPULAR_DESTINATIONS = [
//   { label: "Manali", href: "/destinations/manali" },
//   { label: "Goa", href: "/destinations/goa" },
//   { label: "Kerala", href: "/destinations/kerala" },
//   { label: "Rajasthan", href: "/destinations/rajasthan" },
//   { label: "Ladakh", href: "/destinations/ladakh" },
//   { label: "Spiti Valley", href: "/destinations/spiti" },
//   { label: "Andaman", href: "/destinations/andaman" },
//   { label: "Meghalaya", href: "/destinations/meghalaya" },
// ];

// /** @type {{ label: string, href: string, icon: import('react').ElementType }[]} */
// const SOCIAL_LINKS = [
//   { label: "Instagram", href: "https://instagram.com", icon: Instagram },
//   { label: "Facebook", href: "https://facebook.com", icon: Facebook },
//   { label: "Twitter", href: "https://twitter.com", icon: Twitter },
//   { label: "YouTube", href: "https://youtube.com", icon: Youtube },
//   { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
// ];

// /** @type {{ label: string, href: string }[]} */
// const LEGAL_LINKS = [
//   { label: "Privacy Policy", href: "/privacy" },
//   { label: "Terms", href: "/terms" },
//   { label: "Sitemap", href: "/sitemap" },
// ];

// const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "Razorpay"];

// // Sub-components
// /**
//  * Newsletter subscription form section.
//  */
// function NewsletterSection() {
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState(
//     /** @type {'idle'|'loading'|'success'|'error'} */ ("idle"),
//   );
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setStatus("error");
//       setMessage("Please enter a valid email address.");
//       return;
//     }
//     setStatus("loading");
//     // Simulate async subscription — replace with real API call
//     await new Promise((r) => setTimeout(r, 900));
//     setStatus("success");
//     setMessage("You're in! Welcome to the Treno family 🎉");
//     setEmail("");
//   };

//   // return (
//   //   <div className="bg-gradient-to-r from-amber-500/10 to-teal-500/10 border border-white/5 rounded-2xl p-6 sm:p-8">
//   //     <div className="max-w-2xl mx-auto text-center">
//   //       <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
//   //         Newsletter
//   //       </span>
//   //       <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//   //         Join{" "}
//   //         <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
//   //           50,000+
//   //         </span>{" "}
//   //         Travelers
//   //       </h3>
//   //       <p className="text-slate-400 text-sm mb-6">
//   //         Get exclusive travel deals, hidden gems, and trip inspiration
//   //         delivered straight to your inbox. No spam — ever.
//   //       </p>

//   //       {status === "success" ? (
//   //         <div className="flex items-center justify-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full py-3 px-6 text-teal-400 text-sm font-medium">
//   //           <svg
//   //             className="w-4 h-4"
//   //             fill="none"
//   //             viewBox="0 0 24 24"
//   //             stroke="currentColor"
//   //             strokeWidth={2.5}
//   //           >
//   //             <path
//   //               strokeLinecap="round"
//   //               strokeLinejoin="round"
//   //               d="M5 13l4 4L19 7"
//   //             />
//   //           </svg>
//   //           {message}
//   //         </div>
//   //       ) : (
//   //         <form
//   //           onSubmit={handleSubmit}
//   //           className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
//   //         >
//   //           <div className="flex-1">
//   //             <input
//   //               type="email"
//   //               value={email}
//   //               onChange={(e) => {
//   //                 setEmail(e.target.value);
//   //                 setStatus("idle");
//   //                 setMessage("");
//   //               }}
//   //               placeholder="Enter your email address"
//   //               className={clsx(
//   //                 "w-full px-4 py-3 rounded-full bg-white/10 border text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors",
//   //                 status === "error"
//   //                   ? "border-red-500/60"
//   //                   : "border-white/10 hover:border-white/20",
//   //               )}
//   //             />
//   //             {status === "error" && (
//   //               <p className="text-red-400 text-xs mt-1.5 pl-4">{message}</p>
//   //             )}
//   //           </div>
//   //           <button
//   //             type="submit"
//   //             disabled={status === "loading"}
//   //             className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors whitespace-nowrap shadow-lg shadow-amber-900/30"
//   //           >
//   //             {status === "loading" ? (
//   //               <>
//   //                 <svg
//   //                   className="animate-spin w-4 h-4"
//   //                   fill="none"
//   //                   viewBox="0 0 24 24"
//   //                 >
//   //                   <circle
//   //                     className="opacity-25"
//   //                     cx="12"
//   //                     cy="12"
//   //                     r="10"
//   //                     stroke="currentColor"
//   //                     strokeWidth="4"
//   //                   />
//   //                   <path
//   //                     className="opacity-75"
//   //                     fill="currentColor"
//   //                     d="M4 12a8 8 0 018-8v8H4z"
//   //                   />
//   //                 </svg>
//   //                 Subscribing…
//   //               </>
//   //             ) : (
//   //               <>
//   //                 <Send size={15} />
//   //                 Subscribe
//   //               </>
//   //             )}
//   //           </button>
//   //         </form>
//   //       )}
//   //     </div>
//   //   </div>
//   // );
// }

// // ---------------------------------------------------------------------------
// // Main component
// // ---------------------------------------------------------------------------

// /**
//  * Treno multi-column dark footer.
//  */
// export default function Footer() {
//   return (
//     <footer className="bg-[#0f172a] text-slate-300">
//       {/*  Newsletter  */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
//         <NewsletterSection />
//       </div>

//       {/*  Decorative divider  */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//       </div>

//       {/*  Four columns  */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Column 1 — Brand */}
//           <div className="space-y-5">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex items-center justify-center flex-shrink-0 group relative"
//             >
//               {/* Soft background glow adjusted for the larger logo profile */}
//               <div
//                 className={clsx(
//                   "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
//                   isScrolled ? "bg-slate-900" : "bg-white",
//                 )}
//               />

//               {/* Significantly larger logo profile (w-40 h-40 / 96px) */}
//               <img
//                 src={TrenoLogo}
//                 alt="Treno Logo"
//                 className="w-40 h-40 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg "
//               />
//             </Link>

//             {/* Tagline */}
//             <p className="text-amber-400/80 text-sm font-medium italic">
//               Explore. Experience. Remember.
//             </p>

//             {/* Description */}
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Treno is your trusted travel companion for curated group trips,
//               adventure getaways, and transformative journeys across India and
//               beyond. We make every trip unforgettable.
//             </p>

//             {/* Social icons */}
//             <div className="flex items-center gap-3">
//               {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center transition-colors group"
//                 >
//                   <Icon size={16} className="transition-colors" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Column 2 — Quick Links */}
//           <div>
//             <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
//               Quick Links
//             </h4>
//             <ul className="space-y-2.5">
//               {QUICK_LINKS.map(({ label, href }) => (
//                 <li key={label}>
//                   <Link
//                     to={href}
//                     className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
//                   >
//                     <ChevronRight
//                       size={13}
//                       className="text-slate-600 group-hover:text-amber-400 transition-colors flex-shrink-0"
//                     />
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 3 — Popular Destinations */}
//           <div>
//             <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
//               Popular Destinations
//             </h4>
//             <ul className="space-y-2.5">
//               {POPULAR_DESTINATIONS.map(({ label, href }) => (
//                 <li key={label}>
//                   <Link
//                     to={href}
//                     className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
//                   >
//                     <MapPin
//                       size={13}
//                       className="text-teal-500/60 group-hover:text-amber-400 transition-colors flex-shrink-0"
//                     />
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Column 4 — Contact Us */}
//           <div>
//             <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">
//               Contact Us
//             </h4>
//             <ul className="space-y-4">
//               {/* Address */}
//               <li className="flex gap-3">
//                 <MapPin
//                   size={16}
//                   className="text-amber-500 mt-0.5 flex-shrink-0"
//                 />
//                 <span className="text-sm text-slate-400 leading-relaxed">

//                 </span>
//               </li>

//               {/* Phone */}
//               <li>
//                 <a
//                   href="tel:+919876543210"
//                   className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
//                 >
//                   <Phone size={15} className="text-amber-500 flex-shrink-0" />
//                   +91 81999 00000
//                 </a>
//               </li>

//               {/* Email */}
//               <li>
//                 <a
//                   href="mailto:hello@Treno.in"
//                   className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors group"
//                 >
//                   <Mail size={15} className="text-amber-500 flex-shrink-0" />
//                   hello@Treno.in
//                 </a>
//               </li>

//               {/* Working hours */}
//               <li className="flex gap-3">
//                 <Clock
//                   size={15}
//                   className="text-amber-500 mt-0.5 flex-shrink-0"
//                 />
//                 <div className="text-sm text-slate-400">
//                   <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
//                   <p>Sunday: 10:00 AM - 4:00 PM</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/*  Bottom bar  */}
//       <div className="border-t border-white/5">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             {/* Copyright + Legal links */}
//             <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1">
//               <span className="text-xs text-slate-500">
//                 © {new Date().getFullYear()} Treno. All rights reserved.
//               </span>
//               <span className="text-slate-700 hidden sm:inline">|</span>
//               {LEGAL_LINKS.map(({ label, href }, idx) => (
//                 <span key={label} className="flex items-center gap-4">
//                   <Link
//                     to={href}
//                     className="text-xs text-slate-500 hover:text-amber-400 transition-colors"
//                   >
//                     {label}
//                   </Link>
//                   {idx < LEGAL_LINKS.length - 1 && (
//                     <span className="text-slate-700">|</span>
//                   )}
//                 </span>
//               ))}
//             </div>

//             {/* Payment method labels */}
//             <div className="flex items-center gap-2 flex-wrap justify-center">
//               <span className="text-xs text-slate-600 mr-1">We accept:</span>
//               {PAYMENT_METHODS.map((method) => (
//                 <span
//                   key={method}
//                   className="inline-flex items-center px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-medium text-slate-400"
//                 >
//                   {method}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
import TrenoLogo from "../../assets/TrenoLogo.webp";

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
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Spiti Valley", href: "/destinations/spiti" },
  { label: "Andaman", href: "/destinations/andaman" },
  { label: "Meghalaya", href: "/destinations/meghalaya" },
  { label: "Shimla", href: "/destinations/shimla" },
  { label: "Sikkim", href: "/destinations/sikkim" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
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
              <div className="inline-flex items-center px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg group-hover:bg-white/15 transition-all duration-300">
                <img
                  src={TrenoLogo}
                  alt="Treno Logo"
                  className="h-32  w-32 object-contain filter brightness-125 contrast-125"
                />
              </div>
            </Link>

            <p className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
              Explore. Experience. Remember.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Treno is your trusted travel companion for curated group trips,
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
                    onClick={() => window.scrollTo(0,0)}
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
