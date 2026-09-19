import { awards } from '../data.js'
import Reveal from './Reveal.jsx'

export default function Awards() {
  return (
    <section className="relative bg-ink px-5 sm:px-8 pt-20 sm:pt-28 pb-4">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-mist/45">Recognition & education</p>
          <h2 className="mt-4 font-display font-medium uppercase text-chrome leading-tight text-[clamp(1.6rem,4.5vw,3rem)] max-w-3xl">
            The bits that came with a certificate
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.08}>
              <article className="group glass h-full rounded-3xl p-6 flex flex-col gap-3 transition-colors duration-400 hover:border-mist/30">
                <span className="eyebrow text-mist/40">{award.year}</span>
                <h3 className="font-display font-medium uppercase text-mist leading-snug text-[0.95rem] sm:text-base">
                  {award.title}
                </h3>
                <p className="text-mist/55 font-light leading-relaxed text-[0.82rem]">
                  {award.body}
                </p>
                <span className="mt-auto pt-5 block">
                  <span className="block h-[2px] w-8 rounded-full bg-gradient-to-r from-magenta to-ember transition-all duration-500 group-hover:w-20" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
