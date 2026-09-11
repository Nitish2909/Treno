import { useState } from "react";
import Modal from "../components/common/Modal";
import { useGetInquiryQuery } from "../store/api/adminApi";

const Inquiry = () => {
  const [selectedLead, setSelectedLead] = useState(null);

  const { data: response, isLoading, isError, refetch } = useGetInquiryQuery();
  const leads = response?.data || [];

  // Helper function to safely format dates
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Prevents RangeError
    return includeTime ? date.toLocaleString() : date.toLocaleDateString();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Trip Inquiries</h1>
          <p className="text-sm text-slate-500">
            Manage captured popup leads and callback requests
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {/* Leads List Container */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-8 text-center text-slate-400">
            Loading inquiries...
          </div>
        ) : isError ? (
          <div className="py-8 text-center text-red-500">
            Failed to load inquiries.
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-slate-400">
            No trip inquiries found.
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id || Math.random()}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Lead Summary Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800">
                      {lead.name || "N/A"}
                    </h3>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                      {lead.destination || "General"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">
                    {lead.email || "No Email"} &bull;{" "}
                    {lead.countryCode || "+91"} {lead.phoneNumber || "No Phone"}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5">
                      📅 Call Day:{" "}
                      <strong className="text-slate-800">
                        {lead.preferredDay || "Flexible"}
                      </strong>
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5">
                      ⏰ Call Time:{" "}
                      <strong className="text-slate-800">
                        {lead.preferredTime || "Flexible"}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2 sm:border-t-0 sm:pt-0">
                  <span className="text-xs text-slate-400 mr-2 hidden md:inline">
                    {formatDate(lead.createdAt)} •{" "}
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lead Detail Modal */}
      <Modal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Inquiry Details"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-5">
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Full Name
                </label>
                <p className="text-sm font-medium text-slate-800">
                  {selectedLead.name || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Destination Interested
                </label>
                <p className="text-sm font-medium text-emerald-700">
                  {selectedLead.destination || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <p className="text-sm font-medium text-slate-800">
                  {selectedLead.email || "N/A"}
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phone Number
                </label>
                <p className="text-sm font-medium text-slate-800">
                  {selectedLead.countryCode || "+91"}{" "}
                  {selectedLead.phoneNumber || "N/A"}
                </p>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                Callback Preferences
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-slate-500">Preferred Day:</span>{" "}
                  <span className="font-semibold text-slate-800">
                    {selectedLead.preferredDay || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Preferred Time:</span>{" "}
                  <span className="font-semibold text-slate-800">
                    {selectedLead.preferredTime || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
              <span>
                Submitted On: {formatDate(selectedLead.createdAt, true)}
              </span>
              <span>Lead ID: {selectedLead._id || "N/A"}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inquiry;
