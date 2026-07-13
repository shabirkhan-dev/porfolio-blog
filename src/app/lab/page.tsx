import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BoxedPage, BoxedSection } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { labExperiments } from "@/data/lab";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Interactive UI experiments — live previews and source for buttons, motion, forms, and failure states.",
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
                  Components you can{" "}
                  <span className="text-accent">try and copy.</span>
                </h1>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  Live previews with source — primitives, motion, form states,
                  and failure UI from the same system as the site.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:pb-1">
                {labExperiments.length} experiments
              </p>
            </div>
          </BoxedSection>

          <BoxedSection pad="compact">
            <div className="grid gap-4 sm:grid-cols-2">
              {labExperiments.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.03}>
                  <Link
                    href={`/lab/${item.slug}`}
                    className="group flex h-full flex-col border border-border bg-background-2 p-5 transition-colors hover:border-border-strong sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
                        {item.category}
                      </span>
                      <span className="font-mono text-[0.56rem] tabular-nums text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="mt-4 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {item.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <ul className="flex flex-wrap gap-x-2.5 gap-y-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <li
                            key={tag}
                            className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-faint"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-foreground">
                        Open
                        <ArrowUpRight
                          aria-hidden
                          size={12}
                          className="text-accent"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </BoxedSection>

          <BoxedSection pad="compact" closed>
            <Reveal>
              <PageCta
                label="Selected work"
                title="Need the production systems these patterns ship inside?"
                href="/#work"
                button="View work"
              />
            </Reveal>
          </BoxedSection>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
