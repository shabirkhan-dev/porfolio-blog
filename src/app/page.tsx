import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { Reveal, WordReveal } from "@/components/motion";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { HeroCanvas } from "@/components/hero-canvas";
import { CountUp } from "@/components/count-up";
import { SpotlightCard } from "@/components/spotlight-card";
import { Toolkit } from "@/components/toolkit";
import { SectionHeading } from "@/components/section";
import { CaseStudyCard } from "@/components/portfolio/case-study-card";
import { Badge } from "@/components/ui/badge";
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
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <span className="eyebrow">Approach</span>
                  <h2 className="t-h2 mt-6">
                    Calm interfaces.{" "}
                    <span className="font-serif font-normal italic text-muted-foreground">
                      Disciplined
                    </span>{" "}
                    systems.
                  </h2>
                  <p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">
                    Software that feels effortless on the surface and is
                    deliberate underneath. These are the principles I build on.
                  </p>
                  <div className="mt-8 flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-faint">
                    <span className="h-px w-8 bg-accent" />
                    {philosophy.length} operating principles
                  </div>
                </Reveal>
              </div>

              <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
                {philosophy.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={index * 0.04}>
                      <SpotlightCard
                        tilt={0}
                        className="h-full bg-background-2 p-7 transition-colors duration-300 hover:bg-card"
                      >
                        <div className="flex items-center justify-between">
                          <span className="grid size-10 place-items-center rounded-lg border border-border text-accent transition-all duration-500 group-hover/spot:border-accent/40 group-hover/spot:-rotate-6">
                            <Icon aria-hidden="true" size={18} />
                          </span>
                          <span className="font-mono text-xs text-faint">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="t-h3 mt-6">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          {item.body}
                        </p>
                      </SpotlightCard>
                    </Reveal>
                  );
                })}
              </div>
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

            <div className="mt-14">
              {experience.map((item, index) => (
                <Reveal
                  key={`${item.company}-${item.role}`}
                  delay={index * 0.04}
                  className="rule group relative grid gap-4 py-9 last:border-b md:grid-cols-[11rem_1fr_1.3fr] md:gap-10"
                >
                  {/* Accent rail that grows on hover */}
                  <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                  <div className="flex items-center gap-3">
                    <span className="size-1.5 shrink-0 rounded-full bg-border-strong transition-colors duration-300 group-hover:bg-accent" />
                    <span className="font-mono text-sm text-faint transition-colors group-hover:text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {item.company} — {item.location}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className="absolute right-0 top-9 hidden text-faint opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100 md:block"
                  />
                </Reveal>
              ))}
            </div>
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
        {/* CONTACT                                                    */}
        {/* ---------------------------------------------------------- */}
        <section id="contact" className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-background-2 px-[clamp(1.5rem,1rem+3vw,4rem)] py-[clamp(2.5rem,2rem+4vw,5rem)]">
              <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
              {/* Ambient accent glow */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-accent/[0.06] blur-3xl" />

              <div className="relative">
                <Badge tone="accent">
                  <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-accent" />
                  Available for product work
                </Badge>
                <h2 className="t-h1 mt-8 max-w-4xl">
                  An engineer who can own the interface, the architecture, and
                  the{" "}
                  <span className="font-serif font-normal italic text-accent">
                    shipping path.
                  </span>
                </h2>
                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                  <Magnetic>
                    <LinkButton href={`mailto:${profile.email}`} size="lg">
                      Start a conversation
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </LinkButton>
                  </Magnetic>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-line font-mono text-sm text-muted-foreground"
                  >
                    {profile.email}
                  </a>
                </div>

                {/* Quick facts row */}
                <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                  {[
                    { k: "Response time", v: "Within 24h" },
                    { k: "Engagements", v: "Remote, worldwide" },
                    { k: "Focus", v: "Senior product builds" },
                  ].map((fact) => (
                    <div key={fact.k} className="bg-background-2 p-5">
                      <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                        {fact.k}
                      </dt>
                      <dd className="mt-2 font-display text-lg font-semibold tracking-tight text-foreground">
                        {fact.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
