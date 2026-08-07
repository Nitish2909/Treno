import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  Users,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  Calendar,
  Hash,
} from "lucide-react";
import { formatPrice, formatDate, formatDateTime } from "../../utils/helpers";
import StatusBadge from "../common/StatusBadge";
import Modal from "../common/Modal";
import { useUpdateBookingStatusMutation } from "../../store/api/adminApi";
import clsx from "clsx";

function InfoRow({ label, value, className }) {
  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row sm:items-center gap-1",
        className,
      )}
    >
      <span className="text-xs text-gray-500 w-40 flex-shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value || "—"}</span>
    </div>
  );
}

export default function BookingDetails({ booking }) {
  const [statusModal, setStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [reason, setReason] = useState("");
  const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();

  if (!booking) return null;

  async function handleStatusUpdate() {
    if (!newStatus) return;
    try {
      await updateStatus({
        id: booking._id,
        status: newStatus,
        reason,
      }).unwrap();
      toast.success("Booking status updated");
      setStatusModal(false);
      setReason("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  }

  const statusActions = [
    {
      label: "Confirm",
      value: "confirmed",
      icon: CheckCircle2,
      className: "btn-primary",
    },
    {
      label: "Complete",
      value: "completed",
      icon: CheckCircle2,
      className: "btn-success",
    },
    {
      label: "Cancel",
      value: "cancelled",
      icon: XCircle,
      className: "btn-danger",
    },
  ].filter((a) => a.value !== booking.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Hash size={14} className="text-gray-400" />
              <span className="text-xs font-mono text-gray-500">
                {booking.bookingId || booking._id}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {booking.trip?.title || "Trip Booking"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Booked on {formatDateTime(booking.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={booking.paymentStatus} />
            <StatusBadge status={booking.status} />
            {statusActions.map((a) => (
              <button
                key={a.value}
                className={clsx("btn btn-sm", a.className)}
                onClick={() => {
                  setNewStatus(a.value);
                  setStatusModal(true);
                }}
              >
                <a.icon size={13} />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin size={16} className="text-primary-500" /> Trip
                Information
              </h3>
            </div>
            <div className="card-body space-y-3">
              <InfoRow label="Trip Title" value={booking.trip?.title} />
              <InfoRow label="Destination" value={booking.trip?.location?.destinations} />
              <InfoRow
                label="Departure From"
                value={booking.trip?.location?.from}
              />
              <InfoRow
                label="Travel Date"
                value={formatDate(booking.startDate)}
              />
              <InfoRow
                label="Duration"
                value={
                  booking.trip
                    ? `${booking.trip.duration.days}D / ${booking.trip.duration.nights}N`
                    : null
                }
              />
            </div>
          </div>

          {/* Passengers */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Users size={16} className="text-primary-500" /> Passengers (
                {booking.passengers?.length || 0})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>ID Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {(booking.passengers || []).map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td className="font-medium">{p.name}</td>
                      <td>{p.age}</td>
                      <td className="capitalize">{p.gender}</td>
                      <td>
                        {p.idType} – {p.idNumber}
                      </td>
                    </tr>
                  ))}
                  {!booking.passengers?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-gray-400 py-4"
                      >
                        No passenger details
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Requirements */}
          {booking.specialRequirements && (
            <div className="card card-body">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Special Requirements
              </h4>
              <p className="text-sm text-gray-600">
                {booking.specialRequirements}
              </p>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Traveler Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <User size={16} className="text-primary-500" /> Traveler
              </h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                  {booking.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking.user?.name}
                  </p>
                  <p className="text-xs text-gray-400">Customer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={13} className="text-gray-400" />
                  {booking.user?.email || "—"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={13} className="text-gray-400" />
                  {booking.contactPhone || booking.user?.phone || "—"}
                </div>
              </div>
              <Link
                to={`/admin/users/${booking.user?._id}`}
                className="text-xs text-primary-600 hover:underline"
              >
                View user profile →
              </Link>
            </div>
          </div>

          {/* Payment */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard size={16} className="text-primary-500" /> Payment
              </h3>
            </div>
            <div className="card-body space-y-3">
              <InfoRow
                label="Base Amount"
                value={formatPrice(booking?.trip?.price?.original)}
              />
              {/* <InfoRow label="Discount"    value={booking.trip.discountPercent ? formatPrice(booking?.trip?.discountPercent) : 'None'} /> */}
              <InfoRow
                label="Discount"
                value={
                  booking?.trip?.discountPercent
                    ? `${booking.trip.discountPercent}%`
                    : "None"
                }
              />
              {/* <InfoRow label="Taxes" value={formatPrice(booking.taxes || 0)} /> */}
              <div className="border-t border-gray-100 pt-3">
                <InfoRow
                  label="Total Amount"
                  value={
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(booking.totalAmount)}
                    </span>
                  }
                />
              </div>
              <InfoRow label="Payment Method" value={booking.paymentMethod} />
              <InfoRow
                label="Transaction ID"
                value={booking.razorpayPaymentId}
              />
              <InfoRow label="Paid On" value={formatDateTime(booking.paidAt)} />
              <StatusBadge status={booking.paymentStatus} />
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      <Modal
        open={statusModal}
        onClose={() => setStatusModal(false)}
        title={`Update Booking Status to "${newStatus}"`}
        size="sm"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setStatusModal(false)}
            >
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                newStatus === "cancelled" ? "btn-danger" : "btn-primary",
              )}
              onClick={handleStatusUpdate}
              disabled={isLoading}
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              Confirm
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Are you sure you want to change the booking status to{" "}
            <strong className="capitalize">{newStatus}</strong>?
          </p>
          {(newStatus === "cancelled" || newStatus === "refunded") && (
            <div>
              <label className="form-label">Reason (optional)</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for cancellation / refund…"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
