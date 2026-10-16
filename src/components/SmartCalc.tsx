import { useState, type PointerEvent } from 'react'
import { Check, Download, ShieldAlert } from 'lucide-react'
import { smartcalc } from '../data/content'
import type { Theme } from '../hooks/useTheme'

const AUTOPLAY_MS = 4000

// Наклон скриншота за курсором: задаёт --rx/--ry для CSS
function tilt(e: PointerEvent<HTMLDivElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
  e.currentTarget.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
}

function resetTilt(e: PointerEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

export function SmartCalc({ theme }: { theme: Theme }) {
  const { modes } = smartcalc
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const mode = modes[index]

  // Автосмена режимов: полоска прогресса на активной вкладке — CSS-анимация,
  // по её окончании переключаемся. На паузе (наведение/фокус) анимация стоит.
  const next = () => setIndex((i) => (i + 1) % modes.length)

  return (
    <section className="section section-alt" id="smartcalc">
      <div
        className="container calc"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="calc-text">
          <p className="eyebrow" data-reveal>Мой продукт</p>
          <h2 className="calc-title" data-reveal>
            <img
              className="calc-icon"
              src={`/img/smartcalc-icon-${theme}.svg`}
              alt=""
              width={52}
              height={52}
            />
            {smartcalc.name}
          </h2>
          <p className="lead" data-reveal>{smartcalc.text}</p>

          <div className="tabs" role="tablist" aria-label="Режимы SmartCalc" data-reveal>
            {modes.map((m, i) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={i === index}
                aria-controls="calc-shot"
                className="tab"
                onClick={() => setIndex(i)}
              >
                {m.label}
                {i === index && (
                  <span
                    key={index}
                    className={`tab-progress${paused ? ' is-paused' : ''}`}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    onAnimationEnd={next}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
          <p className="mode-text" aria-live="polite" key={mode.id}>{mode.text}</p>

          <ul className="checklist" data-reveal>
            {smartcalc.features.map((f) => (
              <li key={f}><Check size={16} aria-hidden="true" />{f}</li>
            ))}
          </ul>

          <div className="actions" data-reveal>
            <a className="btn btn-primary btn-shine" href={smartcalc.download.url}>
              <Download size={18} aria-hidden="true" />
              {smartcalc.download.label}
            </a>
            <a className="btn btn-ghost" href={smartcalc.releasesUrl} target="_blank" rel="noreferrer">
              Все версии
            </a>
          </div>
          <p className="muted" data-reveal>
            Версия {smartcalc.version} · {smartcalc.download.size} · {smartcalc.requirements}
          </p>
          <p className="note" data-reveal>
            <ShieldAlert size={16} aria-hidden="true" />
            {smartcalc.note}
          </p>
        </div>

        <div className="calc-stage" data-reveal>
          <div className="calc-glow" aria-hidden="true" />
          <div className="calc-tilt" id="calc-shot" onPointerMove={tilt} onPointerLeave={resetTilt}>
            {modes.map((m, i) => (
              <img
                key={m.id}
                src={`/img/smartcalc-${theme}-${m.id}.png`}
                alt={i === index ? `SmartCalc, режим «${m.label}»` : ''}
                aria-hidden={i !== index}
                className={i === index ? 'is-active' : undefined}
                width={360}
                height={620}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
