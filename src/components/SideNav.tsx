import { useEffect, useState } from 'react'

const sections = [
  { id: 'top', label: 'Начало' },
  { id: 'services', label: 'Услуги' },
  { id: 'works', label: 'Работы' },
  { id: 'channel', label: 'Канал' },
  { id: 'brief', label: 'Заявка' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'smartcalc', label: 'SmartCalc' },
  { id: 'terminal', label: 'Терминал' },
  { id: 'contacts', label: 'Контакты' },
]

// Точки справа: показывают, где вы на странице, и переносят в раздел по клику
export function SideNav() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  return (
    <nav className="side-nav" aria-label="Разделы страницы">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-label={s.label} aria-current={active === s.id || undefined}>
          <span>{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
