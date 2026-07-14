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
  TrendingUp,
  Clock,
  DollarSign,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { format, differenceInDays, isAfter } from 'date-fns';
import { useAuth } from '../hooks/useAuth.js';
import { useGetBookingStatsQuery } from '../store/api/bookingApi.js';
import { useGetUserBookingsQuery } from '../store/api/bookingApi.js';
import StatsCard from '../components/dashboard/StatsCard.jsx';
import BookingCard from '../components/dashboard/BookingCard.jsx';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Bookings', icon: Calendar, to: '/dashboard/bookings' },
  { label: 'Wishlist', icon: Heart, to: '/dashboard/wishlist' },
  { label: 'Profile Settings', icon: Settings, to: '/dashboard/profile' },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join('');
}

function Sidebar({ user, onLogout, onClose, mobile }) {
  const navigate = useNavigate();
  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-gray-100 ${
        mobile ? 'w-72' : 'w-64'
      }`}
    >
      {/* Mobile close */}
      {mobile && (
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close menu">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      )}

      {/* User info */}
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-200"
            />
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

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active =
            to === '/dashboard'
              ? window.location.pathname === '/dashboard'
              : window.location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-amber-600' : 'text-gray-400'}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
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

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: stats, isLoading: statsLoading } = useGetBookingStatsQuery();
  const { data: recentBookingsData, isLoading: bookingsLoading } = useGetUserBookingsQuery({
    limit: 3,
    status: 'all',
  });

  const recentBookings = recentBookingsData?.bookings || [];

  // Find next upcoming confirmed booking
  const upcomingTrip = recentBookings.find(
    (b) =>
      b.status === 'confirmed' &&
      b.tripDate &&
      isAfter(new Date(b.tripDate), new Date())
  );

  const daysToGo = upcomingTrip
    ? differenceInDays(new Date(upcomingTrip.tripDate), new Date())
    : null;

  const today = format(new Date(), 'EEEE, MMMM d, yyyy');

  const statsCards = [
    {
      label: 'Upcoming Trips',
      value: statsLoading ? '—' : stats?.upcoming ?? 0,
      icon: Calendar,
      color: 'amber',
      change: null,
    },
    {
      label: 'Completed Trips',
      value: statsLoading ? '—' : stats?.completed ?? 0,
      icon: TrendingUp,
      color: 'green',
      change: null,
    },
    {
      label: 'Wishlist',
      value: statsLoading ? '—' : stats?.wishlist ?? 0,
      icon: Heart,
      color: 'rose',
      change: null,
    },
    {
      label: 'Total Spent',
      value: statsLoading ? '—' : `₹${(stats?.totalSpent ?? 0).toLocaleString('en-IN')}`,
      icon: DollarSign,
      color: 'blue',
      change: null,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <div className="hidden md:flex flex-col h-full flex-shrink-0 sticky top-0">
        <Sidebar user={user} onLogout={logout} />
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 md:hidden shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Sidebar user={user} onLogout={logout} mobile onClose={() => setDrawerOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <span className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
            Treno
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome header */}
          <div className="flex items-start justify-between">
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold text-gray-900"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Welcome back, {user?.name?.split(' ')[0] || 'Explorer'}! 👋
              </h1>
              <p className="text-gray-400 text-sm mt-1">{today}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => (
              <StatsCard key={card.label} card ={card} />
            ))}
          </div>

          {/* Recent Bookings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
              <Link
                to="/dashboard/bookings"
                className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {bookingsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">No bookings yet.</p>
                <Link
                  to="/trips"
                  className="mt-3 inline-block text-sm text-amber-600 hover:underline font-medium"
                >
                  Explore trips →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <BookingCard key={booking._id || booking.id} booking={booking} />
                ))}
              </div>
            )}
          </section>

          {/* Upcoming trip highlight */}
          {upcomingTrip && (
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Next Adventure</h2>
              <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 shadow-lg">
                {/* Background image */}
                <img
                  src={upcomingTrip.trip?.coverImage || `https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800`}
                  alt={upcomingTrip.trip?.name || 'Upcoming trip'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      Your next adventure
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {upcomingTrip.trip?.name || 'Upcoming Trip'}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 text-gray-300 text-sm">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(upcomingTrip.tripDate), 'MMM d, yyyy')}
                      </span>
                      {upcomingTrip.trip?.destination && (
                        <span className="flex items-center gap-1.5 text-gray-300 text-sm">
                          <MapPin className="w-4 h-4" />
                          {upcomingTrip.trip.destination}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
                        🚀 {daysToGo} day{daysToGo !== 1 ? 's' : ''} to go!
                      </span>
                      <Link
                        to={`/dashboard/bookings/${upcomingTrip._id || upcomingTrip.id}`}
                        className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
