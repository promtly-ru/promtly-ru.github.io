import { useEffect, useState, type CSSProperties } from 'react'
import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { contacts } from '../data/content'
import { spotlight } from '../hooks/usePageEffects'
import { Scramble } from './Scramble'

const items = [
  { ...contacts.telegram, Icon: Send, external: true, main: true },
  { ...contacts.whatsapp, Icon: MessageCircle, external: true, main: false },
  { ...contacts.email, Icon: Mail, external: false, main: false },
]

// Время в Москве: показывает, день сейчас у меня или ночь
function moscowNow() {
  const now = new Date()
  const time = now.toLocaleTimeString('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit' })
  const hour = Number(new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: 'numeric', hourCycle: 'h23' }).format(now))
  return { time, day: hour >= 9 && hour < 22 }
}

function MoscowClock() {
  const [now, setNow] = useState(moscowNow)
  // Обновляемся ровно на границе минуты, чтобы часы не отставали
  useEffect(() => {
    let t = 0
    const tick = () => {
      setNow(moscowNow())
      t = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    }
    t = window.setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50)
    return () => window.clearTimeout(t)
  }, [])
  return (
    <p className="msk-clock" data-reveal>
      <i className={now.day ? 'is-day' : 'is-night'} aria-hidden="true" />
      <span>
        У меня сейчас <b>{now.time}</b> по Москве
        {now.day ? ' — на связи' : ' — ночь, отвечу утром'}
      </span>
    </p>
  )
}

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
        <h2 data-reveal><Scramble text="Контакты" /></h2>
        <p className="section-lead" data-reveal>Напишите, где вам удобнее — отвечу в течение дня.</p>
        <MoscowClock />
        <div className="grid">
          {items.map(({ label, value, url, Icon, external, main }, i) => (
            <div
              className={`card card-spot contact${main ? ' contact-main' : ''}`}
              key={label}
              data-reveal
              style={{ '--d': `${i * 100}ms` } as CSSProperties}
              onPointerMove={spotlight}
            >
              <a className="contact-link" href={url} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="card-icon"><Icon size={main ? 28 : 22} aria-hidden="true" /></span>
                <span>
                  <strong>{label}{main && <span className="contact-tag">быстрее всего</span>}</strong>
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
