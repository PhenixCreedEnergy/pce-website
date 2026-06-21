"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MapPin, Cpu, Globe2 } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────── */
const cities = [
  { id: "casablanca",    name: "Casablanca",    country: "Morocco",      cx: 132, cy: 78,  r: 5,   stations: 48  },
  { id: "cairo",         name: "Cairo",         country: "Egypt",        cx: 332, cy: 72,  r: 6,   stations: 120 },
  { id: "abuja",         name: "Abuja",         country: "Nigeria",      cx: 190, cy: 218, r: 5.5, stations: 85  },
  { id: "accra",         name: "Accra",         country: "Ghana",        cx: 160, cy: 232, r: 5,   stations: 62  },
  { id: "lagos",         name: "Lagos",         country: "Nigeria",      cx: 185, cy: 240, r: 7,   stations: 210 },
  { id: "nairobi",       name: "Nairobi",       country: "Kenya",        cx: 352, cy: 272, r: 6.5, stations: 175 },
  { id: "johannesburg",  name: "Johannesburg",  country: "South Africa", cx: 300, cy: 448, r: 6.5, stations: 198 },
  { id: "cape_town",     name: "Cape Town",     country: "South Africa", cx: 252, cy: 500, r: 5,   stations: 94  },
];

// [fromId, toId, packet delay offset]
const routes: [string, string, number][] = [
  ["casablanca", "cairo",        0],
  ["casablanca", "lagos",        0.8],
  ["cairo",      "nairobi",      0.4],
  ["lagos",      "accra",        0.2],
  ["lagos",      "abuja",        1.0],
  ["lagos",      "nairobi",      1.6],
  ["nairobi",    "johannesburg", 0.6],
  ["johannesburg","cape_town",   0.3],
  ["abuja",      "cairo",        1.2],
  ["johannesburg","lagos",       2.0],
];

const statsCards = [
  { value: "2,500+", label: "Charging Stations", top: "8%",  left: "58%"  },
  { value: "18",     label: "Countries",          top: "34%", left: "60%"  },
  { value: "98%",    label: "Network Uptime",     top: "58%", left: "0%"   },
  { value: "350kW",  label: "Ultra-Fast Power",   top: "76%", left: "58%"  },
];

const features = [
  { icon: Zap,    title: "350kW Fast Charging",    desc: "Add 100 km of range in under 5 minutes at every SuperCharge node." },
  { icon: MapPin, title: "Live Availability",       desc: "Real-time station data — find open bays before you arrive." },
  { icon: Cpu,    title: "Smart Energy Routing",    desc: "AI dispatching balances load across the grid automatically." },
  { icon: Globe2, title: "Pan-African Coverage",    desc: "18 countries, 2,500+ stations — and expanding every month." },
];

/* ─── Africa SVG path ────────────────────────────────────────── */
const AFRICA_PATH = `
  M 135,55 L 175,42 L 230,38 L 275,48 L 322,54 L 345,68
  L 352,88 L 362,118 L 372,145 L 378,168 L 390,188
  L 395,215 L 385,245 L 372,278 L 368,310 L 360,345
  L 348,375 L 338,405 L 325,432 L 310,455 L 295,475
  L 275,495 L 255,508 L 238,498 L 222,478 L 208,452
  L 195,422 L 182,388 L 170,355 L 160,318 L 148,285
  L 138,255 L 128,228 L 115,205 L 108,185 L 100,165
  L 92,148 L 88,132 L 86,118 L 90,105 L 100,92
  L 110,80 L 120,67 L 132,55 Z
`;

/* ─── Helpers ────────────────────────────────────────────────── */
function getCity(id: string) {
  return cities.find((c) => c.id === id)!;
}

function routePath(from: { cx: number; cy: number }, to: { cx: number; cy: number }) {
  // Slight cubic curve for organic feel
  const mx = (from.cx + to.cx) / 2;
  const my = (from.cy + to.cy) / 2 - Math.abs(to.cx - from.cx) * 0.18;
  return `M ${from.cx},${from.cy} Q ${mx},${my} ${to.cx},${to.cy}`;
}

/* ─── Main component ──────────────────────────────────────────── */
export function NetworkMapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1f 0%, #080f22 50%, #060d1f 100%)" }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        {/* Left glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(0,88,179,0.10) 0%, transparent 70%)", filter: "blur(60px)" }} />
        {/* Right glow behind map */}
        <div className="absolute right-0 top-1/3 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(48,231,237,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="relative section-padding max-w-[1440px] mx-auto py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* ── LEFT: Copy + feature cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[42%] flex flex-col"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 self-start text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.25)", color: "#30E7ED" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
              Charging Network
            </div>

            {/* Headline */}
            <h2 className="font-bold text-white leading-[1.02] tracking-tight mb-5" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)" }}>
              Powering every<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #0058B3 100%)" }}>
                major route in Africa.
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-gray-400 leading-relaxed mb-10 text-base md:text-lg" style={{ maxWidth: 420 }}>
              Our intelligent charging network connects Africa's largest cities,
              highways, airports, and commercial hubs — with 350kW ultra-fast
              power at every node.
            </p>

            {/* Feature icon cards — 2×2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl p-4 cursor-default transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(48,231,237,0.14)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(48,231,237,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.35)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(48,231,237,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.14)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "rgba(48,231,237,0.12)", border: "1px solid rgba(48,231,237,0.2)" }}>
                    <f.icon size={16} style={{ color: "#30E7ED" }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
            >
              <Link href="/charging-network"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
                style={{ color: "#30E7ED" }}>
                Explore the full network
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Premium Africa network map ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[58%] relative"
          >
            {/* Map container */}
            <div className="relative rounded-3xl overflow-hidden" style={{
              background: "linear-gradient(145deg, rgba(5,12,30,0.95) 0%, rgba(8,15,35,0.98) 100%)",
              border: "1px solid rgba(48,231,237,0.12)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 64px rgba(0,0,0,0.5), inset 0 0 120px rgba(0,88,179,0.05)",
              padding: "12px",
            }}>

              {/* Inner glow rim */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: "inset 0 0 60px rgba(48,231,237,0.04)" }} />

              {/* SVG map */}
              <svg
                viewBox="0 0 500 560"
                className="w-full"
                style={{ display: "block" }}
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glow filters */}
                  <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="continentGlow" x="-5%" y="-5%" width="110%" height="110%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>

                  {/* Gradient for continent fill */}
                  <radialGradient id="continentFill" cx="45%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="rgba(0,88,179,0.12)" />
                    <stop offset="100%" stopColor="rgba(0,88,179,0.04)" />
                  </radialGradient>

                  {/* Node gradient */}
                  <radialGradient id="nodeGradient" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#30E7ED" />
                    <stop offset="100%" stopColor="#0058B3" />
                  </radialGradient>

                  {/* Route paths for animateMotion */}
                  {routes.map(([fromId, toId]) => {
                    const from = getCity(fromId);
                    const to = getCity(toId);
                    return (
                      <path
                        key={`path-${fromId}-${toId}`}
                        id={`route-${fromId}-${toId}`}
                        d={routePath(from, to)}
                        fill="none"
                      />
                    );
                  })}
                </defs>

                {/* ── Africa continent fill ── */}
                <path
                  d={AFRICA_PATH}
                  fill="url(#continentFill)"
                  filter="url(#continentGlow)"
                />
                {/* Continent border — outer glow */}
                <path
                  d={AFRICA_PATH}
                  fill="none"
                  stroke="rgba(0,88,179,0.15)"
                  strokeWidth="3"
                  filter="url(#continentGlow)"
                />
                {/* Continent border — sharp inner */}
                <path
                  d={AFRICA_PATH}
                  fill="none"
                  stroke="rgba(48,231,237,0.25)"
                  strokeWidth="0.8"
                />

                {/* ── Connection routes ── */}
                {routes.map(([fromId, toId, offset], i) => {
                  const from = getCity(fromId);
                  const to = getCity(toId);
                  const d = routePath(from, to);
                  return (
                    <g key={`route-${i}`}>
                      {/* Glow line */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(0,88,179,0.25)"
                        strokeWidth="2.5"
                        filter="url(#lineGlow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.12, ease: "easeOut" }}
                      />
                      {/* Sharp line */}
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(48,231,237,0.35)"
                        strokeWidth="0.7"
                        strokeDasharray="3 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.12, ease: "easeOut" }}
                      />
                      {/* Data packet — forward */}
                      {inView && (
                        <circle r="2.5" fill="#30E7ED" filter="url(#nodeGlow)" opacity="0.9">
                          <animateMotion
                            dur={`${2.8 + (offset as number) * 0.3}s`}
                            begin={`${(offset as number) * 0.6}s`}
                            repeatCount="indefinite"
                          >
                            <mpath href={`#route-${fromId}-${toId}`} />
                          </animateMotion>
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* ── City nodes ── */}
                {cities.map((city, i) => (
                  <g key={city.id}>
                    {/* Outer pulse ring 1 */}
                    <circle cx={city.cx} cy={city.cy} r={city.r + 8} fill="none" stroke="rgba(48,231,237,0.15)" strokeWidth="1">
                      <animate attributeName="r" values={`${city.r+4};${city.r+14};${city.r+4}`} dur="3s" begin={`${i*0.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin={`${i*0.5}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Outer pulse ring 2 (offset) */}
                    <circle cx={city.cx} cy={city.cy} r={city.r + 4} fill="none" stroke="rgba(48,231,237,0.25)" strokeWidth="0.8">
                      <animate attributeName="r" values={`${city.r+2};${city.r+10};${city.r+2}`} dur="3s" begin={`${i*0.5+1.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" begin={`${i*0.5+1.5}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Node glow halo */}
                    <motion.circle
                      cx={city.cx} cy={city.cy} r={city.r + 3}
                      fill="rgba(0,88,179,0.3)"
                      filter="url(#nodeGlow)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: `${city.cx}px ${city.cy}px` }}
                    />
                    {/* Core node */}
                    <motion.circle
                      cx={city.cx} cy={city.cy} r={city.r}
                      fill="url(#nodeGradient)"
                      stroke="rgba(255,255,255,0.6)"
                      strokeWidth="0.8"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: `${city.cx}px ${city.cy}px` }}
                    />
                    {/* Center dot */}
                    <motion.circle
                      cx={city.cx} cy={city.cy} r={1.5}
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  </g>
                ))}
              </svg>

              {/* ── City label chips (HTML overlay) ── */}
              {cities.map((city, i) => {
                // Convert SVG coords (viewBox 500×560) to % for overlay
                const leftPct = (city.cx / 500) * 100;
                const topPct = (city.cy / 560) * 100;
                // Offset label to not overlap node
                const offsetX = city.cx > 250 ? -105 : 10;
                const offsetY = city.cy > 420 ? -28 : -32;
                return (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: `translate(${offsetX}px, ${offsetY}px)`,
                    }}
                  >
                    <div style={{
                      background: "rgba(6,13,31,0.88)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(48,231,237,0.25)",
                      borderRadius: 8,
                      padding: "4px 8px",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                    }}>
                      <p className="text-white font-bold" style={{ fontSize: 9 }}>{city.name}</p>
                      <p style={{ fontSize: 7, color: "#30E7ED" }}>{city.stations} stations</p>
                    </div>
                    {/* Connector line from label to node */}
                    <svg className="absolute" style={{
                      width: 1, height: Math.abs(offsetY) - 4,
                      left: offsetX < 0 ? "calc(100% - 1px)" : 0,
                      top: offsetY < 0 ? "100%" : undefined,
                      bottom: offsetY >= 0 ? "100%" : undefined,
                    }}>
                      <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(48,231,237,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                    </svg>
                  </motion.div>
                );
              })}

              {/* ── Floating glass stat cards ── */}
              {statsCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                  style={{
                    top: card.top,
                    left: card.left,
                    background: "rgba(6,13,31,0.80)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(48,231,237,0.25)",
                    borderRadius: 14,
                    padding: "10px 14px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(48,231,237,0.06)",
                    zIndex: 20,
                    minWidth: 100,
                  }}
                >
                  {/* Top electric accent */}
                  <div className="absolute top-0 left-3 right-3 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.6), transparent)" }} />
                  <p className="font-bold text-white" style={{ fontSize: 18, lineHeight: 1.1, color: "#30E7ED", textShadow: "0 0 12px rgba(48,231,237,0.4)" }}>{card.value}</p>
                  <p className="text-gray-400" style={{ fontSize: 9, marginTop: 2 }}>{card.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Glow beneath map */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full pointer-events-none" style={{ background: "rgba(0,88,179,0.12)", filter: "blur(30px)" }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
