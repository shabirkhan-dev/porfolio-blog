import { Fragment } from "react";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const sequence = (
    <span className="inline-flex items-center">
      {items.map((item) => (
        <Fragment key={item}>
          <span className="px-7 font-display text-xl font-medium tracking-tight text-foreground/80 sm:text-2xl">
            {item}
          </span>
          <span aria-hidden="true" className="size-1 rounded-full bg-accent" />
        </Fragment>
      ))}
    </span>
  );

  // The track animates by -50%, so it must contain two identical halves. Each
  // half repeats the sequence enough times to always overflow the viewport,
  // which keeps the loop seamless (no gap) on wide screens.
  const half = (
    <span className="inline-flex items-center" aria-hidden={undefined}>
      {Array.from({ length: 2 }, (_, i) => (
        <Fragment key={i}>{sequence}</Fragment>
      ))}
    </span>
  );

  return (
    <div className={`marquee overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track">
        {half}
        {half}
      </div>
    </div>
  );
}
