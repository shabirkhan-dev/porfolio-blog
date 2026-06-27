import type { Metadata, Viewport } from "next";
import {
  Inter,
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { DeferredChrome } from "@/components/deferred-chrome";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeScript } from "@/components/theme-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev",
  ),
  title: {
    default: "Shabir Khan — Senior Full-Stack Engineer & Product Builder",
    template: "%s — Shabir Khan",
  },
  description:
    "Senior full-stack engineer building TypeScript-first products, SaaS platforms, mobile apps, AI workflows, and polished interfaces with editorial taste.",
  authors: [{ name: "Shabir Khan" }],
  creator: "Shabir Khan",
  keywords: [
    "Shabir Khan",
    "Senior Full-Stack Engineer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "React Native",
    "Bun",
    "SaaS",
    "AI products",
    "Frontend architecture",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shabir Khan — Senior Full-Stack Engineer & Product Builder",
    description:
      "Production-grade TypeScript systems, premium interfaces, React frontends, Node.js APIs, mobile apps, AI workflows, and secure delivery pipelines.",
    type: "website",
    url: "/",
    siteName: "Shabir Khan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shabir Khan — Senior Full-Stack Engineer & Product Builder",
    description:
      "TypeScript-first product engineering, premium interface craft, and editorial writing.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1814" },
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} ${instrument.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <MotionProvider>
          <DeferredChrome />
          {children}
        </MotionProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
