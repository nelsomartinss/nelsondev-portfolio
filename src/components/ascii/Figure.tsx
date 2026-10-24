import { AsciiCanvas } from "./AsciiCanvas";
import type { FigureMode } from "./renderers";

export const fades = {
  none: "",
  radial:
    "[mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_78%)]",
  bottom: "[mask-image:linear-gradient(to_bottom,black_75%,transparent)]",
  sides:
    "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
};

type Props = {
  src: string;
  mode: FigureMode;
  cell?: number;
  align?: "left" | "center" | "right";
  cycle?: boolean;
  ramp?: string;
  /** How the edges fade into the page. */
  fade?: keyof typeof fades;
  /** Positioning/opacity utilities for the wrapper. */
  className?: string;
};

/** Positions a figure behind its section, fading its edges so text stays readable. */
export function Figure({ className, fade = "radial", ...canvas }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 ${fades[fade]} ${className ?? ""}`}
    >
      <AsciiCanvas {...canvas} />
    </div>
  );
}
