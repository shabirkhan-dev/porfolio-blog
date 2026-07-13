"use client";

import { LabDemoFrame } from "@/components/lab/lab-demo-frame";
import { labDemoMap } from "@/components/lab/lab-demos";
import type { LabExperiment } from "@/data/lab";

export function LabExperimentStage({
  experiment,
}: {
  experiment: LabExperiment;
}) {
  const Demo = labDemoMap[experiment.slug as keyof typeof labDemoMap];
  if (!Demo) {
    return (
      <p className="border border-border px-4 py-8 font-mono text-sm text-muted-foreground">
        This instrument could not load.
      </p>
    );
  }

  return (
    <LabDemoFrame
      flush={experiment.slug === "iron-field"}
      preview={<Demo />}
      code={experiment.code}
    />
  );
}
