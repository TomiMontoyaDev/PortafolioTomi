import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1300
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 200)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span>Tomás Montoya</span>
        <span>Portfolio ©2026</span>
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-sm text-muted md:text-base">Full-Stack Developer</span>
        <span className="font-display text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-fg md:text-[14vw]">
          {count}
          <span className="text-lime">%</span>
        </span>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-1 bg-lime" style={{ width: `${count}%` }} />
    </motion.div>
  )
}
