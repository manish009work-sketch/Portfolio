import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/* Scroll-triggered entrance. Fires once, on the way in. */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  x = 0,
  duration = 0.9,
  className = '',
  amount = 0.25,
  ...rest
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -8% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* Letter-by-letter mask reveal for short display strings. */
export function RevealChars({ text, delay = 0, className = '', charClass = '' }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={`${char}-${i}`} className="overflow-hidden inline-block" aria-hidden="true">
          <motion.span
            className={`inline-block ${charClass}`}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.035, ease: EASE }}
          >
            {char === ' ' ? ' ' : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
