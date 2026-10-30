import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { themeScript } from "@/components/layout/ThemeToggle";
import { profile, site } from "@/content/profile";
import { htmlLang, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import "../globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, { meta }] = await Promise.all([getLocale(), getDictionary()]);
  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    authors: [{ name: profile.name }],
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}`])),
    },
    openGraph: {
      type: "website",
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: htmlLang[locale].replace("-", "_"),
    },
  };
}

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geist.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions (e.g. ColorZilla) add attributes to <body> before hydration. */}
      <body className="flex min-h-svh flex-col" suppressHydrationWarning>
        <a
          href="#conteudo"
          className="sr-only z-[60] rounded-md bg-accent px-4 py-2 text-sm text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.nav.skipToContent}
        </a>
        <Header
          locale={locale}
          name={profile.name}
          dict={{ nav: dict.nav, theme: dict.theme, locale: dict.locale }}
        />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
