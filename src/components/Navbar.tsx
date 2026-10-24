import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n'
import { scrollToId } from './ui/SmoothScroll'
import { Magnetic } from './ui/motion'

const LINKS = [
  { id: 'work', label: { es: 'Proyectos', en: 'Work' } },
  { id: 'ai', label: { es: 'IA', en: 'AI' } },
  { id: 'about', label: { es: 'Experiencia', en: 'Experience' } },
  { id: 'contact', label: { es: 'Contacto', en: 'Contact' } },
]

export function Navbar() {
  const { lang, toggle, tr } = useLang()
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400)
  })

  const go = (id: string) => { setOpen(false); scrollToId(id) }

  return (
    <>
      <motion.div className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-lime" style={{ scaleX: scrollYProgress }} />

      <motion.header
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex w-full max-w-5xl items-center justify-between rounded-full border border-line bg-ink/60 py-2 pl-5 pr-2 backdrop-blur-xl">
          <button onClick={() => go('top')} className="font-display text-lg font-extrabold tracking-tight">
            TM<span className="text-lime">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)} className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-fg">
                  {tr(l.label)}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
              className="relative flex h-9 items-center rounded-full border border-line px-1 font-mono text-[11px]"
            >
              {(['es', 'en'] as const).map((l) => (
                <span key={l} className={`relative z-10 w-8 text-center uppercase transition ${lang === l ? 'text-ink' : 'text-muted'}`}>
                  {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" />}
                  {l}
                </span>
              ))}
            </button>
            <Magnetic className="hidden sm:block">
              <button onClick={() => go('contact')} className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white">
                {tr({ es: 'Contrátame', en: 'Hire me' })}
              </button>
            </Magnetic>
            <button onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 md:hidden" aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left font-display text-5xl font-extrabold tracking-tight"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                <span className="mr-3 align-top font-mono text-xs text-lime">0{i + 1}</span>
                {tr(l.label)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
