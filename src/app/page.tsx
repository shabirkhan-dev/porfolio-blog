import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AsciiField } from "@/components/ascii-field";
import { WritingPreview } from "@/components/blog/writing-preview";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import {
  HomeExperienceTimeline,
  HomeTestimonials,
} from "@/components/home-deferred";
import { LabLiveCard } from "@/components/lab/lab-live-card";
import { Reveal } from "@/components/motion";
import { ProjectsBento } from "@/components/portfolio/projects-bento";
import { PrincipleCard } from "@/components/principle-card";
import { ScalesFrame } from "@/components/scales";
import { SectionHeading } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts } from "@/data/posts.server";
import { labExperiments } from "@/data/lab";
import {
  aboutImpact,
  coreStack,
  experience,
  philosophy,
  profile,
  projects,
  proof,
  testimonials,
} from "@/data/site";

export default async function Home() {
  const posts = await getPublishedPosts();
  const writingPreview = posts.slice(0, 3);
  const workProjects = [
    projects.find((project) => project.slug === "autobay"),
    projects.find((project) => project.slug === "school-os"),
    projects.find((project) => project.slug === "excelorithm-ems"),
  ].filter((project): project is (typeof projects)[number] => Boolean(project));
  const featuredLab = labExperiments[0];

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <BoxedPage>
        <main>
          <HeroSection
            name={profile.name}
            title={profile.title}
            location={profile.location}
            proof={proof}
          />

          <BoxedSection id="work">
            <SectionHeading
              index="01"
              eyebrow="Selected work"
              title="Shipped systems under real constraints."
              description={
                <Link
                  href="/projects"
                  className="link-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
                >
                  All projects
                  <ArrowUpRight aria-hidden="true" size={15} className="text-accent" />
                </Link>
              }
            />
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
              Product constraints, architecture, and release path handled as one
              job — with a clear decision and a measurable result in each case.
            </p>
            <Reveal className="mt-8 sm:mt-9">
              <ProjectsBento projects={workProjects} />
            </Reveal>
          </BoxedSection>

          <BoxedSection id="about" tone="muted">
            <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
              <Reveal className="overflow-x-clip py-9">
                <ScalesFrame className="mx-auto w-full max-w-[15rem]">
                  <div className="relative grid aspect-square place-items-center overflow-hidden">
                    <AsciiField className="absolute inset-0 h-full w-full" cell={13} />
                    <span className="relative font-display text-[clamp(4rem,3rem+8vw,6.5rem)] font-medium leading-none tracking-tight text-accent">
                      {profile.initials}
                    </span>
                  </div>
                </ScalesFrame>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex items-center gap-4">
                  <span className="eyebrow">Evidence</span>
                  <span className="font-mono text-xs text-faint">/ 02</span>
                </div>
                <h2 className="t-h2 mt-4 max-w-[18ch] text-balance">
                  Senior ownership, visible in the work.
                </h2>
                <p className="mt-4 max-w-xl text-[1.02rem] leading-8 text-foreground/85">
                  {profile.intro}
                </p>

                <ul className="mt-7 max-w-xl space-y-3 border-t border-border pt-5">
                  {aboutImpact.map((item) => (
                    <li
                      key={item.proof}
                      className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-4"
                    >
                      <span className="text-sm leading-6 text-muted-foreground">
                        {item.outcome}
                      </span>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
                        {item.proof}
                      </span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 grid max-w-xl gap-y-2 border-t border-border pt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] sm:grid-cols-3 sm:gap-x-6">
                  <div>
                    <dt className="text-faint">Based in</dt>
                    <dd className="mt-1 text-foreground">Islamabad · GMT+5</dd>
                  </div>
                  <div>
                    <dt className="text-faint">Experience</dt>
                    <dd className="mt-1 text-foreground">6+ years</dd>
                  </div>
                  <div>
                    <dt className="text-faint">Open to</dt>
                    <dd className="mt-1 text-accent">Remote senior roles</dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </BoxedSection>

          <BoxedStrip>
            <div className="py-3.5 sm:py-4">
              <div className="flex items-center gap-4 overflow-x-auto font-mono text-[0.64rem] uppercase tracking-[0.12em] text-muted-foreground sm:justify-center">
                <span className="shrink-0 text-faint">Core stack</span>
                {coreStack.slice(0, 8).map((item) => (
                  <span key={item} className="inline-flex shrink-0 items-center gap-4">
                    <span aria-hidden="true" className="size-1 rounded-full bg-accent/70" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </BoxedStrip>

          <BoxedSection id="experience">
            <HomeExperienceTimeline items={experience} />
          </BoxedSection>

          <BoxedSection
            id="approach"
            tone="muted"
            className="overflow-hidden"
            overlay={
              <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30 [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent_80%)]" />
            }
          >
            <Reveal>
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className="eyebrow">Engineering principles</span>
                  <span className="font-mono text-xs text-faint">/ 04</span>
                </div>
                <h2 className="t-h2 mt-4 text-balance">
                  How I make decisions under constraint.
                </h2>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
                  Practical checks for scope, data boundaries, failure states,
                  and release work. Each one is tied to shipped work.
                </p>
              </div>
            </Reveal>
            <div className="mt-8 border-b border-border sm:mt-10">
              {philosophy.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.04}>
                  <PrincipleCard
                    index={index}
                    title={item.title}
                    body={item.body}
                    practice={item.practice}
                    proof={item.proof}
                  />
                </Reveal>
              ))}
            </div>
          </BoxedSection>

          <BoxedSection>
            <div className="grid gap-14 xl:grid-cols-[1.1fr_0.9fr] xl:gap-12">
              <div>
                <SectionHeading
                  index="05"
                  eyebrow="Writing"
                  title="Notes on decisions and trade-offs."
                  description={
                    <Link
                      href="/blog"
                      className="link-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
                    >
                      All writing
                      <ArrowUpRight aria-hidden="true" size={15} className="text-accent" />
                    </Link>
                  }
                />
                <Reveal className="mt-8">
                  <WritingPreview posts={writingPreview} />
                </Reveal>
              </div>

              <div>
                <SectionHeading
                  index="06"
                  eyebrow="Lab"
                  title="Interaction studies, live."
                  description={
                    <Link
                      href="/lab"
                      className="link-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground"
                    >
                      Open the Lab
                      <ArrowUpRight aria-hidden="true" size={15} className="text-accent" />
                    </Link>
                  }
                />
                {featuredLab ? (
                  <Reveal className="mt-8">
                    <LabLiveCard
                      experiment={featuredLab}
                      index={0}
                      featured
                      headingLevel="h3"
                    />
                  </Reveal>
                ) : null}
              </div>
            </div>
          </BoxedSection>

          <BoxedSection tone="muted">
            <SectionHeading
              index="07"
              eyebrow="Endorsements"
              title="What collaborators say about the work."
            />
            <div className="mt-8">
              <HomeTestimonials items={testimonials} />
            </div>
          </BoxedSection>

          <ContactSection />
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
