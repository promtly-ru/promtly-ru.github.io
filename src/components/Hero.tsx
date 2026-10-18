import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, Download } from 'lucide-react'
import { profile, stats } from '../data/content'
import { prefersReducedMotion } from '../hooks/usePageEffects'

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

// Печатает слова по очереди: набор → пауза → стирание → следующее
function useTyped(words: string[]) {
  const [text, setText] = useState(words[0])

  useEffect(() => {
    if (prefersReducedMotion()) return
    let word = 0
    let chars = words[0].length
    let deleting = false
    let timer = 0
    const tick = () => {
      if (!deleting && chars === words[word].length) {
        deleting = true
        timer = window.setTimeout(tick, 1800)
        return
      }
      if (deleting && chars === 0) {
        deleting = false
        word = (word + 1) % words.length
        timer = window.setTimeout(tick, 250)
        return
      }
      chars += deleting ? -1 : 1
      setText(words[word].slice(0, chars))
      timer = window.setTimeout(tick, deleting ? 35 : 75)
    }
    timer = window.setTimeout(tick, 1800)
    return () => window.clearTimeout(timer)
  }, [words])

  return text
}

// Число плавно растёт от 0, когда попадает на экран
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? value : 0))

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / 1200, 1)
        setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref}>{shown}{suffix}</span>
}

import { HeroDecor } from './HeroDecor'

export function Hero() {
  const typed = useTyped(profile.headlineWords)
  const fullTitle = `Делаю ${profile.headlineWords.join(', ')} под ваши задачи`

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="hero-grid" />
      </div>
      <HeroDecor />

      <div className="container hero-inner">
        <p className="eyebrow hero-in" style={delay(0)}>Разработка под ключ</p>
        <h1 className="hero-in" style={delay(100)} aria-label={fullTitle}>
          <span aria-hidden="true">
            Делаю <span className="typed">{typed}</span>
            <span className="caret" />
            <br />
            под ваши задачи
          </span>
        </h1>
        <p className="lead hero-in" style={delay(200)}>{profile.about}</p>
        <div className="actions hero-in" style={delay(300)}>
          <a className="btn btn-primary btn-shine magnetic" href="#brief">
            Обсудить задачу <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn btn-ghost magnetic" href="#smartcalc">
            <Download size={18} aria-hidden="true" /> Скачать SmartCalc
          </a>
        </div>

        <p className="hint hero-in" style={delay(350)}>
          <button type="button" className="hint-chip" onClick={() => window.dispatchEvent(new Event('promptly:palette'))}>
            <kbd>Ctrl</kbd><kbd>K</kbd> быстрый поиск по сайту
          </button>
          <span className="hint-sep" aria-hidden="true">·</span>
          <a className="hint-chip" href="#faq">Частые вопросы</a>
          <span className="hint-sep" aria-hidden="true">·</span>
          <a className="hint-chip" href="#terminal">Попробуй терминал</a>
        </p>

        <dl className="stats hero-in" style={delay(400)}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt><CountUp value={s.value} suffix={s.suffix} /></dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
