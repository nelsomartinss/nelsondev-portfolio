"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "theme" | "locale">;
  name: string;
};

export function Header({ locale, dict, name }: Props) {
  const [open, setOpen] = useState(false);
  const { nav } = dict;
  const links = [
    { href: "#projetos", label: nav.projects },
    { href: "#experiencia", label: nav.experience },
    { href: "#formacao", label: nav.education },
    { href: "#sobre", label: nav.about },
    { href: "#contato", label: nav.contact },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="container-page flex h-14 items-center justify-between gap-4">
        <a
          href="#inicio"
          className="flex min-h-11 items-center text-sm font-semibold"
          onClick={() => setOpen(false)}
        >
          {name}
        </a>

        <nav aria-label={nav.label} className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center">
          <LocaleSwitcher current={locale} label={dict.locale.switchTo} />
          <ThemeToggle label={dict.theme.toggle} />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label={nav.label}
        hidden={!open}
        className="border-t border-border md:hidden"
      >
        <ul className="container-page py-2 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-2 text-muted hover:text-fg"
              >
                <span className="text-accent">›</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
