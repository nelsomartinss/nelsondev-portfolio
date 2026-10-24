export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Value translated in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};
