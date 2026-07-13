import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/site";
import type { GithubContributionData } from "@/lib/github-contributions";

const socialLinks = [
  { href: profile.github, label: "GitHub", icon: Github },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
  { href: "tel:+923166651488", label: "Phone", icon: Phone },
] as const;

const levelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-border",
  1: "bg-foreground/20",
  2: "bg-foreground/40",
  3: "bg-foreground/70",
  4: "bg-foreground",
};

type GithubActivitySectionProps = {
  data: GithubContributionData | null;
};

/** Social strip + GitHub-style contribution heatmap for the past year. */
export function GithubActivitySection({ data }: GithubActivitySectionProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Activity</span>
          <span className="font-mono text-xs text-faint">/ live</span>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
        >
          github.com/{data?.username ?? "shabirkhan-dev"}
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            title={label}
            className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors duration-300 hover:border-border-strong hover:text-foreground"
          >
            <Icon aria-hidden="true" size={16} strokeWidth={1.6} />
          </a>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto pb-1">
        {data ? (
          <ContributionGraph data={data} />
        ) : (
          <p className="font-mono text-xs text-muted-foreground">
            Contribution graph unavailable right now.
          </p>
        )}
      </div>
    </div>
  );
}

function ContributionGraph({ data }: { data: GithubContributionData }) {
  const totalLabel = data.total.toLocaleString("en-US");

  return (
    <div className="min-w-[40rem]">
      <div
        className="mb-1.5 grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
        }}
      >
        {data.weeks.map((_, weekIndex) => {
          const month = data.months.find((m) => m.weekIndex === weekIndex);
          return (
            <span
              key={`m-${weekIndex}`}
              className="h-4 overflow-visible font-mono text-[0.58rem] uppercase tracking-[0.08em] text-faint"
            >
              {month?.label ?? ""}
            </span>
          );
        })}
      </div>

      <div className="flex gap-1">
        <div
          aria-hidden="true"
          className="mr-1 hidden w-6 flex-col justify-between py-0.5 font-mono text-[0.55rem] uppercase leading-none text-faint sm:flex"
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div
          className="grid flex-1 gap-1"
          style={{
            gridTemplateColumns: `repeat(${data.weeks.length}, minmax(0, 1fr))`,
          }}
        >
          {data.weeks.map((week, weekIndex) => (
            <div key={week.days[0]?.date ?? weekIndex} className="grid gap-1">
              {week.days.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className={cn(
                    "aspect-square w-full min-w-[0.5rem] rounded-[2px]",
                    levelClass[day.level],
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.7rem] text-muted-foreground">
          <span className="text-foreground">{totalLabel}</span> contributions in
          the past 365 days
        </p>
        <div className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              aria-hidden="true"
              className={cn("size-2.5 rounded-[2px]", levelClass[level])}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
