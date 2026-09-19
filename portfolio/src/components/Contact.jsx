import { profile } from '../data.js'
import FitText from './FitText.jsx'
import Magnetic from './Magnetic.jsx'
import Reveal from './Reveal.jsx'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: 'LinkedIn', value: profile.linkedin, href: profile.linkedinHref, external: true },
  { label: 'Based in', value: profile.location },
]

export default function Contact({ lenis }) {
  const toTop = (e) => {
    e.preventDefault()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="contact"
      className="relative bg-ink px-5 sm:px-8 pt-24 sm:pt-32 pb-8 overflow-hidden"
    >
      {/* accent bloom anchored to the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70vh]"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 100%, rgba(182,0,168,0.26), rgba(118,33,176,0.10) 45%, rgba(8,8,10,0) 78%)',
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-mist/45 text-center">Available for marketing roles</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-6 max-w-[min(100%,1000px)] mx-auto">
          <FitText variant="chrome">Let&rsquo;s talk</FitText>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex justify-center">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              className="btn-accent inline-block rounded-full px-9 py-4 sm:px-12 sm:py-5 text-[0.7rem] sm:text-sm font-medium uppercase tracking-[0.22em]"
            >
              Start a conversation
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-16 sm:mt-24 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 border-t border-mist/10 pt-10">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06} className="min-w-0">
              <p className="eyebrow text-mist/35">{channel.label}</p>
              {channel.href ? (
                <a
                  href={channel.href}
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener noreferrer' : undefined}
                  className="link-underline mt-3 inline-block text-mist/85 hover:text-mist transition-colors font-light break-anywhere text-[0.9rem] sm:text-[0.95rem]"
                >
                  {channel.value}
                </a>
              ) : (
                <p className="mt-3 text-mist/85 font-light break-anywhere text-[0.9rem] sm:text-[0.95rem]">
                  {channel.value}
                </p>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-14 sm:mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-mist/10 pt-6">
          <p className="text-mist/35 text-[0.68rem] uppercase tracking-[0.16em]">
            © {new Date().getFullYear()} {profile.name} — {profile.role}
          </p>
          <a
            href="#top"
            onClick={toTop}
            className="group flex items-center gap-2 text-mist/45 hover:text-mist transition-colors text-[0.68rem] uppercase tracking-[0.16em]"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-1">&uarr;</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
