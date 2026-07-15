import { useState, useMemo } from 'react'
import {
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  Search, Trash2, AlertCircle, ChevronsLeft, ChevronsRight,
} from 'lucide-react'
import clsx from 'clsx'

function SkeletonRow({ cols }) {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3"><div className="skeleton h-4 w-4 rounded" /></td>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
        </td>
      ))}
    </tr>
  )
}

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  onSort,
  sortKey,
  sortDir,
  selectable = false,
  onSelectionChange,
  bulkActions = [],
  emptyText = 'No data found',
  emptyIcon: EmptyIcon = AlertCircle,
  searchable = false,
  searchPlaceholder = 'Search…',
  onSearch,
  searchValue = '',
}) {
  const [selected, setSelected] = useState([])

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  function toggleAll() {
    const next = selected.length === data.length ? [] : data.map((r) => r._id || r.id)
    setSelected(next)
    onSelectionChange?.(next)
  }

  function toggleRow(id) {
    const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    setSelected(next)
    onSelectionChange?.(next)
  }

  function handleSort(key) {
    if (!onSort) return
    if (sortKey === key) {
      onSort(key, sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      onSort(key, 'asc')
    }
  }

  const pageSizeOptions = [10, 25, 50, 100]
  const startItem = Math.min((page - 1) * pageSize + 1, total)
  const endItem   = Math.min(page * pageSize, total)

  return (
    <div className="card overflow-hidden">
      {/* Table toolbar */}
      {(searchable || bulkActions.length > 0) && (
        <div className="px-5 py-3.5 border-b border-gray-100 flex flex-wrap items-center gap-3">
          {searchable && (
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="form-input pl-9 py-1.5"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          )}
          {selected.length > 0 && bulkActions.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500">{selected.length} selected</span>
              {bulkActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => action.onClick(selected)}
                  className={clsx('btn btn-sm', action.variant === 'danger' ? 'btn-danger' : 'btn-secondary')}
                >
                  {action.icon && <action.icon size={14} />}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : {}}
                  className={clsx(col.sortable && 'cursor-pointer select-none hover:text-gray-700')}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="flex flex-col -space-y-1">
                        <ChevronUp
                          size={10}
                          className={clsx(sortKey === col.key && sortDir === 'asc' ? 'text-primary-500' : 'text-gray-300')}
                        />
                        <ChevronDown
                          size={10}
                          className={clsx(sortKey === col.key && sortDir === 'desc' ? 'text-primary-500' : 'text-gray-300')}
                        />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: pageSize > 10 ? 10 : pageSize }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                    <EmptyIcon size={40} strokeWidth={1.5} />
                    <p className="text-sm">{emptyText}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => {
                const rowId = row._id || row.id || i
                return (
                  <tr key={rowId} className={clsx(selected.includes(rowId) && 'bg-primary-50/60')}>
                    {selectable && (
                      <td className="px-4 py-3 w-10">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          checked={selected.includes(rowId)}
                          onChange={() => toggleRow(rowId)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={col.className}>
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && total > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span>{startItem}–{endItem} of {total}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(1)}
              disabled={page === 1}
              className="btn-icon text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 1}
              className="btn-icon text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let p
              if (totalPages <= 5) {
                p = i + 1
              } else if (page <= 3) {
                p = i + 1
              } else if (page >= totalPages - 2) {
                p = totalPages - 4 + i
              } else {
                p = page - 2 + i
              }
              return (
                <button
                  key={p}
                  onClick={() => onPageChange?.(p)}
                  className={clsx(
                    'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
                    p === page
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  {p}
                </button>
              )
            })}
            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages}
              className="btn-icon text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => onPageChange?.(totalPages)}
              disabled={page >= totalPages}
              className="btn-icon text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
