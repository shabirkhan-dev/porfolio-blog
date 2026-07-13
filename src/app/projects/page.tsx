import type { Metadata } from "next";
import { BoxedPage, BoxedSection, BoxedStrip } from "@/components/boxed-section";
import { Reveal } from "@/components/motion";
import { Marquee } from "@/components/marquee";
import { PageCta } from "@/components/page-cta";
import { ProjectsBento } from "@/components/portfolio/projects-bento";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product, platform, SaaS, AI, mobile, infrastructure, and systems work by Shabir Khan.",
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
              <span className="block">Products you can</span>
              <span className="block">
                read at a glance — <span className="text-accent">then go deeper.</span>
              </span>
            </h1>

            <Reveal delay={0.12} className="mt-6 max-w-lg border-t border-border pt-5">
              <p className="t-lead">
                Preview, one clear sentence, the stack that mattered, and GitHub
                when the work is public.
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

          <BoxedSection>
            <h2 className="sr-only">Projects</h2>
            <Reveal>
              <ProjectsBento projects={projects} variant="page" />
            </Reveal>
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
