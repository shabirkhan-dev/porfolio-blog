import Link from "next/link";
import { ArrowRight, BookOpen, BriefcaseBusiness, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { posts, profile, projects } from "@/content/site";
import { formatDate } from "@/lib/format";

export default function Home() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />
      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_380px] lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-md border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium text-[var(--muted)]">
              <MapPin aria-hidden="true" size={16} />
              {profile.location} / {profile.availability}
            </p>
            <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.05] text-[var(--foreground)] sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-medium text-[var(--accent)]">
              {profile.role}
            </p>
            <p className="text-balance mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
              >
                View Projects
                <BriefcaseBusiness aria-hidden="true" size={18} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Read Blog
                <BookOpen aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-[var(--line)] bg-white p-5 shadow-sm">
            <div className="rounded-md bg-[var(--foreground)] p-5 text-white">
              <p className="text-sm text-slate-300">Current focus</p>
              <p className="mt-3 text-2xl font-semibold leading-8">
                Turning design systems, editorial ideas, and product strategy
                into fast web experiences.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["Design", "Build", "Write"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-md border border-[var(--line)] p-3 text-center"
                >
                  <p className="text-2xl font-semibold">
                    {index === 0 ? "12" : index === 1 ? "28" : "45"}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="border-y border-[var(--line)] bg-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Selected work"
                title="Projects with clear outcomes"
                description="A few placeholders are wired in now so your design can drop onto a real content model."
              />
              <Link
                href="/projects"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--accent)]"
              >
                All projects
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <article
                  key={project.slug}
                  className="rounded-lg border border-[var(--line)] bg-[var(--background)] p-5"
                >
                  <div
                    className={`h-28 rounded-md bg-gradient-to-br ${project.palette}`}
                  />
                  <p className="mt-5 text-sm font-medium text-[var(--accent-2)]">
                    {project.category} / {project.year}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {project.summary}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-[var(--accent-3)]">
                    {project.impact}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Writing"
              title="Notes from the build process"
              description="Blog routes are ready for essays, launch notes, and project breakdowns."
            />
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--accent)]"
            >
              All writing
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-lg border border-[var(--line)] bg-white p-5 transition hover:border-[var(--accent)]"
              >
                <p className="text-sm text-[var(--muted)]">
                  {formatDate(post.publishedAt)} / {post.readingTime}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
