"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Runs before paint (inlined in <head>) so the theme never flashes: a saved
 * choice wins, otherwise the system preference decides.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  // Both icons render; CSS shows the one for the current theme, avoiding hydration mismatch.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <Sun className="hidden size-4.5 dark:block" aria-hidden />
      <Moon className="size-4.5 dark:hidden" aria-hidden />
    </button>
  );
}
