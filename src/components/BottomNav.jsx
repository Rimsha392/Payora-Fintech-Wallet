import Icon from './Icon'
import './BottomNav.css'

const ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'transactions', label: 'Activity', icon: 'activity' },
  { id: 'cards', label: 'Cards', icon: 'card' },
  { id: 'profile', label: 'Profile', icon: 'user' },
]

/**
 * Floating bottom navigation. Only Home and Activity have designed screens;
 * the other tabs call onUnavailable so the app can tell the person politely.
 */
export default function BottomNav({ active, onNavigate, onUnavailable }) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <ul className="bottom-nav__list">
        {ITEMS.map((item) => {
          const isActive = item.id === active
          const available = item.id === 'home' || item.id === 'transactions'
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`bottom-nav__item${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => (available ? onNavigate(item.id) : onUnavailable(item.label))}
              >
                <span className="bottom-nav__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
