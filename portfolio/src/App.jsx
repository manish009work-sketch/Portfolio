import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import About from './components/About.jsx'
import Awards from './components/Awards.jsx'
import Contact from './components/Contact.jsx'
import Credentials from './components/Credentials.jsx'
import Cursor from './components/Cursor.jsx'
import Experience from './components/Experience.jsx'
import Hero from './components/Hero.jsx'
import Metrics from './components/Metrics.jsx'
import Media from './components/Media.jsx'
import Nav from './components/Nav.jsx'
import Preloader from './components/Preloader.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Skills from './components/Skills.jsx'
import useLenis from './useLenis.js'

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenis = useLenis()

  // Hold the page still until the intro finishes, so nothing animates unseen.
  useEffect(() => {
    if (!lenis) return
    loading ? lenis.stop() : lenis.start()
  }, [loading, lenis])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    if (loading) window.scrollTo(0, 0)
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  const done = useCallback(() => setLoading(false), [])

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>{loading && <Preloader key="preloader" onDone={done} />}</AnimatePresence>

      <Nav lenis={lenis} />

      <main>
        <Hero />
        <Credentials />
        <Metrics />
        <About />
        <Skills />
        <Experience />
        <Awards />
        <Media />
        <Contact lenis={lenis} />
      </main>
    </>
  )
}
