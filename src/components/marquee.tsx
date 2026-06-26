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

  return (
    <div className={`marquee overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track">
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
