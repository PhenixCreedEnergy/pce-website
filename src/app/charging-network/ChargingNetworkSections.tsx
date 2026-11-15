"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Clock, Shield, Wifi, Globe2, Activity, Users, Timer, MapPin } from "lucide-react";
import {
  AFRICA_PATH,
  cities,
  features as networkFeatures,
  getCity,
  routePath,
  routes,
  statsCards,
} from "@/components/sections/NetworkMapSection";
import { useCountUp } from "@/components/sections/CTASection";

const EASE = [0.16, 1, 0.3, 1] as const;

// Abuja, Accra and Lagos sit within ~25 units of each other; nudge their labels apart.
const LABEL_OFFSETS: Record<string, { dx: number; dy: number; anchor: "start" | "end" }> = {
  accra: { dx: -10, dy: 4,  anchor: "end" },
  abuja: { dx: 10,  dy: -4, anchor: "start" },
  lagos: { dx: 11,  dy: 15, anchor: "start" },
};
const NAVY = "#060d1f";

/* ─── Shared bits ────────────────────────────────────────────── */
function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase"
      style={dark
        ? { background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.25)", color: "#30E7ED" }
        : { background: "rgba(0,88,179,0.07)", border: "1px solid rgba(0,88,179,0.14)", color: "#0058B3" }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dark ? "#30E7ED" : "#0058B3" }} />
      {children}
    </div>
  );
}

function useReveal<T extends HTMLElement>(margin = "-10%") {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}%` });
  return [ref, inView] as const;
}

/* ─── 1. Network coverage ────────────────────────────────────── */
// Same copy, map data and stats as the shared NetworkMapSection, laid out as a
// dashboard: copy + features on the left, map panel with a stats rail on the right.
export function NetworkCoverage() {
  const [ref, inView] = useReveal<HTMLElement>("-8%");
  const maxStations = Math.max(...cities.map((c) => c.stations));
  const ranked = [...cities].sort((a, b) => b.stations - a.stations);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 40%, black 30%, transparent 80%)",
        }} />
        <div className="absolute -right-40 top-10 w-[640px] h-[640px] rounded-full" style={{ background: "radial-gradient(circle, rgba(48,231,237,0.07) 0%, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute -left-40 bottom-0 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,88,179,0.14) 0%, transparent 65%)", filter: "blur(40px)" }} />
      </div>

      <div className="relative section-padding max-w-[1440px] mx-auto py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start">

          {/* Copy + features */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:sticky lg:top-28"
          >
            <Eyebrow dark>Charging Network</Eyebrow>
            <h2 className="font-bold text-white leading-[1.04] tracking-tight mt-6 mb-5" style={{ fontSize: "clamp(2.1rem, 3.6vw, 3.6rem)" }}>
              Powering every<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #4d8dff 100%)" }}>
                route in Africa.
              </span>
            </h2>
            <p className="leading-relaxed text-base md:text-lg mb-10" style={{ color: "rgba(255,255,255,0.6)", maxWidth: 460 }}>
              Our intelligent charging network connects Africa&apos;s largest cities,
              highways, airports, and commercial hubs — with 350kW ultra-fast
              power at every node.
            </p>

            <ul className="m-0 p-0 list-none" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {networkFeatures.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
                  className="group flex gap-4 py-5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(48,231,237,0.16)]"
                    style={{ background: "rgba(48,231,237,0.08)", border: "1px solid rgba(48,231,237,0.18)" }}>
                    <f.icon size={18} style={{ color: "#30E7ED" }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-[15px] mb-1">{f.title}</h3>
                    <p className="text-sm leading-relaxed m-0" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <Link href="#charging-speeds"
              className="group inline-flex items-center gap-2 mt-8 text-sm font-semibold"
              style={{ color: "#30E7ED" }}>
              Explore the full network
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Map panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(10,22,48,0.95) 0%, rgba(6,13,31,0.98) 100%)",
              border: "1px solid rgba(48,231,237,0.14)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} style={{ color: "#30E7ED" }} />
                <span className="text-white text-sm font-semibold">Network map</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest" style={{ color: "#30E7ED" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
                LIVE
              </div>
            </div>

            <div className="grid md:grid-cols-[minmax(0,1fr)_220px]">
              {/* Map */}
              <div className="relative p-3 md:p-5">
                <svg viewBox="0 0 500 560" className="w-full block" role="img" aria-label="Map of PCE charging hubs across Africa">
                  <defs>
                    <filter id="cnGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="cnFill" cx="45%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="rgba(0,88,179,0.20)" />
                      <stop offset="100%" stopColor="rgba(0,88,179,0.04)" />
                    </radialGradient>
                    <radialGradient id="cnNode" cx="40%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#30E7ED" />
                      <stop offset="100%" stopColor="#0058B3" />
                    </radialGradient>
                    {routes.map(([a, b]) => (
                      <path key={`cn-${a}-${b}`} id={`cn-route-${a}-${b}`} d={routePath(getCity(a), getCity(b))} fill="none" />
                    ))}
                  </defs>

                  <path d={AFRICA_PATH} fill="url(#cnFill)" stroke="rgba(48,231,237,0.28)" strokeWidth="0.9" />

                  {routes.map(([a, b, offset], i) => {
                    const d = routePath(getCity(a), getCity(b));
                    return (
                      <g key={`cn-r-${i}`}>
                        <motion.path d={d} fill="none" stroke="rgba(48,231,237,0.38)" strokeWidth="0.8" strokeDasharray="3 4"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                          transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeOut" }} />
                        {inView && (
                          <circle r="2.4" fill="#30E7ED" filter="url(#cnGlow)">
                            <animateMotion dur={`${2.8 + offset * 0.3}s`} begin={`${offset * 0.6}s`} repeatCount="indefinite">
                              <mpath href={`#cn-route-${a}-${b}`} />
                            </animateMotion>
                          </circle>
                        )}
                      </g>
                    );
                  })}

                  {cities.map((c, i) => {
                    const fallback = c.cx > 250
                      ? { dx: -(c.r + 7), dy: 5, anchor: "end" as const }
                      : { dx: c.r + 7, dy: 5, anchor: "start" as const };
                    const label = LABEL_OFFSETS[c.id] ?? fallback;
                    return (
                      <motion.g key={c.id}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}>
                        <circle cx={c.cx} cy={c.cy} r={c.r + 6} fill="none" stroke="rgba(48,231,237,0.25)" strokeWidth="1">
                          <animate attributeName="r" values={`${c.r + 3};${c.r + 13};${c.r + 3}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                        </circle>
                        <circle cx={c.cx} cy={c.cy} r={c.r} fill="url(#cnNode)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                        <circle cx={c.cx} cy={c.cy} r={1.4} fill="#fff" />
                        <text
                          x={c.cx + label.dx}
                          y={c.cy + label.dy}
                          textAnchor={label.anchor}
                          fill="rgba(255,255,255,0.88)"
                          fontSize="15"
                          fontWeight="600"
                          style={{ paintOrder: "stroke", stroke: NAVY, strokeWidth: 3 }}
                        >
                          {c.name}
                        </text>
                      </motion.g>
                    );
                  })}
                </svg>
              </div>

              {/* Stations by city */}
              <div className="px-5 md:px-5 py-5 md:border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Stations by city
                </p>
                <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-1 gap-x-5 gap-y-3.5">
                  {ranked.map((c, i) => (
                    <li key={c.id}>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <span className="text-white text-[13px] font-medium truncate">{c.name}</span>
                        <span className="text-[12px] font-semibold tabular-nums" style={{ color: "#30E7ED" }}>{c.stations}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <motion.div className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${(c.stations / maxStations) * 100}%` } : {}}
                          transition={{ duration: 1, delay: 0.6 + i * 0.07, ease: EASE }} />
                      </div>
                      <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{c.country}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats rail — 1px gaps over a tinted backdrop draw the dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {statsCards.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="px-5 md:px-6 py-5"
                  style={{ background: "#08122a" }}
                >
                  <p className="font-bold leading-none mb-1.5 tabular-nums" style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)", color: "#30E7ED" }}>{s.value}</p>
                  <p className="text-xs m-0" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Charging speeds ─────────────────────────────────────── */
const tiers = [
  { name: "PCE Standard",    kw: 22,  speed: "22 kW",  type: "AC Level 2",     time: "~4 hours", ideal: "Hotels & offices",    badge: null,      featured: false },
  { name: "PCE Fast",        kw: 150, speed: "150 kW", type: "DC Fast Charge", time: "~30 min",  ideal: "Shopping centres",    badge: "Popular", featured: false },
  { name: "PCE SuperCharge", kw: 350, speed: "350 kW", type: "DC Ultra-Fast",  time: "~10 min",  ideal: "Highways & airports", badge: "Fastest", featured: true  },
];

export function ChargingSpeeds() {
  const [ref, inView] = useReveal<HTMLElement>();

  return (
    <section ref={ref} id="charging-speeds" className="relative bg-white py-20 md:py-28 lg:py-32 scroll-mt-20">
      <div className="section-padding max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <Eyebrow>Charging Speeds</Eyebrow>
            <h2 className="font-bold text-pce-dark leading-[1.05] tracking-tight mt-5" style={{ fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}>
              Choose your speed
            </h2>
          </div>
          <p className="text-pce-gray text-base md:text-lg leading-relaxed m-0" style={{ maxWidth: 440 }}>
            From overnight hotel parking to highway pit stops — every PCE station is purpose-built.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {tiers.map((t, i) => {
            const dark = t.featured;
            const muted = dark ? "rgba(255,255,255,0.6)" : "#6B7280";
            const line = dark ? "rgba(255,255,255,0.1)" : "#EEF0F3";
            return (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
                className="relative flex flex-col rounded-3xl p-7 md:p-8 transition-transform duration-300 hover:-translate-y-1"
                style={dark
                  ? { background: "linear-gradient(160deg, #0a3d7a 0%, #0058B3 55%, #0a6fd8 100%)", boxShadow: "0 24px 60px rgba(0,88,179,0.35)" }
                  : { background: "#fff", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)" }}
              >
                {dark && (
                  <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden" aria-hidden>
                    <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(48,231,237,0.35) 0%, transparent 70%)" }} />
                  </div>
                )}

                <div className="relative flex items-center justify-between mb-8">
                  <span className={`text-sm font-semibold ${dark ? "text-white" : "text-pce-dark"}`}>{t.name}</span>
                  {t.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide"
                      style={dark ? { background: "rgba(48,231,237,0.2)", color: "#30E7ED" } : { background: "rgba(0,88,179,0.08)", color: "#0058B3" }}>
                      {t.badge}
                    </span>
                  )}
                </div>

                <div className="relative mb-2 font-bold leading-none tracking-tight tabular-nums"
                  style={{ fontSize: "clamp(2.8rem, 4.4vw, 4rem)", color: dark ? "#fff" : "#0058B3" }}>
                  {t.speed}
                </div>
                <div className="relative text-sm mb-6" style={{ color: muted }}>{t.type}</div>

                {/* Power meter — relative to 350 kW peak */}
                <div className="relative mb-8">
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: dark ? "rgba(255,255,255,0.15)" : "#EEF2F7" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: dark ? "linear-gradient(90deg, #30E7ED, #ffffff)" : "linear-gradient(90deg, #0058B3, #30E7ED)" }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${Math.max((t.kw / 350) * 100, 6)}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: EASE }} />
                  </div>
                </div>

                <dl className="relative mt-auto m-0 text-sm">
                  {[
                    { icon: Timer, label: "Full charge", value: t.time },
                    { icon: MapPin, label: "Ideal for", value: t.ideal },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 py-3" style={{ borderTop: `1px solid ${line}` }}>
                      <dt className="flex items-center gap-2" style={{ color: muted }}>
                        <row.icon size={14} style={{ color: dark ? "#30E7ED" : "#0058B3" }} />
                        {row.label}
                      </dt>
                      <dd className={`m-0 font-semibold text-right ${dark ? "text-white" : "text-pce-dark"}`}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Built to last ───────────────────────────────────────── */
const builtFeatures = [
  { icon: Zap,    title: "350kW Peak Power",   desc: "Add 100 km of range in under 5 minutes" },
  { icon: Clock,  title: "24/7 Operations",    desc: "Round-the-clock support and live monitoring" },
  { icon: Shield, title: "ISO Certified",      desc: "Meets international EV charging safety standards" },
  { icon: Wifi,   title: "Always Connected",   desc: "Real-time diagnostics and OTA firmware updates" },
];

export function BuiltToLast() {
  const [ref, inView] = useReveal<HTMLElement>();
  const [lead, ...rest] = builtFeatures;

  return (
    <section ref={ref} className="relative bg-pce-gray-light py-20 md:py-28 lg:py-32">
      <div className="section-padding max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-bold text-pce-dark leading-[1.05] tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}>
            Built to last
          </h2>
          <p className="text-pce-gray text-base md:text-lg m-0">Infrastructure you can depend on.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Lead card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-3xl min-h-[380px] lg:min-h-full flex flex-col justify-end p-7 md:p-10"
            style={{ background: NAVY }}
          >
            <Image src="/product-ev-charger.png" alt="PCE ultra-fast charger" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ opacity: 0.55 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,0.96) 10%, rgba(6,13,31,0.55) 55%, rgba(6,13,31,0.15) 100%)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: "rgba(48,231,237,0.14)", border: "1px solid rgba(48,231,237,0.3)" }}>
                <lead.icon size={22} style={{ color: "#30E7ED" }} />
              </div>
              <h3 className="text-white font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)" }}>{lead.title}</h3>
              <p className="m-0 text-base md:text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>{lead.desc}</p>
            </div>
          </motion.div>

          {/* Supporting cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6">
            {rest.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                className="group flex items-start gap-5 rounded-3xl bg-white p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)" }}
              >
                <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-deep-blue"
                  style={{ background: "rgba(0,88,179,0.08)" }}>
                  <f.icon size={20} className="text-deep-blue transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-pce-dark text-lg mb-1.5">{f.title}</h3>
                  <p className="text-pce-gray text-sm md:text-[15px] leading-relaxed m-0">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Closing CTA ─────────────────────────────────────────── */
function CtaStat({ icon: Icon, target, suffix = "", text, label, active }: {
  icon: React.ElementType; target?: number; suffix?: string; text?: string; label: string; active: boolean;
}) {
  const n = useCountUp(target ?? 0, active && target !== undefined);
  return (
    <div className="rounded-2xl p-4 md:p-5" style={{ background: "rgba(6,13,31,0.62)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
      <Icon size={16} style={{ color: "#30E7ED" }} className="mb-4" />
      <p className="text-white font-bold leading-none mb-2 tabular-nums" style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)" }}>
        {target !== undefined ? `${n.toLocaleString()}${suffix}` : text}
      </p>
      <p className="m-0 text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
    </div>
  );
}

export function ChargingCTA() {
  const [ref, inView] = useReveal<HTMLElement>("-5%");

  return (
    <section ref={ref} className="bg-white py-16 md:py-24">
      <div className="section-padding max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] grid lg:grid-cols-2"
          style={{ background: NAVY }}
        >
          {/* Copy */}
          <div className="relative z-10 px-6 py-14 md:px-12 md:py-20 lg:px-16">
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.6), transparent)" }} />
            <Eyebrow dark>Join the Movement</Eyebrow>
            <h2 className="font-bold text-white leading-[1.02] tracking-tight mt-6 mb-6" style={{ fontSize: "clamp(2.2rem, 4.4vw, 4.2rem)" }}>
              Ready to charge<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #ffffff 0%, #30E7ED 60%, #4d8dff 100%)" }}>
                Africa&apos;s future?
              </span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.65)", maxWidth: 480 }}>
              Whether you&apos;re a fleet operator, property developer, or individual
              driver — PCE has a solution engineered for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <Link href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "#0058B3", boxShadow: "0 0 0 1px rgba(48,231,237,0.25), 0 10px 32px rgba(0,88,179,0.45)" }}>
                Get in Touch
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/pce-app"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" }}>
                Find a Charger
              </Link>
            </div>

            <p className="m-0 text-[11px] leading-relaxed tracking-[0.12em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
              Trusted by fleet operators · Backed by institutional investors · ISO-certified infrastructure
            </p>
          </div>

          {/* Visual + stats */}
          <div className="relative min-h-[420px] lg:min-h-full">
            <Image src="/fuel-station.png" alt="PCE charging station at dusk" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,13,31,0.92) 0%, rgba(6,13,31,0.25) 55%, rgba(6,13,31,0.1) 100%)" }} />
            <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(6,13,31,1) 0%, rgba(6,13,31,0) 30%)" }} />
            <div className="absolute left-0 right-0 bottom-0 p-5 md:p-8 grid grid-cols-2 gap-3">
              <CtaStat icon={Zap}      target={2500} suffix="+" label="Charging Stations" active={inView} />
              <CtaStat icon={Globe2}   target={18}              label="Countries"         active={inView} />
              <CtaStat icon={Activity} target={98}   suffix="%" label="Network Uptime"    active={inView} />
              <CtaStat icon={Users}    text="1M+"               label="Sessions Served"   active={inView} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
