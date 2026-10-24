import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({ children, delay = 0, y = 40, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Splits text into words that slide up from behind a mask. */
export function SplitText({ text, className, delay = 0, stagger = 0.06, immediate = false }: { text: string; className?: string; delay?: number; stagger?: number; immediate?: boolean }) {
  const words = text.split(' ')
  const target = { y: '0%', rotate: 0 }
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 4 }}
            {...(immediate ? { animate: target } : { whileInView: target, viewport: { once: true } })}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const value = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration: 2, ease: EASE })
    const unsub = value.on('change', (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix })
    return () => { controls.stop(); unsub() }
  }, [inView, to, suffix, value])

  return <span ref={ref}>0{suffix}</span>
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
      <span className="text-lime">{index}</span>
      <span className="h-px w-12 bg-line" />
      <span>{children}</span>
    </div>
  )
}
