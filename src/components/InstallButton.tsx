import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { toast } from '../lib/fx'

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

// Кнопка «Установить»: появляется, только если браузер разрешает установить сайт как приложение
export function InstallButton() {
  const [ev, setEv] = useState<InstallEvent | null>(null)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setEv(e as InstallEvent)
    }
    const onInstalled = () => {
      setEv(null)
      toast('Приложение установлено 🎉')
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (!ev) return null
  return (
    <button
      className="icon-btn install-btn"
      onClick={async () => {
        await ev.prompt()
        await ev.userChoice
        setEv(null)
      }}
      aria-label="Установить сайт как приложение"
      title="Установить как приложение"
    >
      <Download size={18} aria-hidden="true" />
    </button>
  )
}
