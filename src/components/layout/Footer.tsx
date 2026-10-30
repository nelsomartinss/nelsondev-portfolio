import { ClaudeSpark } from "@/components/icons/brands";
import { getDictionary } from "@/i18n/dictionaries";

export async function Footer() {
  const { footer } = await getDictionary();

  return (
    <footer className="border-t border-border py-8">
      <p className="container-page text-center text-sm text-muted">
        {footer.madeWith}{" "}
        <span role="img" aria-label={footer.coffee}>
          ☕
        </span>{" "}
        {footer.and}{" "}
        <span
          role="img"
          aria-label="Claude"
          className="inline-block align-[-2px]"
        >
          <ClaudeSpark className="size-4" />
        </span>
      </p>
    </footer>
  );
}
