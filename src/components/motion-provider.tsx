"use client";

/**
 * Passthrough provider — framer-motion stays off the initial route bundle.
 * Components that still need motion import it locally and lazily.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
