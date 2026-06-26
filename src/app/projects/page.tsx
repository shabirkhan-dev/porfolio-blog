import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected portfolio projects and case studies.",
};

export default function ProjectsPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work and case studies"
          description="Replace these placeholders with your real projects, case study links, and visuals."
        />

        <div className="mt-10 grid gap-5">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-5 rounded-lg border border-[var(--line)] bg-white p-5 md:grid-cols-[280px_1fr_auto] md:items-center"
            >
              <div
                className={`h-40 rounded-md bg-gradient-to-br md:h-36 ${project.palette}`}
              />
              <div>
                <p className="text-sm font-medium text-[var(--accent-2)]">
                  {project.category} / {project.year}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {project.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  {project.summary}
                </p>
                <p className="mt-4 text-sm font-semibold text-[var(--accent-3)]">
                  {project.impact}
                </p>
              </div>
              <a
                href="mailto:hello@example.com"
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--line)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Discuss
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
