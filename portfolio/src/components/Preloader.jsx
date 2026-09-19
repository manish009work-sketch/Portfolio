import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data.js'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const DURATION = 1500

    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION)
      // ease-out so the number sprints then settles
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 380)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex flex-col justify-between p-6 sm:p-10"
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="eyebrow text-mist/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {profile.name} — {profile.role}
      </motion.div>

      <div className="flex items-end justify-between gap-6 flex-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-mist/40 uppercase tracking-[0.2em] text-xs sm:text-sm max-w-[16rem]"
        >
          Loading the good stuff
        </motion.div>
        <div className="font-display font-black leading-none text-chrome tabular-nums text-[22vw] sm:text-[16vw] md:text-[12vw]">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      <div className="h-[2px] w-full bg-mist/10 overflow-hidden">
        <div
          className="h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            background: 'linear-gradient(90deg, #b600a8, #7621b0 55%, #ff6b2c)',
          }}
        />
      </div>
    </motion.div>
  )
}
