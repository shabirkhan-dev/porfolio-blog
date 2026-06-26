import { profile, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Built with Next.js, Bun, and Vercel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {socials.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="grid size-10 place-items-center rounded-md border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <Icon aria-hidden="true" size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
