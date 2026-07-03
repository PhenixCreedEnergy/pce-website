import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { CTASection } from "@/components/sections/CTASection";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { MapPin, Zap, Battery, CreditCard, Bell, BarChart3, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "PCE App",
  description: "The PCE App — your all-in-one EV charging companion for Africa.",
};

const allFeatures = [
  { icon: MapPin, title: "Live Map", desc: "See all nearby chargers with real-time availability, pricing, and amenities." },
  { icon: Zap, title: "One-Tap Start", desc: "NFC and QR support — walk up and charge in under 30 seconds." },
  { icon: Battery, title: "Smart Scheduling", desc: "Automatically charge during off-peak hours to save money." },
  { icon: CreditCard, title: "PCE Wallet", desc: "Pre-load credits and pay across the entire network with one balance." },
  { icon: Bell, title: "Smart Alerts", desc: "Get notified when your charge is complete or a spot opens up." },
  { icon: BarChart3, title: "Energy Dashboard", desc: "Track your kWh, spending, and CO₂ offset over time." },
  { icon: Shield, title: "Secure Auth", desc: "Biometric login and encrypted payment data at every step." },
  { icon: Star, title: "Reviews & Ratings", desc: "Community-sourced reliability ratings for every station." },
];

const plans = [
  {
    name: "Driver",
    price: "Free",
    desc: "For individual EV owners",
    features: ["Find & navigate chargers", "Pay-as-you-go sessions", "Basic energy tracking", "Community ratings"],
    cta: "Download free",
    highlight: false,
  },
  {
    name: "Plus",
    price: "₦4,999/mo",
    desc: "For frequent drivers",
    features: ["Everything in Driver", "PCE Wallet pre-load discounts", "Priority charger reservation", "Advanced analytics", "24/7 priority support"],
    cta: "Start free trial",
    highlight: true,
  },
  {
    name: "Fleet",
    price: "Custom",
    desc: "For businesses & operators",
    features: ["Everything in Plus", "Multi-vehicle management", "API & fleet integrations", "Dedicated account manager", "Custom billing & invoicing"],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function PCEAppPage() {
  return (
    <>
      {/* Hero — Apple product style */}
      <section className="relative bg-pce-gray-light overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(48,231,237,0.07) 0%, transparent 60%)" }}
        />
        <div className="relative section-padding max-w-[1440px] mx-auto text-center">
          <AnimatedSection>
            <div className="chip mx-auto mb-5">PCE App</div>
            <h1 className="text-5xl md:text-7xl font-bold text-pce-dark mb-6 leading-tight">
              Every charger.<br />One app.
            </h1>
            <p className="text-pce-gray text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-8">
              The PCE App is your co-pilot for Africa's electric roads.
              Available now on iOS and Android.
            </p>
            <div className="flex justify-center">
              <StoreBadges height={52} gap={24} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive app preview */}
      <AppPreviewSection />

      {/* Feature grid */}
      <section className="bg-pce-gray-light py-20 md:py-28">
        <div className="section-padding max-w-[1440px] mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Everything you need</h2>
            <p className="text-pce-gray text-lg max-w-xl mx-auto">Eight reasons PCE App is the best EV companion in Africa.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.06}>
                <div className="surface surface-hover rounded-2xl p-6 h-full bg-white">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "rgba(0,88,179,0.08)" }}
                  >
                    <f.icon size={18} style={{ color: "#0058B3" }} />
                  </div>
                  <h3 className="font-semibold text-pce-dark mb-1.5 text-sm">{f.title}</h3>
                  <p className="text-pce-gray text-xs leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — Apple-style */}
      <section className="section-padding max-w-[1440px] mx-auto py-20 md:py-28">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-pce-dark mb-4">Simple, transparent pricing</h2>
          <p className="text-pce-gray text-lg max-w-lg mx-auto">Start free. Scale as you grow.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.1}>
              <div
                className="flex flex-col h-full rounded-2xl p-8"
                style={
                  plan.highlight
                    ? { background: "#0058B3", boxShadow: "0 8px 32px rgba(0,88,179,0.25)" }
                    : { background: "#F5F7FA", border: "0.5px solid #E5E7EB" }
                }
              >
                {plan.highlight && (
                  <span
                    className="self-start px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: "rgba(48,231,237,0.2)", color: "#30E7ED" }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className={`font-bold text-xl mb-1 ${plan.highlight ? "text-white" : "text-pce-dark"}`}>{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-blue-200" : "text-pce-gray"}`}>{plan.desc}</p>
                <div
                  className={`text-4xl font-bold mb-6 ${plan.highlight ? "text-white" : "text-pce-dark"}`}
                >
                  {plan.price}
                </div>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={
                          plan.highlight
                            ? { background: "rgba(48,231,237,0.2)" }
                            : { background: "rgba(0,88,179,0.10)" }
                        }
                      >
                        <span style={{ color: plan.highlight ? "#30E7ED" : "#0058B3", fontSize: 9, fontWeight: 700 }}>✓</span>
                      </div>
                      <span className={plan.highlight ? "text-blue-100" : "text-pce-gray"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={
                    plan.highlight
                      ? { background: "#30E7ED", color: "#0058B3" }
                      : { background: "white", color: "#0058B3", border: "0.5px solid rgba(0,88,179,0.25)" }
                  }
                >
                  {plan.cta}
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
