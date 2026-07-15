import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import clsx from 'clsx'

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1
    if (page <= 3)              return i + 1
    if (page >= totalPages - 2) return totalPages - 4 + i
    return page - 2 + i
  })

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(1)} disabled={page === 1} className="btn-icon disabled:opacity-40 hover:bg-gray-100">
        <ChevronsLeft size={15} />
      </button>
      <button onClick={() => onChange(page - 1)} disabled={page === 1} className="btn-icon disabled:opacity-40 hover:bg-gray-100">
        <ChevronLeft size={15} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={clsx(
            'w-8 h-8 rounded-lg text-sm font-medium transition-colors',
            p === page ? 'bg-primary-500 text-white' : 'hover:bg-gray-100 text-gray-600'
          )}
        >
          {p}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages} className="btn-icon disabled:opacity-40 hover:bg-gray-100">
        <ChevronRight size={15} />
      </button>
      <button onClick={() => onChange(totalPages)} disabled={page >= totalPages} className="btn-icon disabled:opacity-40 hover:bg-gray-100">
        <ChevronsRight size={15} />
      </button>
    </div>
  )
}
