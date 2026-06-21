import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Phoenix Creed Energy | Powering Africa's Electric Future",
    template: "%s | Phoenix Creed Energy",
  },
  description:
    "Phoenix Creed Energy is building Africa's largest electric vehicle charging network. Sustainable energy solutions for the continent's electric future.",
  keywords: [
    "electric vehicles", "EV charging", "Africa", "sustainable energy",
    "Phoenix Creed Energy", "PCE",
  ],
  authors: [{ name: "Phoenix Creed Energy" }],
  creator: "Phoenix Creed Energy",
  icons: {
    icon: "/pce-logo.png",
    apple: "/pce-logo.png",
    shortcut: "/pce-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phoenixcreedenergy.com",
    siteName: "Phoenix Creed Energy",
    title: "Phoenix Creed Energy | Powering Africa's Electric Future",
    description: "Building Africa's largest electric vehicle charging network and clean energy infrastructure.",
    images: [{ url: "/pce-logo.png", width: 1254, height: 1254 }],
  },
  twitter: {
    card: "summary",
    title: "Phoenix Creed Energy",
    description: "Powering Africa's Electric Future",
    images: ["/pce-logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-pce-dark`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
