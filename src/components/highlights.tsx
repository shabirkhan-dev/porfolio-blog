import { highlights, type Highlight } from "@/data/profile";
import { SectionTitle } from "@/components/page-column";

const mono = "font-mono text-[7px] leading-[11px] tracking-[0.18em] text-faint";

function GridFace() {
  return (
    <div className="flex h-[146px] w-[210px] flex-col overflow-hidden rounded-[10px] border border-line bg-inset md:h-[178px] md:w-[240px]">
      <div className="flex h-[31px] shrink-0 items-start justify-between border-b border-line px-[13px] pt-[11px]">
        <span className={mono}>GRID / BOARD</span>
        <span className="mt-0.5 size-[5px] rounded-full bg-foreground" />
      </div>
      <div className="flex flex-1">
        <div className="flex w-[43px] shrink-0 flex-col gap-[9px] border-r border-line px-[9px] pt-[13px]">
          <span className="h-[3px] w-6 rounded-[2px] bg-line" />
          <span className="h-[3px] w-[18px] rounded-[2px] bg-line" />
          <span className="h-[3px] w-[18px] rounded-[2px] bg-line" />
          <span className="h-[3px] w-[18px] rounded-[2px] bg-line" />
        </div>
        <div className="flex flex-1 gap-1 px-[11px] pt-[11px] pb-3">
          {[3, 2, 1].map((cards, column) => (
            <div key={column} className="flex flex-1 flex-col gap-1 rounded-[4px] bg-raised p-1">
              {Array.from({ length: cards }, (_, i) => (
                <span
                  key={i}
                  className={`h-4 rounded-[3px] ${column === 1 && i === 0 ? "bg-foreground/85" : "bg-chip"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuspiraFace() {
  return (
    <div className="flex w-[216px] gap-1.5 rounded-[14px] border border-line bg-inset px-[5px] py-[7px] md:w-[246px]">
      {["EW", "CE", "PM", "DN"].map((role) => (
        <span
          key={role}
          className="grid h-9 flex-1 place-items-center rounded-[9px] border border-line bg-raised font-mono text-[8px] leading-3 tracking-[0.18em] text-muted"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

function StarterFace() {
  return (
    <>
      <span className="absolute inset-y-[35px] left-1/2 w-px bg-line" />
      <div className="relative flex flex-col items-center gap-[9px] text-center">
        <span className={mono}>STARTER / 01</span>
        <p className="text-[22px] leading-[25px] font-medium tracking-[-0.05em] text-foreground md:text-[28px] md:leading-7">
          Day one,
          <br />
          already set up.
        </p>
      </div>
    </>
  );
}

function SchoolFace() {
  return (
    <div className="absolute top-[47px] left-[147px] h-[110px] w-[150px] -rotate-8 rounded-[12px] border border-line bg-inset p-[13px] md:top-[45px] md:left-[177px]">
      <span className={mono}>ATTENDANCE</span>
      <div className="mt-[21px] flex flex-col gap-2.5">
        <span className="h-0.5 w-[90px] bg-line" />
        <span className="h-0.5 w-[74px] bg-line" />
        <span className="h-0.5 w-[58px] bg-line" />
      </div>
    </div>
  );
}

const faces: Record<Highlight["id"], () => React.ReactNode> = {
  grid: GridFace,
  auspira: AuspiraFace,
  starter: StarterFace,
  "school-os": SchoolFace,
};

function HighlightCard({ highlight }: { highlight: Highlight }) {
  const Face = faces[highlight.id];
  const body = (
    <>
      <div className="relative grid h-[220px] w-[260px] place-items-center overflow-hidden rounded-2xl bg-surface md:h-[252px] md:w-[290px]">
        <Face />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="text-sm leading-5 font-medium tracking-[-0.0064em] text-foreground">
            {highlight.name}
          </p>
          <p className="text-xs leading-4 tracking-[-0.0064em] text-muted">{highlight.label}</p>
        </div>
        <p className="font-mono text-[9px] leading-[14px] text-muted">{highlight.year}</p>
      </div>
    </>
  );

  const className = "flex shrink-0 snap-start flex-col gap-3";
  return highlight.href ? (
    <a href={highlight.href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function Highlights() {
  return (
    <section className="flex flex-col gap-6" aria-labelledby="highlights">
      <SectionTitle>
        <span id="highlights">Highlights</span>
      </SectionTitle>
      {/* The row runs past the column to the right edge of the screen, as in the design. */}
      <div className="-mr-5 flex snap-x snap-mandatory scroll-px-0 gap-2.5 overflow-x-auto pr-5 [scrollbar-width:none] md:mr-[calc(275px-50vw)] md:pr-6 [&::-webkit-scrollbar]:hidden">
        {highlights.map((h) => (
          <HighlightCard key={h.id} highlight={h} />
        ))}
      </div>
    </section>
  );
}
