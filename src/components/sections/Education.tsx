import { GraduationCap } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { education } from "@/content/education";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Education() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Section id="formacao" title={dict.sections.education}>
      <ul className="divide-y divide-border rounded-md border border-border bg-bg/80">
        {education.map((item) => (
          <li
            key={item.title.pt}
            className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
          >
            <div className="flex gap-3">
              <GraduationCap
                className="mt-0.5 size-5 shrink-0 text-muted"
                aria-hidden
              />
              <div>
                <h3 className="font-semibold">{item.title[locale]}</h3>
                <p className="text-sm text-muted">{item.institution}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-8 sm:pl-0">
              <span className="text-sm text-muted">{item.period}</span>
              <Tag accent={item.status === "inProgress"}>
                {dict.education[item.status]}
              </Tag>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
