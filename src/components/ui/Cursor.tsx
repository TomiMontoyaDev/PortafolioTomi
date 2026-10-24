import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Dot + trailing ring that grows over interactive elements. Desktop (fine pointer) only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 25, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 250, damping: 25, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHover(!!(e.target as HTMLElement).closest('a, button, [data-cursor]'))
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/60 mix-blend-difference"
        style={{ x: rx, y: ry }}
        animate={{ width: hover ? 64 : 32, height: hover ? 64 : 32, backgroundColor: hover ? 'rgba(212,255,63,0.9)' : 'rgba(212,255,63,0)' }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}
