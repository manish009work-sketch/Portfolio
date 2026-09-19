import { credentialsRowOne, credentialsRowTwo } from '../data.js'
import Marquee from './Marquee.jsx'
import Reveal from './Reveal.jsx'

export default function Credentials() {
  return (
    <section className="relative bg-ink py-10 sm:py-14 overflow-hidden">
      <Reveal y={20} className="flex flex-col gap-3">
        <Marquee items={credentialsRowOne} direction="left" duration={48} />
        <Marquee items={credentialsRowTwo} direction="right" duration={56} />
      </Reveal>
    </section>
  )
}
