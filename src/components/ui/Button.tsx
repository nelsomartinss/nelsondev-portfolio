import type { ComponentProps } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-4 font-mono text-sm font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary: "border-accent bg-accent text-accent-fg hover:opacity-90",
  secondary: "border-border bg-surface text-fg hover:border-muted",
};

export const buttonClass = (variant: Variant = "secondary", className = "") =>
  `${base} ${variants[variant]} ${className}`;

/** Link styled as a GitHub-like button. External links open in a new tab. */
export function ButtonLink({
  variant,
  className,
  external,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; external?: boolean }) {
  return (
    <a
      {...props}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={buttonClass(variant, className)}
    />
  );
}
