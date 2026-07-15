import clsx from 'clsx'
import { getStatusColor } from '../../utils/helpers'

export default function StatusBadge({ status, className }) {
  if (!status) return null
  return (
    <span className={clsx('badge capitalize', getStatusColor(status), className)}>
      {status}
    </span>
  )
}
