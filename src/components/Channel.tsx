import { Check, Send } from 'lucide-react'
import { channel } from '../data/content'
import { spotlight } from '../hooks/usePageEffects'
import { Scramble } from './Scramble'

export function Channel() {
  return (
    <section className="section" id="channel">
      <div className="container">
        <div className="card card-spot channel" data-reveal onPointerMove={spotlight}>
          <div>
            <p className="eyebrow">Telegram-канал</p>
            <h2><Scramble text="Следите за новым" /></h2>
            <p className="section-lead">{channel.text}</p>
            <ul className="checklist">
              {channel.points.map((p) => (
                <li key={p}><Check size={16} aria-hidden="true" />{p}</li>
              ))}
            </ul>
          </div>
          <a className="btn btn-primary btn-shine magnetic" href={channel.url} target="_blank" rel="noopener noreferrer">
            <Send size={18} aria-hidden="true" /> Подписаться на канал
          </a>
        </div>
      </div>
    </section>
  )
}
