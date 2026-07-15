import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * breadcrumbs: [{ label: 'Trips', to: '/admin/trips' }, { label: 'Create' }]
 * actions: ReactNode or array of buttons
 */
export default function PageHeader({ title, breadcrumbs = [], actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-xs text-gray-400 mb-1">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} />}
                {crumb.to ? (
                  <Link to={crumb.to} className="hover:text-primary-600 transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-gray-600 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  )
}
