import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroScene from '../three/HeroScene.jsx'
import FitText from './FitText.jsx'
import Magnetic from './Magnetic.jsx'
import PortraitCard from './PortraitCard.jsx'
import { profile } from '../data.js'

const EASE = [0.22, 1, 0.36, 1]
/* Both name lines share one cap so "MANISH" and "JAIN" stay the same weight,
   and so the block can never grow past the viewport on any screen. */
const NAME_CAP = 'clamp(46px, 24vh, 230px)'

const fade = (delay, y = 26) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
      <HeroScene />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full mx-auto w-full max-w-[1400px] px-5 sm:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8 flex flex-col"
      >
        {/* ---- top rail ---- */}
        <motion.div
          {...fade(0.35, -12)}
          className="flex items-center justify-between gap-4 shrink-0"
        >
          <span className="eyebrow text-mist/55">Portfolio — 2026</span>
          <span className="eyebrow text-mist/55 hidden sm:block">
            Brand · Content · Events · Performance
          </span>
        </motion.div>

        {/* ---- main ---- */}
        <div className="flex-1 min-h-0 flex items-center py-6">
          <div className="w-full grid grid-cols-12 items-center gap-x-5 gap-y-7 sm:gap-x-8">
            <div className="col-span-12 lg:col-span-7 min-w-0">
              <motion.p {...fade(0.4)} className="eyebrow text-mist/60 mb-3 sm:mb-5">
                {profile.role} <span className="opacity-40">·</span> {profile.location}
              </motion.p>

              <motion.div {...fade(0.5, 38)}>
                <FitText
                  as="h1"
                  variant="chrome"
                  align="left"
                  maxHeight={NAME_CAP}
                  className="drop-shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
                >
                  Manish
                </FitText>
              </motion.div>

              <motion.div {...fade(0.62, 38)} className="mt-2 sm:mt-3">
                <FitText
                  variant="chrome"
                  align="left"
                  maxHeight={NAME_CAP}
                  className="drop-shadow-[0_18px_50px_rgba(0,0,0,0.65)]"
                >
                  Jain
                </FitText>
              </motion.div>
            </div>

            <motion.div
              {...fade(0.8, 30)}
              className="col-span-7 sm:col-span-5 lg:col-span-5 lg:justify-self-end w-full max-w-[min(100%,340px)]"
              style={{ maxHeight: '46vh' }}
            >
              <PortraitCard />
            </motion.div>
          </div>
        </div>

        {/* ---- bottom rail ---- */}
        <div className="shrink-0 flex items-end justify-between gap-5 flex-wrap">
          <motion.p
            {...fade(0.95, 16)}
            className="text-mist/65 leading-snug max-w-[16rem] sm:max-w-[21rem] text-[0.78rem] sm:text-[0.92rem] font-light"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="hidden lg:flex flex-col items-center gap-2 text-mist/40 absolute left-1/2 -translate-x-1/2 bottom-7"
          >
            <span className="eyebrow">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-7 w-[1px] bg-mist/70"
            />
          </motion.div>

          <motion.div {...fade(1.05, 16)} className="flex items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="btn-accent inline-block rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-[0.66rem] sm:text-[0.72rem] font-medium uppercase tracking-[0.2em] whitespace-nowrap"
              >
                Let&rsquo;s work together
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-ghost hidden sm:grid place-items-center h-[46px] w-[46px] rounded-full"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.98 9.5h4v11.5h-4V9.5zm7 0h3.84v1.57h.06c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.14v6.36h-4v-5.64c0-1.35-.03-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.74h-4V9.5z" />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
