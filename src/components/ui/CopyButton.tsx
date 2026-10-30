"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonClass } from "./Button";

type Props = {
  value: string;
  label: string;
  copiedLabel: string;
  /** Accessible name, e.g. "copiar e-mail". */
  ariaLabel: string;
};

export function CopyButton({ value, label, copiedLabel, ariaLabel }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={ariaLabel}
      className={buttonClass(
        "secondary",
        copied ? "border-accent! text-accent" : "",
      )}
    >
      {copied ? (
        <Check className="size-4" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
