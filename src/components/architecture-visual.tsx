import {
  Code2,
  Database,
  GitBranch,
  LockKeyhole,
  Rocket,
  Smartphone,
} from "lucide-react";

const nodes = [
  { label: "Next.js", detail: "web", icon: Code2 },
  { label: "Node.js", detail: "APIs", icon: GitBranch },
  { label: "React Native", detail: "mobile", icon: Smartphone },
  { label: "PostgreSQL", detail: "data", icon: Database },
  { label: "CodeQL", detail: "security", icon: LockKeyhole },
  { label: "Vercel", detail: "deploy", icon: Rocket },
];

export function ArchitectureVisual() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-rose-500" />
      <div className="rounded-md border border-border bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-primary">
              Production system
            </p>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              Secure architecture from product idea to deployment.
            </h2>
          </div>
          <div className="grid size-12 place-items-center rounded-md bg-foreground text-background">
            SK
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {nodes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.label}
                className="rounded-md border border-border bg-card p-3"
              >
                <Icon aria-hidden="true" size={18} className="text-primary" />
                <p className="mt-3 text-sm font-semibold">{node.label}</p>
                <p className="text-xs text-muted-foreground">{node.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-md bg-foreground p-4 text-background">
          <div className="flex items-center justify-between gap-3 text-xs text-background/70">
            <span>pipeline</span>
            <span>CodeQL + Dependabot + secrets</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/20">
            <div className="h-full w-[88%] rounded-full bg-emerald-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
