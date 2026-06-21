import Link from "next/link";
import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  Products: [
    { label: "Charging Network", href: "/charging-network" },
    { label: "PCE App", href: "/pce-app" },
    { label: "Fleet Solutions", href: "/fleet" },
    { label: "Home Charging", href: "/home-charging" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  Investors: [
    { label: "Overview", href: "/investors" },
    { label: "Financial Reports", href: "/investors/reports" },
    { label: "ESG", href: "/investors/esg" },
    { label: "Contact IR", href: "/investors/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-pce-gray-light border-t border-pce-border">
      <div className="section-padding max-w-[1440px] mx-auto py-16 md:py-20">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between mb-14">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-5">
              <Logo height={48} />
            </Link>
            <p className="text-pce-gray text-sm leading-relaxed">
              Powering Africa's electric future with world-class charging
              infrastructure and clean energy solutions.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-pce-border bg-white hover:border-deep-blue hover:text-deep-blue text-pce-gray transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-[11px] font-bold tracking-[0.15em] text-pce-dark uppercase mb-4">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-pce-gray hover:text-deep-blue transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-pce-border">
          <p className="text-pce-gray text-xs">
            © {new Date().getFullYear()} Phoenix Creed Energy. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-pce-gray/60">Powering a cleaner continent.</span>
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#30E7ED", boxShadow: "0 0 6px #30E7ED" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
