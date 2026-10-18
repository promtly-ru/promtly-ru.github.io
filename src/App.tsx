import { ArrowUp, Send } from 'lucide-react'
import { contacts } from './data/content'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Marquee } from './components/Marquee'
import { Works } from './components/Works'
import { Brief } from './components/Brief'
import { Terminal } from './components/Terminal'
import { Contacts } from './components/Contacts'
import { Channel } from './components/Channel'
import { BackgroundFX } from './components/BackgroundFX'
import { SideNav } from './components/SideNav'
import { Footer } from './components/Footer'
import { Toast } from './components/Toast'
import { Faq } from './components/Faq'
import { CommandPalette } from './components/CommandPalette'
import { useKonami } from './hooks/useKonami'
import { useOnlineToast } from './hooks/useOnlineToast'
import { useTheme } from './hooks/useTheme'
import { usePageEffects } from './hooks/usePageEffects'
import { useFancy } from './hooks/useFancy'
import './App.css'
import './polish.css'
import './decor.css'

export default function App() {
  const { theme, toggle } = useTheme()
  usePageEffects()
  useFancy()
  useKonami()
  useOnlineToast()

  return (
    <>
      <BackgroundFX />
      <div className="cursor-glow" aria-hidden="true" />
      <CommandPalette theme={theme} onToggleTheme={toggle} />
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <Marquee />
        <Works />
        <Channel />
        <Brief />
        <Faq />
        <Terminal onToggleTheme={toggle} />
        <Contacts />
      </main>
      <Footer />
      <SideNav />
      <Toast />
      <a className="tg-fab" href={contacts.telegram.url} target="_blank" rel="noreferrer" aria-label="Написать в Telegram">
        <Send size={24} aria-hidden="true" />
        <span className="tg-fab-tip" aria-hidden="true">Написать в Telegram</span>
      </a>
      <a className="to-top" href="#top" aria-label="Наверх">
        <ArrowUp size={20} aria-hidden="true" />
      </a>
    </>
  )
}
