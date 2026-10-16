import { AppWindow, Check, Globe, Workflow } from 'lucide-react'
import { priceNote, services, steps, type ServiceIcon } from '../data/content'

const icons: Record<ServiceIcon, typeof Globe> = {
  web: Globe,
  automation: Workflow,
  desktop: AppWindow,
}

export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Услуги</h2>
        <p className="section-lead">{priceNote}</p>
        <div className="grid">
          {services.map((s) => {
            const Icon = icons[s.icon]
            return (
              <article className="card" key={s.title}>
                <span className="card-icon"><Icon size={22} aria-hidden="true" /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul className="checklist">
                  {s.items.map((i) => (
                    <li key={i}><Check size={16} aria-hidden="true" />{i}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <h3 className="subheading">Как работаю</h3>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
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
