import { useState } from 'react'
import { Check, Copy, Mail, MessageCircle, Send } from 'lucide-react'
import { brief, contacts } from '../data/content'
import { confetti, toast } from '../lib/fx'
import { Scramble } from './Scramble'

type ChipProps = { label: string; active: boolean; onClick: () => void }

function Chip({ label, active, onClick }: ChipProps) {
  return (
    <button type="button" className="chip" aria-pressed={active} onClick={onClick}>
      {active && <Check size={14} aria-hidden="true" />}
      {label}
    </button>
  )
}

// Конструктор заявки: посетитель отмечает, что нужно, и отправляет готовый текст в удобный мессенджер
export function Brief() {
  const [type, setType] = useState<string | null>(null)
  const [extras, setExtras] = useState<string[]>([])
  const [deadline, setDeadline] = useState<string | null>(null)
  const [details, setDetails] = useState('')

  const lines = ['Здравствуйте! Хочу обсудить задачу.']
  if (type) lines.push(`Что нужно: ${type}`)
  if (extras.length) lines.push(`Важно: ${extras.join(', ')}`)
  if (deadline) lines.push(`Сроки: ${deadline}`)
  if (details.trim()) lines.push(`Подробнее: ${details.trim()}`)
  const message = lines.join('\n')
  const percent = [type, extras.length, deadline, details.trim()].filter(Boolean).length * 25

  const toggleExtra = (x: string) => setExtras((list) => (list.includes(x) ? list.filter((i) => i !== x) : [...list, x]))

  const copy = async (silent = false) => {
    try {
      await navigator.clipboard.writeText(message)
      if (!silent) toast('Текст заявки скопирован')
      return true
    } catch {
      if (!silent) toast('Не получилось скопировать — выделите текст вручную')
      return false
    }
  }

  const sent = () => {
    if (percent >= 50) confetti()
  }

  const enc = encodeURIComponent
  const telegram = `${contacts.telegram.url}?text=${enc(message)}`
  const whatsapp =`${contacts.whatsapp.url}?text=${enc(message)}`
  // В mailto переводы строк по стандарту — CRLF, иначе часть почтовых клиентов склеит строки
  const email = `${contacts.email.url}?subject=${enc(`Заявка: ${type ?? 'новая задача'}`)}&body=${enc(message.replace(/\n/g, '\r\n'))}`

  return (
    <section className="section" id="brief">
      <div className="container">
        <h2 data-reveal><Scramble text="Соберите заявку" /></h2>
        <p className="section-lead" data-reveal>
          Отметьте, что нужно, — сообщение сложится само. Останется отправить его туда, где вам удобнее.
        </p>

        <div className="brief" data-reveal>
          <div className="brief-form">
            <fieldset>
              <legend>Что нужно сделать?</legend>
              <div className="chips">
                {brief.types.map((t) => (
                  <Chip key={t} label={t} active={type === t} onClick={() => setType(type === t ? null : t)} />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Что важно? <span className="muted">можно несколько</span></legend>
              <div className="chips">
                {brief.extras.map((x) => (
                  <Chip key={x} label={x} active={extras.includes(x)} onClick={() => toggleExtra(x)} />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Сроки</legend>
              <div className="chips">
                {brief.deadlines.map((d) => (
                  <Chip key={d} label={d} active={deadline === d} onClick={() => setDeadline(deadline === d ? null : d)} />
                ))}
              </div>
            </fieldset>

            <label className="brief-details">
              <span>Пара слов о задаче</span>
              <textarea
                rows={3}
                maxLength={600}
                placeholder="Например: нужен бот для записи клиентов в салон"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </label>
          </div>

          <div className="brief-preview">
            <div className="brief-meter">
              <span id="brief-meter-label">Заявка готова на {percent}%</span>
              <div className="meter" role="progressbar" aria-labelledby="brief-meter-label" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
                <i style={{ width: `${percent}%` }} />
              </div>
            </div>

            <div className="bubble">
              <div>
                {lines.map((l, i) => <p key={i}>{l}</p>)}
              </div>
              <button type="button" className="icon-btn brief-copy" onClick={() => copy()} aria-label="Скопировать текст заявки" title="Скопировать">
                <Copy size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="brief-send">
              <a
                className="btn btn-primary btn-shine btn-tg-main magnetic"
                href={telegram}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  // Текст подставляется ссылкой, а копия в буфере — запасной вариант, если клиент его не принял
                  copy(true).then((ok) => ok && toast('Заявка скопирована — если она не появилась в чате, вставьте её'))
                  sent()
                }}
              >
                <Send size={20} aria-hidden="true" /> Отправить в Telegram
              </a>
              <a className="btn btn-ghost magnetic" href={whatsapp} target="_blank" rel="noreferrer" onClick={sent}>
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
              <a className="btn btn-ghost magnetic" href={email} onClick={sent}>
                <Mail size={18} aria-hidden="true" /> Почта
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
