import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";

import { assetPath } from "@/lib/asset-path";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: "normal",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteTitle = "Mills Paquin | Business Analytics & Automation";
const socialDescription =
  "Selected work across analytics, automation, and application development.";
const socialCard = {
  url: assetPath("/assets/mills-paquin-social-card.png"),
  width: 1200,
  height: 686,
  alt: "Mills Paquin — Analytics, Automation, AI. Portfolio 2026.",
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: siteTitle,
  description:
    "Portfolio of James ‘Mills’ Paquin, a University of Tennessee Business Analytics student building data applications, automated workflows, and decision-support tools.",
  keywords: [
    "Mills Paquin",
    "business analytics",
    "automation",
    "Power Apps",
    "Python",
    "University of Tennessee",
  ],
  alternates: {
    canonical: assetPath("/"),
  },
  openGraph: {
    title: siteTitle,
    description: socialDescription,
    type: "website",
    url: assetPath("/"),
    siteName: "Mills Paquin",
    images: [socialCard],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: socialDescription,
    images: [socialCard.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
