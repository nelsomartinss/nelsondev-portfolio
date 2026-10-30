import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function About() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section id="sobre" title={dict.sections.about}>
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
        {profile.about[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* For technical readers, kept out of the way of everyone else. */}
      <p className="mt-6 max-w-3xl text-sm text-muted">
        <span className="font-medium text-fg">{dict.about.tools}:</span>{" "}
        {profile.tools.join(" · ")}
      </p>
    </Section>
  );
}
