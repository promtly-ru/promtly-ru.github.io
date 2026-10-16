import type { CSSProperties } from 'react'
import { AppWindow, Check, Globe, Workflow } from 'lucide-react'
import { priceNote, services, steps, type ServiceIcon } from '../data/content'
import { spotlight } from '../hooks/usePageEffects'

const icons: Record<ServiceIcon, typeof Globe> = {
  web: Globe,
  automation: Workflow,
  desktop: AppWindow,
}

const delay = (i: number) => ({ '--d': `${i * 100}ms` }) as CSSProperties

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2 data-reveal>Услуги</h2>
        <p className="section-lead" data-reveal>{priceNote}</p>
        <div className="grid">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <article className="card card-spot" key={s.title} data-reveal style={delay(i)} onPointerMove={spotlight}>
                <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="checklist">
                  {s.items.map((item) => (
                    <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <h3 className="subheading" data-reveal>Как работаю</h3>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={delay(i)}>
              <span className="step-num">{i + 1}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
