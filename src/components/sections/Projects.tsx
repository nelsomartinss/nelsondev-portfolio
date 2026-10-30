import { BookMarked, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/brands";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { projects } from "@/content/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-accent sm:min-h-0";

export async function Projects() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.projects;

  return (
    <Section id="projetos" title={dict.sections.projects}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.name} className="flex">
            <Card className="flex w-full flex-col">
              <h3 className="flex min-w-0 items-center gap-2 font-semibold">
                <BookMarked
                  className="size-4 shrink-0 text-muted"
                  aria-hidden
                />
                <a
                  href={p.demo ?? p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-accent hover:underline"
                >
                  {p.name}
                </a>
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.description[locale]}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <ExternalLink className="size-3.5" aria-hidden />
                    {t.demo}
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <GithubIcon className="size-3.5" />
                    {t.source}
                  </a>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
