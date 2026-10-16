import { ArrowRight, Download } from 'lucide-react'
import { profile } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container">
        <p className="eyebrow">Разработка под ключ</p>
        <h1>{profile.tagline}</h1>
        <p className="lead">{profile.about}</p>
        <div className="actions">
          <a className="btn btn-primary" href="#contacts">
            Обсудить задачу <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn-ghost" href="#smartcalc">
            <Download size={18} aria-hidden="true" /> Скачать SmartCalc
          </a>
        </div>
      </div>
    </section>
  )
}
