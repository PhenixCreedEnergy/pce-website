"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

const offices = [
  { city: "Lagos", country: "Nigeria", address: "Victoria Island, Lagos", email: "lagos@phoenixcreedenergy.com", phone: "+234 1 123 4567" },
  { city: "Nairobi", country: "Kenya", address: "Westlands, Nairobi", email: "nairobi@phoenixcreedenergy.com", phone: "+254 20 123 4567" },
  { city: "Johannesburg", country: "South Africa", address: "Sandton, Johannesburg", email: "jhb@phoenixcreedenergy.com", phone: "+27 11 123 4567" },
];

const inquiryTypes = [
  "General inquiry", "Fleet partnership", "Property partnership",
  "Investor relations", "Press & media", "Support",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full bg-pce-gray-light border border-pce-border rounded-xl px-4 py-3 text-pce-dark placeholder:text-pce-gray/50 focus:outline-none focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/10 transition-all text-sm";

  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(0,88,179,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,88,179,0.03) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative section-padding max-w-[1440px] mx-auto">
          <AnimatedSection>
            <div className="chip mb-5">Contact</div>
            <h1 className="text-5xl md:text-7xl font-bold text-pce-dark mb-5 max-w-xl leading-tight">
              Let's build<br />something.
            </h1>
            <p className="text-pce-gray text-lg md:text-xl max-w-lg leading-relaxed">
              Whether you're an EV driver, a fleet operator, or an investor — we want to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding max-w-[1440px] mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <AnimatedSection className="lg:col-span-3" direction="left">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="surface rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-4"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ background: "rgba(0,88,179,0.08)" }}
                >
                  <CheckCircle2 size={28} style={{ color: "#0058B3" }} />
                </div>
                <h2 className="text-2xl font-bold text-pce-dark">Message received.</h2>
                <p className="text-pce-gray">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="surface rounded-2xl p-8 md:p-10 flex flex-col gap-5">
                <h2 className="text-xl font-bold text-pce-dark mb-1">Send us a message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-pce-gray uppercase tracking-widest">Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass} placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-pce-gray uppercase tracking-widest">Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass} placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-pce-gray uppercase tracking-widest">Inquiry type</label>
                  <select
                    required value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" disabled>Select a topic</option>
                    {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-pce-gray uppercase tracking-widest">Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputClass} placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-200 hover:shadow-blue-sm mt-1"
                  style={{ background: "#0058B3" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Offices */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <AnimatedSection delay={0.1} direction="right">
              <h2 className="text-xl font-bold text-pce-dark mb-5">Our offices</h2>
            </AnimatedSection>
            {offices.map((office, i) => (
              <AnimatedSection key={office.city} delay={0.1 + i * 0.1} direction="right">
                <div className="surface surface-hover rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(0,88,179,0.08)" }}
                    >
                      <MapPin size={13} style={{ color: "#0058B3" }} />
                    </div>
                    <div>
                      <div className="font-bold text-pce-dark text-sm">{office.city}</div>
                      <div className="text-pce-gray text-xs">{office.country}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 pl-9">
                    <div className="flex items-center gap-2 text-xs text-pce-gray">
                      <MapPin size={11} className="shrink-0" />{office.address}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-pce-gray">
                      <Mail size={11} className="shrink-0" />{office.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-pce-gray">
                      <Phone size={11} className="shrink-0" />{office.phone}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
