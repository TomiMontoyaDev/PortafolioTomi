import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'motion/react'
import { LangProvider } from './i18n'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Featured } from './components/Featured'
import { Projects } from './components/Projects'
import { AISection } from './components/AISection'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Cursor } from './components/ui/Cursor'
import { SmoothScroll } from './components/ui/SmoothScroll'

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <Cursor />
        <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>
        <div className="grain">
          <Navbar />
          <main>
            {ready ? <Hero /> : <div className="min-h-svh" />}
            <Marquee />
            <Featured />
            <Projects />
            <AISection />
            <About />
            <Contact />
          </main>
        </div>
      </MotionConfig>
    </LangProvider>
  )
}
