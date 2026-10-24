"use client";

import { useEffect, useRef } from "react";
import { POINTER_RADIUS } from "./renderers";

const CELL_W = 10;
const CELL_H = 17;
const RAMP = ".:-";

/**
 * Page-wide character grid that lights up around the mouse, so the hover
 * effect follows the pointer everywhere, not only over the figures.
 */
export function PointerGlow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let color = "";
    // Dark glyphs on a white page need more weight to read as clearly.
    let alpha = 0.55;
    // Smoothed position trails the real pointer; intensity fades in and out.
    const target = { x: -999, y: -999 };
    const pos = { x: -999, y: -999 };
    let intensity = 0;
    let active = false;

    const readStyle = () => {
      const style = getComputedStyle(canvas);
      color = style.color;
      alpha = document.documentElement.classList.contains("dark") ? 0.55 : 0.8;
      ctx.font = `${Math.round(CELL_H * 0.8)}px ${style.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readStyle();
    };

    const draw = (time: number) => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      intensity += ((active ? 1 : 0) - intensity) * 0.12;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      const c0 = Math.max(0, Math.floor((pos.x - POINTER_RADIUS) / CELL_W));
      const c1 = Math.ceil((pos.x + POINTER_RADIUS) / CELL_W);
      const r0 = Math.max(0, Math.floor((pos.y - POINTER_RADIUS) / CELL_H));
      const r1 = Math.ceil((pos.y + POINTER_RADIUS) / CELL_H);

      for (let r = r0; r <= r1; r++) {
        const cy = r * CELL_H + CELL_H / 2;
        for (let c = c0; c <= c1; c++) {
          const cx = c * CELL_W + CELL_W / 2;
          const d = Math.hypot(cx - pos.x, cy - pos.y);
          if (d >= POINTER_RADIUS) continue;
          const g = (1 - d / POINTER_RADIUS) ** 1.5;
          // Cheap per-cell shimmer from a stable hash of the cell position.
          const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
          const shimmer = 0.75 + 0.25 * Math.sin(time * 0.004 + seed);
          ctx.globalAlpha = g * shimmer * intensity * alpha;
          ctx.fillText(
            RAMP[Math.min(RAMP.length - 1, Math.floor(g * RAMP.length))],
            cx,
            cy,
          );
        }
      }
      ctx.globalAlpha = 1;

      if (active || intensity > 0.01) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, width, height);
    };

    const wake = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!active) {
        // Appear where the mouse enters instead of sliding in from far away.
        if (intensity < 0.01) {
          pos.x = e.clientX;
          pos.y = e.clientY;
        }
        active = true;
        wake();
      }
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onLeave = () => {
      active = false;
    };
    const themeObserver = new MutationObserver(readStyle);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    themeObserver.observe(document.documentElement, {
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 size-full font-mono text-figure select-none"
    />
  );
}
