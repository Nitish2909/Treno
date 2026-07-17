import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { Eye, ShieldCheck, ShieldOff, UserX } from 'lucide-react'
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useDeactivateUserMutation } from '../store/api/adminApi'
import DataTable from '../components/common/DataTable'
import StatusBadge from '../components/common/StatusBadge'
import ConfirmDialog from '../components/common/ConfirmDialog'
import PageHeader from '../components/common/PageHeader'
import { formatDate } from '../utils/helpers'

export default function Users() {
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch]     = useState('')
  const [roleFilter, setRole]   = useState('')
  const [deactivateId, setDeactivateId] = useState(null)

  const { data, isLoading } = useGetAllUsersQuery({ page, limit: pageSize, search, role: roleFilter })
  const [updateRole,    { isLoading: roleling  }] = useUpdateUserRoleMutation()
  const [deactivateUser,{ isLoading: deacting  }] = useDeactivateUserMutation()

  const users = data?.data?.users || []
  const total = data?.data?.total || 0

  async function handleToggleRole(user) {
    const newRole = user.role === 'admin' ? 'user' : 'admin'
    try {
      await updateRole({ id: user._id, role: newRole }).unwrap()
      toast.success(`User role changed to ${newRole}`)
    } catch (e) { toast.error(e?.data?.message || 'Failed') }
  }

  async function handleDeactivate() {
    try {
      await deactivateUser({ id: deactivateId }).unwrap()
      toast.success('User deactivated')
      setDeactivateId(null)
    } catch (e) { toast.error(e?.data?.message || 'Failed') }
  }

  const columns = [
    {
      key: 'name', label: 'User',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm flex-shrink-0">
            {val?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-medium text-gray-900">{val}</p>
            <p className="text-xs text-gray-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone', label: 'Phone',
      render: (v) => v || '—',
    },
    {
      key: 'role', label: 'Role',
      render: (v) => <StatusBadge status={v || 'user'} />,
    },
    {
      key: 'bookingsCount', label: 'Bookings', sortable: true,
      render: (v) => <span className="font-medium">{v || 0}</span>,
    },
    {
      key: 'createdAt', label: 'Joined', sortable: true,
      render: (v) => formatDate(v),
    },
    {
      key: 'isActive', label: 'Status',
      render: (v) => <StatusBadge status={v === false ? 'inactive' : 'active'} />,
    },
    {
      key: 'actions', label: '',
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Link to={`/admin/users/${row._id}`} className="btn-icon text-primary-500 hover:bg-primary-50">
            <Eye size={14} />
          </Link>
          <button
            className={`btn-icon ${row.role === 'admin' ? 'text-purple-500 hover:bg-purple-50' : 'text-gray-400 hover:bg-gray-100'}`}
            title={row.role === 'admin' ? 'Remove admin' : 'Make admin'}
            onClick={() => handleToggleRole(row)}
          >
            {row.role === 'admin' ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
          </button>
          {row.isActive !== false && (
            <button
              className="btn-icon text-danger-400 hover:bg-danger-50"
              title="Deactivate user"
              onClick={() => setDeactivateId(row._id)}
            >
              <UserX size={14} />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Helmet><title>Users — Treno Admin</title></Helmet>
      <PageHeader
        title="Users"
        breadcrumbs={[{ label: 'Users' }, { label: 'All Users' }]}
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select className="form-select w-auto text-sm" value={roleFilter} onChange={(e) => { setRole(e.target.value); setPage(1) }}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={isLoading}
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1) }}
        searchable
        searchPlaceholder="Search by name or email…"
        onSearch={(v) => { setSearch(v); setPage(1) }}
        searchValue={search}
        emptyText="No users found"
      />

      <ConfirmDialog
        open={!!deactivateId}
        onClose={() => setDeactivateId(null)}
        onConfirm={handleDeactivate}
        title="Deactivate User?"
        message="The user will lose access to their account. You can reactivate them later."
        confirmLabel="Deactivate"
        loading={deacting}
      />
    </>
  )
}
