"use client";

import type { MouseEvent } from "react";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  const target = locales.find((l) => l !== current)!;

  // Keep the reader on the same section when switching language.
  const keepHash = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `/${target}${window.location.hash}`;
  };

  return (
    <a
      href={`/${target}`}
      hrefLang={target}
      onClick={keepHash}
      aria-label={label}
      title={label}
      className="inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-md px-2 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {locales.map((l, i) => (
        <span key={l} className={l === current ? "text-fg" : undefined}>
          {i > 0 && <span className="mr-1 text-border">/</span>}
          {l.toUpperCase()}
        </span>
      ))}
    </a>
  );
}
