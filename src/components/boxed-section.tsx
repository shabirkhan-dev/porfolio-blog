import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type NodeCorner = "tl" | "tr" | "bl" | "br";

const nodePositions: Record<NodeCorner, string> = {
  tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
};

/** Small square registration mark at frame intersections. */
export function FrameNode({
  corner,
  className,
}: {
  corner: NodeCorner;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "frame-node pointer-events-none absolute z-20",
        nodePositions[corner],
        className,
      )}
    />
  );
}

type FrameNodesProps = {
  top?: boolean;
  bottom?: boolean;
  className?: string;
};

export function FrameNodes({
  top = true,
  bottom = false,
  className,
}: FrameNodesProps) {
  return (
    <>
      {top ? (
        <>
          <FrameNode corner="tl" className={className} />
          <FrameNode corner="tr" className={className} />
        </>
      ) : null}
      {bottom ? (
        <>
          <FrameNode corner="bl" className={className} />
          <FrameNode corner="br" className={className} />
        </>
      ) : null}
    </>
  );
}

type BoxedSectionProps = {
  id?: string;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  innerClassName?: string;
  /** Muted panel background on the outer section. */
  tone?: "default" | "muted";
  /** Horizontal rule above the section. */
  dividerTop?: boolean;
  /** Close the frame with a bottom rule + corner nodes. */
  closed?: boolean;
  /** Draw left/right rails and corner nodes. Disable for full-bleed sections. */
  rails?: boolean;
  /** Apply standard section vertical rhythm inside the frame. */
  pad?: boolean | "compact" | "none";
  /** Decorative layer rendered behind content, still inside the frame. */
  overlay?: ReactNode;
};

/**
 * Editorial boxed section — left/right rails sit on the shell edge,
 * content is centered with `--frame-inset` breathing room from the rails.
 */
export function BoxedSection({
  id,
  as: Component = "section",
  children,
  className,
  frameClassName,
  innerClassName,
  tone = "default",
  dividerTop = true,
  closed = false,
  rails = true,
  pad = true,
  overlay,
}: BoxedSectionProps) {
  const paddingClass =
    pad === true
      ? "section-y"
      : pad === "compact"
        ? "section-y"
        : "";

  return (
    <Component
      id={id}
      className={cn(
        "relative",
        dividerTop && "border-t border-border",
        closed && "border-b border-border",
        tone === "muted" && "bg-background-2",
        className,
      )}
    >
      {overlay}
      {rails ? (
        <div className="shell">
          <div
            className={cn(
              "boxed-frame relative border-x border-border",
              frameClassName,
            )}
            data-tone={tone === "muted" ? "muted" : undefined}
          >
            <FrameNodes top={dividerTop} bottom={closed} />
            <div
              className={cn(
                "frame-content relative mx-auto w-full",
                paddingClass,
                innerClassName,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

type BoxedStripProps = {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  dividerTop?: boolean;
  dividerBottom?: boolean;
  closed?: boolean;
};

/** Compact framed strip — core stack, filters, meta bars. */
export function BoxedStrip({
  children,
  className,
  frameClassName,
  dividerTop = true,
  dividerBottom = false,
  closed = false,
}: BoxedStripProps) {
  return (
    <div
      className={cn(
        dividerTop && "border-t border-border",
        (dividerBottom || closed) && "border-b border-border",
        className,
      )}
    >
      <div className="shell">
        <div
          className={cn(
            "boxed-frame relative border-x border-border",
            frameClassName,
          )}
        >
          <FrameNodes top={dividerTop} bottom={closed || dividerBottom} />
          <div className="frame-content relative mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type BoxedPageProps = {
  children: ReactNode;
  className?: string;
};

/** Marks pages that participate in the boxed ruler system. */
export function BoxedPage({ children, className }: BoxedPageProps) {
  return <div className={cn("boxed-page", className)}>{children}</div>;
}
