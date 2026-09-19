import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Pulls its child toward the pointer. Pointer-only: no-op on touch. */
export default function Magnetic({ children, strength = 0.35, radius = 90, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.35 })

  const onMove = (e) => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(dx, dy)
    const falloff = Math.max(0, 1 - dist / (Math.max(rect.width, rect.height) / 2 + radius))
    x.set(dx * strength * falloff)
    y.set(dy * strength * falloff)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
