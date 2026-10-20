"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, animate, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sun, Wind, UtilityPole, Home, Building2, PlugZap, BatteryCharging,
  ShieldCheck, TrendingDown, Activity, Fuel, ArrowRight, CheckCircle2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const CYAN = "#30E7ED";
const BLUE = "#7ab8ff";

/* ─── Data ───────────────────────────────────────────────────── */
type Hotspot = { id: string; x: number; y: number; title: string; desc: string };

const unitHotspots: Hotspot[] = [
  { id: "cells",   x: 27, y: 47, title: "LFP Battery Racks",        desc: "Lithium iron phosphate cells — long cycle life, stable chemistry and no thermal runaway propagation between modules." },
  { id: "ems",     x: 63, y: 46, title: "Energy Management System", desc: "On-board controller schedules charge and discharge against tariffs, solar output and site demand in real time." },
  { id: "thermal", x: 52, y: 62, title: "Liquid Thermal Management", desc: "Keeps every cell within its ideal temperature window, even through West African afternoons." },
  { id: "safety",  x: 63, y: 74, title: "Fire Detection & Suppression", desc: "Multi-level gas, smoke and heat detection with an integrated suppression system in every enclosure." },
];

const sceneHotspots: (Hotspot & { label: string })[] = [
  { id: "ems",     label: "Site Controller",  x: 11, y: 55, title: "Site Controller", desc: "One dashboard for the whole site — monitor generation, storage and load from the PCE platform, anywhere." },
  { id: "solar",   label: "Solar Array",      x: 40, y: 72, title: "Solar Array",     desc: "Daytime solar is captured instead of curtailed, then shifted into the evening peak when it is worth the most." },
  { id: "pcs",     label: "Power Conversion", x: 58, y: 57, title: "Power Conversion System", desc: "Bi-directional inverters move energy between DC batteries and the AC grid in milliseconds." },
  { id: "battery", label: "Battery Storage",  x: 84, y: 63, title: "Battery Storage", desc: "Containerised 2.5 MWh blocks that stack into multi-megawatt-hour plants as demand grows." },
];

const stats = [
  { value: 2.5,  decimals: 1, suffix: " MWh", label: "Storage capacity per containerised unit", pos: { left: "0%",  top: "14%" } },
  { value: 20,   decimals: 0, suffix: " MWh+", label: "Scalable plant size for grid operators", pos: { left: "3%",  bottom: "4%" } },
  { value: 6000, decimals: 0, suffix: "+",     label: "Rated charge cycles over system life",   pos: { right: "0%", top: "6%" } },
  { value: 20,   decimals: 0, prefix: "<", suffix: " ms", label: "Response time for grid support", pos: { right: "2%", bottom: "10%" } },
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
function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: CYAN, marginBottom: 16 }}>
      <span style={{ width: 3, height: 16, borderRadius: 2, background: CYAN, boxShadow: `0 0 10px ${CYAN}` }} />
      <span style={{ opacity: 0.8 }}>{children}</span>
    </p>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(110deg, ${CYAN} 0%, ${BLUE} 55%, #0070e0 100%)` }}>
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
        background: "rgba(10,22,44,0.72)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
      }}
    >
      <p style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)", fontWeight: 300, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 10px" }}>
        <CountUp to={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.55, margin: 0, maxWidth: 220 }}>{stat.label}</p>
    </motion.div>
  );
}

function ProductShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="products" className="scroll-mt-24" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #060d1f 0%, #091528 55%, #060d1f 100%)", padding: "110px 0 120px" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 900, maxWidth: "100%", height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(48,231,237,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="section-padding max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 72 }}
        >
          <Eyebrow center>Our Products</Eyebrow>
          <h2 style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)", fontWeight: 600, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            Energy Storage for<br />
            <GradientText>Homes, Businesses &amp; the Grid</GradientText>
          </h2>
        </motion.div>

        <div className="relative lg:py-10">
          {/* Product with hotspots */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto w-full lg:w-[62%]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full"
              style={{ aspectRatio: "3 / 2" }}
            >
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 28, border: "1px solid rgba(48,231,237,0.16)", boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 60px rgba(48,231,237,0.08)" }}>
                <Image src="/product-storage-unit.png" alt="PCE 2500 kWh containerised energy storage unit" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 62vw" />
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
                    style={{ padding: "16px 18px", borderRadius: 16, background: "rgba(10,22,44,0.8)", border: "1px solid rgba(48,231,237,0.25)" }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{unitHotspots.find(h => h.id === active)?.title}</p>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{unitHotspots.find(h => h.id === active)?.desc}</p>
                  </motion.div>
                ) : (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textAlign: "center", margin: 0 }}>
                    Tap a hotspot to explore the system
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating stats — absolutely placed on desktop, grid below on smaller screens */}
          {stats.map((s, i) => (
            <div key={s.label} className="hidden lg:block absolute" style={{ ...s.pos, width: "17%", minWidth: 210, zIndex: 25 }}>
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

  return (
    <section style={{ position: "relative", background: "#060d1f", padding: "40px 0 120px" }}>
      <div className="section-padding max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          style={{ marginBottom: 48 }}
        >
          <div>
            <Eyebrow>One Connected System</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 620, margin: 0 }}>
              Generation, storage and control — <GradientText>working as one.</GradientText>
            </h2>
          </div>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: 420, lineHeight: 1.7, margin: 0 }}>
            Every PCE storage site pairs batteries with power conversion and intelligent control, so clean energy is there exactly when it&apos;s needed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "3 / 2", borderRadius: 28, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}
        >
          <Image src="/solar-hub.png" alt="PCE solar energy hub with battery storage containers" fill className="object-cover" sizes="(max-width: 1440px) 100vw, 1300px" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,0.55) 0%, rgba(6,13,31,0.05) 45%, rgba(6,13,31,0.25) 100%)" }} />

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
                  padding: "4px 4px 4px 4px",
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
          <div className="hidden md:block absolute" style={{ left: 24, bottom: 24, width: 340 }}>
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

        {/* Detail card (mobile) */}
        <div className="md:hidden" style={{ marginTop: 16 }}>
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 12 }}>
            {sceneHotspots.map(h => (
              <button key={h.id} type="button" onClick={() => setActive(h.id)}
                style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                  background: active === h.id ? "rgba(48,231,237,0.14)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${active === h.id ? "rgba(48,231,237,0.5)" : "rgba(255,255,255,0.12)"}`,
                  color: active === h.id ? CYAN : "rgba(255,255,255,0.7)" }}>
                {h.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "18px 20px", borderRadius: 16, background: "rgba(10,22,44,0.8)", border: "1px solid rgba(48,231,237,0.2)" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>{current.title}</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.58)", lineHeight: 1.65, margin: 0 }}>{current.desc}</p>
          </div>
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
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #060d1f 0%, #081326 50%, #060d1f 100%)", padding: "110px 0 120px" }}>
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,88,179,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

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
            Store it when it&apos;s abundant.<br /><GradientText>Use it when it matters.</GradientText>
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

/* ─── Ecosystem animation ────────────────────────────────────── */
function EcosystemVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(videoRef, { margin: "-10%" });
  const reduceMotion = useReducedMotion();

  // Only play while on screen, and never autoplay for reduced-motion users
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduceMotion) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduceMotion]);

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#060d1f", padding: "40px 0 110px" }}>
      <div className="section-padding max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center"
          style={{ marginBottom: 40 }}
        >
          <Eyebrow center>The Connected Grid</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            One network. <GradientText>Every kilowatt accounted for.</GradientText>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.45)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
            Grid, solar, storage, homes, businesses and EV chargers — linked together and balanced by PCE storage around the clock.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden"
          style={{ borderRadius: 28, border: "1px solid rgba(255,255,255,0.10)", boxShadow: "0 30px 90px rgba(0,0,0,0.5), 0 0 0 1px rgba(48,231,237,0.06), 0 0 80px rgba(0,88,179,0.18)", aspectRatio: "16 / 9", background: "#e9ecef" }}
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/energy-storage-ecosystem-poster.jpg"
            aria-label="Animation of the PCE energy network: grid power, solar and battery storage supplying homes, offices and EV chargers"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/video/energy-storage-ecosystem.webm" type="video/webm" />
            <source src="/video/energy-storage-ecosystem.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Product lineup ─────────────────────────────────────────── */
function LineupCard({ item, index }: { item: typeof lineup[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "100%", borderRadius: 24, padding: 2,
          background: item.featured || hovered
            ? `linear-gradient(135deg, ${item.color}55 0%, rgba(255,255,255,0.06) 100%)`
            : "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          boxShadow: hovered ? `0 0 36px ${item.color}18, 0 20px 60px rgba(0,0,0,0.35)` : "0 4px 20px rgba(0,0,0,0.25)",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s ease, background 0.32s ease",
        }}
      >
        <div style={{ position: "relative", borderRadius: 22, padding: "32px 28px 36px", background: "rgba(10,20,40,0.92)", height: "100%", display: "flex", flexDirection: "column" }}>
          {item.featured && (
            <span style={{ position: "absolute", top: 20, right: 20, padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: CYAN, background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.35)" }}>
              Flagship
            </span>
          )}
          <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 24, background: `${item.color}14`, border: `1px solid ${item.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <item.icon size={22} style={{ color: item.color }} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 6px" }}>{item.tag}</p>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{item.name}</h3>
          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: item.color, margin: "0 0 18px" }}>{item.capacity}</p>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${item.color}40, transparent)`, marginBottom: 18 }} />
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 22px" }}>{item.desc}</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: "auto", display: "flex", flexDirection: "column", gap: 9 }}>
            {item.bullets.map(b => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={14} style={{ color: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.62)", fontWeight: 500 }}>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function EnergyStoragePageClient() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden max-w-full" style={{ minHeight: "88vh", display: "flex", alignItems: "flex-end" }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src="/energy-source.png"
            alt="PCE 20 MWh energy storage system alongside wind turbines and solar panels"
            fill
            className="object-cover"
            style={{ objectPosition: "center 50%" }}
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(4,8,20,0.86) 0%, rgba(4,8,20,0.48) 55%, rgba(4,8,20,0.15) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,1) 0%, rgba(4,8,20,0.35) 45%, transparent 75%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div className="section-padding relative z-10 w-full max-w-full" style={{ paddingTop: "clamp(104px, 14vh, 140px)", paddingBottom: "clamp(48px, 9vh, 96px)" }}>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE }}>
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
      <EcosystemVideo />

      {/* ── Product lineup ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "#060d1f", padding: "100px 0 110px" }}>
        <div style={{ position: "absolute", top: "20%", left: "3%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(48,231,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-padding max-w-[1440px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginBottom: 56 }}
          >
            <Eyebrow>The Range</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 600, margin: "0 0 16px" }}>
              From a single home to a whole grid.
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.42)", maxWidth: 500, lineHeight: 1.7, margin: 0 }}>
              One storage platform, sized to fit — every system is monitored and managed through PCE&apos;s energy software.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lineup.map((item, i) => <LineupCard key={item.name} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section style={{ background: "linear-gradient(180deg, #060d1f 0%, #091528 100%)", padding: "40px 0 110px" }}>
        <div className="section-padding max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginBottom: 48 }}
          >
            <Eyebrow>Applications</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", maxWidth: 600, margin: 0 }}>
              What PCE storage does for you.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
            {useCases.map((u, i) => (
              <motion.div
                key={u.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group"
                style={{ padding: "32px 28px", background: "#07112a" }}
              >
                <u.icon size={22} style={{ color: CYAN, marginBottom: 18 }} />
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>{u.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.7, margin: 0 }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#091528", padding: "40px 0 110px" }}>
        <div className="section-padding max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden text-center"
            style={{ borderRadius: 28, padding: "clamp(48px, 7vw, 80px) clamp(20px, 5vw, 64px)" }}
          >
            <Image src="/product-storage-unit.png" alt="" fill className="object-cover" sizes="(max-width: 1440px) 100vw, 1300px" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,13,31,0.94) 0%, rgba(0,40,90,0.82) 100%)" }} />
            <div className="relative z-10">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: CYAN, opacity: 0.8, marginBottom: 16 }}>
                Let&apos;s Build Your System
              </p>
              <h2 style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Power that&apos;s ready when you are.
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
                Talk to our energy team about sizing, financing and deployment for your home, business or grid project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white text-sm"
                  style={{ padding: "15px 36px", background: "linear-gradient(135deg, #0058B3, #0070e0)", boxShadow: "0 8px 32px rgba(0,88,179,0.50)", textDecoration: "none" }}
                >
                  Request a Quote <ArrowRight size={15} />
                </Link>
                <Link
                  href="/investors"
                  className="inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm"
                  style={{ padding: "15px 36px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.88)", textDecoration: "none" }}
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
