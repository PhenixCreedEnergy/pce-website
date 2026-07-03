"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Zap, BarChart3, Wallet, Battery, Navigation, Star } from "lucide-react";

/* ─── Screen components ─────────────────────────────────────── */
function MapScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0f172a" }}>
      <div className="flex justify-between items-center px-5 pt-2 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-px items-end">
            {[6,9,12,12,12].map((h,i) => <div key={i} className="w-0.5 rounded-sm bg-white" style={{height:h}} />)}
          </div>
          <div className="rounded-sm overflow-hidden ml-1" style={{width:18,height:9,border:'1px solid rgba(255,255,255,0.4)'}}>
            <div className="h-full bg-white" style={{width:'78%'}} />
          </div>
        </div>
      </div>
      <div className="mx-3 mb-2 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: "rgba(255,255,255,0.08)" }}>
        <MapPin size={12} style={{ color: "#30E7ED" }} />
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Search chargers near you...</span>
      </div>
      <div className="flex-1 relative mx-3 rounded-2xl overflow-hidden" style={{ background: "#1e293b" }}>
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[20,40,60,80].map(y => <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#30E7ED" strokeWidth="0.5"/>)}
          {[20,40,60,80].map(x => <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#30E7ED" strokeWidth="0.5"/>)}
        </svg>
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 30 80 Q 120 50 200 75 T 300 65" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6"/>
          <path d="M 10 140 L 300 130" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
          <path d="M 150 10 L 148 200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
        </svg>
        {[
          {x:'35%',y:'42%',active:true},
          {x:'62%',y:'38%',active:true},
          {x:'22%',y:'62%',active:false},
          {x:'75%',y:'55%',active:true},
          {x:'50%',y:'72%',active:false},
        ].map((pin,i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:pin.x,top:pin.y}}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{
              background: pin.active ? "#30E7ED" : "rgba(255,255,255,0.25)",
              boxShadow: pin.active ? "0 0 8px rgba(48,231,237,0.7)" : "none",
            }}>
              <Zap size={9} style={{ color: pin.active ? "#0a1628" : "rgba(255,255,255,0.5)" }} />
            </div>
            {pin.active && <div className="absolute inset-0 rounded-full animate-ping" style={{background:"rgba(48,231,237,0.3)"}} />}
          </div>
        ))}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{left:'50%',top:'50%'}}>
          <div className="w-4 h-4 rounded-full border-2 border-white" style={{background:"#0058B3",boxShadow:"0 0 12px rgba(0,88,179,0.8)"}} />
          <div className="absolute inset-0 rounded-full animate-ping" style={{background:"rgba(0,88,179,0.25)"}} />
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-lg" style={{background:"rgba(6,13,31,0.9)",backdropFilter:"blur(8px)",border:"1px solid rgba(48,231,237,0.3)"}}>
          <p className="text-[9px] font-bold" style={{color:"#30E7ED"}}>350kW · 0.8km</p>
          <p className="text-[8px]" style={{color:"rgba(255,255,255,0.6)"}}>4 bays free</p>
        </div>
      </div>
      <div className="mx-3 mt-2 mb-2 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(48,231,237,0.15)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-xs">PCE Lagos Island</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={8} fill="#F59E0B" style={{color:"#F59E0B"}} />
              <span className="text-[9px]" style={{color:"rgba(255,255,255,0.5)"}}>4.9 · 0.8 km · Open</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-full text-[9px] font-bold" style={{background:"rgba(48,231,237,0.15)",color:"#30E7ED"}}>Navigate</div>
        </div>
      </div>
    </div>
  );
}

function ChargingScreen() {
  const [progress, setProgress] = useState(68);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => p >= 95 ? 68 : p + 0.3), 200);
    return () => clearInterval(t);
  }, []);
  const R = 52;
  const circ = 2 * Math.PI * R;
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#060d1f" }}>
      <div className="flex justify-between items-center px-5 pt-2 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <span className="text-[10px]" style={{color:"#30E7ED"}}>Charging...</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative mb-4">
          <svg width="120" height="120">
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(48,231,237,0.1)" strokeWidth="6"/>
            <circle cx="60" cy="60" r={R} fill="none" stroke="#30E7ED" strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(progress/100)*circ} ${circ}`}
              transform="rotate(-90 60 60)"
              style={{filter:"drop-shadow(0 0 6px rgba(48,231,237,0.5))",transition:"stroke-dasharray 0.3s"}} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            <span className="text-[9px]" style={{color:"rgba(255,255,255,0.5)"}}>charged</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 w-full mb-4">
          {[{label:"Power",value:"48kW"},{label:"Added",value:"42km"},{label:"Time",value:"12min"}].map(s => (
            <div key={s.label} className="rounded-xl p-2 text-center" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(48,231,237,0.12)"}}>
              <p className="text-white font-bold text-sm">{s.value}</p>
              <p className="text-[9px]" style={{color:"rgba(255,255,255,0.4)"}}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="w-full rounded-xl p-3" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(48,231,237,0.10)"}}>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1">
              <Battery size={11} style={{color:"#30E7ED"}} />
              <span className="text-[10px] font-medium text-white">Battery</span>
            </div>
            <span className="text-[10px] font-bold" style={{color:"#30E7ED"}}>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.08)"}}>
            <div className="h-full rounded-full transition-all duration-300" style={{
              width:`${progress}%`,
              background:"linear-gradient(90deg,#0058B3,#30E7ED)",
              boxShadow:"0 0 6px rgba(48,231,237,0.4)",
            }} />
          </div>
          <p className="text-[8px] mt-1" style={{color:"rgba(255,255,255,0.35)"}}>Est. full charge in 14 min · ₦2.4/kWh</p>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#060d1f" }}>
      <div className="flex justify-between items-center px-5 pt-2 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <span className="text-[10px]" style={{color:"rgba(255,255,255,0.4)"}}>Dashboard</span>
      </div>
      <div className="flex-1 overflow-hidden px-3 pb-2">
        <div className="mb-3">
          <p className="text-xs font-bold text-white">Good morning, Adebayo</p>
          <p className="text-[9px]" style={{color:"rgba(255,255,255,0.4)"}}>Your EV summary · June 2025</p>
        </div>
        <div className="rounded-xl p-3 mb-2" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(48,231,237,0.10)"}}>
          <p className="text-[9px] font-bold mb-2" style={{color:"rgba(255,255,255,0.5)"}}>kWh this week</p>
          <div className="flex items-end gap-1.5 h-10">
            {[14,22,8,30,18,27,20].map((v,i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{
                height:`${(v/30)*100}%`,
                background: i===5 ? "linear-gradient(180deg,#30E7ED,#0058B3)" : "rgba(0,88,179,0.4)",
              }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <span key={i} className="text-[7px] flex-1 text-center" style={{color:i===5?"#30E7ED":"rgba(255,255,255,0.3)"}}>{d}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {[
            {label:"Total Sessions",value:"47",icon:Zap},
            {label:"CO₂ Saved",value:"124kg",icon:BarChart3},
            {label:"km Added",value:"2,840",icon:Navigation},
            {label:"Avg Cost",value:"₦1.8/kWh",icon:Wallet},
          ].map(s => (
            <div key={s.label} className="rounded-xl p-2" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <s.icon size={10} style={{color:"#30E7ED",marginBottom:2}} />
              <p className="text-white font-bold text-xs">{s.value}</p>
              <p className="text-[8px]" style={{color:"rgba(255,255,255,0.4)"}}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-2.5" style={{background:"rgba(0,88,179,0.12)",border:"1px solid rgba(0,88,179,0.25)"}}>
          <p className="text-[9px] font-bold text-white mb-1">Last Session — Yesterday</p>
          <div className="flex justify-between text-[8px]" style={{color:"rgba(255,255,255,0.55)"}}>
            <span>PCE Victoria Island · 350kW</span>
            <span style={{color:"#30E7ED"}}>62 kWh · ₦148</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#060d1f" }}>
      <div className="flex justify-between items-center px-5 pt-2 pb-1">
        <span className="text-white text-[10px] font-semibold">9:41</span>
        <span className="text-[10px]" style={{color:"rgba(255,255,255,0.4)"}}>Wallet</span>
      </div>
      <div className="flex-1 px-3 pb-2">
        <div className="rounded-2xl p-4 mb-3" style={{
          background:"linear-gradient(135deg,#0058B3 0%,#003d7a 100%)",
          boxShadow:"0 8px 24px rgba(0,88,179,0.4)",
        }}>
          <p className="text-[9px] font-bold tracking-widest uppercase mb-1" style={{color:"rgba(255,255,255,0.5)"}}>PCE Balance</p>
          <p className="text-2xl font-bold text-white mb-3">₦14,250</p>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[8px]" style={{color:"rgba(255,255,255,0.5)"}}>Card</p>
              <p className="text-[10px] text-white font-medium">•••• 4821</p>
            </div>
            <div className="px-3 py-1.5 rounded-full text-[8px] font-bold" style={{background:"rgba(48,231,237,0.2)",color:"#30E7ED"}}>Top Up</div>
          </div>
        </div>
        <div className="rounded-xl p-3 mb-2" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(48,231,237,0.15)"}}>
          <div className="flex items-center gap-2 mb-2">
            <Navigation size={10} style={{color:"#30E7ED"}} />
            <p className="text-[10px] font-bold text-white">Route Plan</p>
            <span className="ml-auto text-[8px] px-2 py-0.5 rounded-full" style={{background:"rgba(48,231,237,0.12)",color:"#30E7ED"}}>Active</span>
          </div>
          <p className="text-[9px] mb-1" style={{color:"rgba(255,255,255,0.5)"}}>Lagos → Abuja · 681km</p>
          <div className="flex justify-between text-[8px]" style={{color:"rgba(255,255,255,0.4)"}}>
            <span>2 charging stops</span>
            <span style={{color:"#30E7ED"}}>₦3,200 est.</span>
          </div>
        </div>
        <p className="text-[9px] font-bold mb-2" style={{color:"rgba(255,255,255,0.5)"}}>RECENT</p>
        {[
          {name:"PCE Victoria Island",amt:"-₦148",time:"Yesterday",credit:false},
          {name:"PCE Lekki Phase 1",  amt:"-₦96", time:"Jun 18",credit:false},
          {name:"Top-up via GTBank",  amt:"+₦5,000",time:"Jun 15",credit:true},
        ].map(t => (
          <div key={t.name} className="flex items-center justify-between py-2 border-b" style={{borderColor:"rgba(255,255,255,0.05)"}}>
            <div>
              <p className="text-[10px] font-medium text-white">{t.name}</p>
              <p className="text-[8px]" style={{color:"rgba(255,255,255,0.35)"}}>{t.time}</p>
            </div>
            <span className="text-[10px] font-bold" style={{color: t.credit ? "#30E7ED" : "rgba(255,255,255,0.7)"}}>{t.amt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [
  { label: "Map",    icon: MapPin,    component: MapScreen },
  { label: "Charge", icon: Zap,       component: ChargingScreen },
  { label: "Stats",  icon: BarChart3, component: DashboardScreen },
  { label: "Wallet", icon: Wallet,    component: WalletScreen },
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

  useEffect(() => {
    if (hovering) return;
    const t = setInterval(() => setActive(s => (s + 1) % SCREENS.length), 4000);
    return () => clearInterval(t);
  }, [hovering]);

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

      <div className="relative max-w-[1440px] mx-auto px-8 md:px-16 lg:px-24 py-20 md:py-44 lg:py-56">

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
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4rem)", lineHeight: 1.05 }}
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
        <div className="flex flex-col lg:flex-row items-center lg:items-start"
          style={{ gap: "clamp(60px, 10vw, 160px)" }}>

          {/* ── LEFT: Phone mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 220, scale: 0.92, rotateX: 12 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
            transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
            className="flex-shrink-0 relative"
            style={{ alignSelf: "center", perspective: 1200, transformStyle: "preserve-3d" }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Floating wrapper — 0.8s pause then gentle y + rotateZ float */}
            <motion.div
              animate={inView ? { y: [0, -8, 0], rotateZ: [0, 1, 0, -1, 0] } : {}}
              transition={inView ? {
                y:       { duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.8 },
                rotateZ: { duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 0.8 },
              } : {}}
            >
            {/* Glow — full intensity on entrance, settles to 40% */}
            <motion.div
              className="absolute pointer-events-none"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 1, 0.4] } : {}}
              transition={{ duration: 2.2, times: [0, 0.45, 1], ease: "easeOut" }}
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

            {/* iPhone 16 Pro shell */}
            <div style={{
              width: 320, height: 660,
              borderRadius: 54,
              background: "linear-gradient(145deg, #3d3d3d 0%, #1c1c1e 40%, #2c2c2e 100%)",
              boxShadow: [
                "0 0 0 1px rgba(255,255,255,0.13)",
                "0 0 0 2px rgba(0,0,0,0.85)",
                "0 40px 90px rgba(0,0,0,0.75)",
                "0 0 60px rgba(0,88,179,0.18)",
                "inset 0 1px 0 rgba(255,255,255,0.14)",
              ].join(", "),
              position: "relative",
              overflow: "visible",
            }}>
              {/* Side buttons */}
              {[
                { side: "left",  top: 120, h: 34 },
                { side: "left",  top: 168, h: 60 },
                { side: "left",  top: 242, h: 60 },
                { side: "right", top: 160, h: 90 },
              ].map((b, i) => (
                <div key={i} style={{
                  position: "absolute",
                  [b.side]: -4,
                  top: b.top, width: 4, height: b.h,
                  borderRadius: b.side === "left" ? "4px 0 0 4px" : "0 4px 4px 0",
                  background: "linear-gradient(180deg,#404040,#2a2a2a)",
                  boxShadow: b.side === "left" ? "-1px 0 2px rgba(0,0,0,0.6)" : "1px 0 2px rgba(0,0,0,0.6)",
                }} />
              ))}

              {/* Screen */}
              <div style={{ position:"absolute", inset:4, borderRadius:50, overflow:"hidden", background:"#000" }}>
                {/* Dynamic Island */}
                <div style={{
                  position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
                  width:110, height:32, borderRadius:20, background:"#000", zIndex:30,
                  boxShadow:"0 0 0 1.5px rgba(255,255,255,0.05)",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                }}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:"#1a1a1a",border:"1px solid rgba(255,255,255,0.06)"}} />
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#1c1c1c"}} />
                  {active === 1 && (
                    <div style={{position:"absolute",right:10}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:"#30E7ED",boxShadow:"0 0 4px #30E7ED"}} />
                    </div>
                  )}
                </div>

                {/* App content */}
                <div style={{ position:"absolute", inset:0, paddingTop:50 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                      style={{ position:"absolute", inset:0, paddingTop:50 }}
                    >
                      {(() => { const S = SCREENS[active].component; return <S />; })()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Tab bar */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, height:72,
                  background:"rgba(6,13,31,0.96)", backdropFilter:"blur(20px)",
                  borderTop:"1px solid rgba(255,255,255,0.06)",
                  display:"flex", alignItems:"center", justifyContent:"space-around",
                  paddingBottom:12, zIndex:20,
                }}>
                  {SCREENS.map((s, i) => (
                    <button key={s.label}
                      onClick={() => { setActive(i); setHovering(true); }}
                      style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 10px",border:"none",background:"transparent",cursor:"pointer"}}>
                      <s.icon size={16} style={{ color: i===active ? "#30E7ED" : "rgba(255,255,255,0.3)" }} />
                      <span style={{ fontSize:8, color: i===active ? "#30E7ED" : "rgba(255,255,255,0.3)", fontWeight: i===active ? 700 : 400 }}>{s.label}</span>
                    </button>
                  ))}
                </div>
                {/* Home indicator */}
                <div style={{position:"absolute",bottom:6,left:"50%",transform:"translateX(-50%)",width:100,height:4,borderRadius:2,background:"rgba(255,255,255,0.28)",zIndex:25}} />
              </div>
            </div>

            {/* Screen pagination dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {SCREENS.map((_, i) => (
                <button key={i}
                  onClick={() => { setActive(i); setHovering(true); }}
                  style={{
                    width: i === active ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === active ? "#30E7ED" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: i === active ? "0 0 8px rgba(48,231,237,0.5)" : "none",
                  }}
                />
              ))}
            </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Feature cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:flex-1 flex flex-col gap-4"
            style={{ paddingTop: 8 }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group cursor-default rounded-2xl transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "24px 28px",
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

                <div className="flex items-start gap-5">
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
                    <h3 className="text-white font-semibold mb-2" style={{ fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* App store row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
              className="flex items-center gap-3 pt-2"
            >
              {[
                { label: "App Store",   emoji: "📱" },
                { label: "Google Play", emoji: "🤖" },
              ].map(({ label, emoji }) => (
                <div key={label}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(48,231,237,0.30)";
                    el.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.10)";
                    el.style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  <span>{emoji}</span>
                  {label}
                </div>
              ))}
              <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                iOS & Android
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
