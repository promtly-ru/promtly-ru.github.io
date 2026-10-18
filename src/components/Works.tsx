import { useState, type CSSProperties } from 'react'
import { Check, Download, ExternalLink, MessageSquare } from 'lucide-react'
import { workCategories, works, type WorkCategory } from '../data/content'
import { PlatformDownload } from './PlatformDownload'
import { spotlight } from '../hooks/usePageEffects'
import { Scramble } from './Scramble'
import { GithubPulse } from './GithubPulse'

const delay = (i: number) => ({ '--d': `${i * 100}ms` }) as CSSProperties

export function Works() {
  const [cat, setCat] = useState<WorkCategory | 'all'>('all')
  const shown = works.filter((w) => cat === 'all' || w.category === cat)
  return (
    <section className="section" id="works">
      <div className="container">
        <h2 data-reveal><Scramble text="Работы" /></h2>
        <p className="section-lead" data-reveal>Примеры того, что я делаю для клиентов. Их можно открыть и потрогать вживую.</p>

        <div className="chips work-filter" role="group" aria-label="Фильтр работ" data-reveal>
          <button type="button" className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
            Все <small>{works.length}</small>
          </button>
          {workCategories.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label} <small>{works.filter((w) => w.category === c.id).length}</small>
            </button>
          ))}
        </div>

        {shown.map((w, i) => (
          <article className={`card card-spot work work-enter${w.gallery ? ' work-tall' : ''}`} id={w.id} key={w.title} style={delay(i)} onPointerMove={spotlight}>
            <div className="work-media">
            <a className="work-preview" href={w.url} target="_blank" rel="noopener" aria-label={`${w.cta} «${w.title}» в новой вкладке`}>
              <span className="work-bar" aria-hidden="true"><i /><i /><i /><span>{w.url.replace('https://', '')}</span></span>
              <span className="work-shots">
                <img src={w.images[0]} alt={w.alt} width={1280} height={800} loading="lazy" />
                {w.images[1] && <img className="work-shot-alt" src={w.images[1]} alt="" width={1280} height={800} loading="lazy" />}
              </span>
            </a>
            {w.demo && <img className="work-demo" src={w.demo.src} alt={w.demo.alt} width={560} height={350} loading="lazy" />}
            {w.gallery && (
              <ul className="work-gallery">
                {w.gallery.map((g) => (
                  <li key={g.src}>
                    <img src={g.src} alt={g.alt} width={640} height={400} loading="lazy" />
                    <span>{g.caption}</span>
                  </li>
                ))}
              </ul>
            )}
            {w.platforms && <PlatformDownload work={w} />}
            {w.downloads && (
              <div className="work-downloads">
                <span className="muted">Скачать:</span>
                {w.downloads.map((d) => (
                  <a key={d.label} className="work-dl" href={d.url} download>
                    <Download size={16} aria-hidden="true" /> {d.label} <small>{d.hint}</small>
                  </a>
                ))}
              </div>
            )}
            </div>

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
                  {w.cta} <ExternalLink size={18} aria-hidden="true" />
                </a>
                <a className="btn btn-ghost" href="#brief">
                  <MessageSquare size={18} aria-hidden="true" /> Хочу похожий
                </a>
              </div>
            </div>
          </article>
        ))}
        <GithubPulse />
      </div>
    </section>
  )
}
