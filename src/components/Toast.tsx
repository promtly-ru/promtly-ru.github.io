import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

// Слушает событие promptly:toast (см. lib/fx.ts) и показывает сообщение на 3 секунды.
// id — чтобы повторный одинаковый тост перезапускал таймер; текст не стираем, пока плашка уезжает.
export function Toast() {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail
      setMsg((m) => ({ id: (m?.id ?? 0) + 1, text }))
      setShown(true)
    }
    window.addEventListener('promptly:toast', onToast)
    return () => window.removeEventListener('promptly:toast', onToast)
  }, [])

  useEffect(() => {
    if (!msg) return
    const t = window.setTimeout(() => setShown(false), 3000)
    return () => window.clearTimeout(t)
  }, [msg])

  return (
    <div className={`toast${shown ? ' is-shown' : ''}`} role="status" aria-live="polite">
      {msg && <><Sparkles size={16} aria-hidden="true" /> {msg.text}</>}
    </div>
  )
}
