/** Auspira is a client product with no public screenshot, so its card keeps the role chips. */
export function AuspiraFace() {
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
