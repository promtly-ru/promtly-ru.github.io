import type { CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { faq } from '../data/content'
import { Scramble } from './Scramble'

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 data-reveal><Scramble text="Вопросы" /></h2>
        <p className="section-lead" data-reveal>Коротко о том, что обычно спрашивают перед началом.</p>
        <div className="faq">
          {faq.map((f, i) => (
            <details className="faq-item" key={f.q} data-reveal style={{ '--d': `${i * 80}ms` } as CSSProperties}>
              <summary>
                {f.q}
                <ChevronDown size={18} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
