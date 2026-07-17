import type { Metadata } from "next";
import { BoxedPage, BoxedSection } from "@/components/boxed-section";
import { LabLiveCard } from "@/components/lab/lab-live-card";
import { Reveal } from "@/components/motion";
import { PageCta } from "@/components/page-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { labExperiments } from "@/data/lab";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Signature interactive studies — Request Flow, Iron Field, Cipher Deck, and Signal Radar. Live results on the page.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  const [featured, ...rest] = labExperiments;

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <BoxedPage>
        <main id="main">
          <BoxedSection dividerTop pad={false} className="overflow-hidden">
            <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:py-8">
              <div className="max-w-2xl">
                <span className="eyebrow">Lab</span>
                <h1 className="t-h2 mt-3 text-balance">
                  Four studies.{" "}
                  <span className="text-accent">The result is the point.</span>
                </h1>
                <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
                  Not a component bench — signature interactions you can feel on
                  this page, then open for the full instrument.
                </p>
              </div>
              <p className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:pb-1">
                {labExperiments.length} signatures
              </p>
            </div>
          </BoxedSection>

          <BoxedSection pad="compact">
            {featured ? (
              <Reveal>
                <LabLiveCard
                  experiment={featured}
                  index={0}
                  featured
                />
              </Reveal>
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {rest.map((item, index) => (
                  <Reveal key={item.slug} delay={(index + 1) * 0.05}>
                    <LabLiveCard experiment={item} index={index + 1} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </BoxedSection>

          <BoxedSection pad="compact" closed>
            <Reveal>
              <PageCta
                label="Selected work"
                title="These studies sit next to production systems."
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
