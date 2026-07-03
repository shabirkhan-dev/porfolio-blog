import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { labExperiments } from "@/data/site";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experimental creative work — motion, 3D concepts, AI UI prototypes, and visual engineering demos by Shabir Khan.",
};

export default function LabPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
          <div className="shell relative pb-14 pt-[clamp(3rem,2rem+6vw,6rem)]">
            <Reveal>
              <span className="eyebrow">Lab</span>
            </Reveal>

            <h1 className="t-display mt-8">
              <span className="block">Where experiments</span>
              <span className="block">
                get <span className="text-accent">room to breathe.</span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-10 max-w-xl border-t border-border pt-8">
              <p className="t-lead">
                Interactive systems, motion studies, 3D interface concepts, and
                AI UI prototypes. The main portfolio stays hireable — this is
                where I push further.
              </p>
            </Reveal>
          </div>

          <div className="border-y border-border py-6">
            <Marquee
              items={[
                "Motion",
                "3D UI",
                "AI Prototypes",
                "Visual Engineering",
                "Interaction Design",
                "Creative Code",
              ]}
            />
          </div>
        </section>

        <section className="shell section-y">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {labExperiments.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="relative">
                <Corners />
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background-2 p-8 transition-colors duration-500 hover:border-border-strong">
                  <div className="pointer-events-none absolute inset-0 dot-grid opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
                    {item.category}
                  </span>
                  <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {item.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
                      >
                        Explore
                        <ArrowUpRight aria-hidden="true" size={14} className="text-accent" />
                      </Link>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                        In progress
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
          <Reveal>
            <PageCta
              label="Main portfolio"
              title="Looking for hireable, production-focused work?"
              href="/#work"
              button="View selected work"
            />
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
