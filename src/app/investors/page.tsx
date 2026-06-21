import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { StatCard } from "@/components/ui/StatCard";
import { CTASection } from "@/components/sections/CTASection";
import { TrendingUp, Globe2, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investors",
  description: "Phoenix Creed Energy investor relations — financials, ESG, and partnership opportunities.",
};

const highlights = [
  { icon: TrendingUp, title: "42% CAGR", desc: "Projected African EV market growth rate through 2035" },
  { icon: Globe2, title: "18 Active Markets", desc: "Government-backed concessions in 18 countries" },
  { icon: ShieldCheck, title: "Series B", desc: "$85M raised across two rounds from tier-1 investors" },
  { icon: Leaf, title: "Net-Zero 2030", desc: "100% renewable-powered network" },
];

const keyMetrics = [
  { numericValue: 85, suffix: "M", label: "Total Raised", description: "USD — Series A & B" },
  { numericValue: 42, suffix: "%", label: "YoY Revenue Growth", description: "Three consecutive quarters" },
  { numericValue: 18, suffix: "", label: "Active Markets", description: "Pan-African footprint" },
  { value: "2030", label: "Net-Zero Target", description: "100% renewable powered" },
];

const revenueData = [
  { year: "2022", revenue: 2.1, label: "$2.1M" },
  { year: "2023", revenue: 8.4, label: "$8.4M" },
  { year: "2024", revenue: 24.7, label: "$24.7M" },
  { year: "2025E", revenue: 58.3, label: "$58.3M" },
  { year: "2026E", revenue: 120, label: "$120M" },
];

const milestones = [
  { year: "2021", event: "Founded in Lagos, Nigeria" },
  { year: "2022", event: "First 50 stations deployed — Lagos, Accra, Nairobi" },
  { year: "2023", event: "Series A: $25M raised. Expanded to 8 countries" },
  { year: "2024", event: "Series B: $60M raised. 1,000 station milestone" },
  { year: "2025", event: "2,500 stations live. PCE App launched. 1M sessions" },
  { year: "2026", event: "IPO preparation. Target: 5,000 stations, 30 countries" },
];

export default function InvestorsPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
        style={{ background: "linear-gradient(135deg, #0058B3 0%, #003d80 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(48,231,237,0.15) 0%, transparent 70%)" }}
        />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="chip-accent mb-5" style={{ background: "rgba(48,231,237,0.15)", color: "#30E7ED" }}>
              Investor Relations
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-3xl leading-tight">
              The infrastructure play of the decade.
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
              Phoenix Creed Energy is building the connective tissue of Africa's electric economy.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-deep-blue font-semibold text-sm hover:bg-blue-50 transition-all duration-200"
            >
              Request Investor Access <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Key metrics */}
      <section className="section-padding max-w-[1440px] mx-auto py-14 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics.map((m, i) => (
            <AnimatedSection key={m.label} delay={i * 0.08}>
              <StatCard {...m} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Revenue chart */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <AnimatedSection className="lg:w-2/5" direction="left">
              <div className="chip mb-5">Revenue Growth</div>
              <h2 className="text-3xl md:text-4xl font-bold text-pce-dark mb-4 leading-tight">
                Consistent hypergrowth across every market.
              </h2>
              <p className="text-pce-gray leading-relaxed mb-6">
                Revenue grew 195% in FY2024. We project $120M ARR by end of 2026,
                driven by network expansion and fleet contract signings.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Charging revenue", pct: 68 },
                  { label: "SaaS & subscriptions", pct: 22 },
                  { label: "Carbon credits", pct: 10 },
                ].map((r) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-pce-gray">{r.label}</span>
                      <span className="font-semibold text-pce-dark">{r.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${r.pct}%`, background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:w-3/5" direction="right">
              <div className="surface rounded-2xl p-6 md:p-8">
                <p className="text-xs font-bold tracking-[0.15em] text-pce-gray uppercase mb-6">Annual Revenue (USD)</p>
                <div className="flex items-end gap-4 h-48">
                  {revenueData.map((d) => (
                    <div key={d.year} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-pce-dark">{d.label}</span>
                      <div
                        className="w-full rounded-t-lg"
                        style={{
                          height: `${(d.revenue / maxRevenue) * 160}px`,
                          background: d.year.includes("E")
                            ? "linear-gradient(180deg, #30E7ED, #0058B3)"
                            : "#0058B3",
                          opacity: d.year.includes("E") ? 0.7 : 1,
                        }}
                      />
                      <span className="text-[10px] text-pce-gray font-medium">{d.year}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-pce-gray mt-4">E = Estimated. FY ending Dec 31.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment highlights */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Why PCE</h2>
          <p className="text-pce-gray text-lg max-w-xl mx-auto">Four structural advantages that compound over time.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((h, i) => (
            <AnimatedSection key={h.title} delay={i * 0.1}>
              <div className="surface surface-hover rounded-2xl p-8 flex gap-5 h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(0,88,179,0.08)", border: "0.5px solid rgba(0,88,179,0.12)" }}
                >
                  <h.icon size={24} style={{ color: "#0058B3" }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pce-dark mb-2">{h.title}</h3>
                  <p className="text-pce-gray leading-relaxed">{h.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Expansion roadmap</h2>
          </AnimatedSection>
          <div className="relative max-w-2xl mx-auto">
            <div
              className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, #0058B3, rgba(0,88,179,0.1))" }}
            />
            <div className="flex flex-col gap-7">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 0.08}>
                  <div className="flex gap-8 items-start pl-16 relative">
                    <div
                      className="absolute left-6 top-1 w-4 h-4 rounded-full border-2 border-white -translate-x-1/2 shrink-0"
                      style={{ background: "#0058B3", boxShadow: "0 0 0 3px rgba(0,88,179,0.15)" }}
                    />
                    <div
                      className="px-3 py-1 rounded-lg shrink-0"
                      style={{ background: "rgba(0,88,179,0.08)", border: "0.5px solid rgba(0,88,179,0.15)" }}
                    >
                      <span className="text-deep-blue font-bold text-sm">{m.year}</span>
                    </div>
                    <p className="text-pce-dark pt-1">{m.event}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IR contact */}
      <section className="section-padding max-w-[1440px] mx-auto py-14">
        <AnimatedSection>
          <div
            className="rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            style={{ background: "#0058B3", boxShadow: "0 8px 32px rgba(0,88,179,0.20)" }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Speak with our IR team</h2>
              <p className="text-blue-200">Access our data room, financial reports, and ESG disclosures.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-deep-blue font-semibold shrink-0 hover:bg-blue-50 transition-all duration-200"
            >
              Request Access <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <CTASection />
    </>
  );
}
