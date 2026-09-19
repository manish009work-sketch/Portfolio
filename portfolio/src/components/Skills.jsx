import { useState } from 'react'
import { motion } from 'framer-motion'
import { services, toolkit } from '../data.js'
import FitText from './FitText.jsx'
import Marquee from './Marquee.jsx'
import Reveal from './Reveal.jsx'

function ServiceRow({ service, index }) {
  const [hover, setHover] = useState(false)

  return (
    <Reveal delay={index * 0.06}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative border-t border-coal/15 last:border-b"
      >
        {/* dark wipe on hover */}
        <motion.div
          className="absolute -inset-x-2 sm:-inset-x-4 inset-y-0 rounded-[26px] bg-coal origin-bottom"
          initial={false}
          animate={{ scaleY: hover ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: hover ? 'bottom' : 'top' }}
        />

        <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 px-2 sm:px-4">
          <span
            className={`font-display font-black leading-none shrink-0 tabular-nums transition-colors duration-300 text-[clamp(2.25rem,7vw,5.5rem)] ${
              hover ? 'text-accent-grad' : 'text-coal/25'
            }`}
          >
            {service.number}
          </span>

          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <h3
              className={`font-display font-medium uppercase leading-tight transition-colors duration-300 text-[clamp(1.15rem,2.6vw,2rem)] ${
                hover ? 'text-mist' : 'text-coal'
              }`}
            >
              {service.name}
            </h3>
            <p
              className={`font-light leading-relaxed max-w-2xl transition-colors duration-300 text-[clamp(0.85rem,1.5vw,1.05rem)] ${
                hover ? 'text-mist/70' : 'text-coal/60'
              }`}
            >
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    hover ? 'border-mist/30 text-mist/70' : 'border-coal/20 text-coal/55'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <motion.span
            aria-hidden="true"
            animate={{ x: hover ? 0 : -8, opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="hidden md:block self-center text-mist text-2xl shrink-0"
          >
            &rarr;
          </motion.span>
        </div>
      </div>
    </Reveal>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 bg-panel rounded-t-[clamp(28px,6vw,64px)] pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal className="max-w-[min(100%,760px)] mx-auto">
          <FitText variant="solid" color="#0C0C0C">
            What I do
          </FitText>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-center text-coal/55 font-light leading-relaxed text-[clamp(0.9rem,1.7vw,1.05rem)]">
            Five things I&rsquo;m genuinely good at — and the receipts sit in the section below.
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <ServiceRow key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <Reveal>
          <p className="eyebrow text-coal/45 text-center mb-6">Toolkit</p>
          <Marquee items={toolkit} direction="left" duration={52} dark />
        </Reveal>
      </div>
    </section>
  )
}
