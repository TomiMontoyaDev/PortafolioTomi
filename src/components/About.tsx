import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { useLang } from '../i18n'
import { EDUCATION, EXPERIENCE, SKILLS } from '../data/content'
import { Reveal, SectionLabel, SplitText } from './ui/motion'

export function About() {
  const { tr } = useLang()
  const timeline = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 60%'] })

  return (
    <section id="about" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="04">{tr({ es: 'Sobre mí & experiencia', en: 'About & experience' })}</SectionLabel>

        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] md:text-6xl">
              <SplitText text={tr({ es: 'Código con mentalidad de negocio.', en: 'Code with a business mindset.' })} />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-8 flex items-start gap-5">
                <img src="/projects/tomi.webp" alt="Tomás Montoya" className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top lg:hidden" />
                <p className="text-lg text-muted">
                  {tr({
                    es: 'Soy Tomás, desarrollador full-stack de Pereira, Colombia. Antes de programar trabajé en ventas y logística, así que no solo escribo código: entiendo qué necesita un negocio para vender más. Me obsesionan los detalles, las animaciones fluidas y el rendimiento.',
                    en: 'I’m Tomás, a full-stack developer from Pereira, Colombia. Before coding I worked in sales and logistics, so I don’t just write code — I understand what a business needs to sell more. I obsess over details, smooth animations and performance.',
                  })}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 rounded-3xl border border-line p-6">
                <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-lime">
                  <GraduationCap className="h-4 w-4" /> {tr({ es: 'Formación', en: 'Education' })}
                </div>
                <ul className="space-y-3">
                  {EDUCATION.map((e) => (
                    <li key={e.en} className="flex gap-3 text-sm text-fg/80">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                      {tr(e)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <ol ref={timeline} className="relative space-y-4 pl-8">
            <span className="absolute bottom-0 left-0 top-0 w-px bg-line" />
            <motion.span className="absolute left-0 top-0 h-full w-px origin-top bg-lime" style={{ scaleY: scrollYProgress }} />
            {EXPERIENCE.map((x, i) => (
              <motion.li
                key={x.role.en}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl border border-line bg-ink-2/50 p-6 transition duration-500 hover:border-white/20 hover:bg-ink-2 md:p-8"
              >
                <span className="absolute -left-[37px] top-9 h-3 w-3 rounded-full border-2 border-ink bg-muted transition group-hover:bg-lime" />
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-lime">{tr(x.period)}</div>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{tr(x.role)}</h3>
                <div className="mt-1 text-muted">{x.org}</div>
                <p className="mt-4 leading-relaxed text-fg/75">{tr(x.detail)}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-28 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SKILLS.map((g, gi) => (
            <Reveal key={g.group.en} delay={gi * 0.08}>
              <div className="h-full rounded-3xl border border-line p-6">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{tr(g.group)}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ y: -3, backgroundColor: 'rgba(212,255,63,1)', color: '#060608' }}
                      className="rounded-full border border-line px-3 py-1.5 text-sm"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
