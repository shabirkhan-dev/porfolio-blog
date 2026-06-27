import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { LinkButton } from "@/components/ui/button";
import { profile } from "@/data/site";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    value: "shabirkhan-dev",
    href: profile.github,
  },
  {
    label: "LinkedIn",
    value: "shabirkhan23",
    href: profile.linkedin,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: "tel:+923166651488",
  },
];

const facts = [
  { k: "Response", v: "Within 24h" },
  { k: "Location", v: profile.location },
  { k: "Engagements", v: "Remote, worldwide" },
];

export function ContactSection() {
  return (
    <section id="contact" className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-16">
        {/* Left — pitch */}
        <div className="flex flex-col lg:justify-between">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="t-h1 mt-6 max-w-[14ch]">
              <span className="block">Let&apos;s build</span>
              <span className="block">
                something{" "}
                <span className="font-serif font-normal italic text-accent">
                  sharp.
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
              {profile.availability}. I respond within 24 hours and take on a
              small number of senior product builds each quarter.
            </p>

            <div className="mt-10">
              <Magnetic>
                <LinkButton href={`mailto:${profile.email}`} size="lg">
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" size={18} />
                </LinkButton>
              </Magnetic>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:mt-0">
            {facts.map((fact) => (
              <div key={fact.k}>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {fact.k}
                </p>
                <p className="mt-1.5 text-sm font-medium text-foreground">
                  {fact.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — editorial contact index */}
        <div className="flex flex-col justify-between border-t border-border">
          {channels.map((ch, i) => (
            <Link
              key={ch.label}
              href={ch.href}
              className="group relative flex flex-1 items-center gap-5 overflow-hidden border-b border-border py-6 lg:py-7"
            >
              {/* Accent wipe on hover */}
              <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-accent/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100" />

              <span className="w-8 shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                0{i + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] font-semibold leading-none tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
                  {ch.label}
                </span>
                <span className="mt-2 block truncate font-mono text-[0.8rem] text-muted-foreground transition-all duration-300 group-hover:translate-x-1.5">
                  {ch.value}
                </span>
              </span>

              <ArrowUpRight
                aria-hidden="true"
                size={22}
                className="shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
