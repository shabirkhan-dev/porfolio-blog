"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(
  () =>
    import("@/components/scroll-progress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false },
);

export function DeferredChrome() {
  return <ScrollProgress />;
}
