//  Fallback mock data used when API fails
const MOCK_TRIP = {
  _id: "mock-trip-001",
  title: "Manali to Leh Bike Expedition",
  slug: "manali-leh-bike-expedition",
  category: "Adventure",
  difficulty: "Challenging",
  duration: "10 Days / 9 Nights",
  groupSize: "6–14 people",
  startingFrom: "Manali, Himachal Pradesh",
  price: 24999,
  originalPrice: 32000,
  discount: 22,
  rating: 4.8,
  reviewCount: 312,
  images: [
    // 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    // 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
    // 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200',

    "https://images.pexels.com/photos/5205541/pexels-photo-5205541.jpeg",
  ],
  location: "Himachal Pradesh & Ladakh",
  highlights: [
    "Cross the iconic Rohtang Pass & Baralacha La",
    "Camp under the stars at Sarchu",
    "Traverse the highest motorable road – Khardung La (18,379 ft)",
    "Explore the pristine Pangong Lake",
    "Expert guides & fully equipped support vehicle",
  ],
  inclusions: [
    "Accommodation (hotels + camping)",
    "All meals as per itinerary",
    "Royal Enfield 350cc motorbike",
    "Expert ride leader & backup vehicle",
    "Inner Line Permits",
    "Oxygen cylinders & first-aid kit",
  ],
  exclusions: [
    "Airfare / personal transport to Manali",
    "Personal riding gear (helmet, jacket, gloves)",
    "Travel insurance",
    "Any meals not mentioned",
    "Tips & personal expenses",
  ],
  thingsToCarry: [
    "Valid government-issued photo ID",
    "Warm layered clothing",
    "Sunscreen SPF 50+",
    "Sunglasses (UV protected)",
    "Personal medicines & prescriptions",
    "Power bank & charging cables",
    "Cash (ATMs limited in Ladakh)",
    "Reusable water bottle",
  ],
  availableDates: [
    { id: "d1", label: "Jun 15, 2025", available: 4 },
    { id: "d2", label: "Jun 29, 2025", available: 8 },
    { id: "d3", label: "Jul 12, 2025", available: 6 },
    { id: "d4", label: "Jul 26, 2025", available: 2 },
    { id: "d5", label: "Aug 9, 2025", available: 10 },
  ],
  guide: {
    name: "Arjun Mehta",
    avatar: "https://i.pravatar.cc/150?img=8",
    experience: "8 years",
    languages: "English, Hindi, Punjabi",
    rating: 4.9,
    bio: "Arjun is a certified mountaineer and seasoned bike-expedition leader who has completed the Manali-Leh route 40+ times.",
  },
  faqs: [
    {
      q: "Do I need prior biking experience?",
      a: "Yes, you need a valid driving licence and at least 1 year of riding experience on highways.",
    },
    {
      q: "What is the cancellation policy?",
      a: "Full refund if cancelled 30+ days before departure. 50% refund between 15-30 days. No refund within 15 days.",
    },
    {
      q: "Is altitude sickness a concern?",
      a: "Altitude sickness can occur above 12,000 ft. We carry acclimatisation days, oxygen cylinders, and first-aid support.",
    },
    {
      q: "What kind of bikes are provided?",
      a: "Royal Enfield Bullet/Thunderbird 350cc - ideal for mountain terrain. Automatic variants are not available.",
    },
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrive in Manali",
      description: "Check in, bike briefing, gear inspection & welcome dinner.",
    },
    {
      day: 2,
      title: "Manali -> Jispa",
      description:
        "Cross Rohtang Pass, ride through Keylong, camp at Jispa (10,800 ft).",
    },
    {
      day: 3,
      title: "Jispa -> Sarchu",
      description:
        "Baralacha La (16,500 ft), vast Himalayan plateau, overnight camp.",
    },
    {
      day: 4,
      title: "Sarchu -> Leh",
      description:
        "Tanglang La (17,582 ft), arrive Leh, hotel check-in & rest.",
    },
    {
      day: 5,
      title: "Leh - Acclimatisation Day",
      description: "Explore Leh Palace, Shanti Stupa, local market.",
    },
  ],
};

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star as StarIcon,
  MapPin as MapPinIcon,
  Clock as ClockIcon,
  Users as UsersIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Check as CheckIcon,
  X as XMarkIcon,
  Share2 as ShareIcon,
  Heart as HeartIcon,
  ShieldCheck as ShieldCheckIcon,
  Phone as PhoneIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  ChevronRight as ChevronRightIcon,
  ArrowLeft as ArrowLeftIcon,
  CalendarDays as CalendarDaysIcon,
  Flag as FlagIcon,
  Zap as BoltIcon,
} from "lucide-react";

import SEOHead from "../components/common/SEOHead.jsx";
import TripGallery from "../components/trip/TripGallery.jsx";
import TripItinerary from "../components/trip/TripItinerary.jsx";
import TripReviews from "../components/trip/TripReviews.jsx";
import SimilarTrips from "../components/trip/SimilarTrips.jsx";
import { useGetTripBySlugQuery } from "../store/api/tripApi.js";

//  Skeleton
function TripDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[60vh] bg-gray-200 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl" />
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full" />
            ))}
          </div>
        </div>
        <div className="h-96 bg-gray-200 rounded-2xl" />
      </div>
    </div>
  );
}

const decodeHtml = (html) => {
  if (typeof window === "undefined" || !html) return html;
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

//  FAQ Accordion Item
function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
      >
        <span className="font-medium text-gray-800 text-sm">
          {faq.question}
        </span>
        {open ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

//  Main Component
export default function TripDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetTripBySlugQuery(slug);
  const trip = data?.data || (isError || !data ? MOCK_TRIP : null);
  console.log(trip);

  // Booking sidebar state
  const [selectedDate, setSelectedDate] = useState(null);
  const [travelers, setTravelers] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  // Normalize API structures
  const categoryName = trip?.category?.name || "";
  const categorySlug = trip?.category?.slug || "";
  const displayPrice = trip?.price?.discounted ?? trip?.effectivePrice ?? 0;
  const originalPrice = trip?.price?.original ?? 0;
  const discountPercent = trip?.discountPercent ?? 0;
  const totalReviews = trip?.totalReviews ?? 0;
  const averageRating = trip?.averageRating ?? 0;

  const durationText = trip?.duration
    ? `${trip.duration.days} Day${trip.duration.days > 1 ? "s" : ""}${trip.duration.nights ? ` / ${trip.duration.nights} Night${trip.duration.nights > 1 ? "s" : ""}` : ""}`
    : "";

  const groupSizeText = trip?.groupSize
    ? `${trip.groupSize.min}-${trip.groupSize.max} Pax`
    : "";

  const startingFromText = trip?.location?.from || "";

  const destinationText = trip?.location?.destinations
    ? trip.location.destinations.join(", ")
    : "";

  // Process available dates from backend startDates field
  const availableDates =
    trip?.startDates?.map((d, i) => ({
      id: d._id || i.toString(),
      label: new Date(d.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      available: d.slots,
      rawDate: d.date,
    })) || [];

  // Fallback if images array is empty but thumbnail url exists
  const tripImages = trip?.images?.length
    ? trip.images
    : trip?.thumbnail?.url
      ? [trip.thumbnail.url]
      : [];

  // Automatically select the first available date once data loads
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [trip, selectedDate, availableDates]);

  const totalPrice = originalPrice * travelers;
  const savings = (originalPrice - displayPrice) * travelers;

  const handleBookNow = () => {

    window.scrollTo({ top: 0, behavior: 'smooth' }); // 'smooth' or 'auto'
    if (!selectedDate) {
      alert("Please select a travel date.");
      return;
    }

    if (!trip?._id) {
      alert("Trip details are still loading.");
      return;
    }
    navigate(`/booking/${trip?._id}`, {
      state: { selectedDate, travelers, tripTitle: trip?.title, trip: trip },
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: trip.title, url: window.location.href });
      } catch (err) {
        console.info("Share cancelled or failed: ", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) return <TripDetailSkeleton />;

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🏔️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Trip not found
        </h2>
        <p className="text-gray-500 mb-6">
          The trip you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/trips"
          className="bg-amber-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-600 transition"
        >
          Browse All Trips
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={`${trip.title} | Treno`}
        description={`${trip.highlights?.[0] || ""} — ${durationText} trip starting from ₹${displayPrice?.toLocaleString("en-IN")}.`}
        ogImage={tripImages?.[0]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back
            </button>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link to="/" className="hover:text-amber-500">
                Home
              </Link>
              <ChevronRightIcon className="w-3 h-3" />
              <Link to="/trips" className="hover:text-amber-500">
                Trips
              </Link>
              {categoryName && (
                <>
                  <ChevronRightIcon className="w-3 h-3" />
                  <Link
                    to={`/trips?category=${categorySlug || categoryName.toLowerCase()}`}
                    className="hover:text-amber-500 capitalize"
                  >
                    {categoryName}
                  </Link>
                </>
              )}
              <ChevronRightIcon className="w-3 h-3" />
              <span className="text-gray-800 font-medium line-clamp-1 max-w-[200px]">
                {trip.title}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Hero Gallery ── */}
        <div className="w-full" style={{ height: "60vh", minHeight: 320 }}>
          <TripGallery images={tripImages} title={trip.title} />
        </div>

        {/* ── Two-column layout ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/*  Main Content (left, 2/3)  */}
            <article className="flex-1 min-w-0 space-y-10">
              {/* 1. Trip Header */}
              <section>
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  {categoryName && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {categoryName}
                    </span>
                  )}
                  {trip.difficulty && (
                    <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {trip.difficulty}
                    </span>
                  )}
                  {durationText && (
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      {durationText}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-3">
                  {trip.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  {destinationText && (
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4 text-amber-500" />
                      {destinationText}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <strong className="text-gray-800">{averageRating}</strong>
                    <span className="text-gray-400">
                      ({totalReviews} reviews)
                    </span>
                  </span>
                </div>
              </section>

              {/* 2. Overview Stat Cards */}
              <section>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: ClockIcon, label: "Duration", value: durationText },
                    {
                      icon: BoltIcon,
                      label: "Difficulty",
                      value: trip.difficulty,
                    },
                    {
                      icon: UsersIcon,
                      label: "Group Size",
                      value: groupSizeText,
                    },
                    {
                      icon: MapPinIcon,
                      label: "Starting From",
                      value: startingFromText,
                    },
                  ].map(
                    ({ icon: Icon, label, value }) =>
                      value && (
                        <div
                          key={label}
                          className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col items-center text-center gap-2"
                        >
                          <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-amber-500" />
                          </div>
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                            {label}
                          </p>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">
                            {value}
                          </p>
                        </div>
                      ),
                  )}
                </div>
              </section>

              {/* 3. Description (Render rich text description from API) */}
              {trip.description && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-3">
                    Overview
                  </h2>
                  <div
                    className="prose prose-sm text-gray-600 leading-relaxed max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(trip.description),
                    }}
                  />
                </section>
              )}

              {/* 4. Highlights */}
              {trip.highlights?.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                    Trip Highlights
                  </h2>
                  <ul className="space-y-2.5">
                    {trip.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-amber-600" />
                        </span>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 5. Itinerary */}
              {trip.itinerary?.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                    Day-by-Day Itinerary
                  </h2>
                  <TripItinerary itinerary={trip.itinerary} />
                </section>
              )}

              {/* 6. Inclusions & Exclusions */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 font-playfair mb-5">
                  What's Included / Excluded
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  <div className="bg-green-50 rounded-xl p-5">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-600" />{" "}
                      Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {trip.inclusions?.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-green-700"
                        >
                          <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Exclusions */}
                  <div className="bg-red-50 rounded-xl p-5">
                    <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <XMarkIcon className="w-5 h-5 text-red-500" /> Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {trip.exclusions?.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-red-700"
                        >
                          <XMarkIcon className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 7. Things to Carry */}
              {trip.thingsToCarry?.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                    Things to Carry
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {trip.thingsToCarry.map((item, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                          defaultChecked={false}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* 8. Guide Info */}
              {trip.guide && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                    Your Trip Leader
                  </h2>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-5 items-start">
                    {trip.guide.avatar && (
                      <img
                        src={trip.guide.avatar}
                        alt={trip.guide.name}
                        className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-amber-200"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">
                        {trip.guide.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        {trip.guide.experience && (
                          <span className="flex items-center gap-1">
                            <FlagIcon className="w-3.5 h-3.5" />
                            {trip.guide.experience} experience
                          </span>
                        )}
                        {trip.guide.rating && (
                          <span className="flex items-center gap-1">
                            <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            {trip.guide.rating} rating
                          </span>
                        )}
                        {trip.guide.languages && (
                          <span>{trip.guide.languages}</span>
                        )}
                      </div>
                      {trip.guide.bio && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {trip.guide.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* 9. FAQs */}
              {trip.faqs?.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {trip.faqs.map((faq, i) => (
                      <FaqItem key={i} faq={faq} />
                    ))}
                  </div>
                </section>
              )}

              {/* 10. Reviews */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                  Traveller Reviews
                </h2>
                <TripReviews
                  tripId={trip._id}
                  rating={averageRating}
                  reviewCount={totalReviews}
                />
              </section>

              {/* 11. Similar Trips */}
              {/* <section className="pb-10">
                <h2 className="text-xl font-bold text-gray-900 font-playfair mb-4">
                  You Might Also Like
                </h2>
                <SimilarTrips
                  currentTripId={trip._id}
                  category={trip.category}
                />
              </section> */}
            </article>

            {/*  Sticky Booking Sidebar (right, 1/3) */}
            <aside className="w-full lg:w-[360px] flex-shrink-0">
              <div className="lg:sticky lg:top-24 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                {/* Pricing */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-5">
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-extrabold text-white">
                      ₹{displayPrice?.toLocaleString("en-IN")}
                    </span>
                    {originalPrice > displayPrice && (
                      <span className="text-white/70 line-through text-base mb-0.5">
                        ₹{originalPrice?.toLocaleString("en-IN")}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="bg-white text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full mb-1">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-xs mt-0.5">
                    per person (inclusive of taxes)
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Group size info */}
                  {groupSizeText && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4 text-amber-500" />
                      <span>{groupSizeText}</span>
                    </div>
                  )}

                  {/* Date Selector */}
                  {availableDates.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                        Select Date
                      </label>
                      <div className="grid grid-cols-1 gap-2 max-h-44 overflow-y-auto pr-1">
                        {availableDates.map((date) => (
                          <button
                            key={date.id}
                            onClick={() => setSelectedDate(date)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition ${
                              selectedDate?.id === date.id
                                ? "border-amber-500 bg-amber-50 text-amber-700 font-semibold"
                                : "border-gray-200 hover:border-amber-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <CalendarDaysIcon className="w-4 h-4 text-gray-400" />
                              {date.label}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                date.available <= 3
                                  ? "bg-red-50 text-red-600"
                                  : "bg-green-50 text-green-600"
                              }`}
                            >
                              {date.available} seats
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Travelers Counter */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                      Travelers
                    </label>
                    <div className="flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-2 w-fit">
                      <button
                        onClick={() => setTravelers((p) => Math.max(1, p - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition disabled:opacity-40"
                        disabled={travelers <= 1}
                      >
                        <MinusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="text-lg font-semibold w-6 text-center text-gray-800">
                        {travelers}
                      </span>
                      <button
                        onClick={() => setTravelers((p) => Math.min(14, p + 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-amber-100 flex items-center justify-center transition"
                      >
                        <PlusIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        ₹{originalPrice?.toLocaleString("en-IN")} × {travelers}{" "}
                        traveler
                        {travelers > 1 ? "s" : ""}
                      </span>
                      <span>₹{totalPrice?.toLocaleString("en-IN")}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>You save</span>
                        <span>₹{savings?.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900 text-base">
                      <span>Total</span>
                      <span>₹{(totalPrice-savings)?.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Book Now */}
                  <button
                    onClick={handleBookNow}
                  
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition text-base shadow-md shadow-amber-200"
                  >
                    Book Now
                  </button>

                  {/* Enquire */}
                  <Link
                    to="/contact"
                    onClick={()=>{window.scrollTo(0,0)}}
                    className="flex items-center justify-center w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 rounded-xl transition text-sm cursor-pointer"
                  >
                    Enquire About This Trip
                  </Link>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {[
                      { icon: ShieldCheckIcon, label: "Secure Payment" },
                      { icon: XMarkIcon, label: " Cancellation" },
                      { icon: PhoneIcon, label: "24/7 Support" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1 text-center"
                      >
                        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-[10px] text-gray-500 leading-tight">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Share + Wishlist */}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                      <ShareIcon className="w-4 h-4" /> Share
                    </button>
                    <button
                      onClick={() => setWishlisted((w) => !w)}
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                      <HeartIcon
                        className={`w-4 h-4 transition-colors ${
                          wishlisted
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600"
                        }`}
                      />
                      {wishlisted ? "Saved" : "Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
