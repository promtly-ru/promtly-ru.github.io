import { profile } from '../data/content'

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#top">
          <span className="logo-mark" aria-hidden="true">P</span>
          {profile.name}
        </a>
        <nav className="nav" aria-label="Разделы">
          <a href="#services">Услуги</a>
          <a href="#smartcalc">SmartCalc</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </div>
    </header>
  )
}
