import type { Metadata } from "next";
import { NotFoundGlitch } from "@/components/motion/not-found/glitch";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <SiteHeader />
      <main className="relative flex flex-1 items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_70%_at_50%_40%,black,transparent_80%)]" />
        {/* Ambient accent glow */}
        <div className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-accent/[0.06] blur-3xl" />

        <div className="shell relative w-full py-[clamp(3rem,2rem+5vw,6rem)]">
          <NotFoundGlitch
            code="404"
            title="This page took a wrong turn."
            description="The link may be broken or the page may have moved. Let's get you back to something that exists."
            homeHref="/"
            homeLabel="Back home"
            browseHref="/blog"
            browseLabel="Read my writing"
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
