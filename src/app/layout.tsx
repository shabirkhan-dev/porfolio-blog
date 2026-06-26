import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-blog.vercel.app",
  ),
  title: {
    default: "S. Khan | Portfolio",
    template: "%s | S. Khan",
  },
  description:
    "A personal portfolio and blog built with Next.js, Bun, Tailwind CSS, and Vercel.",
  openGraph: {
    title: "S. Khan | Portfolio",
    description:
      "Selected work, writing, and experiments from an independent builder.",
    type: "website",
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
