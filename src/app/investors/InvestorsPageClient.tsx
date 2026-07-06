"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CTASection } from "@/components/sections/CTASection";
import { TrendingUp, Globe2, ShieldCheck, Leaf, ArrowRight, Zap, DollarSign, BarChart3, MapPin, Target, Users, FileText } from "lucide-react";
import Link from "next/link";

/* ─── Section wrapper ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Data ──────────────────────────────────────────────────── */
const keyMetrics = [
  { value: "2026",  label: "Year Founded",         sub: "Lagos, Nigeria" },
  { value: "$0",    label: "Operating Revenue",     sub: "Pre-revenue stage" },
  { value: "0",     label: "Active Markets",        sub: "Deployment commencing" },
  { value: "$0",    label: "Revenue / Station",     sub: "Operations not yet commenced" },
];

const revenueData = [
  { year: "2026", revenue: 0, label: "$0", actual: true },
  { year: "2027", revenue: 0, label: "$0", actual: false },
  { year: "2028", revenue: 0, label: "$0", actual: false },
  { year: "2029", revenue: 0, label: "$0", actual: false },
  { year: "2030", revenue: 0, label: "$0", actual: false },
];

const unitEconomics = [
  { label: "Avg revenue per station/month", value: "$0",    note: "Commercial operations not yet commenced" },
  { label: "Gross margin per session",       value: "—",    note: "No sessions recorded" },
  { label: "Payback period",                value: "TBD",   note: "Subject to deployment timeline" },
  { label: "EBITDA at scale",               value: "TBD",   note: "Pre-revenue projections pending" },
  { label: "Station lifetime",               value: "15 yrs",note: "ISO-certified hardware specification" },
  { label: "Software attach rate",           value: "0%",   note: "Platform in development" },
];

const breakEvenData = [
  { label: "Station CAPEX (350kW)", value: "$48K",  icon: DollarSign },
  { label: "Monthly OpEx",          value: "$420",  icon: BarChart3 },
  { label: "Revenue at 40% util.",  value: "TBD",   icon: TrendingUp },
  { label: "Gross profit/mo",       value: "TBD",   icon: Target },
  { label: "Cash payback",          value: "TBD",   icon: ShieldCheck },
  { label: "10-yr IRR",             value: "TBD",   icon: Zap },
];

const marketData = [
  { label: "Africa EV TAM (2030E)",    value: "$28B",  sub: "Total addressable market" },
  { label: "PCE SAM",                  value: "$6.2B", sub: "Target deployment markets" },
  { label: "EV sales growth (CAGR)",   value: "42%",   sub: "2024–2035 projection" },
  { label: "EV charging gap",          value: "94%",   sub: "Underserved demand today" },
];

const roadmapItems = [
  { year: "2026", event: "Founded in Lagos, Nigeria. Infrastructure planning and technology development begins.", done: true },
  { year: "Q3 2026", event: "Strategic partnerships and site acquisition across West Africa", done: false },
  { year: "Q4 2026", event: "Pilot station deployment — Lagos, Accra, Nairobi", done: false },
  { year: "2027", event: "Network expansion. PCE App beta launch. Seed revenue generation", done: false },
  { year: "2028", event: "Multi-country rollout. Energy storage integration begins", done: false },
  { year: "2029+", event: "Pan-African network. Fleet API platform. Carbon credit programme", done: false },
];

const whyPCE = [
  { icon: TrendingUp,  title: "42% CAGR",           desc: "Projected African EV market growth through 2035 — the largest energy transition in history." },
  { icon: Globe2,      title: "Pan-African Vision",  desc: "Strategic infrastructure deployment planned across multiple African markets with government engagement underway." },
  { icon: ShieldCheck, title: "Early-Stage Entry",   desc: "Positioned at the ground floor of Africa's EV revolution — infrastructure first, before the demand curve peaks." },
  { icon: Leaf,        title: "Net-Zero by Design",  desc: "100% renewable-powered network architecture, built for carbon credit eligibility from day one." },
  { icon: Users,       title: "Operator Model",      desc: "Platform designed for independent operators and fleet partnerships — a recurring revenue model for scale." },
  { icon: MapPin,      title: "First-Mover Moat",    desc: "Founding now positions PCE ahead of competition before dominant players establish a foothold in Africa." },
];

const revenueStreams = [
  { label: "Charging revenue",     pct: 0, color: "#0058B3" },
  { label: "SaaS & subscriptions", pct: 0, color: "#30E7ED" },
  { label: "Carbon credits",       pct: 0, color: "#3b82f6" },
];

export default function InvestorsPage() {
  // All bars render at a fixed minimum height to visually represent zero
  const BAR_HEIGHT = 8;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden min-h-[72vh] flex items-end pt-28"
        style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 50%, #060d1f 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(48,231,237,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(0,88,179,0.12) 0%, transparent 70%)" }} />

        <div className="relative section-padding w-full" style={{ paddingBottom: "clamp(42px, 7vh, 72px)" }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="font-bold text-white leading-[1.08] tracking-normal mb-4"
              style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", maxWidth: 620, textShadow: "0 3px 24px rgba(0,0,0,0.36)" }}>
              The infrastructure play<br />
              <span className="bg-clip-text text-transparent italic"
                style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #0058B3 100%)" }}>
                of the decade.
              </span>
            </h1>
            <p className="leading-relaxed mb-7"
              style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", maxWidth: 540 }}>
              Phoenix Creed Energy is building the connective tissue of Africa&apos;s electric
              economy — a $28B TAM with a 94% supply gap and no dominant player.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold"
                style={{ padding: "15px 30px", fontSize: 15, background: "#0058B3", color: "white", boxShadow: "0 4px 28px rgba(0,88,179,0.42)" }}>
                Request Investor Access <ArrowRight size={15} />
              </Link>
              <a
                href="/investor/Phoenix-Creed-Energy-Pitch-Deck.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium"
                style={{ padding: "15px 30px", fontSize: 15, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)", textDecoration: "none" }}>
                <FileText size={15} /> View Pitch Deck
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key metrics ── */}
      <section className="section-padding max-w-[1440px] mx-auto py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <div className="rounded-2xl p-6 md:p-8 group cursor-default transition-all duration-300"
                style={{ background: "#F5F7FA", border: "0.5px solid #E5E7EB" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,88,179,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,88,179,0.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                <div className="text-4xl md:text-5xl font-bold mb-1 tracking-tight" style={{ color: "#0058B3" }}>{m.value}</div>
                <div className="font-semibold text-pce-dark mb-1">{m.label}</div>
                <div className="text-pce-gray text-xs">{m.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Revenue section ── */}
      <section id="revenue-growth" className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <Reveal className="lg:w-2/5">
              <div className="chip mb-5">Financial Overview</div>
              <h2 className="text-3xl md:text-4xl font-bold text-pce-dark mb-4 leading-tight">
                Building Africa&apos;s EV Infrastructure Foundation
              </h2>
              <p className="text-pce-gray leading-relaxed mb-6">
                Phoenix Creed Energy was founded in 2026 and is currently focused on infrastructure deployment,
                technology development, strategic partnerships, and network expansion across Africa.
              </p>
              <div className="space-y-4 mb-8">
                {revenueStreams.map(r => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-pce-gray">{r.label}</span>
                      <span className="font-semibold text-pce-dark">{r.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: `linear-gradient(90deg, ${r.color}, #30E7ED)` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl" style={{ background: "rgba(0,88,179,0.06)", border: "1px solid rgba(0,88,179,0.15)" }}>
                <p className="text-sm font-semibold text-pce-dark mb-1">Revenue per station: $0</p>
                <p className="text-xs text-pce-gray">Commercial operations have not yet commenced.</p>
              </div>
            </Reveal>

            <Reveal className="lg:w-3/5" delay={0.1}>
              <div className="surface rounded-2xl p-6 md:p-8">
                <p className="text-xs font-bold tracking-[0.15em] text-pce-gray uppercase mb-6">Annual Revenue (USD)</p>
                <div className="flex items-end gap-4 h-48 mb-3">
                  {revenueData.map(d => (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-pce-dark">{d.label}</span>
                      <div className="w-full rounded-t-lg relative overflow-hidden" style={{
                        height: `${BAR_HEIGHT}px`,
                        background: d.actual ? "#0058B3" : "linear-gradient(180deg, #30E7ED, #0058B3)",
                        opacity: d.actual ? 1 : 0.75,
                      }}>
                        {!d.actual && (
                          <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.08) 4px, rgba(255,255,255,0.08) 8px)" }} />
                        )}
                      </div>
                      <span className="text-[10px] text-pce-gray font-medium">{d.year}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-pce-gray">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{background:"#0058B3"}} /> Actual</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm opacity-75" style={{background:"linear-gradient(135deg,#30E7ED,#0058B3)"}} /> Projected</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Network economics / Break-even ── */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <Reveal className="text-center mb-12">
          <div className="chip mx-auto mb-4">Unit Economics</div>
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Network economics</h2>
          <p className="text-pce-gray text-lg max-w-xl mx-auto">Projections are based on hardware specifications and market analysis. Commercial operations have not yet commenced.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Unit economics table */}
          <Reveal>
            <div className="surface rounded-2xl p-6 md:p-8 h-full">
              <p className="text-xs font-bold tracking-[0.15em] text-pce-gray uppercase mb-5">Per-Station Metrics</p>
              <div className="space-y-4">
                {unitEconomics.map((u, i) => (
                  <div key={u.label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F2F5" }}>
                    <div>
                      <p className="font-medium text-pce-dark text-sm">{u.label}</p>
                      <p className="text-xs text-pce-gray">{u.note}</p>
                    </div>
                    <span className="font-bold text-lg shrink-0 ml-4" style={{ color: i % 2 === 0 ? "#0058B3" : "#30E7ED" }}>{u.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Break-even analysis */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl p-6 md:p-8 h-full" style={{ background: "linear-gradient(135deg, #060d1f 0%, #0a1628 100%)", border: "1px solid rgba(48,231,237,0.15)" }}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase mb-5" style={{ color: "#30E7ED" }}>350kW Station — Projected Model</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {breakEvenData.map((b, i) => (
                  <div key={b.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(48,231,237,0.10)" }}>
                    <b.icon size={14} style={{ color: "#30E7ED", marginBottom: 4 }} />
                    <p className="text-white font-bold text-base">{b.value}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>{b.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Cash Payback Timeline — Projected</p>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{ width: "0%", background: "linear-gradient(90deg, #30E7ED, #0058B3)" }} />
              </div>
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                <span>Pre-revenue</span><span>Operations pending</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Africa EV market opportunity ── */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="chip mx-auto mb-4">Market Opportunity</div>
            <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Africa EV market opportunity</h2>
            <p className="text-pce-gray text-lg max-w-2xl mx-auto">
              1.4 billion people. 54 countries. A $28B charging market by 2030 — and today,
              94% of demand is completely unserved. PCE is positioning now, before the curve peaks.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {marketData.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08}>
                <div className="surface rounded-2xl p-6 text-center group cursor-default transition-all duration-300"
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,88,179,0.1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: "#0058B3" }}>{m.value}</div>
                  <div className="font-semibold text-pce-dark mb-1 text-sm">{m.label}</div>
                  <div className="text-pce-gray text-xs">{m.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* TAM/SAM/SOM visual */}
          <Reveal>
            <div className="surface rounded-2xl p-8 md:p-10">
              <p className="text-xs font-bold tracking-[0.15em] text-pce-gray uppercase mb-8 text-center">Market Sizing — TAM / SAM / SOM</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {[
                  { label: "TAM", value: "$28B",  sub: "Africa EV charging 2030E", size: 160, opacity: 1 },
                  { label: "SAM", value: "$6.2B", sub: "PCE target markets",       size: 120, opacity: 0.8 },
                  { label: "SOM", value: "TBD",   sub: "PCE serviceable market",   size: 88,  opacity: 1 },
                ].map(m => (
                  <div key={m.label} className="flex flex-col items-center gap-3">
                    <div className="rounded-full flex flex-col items-center justify-center" style={{
                      width: m.size, height: m.size,
                      background: `rgba(0,88,179,${m.opacity * 0.12})`,
                      border: `2px solid rgba(0,88,179,${m.opacity * 0.3})`,
                    }}>
                      <span className="font-bold text-pce-dark" style={{ fontSize: m.size > 130 ? 20 : 16 }}>{m.value}</span>
                      <span className="text-[10px] text-pce-gray font-bold">{m.label}</span>
                    </div>
                    <p className="text-xs text-pce-gray text-center max-w-28">{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Why PCE ── */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Why PCE wins</h2>
          <p className="text-pce-gray text-lg max-w-xl mx-auto">Six structural advantages that compound over time.</p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyPCE.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="surface surface-hover rounded-2xl p-8 flex gap-5 h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,88,179,0.08)", border: "0.5px solid rgba(0,88,179,0.12)" }}>
                  <h.icon size={22} style={{ color: "#0058B3" }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-pce-dark mb-2">{h.title}</h3>
                  <p className="text-pce-gray text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Expansion roadmap ── */}
      <section className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "linear-gradient(180deg, #060d1f 0%, #0a1628 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold tracking-widest uppercase"
              style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.25)", color: "#30E7ED" }}>
              Roadmap
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Expansion roadmap</h2>
            <p className="text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>From founding to a pan-African network.</p>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, rgba(48,231,237,0.6), rgba(0,88,179,0.2))" }} />
            <div className="flex flex-col gap-6">
              {roadmapItems.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.07}>
                  <div className="flex gap-8 items-start pl-16 relative">
                    <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full border-2 -translate-x-1/2 shrink-0"
                      style={{
                        background: m.done ? "#30E7ED" : "#0058B3",
                        borderColor: m.done ? "rgba(48,231,237,0.4)" : "rgba(0,88,179,0.4)",
                        boxShadow: m.done ? "0 0 8px rgba(48,231,237,0.5)" : "none",
                      }} />
                    <div className="px-3 py-1 rounded-lg shrink-0"
                      style={{ background: m.done ? "rgba(48,231,237,0.10)" : "rgba(0,88,179,0.15)", border: `0.5px solid ${m.done ? "rgba(48,231,237,0.25)" : "rgba(0,88,179,0.3)"}` }}>
                      <span className="font-bold text-sm" style={{ color: m.done ? "#30E7ED" : "rgba(255,255,255,0.7)" }}>{m.year}</span>
                    </div>
                    <p className="pt-1 text-sm" style={{ color: m.done ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.5)" }}>{m.event}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── IR contact ── */}
      <section className="section-padding max-w-[1440px] mx-auto py-14">
        <Reveal>
          <div className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background: "#0058B3", boxShadow: "0 8px 32px rgba(0,88,179,0.25)" }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Speak with our IR team</h2>
              <p className="text-blue-200">Access our data room, pitch deck, and early-stage disclosures.</p>
              <p className="text-blue-300 text-sm mt-2">ir@phoenixcreedenergy.com · Lagos, Nigeria</p>
            </div>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-deep-blue font-semibold shrink-0 hover:bg-blue-50 transition-all duration-200">
              Request Access <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
