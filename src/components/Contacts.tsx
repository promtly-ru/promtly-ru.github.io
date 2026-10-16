import { useEffect, useState, type CSSProperties } from 'react'
import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { contacts } from '../data/content'
import { spotlight } from '../hooks/usePageEffects'

const items = [
  { ...contacts.telegram, Icon: Send, external: true },
  { ...contacts.whatsapp, Icon: MessageCircle, external: true },
  { ...contacts.email, Icon: Mail, external: false },
]

export function Contacts() {
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(null), 2000)
    return () => window.clearTimeout(t)
  }, [copied])

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
    } catch {
      // буфер обмена недоступен (http или запрет браузера) — просто ничего не делаем
    }
  }

  return (
    <section className="section" id="contacts">
      <div className="container">
        <h2 data-reveal>Контакты</h2>
        <p className="section-lead" data-reveal>Напишите, где вам удобнее — отвечу в течение дня.</p>
        <div className="grid">
          {items.map(({ label, value, url, Icon, external }, i) => (
            <div
              className="card card-spot contact"
              key={label}
              data-reveal
              style={{ '--d': `${i * 100}ms` } as CSSProperties}
              onPointerMove={spotlight}
            >
              <a className="contact-link" href={url} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
                <span>
                  <strong>{label}</strong>
                  <span className="contact-value">{value}</span>
                </span>
              </a>
              <button
                className="icon-btn copy-btn"
                onClick={() => copy(value)}
                aria-label={`Скопировать ${label}: ${value}`}
                title="Скопировать"
              >
                {copied === value ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={`toast${copied ? ' is-shown' : ''}`} role="status" aria-live="polite">
        {copied && <><Check size={16} aria-hidden="true" /> Скопировано: {copied}</>}
      </div>
    </section>
  )
}
