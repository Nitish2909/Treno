import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Compass, Mountain, Home, Search } from 'lucide-react'
import SEOHead from '../components/common/SEOHead.jsx'

export default function NotFound() {
  return (
    <>
      <SEOHead title="404 — Page Not Found" noIndex />

      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 40%, #fde68a 100%)',
        }}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Floating icons */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-10 text-amber-300 opacity-50 hidden md:block"
        >
          <MapPin className="w-10 h-10" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-24 right-16 text-orange-300 opacity-40 hidden md:block"
        >
          <Compass className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 left-20 text-amber-400 opacity-30 hidden md:block"
        >
          <Mountain className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 right-24 text-amber-300 opacity-40 hidden md:block"
        >
          <MapPin className="w-8 h-8" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 text-center max-w-lg"
        >
          {/* 404 number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-playfair font-extrabold leading-none mb-4 select-none"
            style={{
              fontSize: 'clamp(6rem, 20vw, 10rem)',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </motion.div>

          {/* Illustration row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-end justify-center gap-4 mb-6"
          >
            <div className="text-amber-400">
              <Mountain className="w-10 h-10" />
            </div>
            <div className="text-orange-400">
              <Compass className="w-12 h-12" />
            </div>
            <div className="text-amber-500">
              <MapPin className="w-10 h-10" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 mb-3"
          >
            Oops! You seem to be lost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-base leading-relaxed mb-8"
          >
            The destination you're looking for doesn't exist or has been moved. Let's get you back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-colors"
            >
              <Home className="w-5 h-5" /> Go Home
            </Link>
            <Link
              to="/trips"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 border-2 border-amber-400 hover:bg-amber-50 font-bold px-8 py-4 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" /> Browse Trips
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-slate-400 text-sm mt-8"
          >
            Need help?{' '}
            <Link to="/contact" className="text-amber-600 font-semibold hover:text-amber-700 underline underline-offset-2">
              Contact us
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </>
  )
}
