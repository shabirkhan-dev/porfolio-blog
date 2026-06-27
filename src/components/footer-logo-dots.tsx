"use client";

import dynamic from "next/dynamic";

const LogoDots = dynamic(
  () => import("@/components/logo-dots").then((m) => ({ default: m.LogoDots })),
  { ssr: false },
);

export function FooterLogoDots({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <LogoDots text={text} className={className} />;
}
