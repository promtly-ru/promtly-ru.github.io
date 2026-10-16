import { ArrowUp } from 'lucide-react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { SmartCalc } from './components/SmartCalc'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { usePageEffects } from './hooks/usePageEffects'
import './App.css'

export default function App() {
  const { theme, toggle } = useTheme()
  usePageEffects()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <SmartCalc theme={theme} />
        <Contacts />
      </main>
      <Footer />
      <a className="to-top" href="#top" aria-label="Наверх">
        <ArrowUp size={20} aria-hidden="true" />
      </a>
    </>
  )
}
