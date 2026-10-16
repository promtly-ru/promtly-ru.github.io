import { prefersReducedMotion } from '../hooks/usePageEffects'

// Всплывающее сообщение внизу экрана — показывает компонент <Toast />
export function toast(text: string) {
  window.dispatchEvent(new CustomEvent('promptly:toast', { detail: text }))
}

// Конфетти на canvas поверх страницы, само удаляется через ~3 секунды
export function confetti() {
  if (prefersReducedMotion()) return
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.className = 'confetti'
  document.body.append(canvas)
  ctx.scale(dpr, dpr)

  const css = getComputedStyle(document.documentElement)
  const colors = ['--accent', '--accent-2', '--blob-3'].map((v) => css.getPropertyValue(v).trim()).concat('#fbbf24', '#f472b6')
  const parts = Array.from({ length: Math.min(160, Math.round(w / 6)) }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.3,
    y: h + 10,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 12 + h / 70),
    size: Math.random() * 6 + 5,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    color: colors[(Math.random() * colors.length) | 0],
  }))

  const start = performance.now()
  const frame = (now: number) => {
    const t = now - start
    ctx.clearRect(0, 0, w, h)
    for (const p of parts) {
      p.vy += 0.32
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - t / 3000)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      ctx.restore()
    }
    if (t < 3000) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}
