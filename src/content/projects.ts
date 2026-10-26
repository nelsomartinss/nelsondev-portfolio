import type { Localized } from "@/i18n/config";

// TODO: replace the placeholder projects with your own.

export type Project = {
  name: string;
  description: Localized;
  language: string;
  tags: string[];
  ai?: boolean;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "reformata",
    description: {
      pt: "Uma biblioteca para ler com calma os textos que moldaram a fé reformada — com navegação simples, busca por temas e referências bíblicas para continuar o estudo.",
      en: "A library for leisurely reading the texts that shaped the Reformed faith—featuring simple navigation, topic-based search, and biblical references to further your study.",
    },
    language: "TypeScript",
    tags: ["Next.js", "Typescript", "Tailwind CSS", "Codex"],
    ai: true,
    repo: "https://github.com/nelsomartinss/reformata",
    demo: "https://reformata-one.vercel.app/",
  },
];

/** GitHub linguist colors for the language dot. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
};
