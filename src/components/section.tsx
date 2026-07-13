import { type ReactNode } from "react";
import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "between" | "stack";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "between",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === "between"
          ? "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          : "max-w-3xl",
        className,
      )}
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-4">
          <span className="eyebrow">{eyebrow}</span>
          {index ? (
            <span className="font-mono text-xs text-faint">/ {index}</span>
          ) : null}
        </div>
        <h2 className="t-h2 mt-4">{title}</h2>
      </div>
      {description ? (
        <p className="max-w-sm text-sm leading-7 text-muted-foreground sm:text-right">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
