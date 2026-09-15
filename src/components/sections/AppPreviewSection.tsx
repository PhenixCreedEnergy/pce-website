"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useAnimation, useReducedMotion } from "framer-motion";
import { MapPin, Zap, Wallet, Battery, Navigation } from "lucide-react";
import Image from "next/image";
import { StoreBadges } from "@/components/ui/StoreBadges";

const SCREENS = [
  { label: "Map", src: "/Map.svg", alt: "PCE app map showing nearby charging stations" },
  { label: "Station", src: "/Station detail.png", alt: "PCE app charging station details" },
  { label: "Charging", src: "/Charging.svg", alt: "PCE app charging session screen" },
  { label: "Payment", src: "/Payment.svg", alt: "PCE app payment screen" },
];

const FEATURES = [
  {
    icon: MapPin,
    title: "Live Availability",
    desc: "See open bays at every station in real-time. No waiting, no guessing — always know before you go.",
  },
  {
    icon: Navigation,
    title: "Route Planning",
    desc: "AI-optimised multi-stop routes with charging built in automatically. Lagos to Abuja, seamlessly.",
  },
  {
    icon: Battery,
    title: "Battery Intelligence",
    desc: "Track charge level, range estimate, and optimal charging windows based on your driving patterns.",
  },
  {
    icon: Wallet,
    title: "PCE Wallet",
    desc: "One balance across 2,500+ stations. Auto-reload, instant receipts, no friction at the charger.",
  },
  {
    icon: Zap,
    title: "Session Control",
    desc: "Start, monitor, and stop your charging session remotely. Every kilowatt accounted for.",
  },
];

/* ─── Main component ─────────────────────────────────────────── */
export function AppPreviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  // Sentinel ref: a zero-size div at the phone's NATURAL position (no y-offset).
  // whileInView on the phone itself is unreliable because initial:{y:220} pushes
  // the element outside the overflow:hidden clip, so IntersectionObserver never
  // fires the threshold. The sentinel has no transform and triggers correctly.
  const sentinelRef = useRef<HTMLDivElement>(null);
  const sentinelInView = useInView(sentinelRef, { once: true, amount: 0 });

  const entranceControls = useAnimation();
  const glowControls = useAnimation();

  // Drive animation from sentinel visibility — runs once when column enters view
  useEffect(() => {
    if (!sentinelInView) return;
    async function run() {
      await entranceControls.start({
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        transition: { type: "spring", stiffness: 57, damping: 18, mass: 0.9 },
      });
      glowControls.start({
        opacity: [0, 1, 0.4],
        transition: { duration: 2.2, times: [0, 0.45, 1], ease: "easeOut" },
      });
    }
    run();
  }, [sentinelInView, entranceControls, glowControls]);

  useEffect(() => {
    if (hovering || paused || reducedMotion || !inView) return;
    const t = setInterval(() => setActive(s => (s + 1) % SCREENS.length), 4000);
    return () => clearInterval(t);
  }, [hovering, paused, reducedMotion, inView]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060d1f 0%, #0a1628 55%, #060d1f 100%)" }}
    >
      {/* Grid — 50% reduced opacity */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      {/* Ambient glow — wide, soft */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 38% 60%, rgba(0,88,179,0.10) 0%, transparent 70%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 40% 40% at 72% 50%, rgba(48,231,237,0.04) 0%, transparent 70%)",
      }} />

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-16 md:py-24 lg:py-32">

        {/* ── Section header — centred ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
            style={{ background: "rgba(48,231,237,0.08)", border: "1px solid rgba(48,231,237,0.20)", color: "#30E7ED" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#30E7ED] animate-pulse" />
            PCE App
          </div>
          <h2
            className="font-bold text-white tracking-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", lineHeight: 1.08 }}
          >
            The OS powering<br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #0058B3 100%)" }}>
              Africa&apos;s EV future.
            </span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed mx-auto"
            style={{ color: "rgba(255,255,255,0.45)", maxWidth: 500 }}>
            Real-time intelligence connecting every driver, charger, and kilowatt across the continent.
          </p>
        </motion.div>

        {/* ── Two-column: Phone left · Features right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] items-center gap-12 lg:gap-16 xl:gap-24 max-w-[1120px] mx-auto">

          {/* ── LEFT: Phone mockup ── */}
          <div className="relative w-full max-w-[320px] mx-auto" role="region" aria-label="PCE app screens" aria-roledescription="carousel">
            {/* Sentinel: zero-size div at natural position, no transform.
                IntersectionObserver fires reliably on this instead of the
                phone which is offset 220px and clipped by overflow:hidden. */}
            <div ref={sentinelRef} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />

            <motion.div
              initial={{ opacity: 0, y: 220, scale: 0.92, rotateX: 12 }}
              animate={entranceControls}
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
            <motion.div>
            {/* Glow — peaks on entrance then fades to 40%, driven by useAnimation */}
            <motion.div
              className="absolute pointer-events-none"
              initial={{ opacity: 0 }}
              animate={glowControls}
              style={{
                inset: "-48px -40px",
                background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,88,179,0.42) 0%, rgba(48,231,237,0.12) 45%, transparent 72%)",
                filter: "blur(28px)",
                borderRadius: "50%",
              }}
            />
            {/* Outer glow ring — always soft */}
            <div className="absolute pointer-events-none" style={{
              inset: "-80px -64px",
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(48,231,237,0.05) 0%, transparent 65%)",
              filter: "blur(40px)",
            }} />

            <div className="relative rounded-[34px] border border-white/20 bg-[#101519] p-1.5 shadow-[0_28px_70px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-[430/932] overflow-hidden rounded-[28px] bg-[#101519]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SCREENS[active].src}
                      alt={SCREENS[active].alt}
                      fill
                      unoptimized
                      sizes="(max-width: 359px) 90vw, 308px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1" aria-label="Choose app screen">
              {SCREENS.map((screen, i) => (
                <button
                  key={screen.label}
                  type="button"
                  aria-label={`Show ${screen.label.toLowerCase()} screen`}
                  aria-pressed={active === i}
                  onClick={() => { setActive(i); setPaused(true); }}
                  className={`min-h-11 rounded-xl text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#30E7ED] ${active === i ? "bg-[#30E7ED]/15 text-[#30E7ED]" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
                >
                  {screen.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              className="mx-auto mt-3 block min-h-11 px-3 text-xs text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#30E7ED]"
              hidden={!!reducedMotion}
            >
              {paused ? "Play slideshow" : "Pause slideshow"}
            </button>
            </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT: Feature cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-w-0 flex flex-col gap-3"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group cursor-default rounded-2xl p-4 sm:p-5 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(48,231,237,0.04)";
                  el.style.borderColor = "rgba(48,231,237,0.20)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(48,231,237,0.12)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Electric accent line — reveals on hover via CSS group */}
                <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.5), transparent)" }} />

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(48,231,237,0.08)",
                      border: "1px solid rgba(48,231,237,0.15)",
                    }}>
                    <f.icon size={20} style={{ color: "#30E7ED" }} />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-1.5" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.60)", lineHeight: 1.65 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* App store badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
              className="mt-3 border-t border-white/10 pt-6"
            >
              <StoreBadges gap={12} className="justify-center sm:justify-start [&_img]:!h-11 sm:[&_img]:!h-[52px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
