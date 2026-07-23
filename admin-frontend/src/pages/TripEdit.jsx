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

async function handleSubmit(formState) {
  try {
    const formData = new FormData();

    // List of read-only or server-generated fields that shouldn't be re-sent
    const OMIT_KEYS = [
      '_id', 'id', '__v', 'createdAt', 'updatedAt', 'createdBy', 
      'reviews', 'averageRating', 'totalReviews', 'totalBookings', 
      'discountPercent', 'effectivePrice'
    ];

    // Cleaned arrays
    const inclusions = (formState.inclusions || []).filter(Boolean);
    const exclusions = (formState.exclusions || []).filter(Boolean);
    const thingsToCarry = (formState.thingsToCarry || []).filter(Boolean);
    const highlights = (formState.highlights || []).filter(Boolean);
    const tags = (formState.tags || []).filter(Boolean);
    const destinations = (formState.location?.destinations || []).filter(Boolean);

    Object.keys(formState).forEach((key) => {
      // 1. Skip system/read-only metadata
      if (OMIT_KEYS.includes(key)) return;

      const value = formState[key];

      // 2. Handle empty objects like pdfBrochure
      if (key === 'pdfBrochure') {
        const fileObj = value instanceof File ? value : value?.file || value?.raw;
        if (fileObj instanceof File) {
          formData.append('pdfBrochure', fileObj);
        } else if (value?.url) {
          formData.append('pdfBrochure', JSON.stringify(value));
        }
        return;
      }

      // 3. Handle Images (Checks direct Files AND wrapped File objects)
      if (key === 'images') {
        (value || []).forEach((img) => {
          // Extract the raw file if wrapped inside an object by ImageUploader
          const rawFile = img instanceof File ? img : (img?.file || img?.raw);

          if (rawFile instanceof File || rawFile instanceof Blob) {
            formData.append('images', rawFile);
          } else if (typeof img === 'string' && img.trim()) {
            formData.append('existingImages', img);
          } else if (img?.url && typeof img.url === 'string') {
            formData.append('existingImages', img.url);
          }
        });
      } else if (key === 'thumbnail') {
        const thumbFile = value instanceof File ? value : (value?.file || value?.raw);
        if (thumbFile instanceof File || thumbFile instanceof Blob) {
          formData.append('thumbnail', thumbFile);
        } else if (typeof value === 'string' && value.trim()) {
          formData.append('thumbnail', value);
        }
      } else if (key === 'location') {
        formData.append('location', JSON.stringify({ ...value, destinations }));
      } else if (['inclusions', 'exclusions', 'thingsToCarry', 'highlights', 'tags'].includes(key)) {
        const cleanedArray = { inclusions, exclusions, thingsToCarry, highlights, tags }[key];
        formData.append(key, JSON.stringify(cleanedArray));
      } else if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    await updateTrip({ id, data: formData }).unwrap();
    toast.success('Trip updated successfully!');
  } catch (err) {
    toast.error(err?.data?.message || 'Failed to update trip');
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