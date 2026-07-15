import { useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Search, Bell, ChevronDown, User, LogOut, Settings, ChevronRight } from 'lucide-react'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

const breadcrumbMap = {
  '/admin/dashboard':    ['Dashboard'],
  '/admin/trips':        ['Content', 'Trips'],
  '/admin/trips/create': ['Content', 'Trips', 'Create Trip'],
  '/admin/bookings':     ['Business', 'Bookings'],
  '/admin/users':        ['Users', 'All Users'],
  '/admin/reviews':      ['Business', 'Reviews'],
  '/admin/blogs':        ['Content', 'Blogs'],
  '/admin/blogs/create': ['Content', 'Blogs', 'Create Blog'],
  '/admin/categories':   ['Content', 'Categories'],
  '/admin/settings':     ['System', 'Settings'],
}

function getBreadcrumbs(pathname) {
  if (breadcrumbMap[pathname]) return breadcrumbMap[pathname]
  if (pathname.includes('/trips/') && pathname.includes('/edit')) return ['Content', 'Trips', 'Edit Trip']
  if (pathname.includes('/bookings/')) return ['Business', 'Bookings', 'Booking Detail']
  if (pathname.includes('/users/'))    return ['Users', 'User Detail']
  if (pathname.includes('/blogs/') && pathname.includes('/edit')) return ['Content', 'Blogs', 'Edit Blog']
  return ['Admin']
}

export default function Header({ onMenuClick, sidebarOpen }) {
  const { user, logout }   = useAdminAuth()
  const location           = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen]     = useState(false)
  const [searchVal, setSearchVal]       = useState('')
  const dropdownRef = useRef(null)
  const searchRef   = useRef(null)

  const crumbs = getBreadcrumbs(location.pathname)

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0 z-20">
      {/* Menu toggle */}
      <button
        onClick={onMenuClick}
        className="btn-icon text-gray-500 hover:bg-gray-100 focus:ring-gray-300"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm flex-1 min-w-0">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />}
            <span
              className={clsx(
                'truncate',
                i === crumbs.length - 1
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400'
              )}
            >
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Search */}
      <div className="relative hidden sm:block">
        <AnimatePresence>
          {searchOpen ? (
            <motion.input
              ref={searchRef}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 220, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 border border-transparent"
              placeholder="Search admin..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onBlur={() => { if (!searchVal) setSearchOpen(false) }}
              autoFocus
            />
          ) : null}
        </AnimatePresence>
        <button
          className="btn-icon text-gray-500 hover:bg-gray-100 focus:ring-gray-300"
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="Search"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Notifications */}
      <button className="btn-icon text-gray-500 hover:bg-gray-100 focus:ring-gray-300 relative" aria-label="Notifications">
        <Bell size={18} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
      </button>

      {/* Profile dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-600 font-bold text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name || 'Admin'}</p>
            <p className="text-[11px] text-gray-400 capitalize">{user?.role || 'admin'}</p>
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden md:block" />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 origin-top-right"
            >
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <Link
                to="/admin/settings"
                className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setDropdownOpen(false)}
              >
                <Settings size={15} className="text-gray-400" />
                Settings
              </Link>
              <button
                onClick={() => { setDropdownOpen(false); logout() }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
