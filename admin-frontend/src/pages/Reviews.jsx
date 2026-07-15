import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { CheckCheck, Loader2 } from 'lucide-react'
import { useGetAllReviewsQuery, useApproveReviewMutation } from '../store/api/adminApi'
import ReviewCard from '../components/reviews/ReviewCard'
import PageHeader from '../components/common/PageHeader'
import clsx from 'clsx'

const TABS = [
  { label: 'Pending',  value: 'pending'  },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

export default function Reviews() {
  const [tab, setTab]     = useState('pending')
  const [page, setPage]   = useState(1)

  const { data, isLoading } = useGetAllReviewsQuery({ status: tab, page, limit: 20 })
  const [approveReview, { isLoading: bulkLoading }] = useApproveReviewMutation()

  const reviews = data?.reviews || []

  async function handleBulkApprove() {
    const pending = reviews.filter((r) => r.status === 'pending')
    if (!pending.length) return
    try {
      await Promise.all(pending.map((r) => approveReview(r._id).unwrap()))
      toast.success(`${pending.length} reviews approved`)
    } catch (e) {
      toast.error('Some approvals failed')
    }
  }

  return (
    <>
      <Helmet><title>Reviews — Treno Admin</title></Helmet>

      <PageHeader
        title="Reviews"
        breadcrumbs={[{ label: 'Business' }, { label: 'Reviews' }]}
        actions={
          tab === 'pending' && reviews.length > 0 && (
            <button className="btn btn-success" onClick={handleBulkApprove} disabled={bulkLoading}>
              {bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCheck size={15} />}
              Approve All Pending
            </button>
          )
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100 p-1.5 rounded-xl w-fit">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => { setTab(t.value); setPage(1) }}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
              tab === t.value ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {t.label}
            {t.value === 'pending' && data?.pendingCount > 0 && (
              <span className="ml-1.5 bg-warning-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                {data.pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="skeleton h-4 w-32 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-3/4 rounded" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <p className="text-sm">No {tab} reviews</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </>
  )
}
