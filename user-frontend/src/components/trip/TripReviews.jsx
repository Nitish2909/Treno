import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ChevronDown, Star, MessageSquare, Send, Loader2, AlertCircle } from 'lucide-react';
import StarRating from './StarRating.jsx';
import { useGetReviewsQuery, useGetTripRatingSummaryQuery, useCreateReviewMutation } from '../../store/api/reviewApi.js';
import { useAuth } from '../../hooks/useAuth.js';

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const MOCK_SUMMARY = {
  average: 4.6,
  total: 128,
  breakdown: [
    { star: 5, count: 82 },
    { star: 4, count: 28 },
    { star: 3, count: 11 },
    { star: 2, count: 4 },
    { star: 1, count: 3 },
  ],
};

const MOCK_REVIEWS = [
  {
    _id: 'r1',
    user: { name: 'Priya Sharma', initials: 'PS', color: 'bg-teal-500' },
    rating: 5,
    title: 'Absolutely unforgettable!',
    body: 'The trip was perfectly organized. Guides were knowledgeable and the views were breathtaking. Would highly recommend to anyone looking for an adventure.',
    helpful: 24,
    date: '2024-03-12',
    travelDate: 'February 2024',
    userHelpful: false,
  },
  {
    _id: 'r2',
    user: { name: 'Rahul Mehta', initials: 'RM', color: 'bg-amber-500' },
    rating: 4,
    title: 'Great experience, minor hiccups',
    body: 'Overall a wonderful trip. The accommodation at Manali could have been better but the trekking experience was superb. Food was excellent.',
    helpful: 17,
    date: '2024-02-28',
    travelDate: 'January 2024',
    userHelpful: false,
  },
  {
    _id: 'r3',
    user: { name: 'Ananya Iyer', initials: 'AI', color: 'bg-purple-500' },
    rating: 5,
    title: 'Perfect for solo travelers',
    body: 'I was nervous traveling solo but the group was incredibly welcoming. The itinerary was well-paced and the photography spots were amazing.',
    helpful: 31,
    date: '2024-01-15',
    travelDate: 'December 2023',
    userHelpful: false,
  },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'helpful', label: 'Most Helpful' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
];

// ---------------------------------------------------------------------------
// Rating summary breakdown bar
// ---------------------------------------------------------------------------
function RatingBar({ star, count, total }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-4 text-right">{star}</span>
      <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full bg-amber-400 rounded-full"
        />
      </div>
      <span className="text-xs text-gray-400 w-7 text-right">{pct}%</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single review card
// ---------------------------------------------------------------------------
function ReviewCard({ review, onHelpful }) {
  const { user, rating, title, body, helpful, date, travelDate, userHelpful } = review;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
            user?.color ?? 'bg-gray-400'
          }`}
        >
          {user?.initials ?? user?.name?.slice(0, 2).toUpperCase() ?? '??'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="font-semibold text-gray-800 text-sm">{user?.name}</span>
            <span className="text-xs text-gray-400">
              {date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 mb-2">
            <StarRating rating={rating} size="sm" />
            {travelDate && (
              <span className="text-xs text-gray-400">Traveled: {travelDate}</span>
            )}
          </div>

          {title && (
            <p className="font-semibold text-gray-700 text-sm mb-1">{title}</p>
          )}
          <p className="text-sm text-gray-600 leading-relaxed">{body}</p>

          {/* Helpful */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-400">Helpful?</span>
            <button
              onClick={() => onHelpful?.(review._id)}
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border transition-all
                ${userHelpful
                  ? 'bg-teal-50 border-teal-300 text-teal-600'
                  : 'border-gray-200 text-gray-500 hover:border-teal-300 hover:text-teal-500'}`}
            >
              <ThumbsUp className={`w-3 h-3 ${userHelpful ? 'fill-current' : ''}`} />
              {helpful}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Write a review form
// ---------------------------------------------------------------------------
function ReviewForm({ tripId, onSubmit, loading }) {
  const [formRating, setFormRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formRating) e.rating = 'Please select a rating';
    if (!reviewTitle.trim()) e.title = 'Please add a review title';
    if (reviewText.trim().length < 20) e.text = 'Review must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
   onSubmit({
      tripId,
      bookingId,
      rating: formRating,
      title: reviewTitle,
      comment: reviewText,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-4">
      <h3 className="font-bold text-gray-800 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-amber-500" />
        Write a Review
      </h3>

      {/* Star selector */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Your Rating</label>
        <StarRating rating={formRating} size="lg" interactive onChange={setFormRating} />
        {errors.rating && <p className="text-xs text-red-500 mt-1">{errors.rating}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Review Title</label>
        <input
          type="text"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          placeholder="Summarise your experience"
          maxLength={100}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
        />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>

      {/* Body */}
      <div>
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Your Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="Tell others about your experience on this trip…"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none bg-white"
        />
        {errors.text && <p className="text-xs text-red-500 mt-1">{errors.text}</p>}
        <p className="text-xs text-gray-400 mt-0.5 text-right">{reviewText.length} / 1000</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white font-semibold
          px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function TripReviews({ tripId }) {
  const { user, isAuthenticated } = useAuth?.() ?? { user: null, isAuthenticated: false };
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [localHelpful, setLocalHelpful] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // API hooks with mock fallback
  const {
    data: summaryData,
    isError: summaryError,
  } = useGetTripRatingSummaryQuery?.(tripId) ?? { data: null, isError: true };

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
  } = useGetReviewsQuery?.({ tripId, sort, page }) ?? { data: null, isLoading: false, isError: true };

  const [createReview, { isLoading: submitLoading }] =
    useCreateReviewMutation?.() ?? [async () => {}, { isLoading: false }];

  const summary = summaryData ?? MOCK_SUMMARY;
  const reviews = reviewsData?.reviews ?? MOCK_REVIEWS;
  const hasMore = reviewsData?.hasMore ?? false;

  const handleHelpful = (reviewId) => {
    setLocalHelpful((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleSubmitReview = async (payload) => {
    try {
      await createReview(payload).unwrap();
      setSubmitSuccess(true);
    } catch(err) {
      console.error(err)
    }
  };

  return (
    <section className="py-4 space-y-8">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
        Reviews &amp; Ratings
      </h2>

      {/* ------------------------------------------------------------------ */}
      {/* Summary + Review list grid                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm sticky top-24">
            <div className="flex flex-col items-center mb-4">
              <span className="text-5xl font-extrabold text-amber-500">
                {summary.average?.toFixed(1)}
              </span>
              <StarRating rating={summary.average} size="md" className="mt-1" />
              <span className="text-sm text-gray-400 mt-1">
                Based on {summary.total?.toLocaleString()} reviews
              </span>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const entry = summary.breakdown?.find((b) => b.star === star);
                return (
                  <RatingBar
                    key={star}
                    star={star}
                    count={entry?.count ?? 0}
                    total={summary.total}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sort + count */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm text-gray-500">
              {summary.total} {summary.total === 1 ? 'review' : 'reviews'}
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-gray-500 font-medium">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="border border-gray-200 rounded-lg text-xs px-2.5 py-1.5 text-gray-700
                  focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading state */}
          {reviewsLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            </div>
          )}

          {/* Reviews */}
          {!reviewsLoading && (
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={{
                    ...review,
                    userHelpful: localHelpful[review._id] ?? review.userHelpful,
                    helpful: review.helpful + (localHelpful[review._id] ? 1 : 0),
                  }}
                  onHelpful={handleHelpful}
                />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && !reviewsLoading && (
            <div className="flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-2 text-amber-500 border border-amber-200
                  hover:bg-amber-50 font-semibold px-5 py-2 rounded-full text-sm transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Write a review                                                      */}
      {/* ------------------------------------------------------------------ */}
      {isAuthenticated && !submitSuccess && (
        <ReviewForm tripId={tripId} onSubmit={handleSubmitReview} loading={submitLoading} />
      )}

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-700 text-sm font-medium"
        >
          <CheckIcon />
          Thank you! Your review has been submitted successfully.
        </motion.div>
      )}

      {!isAuthenticated && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center gap-3 text-gray-500 text-sm">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          Please{' '}
          <a href="/login" className="text-amber-500 font-semibold hover:underline">
            log in
          </a>{' '}
          to write a review.
        </div>
      )}
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}
