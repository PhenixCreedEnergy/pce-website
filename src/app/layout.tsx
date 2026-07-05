import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { defaultDescription, defaultOgImage, siteName, siteUrl } from "@/lib/seo";

const roboto = localFont({
  src: [
    {
      path: "../../public/Roboto/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Powering Africa's Electric Future`,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "electric vehicles", "EV charging", "Africa", "sustainable energy",
    "Phoenix Creed Energy", "PCE",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  // Prevent Safari/iOS from auto-detecting numbers as phone links,
  // which causes DOM mutation after SSR and triggers hydration mismatch.
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false,
  },
  icons: {
    icon: defaultOgImage,
    apple: defaultOgImage,
    shortcut: defaultOgImage,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | Powering Africa's Electric Future`,
    description: defaultDescription,
    images: [{ url: defaultOgImage, width: 1254, height: 1254, alt: `${siteName} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Powering Africa's Electric Future`,
    description: defaultDescription,
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased bg-white text-pce-dark`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
