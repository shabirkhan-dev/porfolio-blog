import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { Reveal, WordReveal } from "@/components/motion";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { HeroCanvas } from "@/components/hero-canvas";
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
                  <div key={item.label} className="bg-background/70 p-5 backdrop-blur-sm">
                    <dt className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.6rem)] font-semibold leading-none tracking-tight text-foreground">
                      {item.value}
                    </dt>
                    <dd className="mt-2.5 text-xs leading-5 text-muted-foreground">
                      {item.label}
                    </dd>
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
        <section id="about" className="border-y border-border bg-background-2">
          <div className="shell section-y">
            <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
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
                  Software that feels effortless on the surface and is deliberate
                  underneath. These are the principles I build on.
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2">
                {philosophy.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal
                      key={item.title}
                      delay={index * 0.04}
                      className="group border-b border-border px-1 py-7 transition-colors hover:border-border-strong sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                    >
                      <div className="flex items-center justify-between">
                        <Icon
                          aria-hidden="true"
                          size={20}
                          className="text-accent transition-transform duration-500 group-hover:-rotate-6"
                        />
                        <span className="font-mono text-xs text-faint">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="t-h3 mt-6">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.body}
                      </p>
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

          <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal
                  key={group.title}
                  delay={index * 0.03}
                  className="group bg-background p-7 transition-colors duration-300 hover:bg-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-border text-accent transition-colors group-hover:border-accent/40">
                      <Icon aria-hidden="true" size={19} />
                    </div>
                    <div>
                      <h3 className="t-h3">{group.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>
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
                  className="rule group grid gap-4 py-8 last:border-b md:grid-cols-[10rem_1fr_1.3fr] md:gap-10"
                >
                  <span className="font-mono text-sm text-faint">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {item.role}
                    </h3>
                    <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {item.company} — {item.location}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {item.body}
                  </p>
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

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {writingPreview.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <ArticleCard post={post} />
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
              <div className="relative">
                <Badge tone="accent">Available for product work</Badge>
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
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
