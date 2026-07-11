import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    heading: "Products",
    links: [
      { label: "Charging Network", href: "/charging-network" },
      { label: "PCE App",          href: "/pce-app" },
      { label: "EV Power Banks" },
      { label: "Energy Storage" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
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
      <div className="section-padding max-w-[1440px] mx-auto pt-16 pb-12 md:pt-24 md:pb-20">

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
              <p className="text-[11px] tracking-[0.14em] uppercase mb-5"
                style={{ color: "#30E7ED", fontWeight: 600 }}>
                {col.heading}
              </p>
              <ul className="space-y-3.5 list-none m-0 p-0">
                {col.links.map(link => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-150 hover:text-white/90"
                        style={{ color: "rgba(255,255,255,0.48)", textDecoration: "none" }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
                        {link.label}
                      </span>
                    )}
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
            {/* Year is static — Footer is a Server Component, baked at build time. */}
            © {new Date().getFullYear()} Phoenix Creed Energy Ltd.{" "}
            {/* U+200B zero-width space inside the digit run breaks Safari's ≥7-digit phone
                detector regex without affecting visual rendering or copy-paste output. */}
            <span>RC&#8239;1843&#8203;920</span>.
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
