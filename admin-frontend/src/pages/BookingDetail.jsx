import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react'
import { useGetBookingByIdQuery } from '../store/api/adminApi'
import BookingDetails from '../components/bookings/BookingDetails'
import PageHeader from '../components/common/PageHeader'

export default function BookingDetail() {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetBookingByIdQuery(id)
  console.log(data)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertCircle size={40} strokeWidth={1.5} />
        <p>Booking not found</p>
        <Link to="/admin/bookings" className="btn btn-secondary btn-sm">← Back to Bookings</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Booking Detail — Treno Admin</title></Helmet>
      <PageHeader
        title="Booking Detail"
        breadcrumbs={[
          { label: 'Business' },
          { label: 'Bookings', to: '/admin/bookings' },
          { label: `#${(data.data.bookingId || data.data._id)?.slice(-8)}` },
        ]}
        actions={
          <Link to="/admin/bookings" className="btn btn-secondary btn-sm">
            <ArrowLeft size={14} /> Back
          </Link>
        }
      />
      <BookingDetails booking={data.data} />
    </>
  )
}
