import { useState } from 'react'
import Header from '../components/Header'
import Icon from '../components/Icon'
import Sheet from '../components/Sheet'
import { formatDateTime, formatMoney, formatMoneyCompact } from '../utils/format'
import './TransferSuccessScreen.css'

export default function TransferSuccessScreen({ transfer, onDone }) {
  const [showReceipt, setShowReceipt] = useState(false)
  const { recipient, amount, fee, total, note, reference, date } = transfer

  return (
    <div className="screen success">
      <Header title="Payora" as="p" right={<span className="success__tag">Sample transfer</span>} />

      <div className="success__hero">
        <div className="success__check">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" pathLength="1" />
          </svg>
        </div>
        <h1 className="success__title display">Transfer Successful</h1>
        <p className="success__sub muted">Your money has been sent successfully.</p>
      </div>

      <section className="success__card card" aria-label="Transfer details">
        <p className="success__amount display">{formatMoneyCompact(amount)}</p>
        <p className="success__to">to {recipient.name}</p>
        <hr className="success__divider" />
        <p className="success__ref-label muted">Transaction reference · Sample</p>
        <p className="success__ref">{reference}</p>
      </section>

      <div className="success__actions">
        <button type="button" className="btn" onClick={onDone}>
          Done
        </button>
        <button type="button" className="link-btn" onClick={() => setShowReceipt(true)}>
          View Receipt
        </button>
      </div>

      {showReceipt && (
        <Sheet title="Receipt" onClose={() => setShowReceipt(false)}>
          <dl className="sheet__rows">
            <div className="sheet__row">
              <dt>Status</dt>
              <dd>Completed (sample)</dd>
            </div>
            <div className="sheet__row">
              <dt>To</dt>
              <dd>
                {recipient.name}
                {recipient.id !== 'custom' && <span className="muted"> · {recipient.phone}</span>}
              </dd>
            </div>
            <div className="sheet__row">
              <dt>Date</dt>
              <dd>{formatDateTime(date)}</dd>
            </div>
            {note && (
              <div className="sheet__row">
                <dt>Note</dt>
                <dd>{note}</dd>
              </div>
            )}
            <div className="sheet__row">
              <dt>Transfer amount</dt>
              <dd>{formatMoney(amount)}</dd>
            </div>
            <div className="sheet__row">
              <dt>Transfer fee</dt>
              <dd>{formatMoney(fee)}</dd>
            </div>
            <div className="sheet__row sheet__row--total">
              <dt>Total paid</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
            <div className="sheet__row">
              <dt>Reference</dt>
              <dd>{reference}</dd>
            </div>
          </dl>
          <p className="sheet__note muted">
            <Icon name="lock" size={12} /> This is a sample receipt. No real money was moved.
          </p>
          <button type="button" className="btn" onClick={() => setShowReceipt(false)}>
            Close receipt
          </button>
        </Sheet>
      )}
    </div>
  )
}
