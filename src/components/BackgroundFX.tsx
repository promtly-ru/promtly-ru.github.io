import { useEffect, useRef } from 'react'

type Dot = { x: number; y: number; vx: number; vy: number; r: number }

// Фон страницы: плавающие точки, которые тянутся друг к другу линиями и отталкиваются от курсора.
// Цвет берётся из --accent, поэтому тема меняется сама. Пауза, когда вкладка скрыта.
export function BackgroundFX() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dots: Dot[] = []
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    let rgb = '16,192,127'

    const readColor = () => {
      const c = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      const m = /^#([0-9a-f]{6})$/i.exec(c)
      if (m) rgb = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)).join(',')
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      w = innerWidth
      h = innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.round((w * h) / 22000))
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    const LINK = 130
    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 120 && dist > 0) {
          d.x += (dx / dist) * 1.2
          d.y += (dy / dist) * 1.2
        }
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > w) d.vx *= -1
        if (d.y < 0 || d.y > h) d.vy *= -1
      }
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i]
        ctx.fillStyle = `rgba(${rgb},0.55)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, 6.283)
        ctx.fill()
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${rgb},${(1 - d / LINK) * 0.28})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(frame)
    }

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(frame)
    }

    readColor()
    resize()
    raf = requestAnimationFrame(frame)
    const theme = new MutationObserver(readColor)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    addEventListener('resize', resize)
    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      theme.disconnect()
      removeEventListener('resize', resize)
      removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="bg-fx" aria-hidden="true" />
}
