import { useState } from 'react'
import Header from '../components/Header'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import TransactionItem from '../components/TransactionItem'
import { greeting, formatMoney } from '../utils/format'
import { USER } from '../data/sampleData'
import './HomeScreen.css'

export default function HomeScreen({
  balance,
  transactions,
  onSend,
  onReceive,
  onNavigate,
  onProfile,
  onUnavailable,
}) {
  const [hidden, setHidden] = useState(false)
  const recent = transactions.slice(0, 3)

  return (
    <div className="screen">
      <div className="screen__body home">
        <Header title="Payora" onProfile={onProfile} />

        <div className="home__greeting">
          <p className="home__hello">
            {greeting()}, {USER.firstName}!
          </p>
          <p className="home__sub muted">Here’s your financial overview.</p>
        </div>

        <section className="balance-card" aria-label="Wallet balance">
          <div className="balance-card__row">
            <p className="balance-card__label">Total Balance</p>
            <button
              type="button"
              className="balance-card__toggle"
              onClick={() => setHidden((h) => !h)}
              aria-pressed={hidden}
              aria-label={hidden ? 'Show balance' : 'Hide balance'}
            >
              <Icon name={hidden ? 'eyeOff' : 'eye'} size={20} />
            </button>
          </div>
          <p className="balance-card__amount display">{hidden ? 'Rs. ••••••' : formatMoney(balance)}</p>
        </section>

        <div className="home__actions">
          <button type="button" className="action card" onClick={onSend}>
            <Icon name="send" size={24} />
            <span>Send Money</span>
          </button>
          <button type="button" className="action card" onClick={onReceive}>
            <Icon name="download" size={24} />
            <span>Receive Money</span>
          </button>
        </div>

        <section aria-labelledby="recent-heading">
          <h2 id="recent-heading" className="home__section-title display">
            Recent Transactions
          </h2>
          <ul className="tx-list">
            {recent.map((t) => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </ul>
        </section>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} onUnavailable={onUnavailable} />
    </div>
  )
}
