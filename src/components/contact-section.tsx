import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { LinkButton } from "@/components/ui/button";
import { profile } from "@/data/site";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    primary: true,
  },
  {
    label: "GitHub",
    value: "shabirkhan-dev",
    href: profile.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "shabirkhan23",
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: "tel:+923166651488",
    icon: Phone,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="shell pb-[clamp(4rem,3rem+5vw,7rem)]">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Left — pitch */}
        <div>
          <span className="eyebrow">Contact</span>
          <h2 className="t-h1 mt-6 max-w-xl text-balance">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal italic text-accent">
              sharp.
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

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { k: "Response", v: "Within 24h" },
              { k: "Location", v: profile.location },
              { k: "Engagements", v: "Remote, worldwide" },
            ].map((fact) => (
              <div key={fact.k}>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                  {fact.k}
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — contact channels */}
        <div className="flex flex-col gap-3">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <Link
                key={ch.label}
                href={ch.href}
                data-cursor="hover"
                className="group flex items-center gap-4 rounded-2xl border border-border bg-background-2 px-5 py-4 transition-all duration-300 hover:border-border-strong hover:bg-card active:scale-[0.98] active:bg-card"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/[0.08] group-hover:text-accent">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
                    {ch.label}
                  </span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                    {ch.value}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
