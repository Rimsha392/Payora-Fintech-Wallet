import Icon from './Icon'
import './Avatar.css'

/** Initials circle used for contacts. `selected` turns it deep purple with a check badge. */
export default function Avatar({ initials, selected = false, size = 52 }) {
  return (
    <span
      className={`avatar${selected ? ' avatar--selected' : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials}
      {selected && (
        <span className="avatar__check">
          <Icon name="check" size={10} strokeWidth={3} />
        </span>
      )}
    </span>
  )
}
