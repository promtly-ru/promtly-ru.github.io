import { Moon, Sun } from 'lucide-react'
import { profile } from '../data/content'
import type { Theme } from '../hooks/useTheme'

type Props = { theme: Theme; onToggleTheme: () => void }

export function Header({ theme, onToggleTheme }: Props) {
  const next = theme === 'dark' ? 'светлую' : 'тёмную'
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#top" aria-label={`${profile.name} — наверх`}>
          <span className="logo-mark" aria-hidden="true">P</span>
          <span className="logo-text">{profile.name}</span>
        </a>
        <nav className="nav" aria-label="Разделы">
          <a href="#services">Услуги</a>
          <a href="#smartcalc">SmartCalc</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <button className="icon-btn theme-btn" onClick={onToggleTheme} aria-label={`Включить ${next} тему`} title={`Включить ${next} тему`}>
          {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
