import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BoxedPage, BoxedSection } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { labExperiments } from "@/data/site";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Working studies from Shabir Khan — live interactions, reading UX, and open systems you can open.",
};

function isExternal(href: string) {
  return href.startsWith("http");
}

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
                  Working studies —{" "}
                  <span className="text-accent">not vaporware.</span>
                </h1>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  Live pieces from this site and open systems you can click into.
                  Lab stays the name: short, honest, and for craft that isn&apos;t a
                  case study yet.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:pb-1">
                {labExperiments.length} studies
              </p>
            </div>
          </BoxedSection>

          <BoxedSection pad="compact">
            <div className="divide-y divide-border border-y border-border">
              {labExperiments.map((item, index) => {
                const external = item.href ? isExternal(item.href) : false;
                const cta =
                  item.status === "oss"
                    ? "GitHub"
                    : item.status === "live"
                      ? "Open live"
                      : "Explore";

                const body = (
                  <>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.14em]">
                      <span className="tabular-nums text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-accent">{item.category}</span>
                      <span className="text-faint">
                        {item.status === "oss" ? "Open source" : "Live on site"}
                      </span>
                    </div>

                    <h2 className="mt-3 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <ul className="flex flex-wrap gap-x-3 gap-y-1">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {item.href ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground">
                          {cta}
                          <ArrowUpRight
                            aria-hidden="true"
                            size={13}
                            className="text-accent"
                          />
                        </span>
                      ) : null}
                    </div>
                  </>
                );

                return (
                  <Reveal key={item.title} delay={index * 0.03}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="group block py-6 transition-colors sm:py-7"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="py-6 sm:py-7">{body}</div>
                    )}
                  </Reveal>
                );
              })}
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
