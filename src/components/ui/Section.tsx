import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  /** Decorative background (usually a <Figure />). */
  background?: ReactNode;
};

/** Page section with a markdown-style heading: "## title". */
export function Section({ id, title, children, background }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-hidden py-16 sm:py-24"
    >
      {background}
      <div className="container-page">
        <h2
          id={`${id}-title`}
          className="mb-8 border-b border-border pb-3 font-mono text-xl font-semibold sm:text-2xl"
        >
          <span className="text-accent" aria-hidden="true">
            ##{" "}
          </span>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
