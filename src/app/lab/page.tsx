import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BoxedPage, BoxedSection } from "@/components/boxed-section";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/motion";
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
      <BoxedPage>
        <main>
          <BoxedSection dividerTop pad={false} className="overflow-hidden">
            <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:py-8">
              <div className="max-w-2xl">
                <span className="eyebrow">Lab</span>
                <h1 className="t-h2 mt-3 text-balance">
                  Experiments with{" "}
                  <span className="text-accent">room to breathe.</span>
                </h1>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  Motion, 3D UI, and AI prototypes — pushed further than the
                  hireable portfolio.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:pb-1">
                {labExperiments.length} experiments
              </p>
            </div>
          </BoxedSection>

          <BoxedSection pad="compact">
            <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
              {labExperiments.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} className="relative">
                  <Corners />
                  <article className="group relative flex h-full flex-col overflow-hidden border border-border bg-background-2 p-6 transition-colors duration-500 hover:border-border-strong sm:p-7">
                    <div className="pointer-events-none absolute inset-0 dot-grid opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">
                      {item.category}
                    </span>
                    <h2 className="mt-4 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-faint"
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
                          <ArrowUpRight
                            aria-hidden="true"
                            size={14}
                            className="text-accent"
                          />
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
          </BoxedSection>

          <BoxedSection pad="compact" closed>
            <Reveal>
              <PageCta
                label="Main portfolio"
                title="Looking for hireable, production-focused work?"
                href="/#work"
                button="View selected work"
              />
            </Reveal>
          </BoxedSection>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
