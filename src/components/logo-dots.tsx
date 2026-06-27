"use client";

import { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

type LogoDotsProps = {
  /** Word rendered as a dot matrix. */
  text?: string;
  className?: string;
  /** Distance between dot centers, in CSS px. */
  gap?: number;
  /** Dot radius, in CSS px. */
  dotRadius?: number;
};

function parseRgb(value: string, fallback: RGB): RGB {
  const parts = value.trim().split(/\s+/).map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return fallback;
  return { r: parts[0], g: parts[1], b: parts[2] };
}

export function LogoDots({
  text = "shabir",
  className,
  gap = 8,
  dotRadius = 1.5,
}: LogoDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let cancelled = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: { x: number; y: number }[] = [];

    const fallbackBase: RGB = { r: 245, g: 240, b: 230 };
    const fallbackAccent: RGB = { r: 233, g: 176, b: 105 };
    let base = fallbackBase;
    let accent = fallbackAccent;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      base = parseRgb(styles.getPropertyValue("--stroke-rgb"), fallbackBase);
      accent = parseRgb(styles.getPropertyValue("--accent-rgb"), fallbackAccent);
    };

    const getFontFamily = () => {
      const probe = document.createElement("span");
      probe.className = "font-display";
      probe.style.cssText = "position:absolute;visibility:hidden;left:-9999px";
      document.body.appendChild(probe);
      const family =
        getComputedStyle(probe).fontFamily || "system-ui, sans-serif";
      probe.remove();
      return family;
    };

    const buildDots = () => {
      dots = [];
      if (width < 4 || height < 4) return;

      const off = document.createElement("canvas");
      off.width = Math.floor(width * dpr);
      off.height = Math.floor(height * dpr);
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.scale(dpr, dpr);

      const family = getFontFamily();
      octx.font = `800 100px ${family}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      const metrics = octx.measureText(text);
      const refWidth = metrics.width || 1;
      const refHeight =
        (metrics.actualBoundingBoxAscent || 0) +
          (metrics.actualBoundingBoxDescent || 0) || 72;

      const sizeByWidth = ((width * 0.94) / refWidth) * 100;
      const sizeByHeight = ((height * 0.86) / refHeight) * 100;
      const fontSize = Math.max(8, Math.min(sizeByWidth, sizeByHeight));

      octx.font = `800 ${fontSize}px ${family}`;
      octx.fillStyle = "#fff";
      octx.fillText(text, width / 2, height / 2);

      const data = octx.getImageData(0, 0, off.width, off.height).data;

      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const mx = Math.floor(x * dpr);
          const my = Math.floor(y * dpr);
          const alpha = data[(my * off.width + mx) * 4 + 3];
          if (alpha > 128) dots.push({ x, y });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${base.r},${base.g},${base.b},0.55)`;
        ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (t: number) => {
      if (cancelled) return;
      const time = t * 0.001;
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        // Diagonal travelling wave, Vercel-style shimmer.
        const wave =
          Math.sin(d.x * 0.018 + d.y * 0.01 - time * 1.7) * 0.5 + 0.5;
        const intensity = wave * wave;
        const r = base.r + (accent.r - base.r) * intensity;
        const g = base.g + (accent.g - base.g) * intensity;
        const b = base.b + (accent.b - base.b) * intensity;
        const alpha = 0.18 + intensity * 0.82;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`;
        ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      if (reduceMotion) drawStatic();
    };

    const start = () => {
      readColors();
      resize();
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    // Wait for the brand font so the matrix matches the wordmark.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) start();
    });

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) drawStatic();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [text, gap, dotRadius]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
