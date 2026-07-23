import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  ToggleLeft,
  ToggleRight,
  Star,
} from "lucide-react";
import {
  useGetAllTripsQuery,
  useDeleteTripMutation,
  useUpdateTripStatusMutation,
  useGetCategoriesQuery,
} from "../store/api/adminApi";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PageHeader from "../components/common/PageHeader";
import { formatPrice, truncateText } from "../utils/helpers";

export default function Trips() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selected, setSelected] = useState([]);

  const { data, isLoading } = useGetAllTripsQuery({
    page,
    limit: pageSize,
    search,
    status: statusFilter,
    type: typeFilter,
    category: catFilter,
  });
  const { data: catData } = useGetCategoriesQuery({});
  const [deleteTrip, { isLoading: deleting }] = useDeleteTripMutation();
  const [updateStatus, { isLoading: updating }] = useUpdateTripStatusMutation();

  const trips = data?.data?.trips || [];
  console.log(trips)
  const total = data?.data?.total || 0;
  const categories = catData?.data?.categories || [];

  async function handleDelete() {
    try {
      await deleteTrip(deleteId).unwrap();
      toast.success("Trip deleted");
      setDeleteId(null);
    } catch (e) {
      toast.error(e?.data?.message || "Delete failed");
    }
  }

  async function handleToggleStatus(trip) {
    const next = trip.status === "active" ? "inactive" : "active";
    try {
      await updateStatus({ id: trip._id, status: next }).unwrap();
      toast.success(`Trip marked as ${next}`);
    } catch (e) {
      toast.error(e?.data?.message || "Update failed");
    }
  }

  async function handleToggleFeatured(trip) {
    try {
      await updateStatus({ id: trip._id, featured: !trip.featured }).unwrap();
      toast.success(
        trip.featured ? "Removed from featured" : "Marked as featured",
      );
    } catch (e) {
      toast.error(e?.data?.message || "Update failed");
    }
  }

  async function handleBulkDelete(ids) {
    if (!confirm(`Delete ${ids.length} trip(s)?`)) return;
    try {
      await Promise.all(ids.map((id) => deleteTrip(id).unwrap()));
      toast.success(`${ids.length} trips deleted`);
      setSelected([]);
    } catch (e) {
      toast.error("Some deletions failed");
    }
  }

  const TRIP_TYPES = ["domestic", "international"];

  const columns = [
    {
      key: "thumbnail",
      label: "Image",
      width: 70,
      render: (val, row) => (
        <img
          src={
            row.images[0]?.url ||
            "https://placehold.co/56x40/e2e8f0/94a3b8?text=Trip"
          }
          alt={row.title}
          className="w-14 h-10 object-cover rounded-lg border border-gray-200"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium text-gray-900">{truncateText(val, 40)}</p>
          <p className="text-xs text-gray-400">
            {row.from} · {row.durationDays}D
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (val) => (
        <span className="badge bg-blue-50 text-blue-600">
          {typeof val === "object" ? val?.name : val || "—"}
        </span>
      ),
    },
    { key: "type", label: "Type", render: (v) => v || "—" },
    {
      key: "discountedPrice",
      label: "Price",
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-semibold">
            {formatPrice(val || row.price?.original)}
          </p>
          {val && val < row?.original && (
            <p className="text-xs text-gray-400 line-through">
              {formatPrice(row?.original)}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={val} />
          {row.featured && (
            <Star size={12} className="fill-amber-400 text-amber-400" />
          )}
        </div>
      ),
    },
    {
      key: "bookingsCount",
      label: "Bookings",
      sortable: true,
      render: (v) => <span className="font-medium">{v || 0}</span>,
    },
    {
      key: "actions",
      label: "",
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            className="btn-icon text-gray-400 hover:text-amber-500 hover:bg-amber-50"
            title={row.featured ? "Unfeature" : "Feature"}
            onClick={() => handleToggleFeatured(row)}
          >
            <Star
              size={14}
              className={row.featured ? "fill-amber-400 text-amber-400" : ""}
            />
          </button>
          <button
            className={`btn-icon ${row.status === "active" ? "text-success-600 hover:bg-success-50" : "text-gray-400 hover:bg-gray-100"}`}
            title="Toggle status"
            onClick={() => handleToggleStatus(row)}
          >
            {row.status === "active" ? (
              <ToggleRight size={16} />
            ) : (
              <ToggleLeft size={16} />
            )}
          </button>
          <button
            className="btn-icon text-gray-400 hover:text-primary-600 hover:bg-primary-50"
            onClick={() => navigate(`/admin/trips/${row._id}/edit`)}
          >
            <Pencil size={14} />
          </button>
          <button
            className="btn-icon text-gray-400 hover:text-danger-600 hover:bg-danger-50"
            onClick={() => setDeleteId(row._id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Trips — Treno Admin</title>
      </Helmet>

      <PageHeader
        title="Trips"
        breadcrumbs={[{ label: "Content" }, { label: "Trips" }]}
        actions={
          <Link to="/admin/trips/create" className="btn btn-primary">
            <Plus size={15} /> Add Trip
          </Link>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select
          className="form-select w-auto text-sm"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="draft">Draft</option>
        </select>
        <select
          className="form-select w-auto text-sm"
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Types</option>
          {TRIP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="form-select w-auto text-sm"
          value={catFilter}
          onChange={(e) => {
            setCatFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={trips}
        loading={isLoading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
        selectable
        onSelectionChange={setSelected}
        bulkActions={[
          {
            label: "Delete Selected",
            onClick: handleBulkDelete,
            variant: "danger",
            icon: Trash2,
          },
        ]}
        searchable
        searchPlaceholder="Search trips…"
        onSearch={(v) => {
          setSearch(v);
          setPage(1);
        }}
        searchValue={search}
        emptyText="No trips found"
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Trip?"
        message="This will permanently delete the trip and all associated data. This cannot be undone."
        confirmLabel="Delete"
        loading={deleting}
      />
    </>
  );
}
