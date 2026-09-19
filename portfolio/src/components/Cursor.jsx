import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* Dot + trailing ring. Hidden entirely on touch devices (see index.css). */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hot, setHot] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 320, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setEnabled(true)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target instanceof Element ? e.target.closest('a, button, [data-hot]') : null
      setHot(Boolean(el))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hot ? 1.9 : 1, opacity: hot ? 0.9 : 0.5 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}
