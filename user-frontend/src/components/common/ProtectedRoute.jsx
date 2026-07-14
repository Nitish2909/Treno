/**
 * @file ProtectedRoute.jsx
 * @description Route guard for Treno.
 * Reads `isAuthenticated` and the auth loading state from Redux.
 * – While auth is initialising, shows a centred spinner.
 * – If not authenticated, persists the intended path to localStorage
 *   and redirects the user to /auth/login.
 * – Once authenticated, renders `children` inside a fade-in motion wrapper.
 *
 * @example
 * // In your router config
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <DashboardPage />
 *     </ProtectedRoute>
 *   }
 * />
 */

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InlineLoader } from './Loader.jsx';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** localStorage key used to persist the intended destination URL. */
const REDIRECT_KEY = 'Treno_auth_redirect';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeIn = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity:    1,
    y:          0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Route guard that requires the user to be authenticated.
 *
 * @param {{
 *   children:       import('react').ReactNode,
 *   redirectTo?:    string,
 *   loadingMessage?: string,
 * }} props
 *
 * @param {import('react').ReactNode} props.children
 *   The protected page / component tree to render when authenticated.
 * @param {string} [props.redirectTo='/auth/login']
 *   The path to redirect unauthenticated users to.
 * @param {string} [props.loadingMessage='Verifying your session…']
 *   Accessible text shown while the auth state is being resolved.
 */
export default function ProtectedRoute({
  children,
  redirectTo     = '/auth/login',
  loadingMessage = 'Verifying your session…',
}) {
  const location = useLocation();

  // Select auth state from Redux store.
  // Adjust slice path to match your store structure, e.g. state.user.isAuthenticated
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated ?? false);
  const isLoading       = useSelector((state) => state.auth?.isLoading       ?? false);

  // Persist the intended path so the login page can redirect back after success.
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const intendedPath = location.pathname + location.search + location.hash;
      if (intendedPath !== '/' && intendedPath !== redirectTo) {
        localStorage.setItem(REDIRECT_KEY, intendedPath);
      }
    }
  }, [isAuthenticated, isLoading, location, redirectTo]);

  // ── Auth check still in progress ────────────────────────────────────────
  if (isLoading) {
    return (
      <div
        role="status"
        aria-label={loadingMessage}
        className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white"
      >
        <InlineLoader size={36} color="text-amber-500" />
        <p className="text-sm text-slate-400 animate-pulse">{loadingMessage}</p>
      </div>
    );
  }

  // ── Not authenticated — redirect ─────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  // ── Authenticated — render children with fade-in ─────────────────────────
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      // Unique key ensures the animation runs on each route change into a protected page
      key={location.pathname}
    >
      {children}
    </motion.div>
  );
}
