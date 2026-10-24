import { BookMarked, ExternalLink, Sparkles } from "lucide-react";
import { Figure } from "@/components/ascii/Figure";
import { GithubIcon } from "@/components/icons/brands";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { languageColors, projects } from "@/content/projects";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 text-muted transition-colors hover:text-accent sm:min-h-0";

export async function Projects() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.projects;

  return (
    <Section
      id="projetos"
      title={dict.sections.projects}
      background={
        <>
          <Figure
            src="/figures/satellite.svg"
            mode="binary"
            cell={8}
            align="right"
            className="top-[8%] left-0 hidden h-[60%] w-[calc((100vw_-_64rem)/2_+_6rem)] opacity-90 xl:block dark:opacity-50"
          />
          <Figure
            src="/figures/chip.svg"
            mode="ascii"
            cell={8}
            className="top-[58%] right-[-25%] size-[min(90vw,520px)] -translate-y-1/2 opacity-90 sm:right-[2%] lg:right-[6%] dark:opacity-40"
          />
        </>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.name} className="flex">
            <Card className="flex w-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold">
                  <BookMarked
                    className="size-4 shrink-0 text-muted"
                    aria-hidden
                  />
                  <a
                    href={p.repo ?? p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-accent hover:underline"
                  >
                    {p.name}
                  </a>
                </h3>
                {p.ai && (
                  <Tag accent>
                    <Sparkles className="mr-1 size-3" aria-hidden />
                    {t.ai}
                  </Tag>
                )}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {p.description[locale]}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <span
                    className="size-3 rounded-full"
                    style={{
                      backgroundColor:
                        languageColors[p.language] ?? "var(--muted)",
                    }}
                    aria-hidden
                  />
                  {p.language}
                </span>
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
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
