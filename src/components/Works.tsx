import type { CSSProperties } from 'react'
import { Check, ExternalLink, MessageSquare } from 'lucide-react'
import { works } from '../data/content'
import { spotlight } from '../hooks/usePageEffects'
import { Scramble } from './Scramble'

const delay = (i: number) => ({ '--d': `${i * 100}ms` }) as CSSProperties

export function Works() {
  return (
    <section className="section" id="works">
      <div className="container">
        <h2 data-reveal><Scramble text="Работы" /></h2>
        <p className="section-lead" data-reveal>Примеры того, что я делаю для клиентов. Их можно открыть и потрогать вживую.</p>

        {works.map((w, i) => (
          <article className="card card-spot work" key={w.title} data-reveal style={delay(i)} onPointerMove={spotlight}>
            <a className="work-preview" href={w.url} target="_blank" rel="noopener" aria-label={`Открыть сайт «${w.title}» в новой вкладке`}>
              <span className="work-bar" aria-hidden="true"><i /><i /><i /><span>{w.url.replace('https://', '')}</span></span>
              <span className="work-shots">
                <img src={w.images[0]} alt={w.alt} width={1280} height={800} loading="lazy" />
                {w.images[1] && <img className="work-shot-alt" src={w.images[1]} alt="" width={1280} height={800} loading="lazy" />}
              </span>
            </a>

            <div className="work-info">
              <p className="eyebrow">{w.type}</p>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <ul className="checklist">
                {w.features.map((f) => (
                  <li key={f}><Check size={16} aria-hidden="true" />{f}</li>
                ))}
              </ul>
              <ul className="work-stack" aria-label="Технологии">
                {w.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="actions">
                <a className="btn btn-primary" href={w.url} target="_blank" rel="noopener">
                  Открыть сайт <ExternalLink size={18} aria-hidden="true" />
                </a>
                <a className="btn btn-ghost" href="#brief">
                  <MessageSquare size={18} aria-hidden="true" /> Хочу похожий
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
