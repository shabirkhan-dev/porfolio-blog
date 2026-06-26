import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "muted" | "dark" | "accent";
};

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.14em]",
        tone === "default" && "border-border bg-foreground/[0.03] text-muted-foreground",
        tone === "muted" && "border-border text-faint",
        tone === "accent" && "border-accent/25 bg-accent/[0.08] text-accent",
        tone === "dark" && "border-border-strong bg-background/60 text-foreground",
        className,
      )}
      {...props}
    />
  );
}
