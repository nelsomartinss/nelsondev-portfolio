import { ArrowDown, ArrowRight } from "lucide-react";
import { AsciiCanvas } from "@/components/ascii/AsciiCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { Typewriter } from "@/components/ui/Typewriter";
import { profile } from "@/content/profile";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

/** Sparse → dense, in the spirit of classic ASCII planet art. */
const SATURN_RAMP = " .'`^:-~/[uoPN8M@";

export async function Hero() {
  const [locale, { hero }] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section
      id="inicio"
      aria-labelledby="inicio-title"
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden py-16"
    >
      <div className="container-page grid items-center gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
        {/* Saturn: above the text on mobile, in its own column (bleeding to the right edge) from lg up. */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative h-72 opacity-90 sm:h-96 lg:order-last lg:h-[min(80vh,680px)] lg:w-[calc(100%_+_min(12rem,max(1.5rem,(100vw_-_64rem)_/_2_+_1.5rem)))]"
        >
          <AsciiCanvas
            src="/figures/saturn.svg"
            mode="ascii"
            cell={8}
            ramp={SATURN_RAMP}
            cycle
          />
        </div>

        <div>
          <p className="font-mono text-sm text-muted sm:text-base">
            <span className="text-accent">{profile.handle}@dev:~$</span>{" "}
            <Typewriter text={hero.prompt} />
          </p>

          <h1
            id="inicio-title"
            className="mt-4 font-mono text-[clamp(2.25rem,8vw,4.5rem)] leading-[1.05] font-bold tracking-tight"
          >
            {profile.name}
          </h1>
          <p className="mt-3 font-mono text-base text-accent sm:text-xl">
            {profile.role[locale]}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary[locale]}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted sm:text-sm">
            {profile.highlights.map((h, i) => (
              <li key={h}>
                {i > 0 && <span className="mr-3 text-border">·</span>}
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projetos" variant="primary">
              {hero.ctaProjects}
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#contato">
              {hero.ctaContact}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>

          <p className="mt-10 inline-flex items-center gap-2 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.available}
          </p>
        </div>
      </div>
    </section>
  );
}
