import { useMemo, useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import TransactionItem from '../components/TransactionItem'
import { dayLabel } from '../utils/format'
import './TransactionsScreen.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'income', label: 'Income' },
  { id: 'expenses', label: 'Expenses' },
]

export default function TransactionsScreen({ transactions, onNavigate, onProfile, onUnavailable }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  // Filter, then group consecutive items that share a calendar day.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const visible = transactions.filter((t) => {
      if (filter === 'income' && t.amount <= 0) return false
      if (filter === 'expenses' && t.amount >= 0) return false
      return !q || t.title.toLowerCase().includes(q)
    })
    const result = []
    visible.forEach((t) => {
      const label = dayLabel(t.date)
      const last = result[result.length - 1]
      if (last && last.label === label) last.items.push(t)
      else result.push({ label, items: [t] })
    })
    return result
  }, [transactions, query, filter])

  return (
    <div className="screen">
      <div className="screen__body">
        <Header title="Transactions" onProfile={onProfile} />

        <div className="history__search">
          <label className="sr-only" htmlFor="tx-search">
            Search transactions
          </label>
          <input
            id="tx-search"
            className="field-input"
            type="search"
            placeholder="Search transactions"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="history__filters" role="group" aria-label="Filter transactions">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`pill${filter === f.id ? ' is-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {groups.length === 0 ? (
          <div className="history__empty card">
            <p className="display">No matching transactions</p>
            <p className="muted">Try a different search or switch the filter back to All.</p>
          </div>
        ) : (
          groups.map((group) => (
            <section key={group.label} className="history__group" aria-label={group.label}>
              <h2 className="history__day muted">{group.label}</h2>
              <ul className="tx-list">
                {group.items.map((t) => (
                  <TransactionItem key={t.id} transaction={t} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>

      <BottomNav active="transactions" onNavigate={onNavigate} onUnavailable={onUnavailable} />
    </div>
  )
}
