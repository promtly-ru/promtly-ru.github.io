import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'promptly-theme'
const META_COLORS: Record<Theme, string> = { dark: '#0c0e0d', light: '#ffffff' }

// Стартовую тему уже выставил скрипт в index.html
const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme])
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      // приватный режим — тема просто не запомнится
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
