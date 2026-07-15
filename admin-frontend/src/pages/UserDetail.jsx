import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { useGetUserByIdQuery, useGetAllBookingsQuery } from '../store/api/adminApi'
import UserDetails from '../components/users/UserDetails'
import PageHeader from '../components/common/PageHeader'

export default function UserDetail() {
  const { id } = useParams()
  const { data: userData, isLoading: userLoading, isError } = useGetUserByIdQuery(id)
  const { data: bookingsData, isLoading: bookingsLoading } = useGetAllBookingsQuery({ userId: id, limit: 100 })

  const isLoading = userLoading || bookingsLoading

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !userData?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertCircle size={40} strokeWidth={1.5} />
        <p>User not found</p>
        <Link to="/admin/users" className="btn btn-secondary btn-sm">← Back to Users</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>User Detail — Treno Admin</title></Helmet>
      <PageHeader
        title="User Profile"
        breadcrumbs={[
          { label: 'Users', to: '/admin/users' },
          { label: userData.user.name },
        ]}
        actions={
          <Link to="/admin/users" className="btn btn-secondary btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
        }
      />
      <UserDetails
        user={userData.user}
        bookings={bookingsData?.bookings || []}
      />
    </>
  )
}
