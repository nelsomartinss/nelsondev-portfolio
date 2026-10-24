"use client";

import { useEffect, useState } from "react";

/** Types `text` one character at a time, followed by a blinking block cursor. */
export function Typewriter({
  text,
  delay = 400,
}: {
  text: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setCount(text.length), 0);
      return () => clearTimeout(id);
    }
    let i = 0;
    let id = setTimeout(function tick() {
      setCount(++i);
      if (i < text.length) id = setTimeout(tick, 70 + Math.random() * 60);
    }, delay);
    return () => clearTimeout(id);
  }, [text, delay]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="ml-0.5 animate-blink text-accent">▊</span>
      </span>
    </>
  );
}
