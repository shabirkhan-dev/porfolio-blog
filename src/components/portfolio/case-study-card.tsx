import { ArrowUpRight } from "lucide-react";
import { ProjectPreview } from "@/components/portfolio/project-preview";

type Project = {
  title: string;
  role: string;
  category: string;
  year: string;
  description: string;
  impact: string;
  stack: string[];
  tags: string[];
  visual: string;
};

export function CaseStudyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="rule group grid items-center gap-8 py-12 last:border-b lg:grid-cols-[3rem_1fr_minmax(0,30rem)] lg:gap-12">
      <span className="font-mono text-sm text-faint">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
          <span className="text-accent">{project.category}</span>
          <span className="text-faint">·</span>
          <span className="text-faint">{project.year}</span>
        </div>

        <h3 className="mt-5 font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-semibold leading-[0.98] tracking-tight transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {project.role}
        </p>

        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
          {project.description}
        </p>

        <p className="mt-5 max-w-xl border-l border-accent/40 pl-5 text-sm leading-7 text-foreground/75">
          {project.impact}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-faint"
            >
              {item}
            </span>
          ))}
        </div>

        <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-foreground">
          View thinking
          <ArrowUpRight
            aria-hidden="true"
            size={15}
            className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-border transition-colors duration-500 group-hover:border-border-strong">
        <div className="transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <ProjectPreview visual={project.visual} title={project.title} />
        </div>
      </div>
    </article>
  );
}
