import { ClaudeSpark } from "@/components/icons/brands";
import { getDictionary } from "@/i18n/dictionaries";

export async function Footer() {
  const { footer } = await getDictionary();

  return (
    <footer className="border-t border-border py-8">
      <p className="container-page text-center font-mono text-sm text-muted">
        {footer.madeWith}{" "}
        <span role="img" aria-label={footer.coffee}>
          ☕
        </span>{" "}
        {footer.and}{" "}
        <span className="inline-flex items-center gap-1 align-middle whitespace-nowrap text-fg">
          <ClaudeSpark className="size-4" />
          Claude
        </span>
      </p>
    </footer>
  );
}
