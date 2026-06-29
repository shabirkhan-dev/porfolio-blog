import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { EngineRoom } from "@/components/engine-room";
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

export const revalidate = 3600;

export default async function Home() {
  const writingPreview = (await getPublishedPosts()).slice(0, 3);
  const workProjects = projects.slice(0, 4);

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection
          lead={profile.hero}
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
          <div className="grid items-center gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <Reveal>
              <ScalesFrame className="mx-auto w-full max-w-[17rem]">
                <div className="relative grid aspect-square place-items-center">
                  <div className="absolute inset-0 hairline-grid opacity-50" />
                  <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_50%_42%,rgb(var(--accent-rgb)/0.18),transparent_62%)]" />
                  <span className="relative font-display text-[clamp(4rem,3rem+8vw,6.5rem)] font-semibold leading-none tracking-tight text-accent">
                    {profile.initials}
                  </span>
                </div>
              </ScalesFrame>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="eyebrow">About</span>
              <h2 className="t-h2 mt-6 max-w-lg text-balance">
                Calm on the surface.{" "}
                <span className="font-serif font-normal italic text-accent">
                  Disciplined
                </span>{" "}
                underneath.
              </h2>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-7 text-muted-foreground">
                {profile.intro}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.14em]">
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

        {/* SIGNATURE — Engine Room */}
        <EngineRoom />

        {/* SELECTED WORK — bento */}
        <section id="work" className="shell section-y">
          <SectionHeading
            index="01"
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

          <Reveal className="mt-16">
            <ProjectsBento projects={workProjects} />
          </Reveal>
        </section>

        {/* PHILOSOPHY — compressed */}
        <section className="relative overflow-hidden border-y border-border bg-background-2">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent_80%)]" />
          <div className="shell section-y relative">
            <Reveal className="max-w-xl">
              <span className="eyebrow">Approach</span>
              <h2 className="t-h2 mt-6 text-balance">
                How I{" "}
                <span className="font-serif font-normal italic text-accent">
                  think
                </span>{" "}
                about building.
              </h2>
            </Reveal>

            <div className="mt-20 grid gap-x-16 gap-y-14 sm:grid-cols-2">
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

        {/* STACK */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_50%,black,transparent_85%)]" />
          <div className="shell section-y relative">
            <SectionHeading
              index="02"
              eyebrow="Toolkit"
              title="The stack I ship with."
            />

            <Reveal className="mt-16">
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
            index="04"
            eyebrow="Journal"
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

          <div className="mt-20 grid gap-5 lg:grid-cols-3">
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
              index="05"
              eyebrow="Endorsements"
              title="Trusted by people I've shipped with."
            />
          </div>
          <div className="mt-16">
            <HomeTestimonials items={testimonials} />
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
