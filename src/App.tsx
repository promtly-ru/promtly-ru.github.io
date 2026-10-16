import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { SmartCalc } from './components/SmartCalc'
import { Contacts } from './components/Contacts'
import { profile } from './data/content'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <SmartCalc />
        <Contacts />
      </main>
      <footer className="footer">
        <div className="container">© {profile.name}</div>
      </footer>
    </>
  )
}
