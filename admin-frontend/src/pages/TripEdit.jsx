import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Loader2, AlertCircle } from 'lucide-react'
import { useGetTripByIdQuery, useUpdateTripMutation } from '../store/api/adminApi'
import TripForm from '../components/trips/TripForm'
import PageHeader from '../components/common/PageHeader'

export default function TripEdit() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetTripByIdQuery(id)
  const [updateTrip, { isLoading: updating }] = useUpdateTripMutation()

  async function handleSubmit(formData) {
    try {
      // Build updated payload structured specifically for the backend validator schema
      const payload = {
        id,
        ...formData,
        images:        (formData.images || []).map((img) => (typeof img === 'string' ? img : img.url || img.preview)),
        inclusions:    (formData.inclusions || []).filter(Boolean),
        exclusions:    (formData.exclusions || []).filter(Boolean),
        thingsToCarry: (formData.thingsToCarry || []).filter(Boolean),
        highlights:    (formData.highlights || []).filter(Boolean),
        tags:          (formData.tags || []).filter(Boolean),
        location: {
          ...formData.location,
          destinations: (formData.location?.destinations || []).filter(Boolean),
        }
      }
      
      await updateTrip(payload).unwrap()
      toast.success('Trip updated successfully!')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update trip')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !data?.data?.trip) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <AlertCircle size={40} strokeWidth={1.5} />
        <p>Trip not found</p>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Edit Trip — Treno Admin</title></Helmet>
      <PageHeader
        title="Edit Trip"
        breadcrumbs={[
          { label: 'Content' },
          { label: 'Trips', to: '/admin/trips' },
          { label: data?.data.trip.title },
        ]}
      />
      <div className="card card-body">
        <TripForm initialValues={data?.data.trip} onSubmit={handleSubmit} loading={updating} />
      </div>
    </>
  )
}