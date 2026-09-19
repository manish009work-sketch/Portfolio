# Manish Jain — Portfolio

A React + WebGL rebuild of the single-file HTML portfolio. Dark, type-led, with a
shader-driven 3D hero, smooth scroll, and a scroll-stacked experience section.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle into dist/
npm run preview    # serve the built bundle
```

Node 18+.

## Stack

| Piece | What it does |
| --- | --- |
| Vite + React 18 | build and app shell |
| Tailwind CSS | layout and utility styling (`tailwind.config.js` holds the palette) |
| three.js + @react-three/fiber | the hero's 3D scene |
| framer-motion | reveals, magnetic hovers, the 3D portrait tilt, page intro |
| lenis | smooth scrolling |

## Where things live

```
src/
  data.js                 ← ALL copy: bio, roles, skills, metrics, contact details
  App.jsx                 ← section order
  useLenis.js             ← smooth scroll setup
  components/
    FitText.jsx           ← auto-fitting display headlines (see below)
    Hero.jsx  Nav.jsx  About.jsx  Skills.jsx  Experience.jsx
    Metrics.jsx  Credentials.jsx  Awards.jsx  Contact.jsx
    Preloader.jsx  Cursor.jsx  Magnetic.jsx  Marquee.jsx
    PortraitCard.jsx  Reveal.jsx  ScrollProgress.jsx
  three/
    HeroScene.jsx         ← canvas, visibility gating, fallbacks
    Blob.jsx              ← noise-displaced icosahedron with a fresnel rim
    Particles.jsx  Rings.jsx  noise.glsl.js
public/
  manish.jpg              ← portrait
```

**To change any text, edit `src/data.js`.** Nothing is hard-coded in the components.

## Notes on the rebuild

Three things caused most of the old page's layout problems, and each is now
handled structurally rather than patched:

- **Headlines overflowed.** They were sized in `vw` with `whitespace-nowrap`, so
  any string longer than the guess ran off screen. `FitText` now draws display
  type as SVG, measures its real ink bounds, and snaps the viewBox to them — the
  type scales to its container at every viewport and cannot overflow. Pass
  `maxHeight` to cap it on short screens.
- **The marquee drifted.** It was driven by scroll-position maths. It's now a
  duplicated track and a CSS keyframe that translates exactly `-50%`, inside an
  `overflow-hidden` wrapper, so it loops seamlessly and can never widen the page.
- **Experience cards clipped their own text.** They were fixed at `85vh` with an
  inner scrollbar. Cards now grow to fit their content; the sticky stacking
  effect only runs at `lg` and up, where there's room for it.

Page-level: `html`, `body` and `#root` use `overflow-x: clip`, not `hidden` —
`hidden` turns them into scroll containers and silently breaks `position: sticky`
for everything inside.

## Accessibility & performance

- `prefers-reduced-motion` disables Lenis, the WebGL scene, and the animations;
  the hero falls back to a painted gradient.
- The 3D canvas stops rendering once the hero scrolls out of view, and is skipped
  entirely on 2-core devices.
- Custom cursor and magnetic hovers are pointer-only; touch is untouched.
