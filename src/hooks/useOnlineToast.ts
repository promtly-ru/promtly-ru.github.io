import { useEffect } from 'react'
import { toast } from '../lib/fx'

// Сообщает, когда пропадает или возвращается интернет (сайт при этом открывается из кэша)
export function useOnlineToast() {
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
