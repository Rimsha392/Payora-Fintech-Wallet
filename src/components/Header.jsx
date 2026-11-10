import Icon from './Icon'
import './Header.css'

/**
 * Top bar used on every screen.
 *  - onBack:      shows the circular back button on the left
 *  - onProfile:   shows the profile button on the right
 *  - right:       any custom node for the right side (e.g. the "Sample transfer" pill)
 */
export default function Header({ title, onBack, onProfile, right, as: Title = 'h1' }) {
  return (
    <header className="header">
      <div className="header__left">
        {onBack && (
          <button type="button" className="icon-btn" onClick={onBack} aria-label="Back to home">
            <Icon name="arrowLeft" size={20} />
          </button>
        )}
        <Title className="header__title display">{title}</Title>
      </div>
      {right ??
        (onProfile && (
          <button type="button" className="icon-btn" onClick={onProfile} aria-label="Profile">
            <Icon name="user" size={20} />
          </button>
        ))}
    </header>
  )
}
