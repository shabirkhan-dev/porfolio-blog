import { Github, Linkedin, Mail } from "lucide-react";
import { links, profile } from "@/data/profile";
import { SectionTitle } from "@/components/page-column";

const social = [
  { label: "GitHub", href: links.github, Icon: Github },
  { label: "LinkedIn", href: links.linkedin, Icon: Linkedin },
  { label: "Email", href: links.email, Icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-9 border-t border-line pt-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        <div className="flex flex-1 flex-col gap-3">
          <SectionTitle>Elsewhere</SectionTitle>
          <p className="max-w-[300px] text-sm leading-6 tracking-[-0.0064em] text-muted">
            {profile.availability}
          </p>
        </div>
        <ul className="flex items-center gap-5 md:pb-1">
          {social.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="-m-1.5 block p-1.5 text-muted transition-colors hover-capable:hover:text-foreground"
              >
                <Icon className="size-6" strokeWidth={1.5} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-4 text-[11px] leading-4 tracking-[-0.0064em] text-muted">
        <p className="flex-1">© {new Date().getFullYear()} {profile.name}</p>
        <p>{profile.location}</p>
      </div>
    </footer>
  );
}
