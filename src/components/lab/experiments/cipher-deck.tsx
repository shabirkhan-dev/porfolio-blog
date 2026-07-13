"use client";

import { useEffect, useMemo, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*+=<>/";

function scrambleToward(target: string, progress: number, salt: number) {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i / Math.max(target.length, 1) < progress) return char;
      const idx = (char.charCodeAt(0) * 7 + salt * 13 + i * 3) % GLYPHS.length;
      return GLYPHS[Math.abs(idx)];
    })
    .join("");
}

/**
 * Cipher Deck — phrases resolve from noise. Type a message; watch it decrypt.
 */
export function CipherDeck({
  compact = false,
}: {
  compact?: boolean;
}) {
  const presets = useMemo(
    () => [
      "SHIP THE THINNEST SLICE",
      "CONTRACTS BEFORE COMPONENTS",
      "FAILURE STATES ARE PRODUCT",
      "MAKE SHIPPING BORING",
    ],
    [],
  );

  const [phrase, setPhrase] = useState(presets[0]);
  const [progress, setProgress] = useState(0);
  const [salt, setSalt] = useState(1);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    setProgress(0);
    setSalt((s) => s + 1);
    let frame = 0;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      frame += 1;
      if (frame % 3 === 0) setSalt((s) => s + 1);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phrase, running]);

  const display = scrambleToward(phrase.toUpperCase(), progress, salt);
  const resolved = progress >= 0.999;

  return (
    <div className={compact ? "w-full" : "w-full max-w-xl"}>
      <div className="border border-border bg-background px-4 py-6 sm:px-6 sm:py-8">
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-accent">
          Cipher deck · {resolved ? "resolved" : "decrypting"}
        </p>
        <p
          className="mt-4 min-h-[3.5rem] font-mono text-[clamp(1rem,0.85rem+0.8vw,1.35rem)] font-medium leading-relaxed tracking-[0.08em] text-foreground break-words"
          aria-live="polite"
        >
          {display}
        </p>
        <div className="mt-5 h-px w-full overflow-hidden bg-border">
          <span
            className="block h-full origin-left bg-accent transition-transform duration-75"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      {!compact ? (
        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
              Your message
            </span>
            <input
              value={phrase}
              onChange={(event) => {
                setRunning(true);
                setPhrase(event.target.value.slice(0, 42) || " ");
              }}
              className="mt-2 h-11 w-full border border-border bg-background px-3 font-mono text-sm uppercase tracking-[0.06em] outline-none focus:border-accent/50"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setRunning(true);
                  setPhrase(item);
                }}
                className="border border-border px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.12em] text-faint transition-colors hover:border-accent/40 hover:text-accent"
              >
                {item.slice(0, 18)}
                {item.length > 18 ? "…" : ""}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                window.requestAnimationFrame(() => setRunning(true));
              }}
              className="border border-accent/40 bg-accent/[0.08] px-2.5 py-1 font-mono text-[0.54rem] uppercase tracking-[0.12em] text-accent"
            >
              Replay
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            const next =
              presets[(presets.indexOf(phrase) + 1) % presets.length] ??
              presets[0];
            setRunning(true);
            setPhrase(next);
          }}
          className="mt-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-accent"
        >
          Next signal
        </button>
      )}
    </div>
  );
}
