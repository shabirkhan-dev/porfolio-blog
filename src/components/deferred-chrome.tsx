"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const Cursor = dynamic(
  () => import("@/components/cursor").then((m) => ({ default: m.Cursor })),
  { ssr: false },
);

const ScrollProgress = dynamic(
  () =>
    import("@/components/scroll-progress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false },
);

function subscribeNoop() {
  return () => {};
}

function getFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function DeferredChrome() {
  const showCursor = useSyncExternalStore(
    subscribeNoop,
    getFinePointer,
    () => false,
  );

  return (
    <>
      <ScrollProgress />
      {showCursor ? <Cursor /> : null}
    </>
  );
}
