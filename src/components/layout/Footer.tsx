import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    heading: "Products",
    links: [
      { label: "Charging Network", href: "/charging-network" },
      { label: "PCE App",          href: "/pce-app" },
      { label: "EV Power Banks",   href: "/contact" },
      { label: "Energy Storage",   href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog",     href: "/blog" },
      { label: "Careers",  href: "/careers" },
      { label: "Press",    href: "/press" },
    ],
  },
  {
    heading: "Investors",
    links: [
      { label: "Overview",          href: "/investors" },
      { label: "Financial Reports", href: "/investors" },
      { label: "ESG",               href: "/investors" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Get in Touch",    href: "/contact" },
      { label: "Partnerships",    href: "/contact" },
      { label: "Fleet Solutions", href: "/contact" },
      { label: "Support",         href: "/contact" },
    ],
  },
];

const legal = [
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy",    href: "/cookies" },
];

export function Footer() {
  return (
    <footer style={{ background: "#060d1f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="section-padding max-w-[1440px] mx-auto" style={{ paddingTop: 96, paddingBottom: 72 }}>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-20">

          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Logo height={38} />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: 280, lineHeight: 1.8 }}>
              Building Africa's next-generation electric vehicle charging infrastructure — cleaner roads, smarter energy.
            </p>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.heading}>
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "rgba(255,255,255,0.28)" }}>
                {col.heading}
              </p>
              <ul className="space-y-3.5 list-none m-0 p-0">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-150 hover:text-white/90"
                      style={{ color: "rgba(255,255,255,0.48)", textDecoration: "none" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28 }}>
          <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.22)" }}>
            © {new Date().getFullYear()} Phoenix Creed Energy Ltd. RC 1843920.
          </p>
          <div className="flex items-center gap-7">
            {legal.map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[13px] transition-colors duration-150 hover:text-white/60"
                style={{ color: "rgba(255,255,255,0.28)", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
