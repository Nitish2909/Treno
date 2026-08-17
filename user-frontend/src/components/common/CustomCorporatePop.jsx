import React, { useState } from "react";

function CustomCorporatePop({ onClose }) {
  const [copiedId, setCopiedId] = useState(null);

  const emails = [
    { label: "General Corporate Enquiries", email: "trenotravel@gmail.com" },
    // { label: 'Event Management Team', email: 'events@company.com' }
  ];

  const phoneNumbers = [
    { label: "1", number: "+91-8816942362", hours: "24/7 Priority Support" },
    { label: "2", number: "+91-9034447109", hours: "Mon–Fri, 8am–6pm PST" },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-opacity animate-in fade-in duration-300">
      {/* Container Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-slate-900/80 border border-slate-700  shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)]">
        {/* Glow Effects */}
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:bg-slate-700 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header Section */}
        <div className="relative z-10 px-6 pt-8 pb-4 sm:px-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
              </span>
              Corporate Support
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Custom Corporate Bookings
          </h2>
          <p className="mt-1.5 text-sm text-slate-400 max-w-lg leading-relaxed">
            Get in touch with our dedicated corporate team to arrange tailored
            events, private bookings, or office visits.
          </p>
        </div>

        {/* Content Section */}
        <div className="relative z-10 px-6 sm:px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Communications */}
          <div className="space-y-6">
            {/* Phone Numbers */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Direct Lines
              </h3>
              <div className="space-y-2.5">
                {phoneNumbers.map((phone, idx) => (
                  <a
                    key={idx}
                    href={`tel:${phone.number.replace(/[^0-9+]/g, "")}`}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-200"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        {phone.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {phone.number}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 group-hover:bg-indigo-500/20 px-3 py-1.5 rounded-xl transition-all">
                      <span>Call</span>
                      <svg
                        className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Email Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Support
              </h3>
              <div className="space-y-2.5">
                {emails.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 transition-all hover:border-slate-600"
                  >
                    <div className="min-w-0 mr-2">
                      <p className="text-[11px] font-medium text-slate-400">
                        {item.label}
                      </p>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sm font-medium text-slate-200 hover:text-indigo-300 transition-colors block truncate"
                      >
                        {item.email}
                      </a>
                    </div>
                    <button
                      onClick={() => handleCopy(item.email, `email-${idx}`)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                        copiedId === `email-${idx}`
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/40"
                      }`}
                    >
                      {copiedId === `email-${idx}` ? (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: HQ & Map */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Global Headquarters
              </h3>
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/50 mb-3">
                <p className="text-sm font-semibold text-slate-100">
                  Company Headquarters
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                  SCO 98, Sector 4-5, Urban State
                  <br />
                  Karnal, Haryana — 132001
                </p>
              </div>
            </div>

            {/* Embedded Interactive Map Container */}
            <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border  shadow-lg group">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.765352222641!2d76.9983869!3d29.666099999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e71f791d16d8f%3A0x9fc92d2fa1b75aa6!2sAXIS%20SECURITIES%20LTD.%20Sector%204%20Karnal.%20Authorized%20Person%20Jai%20Singh!5e1!3m2!1sen!2sin!4v1786690242807!5m2!1sen!2sin"
                className="w-full h-full grayscale opacity-70 contrast-125 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2.5 right-2.5 bg-slate-900/90 hover:bg-slate-800 text-xs text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700/80 backdrop-blur-sm transition-all flex items-center gap-1 shadow-md"
              >
                <span>View Full Map</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Info Bar */}
        <div className="relative z-10 bg-slate-950/70 border-t border-slate-800/80 px-6 py-4 text-center sm:flex sm:justify-between sm:items-center text-xs">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {" "}
              <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-xs text-slate-500">
                Sunday: 10:00 AM - 4:00 PM
              </p>
            </span>
          </div>
          <p className="text-slate-400 mt-1 sm:mt-0">
            Avg. Response Time:{" "}
            <span className="text-indigo-400 font-semibold">&lt; 1 Hours</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomCorporatePop;
