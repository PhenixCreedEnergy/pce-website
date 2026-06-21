"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BarChart2, Users, Info, UserCircle, BookOpen } from "lucide-react";
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
};

type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
  products?: true;
};

/* ─── Data ───────────────────────────────────────────────────── */
const PRODUCTS: ProductItem[] = [
  { label: "Charging Network",    href: "/charging-network", description: "Ultra-fast charging infrastructure across Africa",              image: "/product-ev-charger.png" },
  { label: "PCE App",             href: "/pce-app",          description: "Manage charging, payments, navigation and energy usage",        image: "/product-ev-app.png" },
  { label: "EV Power Banks",      href: "/contact",          description: "Portable emergency charging solutions for EV drivers",          image: "/product-power-bank.png" },
  { label: "Energy Storage Units",href: "/contact",          description: "Grid-scale battery systems for homes, businesses and operators", image: "/product-storage-unit.png" },
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
      { label: "Team",     href: "/about", description: "The people building Africa's EV backbone",   icon: UserCircle },
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
      {/* Bridge over the gap between nav and panel */}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
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

/* ─── Nav item ───────────────────────────────────────────────── */
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
          onMouseEnter={() => onEnter("")}   // entering a plain link closes all dropdowns
          style={{ position: "relative", display: "inline-flex", alignItems: "center", padding: "6px 14px", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.01em", color: active ? "#0058B3" : "rgba(0,0,0,0.55)", textDecoration: "none", transition: "color 0.15s" }}
        >
          {item.label}
          {active && <motion.span layoutId="nav-underline" style={{ position: "absolute", bottom: -2, left: 14, right: 14, height: 2, borderRadius: 1, background: "linear-gradient(90deg,#30E7ED,#0058B3)", boxShadow: "0 0 8px rgba(48,231,237,0.6)" }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
        </Link>
      </li>
    );
  }

  return (
    <li style={{ position: "relative" }}>
      <div onMouseEnter={() => onEnter(item.label)} onMouseLeave={onLeave}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", fontSize: 13.5, fontWeight: 500, letterSpacing: "0.01em", color: isOpen || active ? "#0058B3" : "rgba(0,0,0,0.55)", background: "none", border: "none", cursor: "pointer", transition: "color 0.15s", position: "relative" }}>
          {item.label}
          <ChevronDown size={13} style={{ transition: "transform 0.2s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }} />
          {active && <motion.span layoutId="nav-underline" style={{ position: "absolute", bottom: -2, left: 14, right: 14, height: 2, borderRadius: 1, background: "linear-gradient(90deg,#30E7ED,#0058B3)", boxShadow: "0 0 8px rgba(48,231,237,0.6)" }} transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />}
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

/* ─── Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setActiveMenu(null); }, [pathname]);

  // Entering any menu item — cancel pending close and open that menu immediately
  const onEnter = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label || null);
  }, []);

  // Leaving — start close timer; entering another item will cancel it
  const onLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href) return pathname === item.href;
    if (item.products) return ["/charging-network", "/pce-app"].some(p => pathname.startsWith(p));
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
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div className="section-padding max-w-[1440px] mx-auto flex items-center justify-between" style={{ height: 72 }}>
          <Link href="/" aria-label="Phoenix Creed Energy home" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Logo height={40} priority />
          </Link>

          <ul className="flex items-center" style={{ gap: 2, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV.map(item => (
              <NavItemComponent key={item.label} item={item} active={isActive(item)}
                activeMenu={activeMenu} onEnter={onEnter} onLeave={onLeave} />
            ))}
          </ul>

          <Link
            href="/contact"
            className="inline-flex items-center"
            style={{ padding: "9px 22px", borderRadius: 999, background: "#0058B3", border: "1px solid #0058B3", color: "white", fontSize: 13, fontWeight: 600, letterSpacing: "0.01em", textDecoration: "none", transition: "background 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#004a9a"; el.style.boxShadow = "0 4px 16px rgba(0,88,179,0.30)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0058B3"; el.style.boxShadow = "none"; }}
          >
            Get Started
          </Link>
        </div>
      </motion.header>

      {/* Products mega menu — outside motion.header to avoid transform containing-block */}
      <AnimatePresence>
        {activeMenu === "Products" && (
          <ProductsMegaMenu
            onClose={() => setActiveMenu(null)}
            onEnter={() => onEnter("Products")}
            onLeave={onLeave}
          />
        )}
      </AnimatePresence>
    </>
  );
}
