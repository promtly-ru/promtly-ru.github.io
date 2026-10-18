import { useEffect } from 'react'
import { prefersReducedMotion } from './usePageEffects'
import { confetti, toast } from '../lib/fx'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Эффекты для мыши (свечение за курсором, магнитные кнопки, параллакс фона) и пасхалки
export function useFancy() {
  useEffect(() => {
    const root = document.documentElement
    const cleanups: (() => void)[] = []

    // Только для мыши: на тач-экранах курсора нет, а эффекты лишь мешают
    if (matchMedia('(pointer: fine)').matches && !prefersReducedMotion()) {
      root.classList.add('has-fx')
      let frame = 0
      let mx = 0
      let my = 0
      const onMove = (e: PointerEvent) => {
        mx = e.clientX
        my = e.clientY
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(() => {
          root.style.setProperty('--mx', `${mx}px`)
          root.style.setProperty('--my', `${my}px`)
          root.style.setProperty('--px', ((mx / window.innerWidth - 0.5) * 2).toFixed(3))
          root.style.setProperty('--py', ((my / window.innerHeight - 0.5) * 2).toFixed(3))

          // Магнитные кнопки слегка тянутся к курсору
          const target = document.elementFromPoint(mx, my)?.closest<HTMLElement>('.magnetic')
          document.querySelectorAll<HTMLElement>('.magnetic.is-pulled').forEach((el) => {
            if (el !== target) {
              el.classList.remove('is-pulled')
              el.style.removeProperty('--mgx')
              el.style.removeProperty('--mgy')
            }
          })
          if (target) {
            const r = target.getBoundingClientRect()
            target.classList.add('is-pulled')
            target.style.setProperty('--mgx', `${((mx - r.left - r.width / 2) * 0.25).toFixed(1)}px`)
            target.style.setProperty('--mgy', `${((my - r.top - r.height / 2) * 0.35).toFixed(1)}px`)
          }
        })
      }
      // Курсор ушёл за окно — отпускаем притянутую кнопку, иначе она «залипнет»
      const release = () =>
        document.querySelectorAll<HTMLElement>('.magnetic.is-pulled').forEach((el) => {
          el.classList.remove('is-pulled')
          el.style.removeProperty('--mgx')
          el.style.removeProperty('--mgy')
        })
      window.addEventListener('pointermove', onMove, { passive: true })
      root.addEventListener('mouseleave', release)
      cleanups.push(() => {
        cancelAnimationFrame(frame)
        window.removeEventListener('pointermove', onMove)
        root.removeEventListener('mouseleave', release)
        release()
        root.classList.remove('has-fx')
      })
    }

    // Код Konami: ↑ ↑ ↓ ↓ ← → ← → B A
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      // В полях ввода стрелки и буквы заняты (история терминала, текст заявки)
      if (e.repeat || (e.target as HTMLElement | null)?.closest?.('input, textarea')) return
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      // Лишняя ↑ в начале (↑↑↑↓↓…) не сбрасывает прогресс: последние две ↑ всё ещё валидное начало
      if (key === KONAMI[pos]) pos += 1
      else if (key === KONAMI[0]) pos = pos === 2 ? 2 : 1
      else pos = 0
      if (pos === KONAMI.length) {
        pos = 0
        confetti()
        toast('🎮 Код Konami принят! Вы точно разбираетесь в классике')
      }
    }
    window.addEventListener('keydown', onKey)
    cleanups.push(() => window.removeEventListener('keydown', onKey))

    // Ушли на другую вкладку — заголовок зовёт обратно
    let savedTitle = document.title
    const onVisibility = () => {
      if (document.hidden) {
        savedTitle = document.title
        document.title = '👋 Возвращайтесь, тут интересно'
      } else {
        document.title = savedTitle
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    cleanups.push(() => {
      document.removeEventListener('visibilitychange', onVisibility)
      document.title = savedTitle
    })

    // Привет тем, кто открыл консоль
    console.log(
      '%cPromptly%c\nЗаглянули в код? Значит, вы свой человек.\nНужен сайт, бот или скрипт — пишите: https://t.me/nothing8931',
      'font: 800 28px system-ui; color: #10c07f',
      'font: 14px system-ui',
    )

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
