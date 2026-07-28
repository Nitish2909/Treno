import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import SEOHead from "../components/common/SEOHead.jsx";

//  Data

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Trip Customization",
  "Booking Support",
  "Partnership",
  "Feedback",
];

const FAQS = [
  {
    q: "How do I cancel or modify a booking?",
    a: 'You can cancel or modify your booking by logging into your account and visiting "My Bookings". Cancellations follow our tiered refund policy. For modifications, contact us at least 48 hours before departure.',
  },
  {
    q: "Are your trips suitable for solo travellers?",
    a: "Absolutely! Most of our trips are group departures designed to be solo-traveller friendly. You will be joining a group of like-minded explorers and can opt for shared accommodation to keep costs low.",
  },
  {
    q: "What documents do I need for a trek?",
    a: "You will need a government-issued photo ID (Aadhaar, Passport, or Voter ID), a medical fitness declaration for treks above 4,000m, and any applicable inner line permits (which Treno arranges for you).",
  },
];

//  FAQ Accordion

function FAQAccordion({ faqs }) {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border border-slate-200 rounded-xl overflow-hidden bg-white"
        >
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-slate-700 text-sm pr-4">
              {faq.q}
            </span>
            {openIdx === idx ? (
              <ChevronUp className="w-4 h-4 text-amber-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// Main component

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.phone && !/^\+?[\d\s-]{7,15}$/.test(form.phone))
      e.phone = "Enter a valid phone number";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  const fieldCls = (name) =>
    `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
      errors[name]
        ? "border-red-400 focus:ring-red-200"
        : "border-slate-200 focus:ring-amber-200 focus:border-amber-400"
    }`;

  return (
    <>
      <SEOHead
        title="Contact Treno - Your Travel Partner | Best Travel Agency in Karnal | Book Your Trip with Treno"
        description="Contactn Treno - Your Travel Partner, a trusted travel agency in Karnal. Get expert assistance for domestic and international tour packages, flight booking, hotel booking, visa assistance, customized holiday packages, group tours, honeymoon trips, and travel inquiries."
        keywords={[
          "Contact Treno- Treno Your Travel Partner",
          "Contact Trip With Treno",
          "Trip With Treno Contact",
          "Travel Agency Contact Karnal",
          "Best Travel Agency in Karnal",
          "Travel Agency Karnal",
          "Tour Operator Karnal",
          "Travel Consultant Karnal",
          "Travel Booking Support",
          "Trip Booking",
          "Tour Package Booking",
          "Domestic Tour Packages",
          "International Tour Packages",
          "Flight Booking",
          "Hotel Booking",
          "Train Ticket Booking",
          "Bus Booking",
          "Cab Booking",
          "Visa Assistance",
          "Travel Insurance",
          "Holiday Packages Karnal",
          "Family Tour Packages",
          "Honeymoon Packages",
          "Customized Tour Packages",
          "Travel Inquiry",
          "Travel Support",
          "Customer Support",
          "Book Your Trip",
          "Trip Planner",
          "Trip With Treno",
        ]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 text-center border-b border-amber-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold uppercase tracking-widest text-sm mb-3">
            We're here to help
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-800">
            Get in Touch
          </h1>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto text-lg">
            Have a question about a trip? Want to customise your itinerary? We'd
            love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Two-column layout */}
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      Phone
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="text-slate-800 font-semibold hover:text-amber-600 transition-colors"
                    >
                      +91- 88169 42362
                      <br />
                      or 9034447109
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:hello@Treno.in"
                      className="text-slate-800 font-semibold hover:text-amber-600 transition-colors"
                    >
                      Trenotravel@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      Address
                    </p>
                    <p className="text-slate-800 font-semibold leading-snug">
                      SCO 98, Sector 4-5, Urban State
                      <br />
                      Karnal, Haryana — 132001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">
                      Working Hours
                    </p>
                    <p className="text-slate-800 font-semibold">
                      Mon-Sat: 9 AM - 6 PM
                    </p>
                    <p className="text-slate-500 text-sm">Sun: 10 AM - 4 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-slate-600 mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  {
                    Icon: Instagram,
                    label: "Instagram",
                    href: "#",
                    color:
                      "hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500",
                  },
                  {
                    Icon: Facebook,
                    label: "Facebook",
                    href: "#",
                    color:
                      "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600",
                  },
                  {
                    Icon: Youtube,
                    label: "YouTube",
                    href: "#",
                    color:
                      "hover:bg-red-50 hover:border-red-200 hover:text-red-500",
                  },
                  {
                    Icon: MessageCircle,
                    label: "WhatsApp",
                    href: "https://wa.me/9188169 42362",
                    color:
                      "hover:bg-green-50 hover:border-green-200 hover:text-green-600",
                  },
                ].map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 transition-all ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918816942362?text=Hi%20Treno!%20I%20have%20a%20travel%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-2xl transition-colors shadow-md w-full justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <h2 className="font-playfair text-2xl font-bold text-slate-800 mb-6">
                Send Us a Message
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-amber-600 font-semibold text-sm hover:text-amber-700 underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={fieldCls("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={fieldCls("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Phone
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={fieldCls("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                          Subject <span className="text-red-400">*</span>
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={fieldCls("subject") + " bg-white"}
                        >
                          <option value="">Select subject</option>
                          {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className={fieldCls("message") + " resize-none"}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base"
                    >
                      {submitting ? (
                        <>
                          <svg
                            className="animate-spin w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
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
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="max-w-screen-xl mx-auto px-4 pb-12">
        <div
          className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
          style={{ height: 320 }}
        >
          <div
            className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center relative"
            style={{
              backgroundImage: `radial-gradient(#cbd5e1 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center z-10 border border-slate-100">
              <MapPin className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <p className="font-bold text-slate-700">Treno HQ</p>
              <p className="text-slate-500 text-sm mt-1">
                SCO 98, Sector 4-5, Urban Estate Karnal, Haryana — 132001
              </p>
              <a
                href="https://maps.google.com/?q=SCO+98,+Sector+4-5,+Urban+Estate,+Karnal,+Haryana+132001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs font-semibold text-amber-600 hover:text-amber-700 underline underline-offset-2 "
              >
                Open in Google Maps →
              </a>
            </div>
            <p className="absolute bottom-4 text-xs text-slate-400">
              Interactive map coming soon
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-screen-xl mx-auto px-4 pb-20">
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg">
                Have a question?
              </h2>
              <p className="text-slate-500 text-sm">
                Browse our quick FAQs below
              </p>
            </div>
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>
    </>
  );
}
