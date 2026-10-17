import { useEffect, useRef, useState } from 'react'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { profile } from '../data/content'
import type { Theme } from '../hooks/useTheme'
import { confetti, toast } from '../lib/fx'
import { InstallButton } from './InstallButton'

type Props = { theme: Theme; onToggleTheme: () => void }

const links = [
  { id: 'services', label: 'Услуги' },
  { id: 'works', label: 'Работы' },
  { id: 'brief', label: 'Заявка' },
  { id: 'faq', label: 'Вопросы' },
  { id: 'smartcalc', label: 'SmartCalc' },
  { id: 'terminal', label: 'Терминал' },
  { id: 'contacts', label: 'Контакты' },
]

export function Header({ theme, onToggleTheme }: Props) {
  const next = theme === 'dark' ? 'светлую' : 'тёмную'
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const clicks = useRef<number[]>([])
  const menuBtn = useRef<HTMLButtonElement>(null)

  // Подсветка пункта меню того раздела, который сейчас в середине экрана
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const l of links) {
      const el = document.getElementById(l.id)
      if (el) io.observe(el)
    }
    const top = document.getElementById('top')
    if (top) io.observe(top)
    return () => io.disconnect()
  }, [])

  // Мобильное меню закрывается по Escape (фокус возвращается на бургер) и при расширении окна до десктопа
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      menuBtn.current?.focus()
    }
    const wide = matchMedia('(min-width: 801px)')
    const onWide = () => wide.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  // Пасхалка: 5 быстрых кликов по логотипу
  const onLogo = () => {
    const now = Date.now()
    clicks.current = [...clicks.current.filter((t) => now - t < 2000), now]
    if (clicks.current.length >= 5) {
      clicks.current = []
      confetti()
      toast('Вы нашли пасхалку! Вот вам немного праздника 🎉')
    }
  }

  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label={`${profile.name} — наверх`} onClick={onLogo}>
          <span className="logo-mark" aria-hidden="true">P</span>
          <span className="logo-text">{profile.name}</span>
        </a>
        <nav className="nav" id="site-nav" aria-label="Разделы">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
              {l.id === 'faq' && <span className="badge-new" aria-hidden="true">new</span>}
            </a>
          ))}
        </nav>
        <InstallButton />
        <button
          className="icon-btn palette-btn"
          onClick={() => window.dispatchEvent(new Event('promptly:palette'))}
          aria-label="Открыть палитру команд (Ctrl+K)"
          title="Палитра команд (Ctrl+K)"
        >
          <Search size={18} aria-hidden="true" />
          <span className="palette-kbd" aria-hidden="true">Ctrl K</span>
        </button>
        <button className="icon-btn theme-btn" onClick={onToggleTheme} aria-label={`Включить ${next} тему`} title={`Включить ${next} тему`}>
          {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <button
          ref={menuBtn}
          className="icon-btn menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
