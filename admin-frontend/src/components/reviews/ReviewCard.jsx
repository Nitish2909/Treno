import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Star, ThumbsUp, ThumbsDown, Trash2, MessageSquare, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDate } from '../../utils/helpers'
import StatusBadge from '../common/StatusBadge'
import {
  useApproveReviewMutation,
  useRejectReviewMutation,
  useDeleteReviewMutation,
  useAddReviewResponseMutation,
} from '../../store/api/adminApi'
import clsx from 'clsx'

function StarRating({ value }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}

export default function ReviewCard({ review }) {
  const [showResponse, setShowResponse] = useState(false)
  const [responseText, setResponseText] = useState(review.adminResponse || '')
  const [approveReview, { isLoading: approving }] = useApproveReviewMutation()
  const [rejectReview,  { isLoading: rejecting  }] = useRejectReviewMutation()
  const [deleteReview,  { isLoading: deleting   }] = useDeleteReviewMutation()
  const [addResponse,   { isLoading: responding }] = useAddReviewResponseMutation()

  async function handleApprove() {
    try { await approveReview(review._id).unwrap(); toast.success('Review approved') }
    catch (e) { toast.error(e?.data?.message || 'Failed') }
  }
  async function handleReject() {
    try { await rejectReview(review._id).unwrap(); toast.success('Review rejected') }
    catch (e) { toast.error(e?.data?.message || 'Failed') }
  }
  async function handleDelete() {
    if (!confirm('Delete this review?')) return
    try { await deleteReview(review._id).unwrap(); toast.success('Review deleted') }
    catch (e) { toast.error(e?.data?.message || 'Failed') }
  }
  async function handleSubmitResponse() {
    if (!responseText.trim()) return
    try {
      await addResponse({ id: review._id, response: responseText }).unwrap()
      toast.success('Response added')
      setShowResponse(false)
    } catch (e) { toast.error(e?.data?.message || 'Failed') }
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0">
            {review.user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{review.user?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={review.status || 'pending'} />
          <StarRating value={review.rating} />
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        {/* Trip link */}
        <p className="text-xs text-gray-400">
          Trip: <span className="text-primary-600 font-medium">{review.trip?.title || '—'}</span>
        </p>

        {review.title && (
          <p className="text-sm font-semibold text-gray-800">{review.title}</p>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>

        {/* Admin response */}
        {review.adminResponse && (
          <div className="bg-primary-50 border border-primary-100 rounded-lg px-4 py-3">
            <p className="text-xs font-semibold text-primary-700 mb-1">Admin Response</p>
            <p className="text-sm text-primary-800">{review.adminResponse}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
        {review.status !== 'approved' && (
          <button className="btn btn-sm btn-success" onClick={handleApprove} disabled={approving}>
            {approving ? <Loader2 size={12} className="animate-spin" /> : <ThumbsUp size={12} />}
            Approve
          </button>
        )}
        {review.status !== 'rejected' && (
          <button className="btn btn-sm btn-secondary" onClick={handleReject} disabled={rejecting}>
            {rejecting ? <Loader2 size={12} className="animate-spin" /> : <ThumbsDown size={12} />}
            Reject
          </button>
        )}
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setShowResponse((v) => !v)}
        >
          <MessageSquare size={12} />
          {showResponse ? 'Hide' : 'Respond'}
        </button>
        <button className="btn btn-sm btn-danger ml-auto" onClick={handleDelete} disabled={deleting}>
          {deleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
          Delete
        </button>
      </div>

      {/* Response form */}
      {showResponse && (
        <div className="px-5 pb-4 border-t border-gray-100 pt-3 space-y-2">
          <textarea
            className="form-textarea text-sm"
            rows={3}
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Write your response to this review…"
          />
          <div className="flex justify-end gap-2">
            <button className="btn btn-sm btn-secondary" onClick={() => setShowResponse(false)}>Cancel</button>
            <button className="btn btn-sm btn-primary" onClick={handleSubmitResponse} disabled={responding}>
              {responding && <Loader2 size={12} className="animate-spin" />}
              Submit Response
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
