import { useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n'
import { CATEGORIES, PROJECTS, type Category, type Project } from '../data/content'
import { GithubIcon } from './ui/icons'
import { SectionLabel, SplitText } from './ui/motion'

function Cover({ p }: { p: Project }) {
  const [fg, bg] = p.accent
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: `radial-gradient(120% 90% at 85% 0%, ${fg}55, ${bg} 55%), ${bg}` }}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-6 bottom-5 flex flex-col gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: fg }}>{p.stack.slice(0, 3).join(' / ')}</span>
        <span className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-5xl" style={{ color: fg }}>
          {p.title}
        </span>
      </div>
      <div className="absolute right-6 top-6 h-20 w-20 rounded-full blur-2xl" style={{ background: fg }} />
    </div>
  )
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { tr } = useLang()
  const rx = useSpring(0, { stiffness: 150, damping: 18 })
  const ry = useSpring(0, { stiffness: 150, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const shine = useMotionTemplate`radial-gradient(400px circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 50%)`
  const primary = p.demo ?? p.repo

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="[perspective:1200px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width
          const py = (e.clientY - r.top) / r.height
          ry.set((px - 0.5) * 8)
          rx.set((0.5 - py) * 8)
          gx.set(px * 100)
          gy.set(py * 100)
        }}
        onPointerLeave={() => { rx.set(0); ry.set(0) }}
        className="group relative h-full overflow-hidden rounded-3xl border border-line bg-ink-2 transition-colors duration-500 hover:border-white/20"
      >
        <a href={primary} target="_blank" rel="noreferrer" className="block aspect-[16/10] overflow-hidden" data-cursor>
          <div className="h-full w-full transition duration-700 ease-out group-hover:scale-105">
            {p.image ? <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover object-top" /> : <Cover p={p} />}
          </div>
        </a>
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: shine }} />

        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span>{tr(p.tagline)}</span>
            <span>{p.year}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
          <p className="mt-3 text-muted">{tr(p.description)}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[11px] text-fg/70">{s}</span>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-ink transition hover:bg-lime">
                {tr({ es: 'Ver en vivo', en: 'Live demo' })} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold transition hover:border-fg">
                <GithubIcon className="h-3.5 w-3.5" /> {tr({ es: 'Código', en: 'Code' })}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export function Projects() {
  const { tr } = useLang()
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const list = PROJECTS.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="02">{tr({ es: 'Más proyectos', en: 'More work' })}</SectionLabel>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] md:text-7xl">
            <SplitText text={tr({ es: 'Código que sale a producción.', en: 'Code that ships to production.' })} />
          </h2>

          <div className="flex flex-wrap gap-2" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={`relative rounded-full px-4 py-2 text-sm transition ${filter === c.id ? 'text-ink' : 'text-muted hover:text-fg'}`}
              >
                {filter === c.id && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-lime" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <span className="relative">{tr(c.label)}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
