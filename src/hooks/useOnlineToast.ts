import { useEffect } from 'react'
import { toast } from '../lib/fx'

// Сообщает, когда пропадает или возвращается интернет (сайт при этом открывается из кэша)
export function useOnlineToast() {
  // Один раз за визит в браузере подсказываем про палитру команд
  useEffect(() => {
    let t = 0
    try {
      if (localStorage.getItem('promptly-hint') || matchMedia('(pointer: coarse)').matches) return
      t = window.setTimeout(() => {
        toast('Совет: нажми Ctrl+K — быстрый поиск по сайту ⌨️')
        try {
          localStorage.setItem('promptly-hint', '1')
        } catch {
          // не критично
        }
      }, 6000)
    } catch {
      return
    }
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const off = () => toast('Нет сети — сайт открыт из кэша')
    const on = () => toast('Сеть вернулась')
    window.addEventListener('offline', off)
    window.addEventListener('online', on)
    return () => {
      window.removeEventListener('offline', off)
      window.removeEventListener('online', on)
    }
  }, [])
}
