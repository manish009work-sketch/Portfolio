import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experience } from '../data.js'
import FitText from './FitText.jsx'
import Reveal from './Reveal.jsx'

function useIsDesktop() {
  const [is, setIs] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIs(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return is
}

function ExperienceCard({ job, index, total, isDesktop }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const targetScale = 1 - (total - index - 1) * 0.045
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={ref} className="stack-item">
      <motion.article
        style={{
          scale: isDesktop ? scale : 1,
          top: isDesktop ? `calc(-2vh + ${index * 28}px)` : 0,
        }}
        className="relative w-full max-w-6xl overflow-hidden rounded-[clamp(24px,4vw,44px)] border border-mist/20 bg-[#111116] p-6 sm:p-9 md:p-11 lg:min-h-[27rem] shadow-[0_40px_120px_-30px_rgba(0,0,0,1)]"
      >
        {/* corner accent */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[clamp(24px,4vw,44px)] opacity-60"
          style={{
            background:
              'radial-gradient(60% 55% at 100% 0%, rgba(182,0,168,0.20), transparent 65%), radial-gradient(45% 45% at 0% 100%, rgba(255,107,44,0.12), transparent 65%)',
          }}
        />

        <div className="relative flex flex-col gap-7 md:gap-9">
          {/* header */}
          <header className="flex items-start gap-4 sm:gap-6">
            <span className="font-display font-black leading-none text-mist/15 shrink-0 text-[clamp(2.25rem,6vw,5rem)] tabular-nums">
              {job.number}
            </span>
            <div className="min-w-0 flex flex-col gap-1.5">
              <span className="eyebrow text-mist/50">{job.period}</span>
              <h3 className="font-display font-medium uppercase text-chrome leading-tight text-[clamp(1.15rem,2.5vw,2rem)]">
                {job.role}
              </h3>
              <p className="text-mist/60 font-light text-[clamp(0.8rem,1.4vw,0.98rem)]">
                {job.company} <span className="opacity-40">·</span> {job.meta}
              </p>
            </div>
          </header>

          <div className="h-[1px] w-full bg-gradient-to-r from-mist/25 via-mist/10 to-transparent" />

          {/* body */}
          <div className="flex flex-col md:flex-row gap-7 md:gap-12">
            <div className="md:w-[16rem] shrink-0 flex flex-col">
              <div className="font-display font-black uppercase leading-none text-accent-grad text-[clamp(2.5rem,6vw,4.5rem)]">
                {job.stat}
              </div>
              <p className="mt-3 text-mist/50 uppercase tracking-[0.12em] leading-relaxed text-[0.62rem] sm:text-[0.68rem]">
                {job.statLabel}
              </p>
              <div className="mt-6 md:mt-auto md:pt-8 flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-mist/15 px-3 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-mist/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <ul className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-3.5">
              {job.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="relative pl-6 text-mist/75 font-light leading-relaxed text-[clamp(0.82rem,1.35vw,1rem)]"
                >
                  <span className="absolute left-0 top-[0.62em] h-[1px] w-3 bg-mist/40" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Experience() {
  const isDesktop = useIsDesktop()

  return (
    <section
      id="experience"
      className="relative z-10 -mt-8 sm:-mt-10 md:-mt-12 rounded-t-[clamp(28px,6vw,64px)] bg-ink px-5 sm:px-8 pt-20 sm:pt-28 md:pt-32 pb-8"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[min(100%,900px)] mx-auto">
          <FitText variant="chrome">Experience</FitText>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-center text-mist/50 font-light leading-relaxed text-[clamp(0.9rem,1.7vw,1.05rem)]">
            Three roles, one habit: find the number that isn&rsquo;t moving, then move it.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-16 flex flex-col gap-8 lg:gap-0">
          {experience.map((job, i) => (
            <ExperienceCard
              key={job.number}
              job={job}
              index={i}
              total={experience.length}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
