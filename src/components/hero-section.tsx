import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FrameNodes } from "@/components/boxed-section";
import { Corners } from "@/components/corners";
import { DeferredHeroCanvas } from "@/components/deferred-hero-canvas";
import { HeroLocalTime } from "@/components/hero-local-time";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { PronounceNameButton } from "@/components/pronounce-name-button";
import { LinkButton } from "@/components/ui/button";
import { profile } from "@/data/site";

type ProofItem = { value: string; label: string };

type HeroSectionProps = {
  name: string;
  title: string;
  location: string;
  proof: ProofItem[];
};

/**
 * Hero: name + pronounce, typewriter craft line, short description, one CTA.
 */
export function HeroSection({
  name,
  title,
  location,
  proof,
}: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <DeferredHeroCanvas className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,var(--background)_85%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-background" />

      <div className="shell">
        <div className="boxed-frame relative flex min-h-[min(100svh,46rem)] flex-col border-x border-border">
          <FrameNodes top bottom />

          <div className="frame-content flex items-center justify-between pt-[clamp(1.5rem,1rem+2.5vw,2.75rem)]">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Open to work — {location}
              </span>
            </div>
            <HeroLocalTime />
          </div>

          <div className="frame-content relative flex flex-1 flex-col justify-center py-8 sm:py-10">
            <div className="hero-fade flex flex-wrap items-center gap-3">
              <h2 className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-semibold tracking-tight text-foreground">
                {name}
              </h2>
              <PronounceNameButton name={name} pronounceAs="Shabir Khan" />
            </div>

            <p className="hero-fade mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
              {title}
            </p>

            <div className="mt-6">
              <HeroTypewriter />
            </div>

            <p
              className="hero-fade mt-5 max-w-md text-[0.95rem] leading-7 text-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            >
              Creating with code. The quiet details are what make software hold.
            </p>

            <div
              className="hero-fade mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ animationDelay: "0.35s" }}
            >
              <LinkButton href="#work" size="lg">
                Selected work
                <ArrowDownRight aria-hidden="true" size={18} />
              </LinkButton>
              <Link
                href="/resume"
                className="link-line inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                Résumé
                <ArrowUpRight aria-hidden="true" size={13} />
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-line font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="frame-content relative pb-8 sm:pb-9">
            <div className="hero-fade relative" style={{ animationDelay: "0.55s" }}>
              <Corners />
              <dl className="grid grid-cols-2 border border-border bg-background/40 backdrop-blur-[2px] lg:grid-cols-4">
                {proof.map((item, index) => (
                  <div
                    key={item.label}
                    className={`group relative px-4 py-4 transition-colors duration-300 hover:bg-accent/[0.04] sm:px-5 sm:py-5 ${
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
                    <dd className="mt-2.5">
                      <span className="font-display text-[clamp(1.6rem,1.3rem+1.2vw,2.4rem)] font-medium leading-none tracking-tight text-foreground">
                        {item.value}
                      </span>
                      <span className="mt-1.5 block text-xs leading-5 text-muted-foreground">
                        {item.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
