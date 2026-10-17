import { ArrowUp } from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Marquee } from './components/Marquee'
import { Works } from './components/Works'
import { Brief } from './components/Brief'
import { SmartCalc } from './components/SmartCalc'
import { Terminal } from './components/Terminal'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { Toast } from './components/Toast'
import { useTheme } from './hooks/useTheme'
import { usePageEffects } from './hooks/usePageEffects'
import { useFancy } from './hooks/useFancy'
import './App.css'

export default function App() {
  const { theme, toggle } = useTheme()
  usePageEffects()
  useFancy()

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <Marquee />
        <Works />
        <Brief />
        <SmartCalc theme={theme} />
        <Terminal onToggleTheme={toggle} />
        <Contacts />
      </main>
      <Footer />
      <Toast />
      <a className="to-top" href="#top" aria-label="Наверх">
        <ArrowUp size={20} aria-hidden="true" />
      </a>
    </>
  )
}
