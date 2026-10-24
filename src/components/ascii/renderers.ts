export type FigureMode = "ascii" | "binary" | "halftone";

export type Grid = {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
  /** Luminance per cell (0–1), row-major. */
  lum: Float32Array;
  /** Random phase per cell, drives flicker and binary flips. */
  phase: Float32Array;
};

export const RAMP = " .:-=+*#%@";

/** Cell height relative to width: characters are taller than wide, dots are square. */
export const cellAspect = (mode: FigureMode) => (mode === "halftone" ? 1 : 1.7);

/**
 * Rasterizes the image into a cols × rows grid (object-fit: contain, anchored
 * by `align`) and returns one luminance value per cell.
 */
export function sampleImage(
  img: HTMLImageElement,
  width: number,
  height: number,
  cellW: number,
  cellH: number,
  align: "left" | "center" | "right",
): Grid {
  const cols = Math.max(1, Math.floor(width / cellW));
  const rows = Math.max(1, Math.floor(height / cellH));

  // Fit in pixel space, then convert to cells so the figure keeps its proportions.
  const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
  const fitCols = Math.round((img.naturalWidth * scale) / cellW);
  const fitRows = Math.round((img.naturalHeight * scale) / cellH);
  const offX =
    align === "left"
      ? 0
      : align === "right"
        ? cols - fitCols
        : (cols - fitCols) >> 1;
  const offY = (rows - fitRows) >> 1;

  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d", { willReadFrequently: true })!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, offX, offY, fitCols, fitRows);
  const { data } = ctx.getImageData(0, 0, cols, rows);

  const lum = new Float32Array(cols * rows);
  const phase = new Float32Array(cols * rows);
  for (let i = 0; i < lum.length; i++) {
    const p = i * 4;
    const l =
      (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
    lum[i] = l * (data[p + 3] / 255);
    phase[i] = Math.random() * Math.PI * 2;
  }
  return { cols, rows, cellW, cellH, lum, phase };
}

export type FrameState = {
  time: number;
  /** Pointer position in CSS px relative to the canvas, or null. */
  pointer: { x: number; y: number } | null;
  animated: boolean;
};

export const POINTER_RADIUS = 140;

/** Clears the whole canvas, including the strip the cell grid doesn't cover. */
function clear(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
const SCAN_PERIOD = 7000;

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  mode: FigureMode,
  color: string,
  { time, pointer, animated }: FrameState,
) {
  const { cols, rows, cellW, cellH, lum, phase } = grid;
  clear(ctx);
  ctx.fillStyle = color;

  // A soft band sweeping down the figure every SCAN_PERIOD ms.
  const scanRow = animated
    ? ((time % SCAN_PERIOD) / SCAN_PERIOD) * (rows + 20) - 10
    : -99;

  for (let r = 0; r < rows; r++) {
    const cy = r * cellH + cellH / 2;
    const scan = Math.max(0, 1 - Math.abs(r - scanRow) / 4) * 0.35;

    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const cx = c * cellW + cellW / 2;
      let v = lum[i];
      // Empty space is left to the page-wide <PointerGlow />.
      if (v < 0.04) continue;

      let glow = 0;
      if (pointer) {
        const d = Math.hypot(cx - pointer.x, cy - pointer.y);
        if (d < POINTER_RADIUS) glow = 1 - d / POINTER_RADIUS;
      }

      if (animated) v *= 0.82 + 0.18 * Math.sin(time * 0.002 + phase[i]);
      v = Math.min(1, v + scan * v + glow * 0.5);

      if (mode === "halftone") {
        const radius = (cellW / 2) * Math.min(1, v * 1.05);
        if (radius < 0.4) continue;
        ctx.globalAlpha = 0.35 + v * 0.65;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        let ch: string;
        if (mode === "binary") {
          // Each cell flips between 0 and 1 at its own slow pace.
          const flip = animated ? Math.floor(time / 900 + phase[i] * 3) : 0;
          ch = (flip + Math.floor(phase[i] * 10)) % 2 ? "1" : "0";
          ctx.globalAlpha = v;
        } else {
          ch =
            RAMP[Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1)))];
          ctx.globalAlpha = 0.3 + v * 0.7;
        }
        if (ch !== " ") ctx.fillText(ch, cx, cy);
      }
    }
  }
  ctx.globalAlpha = 1;
}

/** Cells that take part in the form/dissolve cycle, with their travel paths. */
export type Particles = {
  idx: Uint32Array;
  /** Offset (px) each cell flies in from while forming. */
  from: Float32Array;
  /** Offset (px) each cell drifts to while dissolving. */
  to: Float32Array;
  /** Per-cell stagger, 0–1. */
  delay: Float32Array;
};

export function makeParticles(grid: Grid): Particles {
  const { cols, cellW, cellH, lum } = grid;
  const ids: number[] = [];
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < lum.length; i++) {
    if (lum[i] < 0.04) continue;
    ids.push(i);
    sx += (i % cols) * cellW;
    sy += Math.floor(i / cols) * cellH;
  }
  const n = ids.length;
  const cx = sx / Math.max(1, n);
  const cy = sy / Math.max(1, n);
  const from = new Float32Array(n * 2);
  const to = new Float32Array(n * 2);
  const delay = new Float32Array(n);

  for (let k = 0; k < n; k++) {
    const i = ids[k];
    const x = (i % cols) * cellW - cx;
    const y = Math.floor(i / cols) * cellH - cy;
    const a = Math.random() * Math.PI * 2;
    const r = 120 + Math.random() * 320;
    from[k * 2] = Math.cos(a) * r;
    from[k * 2 + 1] = Math.sin(a) * r;
    // Dissolve outward from the centre, drifting slightly upward like dust.
    const len = Math.hypot(x, y) || 1;
    const push = 40 + Math.random() * 160;
    to[k * 2] = (x / len) * push + (Math.random() - 0.5) * 60;
    to[k * 2 + 1] = (y / len) * push - 30 - Math.random() * 60;
    delay[k] = Math.random();
  }
  return { idx: Uint32Array.from(ids), from, to, delay };
}

/** Timeline (ms) of one form → hold → dissolve → rest cycle. */
const FORM = 2800;
const HOLD = 6500;
const DISSOLVE = 2800;
const REST = 900;
const CYCLE = FORM + HOLD + DISSOLVE + REST;
/** Portion of FORM/DISSOLVE spread across the per-cell delays. */
const STAGGER = 1100;

const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t ** 3;
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);

/**
 * Draws ASCII cells that fly in to form the figure, hold, then dissolve away.
 * Cells near the pointer are pushed aside, brighten and scramble.
 */
export function drawCycle(
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  particles: Particles,
  ramp: string,
  color: string,
  { time, pointer, animated }: FrameState,
) {
  const { cols, cellW, cellH, lum, phase } = grid;
  const { idx, from, to, delay } = particles;
  clear(ctx);
  ctx.fillStyle = color;

  // Without motion the figure simply stays formed.
  const t = animated ? time % CYCLE : FORM;
  const step = Math.floor(time / 70);
  const last = ramp.length - 1;

  for (let k = 0; k < idx.length; k++) {
    const i = idx[k];
    let x = (i % cols) * cellW + cellW / 2;
    let y = Math.floor(i / cols) * cellH + cellH / 2;
    const d = delay[k] * STAGGER;
    let alpha = 1;
    let scramble = false;

    if (t < FORM) {
      const q = clamp01((t - d) / (FORM - STAGGER));
      const e = 1 - easeOut(q);
      x += from[k * 2] * e;
      y += from[k * 2 + 1] * e;
      alpha = q;
      scramble = q < 1;
    } else if (t >= FORM + HOLD) {
      const q = clamp01((t - FORM - HOLD - d) / (DISSOLVE - STAGGER));
      const e = easeIn(q);
      x += to[k * 2] * e;
      y += to[k * 2 + 1] * e;
      alpha = 1 - q;
      scramble = q > 0;
    }
    if (alpha < 0.02) continue;

    let v = lum[i];
    if (animated) v *= 0.85 + 0.15 * Math.sin(time * 0.002 + phase[i]);

    if (pointer) {
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < POINTER_RADIUS) {
        const g = 1 - dist / POINTER_RADIUS;
        const push = (g * g * 26) / (dist || 1);
        x += dx * push;
        y += dy * push;
        v = Math.min(1, v + g * 0.6);
        if (g > 0.55) scramble = true;
      }
    }

    const ch = scramble
      ? ramp[1 + ((((k * 2654435761) ^ (step * 40503)) >>> 0) % last)]
      : ramp[Math.min(last, Math.round(v * last))];
    if (ch === " ") continue;
    ctx.globalAlpha = alpha * (0.3 + v * 0.7);
    ctx.fillText(ch, x, y);
  }
  ctx.globalAlpha = 1;
}
