import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[70]"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #b600a8, #7621b0 55%, #ff6b2c)',
      }}
    />
  )
}
