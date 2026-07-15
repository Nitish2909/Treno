import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminLayout from './components/layout/AdminLayout'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Trips from './pages/Trips'
import TripCreate from './pages/TripCreate'
import TripEdit from './pages/TripEdit'
import Bookings from './pages/Bookings'
import BookingDetail from './pages/BookingDetail'
import Users from './pages/Users'
import UserDetail from './pages/UserDetail'
import Reviews from './pages/Reviews'
import Blogs from './pages/Blogs'
import BlogCreate from './pages/BlogCreate'
import BlogEdit from './pages/BlogEdit'
import Categories from './pages/Categories'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.adminAuth)
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Trips */}
        <Route path="trips" element={<Trips />} />
        <Route path="trips/create" element={<TripCreate />} />
        <Route path="trips/:id/edit" element={<TripEdit />} />

        {/* Bookings */}
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:id" element={<BookingDetail />} />

        {/* Users */}
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetail />} />

        {/* Reviews */}
        <Route path="reviews" element={<Reviews />} />

        {/* Blogs */}
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/create" element={<BlogCreate />} />
        <Route path="blogs/:id/edit" element={<BlogEdit />} />

        {/* Categories */}
        <Route path="categories" element={<Categories />} />

        {/* Settings */}
        <Route path="settings" element={<Settings />} />

        {/* 404 fallback inside admin */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
