import { Quote } from "lucide-react";
import { slugifyHeading, type ArticleBlock } from "@/data/site";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  let firstParagraphSeen = false;

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph": {
            const isFirst = !firstParagraphSeen;
            firstParagraphSeen = true;

            if (block.lead) {
              return (
                <p
                  key={key}
                  className="text-[clamp(1.2rem,1rem+0.8vw,1.5rem)] leading-[1.6] text-foreground/90"
                >
                  {block.content}
                </p>
              );
            }

            return (
              <p
                key={key}
                className={
                  isFirst
                    ? "text-[1.05rem] leading-8 text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-accent"
                    : "text-[1.05rem] leading-8 text-muted-foreground"
                }
              >
                {block.content}
              </p>
            );
          }

          case "heading":
            return (
              <h2
                key={key}
                id={slugifyHeading(block.content)}
                className="t-h3 scroll-mt-28 pt-8 !text-[clamp(1.5rem,1.2rem+1.2vw,2.1rem)]"
              >
                {block.content}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={key}
                className="pt-4 font-display text-xl font-semibold tracking-tight text-foreground"
              >
                {block.content}
              </h3>
            );

          case "quote":
            return (
              <figure
                key={key}
                className="my-12 border-l-2 border-accent pl-6"
              >
                <Quote
                  aria-hidden="true"
                  size={22}
                  className="mb-4 text-accent"
                />
                <blockquote className="font-serif text-[clamp(1.5rem,1.2rem+1.3vw,2.2rem)] italic leading-snug text-foreground">
                  {block.content}
                </blockquote>
                {block.cite ? (
                  <figcaption className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                    — {block.cite}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "list":
            return block.ordered ? (
              <ol key={key} className="space-y-3">
                {block.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[1.02rem] leading-7 text-muted-foreground"
                  >
                    <span className="mt-0.5 font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={key} className="space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[1.02rem] leading-7 text-muted-foreground"
                  >
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <aside
                key={key}
                className="my-10 overflow-hidden rounded-xl border border-accent/25 bg-accent/[0.06] p-6"
              >
                {block.label ? (
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent">
                    {block.label}
                  </p>
                ) : null}
                <p className="mt-3 text-[1.02rem] leading-7 text-foreground/90">
                  {block.content}
                </p>
              </aside>
            );

          case "code":
            return (
              <div
                key={key}
                className="my-10 overflow-hidden rounded-xl border border-border bg-[#0c0c0b]"
              >
                <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">
                  <span className="flex items-center gap-2">
                    <span className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-white/15" />
                      <span className="size-2.5 rounded-full bg-white/15" />
                      <span className="size-2.5 rounded-full bg-accent/60" />
                    </span>
                    {block.filename ?? "snippet"}
                  </span>
                  <span className="text-accent">{block.language}</span>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-sm leading-7 text-foreground/90">
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          case "divider":
            return (
              <div
                key={key}
                className="my-12 flex items-center justify-center gap-2"
                aria-hidden="true"
              >
                <span className="size-1 rounded-full bg-faint/50" />
                <span className="size-1 rounded-full bg-accent" />
                <span className="size-1 rounded-full bg-faint/50" />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
