import { ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { LinkButton } from "@/components/ui/button";

type PageCtaProps = {
  label: string;
  title: React.ReactNode;
  href: string;
  button: string;
  variant?: "primary" | "secondary";
};

/** Shared bottom-of-page CTA used on blog, lab, and projects. */
export function PageCta({
  label,
  title,
  href,
  button,
  variant = "secondary",
}: PageCtaProps) {
  return (
    <section className="relative">
      <Corners />
      <div className="relative overflow-hidden rounded-lg border border-border bg-background-2 px-[clamp(1.5rem,1rem+3vw,4rem)] py-[clamp(2.5rem,2rem+4vw,5rem)]">
        <div className="pointer-events-none absolute inset-0 hairline-grid opacity-60" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
              {label}
            </p>
            <h2 className="t-h2 mt-4 max-w-2xl">{title}</h2>
          </div>
          <LinkButton href={href} variant={variant} size="lg" className="w-fit">
            {button}
            <ArrowUpRight aria-hidden="true" size={17} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
