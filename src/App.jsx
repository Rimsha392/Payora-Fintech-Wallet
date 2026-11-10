import { useCallback, useEffect, useRef, useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import SendMoneyScreen from './screens/SendMoneyScreen'
import TransactionsScreen from './screens/TransactionsScreen'
import TransferSuccessScreen from './screens/TransferSuccessScreen'
import Sheet from './components/Sheet'
import Icon from './components/Icon'
import Toast from './components/Toast'
import { SEED_TRANSACTIONS, STARTING_BALANCE, USER } from './data/sampleData'
import { makeReference } from './utils/format'

export default function App() {
  // Screens: 'home' | 'send' | 'transactions' | 'success'
  const [screen, setScreen] = useState('home')
  const [balance, setBalance] = useState(STARTING_BALANCE)
  const [transactions, setTransactions] = useState(SEED_TRANSACTIONS)
  const [transfer, setTransfer] = useState(null)
  const [showReceive, setShowReceive] = useState(false)
  const [toast, setToast] = useState(null)

  const mainRef = useRef(null)
  const toastTimer = useRef(null)

  const notify = useCallback((message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  // On every screen change: scroll to the top and move focus into the new screen.
  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [screen])

  const goHome = () => setScreen('home')
  const unavailable = (name) => notify(`${name} isn’t part of this prototype yet.`)

  const handleTransfer = ({ recipient, amount, fee, total, note }) => {
    const date = new Date()
    setBalance((b) => b - total)
    setTransactions((list) => [
      {
        id: `t-${date.getTime()}`,
        title: `Sent to ${recipient.name}`,
        amount: -amount,
        icon: 'arrowUpRight',
        date,
      },
      ...list,
    ])
    setTransfer({ recipient, amount, fee, total, note, date, reference: makeReference(date, amount) })
    setScreen('success')
  }

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(USER.phone)
      notify('Phone number copied.')
    } catch {
      notify(`Your number is ${USER.phone}.`)
    }
  }

  const navigate = (id) => setScreen(id)
  const profile = () => unavailable('Profile')

  return (
    <div className="app">
      <main className="app__main" ref={mainRef} tabIndex={-1}>
        {screen === 'home' && (
          <HomeScreen
            balance={balance}
            transactions={transactions}
            onSend={() => setScreen('send')}
            onReceive={() => setShowReceive(true)}
            onNavigate={navigate}
            onProfile={profile}
            onUnavailable={unavailable}
          />
        )}

        {screen === 'send' && (
          <SendMoneyScreen balance={balance} onBack={goHome} onSubmit={handleTransfer} />
        )}

        {screen === 'transactions' && (
          <TransactionsScreen
            transactions={transactions}
            onNavigate={navigate}
            onProfile={profile}
            onUnavailable={unavailable}
          />
        )}

        {screen === 'success' && transfer && (
          <TransferSuccessScreen transfer={transfer} onDone={goHome} />
        )}
      </main>

      {showReceive && (
        <Sheet title="Receive Money" onClose={() => setShowReceive(false)}>
          <p className="muted" style={{ marginBottom: 14, fontSize: 14 }}>
            Share these sample details so someone can send you money.
          </p>
          <dl className="sheet__rows">
            <div className="sheet__row">
              <dt>Name</dt>
              <dd>{USER.fullName}</dd>
            </div>
            <div className="sheet__row">
              <dt>Mobile</dt>
              <dd>{USER.phone}</dd>
            </div>
            <div className="sheet__row">
              <dt>Account</dt>
              <dd>{USER.account}</dd>
            </div>
          </dl>
          <p className="sheet__note muted">Sample details — not a real account.</p>
          <button type="button" className="btn" onClick={copyPhone}>
            <Icon name="copy" size={18} />
            Copy mobile number
          </button>
        </Sheet>
      )}

      <Toast message={toast} />
    </div>
  )
}
