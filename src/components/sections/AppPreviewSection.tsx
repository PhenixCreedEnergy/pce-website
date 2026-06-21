"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Zap, Battery, CreditCard, ArrowRight, Wifi, Signal } from "lucide-react";

/* ─── Count-up hook ─────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = parseFloat((eased * target).toFixed(decimals));
      setCount(val);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, decimals]);
  return count;
}

/* ─── App screens ───────────────────────────────────────────── */
function MapScreen() {
  return (
    <div className="flex flex-col h-full px-4 pb-4">
      <div className="flex items-center justify-between pt-2 pb-3">
        <div>
          <p className="text-[9px] text-gray-400">Good morning,</p>
          <p className="text-[13px] font-bold text-white">Find a Charger</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(48,231,237,0.15)", border: "1px solid rgba(48,231,237,0.3)" }}>
          <Zap size={13} style={{ color: "#30E7ED" }} fill="#30E7ED" />
        </div>
      </div>
      {/* Map */}
      <div className="relative rounded-2xl overflow-hidden mb-3 flex-1" style={{ background: "#0f1729", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,88,179,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.07) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
        {/* Road lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
          <path d="M0 75 Q50 60 100 75 Q150 90 200 75" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
          <path d="M100 0 Q110 50 100 75 Q90 110 100 150" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
        </svg>
        {/* Station pins */}
        {[{ x: 38, y: 34, active: true }, { x: 62, y: 55, active: false }, { x: 25, y: 62, active: false }, { x: 72, y: 28, active: false }].map((pin, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%,-50%)" }}
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }}>
            <div className="relative">
              {pin.active && <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(48,231,237,0.3)", transform: "scale(2)" }} />}
              <div className="w-4 h-4 rounded-full border-2 border-[#0f1729] flex items-center justify-center"
                style={{ background: pin.active ? "#30E7ED" : "#0058B3", boxShadow: pin.active ? "0 0 12px rgba(48,231,237,0.7)" : "0 0 8px rgba(0,88,179,0.5)" }}>
                <Zap size={7} color={pin.active ? "#0058B3" : "#fff"} fill={pin.active ? "#0058B3" : "#fff"} />
              </div>
            </div>
          </motion.div>
        ))}
        {/* User location */}
        <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
          <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white" style={{ boxShadow: "0 0 0 4px rgba(96,165,250,0.25)" }} />
        </div>
        {/* Distance labels */}
        <div className="absolute top-2 right-2 text-[7px] text-gray-400 bg-[#0f1729]/80 px-1.5 py-0.5 rounded-md">4 nearby</div>
      </div>
      {/* Nearest station */}
      <div className="rounded-xl p-3 mb-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[10px] font-bold text-white">PCE Hub V — Victoria Island</p>
          <span className="text-[9px] font-bold" style={{ color: "#30E7ED" }}>0.3 km</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full" style={{ width: "80%", background: "linear-gradient(90deg, #0058B3, #30E7ED)" }} />
          </div>
          <span className="text-[8px] text-gray-400">8 / 10 free</span>
        </div>
      </div>
      {/* Actions */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl p-2.5 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-[13px] font-bold" style={{ color: "#30E7ED" }}>₦2.4</p>
          <p className="text-[8px] text-gray-400">per kWh</p>
        </div>
        <div className="rounded-xl p-2.5 text-center text-white text-[10px] font-bold flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #0058B3, #0070e0)", boxShadow: "0 4px 12px rgba(0,88,179,0.4)" }}>
          Start Session
        </div>
      </div>
    </div>
  );
}

function ChargingScreen() {
  const [pct, setPct] = useState(34);
  useEffect(() => {
    const t = setInterval(() => setPct(p => p < 94 ? p + 1 : 34), 80);
    return () => clearInterval(t);
  }, []);
  const circumference = 2 * Math.PI * 52;
  return (
    <div className="flex flex-col h-full px-4 pb-4">
      <div className="flex items-center justify-between pt-2 pb-3">
        <p className="text-[13px] font-bold text-white">Charging</p>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(48,231,237,0.15)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
          <span className="text-[8px] font-bold" style={{ color: "#30E7ED" }}>LIVE</span>
        </div>
      </div>
      {/* Circular progress */}
      <div className="flex items-center justify-center my-4">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <motion.circle cx="60" cy="60" r="52" fill="none" stroke="url(#grad)" strokeWidth="6"
              strokeLinecap="round" strokeDasharray={circumference}
              strokeDashoffset={circumference - (pct / 100) * circumference}
              transition={{ duration: 0.08 }} />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0058B3" />
                <stop offset="100%" stopColor="#30E7ED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">{pct}%</p>
            <p className="text-[9px] text-gray-400 mt-0.5">charged</p>
          </div>
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[{ v: "23:14", l: "Time" }, { v: "18.4", l: "kWh" }, { v: "₦44", l: "Cost" }].map(s => (
          <div key={s.l} className="rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[12px] font-bold text-white">{s.v}</p>
            <p className="text-[7px] text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>
      {/* Power bar */}
      <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gray-400">Power draw</span>
          <span className="text-[9px] font-bold" style={{ color: "#30E7ED" }}>48 kW</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
            animate={{ width: ["60%", "75%", "60%"] }} transition={{ duration: 3, repeat: Infinity }} />
        </div>
      </div>
      <button className="mt-3 w-full py-2.5 rounded-xl text-[10px] font-bold text-white"
        style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.25)", color: "#fca5a5" }}>
        Stop Session
      </button>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex flex-col h-full px-4 pb-4">
      <div className="flex items-center justify-between pt-2 pb-3">
        <p className="text-[13px] font-bold text-white">Energy Dashboard</p>
        <span className="text-[8px] text-gray-400">This month</span>
      </div>
      {/* CO2 hero stat */}
      <div className="rounded-2xl p-4 mb-3 text-center" style={{ background: "linear-gradient(135deg, rgba(0,88,179,0.3), rgba(48,231,237,0.15))", border: "1px solid rgba(48,231,237,0.2)" }}>
        <p className="text-[8px] text-gray-400 mb-1">CO₂ Avoided</p>
        <p className="text-3xl font-bold" style={{ color: "#30E7ED" }}>128 kg</p>
        <p className="text-[8px] text-gray-400 mt-0.5">↑ 24% vs last month</p>
      </div>
      {/* Bar chart */}
      <div className="rounded-xl p-3 mb-3 flex-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[8px] text-gray-400 mb-2">kWh per week</p>
        <div className="flex items-end gap-1.5 h-16">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div key={i} className="flex-1 rounded-t-sm"
              style={{ background: i === 5 ? "linear-gradient(180deg, #30E7ED, #0058B3)" : "rgba(0,88,179,0.4)" }}
              initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.4 }} />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["M","T","W","T","F","S","S"].map((d, i) => (
            <span key={i} className="flex-1 text-center text-[6px] text-gray-500">{d}</span>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {[{ v: "247 kWh", l: "Total charged" }, { v: "12 trips", l: "Sessions" }].map(s => (
          <div key={s.l} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[12px] font-bold text-white">{s.v}</p>
            <p className="text-[7px] text-gray-400">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletScreen() {
  return (
    <div className="flex flex-col h-full px-4 pb-4">
      <div className="flex items-center justify-between pt-2 pb-3">
        <p className="text-[13px] font-bold text-white">PCE Wallet</p>
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(48,231,237,0.15)" }}>
          <CreditCard size={10} style={{ color: "#30E7ED" }} />
        </div>
      </div>
      {/* Balance card */}
      <div className="rounded-2xl p-4 mb-3" style={{ background: "linear-gradient(135deg, #0058B3 0%, #003d80 100%)", boxShadow: "0 8px 24px rgba(0,88,179,0.4)" }}>
        <p className="text-[8px] text-blue-200 mb-1">Available Balance</p>
        <p className="text-2xl font-bold text-white mb-3">₦ 14,250</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[7px] text-blue-300">Card</p>
            <p className="text-[9px] text-white font-semibold">•••• 4821</p>
          </div>
          <div className="text-right">
            <p className="text-[7px] text-blue-300">Savings</p>
            <p className="text-[9px]" style={{ color: "#30E7ED" }}>₦2,400 saved</p>
          </div>
        </div>
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[{ icon: "↑", l: "Top Up" }, { icon: "↓", l: "History" }, { icon: "⚡", l: "Auto" }].map(a => (
          <div key={a.l} className="rounded-xl p-2 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-sm text-white mb-0.5">{a.icon}</p>
            <p className="text-[7px] text-gray-400">{a.l}</p>
          </div>
        ))}
      </div>
      {/* Transactions */}
      <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[8px] text-gray-400 px-3 pt-2.5 pb-1.5">Recent</p>
        {[
          { loc: "PCE Hub V — VI", amt: "-₦96", time: "Today 09:14" },
          { loc: "PCE Hub II — Ikeja", amt: "-₦120", time: "Yesterday" },
        ].map((tx, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2" style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : undefined }}>
            <div>
              <p className="text-[9px] font-medium text-white">{tx.loc}</p>
              <p className="text-[7px] text-gray-500">{tx.time}</p>
            </div>
            <p className="text-[10px] font-bold text-white">{tx.amt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const screens = [
  { id: "map",       label: "Find & Navigate", component: MapScreen },
  { id: "charging",  label: "Live Charging",   component: ChargingScreen },
  { id: "dashboard", label: "Energy Stats",    component: DashboardScreen },
  { id: "wallet",    label: "PCE Wallet",      component: WalletScreen },
];

/* ─── Floating data card ─────────────────────────────────────── */
function FloatCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
      style={{
        background: "rgba(15,23,41,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(48,231,237,0.25)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(48,231,237,0.08)",
        padding: "12px 16px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glass feature card ──────────────────────────────────────── */
function GlassFeatureCard({ icon: Icon, title, desc, delay }: { icon: React.ElementType; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(48,231,237,0.18)",
        borderRadius: 20,
        padding: "24px",
        cursor: "default",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(48,231,237,0.12), 0 8px 24px rgba(0,0,0,0.3)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(48,231,237,0.18)";
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "rgba(48,231,237,0.12)", border: "1px solid rgba(48,231,237,0.2)" }}>
        <Icon size={18} style={{ color: "#30E7ED" }} />
      </div>
      <h3 className="font-semibold text-white mb-1.5 text-sm">{title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────── */
const features = [
  { icon: MapPin,     title: "Live Map",         desc: "Real-time availability across 2,500+ stations. No more guessing if a charger is free." },
  { icon: Zap,        title: "Instant Start",    desc: "NFC or QR tap — charging starts in under 30 seconds, every time." },
  { icon: Battery,    title: "Smart Scheduling", desc: "AI-powered off-peak charging saves you up to 40% on every session." },
  { icon: CreditCard, title: "Unified Wallet",   desc: "One balance, every PCE station, every country — seamless payments across Africa." },
];

export function AppPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeScreen, setActiveScreen] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => setActiveScreen(s => (s + 1) % screens.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(advance, 4000);
    return () => clearInterval(t);
  }, [advance, paused]);

  const sessions = useCountUp(1000000, inView, 2200);
  const uptime   = useCountUp(98, inView, 1800);
  const stations = useCountUp(2500, inView, 2000);
  const co2      = useCountUp(12400, inView, 2500);

  const ActiveScreen = screens[activeScreen].component;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1f 0%, #0a1628 60%, #060d1f 100%)" }}
    >
      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,88,179,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(48,231,237,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,88,179,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      </div>

      <div className="relative section-padding max-w-[1440px] mx-auto py-24 md:py-32">

        {/* ── Top label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.25)", color: "#30E7ED" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
            PCE App — Available on iOS & Android
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            The OS powering<br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #0058B3 100%)" }}>
              Africa's EV future.
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            More than an app — the real-time intelligence layer connecting every driver,
            charger, and kilowatt across the continent.
          </p>
        </motion.div>

        {/* ── Live metrics bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-20"
        >
          {[
            { value: stations.toLocaleString() + "+", label: "Stations Live", unit: "" },
            { value: sessions >= 1000000 ? "1M+" : sessions.toLocaleString(), label: "Sessions Served", unit: "" },
            { value: uptime + "%", label: "Network Uptime", unit: "" },
            { value: (co2 / 1000).toFixed(1) + "t", label: "CO₂ Avoided", unit: "" },
          ].map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="text-center rounded-2xl py-5 px-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "#30E7ED", textShadow: "0 0 20px rgba(48,231,237,0.3)" }}>
                {m.value}
              </p>
              <p className="text-gray-400 text-xs tracking-wide">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Phone + floating cards ── */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 mb-20">

          {/* LEFT: Phone with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 flex justify-center relative"
            style={{ minHeight: 560 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Glow under phone */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full"
              style={{ background: "rgba(48,231,237,0.12)", filter: "blur(40px)" }} />

            {/* Floating card — top left */}
            <FloatCard className="-left-4 md:-left-10 top-8" delay={0.8}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(48,231,237,0.15)" }}>
                  <Signal size={13} style={{ color: "#30E7ED" }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">2,500+ Stations</p>
                  <p className="text-[8px] text-gray-400">Live across Africa</p>
                </div>
              </div>
            </FloatCard>

            {/* Floating card — top right */}
            <FloatCard className="-right-4 md:-right-8 top-16" delay={1.0}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] font-bold text-white">Session Active</p>
              </div>
              <p className="text-[18px] font-bold mt-1" style={{ color: "#30E7ED" }}>48 kW</p>
              <p className="text-[8px] text-gray-400">Victoria Island Hub</p>
            </FloatCard>

            {/* Floating card — bottom left */}
            <FloatCard className="-left-4 md:-left-10 bottom-20" delay={1.1}>
              <p className="text-[8px] text-gray-400 mb-1">CO₂ Saved Today</p>
              <p className="text-[16px] font-bold text-white">12.4 <span className="text-[10px] text-gray-400">kg</span></p>
              <div className="w-full h-1 rounded-full mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
                  animate={{ width: ["0%", "72%"] }} transition={{ duration: 1.5, delay: 1.3 }} />
              </div>
            </FloatCard>

            {/* Floating card — bottom right */}
            <FloatCard className="-right-4 md:-right-8 bottom-28" delay={1.2}>
              <p className="text-[8px] text-gray-400 mb-1">Live Rate</p>
              <p className="text-[16px] font-bold" style={{ color: "#30E7ED" }}>₦2.4<span className="text-[9px] text-gray-400">/kWh</span></p>
              <div className="flex items-center gap-1 mt-1">
                <Wifi size={8} className="text-green-400" />
                <span className="text-[7px] text-green-400">Real-time pricing</span>
              </div>
            </FloatCard>

            {/* Phone — 40% larger than original w-72 = ~w-[410px] */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
              style={{ width: 320 }}
            >
              {/* Phone shell */}
              <div className="relative rounded-[3.2rem] overflow-hidden"
                style={{
                  border: "2px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 64px rgba(0,0,0,0.6), 0 0 80px rgba(0,88,179,0.15), 0 0 0 8px rgba(255,255,255,0.02)",
                }}>

                {/* Screen — dark */}
                <div style={{ background: "#0a0f1e", aspectRatio: "9/19.5" }}>

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-[10px] font-semibold text-white">9:41</span>
                    <div className="w-20 h-5 rounded-full" style={{ background: "#0a0f1e", border: "1px solid rgba(255,255,255,0.1)" }} />
                    <div className="flex items-center gap-1">
                      <Signal size={10} className="text-white" />
                      <Wifi size={10} className="text-white" />
                      <Battery size={10} className="text-white" />
                    </div>
                  </div>

                  {/* Screen tabs */}
                  <div className="flex gap-1 mx-4 mb-1 p-0.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                    {screens.map((s, i) => (
                      <button key={s.id} onClick={() => { setPaused(true); setActiveScreen(i); }}
                        className="flex-1 py-1 rounded-lg text-[7px] font-semibold transition-all duration-200"
                        style={activeScreen === i
                          ? { background: "#0058B3", color: "#fff", boxShadow: "0 2px 8px rgba(0,88,179,0.5)" }
                          : { color: "rgba(255,255,255,0.4)" }}>
                        {i === 0 ? "Map" : i === 1 ? "Charge" : i === 2 ? "Stats" : "Wallet"}
                      </button>
                    ))}
                  </div>

                  {/* App content */}
                  <div style={{ height: "calc(100% - 80px)", overflow: "hidden" }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={activeScreen} className="h-full"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}>
                        <ActiveScreen />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Home indicator */}
              <div className="mx-auto mt-2 w-24 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
            </motion.div>

            {/* Screen dot indicators */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {screens.map((_, i) => (
                <button key={i} onClick={() => { setPaused(true); setActiveScreen(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === activeScreen ? 20 : 6, height: 6, background: i === activeScreen ? "#30E7ED" : "rgba(255,255,255,0.2)", boxShadow: i === activeScreen ? "0 0 8px rgba(48,231,237,0.6)" : "none" }} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Text + glass feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold"
              style={{ background: "rgba(0,88,179,0.2)", border: "1px solid rgba(0,88,179,0.4)", color: "#7ab3f0" }}>
              Your charging command center
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              Everything you need.<br />Nothing you don't.
            </h3>

            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              The PCE App puts the entire charging network in your pocket.
              Plan trips, start sessions, track energy, and pay — all in one
              seamless experience built for Africa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f, i) => (
                <GlassFeatureCard key={f.title} {...f} delay={0.5 + i * 0.08} />
              ))}
            </div>

            {/* Download CTAs */}
            <div className="flex flex-wrap gap-3">
              {["📱 App Store", "🤖 Google Play"].map((label) => (
                <div key={label}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm cursor-default transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", backdropFilter: "blur(8px)" }}>
                  {label}
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-sm font-semibold cursor-default" style={{ color: "#30E7ED" }}>
                Learn more <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
