export type LabExperiment = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  /** Shown in the code panel. */
  code: string;
};

export const labExperiments: LabExperiment[] = [
  {
    slug: "button-system",
    title: "Button system",
    category: "Primitives",
    description:
      "Primary, secondary, ghost, and subtle actions — the mono-labelled buttons used across the site.",
    tags: ["Button", "CVA", "A11y"],
    code: `import { Button } from "@/components/ui/button";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="subtle">Subtle</Button>
    </div>
  );
}`,
  },
  {
    slug: "magnetic-cta",
    title: "Magnetic CTA",
    category: "Motion",
    description:
      "Pointer-tracking spring pull on a call-to-action. Strength stays low so it feels alive, not gimmicky.",
    tags: ["Framer Motion", "Spring", "CTA"],
    code: `import { Magnetic } from "@/components/magnetic";
import { Button } from "@/components/ui/button";

export function Demo() {
  return (
    <Magnetic strength={0.28}>
      <Button variant="primary" size="lg">
        Pull toward the cursor
      </Button>
    </Magnetic>
  );
}`,
  },
  {
    slug: "count-up-metrics",
    title: "Count-up metrics",
    category: "Motion",
    description:
      "Scroll-triggered numeric proof lines — same pattern as hero proof, with reduced-motion respect.",
    tags: ["CountUp", "InView", "Metrics"],
    code: `import { CountUp } from "@/components/count-up";

export function Demo() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {[
        { value: "100k+", label: "users served" },
        { value: "50%", label: "lighter payloads" },
        { value: "35%", label: "faster loads" },
      ].map((item) => (
        <div key={item.label}>
          <p className="font-display text-3xl font-semibold text-accent">
            <CountUp value={item.value} />
          </p>
          <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}`,
  },
  {
    slug: "action-swap",
    title: "Action swap",
    category: "Interaction",
    description:
      "One control, cycling labels with blur/roll animation — useful for mode toggles without layout jump.",
    tags: ["ActionSwap", "State", "Motion"],
    code: `"use client";
import { ActionSwapButton } from "@/components/motion/action-swap";

export function Demo() {
  return (
    <ActionSwapButton
      variant="outline"
      animation="roll"
      items={[
        { id: "idle", label: "Save draft" },
        { id: "busy", label: "Saving…" },
        { id: "done", label: "Saved" },
      ]}
    />
  );
}`,
  },
  {
    slug: "failure-states",
    title: "Failure state kit",
    category: "Product UI",
    description:
      "Loading, empty, and error surfaces as first-class UI — the patterns behind the writing on failure states.",
    tags: ["States", "UX", "Trust"],
    code: `export function EmptyState() {
  return (
    <div className="border border-dashed border-border px-5 py-8 text-center">
      <p className="font-display text-lg font-semibold">Nothing here yet</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Create the first record to unlock this view.
      </p>
      <button className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
        Add record
      </button>
    </div>
  );
}`,
  },
  {
    slug: "field-states",
    title: "Field states",
    category: "Forms",
    description:
      "A single input with idle, focus, error, and success — validation copy that earns trust.",
    tags: ["Forms", "Validation", "A11y"],
    code: `export function Field({ state }: { state: "idle" | "error" | "success" }) {
  return (
    <label className="block max-w-sm">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-faint">
        Work email
      </span>
      <input
        className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm outline-none focus:border-accent/50"
        defaultValue={state === "error" ? "not-an-email" : "you@studio.com"}
        aria-invalid={state === "error"}
      />
      {state === "error" ? (
        <p className="mt-2 text-sm text-red-400">Enter a valid email.</p>
      ) : null}
      {state === "success" ? (
        <p className="mt-2 text-sm text-accent">Looks good.</p>
      ) : null}
    </label>
  );
}`,
  },
];

export function getLabExperiment(slug: string) {
  return labExperiments.find((item) => item.slug === slug) ?? null;
}

export function getLabSlugs() {
  return labExperiments.map((item) => item.slug);
}
