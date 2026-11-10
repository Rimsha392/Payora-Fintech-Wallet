const withCommas = (n, decimals) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

/** Rs. 245,800.00 */
export const formatMoney = (n) => `Rs. ${withCommas(Math.abs(n), 2)}`

/** Rs. 5,000 — drops decimals when the amount is whole. */
export const formatMoneyCompact = (n) =>
  `Rs. ${withCommas(Math.abs(n), Number.isInteger(n) ? 0 : 2)}`

/** "+ Rs. 45,000.00" / "– Rs. 2,850.00" */
export const formatSigned = (n) => `${n < 0 ? '–' : '+'} ${formatMoney(n)}`

const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const shortDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export const formatTime = (d) =>
  d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

/** "Oct 24, 11:30 AM" */
export const formatDateTime = (d) => `${shortDate(d)}, ${formatTime(d)}`

/** Group heading: "Today · Oct 24", "Yesterday · Oct 23" or "Oct 22". */
export const dayLabel = (d) => {
  const now = new Date()
  const yesterday = new Date()
  yesterday.setDate(now.getDate() - 1)
  if (sameDay(d, now)) return `Today · ${shortDate(d)}`
  if (sameDay(d, yesterday)) return `Yesterday · ${shortDate(d)}`
  return shortDate(d)
}

export const greeting = (d = new Date()) => {
  const h = d.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

/** DEMO-PAY-1024-05000 → month/day plus the amount padded to 5 digits. */
export const makeReference = (date, amount) => {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const amt = String(Math.round(amount)).padStart(5, '0')
  return `DEMO-PAY-${mm}${dd}-${amt}`
}

/* ---------- Amount input helpers ---------- */

/** Turns whatever was typed into "12,345.67" (max 9 whole digits, 2 decimals). */
export const formatAmountInput = (raw) => {
  const cleaned = raw.replace(/[^\d.]/g, '')
  if (!cleaned) return ''
  const [intPart, ...rest] = cleaned.split('.')
  const hasDot = rest.length > 0
  const decimals = rest.join('').slice(0, 2)
  const whole = intPart.replace(/^0+(?=\d)/, '').slice(0, 9)
  const wholeFormatted = whole ? Number(whole).toLocaleString('en-US') : hasDot ? '0' : ''
  return hasDot ? `${wholeFormatted}.${decimals}` : wholeFormatted
}

export const parseAmount = (text) => {
  const n = parseFloat(text.replace(/,/g, ''))
  return Number.isFinite(n) ? n : 0
}

/* ---------- Recipient helpers ---------- */

const digitsOnly = (s) => s.replace(/[\s\-()]/g, '')

/** Accepts 03XXXXXXXXX, 3XXXXXXXXX, +923XXXXXXXXX and 00923XXXXXXXXX. */
export const isValidPhone = (s) => /^(?:\+?92|0092|0)?3\d{9}$/.test(digitsOnly(s))

/** Normalises any accepted phone format to 03XX-XXXXXXX. */
export const formatPhone = (s) => {
  const d = digitsOnly(s).replace(/^(?:\+?92|0092|0)/, '')
  return `0${d.slice(0, 3)}-${d.slice(3)}`
}
