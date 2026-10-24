import { Asterisk } from 'lucide-react'
import { MARQUEE } from '../data/content'

export function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="relative -rotate-2 border-y border-line bg-lime py-5 text-ink">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
              {t}
              <Asterisk className="h-7 w-7 md:h-9 md:w-9" strokeWidth={3} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
