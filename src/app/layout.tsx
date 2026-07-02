import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { DeferredChrome } from "@/components/deferred-chrome";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeScript } from "@/components/theme-toggle";

// `display: "optional"` keeps LCP honest: text paints once with the
// size-adjusted fallback and never re-paints late when the webfont lands.
// Body font is not preloaded — its metrics-adjusted fallback is near
// identical, and skipping the preload keeps it off the critical path.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
  preload: false,
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "optional",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "optional",
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
    { media: "(prefers-color-scheme: dark)", color: "#111214" },
    { media: "(prefers-color-scheme: light)", color: "#f9fafa" },
  ],
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shabir Khan",
  jobTitle: "Senior Full-Stack Engineer",
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
      className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
