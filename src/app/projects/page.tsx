import type { Metadata } from "next";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { PageCta } from "@/components/page-cta";
import { ProjectsBento } from "@/components/portfolio/projects-bento";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VisibleMount } from "@/components/visible-mount";
import { profile, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product, platform, SaaS, AI, mobile, infrastructure, and systems work by Shabir Khan.",
  alternates: { canonical: "/projects" },
};

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
              <span className="block">Work.</span>
            </h1>

            <Reveal delay={0.12} className="mt-6 max-w-lg border-t border-border pt-5">
              <p className="t-lead">
                Product shots, a short brief, and GitHub when it’s public.
              </p>
            </Reveal>
          </BoxedSection>

          <BoxedStrip dividerTop={false} className="cv-auto">
            <div className="py-6">
              <VisibleMount minHeight="2.5rem" rootMargin="80px 0px">
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
              </VisibleMount>
            </div>
          </BoxedStrip>

          <BoxedSection className="cv-auto">
            <h2 className="sr-only">Projects</h2>
            <ProjectsBento projects={projects} variant="page" />
          </BoxedSection>

          <VisibleMount minHeight="16rem" rootMargin="160px 0px">
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
                />
              </Reveal>
            </BoxedSection>
          </VisibleMount>
        </main>
      </BoxedPage>
      <SiteFooter />
    </div>
  );
}
