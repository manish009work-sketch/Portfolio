import { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioMedia } from '../data.js'
import Reveal from './Reveal.jsx'

const filters = [
  { value: 'all', label: 'All work' },
  { value: 'certificate', label: 'Certificates' },
  { value: 'picture', label: 'Pictures' },
  { value: 'reel', label: 'Instagram reels' },
]

const typeLabels = {
  certificate: 'Certificate',
  picture: 'Picture',
  reel: 'Instagram post / reel',
}

function PlaceholderArt({ type }) {
  const icon = type === 'reel' ? '▶' : type === 'picture' ? '✦' : '✧'

  return (
    <div
      className="relative flex h-full min-h-[13rem] items-center justify-center overflow-hidden bg-[#16131d]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(182,0,168,0.3),transparent_44%),radial-gradient(circle_at_80%_80%,rgba(255,107,44,0.18),transparent_42%)]" />
      <span className="relative font-display text-6xl font-black text-mist/20">{icon}</span>
      <span className="absolute bottom-4 left-4 eyebrow text-mist/35">Add media in data.js</span>
    </div>
  )
}

function MediaCard({ item, index }) {
  const content = (
    <>
      <div className="relative aspect-[1.2] overflow-hidden border-b border-mist/10">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <PlaceholderArt type={item.type} />
        )}
        <span className="absolute left-4 top-4 rounded-full border border-mist/20 bg-ink/65 px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.16em] text-mist/70 backdrop-blur-md">
          {typeLabels[item.type]}
        </span>
      </div>

      <div className="flex min-h-[12rem] flex-col p-5 sm:p-6">
        <span className="eyebrow text-mist/40">{item.eyebrow}</span>
        <h3 className="mt-3 font-display text-[1.35rem] font-medium uppercase leading-tight text-mist">
          {item.title}
        </h3>
        <p className="mt-2 text-sm font-light text-mist/55">{item.subtitle}</p>
        <p className="mt-4 text-[0.78rem] font-light leading-relaxed text-mist/45">{item.description}</p>
        {item.link && (
          <span className="mt-auto pt-5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-mist/75">
            Open original ↗
          </span>
        )}
      </div>
    </>
  )

  return (
    <Reveal delay={index * 0.06} className="h-full">
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full overflow-hidden rounded-[1.7rem] border border-mist/12 bg-[#111116] transition duration-500 hover:-translate-y-1 hover:border-mist/30 hover:shadow-[0_24px_70px_-30px_rgba(182,0,168,0.8)]"
        >
          {content}
        </a>
      ) : (
        <article className="group h-full overflow-hidden rounded-[1.7rem] border border-mist/12 bg-[#111116] transition duration-500 hover:-translate-y-1 hover:border-mist/30 hover:shadow-[0_24px_70px_-30px_rgba(182,0,168,0.8)]">
          {content}
        </article>
      )}
    </Reveal>
  )
}

export default function Media() {
  const [active, setActive] = useState('all')
  const visibleItems = active === 'all' ? portfolioMedia : portfolioMedia.filter((item) => item.type === active)

  return (
    <section id="media" className="relative bg-ink px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-mist/45">Certificates · pictures · reels</p>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-medium uppercase leading-[0.95] text-chrome">
              Proof, in progress.
            </h2>
            <p className="max-w-sm text-sm font-light leading-relaxed text-mist/50">
              A place for the work behind the numbers. Add certificate scans, campaign pictures and Instagram reel links in{' '}
              <code className="text-mist/75">src/data.js</code>.
            </p>
          </div>
        </Reveal>

        <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Media filters">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={active === filter.value}
              onClick={() => setActive(filter.value)}
              className={`rounded-full border px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.15em] transition-colors ${
                active === filter.value
                  ? 'border-mist/60 bg-mist text-ink'
                  : 'border-mist/15 text-mist/55 hover:border-mist/40 hover:text-mist'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item, index) => (
            <MediaCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
