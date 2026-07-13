import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BoxedPage, BoxedSection } from "@/components/boxed-section";
import { LabDemoFrame } from "@/components/lab/lab-demo-frame";
import {
  ActionSwapDemo,
  ButtonSystemDemo,
  CountUpMetricsDemo,
  FailureStatesDemo,
  FieldStatesDemo,
  MagneticCtaDemo,
} from "@/components/lab/lab-demos";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLabExperiment, getLabSlugs, labExperiments } from "@/data/lab";

type LabExperimentPageProps = {
  params: Promise<{ slug: string }>;
};

const demos: Record<string, React.ReactNode> = {
  "button-system": <ButtonSystemDemo />,
  "magnetic-cta": <MagneticCtaDemo />,
  "count-up-metrics": <CountUpMetricsDemo />,
  "action-swap": <ActionSwapDemo />,
  "failure-states": <FailureStatesDemo />,
  "field-states": <FieldStatesDemo />,
};

export function generateStaticParams() {
  return getLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LabExperimentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getLabExperiment(slug);
  if (!experiment) return {};
  return {
    title: `${experiment.title} — Lab`,
    description: experiment.description,
  };
}

export default async function LabExperimentPage({
  params,
}: LabExperimentPageProps) {
  const { slug } = await params;
  const experiment = getLabExperiment(slug);
  const preview = demos[slug];

  if (!experiment || !preview) {
    notFound();
  }

  const index = labExperiments.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? labExperiments[index - 1] : null;
  const next =
    index >= 0 && index < labExperiments.length - 1
      ? labExperiments[index + 1]
      : null;

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <BoxedPage>
        <main>
          <BoxedSection dividerTop pad={false}>
            <div className="py-6 sm:py-7">
              <Link
                href="/lab"
                className="group inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint transition-colors hover:text-accent"
              >
                <ArrowLeft
                  aria-hidden
                  size={13}
                  className="transition-transform group-hover:-translate-x-0.5"
                />
                Lab
              </Link>

              <p className="mt-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
                <span className="text-accent">{experiment.category}</span>
                <span className="mx-2 text-border-strong">·</span>
                Experiment
              </p>

              <h1 className="mt-3 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] font-semibold leading-[1.08] tracking-tight">
                {experiment.title}
              </h1>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                {experiment.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {experiment.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-faint"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </BoxedSection>

          <BoxedSection pad="compact">
            <LabDemoFrame preview={preview} code={experiment.code} />
          </BoxedSection>

          <BoxedSection pad="compact" closed>
            <div className="grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/lab/${prev.slug}`}
                  className="group border border-border p-4 transition-colors hover:border-border-strong"
                >
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
                    Previous
                  </p>
                  <p className="mt-2 font-display text-base font-semibold tracking-tight group-hover:text-accent">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/lab/${next.slug}`}
                  className="group border border-border p-4 text-right transition-colors hover:border-border-strong"
                >
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
                    Next
                  </p>
                  <p className="mt-2 inline-flex items-center gap-1 font-display text-base font-semibold tracking-tight group-hover:text-accent">
                    {next.title}
                    <ArrowUpRight aria-hidden size={14} className="text-accent" />
                  </p>
                </Link>
              ) : null}
            </div>
          </BoxedSection>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
