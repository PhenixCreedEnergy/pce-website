"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sun, Wind, UtilityPole, Home, Building2, PlugZap, BatteryCharging,
  ShieldCheck, TrendingDown, Activity, Fuel, ArrowRight, CheckCircle2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const CYAN = "#30E7ED";
const BLUE = "#7ab8ff";
// Light-section palette — cyan is too faint on white, so accents shift to brand blue / deep teal
const INK = "#0b1530";
const INK_SOFT = "rgba(11,21,48,0.62)";
const ACCENT = "#0058B3";
const TEAL = "#0a8f99";
const LIGHT_BG = "#f4f7fc";

/* ─── Data ───────────────────────────────────────────────────── */
type Hotspot = { id: string; x: number; y: number; title: string; desc: string };

const unitHotspots: Hotspot[] = [
  { id: "cells",   x: 27, y: 47, title: "LFP Battery Racks",        desc: "Lithium iron phosphate cells — long cycle life, stable chemistry and no thermal runaway propagation between modules." },
  { id: "ems",     x: 63, y: 46, title: "Energy Management System", desc: "On-board controller schedules charge and discharge against tariffs, solar output and site demand in real time." },
  { id: "thermal", x: 52, y: 62, title: "Liquid Thermal Management", desc: "Keeps every cell within its ideal temperature window, even through West African afternoons." },
  { id: "safety",  x: 63, y: 74, title: "Fire Detection & Suppression", desc: "Multi-level gas, smoke and heat detection with an integrated suppression system in every enclosure." },
];

const sceneHotspots: (Hotspot & { label: string })[] = [
  { id: "ems",     label: "Site Controller",  x: 11, y: 56, title: "Site Controller", desc: "One dashboard for the whole site — monitor generation, storage and load from the PCE platform, anywhere." },
  { id: "solar",   label: "Solar Array",      x: 40, y: 76, title: "Solar Array",     desc: "Daytime solar is captured instead of curtailed, then shifted into the evening peak when it is worth the most." },
  { id: "pcs",     label: "Power Conversion", x: 58, y: 58, title: "Power Conversion System", desc: "Bi-directional inverters move energy between DC batteries and the AC grid in milliseconds." },
  { id: "battery", label: "Battery Storage",  x: 84, y: 65, title: "Battery Storage", desc: "Containerised 2.5 MWh blocks that stack into multi-megawatt-hour plants as demand grows." },
];

const stats = [
  { value: 2.5,  decimals: 1, suffix: " MWh", label: "Storage capacity per containerised unit", pos: { left: "1%",  top: "10%" } },
  { value: 20,   decimals: 0, suffix: " MWh+", label: "Scalable plant size for grid operators", pos: { left: "4%",  bottom: "6%" } },
  { value: 6000, decimals: 0, suffix: "+",     label: "Rated charge cycles over system life",   pos: { right: "1%", top: "4%" } },
  { value: 20,   decimals: 0, prefix: "<", suffix: " ms", label: "Response time for grid support", pos: { right: "3%", bottom: "12%" } },
];

const lineup = [
  {
    icon: Home,
    name: "PCE Home",
    tag: "Residential",
    capacity: "5 – 30 kWh",
    desc: "Stackable battery modules that keep the lights, fridge and fans running through outages — charged by solar or off-peak grid.",
    bullets: ["Stackable 5 kWh modules", "Hybrid inverter ready", "Live monitoring in the PCE App"],
    color: BLUE,
  },
  {
    icon: Building2,
    name: "PCE Commercial",
    tag: "Businesses & C&I",
    capacity: "100 – 500 kWh",
    desc: "Outdoor cabinets that cut demand charges, displace diesel generators and buffer fast chargers on constrained connections.",
    bullets: ["Peak shaving & load shifting", "Generator hybridisation", "EV charging buffer"],
    color: CYAN,
  },
  {
    icon: BatteryCharging,
    name: "PCE Grid",
    tag: "Utilities & Operators",
    capacity: "2.5 MWh per unit",
    desc: "Containerised grid-scale storage that firms renewables, regulates frequency and defers costly network upgrades.",
    bullets: ["Scales to 20 MWh+ plants", "Frequency & voltage support", "Renewable firming"],
    color: CYAN,
    featured: true,
  },
];

const useCases = [
  { icon: Sun,          title: "Solar Firming",        desc: "Store midday solar and dispatch it after sunset for round-the-clock clean power." },
  { icon: ShieldCheck,  title: "Backup Power",         desc: "Seamless switchover keeps critical loads online when the grid drops." },
  { icon: TrendingDown, title: "Peak Shaving",         desc: "Discharge during expensive peaks to flatten demand and cut energy bills." },
  { icon: PlugZap,      title: "EV Charging Support",  desc: "Deliver fast-charging power on sites with weak or limited grid connections." },
  { icon: Activity,     title: "Grid Services",        desc: "Frequency regulation, voltage support and reserve capacity for utilities." },
  { icon: Fuel,         title: "Diesel Displacement",  desc: "Run generators less — or not at all — cutting fuel spend and emissions." },
];

/* ─── Shared bits ────────────────────────────────────────────── */
function Eyebrow({ children, center, light }: { children: React.ReactNode; center?: boolean; light?: boolean }) {
  const color = light ? ACCENT : CYAN;
  return (
    <p style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: 16 }}>
      <span style={{ width: 3, height: 16, borderRadius: 2, background: color, boxShadow: light ? "none" : `0 0 10px ${CYAN}` }} />
      <span style={{ opacity: light ? 1 : 0.8 }}>{children}</span>
    </p>
  );
}

function GradientText({ children, light }: { children: React.ReactNode; light?: boolean }) {
  const gradient = light
    ? `linear-gradient(110deg, ${ACCENT} 0%, #0a7fd1 55%, ${TEAL} 100%)`
    : `linear-gradient(110deg, ${CYAN} 0%, ${BLUE} 55%, #0070e0 100%)`;
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
      {children}
    </span>
  );
}

function CountUp({ to, decimals = 0, prefix = "", suffix = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: setVal });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}

function PulseDot({ active, size = 34 }: { active?: boolean; size?: number }) {
  return (
    <span className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(48,231,237,0.35)", animationDuration: "2s" }} />
      <span
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size, height: size,
          background: active ? CYAN : "rgba(6,13,31,0.6)",
          border: `2px solid ${CYAN}`,
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          boxShadow: `0 0 ${active ? 26 : 16}px rgba(48,231,237,${active ? 0.75 : 0.5})`,
          transition: "background 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <span className="rounded-full" style={{ width: size * 0.28, height: size * 0.28, background: active ? "#060d1f" : "#fff" }} />
      </span>
    </span>
  );
}

/* ─── Abstract décor ─────────────────────────────────────────── */
type Blob = { color: string; size: string; pos: React.CSSProperties; variant: "a" | "b"; duration: number; delay?: number };

// Soft colour fields that drift slowly along a section's edges (CSS-animated, transform only)
function Aurora({ blobs }: { blobs: Blob[] }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full pce-drift-${b.variant}`}
          style={{ ...b.pos, width: b.size, height: b.size, background: `radial-gradient(circle at center, ${b.color} 0%, transparent 68%)`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay ?? 0}s` }}
        />
      ))}
    </div>
  );
}

const EDGES_LIGHT: Blob[] = [
  { color: "rgba(0,88,179,0.30)",   size: "min(60vw, 820px)", pos: { left: "-24%", top: "4%" },     variant: "a", duration: 22 },
  { color: "rgba(99,102,241,0.24)", size: "min(46vw, 620px)", pos: { left: "-16%", bottom: "-14%" }, variant: "b", duration: 26 },
  { color: "rgba(48,231,237,0.40)", size: "min(56vw, 760px)", pos: { right: "-22%", top: "-8%" },   variant: "b", duration: 24 },
  { color: "rgba(0,112,224,0.22)",  size: "min(42vw, 580px)", pos: { right: "-14%", bottom: "-12%" }, variant: "a", duration: 28, delay: -6 },
];
const EDGES_LIGHT_ALT: Blob[] = [
  { color: "rgba(48,231,237,0.36)", size: "min(54vw, 740px)", pos: { left: "-22%", top: "-10%" },   variant: "b", duration: 25 },
  { color: "rgba(0,88,179,0.26)",   size: "min(48vw, 660px)", pos: { left: "-18%", bottom: "-6%" }, variant: "a", duration: 29, delay: -8 },
  { color: "rgba(99,102,241,0.26)", size: "min(58vw, 800px)", pos: { right: "-24%", top: "20%" },   variant: "a", duration: 23 },
];
const EDGES_PANEL: Blob[] = [
  { color: "rgba(0,88,179,0.26)",   size: "min(50vw, 680px)", pos: { left: "-16%", top: "-40%" },  variant: "a", duration: 20 },
  { color: "rgba(48,231,237,0.32)", size: "min(46vw, 640px)", pos: { right: "-14%", top: "-20%" }, variant: "b", duration: 24 },
  { color: "rgba(99,102,241,0.14)", size: "min(36vw, 480px)", pos: { left: "40%", top: "-60%" },   variant: "b", duration: 30, delay: -10 },
];
const EDGES_DARK: Blob[] = [
  { color: "rgba(0,88,179,0.45)",   size: "min(60vw, 820px)", pos: { left: "-26%", top: "-14%" },  variant: "a", duration: 24 },
  { color: "rgba(48,231,237,0.22)", size: "min(52vw, 720px)", pos: { right: "-22%", top: "18%" },  variant: "b", duration: 27 },
  { color: "rgba(99,102,241,0.24)", size: "min(44vw, 600px)", pos: { left: "-12%", bottom: "-20%" }, variant: "b", duration: 30, delay: -9 },
];
const CTA_BLOBS: Blob[] = [
  { color: "rgba(0,112,224,0.85)",  size: "min(70vw, 900px)", pos: { left: "-20%", top: "-50%" },   variant: "a", duration: 16 },
  { color: "rgba(48,231,237,0.55)", size: "min(56vw, 720px)", pos: { right: "-14%", bottom: "-60%" }, variant: "b", duration: 19 },
  { color: "rgba(99,102,241,0.55)", size: "min(46vw, 600px)", pos: { right: "18%", top: "-55%" },   variant: "b", duration: 22, delay: -7 },
];

// Fine film grain — keeps large gradients from looking flat or banded
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, opacity, mixBlendMode: "overlay" }} />;
}

function DotField({ color = "rgba(122,184,255,0.22)", mask = "radial-gradient(ellipse 70% 60% at 50% 50%, #000 20%, transparent 75%)" }: { color?: string; mask?: string }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1.6px)`, backgroundSize: "22px 22px", maskImage: mask, WebkitMaskImage: mask }} />
  );
}

// Concentric rings that slowly orbit behind a subject, each carrying a glowing marker
function OrbitRings({ dark }: { dark?: boolean }) {
  const rings = [
    { size: "64%",  cls: "pce-spin",     dur: 50,  dashed: false, dot: dark ? CYAN : ACCENT },
    { size: "86%",  cls: "pce-spin-rev", dur: 80,  dashed: true,  dot: dark ? BLUE : TEAL },
    { size: "108%", cls: "pce-spin",     dur: 110, dashed: false, dot: "#6366f1" },
  ];
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {rings.map((r, i) => (
        <div
          key={r.size}
          className={`absolute rounded-full ${r.cls}`}
          style={{ width: r.size, aspectRatio: "1 / 1", border: `1px ${r.dashed ? "dashed" : "solid"} ${dark ? `rgba(255,255,255,${0.16 - i * 0.04})` : `rgba(0,88,179,${0.18 - i * 0.04})`}`, animationDuration: `${r.dur}s` }}
        >
          <span className="absolute rounded-full" style={{ top: -4, left: "50%", width: 8, height: 8, marginLeft: -4, background: r.dot, boxShadow: `0 0 16px ${r.dot}` }} />
        </div>
      ))}
    </div>
  );
}

// Card wrapper with a soft light that follows the cursor
function Spotlight({ children, color = "rgba(0,88,179,0.10)", radius = 24, className, style }: { children: React.ReactNode; color?: string; radius?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`group relative ${className ?? ""}`} style={{ borderRadius: radius, ...style }}>
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: radius, background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 65%)` }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Heading lines slide up from behind a mask, one after another
function Lines({ lines }: { lines: React.ReactNode[] }) {
  const reduce = useReducedMotion();
  return (
    <>
      {lines.map((line, i) => (
        // The in-view trigger sits on the visible mask: the hidden line itself never intersects
        <motion.span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.95, delay: 0.08 + i * 0.13, ease: EASE }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}

// Two counter-scrolling rows of keywords — solid, then outlined
const marqueeWords = ["Solar Firming", "Backup Power", "Peak Shaving", "EV Charging Support", "Grid Services", "Diesel Displacement", "Renewable Firming", "Frequency Response"];

function MarqueeRow({ outline, reverse }: { outline?: boolean; reverse?: boolean }) {
  const words = [...marqueeWords, ...marqueeWords];
  return (
    <div className="flex w-max pce-marquee" style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: reverse ? "55s" : "45s" }}>
      {words.map((w, i) => (
        <span
          key={i}
          className="flex items-center"
          style={{
            fontSize: "clamp(2rem, 5.4vw, 4.6rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.15, whiteSpace: "nowrap", padding: "0 0.45em",
            color: outline ? "transparent" : INK,
            WebkitTextStroke: outline ? "1.2px rgba(0,88,179,0.38)" : undefined,
          }}
        >
          {w}
          <span aria-hidden style={{ marginLeft: "0.9em", width: "0.28em", height: "0.28em", borderRadius: 999, background: `linear-gradient(135deg, ${ACCENT}, ${CYAN})`, boxShadow: `0 0 18px ${CYAN}` }} />
        </span>
      ))}
    </div>
  );
}

function KeywordMarquee() {
  const mask = "linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)";
  return (
    <section aria-label="What PCE storage does" style={{ position: "relative", overflow: "hidden", background: "#ffffff", padding: "84px 0 20px" }}>
      <div style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <MarqueeRow />
        <div style={{ height: 6 }} />
        <MarqueeRow outline reverse />
      </div>
    </section>
  );
}

/* ─── Product showcase (hotspots + floating stats) ───────────── */
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.12, ease: EASE }}
      style={{
        borderRadius: 20, padding: "22px 24px",
        background: "rgba(255,255,255,0.66)",
        backdropFilter: "blur(18px) saturate(140%)", WebkitBackdropFilter: "blur(18px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 50px rgba(11,21,48,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}
    >
      <span style={{ display: "block", width: 28, height: 3, borderRadius: 2, marginBottom: 14, background: `linear-gradient(90deg, ${ACCENT}, ${TEAL})` }} />
      <p style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 300, color: INK, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 10px" }}>
        <CountUp to={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
      </p>
      <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.55, margin: 0, maxWidth: 220 }}>{stat.label}</p>
    </motion.div>
  );
}

function ProductShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  // The unit grows into place as it scrolls towards the centre of the screen
  const productRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: productRef, offset: ["start end", "center center"] });
  const productScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const productY = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const productOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section id="products" className="scroll-mt-24" style={{ position: "relative", overflow: "hidden", background: "#ffffff", padding: "120px 0 140px" }}>
      <Aurora blobs={EDGES_LIGHT} />
      <Grain />

      <div className="section-padding max-w-[1680px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 72 }}
        >
          <Eyebrow center light>Our Products</Eyebrow>
          <h2 style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", fontWeight: 600, color: INK, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            <Lines lines={["Energy Storage for", <GradientText key="g" light>Homes, Businesses &amp; the Grid</GradientText>]} />
          </h2>
        </motion.div>

        <div className="relative lg:py-10">
          {/* Product with hotspots */}
          <motion.div
            ref={productRef}
            style={reduce ? undefined : { scale: productScale, y: productY, opacity: productOpacity }}
            className="relative mx-auto w-full lg:w-[76%]"
          >
            <OrbitRings />
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full"
              style={{ aspectRatio: "3 / 2" }}
            >
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 28, border: "1px solid rgba(11,21,48,0.06)", boxShadow: "0 40px 90px rgba(11,21,48,0.18)" }}>
                <Image src="/product-storage-unit.png" alt="PCE 2500 kWh containerised energy storage unit" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 76vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,0.45) 0%, transparent 40%)" }} />
              </div>

              {unitHotspots.map(h => {
                const isActive = active === h.id;
                const alignRight = h.x > 50;
                return (
                  <div key={h.id} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)", zIndex: isActive ? 30 : 20 }}>
                    <button
                      type="button"
                      aria-label={h.title}
                      aria-expanded={isActive}
                      onClick={() => setActive(isActive ? null : h.id)}
                      onMouseEnter={() => setActive(h.id)}
                      onMouseLeave={() => setActive(null)}
                      className="scale-[0.7] sm:scale-100"
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "block" }}
                    >
                      <PulseDot active={isActive} />
                    </button>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, transition: { duration: 0.12 } }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="hidden sm:block"
                          style={{
                            position: "absolute", top: "calc(100% + 12px)",
                            [alignRight ? "right" : "left"]: -8,
                            width: 260, padding: "16px 18px", borderRadius: 16,
                            background: "rgba(6,18,36,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(48,231,237,0.28)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                            pointerEvents: "none",
                          }}
                        >
                          <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{h.title}</p>
                          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{h.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>

            {/* Mobile hotspot detail */}
            <div className="sm:hidden" style={{ minHeight: 96, marginTop: 20 }}>
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ padding: "16px 18px", borderRadius: 16, background: "#fff", border: "1px solid rgba(0,88,179,0.18)", boxShadow: "0 12px 30px rgba(11,21,48,0.08)" }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: INK, margin: "0 0 6px" }}>{unitHotspots.find(h => h.id === active)?.title}</p>
                    <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.6, margin: 0 }}>{unitHotspots.find(h => h.id === active)?.desc}</p>
                  </motion.div>
                ) : (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: 13, color: "rgba(11,21,48,0.45)", textAlign: "center", margin: 0 }}>
                    Tap a hotspot to explore the system
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating stats — absolutely placed on desktop, grid below on smaller screens */}
          {stats.map((s, i) => (
            <div key={s.label} className="hidden lg:block absolute pce-float" style={{ ...s.pos, width: "15%", minWidth: 200, zIndex: 25, animationDelay: `${i * -1.7}s` }}>
              <StatCard stat={s} index={i} />
            </div>
          ))}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 lg:hidden">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Interactive site scene ─────────────────────────────────── */
function SiteScene() {
  const [active, setActive] = useState<string>("battery");
  const current = sceneHotspots.find(h => h.id === active)!;
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "start 25%"] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 9% 0% 9% round 28px)", "inset(0% 0% 0% 0% round 0px)"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section style={{ position: "relative", background: LIGHT_BG, padding: "24px 0 120px" }}>
      {/* Near full-bleed card: soft gradient header panel over a full-width image */}
      <div className="px-3 sm:px-4">
        <div className="relative overflow-hidden" style={{ borderRadius: 28, background: "#fff", boxShadow: "0 30px 80px rgba(11,21,48,0.10)" }}>
          <div
            className="relative"
            style={{ background: "linear-gradient(180deg, #eef3fa 0%, #f6f9fd 100%)" }}
          >
            <Aurora blobs={EDGES_PANEL} />
            <Grain />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="section-padding max-w-[1440px] mx-auto relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
              style={{ paddingTop: "clamp(56px, 7vw, 96px)", paddingBottom: "clamp(44px, 6vw, 80px)" }}
            >
              <div>
                <Eyebrow light>One Connected System</Eyebrow>
                <h2 style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.1rem)", fontWeight: 600, color: INK, lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 640, margin: 0 }}>
                  <Lines lines={[<>Generation, storage and control — <GradientText light>working as one.</GradientText></>]} />
                </h2>
              </div>
              <p style={{ fontSize: "1rem", color: INK_SOFT, maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
                Every PCE storage site pairs batteries with power conversion and intelligent control, so clean energy is there exactly when it&apos;s needed.
              </p>
            </motion.div>
          </div>

          <motion.div ref={imageRef} className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", ...(reduce ? {} : { clipPath }) }}>
            <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: imageScale }}>
              <Image src="/solar-hub.png" alt="PCE solar energy hub with battery storage containers" fill className="object-cover" sizes="100vw" />
            </motion.div>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,0.45) 0%, rgba(6,13,31,0.04) 40%, transparent 100%)" }} />

            {sceneHotspots.map(h => {
              const isActive = active === h.id;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActive(h.id)}
                  aria-pressed={isActive}
                  className="absolute flex items-center gap-2 sm:gap-3 rounded-full"
                  style={{
                    left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)",
                    padding: 4,
                    background: isActive ? "rgba(6,18,36,0.85)" : "rgba(6,18,36,0.55)",
                    backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
                    border: `1px solid ${isActive ? "rgba(48,231,237,0.6)" : "rgba(255,255,255,0.22)"}`,
                    boxShadow: isActive ? "0 0 24px rgba(48,231,237,0.3)" : "0 8px 24px rgba(0,0,0,0.3)",
                    cursor: "pointer", transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s",
                  }}
                >
                  <span className="hidden sm:inline" style={{ paddingLeft: 14, fontSize: 14, fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }}>{h.label}</span>
                  <PulseDot active={isActive} size={28} />
                </button>
              );
            })}

            {/* Detail card (desktop) */}
            <div className="hidden md:block absolute" style={{ left: "clamp(24px, 4vw, 64px)", bottom: "clamp(24px, 4vw, 56px)", width: 360 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.35, ease: EASE }}
                  style={{ padding: "20px 22px", borderRadius: 18, background: "rgba(6,18,36,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(48,231,237,0.22)" }}
                >
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>{current.title}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", lineHeight: 1.65, margin: 0 }}>{current.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Detail card (mobile) */}
      <div className="md:hidden section-padding" style={{ marginTop: 16 }}>
        <div className="flex flex-wrap gap-2" style={{ marginBottom: 12 }}>
          {sceneHotspots.map(h => (
            <button key={h.id} type="button" onClick={() => setActive(h.id)}
              style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                background: active === h.id ? "rgba(0,88,179,0.08)" : "#fff",
                border: `1px solid ${active === h.id ? "rgba(0,88,179,0.4)" : "rgba(11,21,48,0.10)"}`,
                color: active === h.id ? ACCENT : INK_SOFT }}>
              {h.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "18px 20px", borderRadius: 16, background: "#fff", border: "1px solid rgba(11,21,48,0.08)", boxShadow: "0 12px 30px rgba(11,21,48,0.06)" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: INK, margin: "0 0 6px" }}>{current.title}</p>
          <p style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.65, margin: 0 }}>{current.desc}</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Animated energy-flow diagram ───────────────────────────── */
type Phase = "charge" | "discharge";

const VB_W = 1000;
const VB_H = 560;
const CENTER = { x: 500, y: 280 };

const sources = [
  { id: "solar", label: "Solar",       icon: Sun,         x: 120, y: 100 },
  { id: "wind",  label: "Wind",        icon: Wind,        x: 120, y: 280 },
  { id: "grid",  label: "Grid",        icon: UtilityPole, x: 120, y: 460 },
];
const loads = [
  { id: "homes",    label: "Homes",       icon: Home,      x: 880, y: 100 },
  { id: "business", label: "Businesses",  icon: Building2, x: 880, y: 280 },
  { id: "ev",       label: "EV Charging", icon: PlugZap,   x: 880, y: 460 },
];

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
};

function FlowNode({ x, y, label, icon: Icon, lit }: { x: number; y: number; label: string; icon: React.ElementType; lit: boolean }) {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: `${(x / VB_W) * 100}%`, top: `${(y / VB_H) * 100}%`, transform: "translate(-50%, -50%)" }}>
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: "clamp(38px, 6vw, 64px)", height: "clamp(38px, 6vw, 64px)",
          background: lit ? "rgba(48,231,237,0.12)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${lit ? "rgba(48,231,237,0.55)" : "rgba(255,255,255,0.10)"}`,
          boxShadow: lit ? "0 0 28px rgba(48,231,237,0.30)" : "none",
          transition: "all 0.6s ease",
        }}
      >
        <Icon style={{ width: "45%", height: "45%", color: lit ? CYAN : "rgba(255,255,255,0.45)", transition: "color 0.6s ease" }} />
      </div>
      <span style={{ marginTop: 8, fontSize: "clamp(10px, 1.3vw, 13px)", fontWeight: 500, color: lit ? "#fff" : "rgba(255,255,255,0.5)", whiteSpace: "nowrap", transition: "color 0.6s ease" }}>{label}</span>
    </div>
  );
}

function EnergyFlow() {
  const [phase, setPhase] = useState<Phase>("charge");
  const [auto, setAuto] = useState(true);
  const [level, setLevel] = useState(30);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });

  useEffect(() => {
    if (!auto || !inView) return;
    const t = setInterval(() => setPhase(p => (p === "charge" ? "discharge" : "charge")), 5000);
    return () => clearInterval(t);
  }, [auto, inView]);

  useEffect(() => {
    const target = phase === "charge" ? 95 : 25;
    if (reduce) { setLevel(target); return; }
    const c = animate(level, target, { duration: 4.6, ease: "linear", onUpdate: v => setLevel(Math.round(v)) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, reduce]);

  const charging = phase === "charge";
  const paths = [
    ...sources.map(s => ({ id: `p-${s.id}`, d: curve(s.x + 40, s.y, CENTER.x - 90, CENTER.y), active: charging })),
    ...loads.map(l => ({ id: `p-${l.id}`, d: curve(CENTER.x + 90, CENTER.y, l.x - 40, l.y), active: !charging })),
  ];

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#050b1a", padding: "130px 0 150px" }}>
      <Aurora blobs={EDGES_DARK} />
      <DotField />
      {/* Horizon glow rising from the bottom edge */}
      <div aria-hidden className="absolute pointer-events-none pce-glow" style={{ left: "50%", bottom: "-38%", width: "130%", height: "70%", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(0,88,179,0.55) 0%, rgba(48,231,237,0.14) 38%, transparent 68%)" }} />
      <Grain opacity={0.08} />

      <div className="section-padding max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 40 }}
        >
          <Eyebrow center>How It Works</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            <Lines lines={["Store it when it\u2019s abundant.", <GradientText key="g">Use it when it matters.</GradientText>]} />
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            PCE storage soaks up solar, wind and off-peak grid power, then releases it to homes, businesses and EV chargers on demand.
          </p>
        </motion.div>

        {/* Mode toggle */}
        <div className="flex justify-center" style={{ marginBottom: 40 }}>
          <div className="inline-flex rounded-full" style={{ padding: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
            {(["charge", "discharge"] as Phase[]).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => { setAuto(false); setPhase(p); }}
                aria-pressed={phase === p}
                style={{
                  padding: "9px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                  background: phase === p ? "linear-gradient(135deg, #0058B3, #0070e0)" : "transparent",
                  color: phase === p ? "#fff" : "rgba(255,255,255,0.55)",
                  boxShadow: phase === p ? "0 4px 18px rgba(0,88,179,0.45)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {p === "charge" ? "Charging" : "Discharging"}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto w-full max-w-[1100px]"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="flow-grad" x1="0" x2="1">
                <stop offset="0%" stopColor={CYAN} />
                <stop offset="100%" stopColor={BLUE} />
              </linearGradient>
              <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {paths.map(p => (
              <g key={p.id}>
                <path id={p.id} d={p.d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
                <path
                  d={p.d} fill="none" stroke="url(#flow-grad)" strokeWidth={2.5} strokeLinecap="round"
                  strokeDasharray="6 12"
                  className={reduce ? undefined : "pce-flow-dash"}
                  style={{ opacity: p.active ? 0.9 : 0, transition: "opacity 0.6s ease" }}
                />
              </g>
            ))}

            {!reduce && paths.filter(p => p.active).map(p => (
              <g key={`${p.id}-${phase}`} filter="url(#flow-glow)">
                {[0, 0.6, 1.2].map(delay => (
                  <circle key={delay} r={5} fill={CYAN} opacity={0}>
                    <animateMotion dur="1.8s" begin={`${delay}s`} repeatCount="indefinite">
                      <mpath href={`#${p.id}`} />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </g>
            ))}
          </svg>

          {sources.map(s => <FlowNode key={s.id} {...s} lit={charging} />)}
          {loads.map(l => <FlowNode key={l.id} {...l} lit={!charging} />)}

          {/* Central storage unit */}
          <div
            className="absolute flex flex-col items-center"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "18%", minWidth: 96 }}
          >
            <div
              className="relative w-full"
              style={{
                aspectRatio: "3 / 4", borderRadius: "clamp(12px, 2vw, 22px)", padding: "clamp(6px, 1vw, 12px)",
                background: "rgba(10,22,44,0.9)", border: "1px solid rgba(48,231,237,0.35)",
                boxShadow: "0 0 50px rgba(48,231,237,0.18), 0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Battery cap */}
              <div style={{ position: "absolute", top: -7, left: "50%", transform: "translateX(-50%)", width: "30%", height: 7, borderRadius: "4px 4px 0 0", background: "rgba(48,231,237,0.35)" }} />
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "clamp(8px, 1.4vw, 14px)", background: "rgba(255,255,255,0.04)" }}>
                <div
                  className="absolute left-0 right-0 bottom-0"
                  style={{ height: `${level}%`, background: "linear-gradient(to top, #0058B3 0%, #30E7ED 100%)", boxShadow: "0 0 30px rgba(48,231,237,0.5)" }}
                >
                  <div className="pce-wave absolute left-0 right-0 top-0" style={{ height: 6, background: "rgba(255,255,255,0.35)", filter: "blur(2px)" }} />
                </div>
                {/* Cell dividers */}
                {[25, 50, 75].map(t => (
                  <div key={t} className="absolute left-0 right-0" style={{ top: `${t}%`, height: 1, background: "rgba(6,13,31,0.5)" }} />
                ))}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontSize: "clamp(14px, 2.6vw, 30px)", fontWeight: 700, color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,0.5)", letterSpacing: "-0.02em" }}>{level}%</span>
                </div>
              </div>
            </div>
            <span style={{ marginTop: 10, fontSize: "clamp(10px, 1.3vw, 13px)", fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>PCE Storage</span>
            <span style={{ fontSize: "clamp(9px, 1.1vw, 11px)", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: CYAN, whiteSpace: "nowrap" }}>
              {charging ? "Charging" : "Discharging"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Hero background video ──────────────────────────────────── */
function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  // Reduced-motion users get the poster frame only
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduceMotion) v.pause();
    else v.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      poster="/video/energy-storage-ecosystem-poster.jpg"
      aria-label="Animation of the PCE energy network: grid power, solar and battery storage supplying homes, offices and EV chargers"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%" }}
    >
      <source src="/video/energy-storage-ecosystem.webm" type="video/webm" />
      <source src="/video/energy-storage-ecosystem.mp4" type="video/mp4" />
    </video>
  );
}

/* ─── Product lineup ─────────────────────────────────────────── */
function LineupCard({ item, index }: { item: typeof lineup[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const tone = item.color === CYAN ? TEAL : ACCENT;
  const reduce = useReducedMotion();
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const resetTilt = () => { tiltX.set(0); tiltY.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.14, ease: EASE }}
      onMouseMove={onTilt}
      onMouseLeave={resetTilt}
      className="h-full"
      style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
    >
      <div
        className="relative h-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1.5"
        style={{
          borderRadius: 26, padding: 1.5,
          background: item.featured ? "transparent" : "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(11,21,48,0.08))",
          boxShadow: item.featured ? "0 30px 70px rgba(0,88,179,0.18)" : "0 20px 50px rgba(11,21,48,0.08)",
        }}
      >
        {/* Rotating conic border — only the 1.5px rim shows around the card face */}
        {item.featured && (
          <div aria-hidden className="absolute pce-spin" style={{ inset: "-60%", background: `conic-gradient(from 0deg, ${ACCENT}, ${CYAN}, #6366f1, ${ACCENT})`, animationDuration: "7s" }} />
        )}
        <Spotlight
          radius={24.5}
          color={`${tone}1f`}
          className="h-full"
          style={{ background: item.featured ? "#ffffff" : "rgba(255,255,255,0.72)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <div style={{ padding: "34px 30px 36px", height: "100%", display: "flex", flexDirection: "column" }}>
            {item.featured && (
              <span style={{ position: "absolute", top: 22, right: 22, padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: `linear-gradient(135deg, ${ACCENT}, ${TEAL})` }}>
                Flagship
              </span>
            )}
            <div style={{ width: 54, height: 54, borderRadius: 16, marginBottom: 26, background: `linear-gradient(135deg, ${tone}, ${tone === TEAL ? CYAN : "#0a7fd1"})`, boxShadow: `0 12px 28px ${tone}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <item.icon size={23} style={{ color: "#fff" }} />
            </div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(11,21,48,0.45)", margin: "0 0 6px" }}>{item.tag}</p>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: INK, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{item.name}</h3>
            <p style={{ fontSize: "1.1rem", fontWeight: 400, color: tone, margin: "0 0 18px" }}>{item.capacity}</p>
            <div style={{ height: 1, background: `linear-gradient(90deg, ${tone}55, transparent)`, marginBottom: 18 }} />
            <p style={{ fontSize: "0.9rem", color: INK_SOFT, lineHeight: 1.7, margin: "0 0 22px" }}>{item.desc}</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: "auto", display: "flex", flexDirection: "column", gap: 9 }}>
              {item.bullets.map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={14} style={{ color: tone, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.85rem", color: "rgba(11,21,48,0.75)", fontWeight: 500 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Spotlight>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function EnergyStoragePageClient() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 pointer-events-none"
        style={{ height: 3, zIndex: 100, transformOrigin: "0% 50%", scaleX: progress, background: `linear-gradient(90deg, ${ACCENT}, ${CYAN}, #6366f1)`, boxShadow: `0 0 12px ${CYAN}` }}
      />
      {/* ── Hero ── */}
      <section className="relative overflow-hidden max-w-full" style={{ minHeight: "88vh", display: "flex", alignItems: "flex-end" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <HeroVideo />
        </motion.div>
        <div className="section-padding relative z-10 w-full max-w-full" style={{ paddingTop: "clamp(104px, 14vh, 140px)", paddingBottom: "clamp(48px, 9vh, 96px)" }}>
          {/* Video runs unshaded — the text sits on its own frosted panel instead */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ width: "fit-content", maxWidth: "min(720px, 100%)", padding: "clamp(22px, 3vw, 36px)", borderRadius: 24, background: "rgba(6,13,31,0.72)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 24px 60px rgba(4,8,20,0.35)" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full" style={{ padding: "6px 14px", marginBottom: 20, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: CYAN, background: "rgba(48,231,237,0.08)", border: "1px solid rgba(48,231,237,0.3)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
              <BatteryCharging size={14} /> Energy Storage Systems
            </span>
            <h1
              className="font-bold text-white leading-[1.08] mb-4"
              style={{ fontSize: "clamp(1.95rem, 8vw, 3.9rem)", maxWidth: "min(680px, 100%)", overflowWrap: "break-word", textShadow: "0 3px 24px rgba(0,0,0,0.58)" }}
            >
              Grid-Scale Battery Storage<br />
              <span className="bg-clip-text text-transparent italic" style={{ backgroundImage: `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 100%)` }}>
                for a Reliable Africa
              </span>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", color: "rgba(255,255,255,0.82)", maxWidth: "min(560px, 100%)", lineHeight: 1.65, marginBottom: 28, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}>
              Battery energy storage systems for homes, businesses and grid operators — capturing clean energy and delivering it whenever and wherever power is needed.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white"
                style={{ padding: "15px 30px", fontSize: 15, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.45)", textDecoration: "none", maxWidth: "100%" }}
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium"
                style={{ padding: "15px 30px", fontSize: 15, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)", textDecoration: "none", maxWidth: "100%" }}
              >
                Explore the System
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductShowcase />
      <SiteScene />
      <EnergyFlow />
      <KeywordMarquee />

      {/* ── Product lineup + applications share one continuous glowing field ── */}
      <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(180deg, #ffffff 0%, ${LIGHT_BG} 100%)`, padding: "100px 0 130px" }}>
        <Aurora blobs={EDGES_LIGHT_ALT} />
        <Grain />
        <div className="section-padding max-w-[1440px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
            style={{ marginBottom: 64 }}
          >
            <Eyebrow center light>The Range</Eyebrow>
            <h2 style={{ fontSize: "clamp(2rem, 4.2vw, 3.3rem)", fontWeight: 600, color: INK, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
              <Lines lines={["From a single home", <GradientText key="g" light>to a whole grid.</GradientText>]} />
            </h2>
            <p style={{ fontSize: "1rem", color: INK_SOFT, maxWidth: 520, lineHeight: 1.7, margin: "0 auto" }}>
              One storage platform, sized to fit — every system is monitored and managed through PCE&apos;s energy software.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {lineup.map((item, i) => <LineupCard key={item.name} item={item} index={i} />)}
          </div>

          {/* Applications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            style={{ marginTop: 140, marginBottom: 48 }}
          >
            <div>
              <Eyebrow light>Applications</Eyebrow>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.1rem)", fontWeight: 600, color: INK, lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 720, margin: 0 }}>
                <Lines lines={[<>What PCE storage <GradientText light>does for you.</GradientText></>]} />
              </h2>
            </div>
            <p style={{ fontSize: "1rem", color: INK_SOFT, maxWidth: 400, lineHeight: 1.7, margin: 0 }}>
              Six ways a PCE system pays for itself — from keeping the lights on to earning from the grid.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
                className="h-full"
              >
                <Spotlight
                  radius={22}
                  className="h-full transition-transform duration-300 ease-out hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.95)", boxShadow: "0 16px 40px rgba(11,21,48,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
                >
                  <div style={{ padding: "30px 28px 32px" }}>
                    <div className="flex items-start justify-between" style={{ marginBottom: 22 }}>
                      <div className="transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6" style={{ width: 46, height: 46, borderRadius: 14, background: `linear-gradient(135deg, ${ACCENT}, ${TEAL})`, boxShadow: "0 10px 24px rgba(0,88,179,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <u.icon size={20} style={{ color: "#fff" }} />
                      </div>
                      <span className="bg-clip-text text-transparent" style={{ fontSize: "2.2rem", fontWeight: 200, lineHeight: 1, letterSpacing: "-0.03em", backgroundImage: "linear-gradient(135deg, rgba(0,88,179,0.35), rgba(10,143,153,0.18))" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: INK, margin: "0 0 8px" }}>{u.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: INK_SOFT, lineHeight: 1.7, margin: 0 }}>{u.desc}</p>
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA: animated gradient field ── */}
      <section style={{ background: LIGHT_BG, padding: "20px 0 110px" }}>
        <div className="px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden text-center"
            style={{ borderRadius: 32, padding: "clamp(72px, 10vw, 140px) clamp(20px, 5vw, 64px)", background: "#04122e" }}
          >
            <Aurora blobs={CTA_BLOBS} />
            <DotField color="rgba(255,255,255,0.14)" mask="radial-gradient(ellipse 60% 70% at 50% 50%, #000 10%, transparent 70%)" />
            <div aria-hidden className="absolute pointer-events-none hidden md:block" style={{ right: "-14%", top: "50%", width: "48%", aspectRatio: "1 / 1", transform: "translateY(-50%)" }}>
              <OrbitRings dark />
            </div>
            <div aria-hidden className="absolute pointer-events-none hidden md:block" style={{ left: "-18%", top: "50%", width: "40%", aspectRatio: "1 / 1", transform: "translateY(-50%)" }}>
              <OrbitRings dark />
            </div>
            <Grain opacity={0.1} />
            <div className="relative z-10">
              <Eyebrow center>Let&apos;s Build Your System</Eyebrow>
              <h2 style={{ fontSize: "clamp(2rem, 4.4vw, 3.6rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18 }}>
                <Lines lines={["Power that\u2019s ready", <GradientText key="g">when you are.</GradientText>]} />
              </h2>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.68)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
                Talk to our energy team about sizing, financing and deployment for your home, business or grid project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-sm transition-transform duration-200 hover:-translate-y-0.5"
                  style={{ padding: "16px 36px", background: "#fff", color: INK, boxShadow: "0 10px 34px rgba(48,231,237,0.35)", textDecoration: "none" }}
                >
                  Request a Quote <ArrowRight size={15} />
                </Link>
                <Link
                  href="/investors"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm transition-colors duration-200 hover:bg-white/15"
                  style={{ padding: "16px 36px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.92)", textDecoration: "none", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
