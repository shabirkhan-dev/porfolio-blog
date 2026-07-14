"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SourceFileEntry } from "./request-flow.types";

const REPO_BASE =
  "https://github.com/shabirkhan-dev/portfolio-blog/tree/main/src/components/lab/experiments/request-flow";

export function RequestFlowSourcePanel({
  files,
}: {
  files: SourceFileEntry[];
}) {
  const [activePath, setActivePath] = useState(files[0]?.path ?? "");
  const [copied, setCopied] = useState(false);

  const active = files.find((f) => f.path === activePath) ?? files[0];

  const copy = async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  if (!files.length || !active) {
    return (
      <p className="text-sm text-muted-foreground">Source files unavailable.</p>
    );
  }

  return (
    <div className="overflow-hidden border border-border bg-background-2">
      <div className="grid lg:grid-cols-[12rem_1fr]">
        <nav
          aria-label="Source files"
          className="border-b border-border lg:border-b-0 lg:border-r"
        >
          <p className="border-b border-border px-3 py-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
            request-flow/
          </p>
          <ul className="max-h-48 overflow-y-auto lg:max-h-[22rem]">
            {files.map((file) => (
              <li key={file.path}>
                <button
                  type="button"
                  onClick={() => setActivePath(file.path)}
                  aria-current={file.path === active.path ? "true" : undefined}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left font-mono text-[0.62rem] transition-colors",
                    file.path === active.path
                      ? "bg-accent/15 text-accent"
                      : "text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  <FileCode aria-hidden size={12} />
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-foreground">
                {active.name}
              </span>
              <span className="border border-border px-1.5 py-0.5 font-mono text-[0.54rem] uppercase tracking-[0.1em] text-faint">
                {active.language}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`${REPO_BASE}/${active.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-accent"
              >
                Open repository
                <ExternalLink aria-hidden size={11} />
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {copied ? (
                  <Check size={11} className="text-accent" />
                ) : (
                  <Copy size={11} />
                )}
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>
          </div>
          <pre className="max-h-[22rem] overflow-auto bg-[#0c0c0c] p-4 text-[0.74rem] leading-6 text-[#e8e4dc] sm:p-5">
            <code>{active.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
