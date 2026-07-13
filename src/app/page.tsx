import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { AsciiField } from "@/components/ascii-field";
import { Reveal } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { ScalesFrame } from "@/components/scales";
import { PrincipleCard } from "@/components/principle-card";
import { ContactSection } from "@/components/contact-section";
import { ProjectsBento } from "@/components/portfolio/projects-bento";
import {
  HomeExperienceTimeline,
  HomeTestimonials,
  HomeToolkit,
} from "@/components/home-deferred";
import { SectionHeading } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  coreStack,
  experience,
  philosophy,
  profile,
  projects,
  proof,
  stackGroups,
  testimonials,
} from "@/data/site";
import { getPublishedPosts } from "@/data/posts.server";

export default async function Home() {
  const writingPreview = (await getPublishedPosts()).slice(0, 3);
  const workProjects = projects.slice(0, 4);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection
          name={profile.name}
          title={profile.title}
          lead={
            <>
              TypeScript-first engineer with{" "}
              <span className="text-foreground">6+ years</span> shipping
              production systems — React frontends serving{" "}
              <span className="text-foreground">100k+ users</span>, Node.js
              APIs, React Native apps, and delivery pipelines with security
              built in.
            </>
          }
          location={profile.location}
          proof={proof}
        />

        {/* CORE STACK — quiet static strip */}
        <div className="border-y border-border">
          <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
            <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
              Core stack
            </span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {coreStack.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ABOUT — compressed */}
        <section className="shell section-y">
          <div className="grid items-center gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
            <Reveal>
              <ScalesFrame className="mx-auto w-full max-w-[17rem]">
                <div className="relative grid aspect-square place-items-center overflow-hidden">
                  <AsciiField className="absolute inset-0 h-full w-full" cell={13} />
                  <span className="relative font-display text-[clamp(4rem,3rem+8vw,6.5rem)] font-medium leading-none tracking-tight text-accent">
                    {profile.initials}
                  </span>
                </div>
              </ScalesFrame>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex items-center gap-4">
                <span className="eyebrow">About</span>
                <span className="font-mono text-xs text-faint">/ 01</span>
              </div>
              <h2 className="t-h2 mt-4 max-w-lg text-balance">
                Calm on the surface.{" "}
                <span className="text-accent">Disciplined</span> underneath.
              </h2>
              <p className="mt-4 max-w-lg text-[0.95rem] leading-7 text-muted-foreground">
                {profile.intro}
              </p>

              <dl className="mt-6 grid max-w-lg gap-y-2 border-t border-border pt-5 font-mono text-[0.7rem] uppercase tracking-[0.12em] sm:grid-cols-2 sm:gap-x-8">
                <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                  <dt className="text-faint">Currently</dt>
                  <dd className="text-foreground">Founder @ Rabtx</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                  <dt className="text-faint">Experience</dt>
                  <dd className="text-foreground">6+ years, full-stack</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                  <dt className="text-faint">Based in</dt>
                  <dd className="text-foreground">Islamabad · GMT+5</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                  <dt className="text-faint">Open to</dt>
                  <dd className="text-accent">Remote senior roles</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.14em]">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line inline-flex items-center gap-1.5 text-foreground"
                >
                  GitHub
                  <ArrowUpRight aria-hidden="true" size={13} className="text-accent" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line inline-flex items-center gap-1.5 text-foreground"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" size={13} className="text-accent" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="link-line inline-flex items-center gap-1.5 text-foreground"
                >
                  Email
                  <ArrowUpRight aria-hidden="true" size={13} className="text-accent" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* SELECTED WORK — bento */}
        <section id="work" className="shell section-y">
          <SectionHeading
            index="02"
            eyebrow="Selected work"
            title="Proof, not promises."
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

          <Reveal className="mt-10">
            <ProjectsBento projects={workProjects} />
          </Reveal>
        </section>

        {/* PHILOSOPHY — compressed */}
        <section
          id="approach"
          className="relative overflow-hidden border-y border-border bg-background-2"
        >
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent_80%)]" />
          <div className="shell section-y relative">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4">
                    <span className="eyebrow">Approach</span>
                    <span className="font-mono text-xs text-faint">/ 03</span>
                  </div>
                  <h2 className="t-h2 mt-4 text-balance">
                    How I <span className="text-accent">think</span> about
                    building.
                  </h2>
                </div>
                <p className="max-w-sm pb-1 text-[0.95rem] leading-7 text-muted-foreground">
                  Four principles that decide what gets built, in what order,
                  and what gets deliberately left out.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {philosophy.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.05} className="h-full">
                    <PrincipleCard
                      index={index}
                      title={item.title}
                      body={item.body}
                      practice={item.practice}
                      icon={<Icon aria-hidden="true" size={17} />}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_50%,black,transparent_85%)]" />
          <div className="shell section-y relative">
            <SectionHeading
              index="04"
              eyebrow="Toolkit"
              title="The stack I ship with."
            />

            <Reveal className="mt-10">
              <HomeToolkit groups={stackGroups} />
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE — pinned horizontal scroll */}
        <div className="border-y border-border bg-background-2">
          <HomeExperienceTimeline items={experience} />
        </div>

        {/* JOURNAL */}
        <section className="shell section-y">
          <SectionHeading
            index="06"
            eyebrow="Writing"
            title="Notes from the work."
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

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {writingPreview.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 0.05}
                className={index === 0 ? "lg:col-span-3" : ""}
              >
                <ArticleCard post={post} featured={index === 0} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section-y border-y border-border bg-background-2">
          <div className="shell">
            <SectionHeading
              index="07"
              eyebrow="Endorsements"
              title="Trusted by people I've shipped with."
            />
          </div>
          <div className="mt-10">
            <HomeTestimonials items={testimonials} />
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
