import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { Reveal, WordReveal } from "@/components/motion";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { HeroCanvas } from "@/components/hero-canvas";
import { CountUp } from "@/components/count-up";
import { Toolkit } from "@/components/toolkit";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ScalesFrame } from "@/components/scales";
import { Testimonials } from "@/components/testimonials";
import { PrincipleCard } from "@/components/principle-card";
import { ContactSection } from "@/components/contact-section";
import { SectionHeading } from "@/components/section";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { LinkButton } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  experience,
  philosophy,
  posts,
  profile,
  projects,
  proof,
  stackGroups,
  testimonials,
} from "@/data/site";

export default function Home() {
  const writingPreview = posts.slice(0, 3);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        {/* ---------------------------------------------------------- */}
        {/* HERO — interactive vector field                            */}
        {/* ---------------------------------------------------------- */}
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          {/* Live, cursor-reactive canvas */}
          <HeroCanvas className="absolute inset-0 -z-10 h-full w-full" />
          {/* Vignette so type stays legible over the field */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,var(--background)_85%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />

          {/* Top meta row */}
          <div className="shell flex items-center justify-between pt-[clamp(2rem,1rem+4vw,4rem)]">
            <Reveal className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Available — {profile.location}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint sm:inline">
                Senior Full-Stack Engineer · Est. {new Date().getFullYear() - 6}
              </span>
            </Reveal>
          </div>

          {/* Centerpiece headline */}
          <div className="shell relative flex flex-1 flex-col justify-center py-16">
            <Reveal className="mb-7 flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-faint">
              <span className="h-px w-8 bg-accent" />
              Portfolio &amp; Journal — {profile.name}
            </Reveal>

            <h1 className="t-display max-w-[16ch]">
              <WordReveal as="span" text="I engineer" className="block" />
              <span className="block">
                <WordReveal
                  as="span"
                  text="products that feel"
                  className="inline-flex"
                />
              </span>
              <span className="block overflow-hidden">
                <span className="font-serif font-normal italic text-accent">
                  inevitable.
                </span>
              </span>
            </h1>

            <Reveal
              delay={0.2}
              className="mt-10 flex max-w-xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="t-lead max-w-md">{profile.intro}</p>
            </Reveal>

            <Reveal delay={0.3} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <LinkButton href="#work" size="lg">
                  Selected work
                  <ArrowDownRight aria-hidden="true" size={18} />
                </LinkButton>
              </Magnetic>
              <LinkButton href="/blog" variant="secondary" size="lg">
                Read the writing
              </LinkButton>
              <span className="ml-1 hidden items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint lg:inline-flex">
                <span className="size-1.5 rounded-full bg-accent" />
                Move your cursor
              </span>
            </Reveal>
          </div>

          {/* Bottom stat strip */}
          <div className="shell relative pb-8">
            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {proof.map((item) => (
                  <div
                    key={item.label}
                    className="group/stat relative overflow-hidden bg-background/70 p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-card"
                  >
                    <dt className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] font-semibold leading-none tracking-tight text-foreground">
                      <CountUp value={item.value} />
                    </dt>
                    <dd className="mt-2.5 text-xs leading-5 text-muted-foreground">
                      {item.label}
                    </dd>
                    <span className="mt-4 block h-px w-6 bg-accent transition-all duration-500 group-hover/stat:w-full" />
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Marquee */}
        <div className="border-y border-border py-6">
          <Marquee
            items={[
              "TypeScript",
              "Next.js",
              "React Native",
              "Node.js",
              "AI Workflows",
              "Design Systems",
              "Rust",
              "Bun",
            ]}
          />
        </div>

        {/* ---------------------------------------------------------- */}
        {/* ABOUT                                                      */}
        {/* ---------------------------------------------------------- */}
        <section className="shell section-y">
          <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <Reveal>
              <ScalesFrame className="mx-auto w-full max-w-[19rem]">
                <div className="relative grid aspect-square place-items-center">
                  <div className="absolute inset-0 hairline-grid opacity-50" />
                  <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_50%_42%,rgb(var(--accent-rgb)/0.18),transparent_62%)]" />
                  <span className="relative font-display text-[clamp(4.5rem,3rem+9vw,7.5rem)] font-semibold leading-none tracking-tight text-accent">
                    {profile.initials}
                  </span>
                  <span className="absolute bottom-5 left-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    {profile.name}
                  </span>
                  <span className="absolute right-5 top-5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-faint">
                    Est. 2018
                  </span>
                </div>
              </ScalesFrame>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="eyebrow">About</span>
              <h2 className="t-h2 mt-6 max-w-xl text-balance">
                I build software that feels calm on the surface and{" "}
                <span className="font-serif font-normal italic text-accent">
                  disciplined underneath.
                </span>
              </h2>
              <p className="mt-7 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
                {profile.intro}
              </p>

              <dl className="mt-9 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
                <div className="bg-background p-5">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                    Based in
                  </dt>
                  <dd className="mt-1.5 text-sm text-foreground">
                    {profile.location}
                  </dd>
                </div>
                <div className="bg-background p-5">
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                    Status
                  </dt>
                  <dd className="mt-1.5 text-sm text-foreground">
                    Open to senior roles
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.14em]">
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

        {/* ---------------------------------------------------------- */}
        {/* SELECTED WORK                                              */}
        {/* ---------------------------------------------------------- */}
        <section id="work" className="shell section-y">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Case studies with real architecture behind them."
            description="SaaS platforms, security tooling, and multi-tenant systems — built with product taste and technical depth."
          />

          <div className="mt-16 flex flex-col">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.04}>
                <CaseStudyCard project={project} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* PHILOSOPHY                                                 */}
        {/* ---------------------------------------------------------- */}
        <section
          id="about"
          className="relative overflow-hidden border-y border-border bg-background-2"
        >
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent_80%)]" />
          <div className="shell section-y relative">
            {/* Intro */}
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <Reveal className="max-w-2xl">
                <span className="eyebrow">Approach</span>
                <h2 className="t-h2 mt-6 text-balance">
                  Calm interfaces.{" "}
                  <span className="font-serif font-normal italic text-accent">
                    Disciplined
                  </span>{" "}
                  systems.
                </h2>
                <p className="mt-6 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
                  Software that feels effortless on the surface and is deliberate
                  underneath. These are the principles I build on.
                </p>
              </Reveal>
              <Reveal
                delay={0.1}
                className="flex shrink-0 items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint"
              >
                <span className="h-px w-8 bg-accent" />
                {philosophy.length} operating principles
              </Reveal>
            </div>

            {/* Principles grid */}
            <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {philosophy.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <PrincipleCard
                      index={index}
                      title={item.title}
                      body={item.body}
                      icon={<Icon aria-hidden="true" size={17} />}
                    />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* STACK                                                      */}
        {/* ---------------------------------------------------------- */}
        <section className="shell section-y">
          <SectionHeading
            index="02"
            eyebrow="Toolkit"
            title="A serious stack for building durable products."
            description="Organized around the kinds of products I ship — from interface to infrastructure."
          />

          <Reveal>
            <Toolkit groups={stackGroups} />
          </Reveal>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* EXPERIENCE                                                 */}
        {/* ---------------------------------------------------------- */}
        <section className="border-y border-border bg-background-2">
          <div className="shell section-y">
            <SectionHeading
              index="03"
              eyebrow="Track record"
              title="Senior ownership across product and system."
            />

            <ExperienceTimeline items={experience} />
          </div>
        </section>

        {/* ---------------------------------------------------------- */}
        {/* WRITING                                                    */}
        {/* ---------------------------------------------------------- */}
        <section className="shell section-y">
          <SectionHeading
            index="04"
            eyebrow="Journal"
            title="Notes from building serious software."
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

          <div className="mt-16 grid gap-4 lg:grid-cols-3">
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

        {/* ---------------------------------------------------------- */}
        {/* TESTIMONIALS                                               */}
        {/* ---------------------------------------------------------- */}
        <section className="section-y border-y border-border bg-background-2">
          <div className="shell">
            <SectionHeading
              index="05"
              eyebrow="Endorsements"
              title="Trusted by the people who shipped alongside me."
              description="A few words from founders, managers, and teammates I've built with."
            />
          </div>
          <div className="mt-14">
            <Testimonials items={testimonials} />
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
