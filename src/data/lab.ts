export type LabExperiment = {
  slug: string;
  title: string;
  category: string;
  description: string;
  instruction: string;
  tags: string[];
  code: string;
};

export const labExperiments: LabExperiment[] = [
  {
    slug: "request-flow",
    title: "Request Flow",
    category: "Systems simulation",
    description:
      "Send a request through gateway, auth, rate limiting, cache, and database — watch every stage, trace, retry, and failure in real time.",
    instruction:
      "Send a request, inject failures, and read the live trace beside the pipeline.",
    tags: ["Pipeline", "Trace", "Retries"],
    code: `// Coordinated scheduler — one timer chain per simulation run.
class RequestFlowSimulation {
  start(config) { /* schedule stages */ }
  cancel() { /* mark active stage cancelled */ }
}`,
  },
  {
    slug: "iron-field",
    title: "Iron Field",
    category: "Motion canvas",
    description:
      "A magnetic filing field that leans toward your pointer — quiet until you move, then the whole surface answers.",
    instruction: "Move a pointer, or tap and drag on touch. Press Enter for a centered pulse.",
    tags: ["Canvas", "Pointer", "Brand"],
    code: `// Interactive vector field — filings orient to the pointer.
// Near strokes lengthen and take the accent color; far strokes idle-drift.
<canvas aria-label="Iron Field" />`,
  },
  {
    slug: "cipher-deck",
    title: "Cipher Deck",
    category: "Typography",
    description:
      "Operating rules decrypt from noise into mono type. Type your own line and watch it resolve.",
    instruction: "Edit the message or pick a preset — glyphs scramble, then lock.",
    tags: ["Type", "State", "Mono"],
    code: `function scrambleToward(target, progress, salt) {
  return target.split("").map((char, i) => {
    if (char === " ") return " ";
    if (i / target.length < progress) return char;
    return GLYPHS[(char.charCodeAt(0) * 7 + salt + i) % GLYPHS.length];
  }).join("");
}`,
  },
  {
    slug: "signal-radar",
    title: "Signal Radar",
    category: "Ops UI",
    description:
      "A brass scope that sweeps shipping signals — deploy, review, latency, sync. Click a blip to read the contact.",
    instruction: "Select any labelled signal below the scope to inspect its ops readout.",
    tags: ["Canvas", "Radar", "Systems"],
    code: `// Sweep beam + polar blips for deploy / review / sync contacts.
// Click hit-testing maps pointer → nearest signal.`,
  },
];

export function getLabExperiment(slug: string) {
  return labExperiments.find((item) => item.slug === slug) ?? null;
}

export function getLabSlugs() {
  return labExperiments.map((item) => item.slug);
}
