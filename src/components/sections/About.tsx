import { Figure } from "@/components/ascii/Figure";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function About() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section
      id="sobre"
      title={dict.sections.about}
      background={
        <Figure
          src="/figures/eye.svg"
          mode="ascii"
          cell={7}
          className="inset-x-0 top-1/2 h-[85%] -translate-y-1/2 opacity-30 dark:opacity-[0.18]"
        />
      }
    >
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div>
          <h3 className="mb-3 font-mono text-sm text-muted">
            <span className="text-accent">$</span> cat {dict.about.stack}.json
          </h3>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {profile.stack.map((group) => (
              <div
                key={group.label.en}
                className="rounded-md border border-border bg-bg/80 p-4"
              >
                <dt className="font-mono text-xs font-semibold text-accent">
                  {group.label[locale]}
                </dt>
                <dd className="mt-2 font-mono text-sm leading-relaxed">
                  {group.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
