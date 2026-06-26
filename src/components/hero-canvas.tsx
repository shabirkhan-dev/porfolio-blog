"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive vector field.
 *
 * A grid of short strokes that orient toward the pointer like iron filings
 * around a magnet. Strokes near the cursor grow longer and pick up the accent
 * color; far strokes settle back to a calm idle drift. Rendered on a single
 * 2D canvas with devicePixelRatio scaling, paused when off-screen, and
 * disabled entirely for users who prefer reduced motion.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const accentRgb = styles.getPropertyValue("--accent-rgb").trim() || "233 176 105";
      const strokeRgb = styles.getPropertyValue("--stroke-rgb").trim() || "245 240 230";
      return {
        accent: `rgba(${accentRgb},`,
        base: `rgba(${strokeRgb},`,
      };
    };

    let colors = readColors();

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 38;

    type Node = { x: number; y: number; angle: number };
    let nodes: Node[] = [];

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let visible = true;
    let raf = 0;
    let t = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: offsetX + c * spacing,
            y: offsetY + r * spacing,
            angle: 0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.004;

      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      const radius = 220;
      const radiusSq = radius * radius;

      for (const node of nodes) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const distSq = dx * dx + dy * dy;

        // Idle drift gives the field a subtle living quality.
        const idle =
          Math.sin(node.x * 0.01 + t * 1.2) * 0.3 +
          Math.cos(node.y * 0.012 - t) * 0.3;

        let targetAngle = idle;
        let intensity = 0;

        if (distSq < radiusSq) {
          targetAngle = Math.atan2(dy, dx);
          intensity = 1 - Math.sqrt(distSq) / radius;
        }

        // Ease the angle toward its target (shortest rotational path).
        let diff = targetAngle - node.angle;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        node.angle += diff * (0.1 + intensity * 0.35);

        const len = 7 + intensity * 16;
        const half = len / 2;
        const cos = Math.cos(node.angle);
        const sin = Math.sin(node.angle);

        const opacity = 0.12 + intensity * 0.7;
        const color = intensity > 0.15 ? colors.accent : colors.base;

        ctx.beginPath();
        ctx.moveTo(node.x - cos * half, node.y - sin * half);
        ctx.lineTo(node.x + cos * half, node.y + sin * half);
        ctx.strokeStyle = `${color} ${opacity})`;
        ctx.lineWidth = 1 + intensity * 1.2;
        ctx.lineCap = "round";
        ctx.stroke();

        // A bright tip near the cursor sells the "charge" of the field.
        if (intensity > 0.55) {
          ctx.beginPath();
          ctx.arc(
            node.x + cos * half,
            node.y + sin * half,
            1 + intensity * 1.6,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `${colors.accent} ${intensity})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        const half = 3.5;
        ctx.beginPath();
        ctx.moveTo(node.x - half, node.y);
        ctx.lineTo(node.x + half, node.y);
        ctx.strokeStyle = `${colors.base} 0.12)`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.stroke();
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const start = () => {
      if (reduceMotion) {
        drawStatic();
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const stop = () => cancelAnimationFrame(raf);

    const onResize = () => {
      build();
      if (reduceMotion) drawStatic();
    };

    build();
    start();

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduceMotion) drawStatic();
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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}
