import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

/** Page section with a GitHub-style heading: plain title over a thin rule. */
export function Section({ id, title, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-8 sm:py-10">
      <div className="container-page">
        <h2
          id={`${id}-title`}
          className="mb-6 border-b border-border pb-2 text-xl font-semibold sm:text-2xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
