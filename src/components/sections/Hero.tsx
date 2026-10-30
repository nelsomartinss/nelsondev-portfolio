import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Hero() {
  const [locale, { hero }] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="pt-14 pb-6 sm:pt-20 sm:pb-8"
    >
      <div className="container-page">
        <h1
          id="inicio-title"
          className="text-[clamp(2rem,6vw,3.25rem)] leading-tight font-bold tracking-tight"
        >
          {profile.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-accent sm:text-xl">
          {profile.role[locale]}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.summary[locale]}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="#projetos" variant="primary">
            {hero.ctaProjects}
            <ArrowDown className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="#contato">
            {hero.ctaContact}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
          <span className="size-2 rounded-full bg-accent" aria-hidden />
          {hero.available}
        </p>
      </div>
    </section>
  );
}
