"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export function ResumeActions() {
  return (
    <div className="no-print sticky top-0 z-50 border-b border-zinc-200 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft
            aria-hidden="true"
            size={15}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to site
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-zinc-700"
        >
          <Download aria-hidden="true" size={15} />
          Download PDF
        </button>
      </div>
    </div>
  );
}
