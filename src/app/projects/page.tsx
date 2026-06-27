import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { Reveal, WordReveal } from "@/components/motion";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { LinkButton } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product, platform, SaaS, AI, mobile, infrastructure, and systems work by Shabir Khan.",
};

const pillars = [
  {
    title: "Product architecture",
    body: "Service boundaries, data models, and delivery paths designed together so the product can evolve without chaos.",
  },
  {
    title: "Interface craft",
    body: "Calm, intentional surfaces where hierarchy, states, and motion earn trust from real users.",
  },
  {
    title: "Production systems",
    body: "CI/CD, security gates, and observability built into the workflow — not bolted on after launch.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
          <div className="shell relative pb-14 pt-[clamp(3rem,2rem+6vw,6rem)]">
            <Reveal>
              <span className="eyebrow">Selected work</span>
            </Reveal>

            <h1 className="t-display mt-8">
              <WordReveal as="span" text="Serious product" className="block" />
              <span className="block">
                systems,{" "}
                <span className="font-serif font-normal italic text-accent">
                  built to hold.
                </span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-10 max-w-xl border-t border-border pt-8">
              <p className="t-lead">
                Architecture-heavy product work across SaaS, dashboards, security
                tooling, AI workflows, mobile apps, and production delivery
                foundations.
              </p>
            </Reveal>
          </div>

          <div className="border-y border-border py-6">
            <Marquee
              items={[
                "SaaS",
                "Security",
                "Multi-tenant",
                "AI",
                "Mobile",
                "DevEx",
                "Infrastructure",
              ]}
            />
          </div>
        </section>

        {/* Pillars */}
        <section className="shell pt-[clamp(3rem,2rem+4vw,5rem)]">
          <div className="grid border-y border-border md:grid-cols-3">
            {pillars.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.05}
                className="border-border px-1 py-8 md:px-8 md:[&:not(:last-child)]:border-r"
              >
                <span className="font-mono text-xs text-faint">0{index + 1}</span>
                <p className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Case studies */}
        <section className="shell section-y">
          <h2 className="sr-only">Case studies</h2>
          <div className="flex flex-col gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
                <CaseStudyCard project={project} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-2 px-[clamp(1.5rem,1rem+3vw,4rem)] py-[clamp(2.5rem,2rem+4vw,5rem)]">
              <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <h2 className="t-h2 max-w-3xl">
                  A product that needs senior technical ownership and a{" "}
                  <span className="font-serif font-normal italic text-accent">
                    refined interface?
                  </span>
                </h2>
                <Magnetic>
                  <LinkButton
                    href={`mailto:${profile.email}`}
                    variant="primary"
                    size="lg"
                    className="w-fit"
                  >
                    Discuss the build
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </LinkButton>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
