"use client";

import { useEffect, useRef } from "react";
import {
  cellAspect,
  drawCycle,
  drawFrame,
  makeParticles,
  RAMP,
  sampleImage,
  type FigureMode,
  type Grid,
  type Particles,
} from "./renderers";

type Props = {
  /** Image in /public used as the luminance source. */
  src: string;
  mode: FigureMode;
  /** Cell width in CSS px on desktop; scaled down on small screens. */
  cell?: number;
  align?: "left" | "center" | "right";
  interactive?: boolean;
  /** ASCII only: characters fly in to form the figure, hold, then dissolve, in a loop. */
  cycle?: boolean;
  /** ASCII characters from sparse to dense. */
  ramp?: string;
  className?: string;
};

const FRAME_MS = 1000 / 30;

/**
 * Decorative background that redraws an image as ASCII characters, binary
 * digits or halftone dots. Animates only while visible and never under
 * prefers-reduced-motion.
 */
export function AsciiCanvas({
  src,
  mode,
  cell = 10,
  align = "center",
  interactive = true,
  cycle = false,
  ramp = RAMP,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const img = new Image();
    let grid: Grid | null = null;
    let particles: Particles | null = null;
    // Cycle clock starts when the figure first scrolls into view.
    let t0 = -1;
    let color = "";
    let visible = false;
    let raf = 0;
    let last = 0;
    let pointer: { x: number; y: number } | null = null;

    const readStyle = () => {
      const style = getComputedStyle(canvas);
      color = style.color;
      ctx.font = `${Math.round(grid ? grid.cellH * 0.82 : 12)}px ${style.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };

    const render = (time: number) => {
      if (!grid) return;
      const state = { time, pointer, animated: !reduceMotion.matches };
      if (particles) {
        drawCycle(ctx, grid, particles, ramp, color, {
          ...state,
          time: t0 < 0 ? 0 : time - t0,
        });
      } else {
        drawFrame(ctx, grid, mode, color, state);
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < FRAME_MS) return;
      last = time;
      render(time);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!visible) return;
      if (t0 < 0) t0 = performance.now();
      if (reduceMotion.matches) render(0);
      else raf = requestAnimationFrame(loop);
    };

    const layout = () => {
      if (!img.complete || !img.naturalWidth) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cellW = width < 640 ? Math.max(6, cell * 0.75) : cell;
      grid = sampleImage(
        img,
        width,
        height,
        cellW,
        cellW * cellAspect(mode),
        align,
      );
      particles = cycle ? makeParticles(grid) : null;
      readStyle();
      render(performance.now());
    };

    const resizeObserver = new ResizeObserver(layout);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside =
        x > -100 && y > -100 && x < rect.width + 100 && y < rect.height + 100;
      pointer = inside ? { x, y } : null;
    };
    const onPointerLeave = () => (pointer = null);

    img.onload = () => {
      layout();
      resizeObserver.observe(canvas);
      viewObserver.observe(canvas);
      reduceMotion.addEventListener("change", start);
      if (interactive) {
        window.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
        document.addEventListener("pointerleave", onPointerLeave);
      }
    };
    img.src = src;

    return () => {
      img.onload = null;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      reduceMotion.removeEventListener("change", start);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [src, mode, cell, align, interactive, cycle, ramp]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none size-full font-mono text-figure select-none ${className ?? ""}`}
    />
  );
}
