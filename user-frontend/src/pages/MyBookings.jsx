import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Loader2,
  AlertCircle,
  Inbox as InboxIcon,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useGetUserBookingsQuery } from '../store/api/bookingApi.js';
import BookingCard from '../components/dashboard/BookingCard.jsx';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Bookings', icon: Calendar, to: '/dashboard/bookings' },
  { label: 'Wishlist', icon: Heart, to: '/dashboard/wishlist' },
  { label: 'Profile Settings', icon: Settings, to: '/dashboard/profile' },
];

const STATUS_TABS = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const PAGE_SIZE = 5;

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]?.toUpperCase()).slice(0, 2).join('');
}

function Sidebar({ user, onLogout, onClose, mobile }) {
  const navigate = useNavigate();
  return (
    <aside className={`flex flex-col h-full bg-white border-r border-gray-100 ${mobile ? 'w-72' : 'w-64'}`}>
      {mobile && (
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close menu">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-200" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-base">
              {getInitials(user?.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active = to === '/dashboard'
            ? window.location.pathname === '/dashboard'
            : window.location.pathname.startsWith(to);
          return (
            <Link
              key={to} to={to} onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-amber-50 text-amber-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-amber-600' : 'text-gray-400'}`} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={() => { onLogout(); navigate('/auth/login', { replace: true }); }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function EmptyState({ status }) {
  const messages = {
    all: { text: "You haven't made any bookings yet.", cta: true },
    upcoming: { text: 'No upcoming trips planned.', cta: true },
    completed: { text: 'No completed trips yet.', cta: false },
    cancelled: { text: 'No cancelled bookings.', cta: false },
  };
  const msg = messages[status] || messages.all;
  return (
    <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
      <InboxIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
      <p className="text-gray-500 font-medium mb-1">{msg.text}</p>
      {msg.cta && (
        <Link to="/trips" className="mt-2 inline-block text-sm text-amber-600 hover:underline font-medium">
          Browse trips →
        </Link>
      )}
    </div>
  );
}

export default function MyBookings() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useGetUserBookingsQuery({
    status: activeTab,
    page,
    limit: PAGE_SIZE,
  });

  const bookings = data?.bookings || [];
  const total = data?.total || 0;
  const hasMore = bookings.length < total;

  const filtered = search.trim()
    ? bookings.filter((b) =>
        b.trip?.name?.toLowerCase().includes(search.toLowerCase()) ||
        b.trip?.destination?.toLowerCase().includes(search.toLowerCase())
      )
    : bookings;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
    setSearch('');
  };

  const handleLoadMore = () => setPage((p) => p + 1);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full flex-shrink-0 sticky top-0">
        <Sidebar user={user} onLogout={logout} />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerOpen(false)} />
            <motion.div className="fixed inset-y-0 left-0 z-50 md:hidden shadow-2xl" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <Sidebar user={user} onLogout={logout} mobile onClose={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>My Bookings</span>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Bookings
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {total > 0 ? `${total} booking${total !== 1 ? 's' : ''} total` : 'All your trip bookings in one place'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Status tabs */}
            <div className="flex gap-1.5 bg-gray-100 rounded-xl p-1 flex-wrap">
              {STATUS_TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === key
                      ? 'bg-white text-amber-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative sm:ml-auto sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by trip name…"
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              Failed to load bookings. Please try refreshing the page.
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState status={activeTab} />
          ) : (
            <>
              <div className="space-y-3">
                {filtered.map((booking) => (
                  <motion.div
                    key={booking._id || booking.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BookingCard booking={booking} />
                  </motion.div>
                ))}
              </div>

              {/* Load more */}
              {hasMore && !search && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors disabled:opacity-50"
                  >
                    {isFetching ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Loading…</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" />Load More</>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
