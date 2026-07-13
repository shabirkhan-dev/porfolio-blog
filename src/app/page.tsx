import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NewsletterBlock } from "@/components/blog/newsletter-block";
import { WritingPreview } from "@/components/blog/writing-preview";
import { AsciiField } from "@/components/ascii-field";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { HeroSection } from "@/components/hero-section";
import { CoreStackShuffle } from "@/components/core-stack-marquee";
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
  aboutImpact,
  coreStack,
  coreStackMobile,
  experience,
  philosophy,
  profile,
  projects,
  proof,
  stackGroups,
  testimonials,
} from "@/data/site";
import { getPublishedPosts } from "@/data/posts.server";
import { getGithubContributions } from "@/lib/github-contributions";
import { GithubActivitySection } from "@/components/github-activity";

export default async function Home() {
  const posts = await getPublishedPosts();
  const writingPreview = posts.slice(0, 5);
  const workProjects = projects.slice(0, 4);
  const githubActivity = await getGithubContributions("shabirkhan-dev");
  const newsletterCover = posts[0]
    ? {
        title: posts[0].title,
        href: `/blog/${posts[0].slug}`,
        label: "Latest note",
      }
    : undefined;
  const newsletterItems = posts.slice(1, 4).map((post) => ({
    category: post.category,
    title: post.title,
    readingTime: post.readingTime.replace(/\s*read$/i, ""),
    href: `/blog/${post.slug}`,
  }));

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

          <BoxedStrip dividerTop>
            <div className="py-5 sm:py-6">
              <CoreStackShuffle items={coreStack} mobileItems={coreStackMobile} />
            </div>
          </BoxedStrip>

          <BoxedSection>
            <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-14">
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

                <p className="mt-5 max-w-xl text-[1.05rem] leading-8 text-foreground">
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
                  <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                    <dt className="text-faint">Based in</dt>
                    <dd className="text-foreground">Islamabad · GMT+5</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 sm:flex-col sm:gap-1">
                    <dt className="text-faint">Experience</dt>
                    <dd className="text-foreground">6+ years</dd>
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
          </BoxedSection>

          <BoxedSection>
            <GithubActivitySection data={githubActivity} />
          </BoxedSection>

          <BoxedSection id="work">
            <SectionHeading
              index="02"
              eyebrow="Selected work"
              title="Selected work."
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
          </BoxedSection>

          <BoxedSection
            id="approach"
            tone="muted"
            className="overflow-hidden"
            overlay={
              <div className="pointer-events-none absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(100%_60%_at_50%_0%,black,transparent_80%)]" />
            }
          >
            <Reveal>
              <div className="max-w-2xl">
                <div className="flex items-center gap-4">
                  <span className="eyebrow">Approach</span>
                  <span className="font-mono text-xs text-faint">/ 03</span>
                </div>
                <h2 className="t-h2 mt-4 text-balance">
                  Rules I actually{" "}
                  <span className="text-accent">ship by.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
                  Not slogans — decision filters. These are the checks that decide
                  what gets built, what waits, and what gets cut before it becomes
                  debt.
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

          <BoxedSection
            className="overflow-hidden"
            overlay={
              <div className="pointer-events-none absolute inset-0 hairline-grid opacity-30 [mask-image:radial-gradient(90%_70%_at_50%_50%,black,transparent_85%)]" />
            }
          >
            <SectionHeading
              index="04"
              eyebrow="Toolkit"
              title="The stack I ship with."
            />

            <Reveal className="mt-10">
              <HomeToolkit groups={stackGroups} />
            </Reveal>
          </BoxedSection>

          <BoxedSection tone="muted">
            <HomeExperienceTimeline items={experience} />
          </BoxedSection>

          <BoxedSection>
            <SectionHeading
              index="06"
              eyebrow="Writing"
              title="Judgment from shipping."
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

            <Reveal className="mt-10">
              <WritingPreview posts={writingPreview} />
            </Reveal>

            <Reveal className="mt-10">
              <NewsletterBlock
                cover={newsletterCover}
                items={newsletterItems}
              />
            </Reveal>
          </BoxedSection>

          <BoxedSection tone="muted">
            <SectionHeading
              index="07"
              eyebrow="Endorsements"
              title="Trusted by people I've shipped with."
            />
            <div className="mt-10">
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
