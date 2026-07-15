import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Mountain, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 Not Found — Treno Admin</title></Helmet>
      <div className="min-h-screen bg-surface flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-3xl bg-primary-100 border border-primary-200 flex items-center justify-center mx-auto mb-6">
            <Mountain size={36} className="text-primary-500" />
          </div>
          <h1 className="text-6xl font-black text-gray-200 mb-2 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
          <p className="text-gray-500 text-sm mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/admin/dashboard" className="btn btn-primary">
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </>
  )
}
