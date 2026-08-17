export function formatDueDate(value) {
  return new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short' }).format(new Date(`${value}T00:00:00`))
}

export function getDueState(value, completed, today = new Date()) {
  if (!value || completed) return { label: '', className: '' }
  const due = new Date(`${value}T23:59:59`)
  if (due < today) return { label: ' · overdue', className: 'due-overdue' }
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  if (due <= tomorrow) return { label: ' · due soon', className: 'due-soon' }
  return { label: '', className: '' }
}
