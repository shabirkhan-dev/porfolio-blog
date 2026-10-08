import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { links, profile, projects, work } from "@/data/profile";
import { getPosts } from "@/data/posts";
import { Highlights } from "@/components/highlights";
import { PageColumn, SectionTitle } from "@/components/page-column";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";

const strong = "font-medium text-foreground";
const underlined = `${strong} underline decoration-from-font underline-offset-2`;

function Intro() {
  return (
    <header className="flex flex-col gap-7">
      <div className="flex items-center gap-3.5">
        <Image
          src="/avatar.png"
          alt={profile.name}
          width={56}
          height={56}
          priority
          className="size-14 rounded-[10px] object-cover"
        />
        <div className="flex-1 text-sm leading-5 tracking-[-0.0064em]">
          <h1 className="font-medium text-foreground">{profile.name}</h1>
          <p className="text-muted">{profile.role}</p>
        </div>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-4 text-sm leading-5 tracking-[-0.0064em] text-muted">
        <p>
          Based in <span className={strong}>Islamabad</span>, building web and mobile products end
          to end, from the interface and the API to the pipeline that ships them
        </p>
        <p>
          Right now I am leading the frontend of <span className={underlined}>Auspira</span> at{" "}
          <span className={strong}>Nexora AI</span>, and building{" "}
          <a href={projects[0].github} className={underlined}>
            Grid
          </a>
          , an open-source workspace where people and AI coding agents work on the same project
        </p>
        <p>
          The last eight years have moved between freelance work, an AI startup, and leading
          frontend teams, most recently on the rebuild of an HR platform used by PepsiCo and Intel
        </p>
        <p>
          I share my work on{" "}
          <a href={links.github} className={underlined}>
            GitHub
          </a>{" "}
          and can be reached by{" "}
          <a href={links.email} className={underlined}>
            email
          </a>
        </p>
      </div>
    </header>
  );
}

const iconLink =
  "relative z-10 -m-1.5 p-1.5 text-muted transition-colors hover-capable:hover:text-foreground";

function Projects() {
  return (
    <section className="flex flex-col gap-1">
      <SectionTitle>Projects</SectionTitle>
      <div className="h-3" />
      {projects.map((project) => (
        <div
          key={project.name}
          className="group relative flex items-center gap-4 rounded-xl px-2.5 py-3 transition-colors hover-capable:hover:bg-surface"
        >
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <a
                href={project.live ?? project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-5 font-medium tracking-[-0.0064em] text-foreground after:absolute after:inset-0 after:rounded-xl"
              >
                {project.name}
              </a>
              {project.isNew ? (
                <span className="rounded-full border border-new px-[7px] pb-px font-hand text-[15px] leading-4 text-new">
                  New
                </span>
              ) : null}
            </div>
            <p className="max-w-[430px] text-sm leading-5 tracking-[-0.0064em] text-muted">
              {project.description}
            </p>
          </div>
          <div className="flex items-center gap-[18px] transition-opacity hover-capable:opacity-0 hover-capable:group-hover:opacity-100 hover-capable:group-focus-within:opacity-100">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className={iconLink}
            >
              <Github className="size-6" strokeWidth={1.5} />
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name}`}
                className={iconLink}
              >
                <ArrowUpRight className="size-6" strokeWidth={1.5} />
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </section>
  );
}

async function Writing() {
  const posts = await getPosts();
  return (
    <section id="writing" className="flex scroll-mt-10 flex-col">
      <SectionTitle>Writing</SectionTitle>
      <div className="h-4" />
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex items-center gap-4 border-t border-line py-4 last:border-b"
        >
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt=""
              width={80}
              height={64}
              sizes="80px"
              className="h-16 w-20 shrink-0 rounded-lg object-cover"
            />
          ) : (
            <span className="h-16 w-20 shrink-0 rounded-lg bg-linear-to-r from-[#d9d9d4] to-[#9e9e99]" />
          )}
          <div className="flex flex-1 flex-col gap-1 text-sm leading-5 tracking-[-0.0064em]">
            <p className="font-medium text-foreground">{post.title}</p>
            <p className="max-w-[400px] text-muted">{post.excerpt}</p>
          </div>
          <ArrowRight
            className="size-6 shrink-0 text-muted transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-foreground"
            strokeWidth={1.5}
          />
        </Link>
      ))}
    </section>
  );
}

function Work() {
  return (
    <section className="flex flex-col">
      <SectionTitle>Work</SectionTitle>
      <div className="h-4" />
      {work.map((job) => (
        <div
          key={job.company}
          className="flex items-start gap-4 border-t border-line py-[18px] text-sm leading-5 tracking-[-0.0064em] last:border-b"
        >
          <div className="flex flex-1 flex-col gap-1">
            <p className="font-medium text-foreground">{job.company}</p>
            <p className="text-muted">{job.role}</p>
            <p className="mt-2 max-w-[430px] text-muted">{job.summary}</p>
          </div>
          <p className="text-muted">{job.period}</p>
        </div>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <PageColumn>
      <div className="flex flex-col gap-16 md:gap-[88px]">
        <Intro />
        <Highlights />
        <Projects />
        <Writing />
        <Work />
        <SiteFooter />
      </div>
    </PageColumn>
  );
}
