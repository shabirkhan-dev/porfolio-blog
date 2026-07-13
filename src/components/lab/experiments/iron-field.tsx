"use client";

import { useEffect, useRef } from "react";

/**
 * Iron Field — denser magnetic filings that lean toward the pointer.
 * Signature lab piece: quiet until you move, then the whole field answers.
 */
export function IronField({ className }: { className?: string }) {
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
      const accent =
        styles.getPropertyValue("--accent-rgb").trim() || "214 168 70";
      const stroke =
        styles.getPropertyValue("--stroke-rgb").trim() || "236 228 210";
      return { accent, stroke };
    };

    let colors = readColors();
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const spacing = 28;

    type Node = { x: number; y: number; angle: number; pulse: number };
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
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          nodes.push({
            x,
            y,
            angle: Math.random() * Math.PI * 2,
            pulse: Math.random(),
          });
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = event.clientX - rect.left;
      pointer.ty = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };

    const frame = () => {
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }

      t += 0.016;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const dist = Math.hypot(dx, dy) || 1;
        const influence = Math.max(0, 1 - dist / 220);

        const idle =
          Math.sin(t * 0.7 + node.pulse * 6) * 0.25 +
          Math.cos(t * 0.45 + node.x * 0.01) * 0.2;
        const targetAngle =
          influence > 0.02 ? Math.atan2(dy, dx) : node.angle + idle * 0.04;

        let diff = targetAngle - node.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        node.angle += diff * (0.08 + influence * 0.25);

        const len = 5 + influence * 16 + node.pulse * 2;
        const ox = Math.cos(node.angle) * len;
        const oy = Math.sin(node.angle) * len;
        const alpha = 0.18 + influence * 0.75;

        ctx.beginPath();
        ctx.moveTo(node.x - ox * 0.35, node.y - oy * 0.35);
        ctx.lineTo(node.x + ox, node.y + oy);
        ctx.strokeStyle =
          influence > 0.15
            ? `rgb(${colors.accent} / ${alpha})`
            : `rgb(${colors.stroke} / ${alpha * 0.55})`;
        ctx.lineWidth = influence > 0.2 ? 1.35 : 1;
        ctx.stroke();

        if (influence > 0.45) {
          ctx.beginPath();
          ctx.arc(node.x + ox, node.y + oy, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${colors.accent} / ${influence})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        const len = 6;
        const ox = Math.cos(node.angle) * len;
        const oy = Math.sin(node.angle) * len;
        ctx.beginPath();
        ctx.moveTo(node.x - ox * 0.3, node.y - oy * 0.3);
        ctx.lineTo(node.x + ox, node.y + oy);
        ctx.strokeStyle = `rgb(${colors.stroke} / 0.28)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    build();
    if (reduceMotion) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(() => {
      build();
      if (reduceMotion) staticFrame();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onMove);

    const onTheme = () => {
      colors = readColors();
    };
    window.addEventListener("themechange", onTheme);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style"],
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onMove);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label="Interactive magnetic iron-filing field"
    />
  );
}
