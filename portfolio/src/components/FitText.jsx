import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

/**
 * Display type that can never overflow.
 *
 * The old site sized headlines in `vw` with `whitespace-nowrap`, so any string
 * longer than the guess spilled off screen. Here the text is drawn in an SVG,
 * measured with getBBox(), and the viewBox is snapped to those exact bounds —
 * so the glyphs scale to the container's width at every viewport, always.
 */
const BASELINE = 100 // the <text> element's y, in viewBox units

function toPlainText(node) {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join('')
  return ''
}

/** Real ink bounds for a string, at font-size 100, via canvas TextMetrics. */
function measureInk(text, weight) {
  if (!text) return null
  try {
    const canvas = measureInk.canvas || (measureInk.canvas = document.createElement('canvas'))
    const ctx = canvas.getContext('2d')
    ctx.font = `${weight} 100px Kanit, Impact, sans-serif`
    const m = ctx.measureText(text.toUpperCase())
    const ascent = m.actualBoundingBoxAscent
    const descent = m.actualBoundingBoxDescent
    if (!(ascent > 0)) return null
    return { ascent, descent: Math.max(0, descent) }
  } catch {
    return null
  }
}

export default function FitText({
  children,
  variant = 'chrome', // 'chrome' | 'accent' | 'solid' | 'outline'
  color = '#0C0C0C',
  weight = 900,
  tracking = -0.03,
  align = 'center', // 'left' | 'center'
  maxHeight,        // e.g. 'clamp(56px, 13vh, 130px)' — caps the glyph height
  className = '',
  style,
  as: Tag = 'div',
}) {
  const textRef = useRef(null)
  const [box, setBox] = useState(null)
  const uid = useId().replace(/[:]/g, '')

  const measure = useCallback(() => {
    const el = textRef.current
    if (!el) return
    try {
      const b = el.getBBox()
      if (!(b.width > 0)) return

      // getBBox() returns the font's full em box — ascent and descent included,
      // which for Kanit is ~150 units against a ~72-unit cap height. Trusting it
      // leaves a third of the box empty and the type renders far smaller than the
      // space it occupies. Canvas gives the real ink extent instead.
      const ink = measureInk(toPlainText(children), weight)
      const top = ink ? BASELINE - ink.ascent : b.y
      const height = ink ? ink.ascent + ink.descent : b.height

      const padY = height * 0.035
      const padX = height * 0.02
      setBox({
        x: b.x - padX,
        y: top - padY,
        w: b.width + padX * 2,
        h: height + padY * 2,
      })
    } catch {
      /* getBBox throws if the node isn't rendered yet; the retries below cover it. */
    }
  }, [children, weight])

  useLayoutEffect(() => {
    measure()
  }, [measure, tracking])

  useEffect(() => {
    // Webfonts land after first paint — re-measure once Kanit is actually in.
    let alive = true
    const remeasure = () => alive && measure()
    if (document.fonts?.ready) document.fonts.ready.then(remeasure)
    const t1 = setTimeout(remeasure, 350)
    const t2 = setTimeout(remeasure, 1200)
    window.addEventListener('resize', remeasure)
    return () => {
      alive = false
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('resize', remeasure)
    }
  }, [measure])

  const fill =
    variant === 'chrome'
      ? `url(#chrome-${uid})`
      : variant === 'accent'
        ? `url(#accent-${uid})`
        : variant === 'outline'
          ? 'none'
          : color

  return (
    <Tag className={`w-full ${className}`} style={style}>
      <svg
        viewBox={box ? `${box.x} ${box.y} ${box.w} ${box.h}` : '0 0 1000 130'}
        preserveAspectRatio={align === 'left' ? 'xMinYMid meet' : 'xMidYMid meet'}
        role="img"
        aria-label={typeof children === 'string' ? children : undefined}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight,
          display: 'block',
          overflow: 'visible',
          opacity: box ? 1 : 0,
          transition: 'opacity .28s ease',
        }}
      >
        <defs>
          <linearGradient id={`chrome-${uid}`} x1="0" y1="0" x2="0.15" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="38%" stopColor="#c3d2dd" />
            <stop offset="100%" stopColor="#646973" />
          </linearGradient>
          <linearGradient id={`accent-${uid}`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="#b600a8" />
            <stop offset="50%" stopColor="#7621b0" />
            <stop offset="100%" stopColor="#ff6b2c" />
          </linearGradient>
        </defs>
        <text
          ref={textRef}
          x="0"
          y="100"
          fontFamily="Kanit, Impact, sans-serif"
          fontSize="100"
          fontWeight={weight}
          letterSpacing={`${tracking}em`}
          fill={fill}
          stroke={variant === 'outline' ? color : undefined}
          strokeWidth={variant === 'outline' ? 1.2 : undefined}
          style={{ textTransform: 'uppercase' }}
        >
          {children}
        </text>
      </svg>
    </Tag>
  )
}
