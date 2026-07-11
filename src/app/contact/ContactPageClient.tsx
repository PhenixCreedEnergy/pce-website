"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const offices = [
  { city: "Lagos", country: "Nigeria", address: "Victoria Island, Lagos", email: "lagos@phoenixcreedenergy.com", phone: "+234 1 123 4567" },
];

const inquiryTypes = [
  "General inquiry", "EV Service & Maintenance", "Fleet partnership", "Property partnership",
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
    "w-full bg-white border border-pce-border rounded-lg px-4 py-3 text-pce-dark placeholder:text-pce-gray/45 focus:outline-none focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/10 transition-all text-sm";

  return (
    <main className="bg-white">
      <section className="section-padding max-w-[1120px] mx-auto min-h-[44vh] md:min-h-[62vh] flex flex-col justify-end pt-24 md:pt-28 pb-10 md:pb-16">
        <AnimatedSection>
          <div className="max-w-2xl">
            <h1 className="font-bold text-pce-dark leading-[1.08] tracking-normal" style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", maxWidth: 620 }}>
              Contact us
            </h1>
            <p className="text-pce-gray leading-relaxed mt-4" style={{ fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", maxWidth: 540 }}>
              Tell us what you&apos;re building, operating, or looking to solve. We&apos;ll connect you with the right Phoenix Creed Energy team.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="mt-8 md:mt-10 overflow-hidden rounded-lg border border-pce-border bg-white shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.35fr]">
              <aside className="border-b border-pce-border bg-pce-gray-light/60 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <h2 className="text-lg font-bold text-pce-dark">Start a conversation</h2>
                <p className="mt-3 text-sm leading-6 text-pce-gray">
                  For partnerships, EV service, fleet solutions, investor relations, and support.
                </p>

                <div className="mt-8 space-y-5">
                  {offices.map((office) => (
                    <div key={office.city} className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-pce-dark">{office.city}</p>
                        <p className="text-sm text-pce-gray">{office.country}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex gap-3 text-sm text-pce-gray">
                          <MapPin size={16} className="mt-0.5 shrink-0 text-deep-blue" />
                          <span>{office.address}</span>
                        </div>
                        <a
                          href={`mailto:${office.email}`}
                          className="flex gap-3 text-sm text-pce-gray transition-colors hover:text-pce-dark"
                        >
                          <Mail size={16} className="mt-0.5 shrink-0 text-deep-blue" />
                          <span>{office.email}</span>
                        </a>
                        <a
                          href={`tel:${office.phone.replace(/\s/g, "")}`}
                          className="flex gap-3 text-sm text-pce-gray transition-colors hover:text-pce-dark"
                        >
                          <Phone size={16} className="mt-0.5 shrink-0 text-deep-blue" />
                          <span>{office.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5 sm:p-8 lg:p-10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[320px] md:min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-deep-blue/10">
                      <CheckCircle2 size={24} className="text-deep-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-pce-dark">Message received.</h2>
                    <p className="mt-2 text-pce-gray">We&apos;ll be in touch within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-xl font-bold text-pce-dark">Send a message</h2>
                      <p className="mt-1 text-sm text-pce-gray">All fields are required.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-pce-dark">Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-pce-dark">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass}
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-pce-dark">Inquiry type</label>
                      <select
                        required
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className={inputClass}
                      >
                        <option value="" disabled>Select a topic</option>
                        {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-pce-dark">Message</label>
                      <textarea
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={inputClass}
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-deep-blue px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-deep-blue/90 hover:shadow-blue-sm"
                    >
                      <Mail size={16} />
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </main>
  );
}
