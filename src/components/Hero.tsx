import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDownRight, Download } from 'lucide-react'
import { useLang } from '../i18n'
import { PROFILE } from '../data/content'
import { Counter, Magnetic } from './ui/motion'
import { scrollToId } from './ui/SmoothScroll'

const EASE = [0.22, 1, 0.36, 1] as const

const ROLES = {
  es: ['e-commerce que venden', 'APIs robustas', 'experiencias animadas', 'paneles admin', 'productos con IA'],
  en: ['e-commerce that sells', 'robust APIs', 'animated experiences', 'admin dashboards', 'AI-powered products'],
}

function BigLine({ text, delay, outline = false }: { text: string; delay: number; outline?: boolean }) {
  return (
    <span className="block overflow-hidden">
      <span className="flex">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            className={`inline-block ${outline ? 'text-stroke transition-colors duration-500 hover:text-lime' : ''}`}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

function RoleRotator() {
  const { lang } = useLang()
  const [i, setI] = useState(0)
  const roles = ROLES[lang]
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [roles.length])

  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom text-lime">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i % roles.length]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="whitespace-nowrap"
        >
          {roles[i % roles.length]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function SpinningBadge() {
  const { tr } = useLang()
  const text = tr({ es: 'FULL-STACK · DEVELOPER · IA · ', en: 'FULL-STACK · DEVELOPER · AI · ' })
  return (
    <div className="relative grid h-28 w-28 place-items-center rounded-full bg-lime text-ink md:h-32 md:w-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="font-mono text-[8.5px] font-medium tracking-[0.12em]" fill="currentColor">
          <textPath href="#circle" textLength="230" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <ArrowDownRight className="h-7 w-7" />
    </div>
  )
}

export function Hero() {
  const { tr } = useLang()
  const ref = useRef<HTMLElement>(null)

  const mx = useMotionValue(50)
  const my = useMotionValue(40)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(212,255,63,0.14), transparent 60%)`

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width) * 100)
        my.set(((e.clientY - r.top) / r.height) * 100)
      }}
    >
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet/20 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-line bg-white/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
          {tr({ es: 'Disponible para proyectos', en: 'Available for work' })} · {PROFILE.location}
        </motion.div>

        <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <motion.h1
            style={{ y: nameY, opacity: nameOpacity }}
            className="font-display text-[19vw] font-extrabold uppercase leading-[0.82] tracking-[-0.04em] lg:text-[13.5vw] 2xl:text-[200px]"
          >
            <BigLine text="Tomás" delay={0.1} />
            <BigLine text="Montoya" delay={0.3} outline />
          </motion.h1>

          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
            className="absolute right-0 top-0 hidden w-[260px] lg:block xl:w-[300px]"
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink-3">
              <img
                src="/projects/tomi.webp"
                alt="Tomás Montoya"
                className="h-full w-full scale-110 object-cover object-top grayscale transition duration-700 group-hover:scale-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80">
                Pereira · CO
              </span>
            </div>
            <div className="absolute -bottom-10 -left-12">
              <SpinningBadge />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.9 }}
          className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-[1.3fr_1fr] md:items-end"
        >
          <div>
            <p className="max-w-xl font-display text-2xl leading-snug text-fg md:text-3xl">
              {tr({ es: 'Desarrollador Full-Stack. Construyo', en: 'Full-Stack Developer. I build' })}{' '}
              <RoleRotator />
            </p>
            <p className="mt-4 max-w-lg text-muted">
              {tr({
                es: 'React, Next.js, Node, Java y Python — del diseño al deploy. Uso flujos de trabajo con IA para entregar más rápido sin sacrificar calidad.',
                en: 'React, Next.js, Node, Java and Python — from design to deploy. I use AI-powered workflows to ship faster without cutting corners.',
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <button
                  onClick={() => scrollToId('work')}
                  className="group flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-semibold text-ink transition hover:bg-lime"
                >
                  {tr({ es: 'Ver proyectos', en: 'See my work' })}
                  <ArrowDownRight className="h-4 w-4 transition group-hover:rotate-[-45deg]" />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={PROFILE.cv}
                  download="CV-Tomas-Montoya.pdf"
                  className="flex items-center gap-2 rounded-full border border-line px-7 py-4 font-semibold transition hover:border-fg"
                >
                  <Download className="h-4 w-4" />
                  {tr({ es: 'Descargar CV', en: 'Download CV' })}
                </a>
              </Magnetic>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-4">
            {[
              { n: 12, s: '+', l: { es: 'Proyectos', en: 'Projects' } },
              { n: 5, s: '+', l: { es: 'En producción', en: 'In production' } },
              { n: 20, s: '+', l: { es: 'Tecnologías', en: 'Technologies' } },
            ].map((st) => (
              <div key={st.l.en} className="border-l border-line pl-4">
                <dd className="font-display text-4xl font-extrabold md:text-5xl">
                  <Counter to={st.n} suffix={st.s} />
                </dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{tr(st.l)}</dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
