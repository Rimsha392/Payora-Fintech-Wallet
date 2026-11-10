// Sample data only — nothing here talks to a real bank or payment service.

export const STARTING_BALANCE = 245800
export const TRANSFER_FEE = 10

export const USER = {
  firstName: 'Alex',
  fullName: 'Alex Morgan',
  phone: '0300-1234567',
  account: 'PK00 PYRA 0000 1234 5678 90',
}

export const CONTACTS = [
  { id: 'c1', name: 'Ayesha Khan', initials: 'AK', phone: '0301-2345678' },
  { id: 'c2', name: 'Ali Ahmed', initials: 'AA', phone: '0312-3456789' },
  { id: 'c3', name: 'Sara Malik', initials: 'SM', phone: '0333-4567890' },
  { id: 'c4', name: 'Bilal Raza', initials: 'BR', phone: '0345-5678901' },
  { id: 'c5', name: 'Hira Siddiqui', initials: 'HS', phone: '0321-6789012' },
]

// Builds a Date `daysAgo` days before today at the given time, so the
// "Today" and "Yesterday" groups always look right whenever the app is opened.
const at = (daysAgo, hours, minutes) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hours, minutes, 0, 0)
  return d
}

// Newest first. `icon` maps to a name in components/Icon.jsx.
export const SEED_TRANSACTIONS = [
  { id: 't1', title: 'Grocery Store', amount: -2850, icon: 'basket', date: at(0, 11, 30) },
  { id: 't2', title: 'Online Shopping', amount: -1250, icon: 'bag', date: at(0, 10, 45) },
  { id: 't3', title: 'Coffee House', amount: -450, icon: 'coffee', date: at(0, 9, 15) },
  { id: 't4', title: 'Salary Received', amount: 45000, icon: 'briefcase', date: at(1, 16, 0) },
  { id: 't5', title: 'Money Received', amount: 5000, icon: 'arrowDownLeft', date: at(1, 12, 20) },
  { id: 't6', title: 'Electricity Bill', amount: -3480, icon: 'zap', date: at(1, 9, 0) },
  { id: 't7', title: 'Starbucks', amount: -450, icon: 'coffee', date: at(2, 14, 15) },
  { id: 't8', title: 'Amazon Store', amount: -1250, icon: 'bag', date: at(2, 11, 5) },
]
