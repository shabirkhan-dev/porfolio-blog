"use client";

import { useEffect, useRef, useState } from "react";

type Blip = {
  id: string;
  angle: number;
  radius: number;
  label: string;
  detail: string;
};

const BLIPS: Blip[] = [
  {
    id: "deploy",
    angle: 0.4,
    radius: 0.62,
    label: "Deploy",
    detail: "main → production · gates green",
  },
  {
    id: "review",
    angle: 1.9,
    radius: 0.38,
    label: "Review",
    detail: "PR #248 · architecture check",
  },
  {
    id: "alert",
    angle: 3.5,
    radius: 0.78,
    label: "Signal",
    detail: "p95 latency back under budget",
  },
  {
    id: "sync",
    angle: 5.1,
    radius: 0.5,
    label: "Sync",
    detail: "tenant cache warm · 3 regions",
  },
];

/**
 * Signal Radar — sweeping brass beam with clickable ops blips.
 */
export function SignalRadar({
  compact = false,
}: {
  compact?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<Blip | null>(BLIPS[0]);
  const sweepRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const readAccent = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-rgb")
        .trim() || "214 168 70";

    let accent = readAccent();
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!visible && !reduceMotion) {
        raf = requestAnimationFrame(draw);
        return;
      }

      if (!reduceMotion) sweepRef.current += 0.018;
      const sweep = sweepRef.current;
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.42;

      ctx.clearRect(0, 0, width, height);

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR * i) / 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgb(${accent} / ${0.08 + i * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.strokeStyle = `rgb(${accent} / 0.12)`;
      ctx.stroke();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, `rgb(${accent} / 0.18)`);
      grad.addColorStop(1, `rgb(${accent} / 0)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweep - 0.55, sweep);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
      ctx.strokeStyle = `rgb(${accent} / 0.85)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (const blip of BLIPS) {
        const x = cx + Math.cos(blip.angle) * maxR * blip.radius;
        const y = cy + Math.sin(blip.angle) * maxR * blip.radius;
        const lit =
          Math.abs(
            ((sweep % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - blip.angle,
          ) < 0.35 || active?.id === blip.id;

        ctx.beginPath();
        ctx.arc(x, y, lit ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${accent} / ${lit ? 0.95 : 0.35})`;
        ctx.fill();

        if (lit) {
          ctx.beginPath();
          ctx.arc(x, y, 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgb(${accent} / 0.25)`;
          ctx.stroke();
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const onClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.42;

      let hit: Blip | null = null;
      for (const blip of BLIPS) {
        const x = cx + Math.cos(blip.angle) * maxR * blip.radius;
        const y = cy + Math.sin(blip.angle) * maxR * blip.radius;
        if (Math.hypot(mx - x, my - y) < 16) hit = blip;
      }
      if (hit) setActive(hit);
    };

    canvas.addEventListener("click", onClick);
    const ro = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("click", onClick);
      ro.disconnect();
      io.disconnect();
    };
  }, [active?.id]);

  return (
    <div className={compact ? "w-full" : "grid w-full gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"}>
      <canvas
        ref={canvasRef}
        className={
          compact
            ? "aspect-square w-full max-w-[16rem] mx-auto touch-none"
            : "aspect-square w-full max-w-md mx-auto touch-none cursor-crosshair"
        }
        aria-label="Operations signal radar"
      />
      {!compact && active ? (
        <div className="border border-border bg-background-2 px-5 py-5">
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-accent">
            Contact · {active.id}
          </p>
          <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
            {active.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {active.detail}
          </p>
          <p className="mt-5 font-mono text-[0.54rem] uppercase tracking-[0.14em] text-faint">
            Click a blip on the scope
          </p>
        </div>
      ) : null}
      {compact ? (
        <p className="mt-2 text-center font-mono text-[0.54rem] uppercase tracking-[0.14em] text-faint">
          Sweep live · click blips in full view
        </p>
      ) : null}
    </div>
  );
}
