import { useState } from 'react'
import { Sparkle } from 'lucide-react'
import { marquee } from '../data/content'

// Бесконечная лента: список повторён дважды, анимация сдвигает ровно на половину.
// Пауза — наведением мыши или тапом/кликом (на телефоне наведения нет).
export function Marquee() {
  const [paused, setPaused] = useState(false)

  const row = (hidden: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {marquee.map((item) => (
        <li key={item}>
          {item}
          <Sparkle size={14} aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`marquee${paused ? ' is-paused' : ''}`}
      role="group"
      aria-label="Что я делаю"
      onClick={() => setPaused((p) => !p)}
    >
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
