import { useEffect, useMemo, useRef, useState } from 'react'
import { Command, CornerDownLeft, Search } from 'lucide-react'
import { contacts } from '../data/content'
import type { Theme } from '../hooks/useTheme'
import { toast } from '../lib/fx'

type Props = { theme: Theme; onToggleTheme: () => void }
type Action = { id: string; label: string; hint: string; run: () => void }

const sections: [string, string][] = [
  ['services', 'Услуги'],
  ['works', 'Работы'],
  ['brief', 'Заявка'],
  ['faq', 'Вопросы'],
  ['smartcalc', 'SmartCalc'],
  ['terminal', 'Терминал'],
  ['contacts', 'Контакты'],
]

// Палитра команд: Ctrl/Cmd+K открывает быстрый переход по сайту и действия
export function CommandPalette({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const opener = useRef<HTMLElement | null>(null)

  const close = () => {
    setOpen(false)
    opener.current?.focus()
  }

  const actions = useMemo<Action[]>(() => {
    const copy = (value: string) => async () => {
      try {
        await navigator.clipboard.writeText(value)
        toast(`Скопировано: ${value}`)
      } catch {
        toast(value)
      }
    }
    return [
      ...sections.map(([id, label]) => ({
        id: `go-${id}`,
        label: `Перейти: ${label}`,
        hint: '#' + id,
        run: () => {
          const el = document.getElementById(id)
          el?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
          history.replaceState(null, '', `#${id}`)
        },
      })),
      {
        id: 'theme',
        label: `Включить ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`,
        hint: 'тема',
        run: onToggleTheme,
      },
      { id: 'copy-tg', label: `Скопировать Telegram`, hint: contacts.telegram.value, run: copy(contacts.telegram.value) },
      { id: 'copy-mail', label: `Скопировать email`, hint: contacts.email.value, run: copy(contacts.email.value) },
      { id: 'copy-wa', label: `Скопировать WhatsApp`, hint: contacts.whatsapp.value, run: copy(contacts.whatsapp.value) },
      { id: 'open-tg', label: 'Написать в Telegram', hint: 'открыть чат', run: () => window.open(contacts.telegram.url, '_blank', 'noopener') },
    ]
  }, [theme, onToggleTheme])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? actions.filter((a) => (a.label + ' ' + a.hint).toLowerCase().includes(q)) : actions
  }, [actions, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        opener.current = document.activeElement as HTMLElement | null
        setOpen((o) => !o)
        setQuery('')
        setIndex(0)
      }
    }
    const onOpen = () => {
      opener.current = document.activeElement as HTMLElement | null
      setOpen(true)
      setQuery('')
      setIndex(0)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('promptly:palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('promptly:palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  if (!open) return null

  const run = (a: Action | undefined) => {
    if (!a) return
    setOpen(false)
    a.run()
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (shown.length ? (i + 1) % shown.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (shown.length ? (i - 1 + shown.length) % shown.length : 0))
    } else if (e.key === 'Enter') run(shown[index])
  }

  return (
    <div className="palette-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Палитра команд">
        <label className="palette-search">
          <Search size={18} aria-hidden="true" />
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIndex(0)
            }}
            onKeyDown={onInputKey}
            placeholder="Куда перейти или что сделать?"
            aria-label="Поиск команды"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={shown[index] ? `pal-${shown[index].id}` : undefined}
          />
          <kbd>Esc</kbd>
        </label>
        <ul className="palette-list" id="palette-list" role="listbox">
          {shown.map((a, i) => (
            <li
              key={a.id}
              id={`pal-${a.id}`}
              role="option"
              aria-selected={i === index}
              className={i === index ? 'is-active' : undefined}
              onMouseMove={() => setIndex(i)}
              onClick={() => run(a)}
            >
              <span>{a.label}</span>
              <small>{a.hint}</small>
            </li>
          ))}
          {!shown.length && <li className="palette-empty">Ничего не найдено</li>}
        </ul>
        <p className="palette-foot">
          <Command size={13} aria-hidden="true" />K — открыть · ↑↓ — выбрать · <CornerDownLeft size={13} aria-hidden="true" /> — выполнить
        </p>
      </div>
    </div>
  )
}
