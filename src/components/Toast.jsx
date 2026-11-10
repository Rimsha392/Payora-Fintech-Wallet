import './Toast.css'

/** Small status message at the bottom of the app. Pass message=null to hide it. */
export default function Toast({ message }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {message && (
        <p className="toast" key={message}>
          {message}
        </p>
      )}
    </div>
  )
}
