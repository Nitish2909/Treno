import React from 'react';

const COLOR_MAP = {
  amber: {
    bg: 'bg-amber-100',
    icon: 'text-amber-600',
    ring: 'ring-amber-200',
  },
  teal: {
    bg: 'bg-teal-100',
    icon: 'text-teal-600',
    ring: 'ring-teal-200',
  },
  blue: {
    bg: 'bg-blue-100',
    icon: 'text-blue-600',
    ring: 'ring-blue-200',
  },
  emerald: {
    bg: 'bg-emerald-100',
    icon: 'text-emerald-600',
    ring: 'ring-emerald-200',
  },
  purple: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    ring: 'ring-purple-200',
  },
};

//  Skeleton shimmer 
function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-slate-200 rounded ${className}`}
    />
  );
}

export default function StatsCard(card) {
  const { title, value, icon, color = 'amber', change, isLoading } = card;
  const palette = COLOR_MAP[color] || COLOR_MAP.amber;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-7 w-16" />
          {change && <Skeleton className="h-3 w-20" />}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-default group">
      {/* Icon box */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ring-4 ${palette.bg} ${palette.ring} transition-transform duration-200 group-hover:scale-110`}
      >
        <span className={`text-xl ${palette.icon}`}>
          {icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide truncate">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5 leading-none">{value}</p>
        {change && (
          <p className={`text-xs mt-1 font-medium ${
            String(change).startsWith('+') || String(change).startsWith('↑')
              ? 'text-emerald-500'
              : 'text-slate-400'
          }`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
