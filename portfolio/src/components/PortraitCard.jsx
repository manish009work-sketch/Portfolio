import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* Photo in a glass card that tilts in 3D toward the pointer. */
export default function PortraitCard({ className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const spring = { stiffness: 150, damping: 18, mass: 0.4 }
  const rotateY = useSpring(useTransform(mx, [0, 1], [-14, 14]), spring)
  const rotateX = useSpring(useTransform(my, [0, 1], [12, -12]), spring)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div className={className} style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full aspect-square rounded-[26px] sm:rounded-[34px] overflow-hidden glass"
      >
        <img
          src="/manish.jpg"
          alt="Manish Jain"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: 'translateZ(0)' }}
          loading="eager"
          decoding="async"
        />

        {/* Grade the photo into the site's palette rather than letting the
            original beige background fight the dark page. */}
        <div
          className="absolute inset-0 mix-blend-color"
          style={{ background: 'linear-gradient(150deg, #7621b0 0%, #b600a8 55%, #ff6b2c 100%)', opacity: 0.34 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(8,8,10,0) 40%, rgba(8,8,10,0.78) 100%)' }}
        />

        {/* pointer glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(140px 140px at var(--gx) var(--gy), rgba(255,255,255,0.28), transparent 70%)`,
            '--gx': glareX,
            '--gy': glareY,
          }}
        />

        <div className="absolute inset-0 rounded-[26px] sm:rounded-[34px] ring-1 ring-inset ring-mist/25" />

        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
          <span className="eyebrow text-mist/70 whitespace-nowrap hidden xs:inline">Delhi&nbsp;· IN</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.55rem] sm:text-[0.62rem] uppercase tracking-[0.14em] text-mist/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open to work
          </span>
        </div>
      </motion.div>
    </div>
  )
}
