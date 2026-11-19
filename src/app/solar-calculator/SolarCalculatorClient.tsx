"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sun, Zap, BatteryCharging, Gauge, Plus, Trash2, Fuel, Mail, Phone, Info, Home, Building2, Store,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const INK = "#0b1530";
const INK_SOFT = "rgba(11,21,48,0.62)";
const ACCENT = "#0058B3";
const TEAL = "#0a8f99";
const CYAN = "#30E7ED";
const LIGHT_BG = "#f4f7fc";

const SALES_EMAIL = "info@pceenergies.com";
const SALES_PHONE = "08064530306";

/* ─── Sizing assumptions ─────────────────────────────────────── */
// Share of rated panel output that reaches the loads after heat, dust, wiring and inverter losses.
const SYSTEM_EFFICIENCY = 0.75;
const PANEL_W = 550;
const PANEL_AREA_M2 = 2.6;
// Inverter: 0.8 power factor plus 20% headroom for motor start-up surges.
const POWER_FACTOR = 0.8;
const INVERTER_HEADROOM = 1.2;
const INVERTER_SIZES_KVA = [1, 1.5, 2.5, 3.5, 5, 7.5, 10, 15, 20, 30, 50];
const BATTERY_ROUND_TRIP = 0.95;
const LFP_MODULE_KWH = 5;
const LEAD_ACID_KWH = 12 * 220 / 1000; // one 12 V 220 Ah tubular battery
// Small petrol/diesel generators burn roughly 0.35 L per kWh at typical part load.
const GENERATOR_L_PER_KWH = 0.35;
const CO2_KG_PER_L = 2.3;

// Approximate average daily peak sun hours.
const CITIES = [
  { name: "Lagos", psh: 4.5 },
  { name: "Abuja", psh: 5.5 },
  { name: "Port Harcourt", psh: 4.2 },
  { name: "Ibadan", psh: 4.8 },
  { name: "Benin City", psh: 4.5 },
  { name: "Enugu", psh: 4.8 },
  { name: "Jos", psh: 5.6 },
  { name: "Kaduna", psh: 5.8 },
  { name: "Kano", psh: 6.0 },
  { name: "Sokoto", psh: 6.2 },
  { name: "Maiduguri", psh: 6.2 },
];

const BACKUP_OPTIONS = [
  { label: "Evenings", detail: "Batteries hold about 40% of your daily use", share: 0.4 },
  { label: "Evening & overnight", detail: "Batteries hold about 60% of your daily use", share: 0.6 },
  { label: "A full day without sun", detail: "Batteries hold all of one day's use", share: 1 },
];

const CHEMISTRIES = {
  lithium: { label: "Lithium (LFP)", dod: 0.9 },
  leadAcid: { label: "Tubular lead-acid", dod: 0.5 },
} as const;
type Chemistry = keyof typeof CHEMISTRIES;

type CatalogItem = { name: string; watts: number; hours: number };

const CATALOG: CatalogItem[] = [
  { name: "LED bulb", watts: 10, hours: 6 },
  { name: "Ceiling fan", watts: 75, hours: 10 },
  { name: "Standing fan", watts: 60, hours: 8 },
  { name: "LED TV", watts: 100, hours: 6 },
  { name: "Decoder / Wi-Fi router", watts: 20, hours: 8 },
  { name: "Laptop", watts: 65, hours: 6 },
  { name: "Desktop computer", watts: 200, hours: 8 },
  { name: "Phone charger", watts: 10, hours: 3 },
  // Compressors cycle on and off, so a fridge plugged in all day runs for roughly 10 hours.
  { name: "Refrigerator", watts: 150, hours: 10 },
  { name: "Chest freezer", watts: 200, hours: 12 },
  { name: "Air conditioner (1 HP)", watts: 900, hours: 6 },
  { name: "Air conditioner (1.5 HP)", watts: 1300, hours: 6 },
  { name: "Washing machine", watts: 500, hours: 1 },
  { name: "Microwave", watts: 1000, hours: 0.3 },
  { name: "Electric iron", watts: 1000, hours: 0.5 },
  { name: "Electric kettle", watts: 1500, hours: 0.2 },
  { name: "Water pump (0.75 HP)", watts: 750, hours: 1 },
  { name: "Printer", watts: 50, hours: 2 },
  { name: "CCTV camera", watts: 10, hours: 24 },
  { name: "POS terminal", watts: 15, hours: 10 },
];

type Row = { id: number; name: string; watts: string; qty: string; hours: string };

let nextId = 1;
function rowFrom(name: string, qty: number, hours?: number): Row {
  const item = CATALOG.find((c) => c.name === name)!;
  return { id: nextId++, name, watts: String(item.watts), qty: String(qty), hours: String(hours ?? item.hours) };
}

const PRESETS = [
  {
    key: "apartment",
    label: "Apartment",
    icon: Home,
    rows: () => [
      rowFrom("LED bulb", 8), rowFrom("Ceiling fan", 2), rowFrom("LED TV", 1), rowFrom("Decoder / Wi-Fi router", 1),
      rowFrom("Refrigerator", 1), rowFrom("Laptop", 2), rowFrom("Phone charger", 3),
    ],
  },
  {
    key: "home",
    label: "Family home",
    icon: Building2,
    rows: () => [
      rowFrom("LED bulb", 15), rowFrom("Ceiling fan", 4), rowFrom("LED TV", 2), rowFrom("Decoder / Wi-Fi router", 1),
      rowFrom("Refrigerator", 1), rowFrom("Chest freezer", 1), rowFrom("Laptop", 2), rowFrom("Phone charger", 4),
      rowFrom("Air conditioner (1.5 HP)", 1), rowFrom("Washing machine", 1), rowFrom("Water pump (0.75 HP)", 1),
    ],
  },
  {
    key: "office",
    label: "Office or shop",
    icon: Store,
    rows: () => [
      rowFrom("LED bulb", 12, 9), rowFrom("Ceiling fan", 4, 9), rowFrom("Air conditioner (1 HP)", 1, 8),
      rowFrom("Desktop computer", 4), rowFrom("Printer", 1), rowFrom("Decoder / Wi-Fi router", 1, 24),
      rowFrom("CCTV camera", 4), rowFrom("Refrigerator", 1),
    ],
  },
];

function num(v: string) {
  const n = parseFloat(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function size(rows: Row[], psh: number, backupShare: number, chemistry: Chemistry) {
  const dailyWh = rows.reduce((s, r) => s + num(r.watts) * num(r.qty) * Math.min(num(r.hours), 24), 0);
  const peakW = rows.reduce((s, r) => s + num(r.watts) * num(r.qty), 0);
  const dailyKWh = dailyWh / 1000;

  const panels = dailyWh > 0 ? Math.ceil(dailyWh / (psh * SYSTEM_EFFICIENCY) / PANEL_W) : 0;
  const pvKWp = (panels * PANEL_W) / 1000;

  const neededKVA = (peakW / POWER_FACTOR) * INVERTER_HEADROOM / 1000;
  const inverterKVA = peakW === 0 ? 0 : INVERTER_SIZES_KVA.find((s) => s >= neededKVA) ?? Math.ceil(neededKVA / 10) * 10;

  const { dod } = CHEMISTRIES[chemistry];
  const usableKWh = dailyKWh * backupShare;
  const nominalKWh = usableKWh / dod / BATTERY_ROUND_TRIP;

  let batteryCount: number;
  let batteryUnit: string;
  if (chemistry === "lithium") {
    batteryCount = Math.ceil(nominalKWh / LFP_MODULE_KWH);
    batteryUnit = `${LFP_MODULE_KWH} kWh module`;
  } else {
    // Lead-acid banks are wired in series strings that match the inverter's DC voltage.
    const bankV = inverterKVA <= 1 ? 12 : inverterKVA <= 3.5 ? 24 : 48;
    const perString = bankV / 12;
    batteryCount = Math.ceil(nominalKWh / LEAD_ACID_KWH / perString) * perString;
    batteryUnit = "12 V 220 Ah battery";
  }
  const installedKWh = chemistry === "lithium" ? batteryCount * LFP_MODULE_KWH : batteryCount * LEAD_ACID_KWH;

  const fuelLitresYear = dailyKWh * 365 * GENERATOR_L_PER_KWH;

  return {
    dailyKWh, peakW, panels, pvKWp, roofM2: panels * PANEL_AREA_M2, inverterKVA,
    batteryCount, batteryUnit, installedKWh, fuelLitresYear,
    co2Tonnes: (fuelLitresYear * CO2_KG_PER_L) / 1000,
  };
}

const fmt = (n: number, d = 0) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const count = (n: number, unit: string) => `${fmt(n)} × ${unit}${n === 1 ? "" : "s"}`;

/* ─── UI bits ────────────────────────────────────────────────── */
function Eyebrow({ children, color = ACCENT }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color, marginBottom: 14 }}>
      <span style={{ width: 3, height: 16, borderRadius: 2, background: color }} />
      {children}
    </p>
  );
}

function StepCard({ step, title, children }: { step: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white p-5 sm:p-8" style={{ border: "1px solid rgba(11,21,48,0.07)", boxShadow: "0 16px 40px rgba(11,21,48,0.05)" }}>
      <div className="flex items-center gap-3" style={{ marginBottom: 20 }}>
        <span className="flex items-center justify-center rounded-full text-sm font-bold text-white" style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${ACCENT}, ${TEAL})` }}>
          {step}
        </span>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: INK, margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({ options, value, onChange }: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className="rounded-full text-sm font-medium transition-colors duration-200"
            style={{
              padding: "10px 18px",
              background: active ? INK : "#fff",
              color: active ? "#fff" : INK,
              border: `1px solid ${active ? INK : "rgba(11,21,48,0.14)"}`,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-pce-border bg-white px-3 py-2.5 text-sm text-pce-dark focus:outline-none focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/10 transition-all";

function ResultTile({ icon: Icon, label, value, unit, detail }: {
  icon: React.ElementType; label: string; value: string; unit: string; detail: string;
}) {
  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
      <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        <Icon size={14} style={{ color: CYAN }} /> {label}
      </div>
      <p style={{ margin: "10px 0 4px", color: "#fff", fontSize: "1.9rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        {value} <span style={{ fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{unit}</span>
      </p>
      <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{detail}</p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function SolarCalculatorClient() {
  const [preset, setPreset] = useState("home");
  const [rows, setRows] = useState<Row[]>(() => PRESETS[1].rows());
  const [city, setCity] = useState("Lagos");
  const [backupShare, setBackupShare] = useState(0.6);
  const [chemistry, setChemistry] = useState<Chemistry>("lithium");
  const [adding, setAdding] = useState("");

  const psh = CITIES.find((c) => c.name === city)?.psh ?? 4.5;
  const r = useMemo(() => size(rows, psh, backupShare, chemistry), [rows, psh, backupShare, chemistry]);
  const hasLoad = r.dailyKWh > 0;

  function loadPreset(key: string) {
    setPreset(key);
    setRows(PRESETS.find((p) => p.key === key)!.rows());
  }

  function updateRow(id: number, field: keyof Omit<Row, "id">, value: string) {
    setPreset("");
    setRows((rs) => rs.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  }

  function removeRow(id: number) {
    setPreset("");
    setRows((rs) => rs.filter((row) => row.id !== id));
  }

  function addRow(name: string) {
    setPreset("");
    setRows((rs) => [
      ...rs,
      name === "custom" ? { id: nextId++, name: "", watts: "100", qty: "1", hours: "4" } : rowFrom(name, 1),
    ]);
    setAdding("");
  }

  const backup = BACKUP_OPTIONS.find((b) => b.share === backupShare)!;
  const batteryLabel = CHEMISTRIES[chemistry].label;

  const mailBody = [
    "Hello PCE team,",
    "",
    "I'd like a quote for a solar system. My estimate from your solar calculator:",
    "",
    `Location: ${city}`,
    `Daily energy use: ${fmt(r.dailyKWh, 1)} kWh`,
    `Peak load: ${fmt(r.peakW)} W`,
    `Solar array: ${fmt(r.pvKWp, 2)} kWp (${count(r.panels, `${PANEL_W} W panel`)})`,
    `Inverter: ${fmt(r.inverterKVA, 1)} kVA`,
    `Battery: ${fmt(r.installedKWh, 1)} kWh ${batteryLabel} (${count(r.batteryCount, r.batteryUnit)}), backup for ${backup.label.toLowerCase()}`,
    "",
    "Appliances:",
    ...rows.filter((row) => num(row.watts) * num(row.qty) > 0).map((row) => `- ${row.qty} x ${row.name || "Appliance"}, ${row.watts} W, ${row.hours} h/day`),
    "",
    "Name:",
    "Phone:",
    "Address:",
  ].join("\n");
  const mailHref = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent("Solar quote request")}&body=${encodeURIComponent(mailBody)}`;

  return (
    <main style={{ background: LIGHT_BG }}>
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden max-w-full bg-[#040814] min-h-[56vh] md:min-h-[68vh]">
        <motion.div className="absolute inset-0" initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }}>
          <Image src="/solar-hub.png" alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "center 60%" }} />
        </motion.div>
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(4,8,20,0.7) 0%, rgba(4,8,20,0.25) 55%, transparent 100%), linear-gradient(180deg, rgba(4,8,20,0.3) 0%, rgba(4,8,20,0.1) 40%, rgba(4,8,20,0.85) 100%)" }} />
        <div className="absolute inset-0 z-20 flex items-end section-padding pt-24" style={{ paddingBottom: "clamp(42px, 7vh, 72px)" }}>
          <div style={{ maxWidth: 640 }}>
            <motion.h1
              className="font-sans font-bold tracking-normal text-white"
              style={{ fontSize: "clamp(2.05rem, 3.05vw, 3.65rem)", lineHeight: 1.08, marginBottom: "clamp(14px, 1.6vw, 20px)", textShadow: "0 3px 24px rgba(0,0,0,0.58)" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              <span className="block">Solar Calculator.</span>
              <span className="block">
                Size your{" "}
                <span className="bg-clip-text text-transparent italic" style={{ backgroundImage: "linear-gradient(135deg, #30E7ED 0%, #7ab8ff 100%)" }}>
                  system in a minute.
                </span>
              </span>
            </motion.h1>
            <motion.p
              style={{ fontSize: "clamp(0.95rem, 0.95vw, 1.05rem)", color: "rgba(255,255,255,0.85)", maxWidth: 540, lineHeight: 1.65, textShadow: "0 2px 16px rgba(0,0,0,0.55)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
            >
              List what you want to power, pick your city, and see the solar panels, inverter and batteries you need.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section style={{ padding: "clamp(48px, 7vw, 96px) 0 clamp(72px, 9vw, 120px)" }}>
        <div className="section-padding mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
            <div className="flex min-w-0 flex-col gap-6">
              <StepCard step={1} title="What do you want to power?">
                <p style={{ fontSize: 14, color: INK_SOFT, margin: "0 0 14px" }}>Start from a typical setup, then adjust it to match yours.</p>
                <Segmented
                  options={PRESETS.map((p) => ({ value: p.key, label: p.label }))}
                  value={preset}
                  onChange={loadPreset}
                />

                <div className="mt-6 hidden grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-wider sm:grid" style={{ color: INK_SOFT }}>
                  <span className="col-span-5">Appliance</span>
                  <span className="col-span-2">Watts</span>
                  <span className="col-span-2">Qty</span>
                  <span className="col-span-2">Hours/day</span>
                </div>

                <ul className="mt-3 flex flex-col gap-3 sm:mt-2">
                  {rows.map((row) => (
                    <li key={row.id} className="grid grid-cols-12 items-center gap-2 rounded-2xl p-3 sm:gap-3 sm:rounded-none sm:p-0" style={{ background: "transparent" }}>
                      <input
                        aria-label="Appliance name"
                        className={`${inputClass} col-span-10 sm:col-span-5`}
                        value={row.name}
                        placeholder="Appliance"
                        onChange={(e) => updateRow(row.id, "name", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        aria-label={`Remove ${row.name || "appliance"}`}
                        className="col-span-2 flex h-10 items-center justify-center rounded-xl text-pce-gray transition-colors hover:bg-red-50 hover:text-red-600 sm:order-last sm:col-span-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      {(["watts", "qty", "hours"] as const).map((field) => (
                        <label key={field} className="col-span-4 sm:col-span-2">
                          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider sm:hidden" style={{ color: INK_SOFT }}>
                            {field === "watts" ? "Watts" : field === "qty" ? "Qty" : "Hours/day"}
                          </span>
                          <input
                            type="number"
                            inputMode="decimal"
                            min={0}
                            max={field === "hours" ? 24 : undefined}
                            step={field === "hours" ? 0.5 : 1}
                            className={inputClass}
                            value={row[field]}
                            onChange={(e) => updateRow(row.id, field, e.target.value)}
                          />
                        </label>
                      ))}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-3">
                  <Plus size={18} style={{ color: ACCENT, flexShrink: 0 }} />
                  <select
                    aria-label="Add an appliance"
                    className={`${inputClass} max-w-sm`}
                    value={adding}
                    onChange={(e) => e.target.value && addRow(e.target.value)}
                  >
                    <option value="">Add an appliance…</option>
                    {CATALOG.map((c) => <option key={c.name} value={c.name}>{c.name} ({c.watts} W)</option>)}
                    <option value="custom">Something else…</option>
                  </select>
                </div>
                <p className="mt-4 flex items-start gap-2" style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.6 }}>
                  <Info size={14} style={{ flexShrink: 0, marginTop: 3 }} />
                  The wattage is usually on a label at the back or bottom of the appliance. Hours are how long it runs on a typical day.
                </p>
              </StepCard>

              <StepCard step={2} title="Where is the system going?">
                <label className="block max-w-sm">
                  <span className="mb-2 block text-sm font-medium" style={{ color: INK }}>City</span>
                  <select className={inputClass} value={city} onChange={(e) => setCity(e.target.value)}>
                    {CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </label>
                <p style={{ fontSize: 13, color: INK_SOFT, margin: "12px 0 0" }}>
                  {city} gets about {fmt(psh, 1)} peak sun hours a day on average. Further north means more sun and fewer panels.
                </p>
              </StepCard>

              <StepCard step={3} title="How much backup do you want?">
                <p style={{ fontSize: 14, color: INK_SOFT, margin: "0 0 14px" }}>When should the batteries keep you running without sun?</p>
                <Segmented
                  options={BACKUP_OPTIONS.map((b) => ({ value: b.share, label: b.label }))}
                  value={backupShare}
                  onChange={setBackupShare}
                />
                <p style={{ fontSize: 13, color: INK_SOFT, margin: "10px 0 22px" }}>{backup.detail}.</p>
                <p style={{ fontSize: 14, color: INK_SOFT, margin: "0 0 14px" }}>Battery type</p>
                <Segmented
                  options={(Object.keys(CHEMISTRIES) as Chemistry[]).map((k) => ({ value: k, label: CHEMISTRIES[k].label }))}
                  value={chemistry}
                  onChange={setChemistry}
                />
                <p style={{ fontSize: 13, color: INK_SOFT, margin: "10px 0 0" }}>
                  {chemistry === "lithium"
                    ? "Lithium lasts around 10 years and can use 90% of its capacity. It costs more up front."
                    : "Lead-acid is cheaper up front but should only be drained to 50%, so you need about twice the capacity, and it wears out sooner."}
                </p>
              </StepCard>
            </div>

            {/* ── Results ── */}
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl p-5 sm:p-8" style={{ background: "#04122e", boxShadow: "0 30px 80px rgba(4,18,46,0.35)" }}>
                <Eyebrow color={CYAN}>Your estimated system</Eyebrow>
                {hasLoad ? (
                  <>
                    <p style={{ margin: "0 0 22px", color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>
                      You use about <strong style={{ color: "#fff" }}>{fmt(r.dailyKWh, 1)} kWh a day</strong>, with up to{" "}
                      <strong style={{ color: "#fff" }}>{fmt(r.peakW)} W</strong> if everything runs at once.
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      <ResultTile
                        icon={Sun}
                        label="Solar panels"
                        value={fmt(r.pvKWp, r.pvKWp < 10 ? 2 : 1)}
                        unit="kWp"
                        detail={`${count(r.panels, `${PANEL_W} W panel`)}, about ${fmt(r.roofM2)} m² of roof`}
                      />
                      <ResultTile
                        icon={Gauge}
                        label="Inverter"
                        value={fmt(r.inverterKVA, r.inverterKVA % 1 ? 1 : 0)}
                        unit="kVA"
                        detail="Handles your peak load with room for motors starting up"
                      />
                      <ResultTile
                        icon={BatteryCharging}
                        label="Battery storage"
                        value={fmt(r.installedKWh, 1)}
                        unit="kWh"
                        detail={`${count(r.batteryCount, r.batteryUnit)}, ${batteryLabel}`}
                      />
                    </div>
                    <div className="mt-4 flex items-start gap-3 rounded-2xl p-4" style={{ background: "rgba(48,231,237,0.08)", border: "1px solid rgba(48,231,237,0.2)" }}>
                      <Fuel size={18} style={{ color: CYAN, flexShrink: 0, marginTop: 2 }} />
                      <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                        Running these loads on a generator would burn roughly{" "}
                        <strong style={{ color: "#fff" }}>{fmt(Math.round(r.fuelLitresYear / 10) * 10)} litres of fuel a year</strong>{" "}
                        and emit about {fmt(r.co2Tonnes, 1)} tonnes of CO₂.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={mailHref}
                        className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                        style={{ padding: "15px 28px", background: "#fff", color: INK, boxShadow: "0 10px 34px rgba(48,231,237,0.3)", textDecoration: "none" }}
                      >
                        <Mail size={15} /> Email this estimate for a quote
                      </a>
                      <a
                        href={`tel:${SALES_PHONE}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-white/15"
                        style={{ padding: "15px 28px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.92)", textDecoration: "none" }}
                      >
                        <Phone size={15} /> Call {SALES_PHONE}
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="flex items-start gap-2" style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>
                    <Zap size={16} style={{ color: CYAN, flexShrink: 0, marginTop: 3 }} />
                    Add at least one appliance with its wattage, quantity and hours to see your system size.
                  </p>
                )}
              </div>

              <details className="mt-4 rounded-2xl bg-white p-5" style={{ border: "1px solid rgba(11,21,48,0.07)" }}>
                <summary className="cursor-pointer text-sm font-semibold" style={{ color: INK }}>How we work this out</summary>
                <ul className="mt-3 list-disc space-y-2 pl-5" style={{ fontSize: 13, color: INK_SOFT, lineHeight: 1.6 }}>
                  <li>Daily use is watts × quantity × hours for each appliance.</li>
                  <li>Panels cover a full day&apos;s use from your city&apos;s average peak sun hours, after {Math.round((1 - SYSTEM_EFFICIENCY) * 100)}% losses to heat, dust and wiring.</li>
                  <li>The inverter is sized for every appliance running at once, at a 0.8 power factor with 20% headroom.</li>
                  <li>Battery capacity covers your chosen backup, at {Math.round(CHEMISTRIES[chemistry].dod * 100)}% usable depth for {batteryLabel}.</li>
                  <li>This is an estimate for planning. Our engineers confirm the final design after a site survey.</li>
                </ul>
              </details>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
