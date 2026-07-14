import fs from "fs/promises";
import path from "path";
import type { SourceFileEntry } from "@/components/lab/experiments/request-flow/request-flow.types";

const SOURCE_FILES = [
  "request-flow.tsx",
  "simulation-engine.ts",
  "request-node.tsx",
  "trace-panel.tsx",
  "request-flow-controls.tsx",
  "request-flow.types.ts",
  "simulation-engine.test.ts",
] as const;

const LANGUAGE_MAP: Record<string, string> = {
  tsx: "TypeScript",
  ts: "TypeScript",
};

function languageFor(name: string): string {
  const ext = name.split(".").pop() ?? "ts";
  return LANGUAGE_MAP[ext] ?? "TypeScript";
}

export async function getRequestFlowSourceFiles(): Promise<SourceFileEntry[]> {
  const dir = path.join(
    process.cwd(),
    "src/components/lab/experiments/request-flow",
  );

  const entries: SourceFileEntry[] = [];

  for (const name of SOURCE_FILES) {
    try {
      const filePath = path.join(dir, name);
      const content = await fs.readFile(filePath, "utf8");
      entries.push({
        path: `request-flow/${name}`,
        name,
        language: languageFor(name),
        content,
      });
    } catch {
      /* skip missing files */
    }
  }

  return entries;
}
