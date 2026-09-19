import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import Blob from './Blob.jsx'
import Particles from './Particles.jsx'
import Rings from './Rings.jsx'

/**
 * The hero's WebGL layer. It renders only while the hero is on screen, and
 * degrades to a static gradient when the device can't (or shouldn't) run it.
 */
/**
 * On wide screens the orb sits behind the portrait on the right, so the
 * headline reads against clean darkness. On narrow screens it recentres.
 */
function Orb({ scrollRef }) {
  const { viewport, size } = useThree()
  const wide = size.width >= 1024
  const mid = size.width >= 640

  const x = wide ? viewport.width * 0.245 : mid ? viewport.width * 0.26 : 0
  const y = wide ? -viewport.height * 0.02 : mid ? -viewport.height * 0.14 : -viewport.height * 0.08
  const scale = wide ? 1 : mid ? 0.72 : 0.52

  return (
    <group position={[x, y, 0]} scale={scale}>
      <Blob scrollRef={scrollRef} />
      <Rings scrollRef={scrollRef} />
    </group>
  )
}

export default function HeroScene() {
  const wrapRef = useRef(null)
  const scrollRef = useRef(0)
  const [visible, setVisible] = useState(true)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smallCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
    if (reduced || smallCpu) setEnabled(false)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0" aria-hidden="true">
      {/* Painted backdrop: also the fallback if WebGL is off. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(46% 42% at 74% 46%, rgba(182,0,168,0.24) 0%, rgba(118,33,176,0.10) 45%, rgba(8,8,10,0) 74%), radial-gradient(45% 40% at 12% 82%, rgba(255,107,44,0.10) 0%, rgba(8,8,10,0) 70%), #08080a',
        }}
      />

      {enabled && (
        <Canvas
          className="!absolute inset-0"
          dpr={[1, 1.8]}
          frameloop={visible ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6.2], fov: 40 }}
        >
          <Suspense fallback={null}>
            <Particles scrollRef={scrollRef} />
            <Orb scrollRef={scrollRef} />
          </Suspense>
        </Canvas>
      )}

      {/* Vignette + floor fade so the canvas melts into the page below. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 78% at 55% 45%, rgba(8,8,10,0) 42%, rgba(8,8,10,0.7) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}
