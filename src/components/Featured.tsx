import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { useLang } from '../i18n'
import { FEATURED } from '../data/content'
import { GithubIcon } from './ui/icons'
import { Magnetic, Reveal, SectionLabel, SplitText } from './ui/motion'

export function Featured() {
  const { tr } = useLang()
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] })
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.82, 1])
  const wordX = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])
  const glow = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <section id="work" className="relative overflow-hidden px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="01">{tr(FEATURED.kicker)}</SectionLabel>

        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <h2 className="font-display text-[16vw] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] md:text-[10vw] 2xl:text-[150px]">
            <SplitText text={FEATURED.title} stagger={0.08} />
          </h2>
          <Reveal className="max-w-sm text-lg text-muted md:pb-4">{tr(FEATURED.tagline)}</Reveal>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ x: wordX }}
        className="text-stroke pointer-events-none absolute left-0 top-[42%] select-none whitespace-nowrap font-display text-[28vw] font-extrabold uppercase leading-none opacity-40"
      >
        Hunt your apex · Hunt your apex
      </motion.div>

      <div ref={stage} className="relative mx-auto mt-16 max-w-[1200px] [perspective:1400px]">
        <motion.div style={{ opacity: glow }} className="absolute inset-x-10 -bottom-10 top-10 rounded-[40px] bg-[#1e6bff]/40 blur-[90px]" />
        <motion.a
          href={FEATURED.url}
          target="_blank"
          rel="noreferrer"
          data-cursor
          style={{ rotateX, scale, transformOrigin: 'center top' }}
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-2xl md:rounded-3xl"
        >
          <div className="flex items-center gap-2 border-b border-white/10 bg-ink-3 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center font-mono text-xs text-muted">
              wolfex.xyz
            </span>
          </div>
          <img src={FEATURED.image} alt="WOLFEX" loading="lazy" className="w-full transition duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-semibold text-ink">
              {tr({ es: 'Visitar sitio en vivo', en: 'Visit live site' })} <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </motion.a>
      </div>

      <div className="relative mx-auto mt-24 grid max-w-[1200px] gap-12 md:grid-cols-2">
        <Reveal>
          <p className="font-display text-2xl leading-snug md:text-3xl">{tr(FEATURED.description)}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {FEATURED.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-muted">{s}</span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <a href={FEATURED.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-ink transition hover:bg-white">
                wolfex.xyz <ArrowUpRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={FEATURED.repo} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-line px-6 py-3.5 font-semibold transition hover:border-fg">
                <GithubIcon className="h-4 w-4" /> {tr({ es: 'Código', en: 'Code' })}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <ul className="divide-y divide-line border-y border-line">
          {FEATURED.features.map((f, i) => (
            <motion.li
              key={f.en}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center gap-4 py-5"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <span className="flex-1 text-lg transition group-hover:translate-x-2 group-hover:text-lime">{tr(f)}</span>
              <Check className="h-4 w-4 text-lime" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
