import { ArrowUp, Download, Share2 } from 'lucide-react'
import { shareSite } from '../lib/fx'
import { contacts, profile, smartcalc } from '../data/content'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="logo" href="#top">
            <span className="logo-mark" aria-hidden="true">P</span>
            {profile.name}
          </a>
          <p>{profile.footer}</p>
          <p className="muted">Цены обсуждаются лично — напишите, и обсудим вашу задачу.</p>
        </div>

        <nav className="footer-col" aria-label="Разделы сайта">
          <h3>Разделы</h3>
          <a href="#services">Услуги</a>
          <a href="#services">Как работаю</a>
          <a href="#brief">Собрать заявку</a>
          <a href="#faq">Вопросы</a>
          <a href="#smartcalc">SmartCalc</a>
          <a href="#terminal">Терминал</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <div className="footer-col">
          <h3>Связаться</h3>
          <a href={contacts.telegram.url} target="_blank" rel="noopener noreferrer">Telegram · {contacts.telegram.value}</a>
          <a href={contacts.whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp · {contacts.whatsapp.value}</a>
          <a href={contacts.email.url}>{contacts.email.value}</a>
        </div>

        <div className="footer-col">
          <h3>{smartcalc.name}</h3>
          <a href="#smartcalc">
            <Download size={14} aria-hidden="true" /> Скачать v{smartcalc.version}
          </a>
          <a href={smartcalc.webAppUrl} target="_blank" rel="noopener noreferrer">Веб-версия</a>
          <a href={smartcalc.releasesUrl} target="_blank" rel="noopener noreferrer">Все версии на GitHub</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} {profile.name}. Все права защищены.</span>
        <button type="button" className="footer-top footer-share" onClick={shareSite}>
          <Share2 size={14} aria-hidden="true" /> Поделиться сайтом
        </button>
        <a href="#top" className="footer-top">
          Наверх <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
