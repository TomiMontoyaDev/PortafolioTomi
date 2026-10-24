import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { Bot, Braces, ShieldCheck, Sparkles } from 'lucide-react'
import { useLang, type L } from '../i18n'
import { Reveal, SectionLabel, SplitText } from './ui/motion'

const PILLARS: { icon: typeof Bot; title: L; body: L }[] = [
  {
    icon: Bot,
    title: { es: 'Agentes de código', en: 'Coding agents' },
    body: {
      es: 'Trabajo con Claude Code, Copilot y ChatGPT para scaffolding, refactors, migraciones y tests. Lo repetitivo lo hace la IA; yo me enfoco en arquitectura y producto.',
      en: 'I work with Claude Code, Copilot and ChatGPT for scaffolding, refactors, migrations and tests. AI handles the repetitive work; I focus on architecture and product.',
    },
  },
  {
    icon: Braces,
    title: { es: 'Contexto & prompts', en: 'Context & prompting' },
    body: {
      es: 'Especificaciones claras, contexto del repo y tareas bien partidas: así la IA produce código que encaja con el proyecto en vez de código genérico.',
      en: 'Clear specs, repo context and well-scoped tasks: that’s how AI produces code that fits the project instead of generic snippets.',
    },
  },
  {
    icon: ShieldCheck,
    title: { es: 'Criterio humano', en: 'Human judgment' },
    body: {
      es: 'Leo, entiendo y verifico cada cambio antes de hacer merge. La IA acelera; la responsabilidad del código sigue siendo mía.',
      en: 'I read, understand and verify every change before merging. AI accelerates; ownership of the code stays with me.',
    },
  },
  {
    icon: Sparkles,
    title: { es: 'IA dentro del producto', en: 'AI inside the product' },
    body: {
      es: 'Conecto APIs de modelos de lenguaje a aplicaciones web: asistentes, generación de contenido y automatizaciones.',
      en: 'I connect language-model APIs to web apps: assistants, content generation and automations.',
    },
  },
]

const SESSION: { kind: 'cmd' | 'out' | 'ok' | 'dim'; text: L }[] = [
  { kind: 'cmd', text: { es: 'agrega checkout con MercadoPago y guarda la orden en Postgres', en: 'add MercadoPago checkout and persist the order in Postgres' } },
  { kind: 'dim', text: { es: '◆ Leyendo prisma/schema.prisma, lib/commerce.ts …', en: '◆ Reading prisma/schema.prisma, lib/commerce.ts …' } },
  { kind: 'out', text: { es: '+ model Order { id, items, total, status, mpPaymentId }', en: '+ model Order { id, items, total, status, mpPaymentId }' } },
  { kind: 'out', text: { es: '+ app/api/checkout/route.ts  → crea preferencia de pago', en: '+ app/api/checkout/route.ts  → creates payment preference' } },
  { kind: 'out', text: { es: '+ app/api/webhooks/mp/route.ts → valida firma y actualiza estado', en: '+ app/api/webhooks/mp/route.ts → verifies signature, updates status' } },
  { kind: 'dim', text: { es: '◆ Ejecutando tsc y build …', en: '◆ Running tsc and build …' } },
  { kind: 'ok', text: { es: '✓ Build OK · listo para revisión', en: '✓ Build OK · ready for review' } },
  { kind: 'cmd', text: { es: 'revisa el diff conmigo antes de hacer commit', en: 'walk me through the diff before committing' } },
]

function Terminal() {
  const { tr, lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    setShown(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= SESSION.length) clearInterval(id)
    }, 650)
    return () => clearInterval(id)
  }, [inView, lang])

  const color = { cmd: 'text-fg', out: 'text-cyan', ok: 'text-lime', dim: 'text-muted' }

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0e] shadow-[0_0_120px_-30px_rgba(63,224,255,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[11px] text-muted">~/wolfex — agent</span>
      </div>
      <div className="min-h-[340px] space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed md:p-6 md:text-sm">
        {SESSION.slice(0, shown).map((l, i) => (
          <motion.div key={`${lang}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={color[l.kind]}>
            {l.kind === 'cmd' && <span className="mr-2 text-lime">❯</span>}
            {tr(l.text)}
          </motion.div>
        ))}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-lime" />
      </div>
    </div>
  )
}

export function AISection() {
  const { tr } = useLang()
  return (
    <section id="ai" className="relative overflow-hidden px-5 py-24 md:px-10 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[160px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionLabel index="03">{tr({ es: 'Desarrollo con IA', en: 'AI-assisted development' })}</SectionLabel>

        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] md:text-7xl">
              <SplitText text={tr({ es: 'Construyo con IA.', en: 'I build with AI.' })} />
              <br />
              <span className="bg-gradient-to-r from-cyan via-violet to-lime bg-clip-text text-transparent">
                <SplitText text={tr({ es: 'Entrego más rápido.', en: 'I ship faster.' })} delay={0.2} />
              </span>
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lg text-muted">
                {tr({
                  es: 'Integro agentes de IA en todo mi flujo: planificación, código, depuración y documentación. El resultado: iteraciones más cortas y más tiempo para lo que importa — la experiencia del usuario y el negocio del cliente.',
                  en: 'I weave AI agents through my whole workflow: planning, coding, debugging and docs. The result: shorter iterations and more time for what matters — the user experience and the client’s business.',
                })}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Terminal />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title.en}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-2"
            >
              <p.icon className="h-8 w-8 text-cyan transition duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:text-lime" />
              <h3 className="mt-6 font-display text-2xl font-bold">{tr(p.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{tr(p.body)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
