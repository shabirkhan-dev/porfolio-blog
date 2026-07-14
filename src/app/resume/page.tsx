import type { Metadata } from "next";
import { ResumeActions } from "@/components/resume-actions";
import {
  education,
  experience,
  languages,
  profile,
  projects,
  proof,
  stackGroups,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Résumé — Shabir Khan",
  description:
    "Résumé of Shabir Khan, Senior Full-Stack Engineer — experience, skills, and selected work.",
  alternates: { canonical: "/resume" },
};

const ACCENT = "#15803d";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <ResumeActions />

      <main className="mx-auto w-full max-w-3xl px-6 py-10 print:p-0">
        <article className="resume-sheet rounded-2xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.3)] sm:p-12 print:rounded-none print:p-0 print:shadow-none">
          {/* Header */}
          <header className="flex flex-col gap-6 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {profile.name}
              </h1>
              <p
                className="mt-1.5 text-sm font-semibold uppercase tracking-[0.12em]"
                style={{ color: ACCENT }}
              >
                {profile.title}
              </p>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
                {profile.descriptor}
              </p>
            </div>

            <ul className="shrink-0 space-y-1 text-sm text-zinc-600 sm:text-right">
              <li>
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </li>
              <li>{profile.phone}</li>
              <li>{profile.location}</li>
              <li>
                <a
                  href={profile.github}
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/shabirkhan-dev
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/shabirkhan23
                </a>
              </li>
            </ul>
          </header>

          {/* Summary */}
          <section className="mt-7">
            <p className="text-[0.95rem] leading-7 text-zinc-700">
              {profile.intro}
            </p>
          </section>

          {/* Key impact */}
          <section className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl bg-zinc-50 p-5 sm:grid-cols-4 print:bg-transparent print:p-0">
            {proof.map((item) => (
              <div key={item.label}>
                <p
                  className="text-xl font-bold tracking-tight"
                  style={{ color: ACCENT }}
                >
                  {item.value}
                </p>
                <p className="mt-1 text-xs leading-4 text-zinc-500">
                  {item.label}
                </p>
              </div>
            ))}
          </section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-6">
              {experience.map((item) => (
                <div
                  key={`${item.company}-${item.role}`}
                  className="break-inside-avoid"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-zinc-900">
                      {item.role}{" "}
                      <span className="font-normal text-zinc-500">
                        · {item.company}
                      </span>
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-[0.08em] text-zinc-500">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
                    {item.location}
                  </p>
                  <p className="mt-2.5 text-sm leading-6 text-zinc-700">
                    {item.summary}
                  </p>
                  {item.metrics.length ? (
                    <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1">
                      {item.metrics.map((metric) => (
                        <li key={metric.label} className="text-sm text-zinc-700">
                          <span
                            className="font-semibold"
                            style={{ color: ACCENT }}
                          >
                            {metric.value}
                          </span>{" "}
                          <span className="text-zinc-500">{metric.label}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Section>

          {/* Selected work */}
          <Section title="Selected work">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.slug} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      {project.title}
                      {project.subtitle ? (
                        <span className="font-normal text-zinc-500">
                          {" "}
                          · {project.subtitle}
                        </span>
                      ) : null}
                    </h3>
                    <span className="text-sm font-semibold" style={{ color: ACCENT }}>
                      {project.metric.value}
                      <span className="ml-1.5 font-normal text-zinc-500">
                        {project.metric.label}
                      </span>
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    {project.tagline} — {project.role}.
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {stackGroups.map((group) => (
                <div key={group.title} className="break-inside-avoid">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-900">
                    {group.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* Education & Languages */}
          <div className="grid gap-x-8 sm:grid-cols-2">
            <Section title="Education">
              <div className="break-inside-avoid">
                <p className="text-sm font-semibold text-zinc-900">
                  {education.degree}
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  {education.school} · {education.year}
                </p>
              </div>
            </Section>
            <Section title="Languages">
              <ul className="space-y-1">
                {languages.map((lang) => (
                  <li key={lang.name} className="text-sm text-zinc-700">
                    <span className="font-semibold text-zinc-900">
                      {lang.name}
                    </span>{" "}
                    <span className="text-zinc-500">— {lang.level}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <footer className="mt-8 border-t border-zinc-200 pt-5 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-zinc-400">
            {profile.name} · {profile.availability}
          </footer>
        </article>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
