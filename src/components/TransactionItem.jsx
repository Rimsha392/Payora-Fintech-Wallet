import Icon from './Icon'
import { formatDateTime, formatSigned } from '../utils/format'
import './TransactionItem.css'

/** One row in a transaction list (icon, title, date/time and signed amount). */
export default function TransactionItem({ transaction }) {
  const { title, amount, icon, date } = transaction

  return (
    <li className="tx card">
      <span className="icon-badge">
        <Icon name={icon} size={20} />
      </span>
      <div className="tx__info">
        <p className="tx__title">{title}</p>
        <p className="tx__date muted">{formatDateTime(date)}</p>
      </div>
      <p className={`tx__amount${amount > 0 ? ' tx__amount--in' : ''}`}>{formatSigned(amount)}</p>
    </li>
  )
}
