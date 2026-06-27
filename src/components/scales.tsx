import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Orientation = "horizontal" | "vertical" | "diagonal";

type ScalesProps = {
  color?: string;
  /** Gradient period in px. Keep at the default to stay in sync with the loop. */
  size?: number;
  orientation?: Orientation;
  className?: string;
};

const ANGLE: Record<Orientation, string> = {
  horizontal: "0deg",
  vertical: "90deg",
  diagonal: "45deg",
};

export function Scales({
  color = "rgb(var(--accent-rgb) / 0.5)",
  size = 20,
  orientation = "diagonal",
  className,
}: ScalesProps) {
  return (
    <div
      aria-hidden="true"
      data-orient={orientation}
      className={cn("scales-layer size-full", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(${ANGLE[orientation]}, ${color} 0, ${color} 1.5px, transparent 1.5px, transparent ${size}px)`,
      }}
    />
  );
}

/**
 * Frames its children with animated hatch bleeding from each edge, fading out
 * toward the corners — a decorative "scales" border around a focal card.
 */
export function ScalesFrame({
  children,
  className,
  orientation = "diagonal",
  color,
}: {
  children: ReactNode;
  className?: string;
  orientation?: Orientation;
  color?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute -inset-y-[28%] -left-9 w-9 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <Scales orientation={orientation} color={color} />
      </div>
      <div className="pointer-events-none absolute -inset-y-[28%] -right-9 w-9 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]">
        <Scales orientation={orientation} color={color} />
      </div>
      <div className="pointer-events-none absolute -inset-x-[28%] -top-9 h-9 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
        <Scales orientation={orientation} color={color} />
      </div>
      <div className="pointer-events-none absolute -inset-x-[28%] -bottom-9 h-9 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
        <Scales orientation={orientation} color={color} />
      </div>

      <div className="relative z-10 overflow-hidden rounded-2xl border border-border-strong bg-background-2">
        {children}
      </div>
    </div>
  );
}
