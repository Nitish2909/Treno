import { Link } from 'react-router-dom'
import { formatDate, formatDateTime, formatPrice } from '../../utils/helpers'
import StatusBadge from '../common/StatusBadge'
import { Mail, Phone, Calendar, BookOpen } from 'lucide-react'

export default function UserDetails({ user, bookings = [] }) {
  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-primary-100 border-2 border-primary-200 flex items-center justify-center text-primary-600 text-3xl font-bold flex-shrink-0">
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <StatusBadge status={user.role || 'user'} />
              {!user.isActive && <StatusBadge status="inactive" />}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Mail size={13} />{user.email}</span>
              {user.phone && <span className="flex items-center gap-1.5"><Phone size={13} />{user.phone}</span>}
              <span className="flex items-center gap-1.5"><Calendar size={13} />Joined {formatDate(user.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings',  value: bookings.length },
          { label: 'Confirmed',       value: bookings.filter((b) => b.status === 'confirmed').length },
          { label: 'Completed',       value: bookings.filter((b) => b.status === 'completed').length },
          { label: 'Total Spent',     value: formatPrice(bookings.reduce((s, b) => s + (b.totalAmount || 0), 0)) },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings History */}
      <div className="card overflow-hidden">
        <div className="card-header">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <BookOpen size={16} className="text-primary-500" /> Booking History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Trip</th>
                <th>Travel Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-10">No bookings yet</td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id}>
                    <td className="font-mono text-xs">{b.bookingId || b._id?.slice(-8)}</td>
                    <td className="font-medium">{b.trip?.title || '—'}</td>
                    <td>{formatDate(b.travelDate)}</td>
                    <td>{formatPrice(b.totalAmount)}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td>
                      <Link to={`/admin/bookings/${b._id}`} className="text-xs text-primary-600 hover:underline">View →</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
