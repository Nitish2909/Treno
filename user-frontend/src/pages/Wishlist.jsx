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
  HeartOff,
  Compass,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth.js';
import { selectWishlistItems, removeFromWishlist } from '../store/slices/wishlistSlice.js';
import { useGetWishlistQuery, useToggleWishlistApiMutation } from '../store/api/authApi.js';
import TripCard from '../components/trip/TripCard.jsx';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Bookings', icon: Calendar, to: '/dashboard/bookings' },
  { label: 'Wishlist', icon: Heart, to: '/dashboard/wishlist' },
  { label: 'Profile Settings', icon: Settings, to: '/dashboard/profile' },
];

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

function EmptyWishlist() {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-5">
        <Heart className="w-10 h-10 text-rose-300" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
      <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
        Save trips you love and come back to plan them whenever you&apos;re ready.
      </p>
      <Link
        to="/trips"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm"
      >
        <Compass className="w-4 h-4" />
        Explore Trips
      </Link>
    </div>
  );
}

export default function Wishlist() {
  const { user, logout, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Local Redux wishlist (always present)
  const localItems = useSelector(selectWishlistItems);

  // Server wishlist (when authenticated)
  const {
    data: serverWishlist,
    isLoading: serverLoading,
    isError: serverError,
  } = useGetWishlistQuery(undefined, { skip: !isAuthenticated });

  const [removeFromWishlistMutation, { isLoading: removing }] = useToggleWishlistApiMutation();

  // Use server data if available, fall back to local
  const wishlistItems =
    isAuthenticated && serverWishlist?.items
      ? serverWishlist.items
      : localItems;

  const count = wishlistItems.length;

  const handleRemove = async (tripId) => {
    if (isAuthenticated) {
      try {
        await removeFromWishlistMutation(tripId).unwrap();
      } catch {
        // Silently handle
      }
    } else {
      dispatch(removeFromWishlist(tripId));
    }
  };

  const isLoading = isAuthenticated && serverLoading;

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
          <span className="font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Wishlist</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              My Wishlist
            </h1>
            {count > 0 && (
              <span className="inline-flex items-center bg-rose-100 text-rose-600 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : serverError ? (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              Failed to load wishlist. Showing locally saved items.
            </div>
          ) : count === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {wishlistItems.map((item) => {
                  const trip = item.trip || item;
                  const tripId = trip._id || trip.id;
                  return (
                    <motion.div
                      key={tripId}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="relative group"
                    >
                      <TripCard trip={trip} />
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(tripId)}
                        disabled={removing}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-full flex items-center justify-center shadow-sm transition-colors z-10 opacity-0 group-hover:opacity-100"
                        aria-label="Remove from wishlist"
                        title="Remove from wishlist"
                      >
                        <HeartOff className="w-4 h-4 text-red-500" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
