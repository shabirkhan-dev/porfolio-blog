"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Set to 0 to disable the 3D effect. */
  tilt?: number;
};

/**
 * A card that tracks the cursor: a soft accent spotlight follows the pointer
 * and the surface tilts subtly in 3D. Pure CSS variables + transforms, so it
 * stays cheap and is disabled automatically for coarse pointers.
 */
export function SpotlightCard({
  children,
  className,
  tilt = 6,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);

    if (tilt > 0) {
      const rx = (0.5 - py) * tilt;
      const ry = (px - 0.5) * tilt;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    }
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-spotlight
      className={cn(
        "group/spot relative transition-transform duration-300 ease-out [transform:perspective(900px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))] [transform-style:preserve-3d]",
        className,
      )}
    >
      {/* Cursor-following glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgb(var(--accent-rgb) / 0.14), transparent 70%)",
        }}
      />
      {/* Accent edge highlight on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), transparent, transparent 60%, rgb(var(--accent-rgb) / 0.08))",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 [transform:translateZ(20px)]">{children}</div>
    </div>
  );
}
