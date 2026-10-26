import { Figure } from "@/components/ascii/Figure";
import { Section } from "@/components/ui/Section";
import { experience } from "@/content/experience";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

/** Short fake commit hash, stable per entry. */
const hashOf = (text: string) => {
  let h = 0x811c9dc5;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 0x01000193);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

export async function Experience() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section
      id="experiencia"
      title={dict.sections.experience}
      background={
        <Figure
          src="/figures/folder.svg"
          mode="ascii"
          cell={6}
          cycle
          fade="none"
          className="top-[42%] right-[max(1rem,calc((100vw_-_64rem)/2))] hidden size-[20rem] opacity-70 lg:block"
        />
      }
    >
      {/* From lg up the folder sits on the right; keep the timeline clear of it. */}
      <ol className="relative ml-1.5 border-l border-border lg:max-w-[calc(100%_-_21.5rem)]">
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${job.start}`}
            className="relative pb-10 pl-6 last:pb-0 sm:pl-8"
          >
            <span
              className={`absolute top-1.5 -left-[6.5px] size-3 rounded-full border-2 ${
                i === 0 ? "border-accent bg-accent" : "border-muted bg-bg"
              }`}
              aria-hidden
            />
            <p className="font-mono text-xs text-muted">
              <span className="text-accent">
                commit {hashOf(job.company + job.start)}
              </span>
              {!job.end && (
                <span className="ml-2 text-accent">
                  (HEAD → {dict.experience.current})
                </span>
              )}
            </p>
            <h3 className="mt-1.5 text-base font-semibold sm:text-lg">
              {job.role[locale]} <span className="text-muted">@</span>{" "}
              {job.company}
            </h3>
            <p className="mt-0.5 font-mono text-xs text-muted">
              {job.start} — {job.end ?? dict.experience.current} ·{" "}
              {job.location[locale]}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
              {job.bullets[locale].map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="font-mono text-accent" aria-hidden>
                    +
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
