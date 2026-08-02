import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Map, Compass, BookOpen, Calendar,
  Users, Star, Settings, LogOut, Mountain, ChevronRight,
  Tag, FileText,MessageSquare,
  Plane
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import clsx from 'clsx'

const navGroups = [
  {
    label: 'Main',
    items: [
      { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/trips',      icon: Compass,       label: 'Trips'      },
      { to: '/admin/categories', icon: Tag,           label: 'Categories' },
      { to: '/admin/blogs',      icon: FileText,      label: 'Blogs'      },
    ],
  },
  {
    label: 'Business',
    items: [
      { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
      { to: '/admin/reviews',  icon: Star,     label: 'Reviews'  },
    ],
  },
  {
    label: 'Users',
    items: [
      { to: '/admin/users', icon: Users, label: 'Users' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
  {
    label: 'Message',
    items: [
      { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
    ],
  },
]

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 text-sm font-medium transition-all duration-150 group relative',
          isActive
            ? 'nav-item-active text-blue-400'
            : 'text-sidebar-text hover:bg-sidebar-surface hover:text-slate-200'
        )
      }
    >
      <Icon size={18} className="flex-shrink-0" />
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar({ onClose }) {
  const { user, logout } = useAdminAuth()

  return (
    <div className="w-64 h-full flex flex-col bg-sidebar-bg border-r border-sidebar-border overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
          <Plane size={20} className="text-white" />
        </div>
        <div>
          <span className="text-white font-bold text-base leading-tight">TRENO</span>
          <span className="block text-sidebar-text text-[11px] font-medium">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-6 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavItem {...item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User at bottom */}
      <div className="flex-shrink-0 border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary-600/20 border border-primary-600/30 flex items-center justify-center text-primary-400 font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.name || 'Admin'}</p>
            <p className="text-sidebar-text text-xs truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-text hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150"
        >
          <LogOut size={15} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}
