import {
  CheckCircle2,
  ClipboardList,
  GitBranch,
  LockKeyhole,
  Signal,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectPreviewProps = {
  visual: string;
  title: string;
  compact?: boolean;
};

export function ProjectPreview({
  visual,
  title,
  compact = false,
}: ProjectPreviewProps) {
  const shell = cn(
    "code-surface relative h-full overflow-hidden",
    compact ? "min-h-[12.5rem] p-4" : "min-h-[15rem] p-5 sm:min-h-[17rem]",
  );

  if (visual === "marketplace") {
    return (
      <div className={shell}>
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
          <span>inventory sync</span>
          <span className="code-accent">live</span>
        </div>
        <div className="relative mt-4 grid grid-cols-2 gap-2.5">
          {["Listings", "Dealers", "Mobile", "Ops"].map((item, index) => (
            <div
              key={item}
              className={cn(
                "rounded-md border border-white/10 bg-white/[0.04] p-2.5",
                index % 2 === 1 && "translate-y-2",
              )}
            >
              <Truck aria-hidden="true" size={14} className="code-accent" />
              <p className="mt-2 text-xs font-medium text-white/90">{item}</p>
              <div className="mt-2 h-1 rounded-full bg-white/10">
                <div
                  className="code-accent h-full rounded-full bg-current opacity-80"
                  style={{ width: `${60 + index * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
          <div className="flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
            <span>websocket · redis</span>
            <CheckCircle2 aria-hidden="true" size={13} className="code-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (visual === "security") {
    return (
      <div className={shell}>
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
          <span>policy graph</span>
          <span className="code-accent">active</span>
        </div>
        <div className="relative mt-6 grid grid-cols-3 gap-2.5">
          {["Scan", "Review", "Enforce"].map((item, index) => (
            <div
              key={item}
              className={cn(
                "rounded-md border border-white/10 bg-white/[0.04] p-2.5",
                index === 1 && "translate-y-3",
              )}
            >
              <LockKeyhole aria-hidden="true" size={14} className="code-accent" />
              <p className="mt-3 text-xs font-medium text-white/90">{item}</p>
              <div className="mt-2.5 h-1 rounded-full bg-white/10">
                <div className="code-accent h-full w-2/3 rounded-full bg-current opacity-80" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
          <div className="flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
            <span>security gate</span>
            <CheckCircle2 aria-hidden="true" size={13} className="code-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (visual === "dashboard") {
    return (
      <div className={shell}>
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] p-3">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/45">
              attendance signal
            </p>
            <p className="code-accent mt-1 font-display text-2xl font-semibold sm:text-3xl">
              94.8%
            </p>
          </div>
          <Signal aria-hidden="true" size={20} className="code-accent" />
        </div>
        <div className="relative mt-3 grid grid-cols-[1fr_0.75fr] gap-2.5">
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
            <div className="space-y-2">
              {[72, 90, 54, 82].map((width) => (
                <div key={width} className="h-1.5 rounded-full bg-white/10">
                  <div
                    className="code-accent h-full rounded-full bg-current opacity-80"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
            <Sparkles aria-hidden="true" size={15} className="code-accent" />
            <p className="mt-4 text-xs font-medium text-white/90">AI insight</p>
            <p className="mt-1 font-mono text-[0.58rem] text-white/40">
              low attendance · grade 8
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "workforce") {
    return (
      <div className={shell}>
        <div className="absolute inset-0 grid-on-dark opacity-40" />
        <div className="relative flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
          <span>workforce board</span>
          <span className="code-accent">100k+</span>
        </div>
        <div className="relative mt-4 grid gap-2.5">
          {[
            { label: "Approvals queue", value: "128" },
            { label: "Active shifts", value: "2.4k" },
            { label: "Attendance today", value: "96%" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-xs text-white/80">
                <ClipboardList aria-hidden size={13} className="code-accent" />
                {row.label}
              </span>
              <span className="font-mono text-xs text-white/55">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/55">
          <Users aria-hidden size={13} className="code-accent" />
          teams · leave · payroll hooks
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="absolute inset-0 grid-on-dark opacity-40" />
      <div className="relative flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/45">
        <span>{title}</span>
        <GitBranch aria-hidden="true" size={14} className="code-accent" />
      </div>
      <div className="relative mt-4 grid gap-2">
        {["apps/web", "services/api", "packages/config", "security/workflows"].map(
          (item, index) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2"
            >
              <span className="font-mono text-xs text-white/85">{item}</span>
              <span className="font-mono text-[0.58rem] text-white/40">
                {index + 1} checks
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
