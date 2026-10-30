import type { ReactNode } from "react";

export function Tag({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        accent ? "border-accent/50 text-accent" : "border-border text-muted"
      }`}
    >
      {children}
    </span>
  );
}
