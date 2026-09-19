import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data.js'
import Magnetic from './Magnetic.jsx'

export default function Nav({ lenis }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!lenis) return
    open ? lenis.stop() : lenis.start()
  }, [open, lenis])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (!target) return
    // let the overlay finish closing before the scroll starts
    setTimeout(() => {
      if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.35 })
      else target.scrollIntoView({ behavior: 'smooth' })
    }, open ? 380 : 0)
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-[80] px-3 sm:px-5 pt-3 sm:pt-4"
      >
        <nav
          className={`mx-auto flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled
              ? 'max-w-[1180px] rounded-full border border-mist/15 bg-ink/80 backdrop-blur-xl px-5 sm:px-6 py-2.5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]'
              : 'max-w-[1400px] rounded-full border border-transparent px-3 sm:px-4 py-3'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => go(e, '#top')}
            className="font-display font-bold uppercase tracking-tight text-mist text-base sm:text-lg shrink-0"
          >
            Manish<span className="text-accent-grad">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="link-underline text-mist/75 hover:text-mist transition-colors uppercase tracking-[0.16em] text-[0.72rem] font-medium"
              >
                {link.label}
              </a>
            ))}
            <Magnetic strength={0.28}>
              <a
                href={`mailto:${profile.email}`}
                className="btn-accent rounded-full px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.16em] inline-block"
              >
                Hire me
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="md:hidden relative z-[95] h-10 w-10 flex flex-col items-center justify-center gap-[5px] shrink-0"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-6 bg-mist origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="block h-[1.5px] w-6 bg-mist"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-6 bg-mist origin-center"
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[85] bg-ink md:hidden flex flex-col justify-center px-7"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.07, duration: 0.5 }}
                /* sized off the longest label so nothing clips at any width */
                className="font-display font-black uppercase text-chrome leading-[1.05] py-1 whitespace-nowrap text-[clamp(2rem,11.5vw,4.25rem)]"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-mist/60 uppercase tracking-[0.18em] text-xs break-anywhere"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
