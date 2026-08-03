import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { Download, Eye } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useGetAllBookingsQuery, useExportBookingsMutation } from '../store/api/adminApi'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import PageHeader from '../components/common/PageHeader'
import { formatPrice, formatDate, downloadBlob, truncateText } from '../utils/helpers'
import clsx from 'clsx'

const STATUS_TABS = ['all', 'pending', 'confirmed', 'completed', 'cancelled']

export default function Bookings() {
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('all')
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo]     = useState(null)

  const { data, isLoading } = useGetAllBookingsQuery({
    page,
    limit: pageSize,
    search,
    status: status === 'all' ? '' : status,
    dateFrom: dateFrom?.toISOString(),
    dateTo:   dateTo?.toISOString(),
  })

  const [exportBookings, { isLoading: exporting }] = useExportBookingsMutation()

  const bookings = data?.data?.bookings || []
 
  const total    = data?.total    || 0

  async function handleExport() {
    try {
      const blob = await exportBookings({ status: status === 'all' ? '' : status, dateFrom: dateFrom?.toISOString(), dateTo: dateTo?.toISOString() }).unwrap()
      downloadBlob(blob, `bookings-export-${new Date().toISOString().slice(0,10)}.csv`)
      toast.success('Bookings exported')
    } catch (e) {
      toast.error('Export failed')
    }
  }

  const columns = [
    {
      key: 'bookingId', label: 'Booking ID',
      render: (val, row) => (
        <span className="font-mono text-xs text-gray-600">#{(val || row._id)?.slice(-8)}</span>
      ),
    },
    {
      key: 'user', label: 'Traveler',
      render: (val) => (
        <div>
          <p className="font-medium text-gray-900">{val?.name || '—'}</p>
          <p className="text-xs text-gray-400">{val?.email || ''}</p>
        </div>
      ),
    },
    {
      key: 'trip', label: 'Trip',
      render: (val) => (
        <span className="text-sm">{truncateText(val?.title, 30) || '—'}</span>
      ),
    },
    {
      key: 'startDate', label: 'Travel Date', sortable: true,
      render: (v) => formatDate(v),
    },
    {
      key: 'passengers', label: 'Pax',
      render: (v) => <span className="font-medium">{Array.isArray(v) ? v.length : v || 0}</span>,
    },
    {
      key: 'totalAmount', label: 'Amount', sortable: true,
      render: (v) => <span className="font-semibold">{formatPrice(v)}</span>,
    },
    {
      key: 'paymentStatus', label: 'Payment',
      render: (v) => <StatusBadge status={v} />,
    },
    {
      key: 'bookingStatus', label: 'Status',
      render: (v) => <StatusBadge status={v} />,
    },
    {
      key: 'actions', label: '',
      render: (_, row) => (
        <Link to={`/admin/bookings/${row._id}`} className="btn-icon text-primary-500 hover:bg-primary-50">
          <Eye size={15} />
        </Link>
      ),
    },
  ]

  return (
    <>
      <Helmet><title>Bookings — Treno Admin</title></Helmet>

      <PageHeader
        title="Bookings"
        breadcrumbs={[{ label: 'Business' }, { label: 'Bookings' }]}
        actions={
          <button className="btn btn-secondary" onClick={handleExport} disabled={exporting}>
            <Download size={15} />
            {exporting ? 'Exporting…' : 'Export CSV'}
          </button>
        }
      />

      {/* Status Tabs */}
      <div className="flex items-center gap-1 mb-4 bg-gray-100 p-1.5 rounded-xl w-fit">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => { setStatus(tab); setPage(1) }}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-150',
              status === tab
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Date filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">From:</span>
          <DatePicker
            selected={dateFrom}
            onChange={setDateFrom}
            dateFormat="dd MMM yyyy"
            placeholderText="Start date"
            className="form-input w-36 py-1.5 text-sm"
            selectsStart
            startDate={dateFrom}
            endDate={dateTo}
            isClearable
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">To:</span>
          <DatePicker
            selected={dateTo}
            onChange={setDateTo}
            dateFormat="dd MMM yyyy"
            placeholderText="End date"
            className="form-input w-36 py-1.5 text-sm"
            selectsEnd
            startDate={dateFrom}
            endDate={dateTo}
            minDate={dateFrom}
            isClearable
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={bookings}
        loading={isLoading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
        searchable
        searchPlaceholder="Search by booking ID or traveler…"
        onSearch={(v) => { setSearch(v); setPage(1) }}
        searchValue={search}
        emptyText="No bookings found"
      />
    </>
  )
}
