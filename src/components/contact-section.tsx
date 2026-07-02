import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { LinkButton } from "@/components/ui/button";
import { profile } from "@/data/site";

const channels = [
  {
    label: "Email",
    value: profile.email,
    hint: "Fastest way to reach me",
    href: `mailto:${profile.email}`,
  },
  {
    label: "GitHub",
    value: "shabirkhan-dev",
    hint: "Code, OSS, and experiments",
    href: profile.github,
  },
  {
    label: "LinkedIn",
    value: "shabirkhan23",
    hint: "Experience and endorsements",
    href: profile.linkedin,
  },
  {
    label: "Résumé",
    value: "resume — print-ready",
    hint: "For recruiters and hiring teams",
    href: "/resume",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="shell pb-[clamp(5rem,4rem+5vw,8rem)] pt-[clamp(2rem,1rem+3vw,4rem)]">
      <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-20">
        <div className="flex flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="eyebrow">Contact</span>
              <span className="font-mono text-xs text-faint">/ 09</span>
            </div>
            <h2 className="t-h1 mt-6 max-w-[20ch] text-balance">
              Building a <span className="text-accent">serious</span> product?
            </h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-7 text-muted-foreground">
              Whether you&apos;re hiring a senior engineer or need a product
              built end to end — I can design the system, ship the interface,
              and make the architecture hold under real use.
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

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-border pt-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint lg:mt-16">
            <span className="flex items-center gap-2 text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              Open to senior roles
            </span>
            <span>{profile.location}</span>
            <span>Remote worldwide</span>
            <span>Response &lt; 24h</span>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-border">
          {channels.map((ch, i) => (
            <Link
              key={ch.label}
              href={ch.href}
              className="group relative flex flex-1 items-center gap-5 overflow-hidden border-b border-border py-6 lg:py-7"
            >
              <span className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-accent/[0.06] transition-transform duration-500 ease-out group-hover:scale-x-100" />

              <span className="w-8 shrink-0 font-mono text-[0.7rem] tabular-nums text-muted-foreground transition-colors duration-300 group-hover:text-accent">
                0{i + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-display text-[clamp(1.35rem,1.1rem+1.2vw,2rem)] font-semibold leading-none tracking-tight text-foreground transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
                  {ch.label}
                </span>
                <span className="mt-2 block truncate font-mono text-[0.75rem] text-muted-foreground transition-all duration-300 group-hover:translate-x-1.5">
                  {ch.value}
                </span>
              </span>

              <span className="hidden shrink-0 text-right font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint transition-colors duration-300 group-hover:text-muted-foreground sm:block">
                {ch.hint}
              </span>

              <ArrowUpRight
                aria-hidden="true"
                size={20}
                className="shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
