# PCE Website — v1.0 Premium Stable Restore Point

**Commit tag:** `v1.0-premium-charging-network-stable`
**Stack:** Next.js 15.1.0 · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion 11

---

## 1. Hero Carousel

**File:** `src/components/ui/HeroCarousel.tsx`
**Rendered by:** `src/components/sections/HeroSection.tsx`

### Implementation
- Full-width `100vh` cinematic image carousel
- `AnimatePresence initial={false}` — first slide renders at opacity 1 immediately (no black flash)
- Ken Burns zoom: `motion.div` scales `1 → 1.07` over the full slide duration via Framer Motion keyframes
- **Autoplay interval:** 13,000 ms per slide
- **Fade duration:** 1.5 s cross-fade
- Two slides only — no arrows, pagination dots only
- Dual gradient overlay: left vignette + bottom dark gradient
- Electric-blue animated progress bar at bottom
- Text overlay uses plain HTML/inline styles (no Framer Motion opacity on text — prevents headless browser blank)

### Critical notes
- `mounted` guard was intentionally removed — caused black screen in Playwright/headless Chromium
- `initial={false}` on `AnimatePresence` is required; removing it causes the first slide to fade in from opacity 0

---

## 2. PCE Image Assets

All images live in `/public/`.

| File | Source | Used In |
|------|--------|---------|
| `/public/hero/hero-1.png` | Downloads/work 1.PNG | Hero carousel slide 1 — PCE Energy Storage System |
| `/public/hero/hero-2.png` | Downloads/work 2.PNG | Hero carousel slide 2 — PCE Charging Station canopy |
| `/public/solar-hub.png` | Downloads/solar grid.PNG | StatsSection right-side image |
| `/public/energy-hub.png` | Downloads/Energy hub.PNG | CTASection cinematic background |

**Image cache:** If replacing assets, run `rm -rf .next/cache/images` and restart the dev server.

---

## 3. Charging Network Section (Home Page)

**File:** `src/components/sections/NetworkMapSection.tsx`
**Location:** Appears on the home page (`src/app/page.tsx`), between StatsSection and AppPreviewSection.

### Design
- Dark navy background: `linear-gradient(180deg, #060d1f 0%, #080f22 50%, #060d1f 100%)`
- Subtle grid overlay + radial electric-blue glow
- Left column: badge · headline · subheadline · 4 glass icon feature cards · CTA link
- Right column: Africa SVG map visualization in a dark glass frame

### Layout
```
[Left 42%]                    [Right 58%]
Badge                         ┌─────────────────────┐
"Powering every               │  Africa SVG Map      │
 major route in Africa."      │  + city labels       │
Subheadline                   │  + floating stats    │
4 × glass feature cards       └─────────────────────┘
"Explore the full network →"
```

---

## 4. Africa Map Animations

**File:** `src/components/sections/NetworkMapSection.tsx`

### SVG structure
- **viewBox:** `0 0 500 560`
- **Continent fill:** custom hand-crafted `AFRICA_PATH` polygon (32-point simplified outline)
- **Continent border:** dual stroke — outer glow (`rgba(0,88,179,0.15)`, 3px blur-filtered) + inner sharp line (`rgba(48,231,237,0.25)`, 0.8px)

### 8 Cities
| City | cx | cy | r | Stations |
|------|----|----|---|----------|
| Casablanca | 132 | 78 | 5 | 48 |
| Cairo | 332 | 72 | 6 | 120 |
| Abuja | 190 | 218 | 5.5 | 85 |
| Accra | 160 | 232 | 5 | 62 |
| Lagos | 185 | 240 | 7 | 210 |
| Nairobi | 352 | 272 | 6.5 | 175 |
| Johannesburg | 300 | 448 | 6.5 | 198 |
| Cape Town | 252 | 500 | 5 | 94 |

### Connection routes (10 total)
Casablanca↔Cairo, Casablanca↔Lagos, Cairo↔Nairobi, Lagos↔Accra, Lagos↔Abuja, Lagos↔Nairobi, Nairobi↔Johannesburg, Johannesburg↔Cape Town, Abuja↔Cairo, Johannesburg↔Lagos

### Animation layers per route
1. Glow path — `rgba(0,88,179,0.25)`, 2.5px stroke, blur filter, Framer Motion `pathLength: 0→1`
2. Sharp dashed line — `rgba(48,231,237,0.35)`, 0.7px, `strokeDasharray="3 4"`, Framer Motion `pathLength: 0→1`
3. Data packet — `<circle r="2.5" fill="#30E7ED">` with native SVG `<animateMotion>` + `<mpath>` (not Framer Motion — avoids SVG `r` attribute limitation)

### City node layers (5 per city)
1. Outer pulse ring 1 — SVG `<animate>` on `r` and `opacity`
2. Outer pulse ring 2 — same, offset by 1.5s
3. Glow halo — Framer Motion `scale: 0→1`
4. Core node — Framer Motion `scale: 0→1`, `fill="url(#nodeGradient)"`
5. Center dot — white, 1.5px radius

### SVG pitfall (critical)
Framer Motion **cannot animate SVG presentation attributes** (`r`, `cx`, `cy`). Use `scale`/`opacity` with `style={{ transformOrigin }}` instead. Native SVG `<animate>` is used for the `r` attribute on pulse rings.

### Entrance animations
- Left column: `x: -40 → 0`, `opacity: 0→1`, delay 0.1s
- Right map: `x: 40 → 0`, `opacity: 0→1`, delay 0.2s
- City nodes: staggered `scale: 0→1`, delay `0.8 + i*0.1s`
- Route paths: `pathLength: 0→1`, delay `0.6 + i*0.12s`
- Data packets: conditional render — `{inView && <circle>...}`
- Floating stat cards: `y: 12→0, scale: 0.9→1`, delay `1.4 + i*0.12s`

### Floating glassmorphism stat cards
Positioned as % over the SVG container via `position: absolute`:
- 2,500+ Stations (top: 8%, left: 58%)
- 18 Countries (top: 34%, left: 60%)
- 98% Uptime (top: 58%, left: 0%)
- 350kW Ultra-Fast (top: 76%, left: 58%)

Style: `rgba(6,13,31,0.80)`, `backdrop-blur(20px)`, `border: 1px solid rgba(48,231,237,0.25)`, `border-radius: 14px`

---

## 5. PCE App Section

**File:** `src/components/sections/AppPreviewSection.tsx`

### Design
- Dark navy section: `linear-gradient(180deg, #060d1f 0%, #0a1628 60%, #060d1f 100%)`
- Phone mockup: 320px wide (40% larger than original ~230px)
- 4 sub-screens cycling every 4,000ms: MapScreen · ChargingScreen · DashboardScreen · WalletScreen
- ChargingScreen has live circular progress animation
- Tab switcher: Map / Charge / Stats / Wallet

### Float cards (4 — around phone)
- 2,500+ stations (top-left)
- Session Active 48kW (top-right)
- CO₂ 12.4kg saved (bottom-left)
- ₦2.4/kWh (bottom-right)

### Animated counters (on inView)
2,500 stations · 1,000,000 sessions · 98% uptime · 12,400kg CO₂

### Glass feature cards
`rgba(255,255,255,0.04)`, `border: rgba(48,231,237,0.18)`, hover: `translateY(-6px)` + electric glow

---

## 6. CTA Section (Premium Cinematic)

**File:** `src/components/sections/CTASection.tsx`

### Design
- Background: `energy-hub.png` — PCE Solar Energy Hub render
- Ken Burns zoom: background scales `1 → 1.06` over 18 seconds on `inView`
- Layered dark overlays: bottom gradient + center vignette + corner darkener
- Minimum height: 650px
- Headline: `clamp(3rem, 6vw, 5.5rem)` — gradient white → electric-blue → deep-blue
- Primary CTA: deep-blue filled with electric glow on hover
- Secondary CTA: glassmorphism — `rgba(255,255,255,0.08)`, `backdrop-blur(20px)`, border glows cyan on hover
- Credibility line: "Trusted by fleet operators · Backed by institutional investors · ISO-certified infrastructure"

### Animated stat counters (below CTA buttons)
2,500+ Stations · 18 Countries · 98% Network Uptime · 1M+ Sessions Served
Each with icon, count-up on scroll, ease-out cubic easing over 2,200ms

### Floating energy particles (18 total)
All values deterministic — **no Math.random()** — computed from index `i` to prevent SSR/hydration mismatch:
```ts
opacity: 0.4 + (i % 3) * 0.1   // cycles 0.4 / 0.5 / 0.6
x: (i * 37 + 11) % 100
y: (i * 53 + 7)  % 100
```

---

## 7. Stats Section

**File:** `src/components/sections/StatsSection.tsx`

- Light section (white→gray gradient) — contrast with dark sections above/below
- Left: badge · heading · 2×2 glassmorphism stat grid
- Right: solar-hub.png image + floating "Infrastructure" glass card

### Glassmorphism stat cards
`rgba(255,255,255,0.72)`, `backdrop-blur(18px)`, `border: rgba(48,231,237,0.30)`, `border-radius: 24px`
Hover: `translateY(-8px)`, electric-blue glow border

### Count-up hook
`requestAnimationFrame` + ease-out cubic `1 - (1-p)^3` over 2,000ms

---

## 8. Custom Animation Patterns

### Count-up hook (shared pattern)
```ts
function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);   // ease-out cubic
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}
```

### useInView pattern (all sections)
```ts
const ref = useRef<HTMLDivElement>(null);
const inView = useInView(ref, { once: true, margin: "-8%" });
```
`margin: "-8%"` prevents triggering before the section is visually in frame.

### Glassmorphism card base
```ts
{
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(48,231,237,0.30)",
  borderRadius: 24,
  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
}
```

### Dark glass card (over dark backgrounds)
```ts
{
  background: "rgba(6,13,31,0.80)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(48,231,237,0.25)",
  borderRadius: 14,
}
```

### Entrance animation (standard)
```ts
initial={{ opacity: 0, x: -40 }}
animate={inView ? { opacity: 1, x: 0 } : {}}
transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
```
Easing `[0.16, 1, 0.3, 1]` = custom spring-like ease-out (snappy start, smooth finish).

### Electric accent line (top of glass cards)
```tsx
<div className="absolute top-0 left-6 right-6 h-px"
  style={{ background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.5), transparent)" }} />
```

---

## 9. Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Deep Blue | `#0058B3` | Primary CTA, headings, chart values |
| Electric Cyan | `#30E7ED` | Accents, glows, badges, active states |
| Dark Navy | `#060d1f` | Dark section backgrounds |
| PCE Gray | `#6B7280` | Body text |
| PCE Gray Light | `#F5F7FA` | Light section backgrounds |

---

## 10. Known Issues / Gotchas

1. **SVG `r` attribute** — Framer Motion cannot animate. Use `scale` + `style={{ transformOrigin }}` instead.
2. **Headless browser opacity** — Framer Motion `initial={{ opacity: 0 }}` on above-the-fold content stays invisible in Playwright. Use plain HTML/CSS for critical visible content.
3. **Math.random() in render** — Causes SSR/hydration mismatch. All particle positions are deterministic (index-based). Never use `Math.random()` in JSX/style props.
4. **Image cache** — After replacing `/public/` assets, always `rm -rf .next/cache/images`.
5. **Multiple dev server instances** — Kill all before starting: `kill $(lsof -ti:3000,3001,3002)`.
6. **`critters` build warning** — Pre-existing Next.js static export issue with /404 and /500 pages. Does not affect the dev server or production functionality.

---

*Generated at commit `v1.0-premium-charging-network-stable`*
