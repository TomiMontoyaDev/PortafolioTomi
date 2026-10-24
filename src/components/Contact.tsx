import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Loader2, Send } from 'lucide-react'
import { useLang } from '../i18n'
import { PROFILE } from '../data/content'
import { GithubIcon } from './ui/icons'
import { Magnetic, SplitText } from './ui/motion'
import { scrollToId } from './ui/SmoothScroll'

type Status = 'idle' | 'sending' | 'sent' | 'error'

function ContactForm() {
  const { tr } = useLang()
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field = 'w-full border-b border-line bg-transparent py-4 text-lg outline-none transition placeholder:text-muted/60 focus:border-lime'

  return (
    <form onSubmit={submit} className="space-y-2">
      <input type="hidden" name="_subject" value="Nuevo mensaje desde el portafolio" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="grid gap-2 md:grid-cols-2 md:gap-8">
        <input name="name" required minLength={2} placeholder={tr({ es: 'Tu nombre', en: 'Your name' })} className={field} />
        <input name="email" type="email" required placeholder={tr({ es: 'Tu correo', en: 'Your email' })} className={field} />
      </div>
      <input name="company" placeholder={tr({ es: 'Empresa (opcional)', en: 'Company (optional)' })} className={field} />
      <textarea name="message" required minLength={10} rows={4} placeholder={tr({ es: 'Cuéntame de tu proyecto o vacante…', en: 'Tell me about your project or role…' })} className={`${field} resize-none`} />
      <div className="flex flex-wrap items-center gap-4 pt-6">
        <Magnetic>
          <button
            disabled={status === 'sending'}
            className="flex items-center gap-2 rounded-full bg-lime px-8 py-4 font-semibold text-ink transition hover:bg-white disabled:opacity-60"
          >
            {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {tr({ es: 'Enviar mensaje', en: 'Send message' })}
          </button>
        </Magnetic>
        <AnimatePresence mode="wait">
          {status === 'sent' && (
            <motion.span key="ok" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-lime">
              <Check className="h-4 w-4" /> {tr({ es: '¡Mensaje enviado! Te respondo pronto.', en: 'Message sent! I’ll get back to you soon.' })}
            </motion.span>
          )}
          {status === 'error' && (
            <motion.span key="err" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-sm text-[#ff6b6b]">
              {tr({ es: 'No se pudo enviar. Escríbeme directo al correo.', en: 'Couldn’t send. Please email me directly.' })}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])
  return <>{now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' })} COT</>
}

export function Contact() {
  const { tr } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked */ }
  }

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-lime/10 blur-[160px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-lime">05</span> — {tr({ es: 'Contacto', en: 'Contact' })}
        </div>
        <h2 className="mt-8 font-display text-[12vw] font-extrabold uppercase leading-[0.85] tracking-[-0.035em] md:text-[9vw] 2xl:text-[140px]">
          <SplitText text={tr({ es: '¿Construimos', en: 'Let’s build' })} />
          <br />
          <span className="text-lime">
            <SplitText text={tr({ es: 'algo brutal?', en: 'something bold.' })} delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr] [&>*]:min-w-0">
          <div className="space-y-8">
            <p className="max-w-md text-lg text-muted">
              {tr({
                es: 'Abierto a empleo full-time, remoto o híbrido, y a proyectos freelance. Respondo en menos de 24 horas.',
                en: 'Open to full-time roles (remote or hybrid) and freelance projects. I reply within 24 hours.',
              })}
            </p>

            <button onClick={copy} className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line p-5 text-left transition hover:border-lime">
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Email</span>
                <span className="mt-1 block break-all text-[15px] sm:text-lg md:text-xl">{PROFILE.email}</span>
              </span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/5 transition group-hover:bg-lime group-hover:text-ink">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-line p-5 transition hover:border-fg">
                <span className="flex items-center gap-3"><GithubIcon /> GitHub</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
              <a href={PROFILE.cv} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-line p-5 transition hover:border-fg">
                <span className="flex items-center gap-3"><FileText className="h-5 w-5" /> CV</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>

        <footer className="mt-32 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted md:flex-row md:items-center">
          <span>© 2026 Tomás Montoya</span>
          <span>Pereira, CO · <LocalTime /></span>
          <button onClick={() => scrollToId('top')} className="flex items-center gap-2 transition hover:text-lime">
            {tr({ es: 'Volver arriba', en: 'Back to top' })} <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </footer>
      </div>
    </section>
  )
}
