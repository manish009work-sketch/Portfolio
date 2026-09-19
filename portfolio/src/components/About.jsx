import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile } from '../data.js'
import FitText from './FitText.jsx'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

/* One word of the scroll-driven paragraph. */
function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <span className="relative inline-block mr-[0.28em]">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.2'],
  })

  const words = profile.about.split(' ')

  return (
    <section
      id="about"
      className="relative bg-ink px-5 sm:px-8 pt-24 sm:pt-32 md:pt-36 pb-20 sm:pb-24 overflow-hidden"
    >
      {/* soft accent bloom */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[min(900px,120vw)] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side, rgba(182,0,168,0.18), rgba(8,8,10,0) 75%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="max-w-[min(100%,880px)] mx-auto">
          <FitText variant="chrome">About me</FitText>
        </Reveal>

        <div ref={ref} className="mx-auto max-w-[46rem] mt-12 sm:mt-16">
          <p className="text-mist font-light text-center leading-[1.65] text-[clamp(1.05rem,2.4vw,1.6rem)]">
            {words.map((word, i) => {
              const start = i / words.length
              const end = Math.min(1, start + 1.4 / words.length)
              return (
                <Word key={`${word}-${i}`} range={[start, end]} progress={scrollYProgress}>
                  {word}
                </Word>
              )
            })}
          </p>
        </div>

        <Reveal delay={0.1} className="mt-14 sm:mt-20 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#experience"
              className="btn-accent inline-block rounded-full px-8 py-3.5 text-[0.68rem] sm:text-xs font-medium uppercase tracking-[0.2em]"
            >
              See the work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="btn-ghost inline-block rounded-full px-8 py-3.5 text-[0.68rem] sm:text-xs font-medium uppercase tracking-[0.2em]"
            >
              Email me
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
