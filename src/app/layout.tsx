import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabirkhan.dev",
  ),
  title: {
    default: "Shabir Khan - Senior Full-Stack Engineer",
    template: "%s - Shabir Khan",
  },
  description:
    "Senior Full-Stack Engineer building secure, high-performance TypeScript systems across web, backend, and mobile.",
  keywords: [
    "Shabir Khan",
    "Senior Full-Stack Engineer",
    "TypeScript",
    "Next.js",
    "Node.js",
    "React Native",
    "Bun",
  ],
  openGraph: {
    title: "Shabir Khan - Senior Full-Stack Engineer",
    description:
      "Production-grade TypeScript systems, React frontends, Node.js APIs, mobile apps, and secure delivery pipelines.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shabir Khan - Senior Full-Stack Engineer",
    description:
      "Secure, high-performance TypeScript systems across web, backend, and mobile.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
