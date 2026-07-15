import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCreateTripMutation } from '../store/api/adminApi'
import TripForm from '../components/trips/TripForm'
import PageHeader from '../components/common/PageHeader'

export default function TripCreate() {
  const navigate = useNavigate()
  const [createTrip, { isLoading }] = useCreateTripMutation()

  async function handleSubmit(data) {
    try {
      // Convert image file objects to just their preview URLs (or handle upload separately)
      const payload = {
        ...data,
        images: data.images.map((img) => (typeof img === 'string' ? img : img.url || img.preview)),
        inclusions:    data.inclusions.filter(Boolean),
        exclusions:    data.exclusions.filter(Boolean),
        thingsToCarry: data.thingsToCarry.filter(Boolean),
        highlights:    data.highlights.filter(Boolean),
        destinations:  data.destinations.filter(Boolean),
        tags:          data.tags.filter(Boolean),
      }
      const result = await createTrip(payload).unwrap()
      
      console.log(result)
      toast.success('Trip created successfully!')
      navigate(`/admin/trips/${result.trip?._id}/edit`, { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create trip')
    }
  }

  return (
    <>
      <Helmet><title>Create Trip — Treno Admin</title></Helmet>
      <PageHeader
        title="Create New Trip"
        breadcrumbs={[
          { label: 'Content' },
          { label: 'Trips', to: '/admin/trips' },
          { label: 'Create' },
        ]}
      />
      <div className="card card-body">
        <TripForm onSubmit={handleSubmit} loading={isLoading} />
      </div>
    </>
  )
}
