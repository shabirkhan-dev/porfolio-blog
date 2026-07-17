import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ThemeScript } from "@/components/theme-toggle";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev",
  ),
  title: {
    default: "Shabir Khan — Senior Full-Stack Product Engineer",
    template: "%s — Shabir Khan",
  },
  description:
    "Shabir Khan is a senior full-stack product engineer in Islamabad, Pakistan, owning frontend, backend, mobile, architecture, DevOps, and production delivery for remote teams.",
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
  openGraph: {
    title: "Shabir Khan — Senior Full-Stack Product Engineer",
    description:
      "Senior product engineering across frontend, backend, mobile, architecture, DevOps, and production delivery.",
    type: "website",
    url: "/",
    siteName: "Shabir Khan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shabir Khan — Senior Full-Stack Product Engineer",
    description:
      "Senior product engineering across frontend, backend, mobile, architecture, and release work.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#211c16" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
  ],
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shabir Khan",
  jobTitle: "Senior Full-Stack Product Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev",
  email: "mailto:shabirkhan.dev@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  sameAs: [
    "https://github.com/shabirkhan-dev",
    "https://linkedin.com/in/shabirkhan23",
  ],
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "PostgreSQL",
    "AI workflows",
  ],
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
      className={`${grotesk.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
