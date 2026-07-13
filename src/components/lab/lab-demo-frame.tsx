"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type LabDemoFrameProps = {
  preview: React.ReactNode;
  code: string;
};

export function LabDemoFrame({ preview, code }: LabDemoFrameProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="overflow-hidden border border-border bg-background-2">
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2 sm:px-4">
        <div className="flex gap-1" role="tablist" aria-label="Demo view">
          {(
            [
              ["preview", "Preview"],
              ["code", "Code"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] transition-colors",
                tab === id
                  ? "bg-accent text-accent-foreground"
                  : "text-faint hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "code" ? (
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>

      {tab === "preview" ? (
        <div className="relative min-h-[16rem] bg-background p-6 sm:min-h-[18rem] sm:p-8">
          <div className="relative flex min-h-[12rem] items-center justify-center sm:min-h-[14rem]">
            {preview}
          </div>
        </div>
      ) : (
        <pre className="max-h-[28rem] overflow-auto bg-[#0c0c0c] p-5 text-[0.78rem] leading-6 text-[#e8e4dc] sm:p-6">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
