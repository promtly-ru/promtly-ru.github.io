import { useEffect } from 'react'
import { confetti, toast } from '../lib/fx'

const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Пасхалка: Konami-код (↑↑↓↓←→←→ B A) запускает конфетти
export function useKonami() {
  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      pos = key === code[pos] ? pos + 1 : key === code[0] ? 1 : 0
      if (pos === code.length) {
        pos = 0
        confetti()
        toast('Konami-код принят: +30 жизней 🎮')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
