import { cn } from "@/lib/utils";

const positions = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
];

/**
 * Crosshair registration marks pinned to the four corners of a relatively
 * positioned parent — the technical/X-ray framing motif used on cards and
 * feature blocks. Parent should have `relative` (and usually no overflow clip
 * on the marks' edges — they sit exactly on the border).
 */
export function Corners({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {positions.map((pos) => (
        <span key={pos} className={cn("absolute size-2", pos)}>
          <span
            className={cn(
              "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-faint/60",
              markClassName,
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-faint/60",
              markClassName,
            )}
          />
        </span>
      ))}
    </span>
  );
}
