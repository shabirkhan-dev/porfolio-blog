import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { caseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { profile, projects } from "@/data/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  const project = projects.find((item) => item.slug === slug);
  const canonical = `/case-studies/${study.slug}`;
  return {
    title: `${study.title} — Case Study`,
    description: study.tagline,
    alternates: { canonical },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.tagline,
      url: canonical,
      type: "article",
      images: project?.image
        ? [{ url: project.image, alt: `${study.title} interface` }]
        : [{ url: "/opengraph-image", alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.tagline,
      images: [project?.image ?? "/opengraph-image"],
    },
  };
}

const sections = [
  "problem",
  "context",
  "architecture",
  "frontend",
  "backend",
  "infrastructure",
  "challenge",
  "impact",
  "next",
] as const;

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const project = projects.find((item) => item.slug === slug);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main id="main">
        <header className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
          <div className="shell relative pb-8 pt-[clamp(2rem,1.25rem+3.5vw,3.75rem)]">
            <Reveal>
              <Link
                href="/#work"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-faint transition-colors hover:text-accent"
              >
                <ArrowLeft
                  aria-hidden="true"
                  size={15}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to work
              </Link>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Badge tone="accent">Case study</Badge>
                <Badge tone="muted">{study.year}</Badge>
              </div>

              <h1 className="t-h1 mt-5">
                {study.title}
                <span className="mt-3 block font-mono text-[0.3em] font-normal uppercase tracking-[0.16em] text-muted-foreground">
                  {study.subtitle}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                {study.tagline}
              </p>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-faint">
                {study.role}
              </p>

              {project?.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  View on GitHub
                  <ArrowUpRight aria-hidden="true" size={13} />
                </a>
              ) : null}
            </Reveal>
          </div>
        </header>

        <div className="shell grid gap-16 py-[clamp(3rem,2rem+4vw,5rem)] lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <article className="min-w-0 max-w-2xl">
            {sections.map((key, index) => {
              const section = study[key];
              return (
                <Reveal key={key} delay={index * 0.03} className="mb-14 last:mb-0">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-[0.95rem] leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border">
                <Corners />
                {project?.image ? (
                  <Image
                    src={project.image}
                    alt={`${study.title} interface`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-top"
                    quality={60}
                    priority
                    fetchPriority="high"
                    decoding="sync"
                  />
                ) : null}
              </div>

              <div className="relative mt-8 rounded-lg border border-border bg-background-2 p-6">
                <Corners />
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
                  Stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-sm border border-border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative mt-6 rounded-lg border border-border bg-background-2 p-6">
                <Corners />
                <p className="font-display text-base font-semibold tracking-tight">
                  Building a serious product?
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  I can help design the system, ship the interface, and make the
                  architecture hold under real use.
                </p>
                <LinkButton
                  href={`mailto:${profile.email}`}
                  size="sm"
                  className="mt-5"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" size={14} />
                </LinkButton>
              </div>
            </Reveal>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
