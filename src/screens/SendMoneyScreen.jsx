import { useState } from 'react'
import Header from '../components/Header'
import Avatar from '../components/Avatar'
import Icon from '../components/Icon'
import { CONTACTS, TRANSFER_FEE } from '../data/sampleData'
import {
  formatAmountInput,
  formatMoney,
  formatPhone,
  isValidPhone,
  parseAmount,
} from '../utils/format'
import './SendMoneyScreen.css'

const NOTE_LIMIT = 60

export default function SendMoneyScreen({ balance, onBack, onSubmit }) {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [amountText, setAmountText] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const trimmed = query.trim()
  const lower = trimmed.toLowerCase()

  // Contacts matching the search box (by name or phone number)
  const contacts = !lower
    ? CONTACTS
    : CONTACTS.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.phone.replace(/-/g, '').includes(lower.replace(/[\s-]/g, '')),
      )

  // A typed phone number that isn't a saved contact becomes a one-off recipient.
  const typedNumber = trimmed && isValidPhone(trimmed) ? formatPhone(trimmed) : null
  const savedMatch = typedNumber ? CONTACTS.find((c) => c.phone === typedNumber) : null
  const customRecipient =
    typedNumber && !savedMatch
      ? { id: 'custom', name: typedNumber, initials: '#', phone: typedNumber }
      : null

  const recipient =
    CONTACTS.find((c) => c.id === selectedId) ?? savedMatch ?? customRecipient ?? null

  /* ---------- Amount ---------- */
  const amount = parseAmount(amountText)
  const fee = amount > 0 ? TRANSFER_FEE : 0
  const total = amount + fee
  const maxSendable = Math.max(balance - TRANSFER_FEE, 0)

  /* ---------- Validation ---------- */
  const errors = {}
  if (!recipient) {
    errors.recipient = trimmed
      ? 'Pick a saved contact or enter a valid mobile number, like 0300-1234567.'
      : 'Choose who you’re sending money to.'
  }
  if (!amountText) {
    errors.amount = 'Enter the amount you want to send.'
  } else if (amount <= 0) {
    errors.amount = 'Amount must be more than Rs. 0.'
  } else if (total > balance) {
    errors.amount = `You can send up to ${formatMoney(maxSendable)} (the fee is included).`
  }

  const showError = (field) => submitted && errors[field]

  const handleSelect = (id) => {
    setSelectedId((current) => (current === id ? null : id))
    setQuery('')
  }

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
    setSelectedId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      // Move focus to the first field that needs attention.
      document.getElementById(errors.recipient ? 'recipient-search' : 'amount-input')?.focus()
      return
    }
    onSubmit({ recipient, amount, fee, total, note: note.trim() })
  }

  return (
    <form className="screen send" onSubmit={handleSubmit} noValidate>
      <Header title="Send Money" onBack={onBack} />

      {/* ----- Recipient ----- */}
      <section className="send__section" aria-labelledby="send-to-label">
        <label id="send-to-label" htmlFor="recipient-search" className="send__label">
          Send to
        </label>
        <input
          id="recipient-search"
          className="field-input"
          type="search"
          inputMode="search"
          placeholder="Search name or phone number"
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
          aria-invalid={Boolean(showError('recipient'))}
          aria-describedby={showError('recipient') ? 'recipient-error' : undefined}
        />

        <div className="recipients" role="group" aria-label="Contacts">
          {contacts.map((c) => {
            const selected = recipient?.id === c.id
            return (
              <button
                key={c.id}
                type="button"
                className="recipient"
                aria-pressed={selected}
                onClick={() => handleSelect(c.id)}
              >
                <Avatar initials={c.initials} selected={selected} />
                <span className="recipient__name">{c.name}</span>
              </button>
            )
          })}
          {customRecipient && (
            <button type="button" className="recipient" aria-pressed="true" onClick={() => setQuery('')}>
              <Avatar initials="#" selected />
              <span className="recipient__name">{customRecipient.name}</span>
            </button>
          )}
          {contacts.length === 0 && !customRecipient && (
            <p className="recipients__empty muted">
              No saved contact matches. Enter a full mobile number to send to someone new.
            </p>
          )}
        </div>

        {showError('recipient') && (
          <p id="recipient-error" className="send__error" role="alert">
            {errors.recipient}
          </p>
        )}
      </section>

      {/* ----- Amount ----- */}
      <section
        className={`amount-card card${showError('amount') ? ' amount-card--error' : ''}`}
        aria-labelledby="amount-label"
      >
        <label id="amount-label" htmlFor="amount-input" className="amount-card__label">
          Amount
        </label>
        <div className="amount-card__row">
          <span className="amount-card__prefix display" aria-hidden="true">
            Rs.
          </span>
          <input
            id="amount-input"
            className="amount-card__input display"
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={amountText}
            onChange={(e) => setAmountText(formatAmountInput(e.target.value))}
            autoComplete="off"
            aria-invalid={Boolean(showError('amount'))}
            aria-describedby={showError('amount') ? 'amount-error' : 'amount-balance'}
          />
          <span className="amount-card__currency">PKR</span>
        </div>
        <p id="amount-balance" className="amount-card__balance muted">
          Available balance: {formatMoney(balance)}
        </p>
        {showError('amount') && (
          <p id="amount-error" className="send__error" role="alert">
            {errors.amount}
          </p>
        )}
      </section>

      {/* ----- Note ----- */}
      <section className="send__section">
        <label htmlFor="note-input" className="send__label">
          Add a note <span className="send__optional muted">(optional)</span>
        </label>
        <input
          id="note-input"
          className="field-input"
          type="text"
          placeholder="What’s it for?"
          value={note}
          maxLength={NOTE_LIMIT}
          onChange={(e) => setNote(e.target.value)}
          autoComplete="off"
        />
      </section>

      {/* ----- Summary ----- */}
      <dl className="summary card" aria-label="Transfer summary">
        <div className="summary__row">
          <dt className="muted">Transfer amount</dt>
          <dd>{formatMoney(amount)}</dd>
        </div>
        <div className="summary__row">
          <dt className="muted">Transfer fee</dt>
          <dd>{formatMoney(fee)}</dd>
        </div>
        <div className="summary__row summary__row--total">
          <dt>Total to pay</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>

      <div className="send__footer">
        <button type="submit" className="btn">
          Review Transfer
        </button>
        <p className="send__secure muted">
          <Icon name="lock" size={13} />
          Your transfer is secure and encrypted.
        </p>
      </div>
    </form>
  )
}
