"use client";

import { useEffect, useRef } from "react";

/**
 * ASCII depth field.
 *
 * Renders a grid of monospace glyphs on a canvas whose "density" follows a
 * radial depth map modulated by slow-moving noise — the mood-board's
 * ASCII/depth-map signature, generated procedurally instead of from an image.
 * Glyphs near the density peak pick up the accent color; the rest stay faint.
 * Pauses off-screen and renders a single static frame for reduced motion.
 */
const RAMP = " .:-=+*#%@";

export function AsciiField({
  className,
  cell = 14,
  intensity = 1,
}: {
  className?: string;
  /** Grid cell size in px — smaller is denser. */
  cell?: number;
  /** 0..1 multiplier on overall opacity. */
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const accent =
        styles.getPropertyValue("--accent-rgb").trim() || "214 168 70";
      const stroke =
        styles.getPropertyValue("--stroke-rgb").trim() || "235 238 240";
      return { accent, stroke };
    };
    let colors = readColors();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${Math.round(cell * 0.85)}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    const frame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const cx = 0.5 + Math.sin(t * 0.35) * 0.12;
      const cy = 0.44 + Math.cos(t * 0.28) * 0.1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) / cols;
          const y = (r + 0.5) / rows;

          // Radial depth + two slow sine waves = drifting depth map.
          const dx = x - cx;
          const dy = y - cy;
          const radial = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 1.9);
          const wave =
            Math.sin(x * 7 + t) * 0.5 + Math.cos(y * 6 - t * 0.7) * 0.5;
          let d = radial * 0.78 + (wave * 0.5 + 0.5) * 0.34;
          d = Math.min(1, Math.max(0, d));

          const idx = Math.floor(d * (RAMP.length - 1));
          if (idx === 0) continue;

          const isHot = d > 0.82;
          const alpha = (0.1 + d * 0.55) * intensity;
          ctx.fillStyle = isHot
            ? `rgb(${colors.accent} / ${Math.min(0.9, alpha + 0.25)})`
            : `rgb(${colors.stroke} / ${alpha * 0.55})`;
          ctx.fillText(RAMP[idx], c * cell + cell / 2, r * cell + cell / 2);
        }
      }

      if (!reduceMotion) {
        t = time * 0.0004;
        raf = requestAnimationFrame(frame);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onResize = () => {
      build();
      if (reduceMotion) frame(0);
    };

    build();
    start();

    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduceMotion) frame(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      io.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [cell, intensity]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
