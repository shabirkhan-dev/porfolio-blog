import { cn } from "@/lib/utils";

export function PrincipleCard({
  index,
  title,
  body,
  practice,
  proof,
}: {
  index: number;
  title: string;
  body: string;
  practice: string;
  proof?: string;
}) {
  return (
    <article
      className={cn(
        "group relative grid gap-5 border-t border-border py-7 transition-colors sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-8",
        "hover:border-accent/40",
      )}
    >
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">
        <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
        <span className="mt-1 block text-[0.58rem] tracking-[0.14em]">Rule</span>
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.2rem,1.05rem+0.7vw,1.55rem)] font-semibold tracking-tight transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
          {body}
        </p>

        <div className="mt-5 grid gap-3 border-l-2 border-accent/35 pl-4 sm:mt-6">
          <p className="text-sm leading-6 text-foreground/90">
            <span className="mr-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
              Do
            </span>
            {practice}
          </p>
          {proof ? (
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
              Seen in — {proof}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
