import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/usePageEffects'

const CHARS = '<>/{}[]=+*#%&01'

// Текст «расшифровывается» из случайных символов, когда появляется на экране
export function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - start) / 800, 1)
        const done = Math.floor(text.length * p)
        setShown(text.slice(0, done) + text.slice(done).replace(/\S/g, () => CHARS[(Math.random() * CHARS.length) | 0]))
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [text])

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">{shown}</span>
    </>
  )
}
