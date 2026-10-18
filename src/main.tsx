import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// PWA: сайт можно установить и открыть без сети
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}

// Аналитика (GoatCounter): считаем клики по ссылкам и кнопкам как события
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
  const gc = (window as unknown as { goatcounter?: { count: (o: object) => void } }).goatcounter
  if (!a || !gc?.count) return
  const label = (a.getAttribute('aria-label') || a.textContent || a.href).trim().slice(0, 60)
  gc.count({ path: 'click/' + label, title: label, event: true })
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
