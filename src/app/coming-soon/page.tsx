import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BatteryCharging, Zap } from "lucide-react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Coming Soon",
  description:
    "Upcoming Phoenix Creed Energy products, including EV power banks and energy storage systems.",
  path: "/coming-soon",
  image: "/energy-source.png",
});

export default function ComingSoonPage() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#060d1f] section-padding pt-32 pb-20 md:pt-44 md:pb-28"
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
      <div
        className="absolute bottom-0 left-0 w-[520px] h-[520px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,88,179,0.16) 0%, transparent 72%)" }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] mb-6"
            style={{ background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.26)", color: "#30E7ED" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#30E7ED]" />
            Coming Soon
          </div>

          <h1
            className="font-bold leading-[1.03] tracking-normal mb-6"
            style={{ fontSize: "clamp(3.2rem, 6vw, 6.8rem)", textShadow: "0 3px 24px rgba(0,0,0,0.35)" }}
          >
            New energy products<br />
            <span
              className="bg-clip-text text-transparent italic"
              style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}
            >
              are on the way.
            </span>
          </h1>

          <p
            className="leading-relaxed mb-9"
            style={{ color: "rgba(255,255,255,0.76)", fontSize: "clamp(1.08rem, 1.35vw, 1.35rem)", maxWidth: 680 }}
          >
            EV power banks and energy storage units are being prepared for launch. We are building them with the same reliability, safety, and clean-energy focus as the PCE charging network.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 mb-10 max-w-2xl">
            {[
              { icon: Zap, title: "EV Power Banks", text: "Portable emergency charging support for EV drivers." },
              { icon: BatteryCharging, title: "Energy Storage Units", text: "Battery systems for homes, businesses, and operators." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: "rgba(48,231,237,0.12)", color: "#30E7ED" }}>
                    <Icon size={20} />
                  </div>
                  <h2 className="font-semibold text-white mb-2">{item.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.56)" }}>
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white"
              style={{ padding: "17px 34px", fontSize: 16, background: "#0058B3", boxShadow: "0 4px 28px rgba(0,88,179,0.42)", textDecoration: "none" }}
            >
              Get launch updates <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full font-medium"
              style={{ padding: "17px 34px", fontSize: 16, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.24)", color: "rgba(255,255,255,0.90)", textDecoration: "none" }}
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
