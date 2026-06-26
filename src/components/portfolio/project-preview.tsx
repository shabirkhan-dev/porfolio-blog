import { CheckCircle2, GitBranch, LockKeyhole, Signal, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectPreviewProps = {
  visual: string;
  title: string;
};

export function ProjectPreview({ visual, title }: ProjectPreviewProps) {
  if (visual === "security") {
    return (
      <div className="relative h-full min-h-72 overflow-hidden bg-[#0c0c0b] p-5 text-white">
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
          <span>policy graph</span>
          <span className="text-accent">active</span>
        </div>
        <div className="relative mt-8 grid grid-cols-3 gap-3">
          {["Scan", "Review", "Enforce"].map((item, index) => (
            <div
              key={item}
              className={cn(
                "rounded-xl border border-white/10 bg-white/[0.04] p-3",
                index === 1 && "translate-y-5",
              )}
            >
              <LockKeyhole aria-hidden="true" size={16} className="text-accent" />
              <p className="mt-4 text-sm font-medium">{item}</p>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-accent" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/55">
            <span>security gate</span>
            <CheckCircle2 aria-hidden="true" size={15} className="text-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (visual === "dashboard") {
    return (
      <div className="relative h-full min-h-72 overflow-hidden bg-[#111110] p-5 text-white">
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
              attendance signal
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-accent">
              94.8%
            </p>
          </div>
          <Signal aria-hidden="true" size={24} className="text-accent" />
        </div>
        <div className="relative mt-4 grid grid-cols-[1fr_0.7fr] gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="space-y-2.5">
              {[72, 90, 54, 82].map((width) => (
                <div key={width} className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent/80"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <Sparkles aria-hidden="true" size={18} className="text-accent" />
            <p className="mt-6 text-sm font-medium">AI insight</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-72 overflow-hidden bg-[#0c0c0b] p-5 text-white">
      <div className="absolute inset-0 grid-on-dark opacity-40" />
      <div className="relative flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-white/45">
        <span>{title}</span>
        <GitBranch aria-hidden="true" size={16} className="text-accent" />
      </div>
      <div className="relative mt-6 grid gap-3">
        {["apps/web", "services/api", "packages/config", "security/workflows"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
            >
              <span className="font-mono text-sm">{item}</span>
              <span className="font-mono text-xs text-white/40">
                {index + 1} checks
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
