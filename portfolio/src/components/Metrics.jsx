import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { metrics } from '../data.js'
import Reveal from './Reveal.jsx'

/* Counts up the numeric part of a label like "2,500+" or "30%". */
function CountUp({ value, play }) {
  const match = value.match(/[\d,.]+/)
  const matchText = match?.[0]
  const target = match ? Number(match[0].replace(/,/g, '')) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!play || !matchText) return
    let raf
    const start = performance.now()
    const DURATION = 1600
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      setN(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // If rAF gets throttled (background tab), never leave a half-counted number.
    const settle = setTimeout(() => setN(target), DURATION + 250)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settle)
    }
  }, [play, target, matchText])

  if (!matchText) return <>{value}</>
  return <>{value.replace(matchText, n.toLocaleString('en-IN'))}</>
}

export default function Metrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="relative z-10 border-y border-mist/10 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-12 sm:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {metrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 0.08} className="min-w-0">
            <div className="font-display font-black text-chrome leading-none text-[clamp(2rem,6.5vw,3.75rem)] tabular-nums">
              <CountUp value={metric.value} play={inView} />
            </div>
            <div className="mt-2 sm:mt-3 h-[1px] w-10 bg-gradient-to-r from-magenta to-ember" />
            <p className="mt-3 text-mist/55 uppercase tracking-[0.14em] text-[0.62rem] sm:text-[0.7rem] leading-relaxed">
              {metric.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
