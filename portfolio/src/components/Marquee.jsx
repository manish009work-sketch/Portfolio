/**
 * Infinite ticker built from two identical tracks and a CSS keyframe that
 * translates exactly -50%. No scroll listener, no transform drift, and the
 * outer wrapper clips so it can never widen the page.
 */
export default function Marquee({ items, direction = 'left', duration = 46, dark = false }) {
  const track = (
    <div className="marquee-track">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className={`pill ${dark ? 'pill-dark' : ''}`}>
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className="w-full overflow-hidden edge-fade marquee-pause">
      <div
        className={`marquee ${direction === 'left' ? 'marquee-l' : 'marquee-r'}`}
        style={{ '--dur': `${duration}s` }}
      >
        {track}
        {/* duplicate keeps the loop seamless at the -50% wrap point */}
        <div className="marquee-track" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`dup-${item}-${i}`} className={`pill ${dark ? 'pill-dark' : ''}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
