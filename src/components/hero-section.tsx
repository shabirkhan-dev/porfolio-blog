import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { FrameNodes } from "@/components/boxed-section";
import { Corners } from "@/components/corners";
import { DeferredHeroCanvas } from "@/components/deferred-hero-canvas";
import { HeroLocalTime } from "@/components/hero-local-time";
import { PronounceNameButton } from "@/components/pronounce-name-button";
import {
  HERO_FIRST_PHRASE,
  HERO_PHRASE_SLOT_CH,
} from "@/components/hero-phrases";
import { HeroBuildTypewriter } from "@/components/hero-typewriter";
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
 * Compact hiring-focused hero. The LCP phrase is server HTML — the typewriter
 * only takes over after the LCP window.
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
        <div className="boxed-frame relative flex flex-col border-x border-border">
          <FrameNodes top bottom />

          <div className="frame-content flex items-center justify-between pt-[clamp(1.25rem,0.9rem+1.5vw,2rem)]">
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

          <div className="frame-content relative py-6 sm:py-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] font-semibold tracking-tight text-foreground">
                {name}
              </p>
              <PronounceNameButton name={name} pronounceAs="Shabir Khan" />
            </div>

            <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent">
              {title}
            </p>

            <h1 className="mt-5 font-display text-[clamp(3.1rem,2.1rem+4.5vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              <span className="block text-foreground">I build</span>
              <span
                className="relative mt-1 block whitespace-nowrap text-foreground"
                style={{
                  minWidth: `${HERO_PHRASE_SLOT_CH}ch`,
                  width: `${HERO_PHRASE_SLOT_CH}ch`,
                  minHeight: "1.05em",
                }}
              >
                <span data-hero-static-phrase>{HERO_FIRST_PHRASE}</span>
                <HeroBuildTypewriter />
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
              Full-stack engineer building reliable products from interface to
              infrastructure.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:mt-6 sm:gap-x-6">
              <LinkButton
                href="#work"
                size="md"
                className="sm:h-11 md:h-12 md:px-7 md:text-[0.78rem]"
              >
                View selected work
                <ArrowDownRight
                  aria-hidden="true"
                  className="size-4 md:size-[18px]"
                />
              </LinkButton>
              <Link
                href="/resume"
                className="link-line inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs"
              >
                Résumé
                <ArrowUpRight
                  aria-hidden="true"
                  size={12}
                  className="sm:size-[13px]"
                />
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs"
              >
                GitHub
              </a>
              <Link
                href="#contact"
                className="link-line font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="frame-content relative pb-6 sm:pb-7">
            <div className="relative">
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
