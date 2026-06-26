import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering projects by Shabir Khan.",
};

export default function ProjectsPage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected systems and product platforms"
          description="Work shaped by secure delivery, product ownership, performance, and full-stack architecture."
        />

        <div className="mt-10 grid gap-5">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm md:grid-cols-[320px_1fr]"
            >
              <div
                className={`min-h-56 bg-gradient-to-br ${project.palette}`}
                aria-hidden="true"
              />
              <div className="p-6">
                <p className="text-sm font-medium text-primary">
                  {project.category} / {project.year}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
                <p className="mt-5 text-sm font-semibold text-foreground">
                  {project.impact}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href="mailto:shabirkhan.dev@gmail.com"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Discuss project
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
