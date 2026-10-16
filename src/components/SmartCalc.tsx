import { useState, type PointerEvent } from 'react'
import { Check, Download, ExternalLink, Info } from 'lucide-react'
import { smartcalc, type Platform } from '../data/content'
import type { Theme } from '../hooks/useTheme'

const AUTOPLAY_MS = 4000

// Платформа посетителя — чтобы сразу показать нужную кнопку
function detectPlatform(): Platform {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return 'android'
  // iPadOS притворяется Mac, но у него есть сенсорный экран
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 0)) return 'ios'
  if (/macintosh|mac os x/i.test(ua)) return 'mac'
  if (/windows/i.test(ua)) return 'windows'
  return 'web'
}

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
  const [platformId, setPlatformId] = useState<Platform>(detectPlatform)
  const mode = modes[index]
  const platform = smartcalc.platforms.find((p) => p.id === platformId) ?? smartcalc.platforms[0]

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

          <div className="download" data-reveal>
            <div className="platforms" role="tablist" aria-label="Платформа">
              {smartcalc.platforms.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={p.id === platform.id}
                  aria-controls="download-panel"
                  className="platform"
                  onClick={() => setPlatformId(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div id="download-panel" role="tabpanel" key={platform.id} className="download-panel">
              <div className="actions">
                {platform.downloads.map((d, i) => {
                  const isWeb = d.url === smartcalc.webAppUrl
                  return (
                    <a
                      key={d.url}
                      className={`btn ${i === 0 ? 'btn-primary btn-shine' : 'btn-ghost'} btn-dl`}
                      href={d.url}
                      {...(isWeb ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      {isWeb ? <ExternalLink size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}
                      <span>
                        {d.label}
                        <small>{d.hint}</small>
                      </span>
                    </a>
                  )
                })}
              </div>
              <p className="muted">
                Версия {smartcalc.version} · {platform.requirements} ·{' '}
                <a href={smartcalc.releasesUrl} target="_blank" rel="noreferrer">все версии</a>
              </p>
              <p className="note">
                <Info size={16} aria-hidden="true" />
                {platform.note}
              </p>
            </div>
          </div>
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
