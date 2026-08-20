/**
 * @file Navbar.jsx
 * @description Sticky, scroll-aware navigation bar for Treno travel booking platform.
 * Supports desktop mega-dropdown menus, expandable search, auth-aware user menu,
 * and a slide-in mobile menu — all animated with Framer Motion.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import "../../index.css";
import {
  Mountain,
  Menu,
  X,
  Search,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  BookOpen,
  Heart,
  Waves,
  Zap,
  Landmark,
  Backpack,
  PawPrint,
  Calendar,
  MapPin,
  Globe,
  Phone,
  CalendarDays,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { useScrollPosition } from "../../hooks/useScrollAnimation.js";
import TrenoLogo from "../../assets/TrenoLogo1.png";

// --------------------
// Data
// --------------------

/** @type {{ label: string, icon: import('react').ElementType, href: string }[]} */
const TRIP_CATEGORIES = [
  { label: "Trekking", icon: Mountain, href: "/trips?category=trekking" },
  { label: "Beach", icon: Waves, href: "/trips?category=beach" },
  { label: "Adventure", icon: Zap, href: "/trips?category=adventure" },
  { label: "Cultural", icon: Landmark, href: "/trips?category=cultural" },
  { label: "Honeymoon", icon: Heart, href: "/trips?category=honeymoon" },
  { label: "Backpacking", icon: Backpack, href: "/trips?category=backpacking" },
  { label: "Wildlife", icon: PawPrint, href: "/trips?category=wildlife" },
  {
    label: "Weekend Getaways",
    icon: Calendar,
    href: "/trips?category=weekend-getaways",
  },
];

/** @type {{ label: string, href: string }[]} */
const DESTINATIONS = [
  { label: "Manali", href: "/destinations/manali" },
  { label: "Goa", href: "/destinations/goa" },
  { label: "Kerala", href: "/destinations/kerala" },
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Andaman", href: "/destinations/andaman" },
  { label: "Meghalaya", href: "/destinations/meghalaya" },
  { label: "Shimla", href: "/destinations/shimla" },
  { label: "Jaipur", href: "/destinations/jaipur" },
  { label: "Sikkim", href: "/destinations/sikkim" },
  { label: "Uttarakhand", href: "/destinations/uttarakhand" },
  { label: "Nagaland", href: "/destinations/nagaland" },
  { label: "Agra", href: "/destinations/agra" },
  { label: "Varanasi", href: "/destinations/varanasi" },
  { label: "Kashmir", href: "/destinations/kashmir" },
];

/** @type {{ label: string, href: string }[]} */
const INTERNATIONALTRIP = [
  { label: "Europe", href: "/international-trip/europe" },
  { label: "Thailand", href: "/international-trip/thailand" },
  { label: "Georgia", href: "/international-trip/georgia" },
  { label: "Philippines", href: "/international-trip/philippines" },
  { label: "Kazakhstan", href: "/international-trip/kazakhstan" },
  { label: "Singapore", href: "/international-trip/singapore" },
  { label: "Switzerland", href: "/international-trip/switzerland" },
  { label: "Australia", href: "/international-trip/australia" },
  { label: "Iceland", href: "/international-trip/iceland" },
  { label: "Vietnam", href: "/international-trip/vietnam" },
  { label: "Japan", href: "/international-trip/japan" },
  { label: "Sri Lanka", href: "/international-trip/sri-lanka" },
  { label: "Egypt", href: "/international-trip/egypt" },
  { label: "Maldives", href: "/international-trip/maldives" },
  { label: "New Zealand", href: "/international-trip/new-zealand" },
  { label: "Spain", href: "/international-trip/spain" },
  { label: "Malaysia", href: "/international-trip/malaysia" },
  { label: "Bali", href: "/international-trip/bali" },
  { label: "Kenya", href: "/international-trip/kenya" },
  { label: "Bhutan", href: "/international-trip/bhutan" },
  { label: "Turkey", href: "/international-trip/turkey" },
  { label: "South Africa", href: "/international-trip/south-africa" },
  { label: "France", href: "/international-trip/france" },
  { label: "Dubai", href: "/international-trip/dubai" },
  { label: "Mauritius", href: "/international-trip/mauritius" },
];

/** @type {{ label: string, href: string }[]} */
const INDIATRIP = [
  { label: "Manali", href: "/india-trip/manali" },
  { label: "Goa", href: "/india-trip/goa" },
  { label: "Kerala", href: "/india-trip/kerala" },
  { label: "Ladakh", href: "/india-trip/ladakh" },
  { label: "Rajasthan", href: "/india-trip/rajasthan" },
  { label: "Andaman", href: "/india-trip/andaman" },
  { label: "Meghalaya", href: "/india-trip/meghalaya" },
  { label: "Shimla", href: "/india-trip/shimla" },
  { label: "Jaipur", href: "/india-trip/jaipur" },
  { label: "Sikkim", href: "/india-trip/sikkim" },
  { label: "Uttarakhand", href: "/india-trip/uttarakhand" },
  { label: "Nagaland", href: "/india-trip/nagaland" },
  { label: "Agra", href: "/india-trip/agra" },
  { label: "Varanasi", href: "/india-trip/varanasi" },
  { label: "Kashmir", href: "/india-trip/kashmir" },
];

const GROUPTOURS = [
  { label: "Europe", href: "/group-tour/europe" },
  { label: "Bali", href: "/group-tour/bali" },
  { label: "Bhutan", href: "/group-tour/bhutan" },
  { label: "Himachal Pradesh", href: "/group-tour/himachal-pradesh" },
  { label: "Japan", href: "/group-tour/japan" },
  { label: "Kazakhstan", href: "/group-tour/kazakhstan" },
  { label: "Georgia", href: "/group-tour/georgia" },
  { label: "Meghalaya", href: "/group-tour/meghalaya" },
  { label: "Ladakh", href: "/group-tour/ladakh" },
  { label: "Rajasthan", href: "/group-tour/rajasthan" },
  { label: "Uttarakhand", href: "/group-tour/uttarakhand" },
  { label: "Singapore", href: "/group-tour/singapore" },
  { label: "New Zealand", href: "/group-tour/new-zealand" },
  { label: "Egypt", href: "/group-tour/egypt" },
  { label: "Vietnam", href: "/group-tour/vietnam" },
  { label: "Thailand", href: "/group-tour/thailand" },
  { label: "Sri Lanka", href: "/group-tour/sri-lanka" },
  { label: "Arunachal Pradesh", href: "/group-tour/arunachal-pradesh" },
  { label: "Spain", href: "/group-tour/spain" },
  { label: "Iceland", href: "/group-tour/iceland" },
  { label: "Malaysia", href: "/group-tour/malaysia" },
  { label: "Spiti", href: "/group-tour/spiti" },
  { label: "Andaman", href: "/group-tour/andaman" },
  { label: "Zanskar", href: "/group-tour/zanskar" },
  { label: "Nagaland", href: "/group-tour/nagaland" },
  { label: "Kenya", href: "/group-tour/kenya" },
  { label: "Philippines", href: "/group-tour/philippines" },
];

/** @type {{ label: string, href: string }[]} */
const USER_MENU_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Bookings", icon: BookOpen, href: "/dashboard/bookings" },
  { label: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
];

const CONTACT = [];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.14 } },
};

const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { x: "100%", transition: { duration: 0.22, ease: "easeIn" } },
};

const searchVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 200,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { width: 0, opacity: 0, transition: { duration: 0.2 } },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/**
 * Desktop mega-dropdown for the "Trips" nav item.
 * @param {{ isOpen: boolean }} props
 */
function TripsDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[540px] bg-white  rounded-2xl shadow-2xl border border-slate-100 p-6 "
        >
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Browse by Type
          </p>
          <div className="grid grid-cols-4 gap-3">
            {TRIP_CATEGORIES.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                to={href}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-amber-50 transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                  <Icon size={18} className="text-amber-600" />
                </span>
                <span className="text-xs font-medium text-slate-700 text-center leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm text-slate-500">
              Looking for something specific?
            </span>
            <Link
              to="/trips"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View All Trips <Globe size={14} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Desktop dropdown for the "Destinations" nav item.
 * @param {{ isOpen: boolean }} props
 */
function DestinationsDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 grid grid-cols-3"
        >
          {DESTINATIONS.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              {label}
            </Link>
          ))}
          <div className="mt-1 pt-2 border-t border-slate-100">
            <Link
              to="/destinations"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Globe size={14} />
              All Destinations
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Desktop dropdown for the "International" nav item.
 * @param {{ isOpen: boolean }} props
 */
function InternationalTripDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 grid grid-cols-3 gap-1"
        >
          {INTERNATIONALTRIP.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              {label}
            </Link>
          ))}

          {/* Fixed: Added col-span-3 so it spans the entire width of the grid */}
          <div className="col-span-3 mt-1 pt-2 border-t border-slate-100">
            <Link
              to="/international-trip"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Globe size={14} />
              International Trip
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Desktop dropdown for the "India" nav item.
 * @param {{ isOpen: boolean }} props
 */
function IndiaTripDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 grid grid-cols-3 gap-1"
        >
          {INDIATRIP.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              {label}
            </Link>
          ))}

          {/* Fixed: Added col-span-3 so it spans the entire width of the grid */}
          <div className="col-span-3 mt-1 pt-2 border-t border-slate-100">
            <Link
              to="/india-trip"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Globe size={14} />
              India Trip
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Desktop dropdown for the "Group Tour" nav item.
 * @param {{ isOpen: boolean }} props
 */
function GroupTourDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 grid grid-cols-4 gap-1"
        >
          {GROUPTOURS.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              <MapPin size={14} className="text-amber-500 flex-shrink-0" />
              {label}
            </Link>
          ))}

          {/* Fixed: Added col-span-3 so it spans the entire width of the grid */}
          <div className="col-span-3 mt-1 pt-2 border-t border-slate-100">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Globe size={14} />
              Group Tour
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Authenticated user avatar + dropdown menu.
 * @param {{ user: object, onLogout: () => void }} props
 */
function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = user?.avatar || null;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 focus:outline-none group"
        aria-label="User menu"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center overflow-hidden ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user?.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-sm font-bold">{initials}</span>
          )}
        </div>
        <ChevronDown
          size={14}
          className={clsx(
            "text-slate-500 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
          >
            <div className="px-3 py-2 mb-1 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user?.name || "Traveler"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || ""}
              </p>
            </div>
            {USER_MENU_ITEMS.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                to={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <Icon size={15} className="text-slate-400" />
                {label}
              </Link>
            ))}
            <div className="mt-1 pt-1 border-t border-slate-100">
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * Treno sticky navigation bar.
 * Becomes solid white with shadow once the user scrolls past 50 px.
 */
export default function Navbar() {
  const { isAuthenticated, user, handleLogout } = useAuth();
  const scrollY = useScrollPosition();
  const navigate = useNavigate();

  const isScrolled = scrollY > 50;

  // Active dropdown: 'trips' | 'destinations' | null
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileTripsOpen, setMobileTripsOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside the navbar
  const navRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    console.log(mobileOpen);
    document.body.style.overflow = mobileOpen ? "hidden !important" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/trips?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
        setSearchOpen(false);
      }
    },
    [searchQuery, navigate],
  );

  // const handleLogout = useCallback(() => {
  //   handleLogout();
  //   navigate("/");
  // }, [logout, navigate]);

  const toggleDropdown = (name) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* <div class="w-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-white py-1 shadow-lg overflow-hidden relative">
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount="15"
          onmouseover="this.stop();"
          onmouseout="this.start();"
        >
          <h1 class="text-sm md:text-sm font-extrabold tracking-wide inline-flex items-center mx-4 select-none">
            <span class="bg-white text-indigo-700 px-3 py-1 rounded-full text-sm font-black mr-3 shadow-md">HOT DEAL</span> 
            Treno Your Trusted Travel Partner Offers Best and Affordable Travel
            Packages in Karnal!
          </h1>
        </marquee>
      </div> */}

      {/* Top bar */}
      <div className="sticky top-0 z-40">
        <div className="text-sm hidden md:block bg-gray-900 backdrop-blur-sm bg-opacity-95 ">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <p className="text-brand-100 font-medium tracking-wide animate-pulse"></p>
            <div className="flex items-center gap-5">
              {/* Logo  */}
              {/* <Link
              to="/"
              className="flex items-center justify-center flex-shrink-0 group relative"
            >
              
              <div
                className={clsx(
                  "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
                  isScrolled ? "bg-slate-900" : "bg-white",
                )}
              />

              <img
                src={TrenoLogoImg}
                alt="Treno Logo"
                className="w-16 h-16 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg  mr-112"
              />
            </Link> */}

              {/* Expandable search */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2"
              >
                <AnimatePresence>
                  {searchOpen && (
                    <motion.input
                      key="search-input"
                      ref={searchInputRef}
                      variants={searchVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      type="text"
                      placeholder="Search trips…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Escape" && setSearchOpen(false)
                      }
                      className="h-9 px-3 rounded-full border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  )}
                </AnimatePresence>
                <button
                  type={searchOpen ? "submit" : "button"}
                  onClick={!searchOpen ? handleSearchOpen : undefined}
                  className={clsx(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors mr-4",
                    isScrolled ? "text-slate-600 " : "text-white",
                  )}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </form>

              {/* Upcoming Trip*/}
              <Link
                to="/upcoming-trip"
                className="text-sm flex items-center font-medium text-white hover:text-brand-200 transition-colors duration-300 relative group py-0.5"
              >
                <CalendarDays size={18} />
                Upcoming Trips
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-200 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Corporate Tour*/}
              <Link
                to="/corporate-tour"
                className="text-sm font-medium text-white hover:text-brand-200 transition-colors duration-300 relative group py-0.5"
              >
                Corporate Tour
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-200 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                className="text-sm font-medium text-white hover:text-brand-200 transition-colors duration-300 relative group py-0.5"
              >
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-200 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-white hover:text-brand-200 transition-colors duration-300 relative group py-0.5"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5  bg-brand-200 transition-all duration-300 group-hover:w-full" />
              </Link>
              <a
                href="tel:918816942362"
                className=" flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors border transform-gpu perspective-1000 hover:-translate-y-1 hover:rotate-x-6 hover:shadow-2xl text-white"
              >
                <Phone size={15} className="animate-bounce" /> +91 8816942362
              </a>
            </div>
          </div>
        </div>
        <header
          ref={navRef}
          className={clsx(
            "relative left-0 right-0 transition-all duration-300",
            isScrolled ? "bg-white shadow-md" : "header-bg",
          )}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-16">
              {/* Logo  */}
              <Link
                to="/"
                className="flex items-center justify-center flex-shrink-0 group relative"
              >
                {/* Soft background glow */}
                <div
                  className={clsx(
                    "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
                    isScrolled ? "bg-slate-900" : "bg-white",
                  )}
                />

                {/* Corrected aspect ratio with object-contain and height constraint */}
                <img
                  src={TrenoLogo}
                  alt="Treno Logo"
                  className="h-11 w-auto object-contain transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg"
                />
              </Link>

              {/*  Desktop Links */}
              <ul className="hidden lg:flex items-center gap-1">
                {/* Home */}
                <li>
                  <Link
                    to="/"
                    className={clsx(
                      "px-3 py-2 rounded-lg text-base font-semibold transition-colors hover:bg-white/20 hover:text-sky-500",
                      isScrolled ? "text-slate-700" : "text-white",
                    )}
                  >
                    Home
                  </Link>
                </li>

                {/* International Trip */}
                <li
                  className="relative"
                  onMouseEnter={() => toggleDropdown("international-trip")}
                  onMouseLeave={() => toggleDropdown(null)} // or setActiveDropdown(null)
                >
                  <button
                    aria-expanded={activeDropdown === "international-trip"}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown("international-trip")}
                    className={clsx(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-base font-semibold transition-colors hover:bg-white/20 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                      isScrolled ? "text-slate-700" : "text-white",
                      activeDropdown === "international-trip" &&
                        "text-amber-500",
                    )}
                  >
                    International Trip
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform duration-200",
                        activeDropdown === "international-trip" && "rotate-180",
                      )}
                    />
                  </button>

                  <InternationalTripDropdown
                    isOpen={activeDropdown === "international-trip"}
                  />
                </li>

                {/* India Trip */}
                <li
                  className="relative"
                  onMouseEnter={() => toggleDropdown("india-trip")}
                  onMouseLeave={() => toggleDropdown(null)} // or setActiveDropdown(null)
                >
                  <button
                    aria-expanded={activeDropdown === "india-trip"}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown("india-trip")}
                    className={clsx(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-base font-semibold  transition-colors hover:bg-white/20 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                      isScrolled ? "text-slate-700" : "text-white",
                      activeDropdown === "india-trip" && "text-amber-500",
                    )}
                  >
                    India Trip
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform duration-200",
                        activeDropdown === "india-trip" && "rotate-180",
                      )}
                    />
                  </button>

                  <IndiaTripDropdown isOpen={activeDropdown === "india-trip"} />
                </li>

                {/* Group Tour */}
                <li
                  className="relative"
                  onMouseEnter={() => toggleDropdown("group-tour")}
                  onMouseLeave={() => toggleDropdown(null)} // or setActiveDropdown(null)
                >
                  <button
                    aria-expanded={activeDropdown === "group-tour"}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown("group-tour")}
                    className={clsx(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-base font-semibold  transition-colors hover:bg-white/20 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                      isScrolled ? "text-slate-700" : "text-white",
                      activeDropdown === "india-trip" && "text-amber-500",
                    )}
                  >
                    Group Tour
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform duration-200",
                        activeDropdown === "group-tour" && "rotate-180",
                      )}
                    />
                  </button>

                  <GroupTourDropdown isOpen={activeDropdown === "group-tour"} />
                </li>

                {/* Trips */}
                {/* <li className="relative">
                <button
                  onClick={() => toggleDropdown("trips")}
                  className={clsx(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-white/20 hover:text-amber-500",
                    isScrolled ? "text-slate-700" : "text-white",
                    activeDropdown === "trips" && "text-amber-500",
                  )}
                >
                  Trips
                  <ChevronDown
                    size={14}
                    className={clsx(
                      "transition-transform duration-200",
                      activeDropdown === "trips" && "rotate-180",
                    )}
                  />
                </button>
                <TripsDropdown isOpen={activeDropdown === "trips"} />
              </li> */}

                {/* Destinations */}
                <li
                  className="relative"
                  onMouseEnter={() => toggleDropdown("destinations")}
                  onMouseLeave={() => toggleDropdown(null)} // or setActiveDropdown(null)
                >
                  <button
                    aria-expanded={activeDropdown === "india-trip"}
                    aria-haspopup="true"
                    onClick={() => toggleDropdown("destinations")}
                    className={clsx(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-base font-semibold  transition-colors hover:bg-white/20 hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                      isScrolled ? "text-slate-700" : "text-white",
                      activeDropdown === "destinations" && "text-amber-500",
                    )}
                  >
                    Destinations
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform duration-200",
                        activeDropdown === "destinations" && "rotate-180",
                      )}
                    />
                  </button>

                  <DestinationsDropdown
                    isOpen={activeDropdown === "destinations"}
                  />
                </li>

                {/* Packages */}
                <li>
                  <Link
                    to="/packages"
                    onClick={() => window.scrollTo(0, 0)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-base font-semibold  transition-colors hover:bg-white/20 hover:text-sky-500",
                      isScrolled ? "text-slate-700" : "text-white",
                    )}
                  >
                    Packages
                  </Link>
                </li>

                {/* Blog */}
                {/* <li>
                <Link
                  to="/blog"
                  onClick={() => window.scrollTo(0, 0)}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-white/20 hover:text-amber-500",
                    isScrolled ? "text-slate-700" : "text-white",
                  )}
                >
                  Blog
                </Link>
              </li> */}

                {/* About */}
                <li>
                  <Link
                    to="/about"
                    onClick={() => window.scrollTo(0, 0)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-base font-semibold transition-colors hover:bg-white/20 hover:text-sky-500",
                      isScrolled ? "text-slate-700" : "text-white",
                    )}
                  >
                    About
                  </Link>
                </li>

                {/* CONTACT */}
                {/* <li>
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-base font-medium transition-colors hover:bg-white/20 hover:text-amber-500",
                    isScrolled ? "text-slate-700" : "text-white",
                  )}
                >
                  Contact
                </Link>
              </li> */}
              </ul>

              {/*  Right Controls  */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Expandable search */}
                {/* <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2"
              >
                <AnimatePresence>
                  {searchOpen && (
                    <motion.input
                      key="search-input"
                      ref={searchInputRef}
                      variants={searchVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      type="text"
                      placeholder="Search trips…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Escape" && setSearchOpen(false)
                      }
                      className="h-9 px-3 rounded-full border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  )}
                </AnimatePresence>
                <button
                  type={searchOpen ? "submit" : "button"}
                  onClick={!searchOpen ? handleSearchOpen : undefined}
                  className={clsx(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                    isScrolled
                      ? "text-slate-600 hover:bg-slate-100"
                      : "text-white hover:bg-white/20",
                  )}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </form> */}

                {/* Auth */}
                {isAuthenticated ? (
                  <UserDropdown user={user} onLogout={handleLogout} />
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/auth/login"
                      className={clsx(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors border transform-gpu perspective-1000 hover:-translate-y-1 hover:rotate-x-6 hover:shadow-2xl",
                        isScrolled
                          ? "border-slate-300 text-slate-700 hover:bg-slate-50"
                          : "border-white/50 text-white hover:bg-white/10",
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className=" ml-2 px-4 py-2 rounded-full text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-colors shadow-sm shadow-amber-200
                    transform-gpu perspective-1000 hover:-translate-y-1 hover:rotate-x-6 hover:shadow-2xl
                    "
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/*  Mobile hamburger  */}
              <button
                type="button"
                className={clsx(
                  "lg:hidden p-2 rounded-lg transition-colors",
                  isScrolled
                    ? "text-slate-700 hover:bg-slate-100"
                    : "text-white hover:bg-white/20",
                )}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/*  Mobile overlay  */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden overflow-hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center flex-shrink-0 group relative"
                >
                  {/* Soft background glow adjusted for the larger logo profile */}
                  <div
                    className={clsx(
                      "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
                      isScrolled ? "bg-slate-900" : "bg-white",
                    )}
                  />

                  {/* Significantly larger logo profile (w-24 h-24 / 96px) */}
                  <img
                    src={TrenoLogo}
                    alt="Treno Logo"
                    className="w-32 h-32 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile search */}
              <div className="px-5 py-4 border-b border-slate-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      navigate(
                        `/trips?search=${encodeURIComponent(searchQuery.trim())}`,
                      );
                      setSearchQuery("");
                      setMobileOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2"
                >
                  <Search size={16} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search trips…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </form>
              </div>

              {/* Nav links */}
              <nav className="px-4 py-4 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Home
                </Link>

                {/* International Trips accordion */}
                <div>
                  <button
                    onClick={() => setMobileDestOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    International Trips
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        mobileDestOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileDestOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-1"
                      >
                        {INTERNATIONALTRIP.map(({ label, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            <MapPin size={13} className="text-amber-500" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* India Trips accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileDestOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    India Trips
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        mobileDestOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileDestOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-1"
                      >
                        {INDIATRIP.map(({ label, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            <MapPin size={13} className="text-amber-500" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Group Tour accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileDestOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    Group Tours
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        mobileDestOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileDestOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-1"
                      >
                        {GROUPTOURS.map(({ label, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            <MapPin size={13} className="text-amber-500" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Trips accordion */}
                <div>
                  <button
                    onClick={() => setMobileTripsOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    Trips
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        mobileTripsOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileTripsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-1"
                      >
                        {TRIP_CATEGORIES.map(({ label, icon: Icon, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            <Icon size={15} className="text-amber-500" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Destinations accordion */}
                <div>
                  <button
                    onClick={() => setMobileDestOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                  >
                    Destinations
                    <ChevronDown
                      size={14}
                      className={clsx(
                        "transition-transform",
                        mobileDestOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileDestOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-3 mt-1 space-y-1"
                      >
                        {DESTINATIONS.map(({ label, href }) => (
                          <Link
                            key={label}
                            to={href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          >
                            <MapPin size={13} className="text-amber-500" />
                            {label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/packages"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Packages
                </Link>

                {/* <Link
                  to="/event-and-festivels"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Events & Festivals
                </Link> */}

                {/* <Link
                  to="/weekend-gateways"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Weekend Gateways
                </Link> */}

                <Link
                  to="/blog"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Blog
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  Contact
                </Link>
              </nav>

              {/* Auth section */}
              <div className="px-5 py-4 border-t border-slate-100 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center ring-2 ring-amber-200 flex-shrink-0">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-sm font-bold">
                            {user?.name
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase() || "U"}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {user?.name || "Traveler"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {user?.email || ""}
                        </p>
                      </div>
                    </div>
                    {USER_MENU_ITEMS.map(({ label, icon: Icon, href }) => (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        <Icon size={16} className="text-slate-400" />
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2.5 rounded-full text-center text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full py-2.5 rounded-full text-center text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
