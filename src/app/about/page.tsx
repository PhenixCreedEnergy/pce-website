import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: "The team and mission behind Phoenix Creed Energy.",
};

const values = [
  { title: "African-first", desc: "Built by Africans, for Africa. Every design decision starts with the continent's unique infrastructure realities." },
  { title: "Relentlessly reliable", desc: "An EV is only as good as the charger it depends on. 99% uptime isn't a target — it's the floor." },
  { title: "Radically open", desc: "Our network is open-protocol. Any EV brand, any charge level — all welcome at every PCE station." },
  { title: "Climate accountable", desc: "Every kWh delivered is 100% renewable-sourced. Every ton of CO₂ avoided is tracked and disclosed." },
];

const team = [
  { name: "Chidi Okonkwo", role: "Co-founder & CEO", country: "Nigeria", initials: "CO" },
  { name: "Amara Diallo", role: "Co-founder & CTO", country: "Senegal", initials: "AD" },
  { name: "Fatima Al-Rashid", role: "Chief Operating Officer", country: "Egypt", initials: "FR" },
  { name: "Sipho Dlamini", role: "Chief Revenue Officer", country: "South Africa", initials: "SD" },
  { name: "Grace Wanjiku", role: "VP Engineering", country: "Kenya", initials: "GW" },
  { name: "Kwame Asante", role: "VP Partnerships", country: "Ghana", initials: "KA" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,88,179,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="chip mb-5">Our Mission</div>
            <h1 className="text-5xl md:text-7xl font-bold text-pce-dark mb-6 max-w-4xl leading-tight">
              We believe Africa's roads should be electric.
            </h1>
            <p className="text-pce-gray text-lg md:text-xl max-w-2xl leading-relaxed">
              Phoenix Creed Energy was founded in 2021 in Lagos with a single conviction: Africa
              cannot afford to repeat the fossil fuel mistakes of the West. We're building the
              infrastructure to skip them entirely.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission statement */}
      <section className="bg-pce-gray-light py-16 md:py-20">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div
              className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
              style={{ background: "#0058B3" }}
            >
              <div
                className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(48,231,237,0.12) 0%, transparent 70%)" }}
              />
              <div
                className="w-12 h-1 rounded-full mb-8"
                style={{ background: "#30E7ED" }}
              />
              <blockquote className="text-xl md:text-3xl font-light text-white leading-relaxed max-w-3xl mb-8">
                &ldquo;The transition to electric mobility isn&apos;t just an environmental imperative
                — it&apos;s Africa&apos;s greatest economic opportunity. We intend to be the company
                that captures it.&rdquo;
              </blockquote>
              <div>
                <div className="text-white font-semibold">Chidi Okonkwo</div>
                <div className="text-blue-200 text-sm">Co-founder & CEO, Phoenix Creed Energy</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">What we stand for</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="surface surface-hover rounded-2xl p-8 h-full">
                <div
                  className="w-8 h-1 rounded-full mb-6"
                  style={{ background: "linear-gradient(90deg, #0058B3, #30E7ED)" }}
                />
                <h3 className="text-xl font-bold text-pce-dark mb-3">{v.title}</h3>
                <p className="text-pce-gray leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Leadership</h2>
            <p className="text-pce-gray text-lg max-w-sm mx-auto">Six countries. One mission.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((person, i) => (
              <AnimatedSection key={person.name} delay={i * 0.08}>
                <div className="surface surface-hover bg-white rounded-2xl p-6 flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                    style={{ background: "linear-gradient(135deg, #0058B3, #30E7ED)" }}
                  >
                    {person.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-pce-dark">{person.name}</div>
                    <div className="text-deep-blue text-xs font-medium mb-0.5">{person.role}</div>
                    <div className="text-pce-gray text-xs">{person.country}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
