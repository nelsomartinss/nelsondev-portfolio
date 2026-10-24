import type { ReactNode } from "react";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border border-border bg-bg/80 p-4 backdrop-blur-sm transition-colors hover:border-muted sm:p-5 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
