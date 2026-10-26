import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { channel, contacts, presentationUrl, profile, services, smartcalc, works } from '../data/content'
import { confetti, shareSite } from '../lib/fx'
import { Scramble } from './Scramble'

type Line = { kind: 'in' | 'out' | 'err'; text: string }

const JOKES = [
  'Есть 10 типов людей: те, кто понимает двоичную систему, и те, кто нет.',
  '— Почему программисты путают Хэллоуин и Рождество?\n— Потому что 31 OCT = 25 DEC.',
  'Работает — не трогай. Не работает — пиши мне.',
  'Оптимист видит стакан наполовину полным, программист — стакан в два раза больше нужного.',
  '— Сколько программистов нужно, чтобы вкрутить лампочку?\n— Нисколько, это аппаратная проблема.',
]

const HELP = [
  'help       — список команд',
  'about      — кто я',
  'services   — чем могу помочь',
  'works      — примеры работ',
  'smartcalc  — мой калькулятор',
  'deck       — открыть презентацию',
  'contacts   — как связаться',
  'hire       — оставить заявку',
  'faq        — частые вопросы',
  'palette    — палитра команд (Ctrl+K)',
  'share      — поделиться сайтом',
  'uptime     — сколько вы уже на сайте',
  'channel    — мой Telegram-канал',
  'bot        — мой бот-пример',
  'python     — математика по-питонски',
  'joke       — шутка для разработчиков',
  'theme      — сменить тему',
  'date       — текущие дата и время',
  'clear      — очистить экран',
].join('\n')

const COMMANDS = ['help', 'about', 'services', 'works', 'smartcalc', 'deck', 'contacts', 'hire', 'faq', 'palette', 'share', 'uptime', 'channel', 'bot', 'python', 'joke', 'theme', 'date', 'clear']
const QUICK = ['help', 'services', 'hire', 'python', 'joke', 'theme']

// «Математика по-питонски»: числа — строки, + склеивает, * повторяет (как "2"+"2" и "2"*3 в Python)
const MATH_RE = /^\d[\d\s+*\-/]*\d$|^\d$/
const OP_RE = /[+*\-/]/
function pyMath(expr: string): { text: string; err?: boolean } {
  const bad = expr.match(/[-/]/)
  if (bad) return { text: `TypeError: unsupported operand type(s) for ${bad[0]}: 'str' and 'str'`, err: true }
  const res = expr
    .split('+')
    .map((term) => {
      const [first, ...rest] = term.split('*')
      return rest.reduce((acc, f) => acc.repeat(Math.min(Number(f), 200)), first)
    })
    .join('')
  return { text: res.length > 400 ? res.slice(0, 400) + '…' : res }
}

const PY_HINT = [
  'Python 3.∞ (matematika edition)',
  '>>> 2+2          # 22',
  '>>> 22+22        # 2222',
  '>>> 2*3          # 222',
  '>>> 2-2          # TypeError, как и положено',
  'Просто введите пример, например: 2+2',
].join('\n')

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// Мини-терминал: показывает, что сайт живой, и даёт поиграться
export function Terminal({ onToggleTheme }: { onToggleTheme: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: `${profile.name} shell v1.0 — введите help, чтобы увидеть команды` },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIndex, setHIndex] = useState(-1)
  const screen = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const joke = useRef(0)

  // Прокручиваем только окно терминала, а не всю страницу
  useEffect(() => {
    const el = screen.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim().replace(/\s+/g, ' ').toLowerCase()
    if (!cmd) return
    setHistory((h) => (h[0] === cmd ? h : [cmd, ...h].slice(0, 30)))
    setHIndex(-1)
    if (cmd === 'clear') return setLines([])

    const out = (text: string, kind: Line['kind'] = 'out') => setLines((l) => [...l, { kind: 'in', text: raw.trim() }, { kind, text }])

    const expr = cmd.replace(/\s+/g, '')
    if (MATH_RE.test(expr) && OP_RE.test(expr)) {
      const r = pyMath(expr)
      return out(r.text, r.err ? 'err' : 'out')
    }

    switch (cmd) {
      case 'help':
        return out(HELP)
      case 'about':
        return out(profile.about)
      case 'services':
        return out(services.map((s) => `• ${s.title}: ${s.text}`).join('\n'))
      case 'works':
        out(works.map((w) => `• ${w.title} (${w.type.toLowerCase()}): ${w.url}`).join('\n'))
        return scrollTo('works')
      case 'smartcalc':
        return out(`${smartcalc.name} ${smartcalc.version} — ${smartcalc.text}\nСкачать: раздел SmartCalc выше`)
      case 'deck':
        window.open(presentationUrl, '_blank', 'noopener')
        return out(`Открываю презентацию «AI-автоматизация для бизнеса» 🎞️\n${presentationUrl}`)
      case 'contacts':
        return out([contacts.telegram, contacts.whatsapp, contacts.email].map((c) => `${c.label.padEnd(9)} ${c.value}`).join('\n'))
      case 'hire':
        out('Открываю конструктор заявки… 🚀')
        return scrollTo('brief')
      case 'faq':
        out('Открываю частые вопросы…')
        return scrollTo('faq')
      case 'palette':
        out('Открываю палитру команд ⌨️')
        return void window.dispatchEvent(new Event('promptly:palette'))
      case 'share':
        out('Делюсь ссылкой…')
        return void shareSite()
      case 'uptime':
        return out(`Вы на сайте уже ${Math.round(performance.now() / 1000)} с`)
      case 'joke':
        out(JOKES[joke.current % JOKES.length])
        joke.current += 1
        return
      case 'theme':
        onToggleTheme()
        return out('Тема переключена ✨')
      case 'date':
        return out(new Date().toLocaleString('ru-RU', { dateStyle: 'full', timeStyle: 'short' }))
      case 'channel':
      case 'tg':
        out(`${channel.title}\n${channel.url}`)
        return scrollTo('channel')
      case 'bot':
        return out('@Tracking_Promptly_bot — бот мониторинга, пример моих ботов\nhttps://t.me/Tracking_Promptly_bot')
      case 'python':
      case 'python3':
      case 'matematika':
      case 'math':
        return out(PY_HINT)
      case 'whoami':
        return out('guest. А вы, видимо, будущий клиент 😉')
      case 'pwd':
        return out('/home/guest/promptly')
      case 'hello':
      case 'hi':
      case 'привет':
        return out('Привет! Напишите, что нужно сделать: команда hire 👋')
      case '42':
        return out('Ответ на главный вопрос жизни, вселенной и всего такого.')
      case 'coffee':
        return out(['   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', "   `----'", 'Кофе готов ☕'].join('\n'))
      case 'ping':
        return out('PONG! Сайт жив, отвечает быстро.')
      case 'neofetch':
        return out(['guest@promptly', '--------------', `OS:     Web ${new Date().getFullYear()}`, 'Stack:  React + Vite + TypeScript', 'Host:   GitHub Pages', 'Bots:   Python + Actions', `Uptime: ${Math.round(performance.now() / 1000)} с`].join('\n'))
      case 'cowsay':
        return out([' ______________', '< Закажи сайт! >', ' --------------', '        \\   ^__^', '         \\  (oo)\\_______', '            (__)\\       )\\/\\', '                ||----w |', '                ||     ||'].join('\n'))
      case 'import this':
        return out('Простое лучше сложного.\nЧитаемость имеет значение.\nСейчас лучше, чем никогда.\nНапишите мне сейчас: команда hire.')
      case 'sudo make me a sandwich':
        confetti()
        return out('Okay. 🥪')
      case 'vim':
      case 'exit':
      case 'quit':
        return out('Отсюда не выйти 😈 Шутка: просто закройте вкладку или введите hire')
      case 'sudo':
      case 'sudo hire':
        confetti()
        return out('Права администратора не нужны — просто напишите мне 🙂')
      case 'rm -rf /':
      case 'rm -rf':
        return out('Хорошая попытка 😏 Этот сайт под защитой.', 'err')
      case 'ls':
        return out('services/  works/  smartcalc/  contacts/  secret.txt')
      case 'cat secret.txt':
        return out('Секрет: хороший проект начинается с одного сообщения. Команда hire 😉')
      default:
        return out(`Команда «${cmd}» не найдена. Введите help`, 'err')
    }
  }

  // Клик по окну ставит курсор в поле — но не на тач-экранах (выскочит клавиатура)
  // и не когда пользователь выделяет текст вывода
  const focusInput = () => {
    if (matchMedia('(pointer: coarse)').matches) return
    if (window.getSelection()?.isCollapsed === false) return
    input.current?.focus({ preventScroll: true })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    run(value)
    setValue('')
  }

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, hIndex + (e.key === 'ArrowUp' ? 1 : -1)))
      setHIndex(next)
      setValue(next === -1 ? '' : history[next])
    } else if (e.key === 'Tab' && value) {
      const match = COMMANDS.find((c) => c.startsWith(value.toLowerCase()))
      if (match) {
        e.preventDefault()
        setValue(match)
      }
    }
  }

  return (
    <section className="section" id="terminal">
      <div className="container">
        <h2 data-reveal><Scramble text="Поиграйте с терминалом" /></h2>
        <p className="section-lead" data-reveal>
          Для тех, кто любит заглянуть под капот. Введите команду или нажмите на подсказку.
        </p>

        <div className="term" data-reveal onClick={focusInput}>
          <div className="term-bar" aria-hidden="true">
            <i /><i /><i />
            <span>guest@promptly: ~</span>
          </div>
          <div className="term-screen" ref={screen}>
            <div role="log" aria-live="polite">
              {lines.map((l, i) => (
                <pre key={i} className={`term-line is-${l.kind}`}>
                  {l.kind === 'in' && <span className="term-prompt">$ </span>}
                  {l.text}
                </pre>
              ))}
            </div>
            <form className="term-input" onSubmit={submit}>
              <label className="term-prompt" htmlFor="term-cmd">$</label>
              <input
                id="term-cmd"
                ref={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-label="Команда терминала"
              />
            </form>
          </div>
          <div className="term-quick">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  run(q)
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
