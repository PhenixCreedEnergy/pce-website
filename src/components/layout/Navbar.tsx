"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart2, Users, Info, UserCircle, BookOpen, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/* ─── Types ──────────────────────────────────────────────────── */
type DropdownItem = {
  label: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

type ProductItem = {
  label: string;
  href: string;
  description: string;
  image: string;
  badge?: string;
};

type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
  products?: true;
};

/* ─── Data ───────────────────────────────────────────────────── */
const PRODUCTS: ProductItem[] = [
  { label: "Charging Network",     href: "/charging-network",      description: "Ultra-fast charging infrastructure across Africa",               image: "/product-ev-charger.png" },
  { label: "PCE App",              href: "/pce-app",               description: "Manage charging, payments, navigation and energy usage",         image: "/product-ev-app.png" },
  { label: "EV Service & Maintenance", href: "/products/ev-service", description: "Professional diagnostics, battery care and full EV servicing", image: "/product-ev-service.png" },
  { label: "EV Power Banks",       href: "/contact",               description: "Portable emergency charging solutions for EV drivers",           image: "/product-power-bank.png",   badge: "Coming Soon" },
  { label: "Energy Storage Units", href: "/contact",               description: "Grid-scale battery systems for homes, businesses and operators",  image: "/product-storage-unit.png", badge: "Coming Soon" },
];

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", products: true },
  {
    label: "Investors",
    dropdown: [
      { label: "Financial Reports",  href: "/investors#revenue-growth", description: "Audited statements, KPIs, and unit economics", icon: BarChart2 },
      { label: "Investor Relations", href: "/investors", description: "Connect with the PCE investor relations team",  icon: Users },
    ],
  },
  {
    label: "Company",
    dropdown: [
      { label: "About Us", href: "/about", description: "Mission, values, and the story behind PCE",  icon: Info },
      { label: "Team",     href: "/about#leadership-team", description: "The people building Africa's EV backbone",   icon: UserCircle },
      { label: "Blog",     href: "/blog",  description: "Insights, news, and infrastructure updates", icon: BookOpen },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* ─── Products mega menu ─────────────────────────────────────── */
function ProductsMegaMenu({ onClose, onEnter, onLeave }: {
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 97 }} />
      <div onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{ position: "fixed", top: 72, left: 0, right: 0, height: 12, zIndex: 99 }} />

      <motion.div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, y: -20, willChange: "opacity, transform" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8, transition: { duration: 0.07, ease: [0.4, 0, 1, 1] } }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 84, left: 0, right: 0,
          marginLeft: "auto", marginRight: "auto",
          width: "min(1200px, calc(100vw - 48px))",
          background: "rgba(6,18,36,0.98)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(48,231,237,0.04) inset",
          zIndex: 98, overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 5%, rgba(48,231,237,0.5) 40%, rgba(48,231,237,0.5) 60%, transparent 95%)" }} />
        <div style={{ padding: "32px 36px 36px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 24px" }}>
            Products
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            {PRODUCTS.map(product => <ProductCard key={product.label} product={product} onClose={onClose} />)}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ─── Product card ───────────────────────────────────────────── */
function ProductCard({ product, onClose }: { product: ProductItem; onClose: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={product.href} onClick={onClose} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16, overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(48,231,237,0.28)" : "rgba(255,255,255,0.07)"}`,
          background: hovered ? "rgba(48,231,237,0.04)" : "rgba(255,255,255,0.03)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(48,231,237,0.10)" : "none",
          transition: "transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
          <Image src={product.image} alt={product.label} fill
            style={{ objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }}
            sizes="(max-width: 1200px) 25vw, 280px"
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,18,36,0.65) 0%, transparent 55%)" }} />
          {product.badge && (
            <div style={{
              position: "absolute", top: 10, right: 10,
              padding: "3px 9px", borderRadius: 999,
              background: "rgba(6,18,36,0.55)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: hovered ? "1px solid rgba(48,231,237,0.55)" : "1px solid rgba(48,231,237,0.28)",
              boxShadow: hovered ? "0 0 10px rgba(48,231,237,0.20)" : "none",
              transition: "border-color 0.22s ease, box-shadow 0.22s ease",
              color: "#fff", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase" as const, whiteSpace: "nowrap" as const,
            }}>
              {product.badge}
            </div>
          )}
        </div>
        <div style={{ padding: "18px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <p style={{ fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.3, color: hovered ? "#fff" : "rgba(255,255,255,0.88)", transition: "color 0.2s" }}>
              {product.label}
            </p>
            <span style={{ fontSize: 14, display: "inline-block", color: hovered ? "#30E7ED" : "rgba(255,255,255,0.22)", transform: hovered ? "translateX(3px)" : "translateX(0)", transition: "color 0.2s, transform 0.2s" }}>→</span>
          </div>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.40)", margin: 0 }}>{product.description}</p>
        </div>
      </div>
    </Link>
  );
}

/* ─── Compact dropdown panel ─────────────────────────────────── */
function DropdownPanel({ items, onEnter, onLeave }: { items: DropdownItem[]; onEnter: () => void; onLeave: () => void }) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.07, ease: [0.4, 0, 1, 1] } }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
        minWidth: 300, background: "rgba(6,18,36,0.98)", backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.55)", padding: "10px", zIndex: 99,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 1, background: "linear-gradient(90deg, transparent, rgba(48,231,237,0.45), transparent)" }} />
      {items.map(item => (
        <Link key={item.href + item.label} href={item.href} style={{ textDecoration: "none" }}>
          <div
            className="flex items-start gap-3.5 px-4 py-3 rounded-xl cursor-pointer"
            style={{ borderLeft: "2px solid transparent", transition: "background 0.15s, border-color 0.15s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(48,231,237,0.06)"; el.style.borderLeftColor = "rgba(48,231,237,0.55)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderLeftColor = "transparent"; }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "rgba(48,231,237,0.09)", border: "1px solid rgba(48,231,237,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <item.icon size={16} style={{ color: "#30E7ED" }} />
            </div>
            <div style={{ paddingTop: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.92)", lineHeight: 1.3, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.40)", lineHeight: 1.45, maxWidth: 220 }}>{item.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </motion.div>
  );
}

/* ─── Nav item (desktop) ─────────────────────────────────────── */
function NavItemComponent({ item, active, activeMenu, onEnter, onLeave }: {
  item: NavItem;
  active: boolean;
  activeMenu: string | null;
  onEnter: (label: string) => void;
  onLeave: () => void;
}) {
  const isOpen = activeMenu === item.label;

  if (!item.dropdown && !item.products) {
    return (
      <li>
        <Link
          href={item.href!}
          onMouseEnter={() => onEnter("")}
          style={{ position: "relative", display: "inline-flex", alignItems: "center", padding: "6px 14px", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.01em", color: active ? "#30E7ED" : "rgba(255,255,255,0.80)", textDecoration: "none", transition: "color 0.15s" }}
        >
          {item.label}
          {active && <span style={{ position: "absolute", bottom: -2, left: 14, right: 14, height: 2, borderRadius: 1, background: "linear-gradient(90deg,#30E7ED,#7ab8ff)", boxShadow: "0 0 8px rgba(48,231,237,0.6)" }} />}
        </Link>
      </li>
    );
  }

  return (
    <li style={{ position: "relative" }}>
      <div onMouseEnter={() => onEnter(item.label)} onMouseLeave={onLeave}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.01em", color: isOpen || active ? "#30E7ED" : "rgba(255,255,255,0.80)", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s", position: "relative" }}>
          {item.label}
          <ChevronDown size={13} style={{ transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }} />
          {active && <span style={{ position: "absolute", bottom: -2, left: 14, right: 14, height: 2, borderRadius: 1, background: "linear-gradient(90deg,#30E7ED,#7ab8ff)", boxShadow: "0 0 8px rgba(48,231,237,0.6)" }} />}
        </button>
        {item.dropdown && (
          <AnimatePresence>
            {isOpen && <DropdownPanel items={item.dropdown} onEnter={() => onEnter(item.label)} onLeave={onLeave} />}
          </AnimatePresence>
        )}
      </div>
    </li>
  );
}

/* ─── Mobile sub-link (dark overlay) ────────────────────────── */
function MobileSubLink({ href, label, badge, onClose }: { href: string; label: string; badge?: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 20px 14px 28px", textDecoration: "none",
        fontSize: 16, fontWeight: 400, letterSpacing: "-0.005em",
        color: "rgba(255,255,255,0.55)",
        minHeight: 52,
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "3px 8px", borderRadius: 999,
          background: "rgba(48,231,237,0.10)", border: "1px solid rgba(48,231,237,0.30)",
          color: "#30E7ED", whiteSpace: "nowrap",
        }}>
          {badge}
        </span>
      )}
    </Link>
  );
}

/* ─── Mobile accordion (dark overlay) ───────────────────────── */
function MobileAccordion({ label, isOpen, onToggle, active, children }: {
  label: string; isOpen: boolean; onToggle: () => void; active: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "20px 24px", borderRadius: 0,
          background: "transparent", border: "none", cursor: "pointer",
          fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em",
          color: isOpen || active ? "#ffffff" : "rgba(255,255,255,0.65)",
          transition: "color 0.2s",
        }}
      >
        {label}
        <ChevronDown
          size={20}
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: isOpen ? "#30E7ED" : "rgba(255,255,255,0.30)",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Simple CSS max-height transition — avoids Framer Motion height:"auto" ResizeObserver on Safari */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? 400 : 0,
          transition: "max-height 0.32s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ paddingBottom: 8, borderLeft: "2px solid rgba(48,231,237,0.30)", marginLeft: 24 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Full-screen Tesla-style mobile overlay ─────────────────── */
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (!isOpen) setExpandedSection(null);
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const mobileProducts = [
    { label: "Charging Stations",        href: "/charging-network" },
    { label: "PCE App",                  href: "/pce-app" },
    { label: "EV Service & Maintenance", href: "/products/ev-service" },
    { label: "EV Power Banks",           href: "/contact", badge: "Coming Soon" },
    { label: "Energy Storage Units",     href: "/contact", badge: "Coming Soon" },
  ];
  const mobileCompany = [
    { label: "About Us", href: "/about" },
    { label: "Team",     href: "/about#leadership-team" },
  ];

  function toggle(section: string) {
    setExpandedSection(prev => prev === section ? null : section);
  }

  const navLinks: { label: string; href?: string; sub?: typeof mobileProducts; subKey?: string; active?: boolean }[] = [
    { label: "Home",      href: "/",          active: pathname === "/" },
    { label: "Products",  subKey: "Products", sub: mobileProducts, active: ["/charging-network", "/pce-app", "/products"].some(p => pathname.startsWith(p)) },
    { label: "Investors", href: "/investors", active: pathname.startsWith("/investors") },
    { label: "Company",   subKey: "Company",  sub: mobileCompany,  active: pathname.startsWith("/about") },
    { label: "Contact",   href: "/contact",   active: pathname === "/contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200,
            background: "linear-gradient(160deg, #060d1f 0%, #091528 55%, #040c1a 100%)",
            display: "flex", flexDirection: "column",
            overflowY: "auto", WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Ambient glow */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(48,231,237,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 80, left: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,88,179,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* Header bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 24px",
            flexShrink: 0,
          }}>
            <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center" }}>
              <Logo height={40} />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 48, height: 48, borderRadius: 14,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.10)",
                cursor: "pointer", color: "rgba(255,255,255,0.80)",
                flexShrink: 0,
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Electric accent line */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(48,231,237,0.35) 30%, rgba(0,88,179,0.35) 70%, transparent 100%)", margin: "0 24px", flexShrink: 0 }} />

          {/* Nav links */}
          <nav style={{ flex: 1, paddingTop: 16 }}>
            {navLinks.map(item => {
              if (item.sub && item.subKey) {
                return (
                  <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <MobileAccordion
                      label={item.label}
                      isOpen={expandedSection === item.subKey}
                      onToggle={() => toggle(item.subKey!)}
                      active={!!item.active}
                    >
                      {item.sub.map(p => (
                        <MobileSubLink key={p.label} href={p.href} label={p.label} badge={(p as { badge?: string }).badge} onClose={onClose} />
                      ))}
                    </MobileAccordion>
                  </div>
                );
              }
              return (
                <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <Link
                    href={item.href!}
                    onClick={onClose}
                    style={{
                      display: "flex", alignItems: "center",
                      padding: "20px 24px",
                      textDecoration: "none",
                      fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em",
                      color: item.active ? "#ffffff" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    {item.label}
                    {item.active && (
                      <span style={{ marginLeft: 10, width: 6, height: 6, borderRadius: "50%", background: "#30E7ED", flexShrink: 0, boxShadow: "0 0 8px #30E7ED" }} />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div style={{ padding: "28px 24px 48px", flexShrink: 0 }}>
            <Link
              href="/contact"
              onClick={onClose}
              style={{
                display: "block", textAlign: "center",
                padding: "18px 24px", borderRadius: 999,
                background: "linear-gradient(135deg, #0058B3 0%, #0070e0 100%)",
                color: "#fff", fontSize: 16, fontWeight: 600,
                letterSpacing: "0.01em", textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0,88,179,0.50), 0 1px 0 rgba(255,255,255,0.12) inset",
              }}
            >
              Get Started
            </Link>
            <p style={{ textAlign: "center", marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.22)", letterSpacing: "0.02em" }}>
              Phoenix Creed Energy
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setActiveMenu(null); }, [pathname]);

  const onEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label || null);
  }, []);

  const onLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    if (item.products) return ["/charging-network", "/pce-app", "/products"].some(p => pathname.startsWith(p));
    if (item.dropdown) return item.dropdown.some(d => d.href !== "/contact" && pathname.startsWith(d.href));
    return false;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(6,13,31,0.72)" : "rgba(6,13,31,0.18)",
          backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
          borderBottom: "none",
          boxShadow: "none",
          transition: "background 0.4s ease",
        }}
      >
        {/* Asymmetric padding: logo hugs the left edge; right side keeps room for the CTA */}
        <div className="pl-3 pr-5 lg:pl-5 lg:pr-10 max-w-[1440px] mx-auto flex items-center justify-between h-[72px] lg:h-[68px]">

          {/* Single Logo instance — responsive height via className to avoid React 19 preload deduplication */}
          <Link href="/" aria-label="Phoenix Creed Energy home" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Logo height={36} className="lg:!h-[48px]" priority />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center" style={{ gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV.map(item => (
              <NavItemComponent key={item.label} item={item} active={isActive(item)}
                activeMenu={activeMenu} onEnter={onEnter} onLeave={onLeave} />
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center"
            style={{ padding: "9px 22px", borderRadius: 999, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.01em", textDecoration: "none", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", transition: "background 0.2s, border-color 0.2s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.22)"; el.style.borderColor = "rgba(255,255,255,0.45)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.12)"; el.style.borderColor = "rgba(255,255,255,0.25)"; }}
          >
            Get Started
          </Link>

          {/* Mobile menu button — flex+lg:hidden on className so Tailwind's display:none wins over inline styles */}
          <button
            className="flex lg:hidden items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            style={{
              height: 44, padding: "0 22px", borderRadius: 9999,
              background: "rgba(255,255,255,0.13)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.22)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
              cursor: "pointer", color: "rgba(255,255,255,0.92)",
              fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Menu
          </button>
        </div>
      </motion.header>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {activeMenu === "Products" && (
          <ProductsMegaMenu
            onClose={() => setActiveMenu(null)}
            onEnter={() => onEnter("Products")}
            onLeave={onLeave}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
