"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";

export function ArticleShare({ title, url }: { title: string; url: string }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const links = useMemo(
    () => ({
      x: `https://twitter.com/intent/tweet?${new URLSearchParams({ text: title, url }).toString()}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url }).toString()}`,
    }),
    [title, url],
  );

  const copyLink = async () => {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await Promise.race([
          navigator.clipboard.writeText(url),
          new Promise<never>((_, reject) =>
            window.setTimeout(() => reject(new Error("Clipboard timed out")), 800),
          ),
        ]);
        copied = true;
      }
    } catch {
      // The async clipboard API can be unavailable in embedded browsers.
    }

    if (!copied) {
      try {
        const field = document.createElement("textarea");
        field.value = url;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand("copy");
        field.remove();
      } catch {
        copied = false;
      }
    }

    setCopyState(copied ? "copied" : "failed");
    window.setTimeout(() => setCopyState("idle"), 2200);
  };

  const copied = copyState === "copied";

  return (
    <div>
      <p className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-faint">
        Share this article
      </p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
        <a
          href={links.x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share “${title}” on X`}
          className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:text-accent"
        >
          Post on X
          <ExternalLink aria-hidden="true" size={13} />
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share “${title}” on LinkedIn`}
          className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:text-accent"
        >
          Share on LinkedIn
          <ExternalLink aria-hidden="true" size={13} />
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Article link copied" : "Copy article link"}
          className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-muted-foreground transition-colors hover:text-accent focus-visible:text-accent"
        >
          {copied ? <Check aria-hidden="true" size={14} /> : <Copy aria-hidden="true" size={14} />}
          {copied ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy link"}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied
            ? "Article link copied to clipboard."
            : copyState === "failed"
              ? "The article link could not be copied."
              : ""}
        </span>
      </div>
    </div>
  );
}
