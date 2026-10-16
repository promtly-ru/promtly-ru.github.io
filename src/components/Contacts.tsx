import { Mail, MessageCircle, Send } from 'lucide-react'
import { contacts } from '../data/content'

const items = [
  { ...contacts.telegram, Icon: Send, external: true },
  { ...contacts.whatsapp, Icon: MessageCircle, external: true },
  { ...contacts.email, Icon: Mail, external: false },
]

export function Contacts() {
  return (
    <section className="section" id="contacts">
      <div className="container">
        <h2>Контакты</h2>
        <p className="section-lead">Напишите, где вам удобнее — отвечу в течение дня.</p>
        <div className="grid">
          {items.map(({ label, value, url, Icon, external }) => (
            <a
              className="card contact"
              key={label}
              href={url}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
              <span>
                <strong>{label}</strong>
                <span className="contact-value">{value}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
