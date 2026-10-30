import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/content/experience";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Experience() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section id="experiencia" title={dict.sections.experience}>
      <ol className="relative ml-1.5 max-w-3xl border-l border-border">
        {experience.map((job, i) => {
          const [latest, ...earlier] = job.positions;
          return (
            <li
              key={job.company}
              className="relative pb-8 pl-6 last:pb-0 sm:pl-8"
            >
              <span
                className={`absolute top-2 -left-[6.5px] size-3 rounded-full border-2 ${
                  i === 0 ? "border-accent bg-accent" : "border-muted bg-bg"
                }`}
                aria-hidden
              />
              <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold sm:text-lg">
                {latest.role[locale]}
                {!latest.end && <Tag accent>{dict.experience.current}</Tag>}
              </h3>
              <p className="text-sm font-medium">{job.company}</p>
              <p className="mt-0.5 text-sm text-muted">
                {latest.start} — {latest.end ?? dict.experience.current} ·{" "}
                {job.location[locale]}
              </p>

              {/* Earlier roles at the same company (promotions). */}
              {earlier.length > 0 && (
                <ul className="mt-1 space-y-0.5 text-sm text-muted">
                  {earlier.map((pos) => (
                    <li key={pos.start}>
                      {pos.role[locale]} · {pos.start} —{" "}
                      {pos.end ?? dict.experience.current}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted marker:text-border">
                {job.bullets[locale].map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
