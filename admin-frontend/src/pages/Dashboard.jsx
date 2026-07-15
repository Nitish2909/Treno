import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  DollarSign, Calendar, Users, Compass,
  Plus, ArrowRight, TrendingUp,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts'
import {
  useGetDashboardStatsQuery,
  useGetRevenueStatsQuery,
  useGetBookingAnalyticsQuery,
  useGetTopTripsQuery,
  useGetRecentActivityQuery,
} from '../store/api/adminApi'
import StatsCard from '../components/common/StatsCard'
import StatusBadge from '../components/common/StatusBadge'
import PageHeader from '../components/common/PageHeader'
import { formatPrice, formatDate, calculatePercentageChange, truncateText } from '../utils/helpers'

const CHART_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

const PIE_COLORS = {
  confirmed: '#3B82F6',
  pending:   '#F59E0B',
  completed: '#10B981',
  cancelled: '#EF4444',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-800 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <strong>{typeof p.value === 'number' && p.name.toLowerCase().includes('revenue') ? formatPrice(p.value) : p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { data: stats,    isLoading: statsLoading    } = useGetDashboardStatsQuery()
  const { data: revenue,  isLoading: revenueLoading  } = useGetRevenueStatsQuery('monthly')
  const { data: analytics,isLoading: analyticsLoading} = useGetBookingAnalyticsQuery()
  const { data: topTrips, isLoading: tripsLoading    } = useGetTopTripsQuery()
  const { data: activity, isLoading: activityLoading } = useGetRecentActivityQuery()

  const s = stats || {}

  
  const revenueData   = revenue?.data   || []
  // const analyticsData = analytics.data. || []
  const analyticsData = []
  const topTripsData  = topTrips?.trips  || []
  const recentBookings = activity?.bookings || []
  const recentUsers    = activity?.users    || []
  console.log(analytics)

  return (
    <>
      <Helmet><title>Dashboard — Treno Admin</title></Helmet>

      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ label: 'Dashboard' }]}
        actions={
          <Link to="/admin/trips/create" className="btn btn-primary">
            <Plus size={15} /> New Trip
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(s.totalRevenue)}
          icon={DollarSign}
          color="blue"
          change={calculatePercentageChange(s.totalRevenue, s.prevRevenue)}
          loading={statsLoading}
        />
        <StatsCard
          title="Total Bookings"
          value={s.totalBookings?.toLocaleString() || '—'}
          icon={Calendar}
          color="green"
          change={calculatePercentageChange(s.totalBookings, s.prevBookings)}
          loading={statsLoading}
        />
        <StatsCard
          title="Active Users"
          value={s.totalUsers?.toLocaleString() || '—'}
          icon={Users}
          color="purple"
          change={calculatePercentageChange(s.totalUsers, s.prevUsers)}
          loading={statsLoading}
        />
        <StatsCard
          title="Active Trips"
          value={s.activeTrips?.toLocaleString() || '—'}
          icon={Compass}
          color="amber"
          change={calculatePercentageChange(s.activeTrips, s.prevTrips)}
          loading={statsLoading}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        {/* Revenue Area Chart */}
        <div className="xl:col-span-2 card">
          <div className="card-header">
            <div>
              <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly revenue this year</p>
            </div>
            <TrendingUp size={18} className="text-primary-500" />
          </div>
          <div className="p-5">
            {revenueLoading ? (
              <div className="h-52 skeleton rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={revenueData} margin={{ top: 0, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    fill="url(#colorRevenue)"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0, fill: '#3B82F6' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bookings Pie */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="font-semibold text-gray-800">Bookings by Status</h3>
              <p className="text-xs text-gray-400 mt-0.5">All-time distribution</p>
            </div>
          </div>
          <div className="p-5 flex flex-col items-center">
            {analyticsLoading ? (
              <div className="h-52 w-52 skeleton rounded-full mx-auto" />
            ) : analyticsData.length === 0 ? (
              <div className="h-52 flex items-center justify-center text-gray-400 text-sm">No data</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={analyticsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {analyticsData.data.map((entry, i) => (
                        <Cell key={i} fill={PIE_COLORS[entry.name] || CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => [v, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
                  {analyticsData.map((entry, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[entry.name] || CHART_COLORS[i % CHART_COLORS.length] }} />
                      <span className="capitalize">{entry.name}</span>
                      <span className="font-semibold">{entry.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Top trips bar chart */}
      <div className="card mb-6">
        <div className="card-header">
          <div>
            <h3 className="font-semibold text-gray-800">Top 5 Trips by Bookings</h3>
            <p className="text-xs text-gray-400 mt-0.5">Most booked trips</p>
          </div>
        </div>
        <div className="p-5">
          {tripsLoading ? (
            <div className="h-40 skeleton rounded-xl" />
          ) : topTripsData.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-gray-400 text-sm">No data</div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={topTripsData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="title"
                  type="category"
                  width={150}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => truncateText(v, 22)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="bookings" name="Bookings" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Bookings */}
        <div className="xl:col-span-2 card overflow-hidden">
          <div className="card-header">
            <h3 className="font-semibold text-gray-800">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Traveler</th>
                  <th>Trip</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activityLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      {[1,2,3,4,5,6].map((c) => (
                        <td key={c} className="px-4 py-3"><div className="skeleton h-4 rounded" style={{ width: `${50 + Math.random()*40}%` }} /></td>
                      ))}
                    </tr>
                  ))
                  : recentBookings.length === 0
                    ? <tr><td colSpan={6} className="text-center text-gray-400 py-8">No recent bookings</td></tr>
                    : recentBookings.map((b) => (
                      <tr key={b._id}>
                        <td className="font-mono text-xs text-gray-500">#{(b.bookingId || b._id)?.slice(-6)}</td>
                        <td className="font-medium">{b.user?.name || '—'}</td>
                        <td className="text-gray-500 max-w-[140px] truncate">{b.trip?.title || '—'}</td>
                        <td>{formatDate(b.travelDate)}</td>
                        <td className="font-semibold">{formatPrice(b.totalAmount)}</td>
                        <td><StatusBadge status={b.status} /></td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users + Quick Actions */}
        <div className="space-y-5">
          {/* Recent Users */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-800">Recent Users</h3>
              <Link to="/admin/users" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {activityLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="skeleton w-8 h-8 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <div className="skeleton h-3.5 w-28 rounded" />
                      <div className="skeleton h-3 w-36 rounded" />
                    </div>
                  </div>
                ))
                : recentUsers.length === 0
                  ? <p className="text-center text-gray-400 text-sm py-4">No users yet</p>
                  : recentUsers.map((u) => (
                    <Link to={`/admin/users/${u._id}`} key={u._id} className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-1.5 -mx-1.5 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0">
                        {u.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                        <p className="text-xs text-gray-400 truncate">{u.email}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(u.createdAt)}</span>
                    </Link>
                  ))
              }
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card card-body">
            <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New Trip',      to: '/admin/trips/create',    color: 'bg-primary-50 text-primary-700 hover:bg-primary-100'  },
                { label: 'New Blog',      to: '/admin/blogs/create',    color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'     },
                { label: 'All Bookings',  to: '/admin/bookings',        color: 'bg-green-50 text-green-700 hover:bg-green-100'        },
                { label: 'Reviews',       to: '/admin/reviews',         color: 'bg-amber-50 text-amber-700 hover:bg-amber-100'        },
              ].map((a) => (
                <Link
                  key={a.label}
                  to={a.to}
                  className={`rounded-xl p-3 text-xs font-medium text-center transition-colors ${a.color}`}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
