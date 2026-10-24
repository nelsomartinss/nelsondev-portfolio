import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { htmlLang, locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `${site.url}/${l}`]),
      ),
    },
  }));
}
