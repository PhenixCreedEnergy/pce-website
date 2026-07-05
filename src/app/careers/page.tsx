import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BatteryCharging, MapPin, ShieldCheck, Users, Zap } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description:
    "Join Phoenix Creed Energy and help build Africa's electric mobility infrastructure across charging, software, energy storage, operations, and EV service.",
  path: "/careers",
  image: "/energy-hub.png",
});

const teams = [
  { icon: Zap, title: "Charging Infrastructure", text: "Site planning, deployment, power systems, and field operations." },
  { icon: BatteryCharging, title: "Energy Systems", text: "Battery storage, grid integration, safety, and reliability engineering." },
  { icon: Users, title: "Product & Growth", text: "Customer experience, partnerships, market expansion, and launch execution." },
  { icon: ShieldCheck, title: "Service & Support", text: "EV diagnostics, maintenance programs, training, and quality assurance." },
];

export default function CareersPage() {
  return (
    <>
      <section
        className="relative overflow-hidden bg-[#060d1f] section-padding pt-32 pb-20 md:pt-44 md:pb-28"
        style={{ color: "#fff" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[680px] h-[680px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(48,231,237,0.10) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] mb-6"
              style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.26)", color: "#30E7ED" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#30E7ED]" />
              Careers
            </div>
            <h1
              className="font-bold leading-[1.03] tracking-normal mb-6"
              style={{ fontSize: "clamp(3.2rem, 6vw, 6.8rem)", textShadow: "0 3px 24px rgba(0,0,0,0.35)" }}
            >
              Build the future of<br />
              <span
                className="bg-clip-text text-transparent italic"
                style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}
              >
                electric mobility.
              </span>
            </h1>
            <p
              className="leading-relaxed mb-9"
              style={{ color: "rgba(255,255,255,0.76)", fontSize: "clamp(1.08rem, 1.35vw, 1.35rem)", maxWidth: 720 }}
            >
              We are building the charging, software, energy, and service layer for Africa&apos;s EV transition. Join a team focused on practical execution, technical reliability, and long-term infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white"
                style={{ padding: "17px 34px", fontSize: 16, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.42)", textDecoration: "none" }}
              >
                Send your profile <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full font-medium"
                style={{ padding: "17px 34px", fontSize: 16, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)", textDecoration: "none" }}
              >
                About PCE
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white section-padding py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="chip mb-5">Where You Can Help</div>
              <h2 className="font-bold text-pce-dark leading-tight mb-5" style={{ fontSize: "clamp(2.1rem, 4vw, 3.8rem)", maxWidth: 620 }}>
                Teams building real infrastructure.
              </h2>
              <p className="text-pce-gray leading-relaxed" style={{ fontSize: "clamp(1rem, 1.25vw, 1.2rem)", maxWidth: 560 }}>
                We hire for hands-on ownership across energy, software, field operations, partnerships, and customer support.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {teams.map((team) => {
                const Icon = team.icon;
                return (
                  <div key={team.title} className="rounded-2xl p-6" style={{ background: "#F5F7FA", border: "1px solid #E5E7EB" }}>
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "rgba(0,88,179,0.08)", color: "#0058B3" }}>
                      <Icon size={21} />
                    </div>
                    <h3 className="font-semibold text-pce-dark mb-2">{team.title}</h3>
                    <p className="text-sm leading-relaxed text-pce-gray">{team.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pb-20 md:pb-28 bg-white">
        <div className="max-w-[1440px] mx-auto rounded-2xl p-8 md:p-10" style={{ background: "#060d1f", border: "1px solid rgba(48,231,237,0.14)" }}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4" style={{ color: "#30E7ED" }}>
                <MapPin size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.16em]">Open Interest</span>
              </div>
              <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}>
                No open roles right now.
              </h2>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.62)", maxWidth: 620 }}>
                We are not hiring for specific roles at the moment. You can still share your profile and we will keep it on file for future opportunities.
              </p>
            </div>
            <div className="lg:min-w-[420px]">
              <div className="rounded-2xl p-6" style={{ color: "rgba(255,255,255,0.78)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <p className="text-sm font-semibold text-white mb-2">General applications only</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.56)" }}>
                  Send your profile through our contact page and include the area where you would like to contribute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
