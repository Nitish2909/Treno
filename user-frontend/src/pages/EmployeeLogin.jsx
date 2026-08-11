import React, { useState } from "react";
import TrenoLogo from "../assets/Treno-Logo.png";
import { Link } from "react-router-dom";
import clsx from "clsx";

const EmployeeLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#080d1a] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* ================= EXACT BACKGROUND RECREATION ================= */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Glowing Background Color Waves */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[500px] w-full opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-purple-600/30 to-blue-600/20 blur-[120px]" />
          <div className="absolute top-1/4 left-10 w-2/3 h-64 bg-indigo-500/20 rounded-full blur-[100px] transform -rotate-12" />
          <div className="absolute bottom-1/4 right-10 w-2/3 h-64 bg-teal-500/20 rounded-full blur-[100px] transform rotate-12" />
        </div>

        {/* SVG Waves & Constellations */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Wave Gradients */}
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Smooth Flowing Waves */}
          <path
            d="M -100 450 C 300 250, 600 650, 1000 350 C 1300 150, 1600 550, 2000 350"
            fill="none"
            stroke="url(#waveGrad1)"
            strokeWidth="35"
            filter="url(#glow)"
            className="opacity-75"
          />
          <path
            d="M -100 500 C 400 650, 700 250, 1100 450 C 1400 550, 1700 250, 2000 450"
            fill="none"
            stroke="url(#waveGrad2)"
            strokeWidth="20"
            filter="url(#glow)"
            className="opacity-60"
          />

          {/* Left Geometric Constellation Network */}
          <g
            stroke="#38bdf8"
            strokeWidth="0.5"
            strokeOpacity="0.25"
            fill="none"
          >
            <polygon points="50,600 120,520 200,680" />
            <polygon points="120,520 250,480 200,680" />
            <polygon points="250,480 320,600 200,680" />
            <polygon points="50,600 -20,700 120,780 200,680" />
            <polygon points="-50,450 50,600 120,520" />
            <polygon points="-80,300 -50,450 120,520" />
            <circle cx="50" cy="600" r="2" fill="#38bdf8" opacity="0.6" />
            <circle cx="120" cy="520" r="2" fill="#38bdf8" opacity="0.6" />
            <circle cx="200" cy="680" r="2" fill="#38bdf8" opacity="0.6" />
            <circle cx="250" cy="480" r="2" fill="#38bdf8" opacity="0.6" />
          </g>

          {/* Right Geometric Constellation Network */}
          <g
            stroke="#818cf8"
            strokeWidth="0.5"
            strokeOpacity="0.25"
            fill="none"
          >
            <polygon points="1600,200 1720,150 1800,280" />
            <polygon points="1720,150 1880,100 1800,280" />
            <polygon points="1880,100 1950,220 1800,280" />
            <polygon points="1800,280 1900,400 1950,220" />
            <polygon points="1720,150 1650,50 1880,100" />
            <circle cx="1600" cy="200" r="2" fill="#818cf8" opacity="0.6" />
            <circle cx="1720" cy="150" r="2" fill="#818cf8" opacity="0.6" />
            <circle cx="1800" cy="280" r="2" fill="#818cf8" opacity="0.6" />
            <circle cx="1880" cy="100" r="2" fill="#818cf8" opacity="0.6" />
          </g>
        </svg>

        {/* Scattered Glowing Particles (Golden & Teal) */}
        <div className="absolute inset-0">
          {[
            /* Teal/Cyan Particle Cluster */
            {
              top: "25%",
              left: "15%",
              size: "3px",
              color: "#22d3ee",
              glow: "#06b6d4",
            },
            {
              top: "35%",
              left: "22%",
              size: "2px",
              color: "#67e8f9",
              glow: "#22d3ee",
            },
            {
              top: "65%",
              left: "28%",
              size: "3px",
              color: "#22d3ee",
              glow: "#06b6d4",
            },
            {
              top: "70%",
              left: "35%",
              size: "2px",
              color: "#a5f3fc",
              glow: "#67e8f9",
            },
            {
              top: "20%",
              left: "70%",
              size: "3px",
              color: "#22d3ee",
              glow: "#06b6d4",
            },
            {
              top: "30%",
              left: "80%",
              size: "2px",
              color: "#67e8f9",
              glow: "#22d3ee",
            },
            {
              top: "75%",
              left: "75%",
              size: "3px",
              color: "#22d3ee",
              glow: "#06b6d4",
            },

            /* Gold/Yellow Particle Cluster */
            {
              top: "22%",
              left: "30%",
              size: "2.5px",
              color: "#fbbf24",
              glow: "#f59e0b",
            },
            {
              top: "28%",
              left: "38%",
              size: "2px",
              color: "#fef08a",
              glow: "#fbbf24",
            },
            {
              top: "40%",
              left: "32%",
              size: "3px",
              color: "#f59e0b",
              glow: "#d97706",
            },
            {
              top: "60%",
              left: "68%",
              size: "2.5px",
              color: "#fbbf24",
              glow: "#f59e0b",
            },
            {
              top: "68%",
              left: "62%",
              size: "2px",
              color: "#fef08a",
              glow: "#fbbf24",
            },
            {
              top: "78%",
              left: "70%",
              size: "3px",
              color: "#f59e0b",
              glow: "#d97706",
            },
          ].map((pt, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                top: pt.top,
                left: pt.left,
                width: pt.size,
                height: pt.size,
                backgroundColor: pt.color,
                boxShadow: `0 0 8px ${pt.glow}`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            />
          ))}

          {/* Sparkle Star Bottom Right */}
          <div className="absolute bottom-8 right-12 text-slate-500/40">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>
        </div>
      </div>
      {/* ================= END BACKGROUND ================= */}

      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border-4 border-slate-800/80 rounded-2xl shadow-3xl p-8 relative z-10 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          {/* Logo  */}
          <Link
            to="/"
            className="flex items-center justify-center flex-shrink-0 group relative"
          >
            {/* Soft background glow adjusted for the larger logo profile */}
            <div
              className={clsx(
                "absolute -inset-4 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-lg",
                // Add background color for the glow here, e.g., "bg-white" or "bg-blue-200"
              )}
            />

            {/* Significantly larger logo profile (w-36 h-36 / 144px) with transparent background */}
            <img
              src={TrenoLogo}
              alt="Treno Logo"
              className="w-32 h-32 transform group-hover:scale-105 transition-all duration-300 ease-out relative z-10 drop-shadow-md group-hover:drop-shadow-lg rounded-full  "
            />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Employee Portal
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back! Please enter your details.
          </p>
        </div>
        {/* Login Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Employee ID / Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Employee ID or Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="EMP-84920 or name@company.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Controls: Remember & Forgot */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 rounded-sm"
              />
              <span>Remember device</span>
            </label>
            <a
              href="#forgot"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all duration-150 flex items-center justify-center space-x-2 group mt-2"
          >
            <span>Sign in</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>

        {/* SSO Divider & Action */}
        {/* <div className="space-y-4 pt-2 border-t border-slate-800/80">
          <div className="relative flex items-center justify-center">
            <span className="bg-slate-900/80 px-3 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
              Or authorize with
            </span>
          </div>

          <button
            type="button"
            className="w-full py-2.5 px-4 bg-slate-950/40 hover:bg-slate-800/50 border border-slate-800 rounded-xl text-slate-300 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2.5"
          >
            <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Single Sign-On (SSO)</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default EmployeeLogin;
