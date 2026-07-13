import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { PageCta } from "@/components/page-cta";
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
      <BoxedPage>
        <main>
          <BoxedSection
            dividerTop
            pad="compact"
            className="overflow-hidden"
            innerClassName="pb-0 pt-[clamp(2rem,1.25rem+4vw,4rem)]"
            overlay={
              <div className="pointer-events-none absolute inset-0 hairline-grid [mask-image:radial-gradient(120%_80%_at_50%_0%,black,transparent_75%)]" />
            }
          >
            <Reveal>
              <span className="eyebrow">Selected work</span>
            </Reveal>

            <h1 className="t-display mt-5">
              <span className="block">Serious product</span>
              <span className="block">
                systems, <span className="text-accent">built to hold.</span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-6 max-w-lg border-t border-border pt-5">
              <p className="t-lead">
                Architecture-heavy product work — SaaS, marketplaces, security
                tooling, AI workflows, and delivery foundations.
              </p>
            </Reveal>
          </BoxedSection>

          <BoxedStrip dividerTop={false}>
            <div className="py-6">
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
          </BoxedStrip>

          <BoxedSection pad="compact">
            <div className="grid border-y border-border md:grid-cols-3">
              {pillars.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 0.05}
                  className="border-border px-1 py-6 md:px-8 md:[&:not(:last-child)]:border-r"
                >
                  <span className="font-mono text-xs text-faint">0{index + 1}</span>
                  <p className="mt-4 font-display text-xl font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </BoxedSection>

          <BoxedSection>
            <h2 className="sr-only">Case studies</h2>
            <div className="flex flex-col gap-6 lg:gap-8">
              {projects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.04}>
                  <CaseStudyCard project={project} index={index + 1} />
                </Reveal>
              ))}
            </div>
          </BoxedSection>

          <BoxedSection pad="compact" closed>
            <Reveal>
              <PageCta
                label="Let's talk"
                title={
                  <>
                    A product that needs senior technical ownership and a{" "}
                    <span className="text-accent">refined interface?</span>
                  </>
                }
                href={`mailto:${profile.email}`}
                button="Discuss the build"
                variant="primary"
              />
            </Reveal>
          </BoxedSection>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
