import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import clsx from 'clsx'

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = 'blue',
  change,
  changeLabel = 'vs last month',
  loading = false,
}) {
  const colorMap = {
    blue:   { bg: 'bg-primary-100',  icon: 'text-primary-600',  border: 'border-primary-200' },
    green:  { bg: 'bg-success-100',  icon: 'text-success-600',  border: 'border-success-100' },
    amber:  { bg: 'bg-warning-100',  icon: 'text-warning-600',  border: 'border-warning-100' },
    red:    { bg: 'bg-danger-100',   icon: 'text-danger-600',   border: 'border-danger-100'  },
    purple: { bg: 'bg-purple-100',   icon: 'text-purple-600',   border: 'border-purple-200'  },
  }

  const c = colorMap[color] || colorMap.blue

  if (loading) {
    return (
      <div className="card p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="skeleton h-3.5 w-24 rounded" />
            <div className="skeleton h-7 w-20 rounded" />
            <div className="skeleton h-3 w-32 rounded" />
          </div>
          <div className="skeleton w-12 h-12 rounded-xl" />
        </div>
      </div>
    )
  }

  const isPositive = change?.isPositive
  const TrendIcon  = change ? (isPositive ? TrendingUp : TrendingDown) : Minus

  return (
    <div className="card p-5 hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2 truncate">{value}</p>
          {change && (
            <div className="flex items-center gap-1.5">
              <span
                className={clsx(
                  'flex items-center gap-0.5 text-xs font-medium',
                  isPositive ? 'text-success-600' : 'text-danger-600'
                )}
              >
                <TrendIcon size={12} />
                {change.formatted}
              </span>
              <span className="text-xs text-gray-400">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={clsx('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border', c.bg, c.border)}>
          {Icon && <Icon size={22} className={c.icon} />}
        </div>
      </div>
    </div>
  )
}
