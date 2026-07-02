import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Corners } from "@/components/corners";
import { DeferredHeroCanvas } from "@/components/deferred-hero-canvas";
import { HeroLocalTime } from "@/components/hero-local-time";
import { LinkButton } from "@/components/ui/button";
import { profile } from "@/data/site";

type ProofItem = { value: string; label: string };

type HeroSectionProps = {
  name: string;
  title: string;
  lead: React.ReactNode;
  location: string;
  proof: ProofItem[];
};

/**
 * Server-rendered hero. The headline is in the initial HTML and animates with
 * pure CSS (no hydration dependency), so the LCP element paints immediately.
 * Only the local-time chip and the deferred canvas are client islands.
 */
export function HeroSection({
  name,
  title,
  lead,
  location,
  proof,
}: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <DeferredHeroCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,var(--background)_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-background" />

      {/* Top meta */}
      <div className="shell flex items-center justify-between pt-[clamp(2rem,1rem+4vw,4rem)]">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Available for work — {location}
          </span>
        </div>
        <HeroLocalTime />
      </div>

      {/* Identity + headline + CTAs */}
      <div className="shell relative flex flex-1 flex-col justify-center py-20">
        <p className="hero-fade font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-foreground">{name}</span>
          <span aria-hidden="true" className="mx-3 text-faint">
            //
          </span>
          <span className="text-accent">{title}</span>
        </p>

        {/* Headline animates with a transform-only line rise: opacity stays
            at 1 so the LCP element still paints on the first frame. */}
        <h1 className="t-display mt-7 max-w-[16ch]">
          <span className="hero-line">I engineer</span>
          <span className="hero-line">products that feel</span>
          <span className="hero-line">
            <span className="relative inline-block text-accent">
              inevitable.
              <span aria-hidden="true" className="cursor-blink" />
              <span
                aria-hidden="true"
                className="hero-underline absolute -bottom-1 left-0 h-px w-full bg-accent"
              />
            </span>
          </span>
        </h1>

        <p
          className="t-lead hero-fade mt-10 max-w-lg"
          style={{ animationDelay: "0.5s" }}
        >
          {lead}
        </p>

        <div
          className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.62s" }}
        >
          <LinkButton href="#work" size="lg">
            View selected work
            <ArrowDownRight
              aria-hidden="true"
              size={18}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5"
            />
          </LinkButton>
          <LinkButton href="/resume" variant="secondary" size="lg">
            View résumé
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
            />
          </LinkButton>
          <span className="ml-1 flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="link-line font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              GitHub
            </a>
            <Link
              href="/blog"
              className="link-line font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              Writing
            </Link>
          </span>
        </div>
      </div>

      {/* Proof — technical stat grid */}
      <div className="shell relative pb-16">
        <div className="hero-fade relative" style={{ animationDelay: "0.8s" }}>
          <Corners />
          <dl className="grid grid-cols-2 border border-border bg-background/40 backdrop-blur-[2px] lg:grid-cols-4">
            {proof.map((item, index) => (
              <div
                key={item.label}
                className={`group relative px-5 py-5 transition-colors duration-300 hover:bg-accent/[0.04] sm:px-6 ${
                  index % 2 === 1 ? "border-l border-border" : ""
                } ${index >= 2 ? "border-t border-border lg:border-t-0 lg:border-l" : ""}`}
              >
                <dt className="flex items-baseline justify-between gap-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden="true"
                    className="size-1 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </dt>
                <dd className="mt-3">
                  <span className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.4rem)] font-medium leading-none tracking-tight text-foreground">
                    {item.value}
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-muted-foreground">
                    {item.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hero-fade pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
        style={{ animationDelay: "1.1s" }}
      >
        <span
          aria-hidden="true"
          className="scroll-cue block h-8 w-px bg-accent/50"
        />
      </div>
    </section>
  );
}
