import { useEffect } from 'react'

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return undefined
    const timeout = window.setTimeout(onDismiss, 3000)
    return () => window.clearTimeout(timeout)
  }, [message, onDismiss])

  return <div className="toast" role="status" aria-live="polite">{message}</div>
}
