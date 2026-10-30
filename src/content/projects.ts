import type { Localized } from "@/i18n/config";

export type Project = {
  name: string;
  description: Localized;
  /** Source code link. */
  repo?: string;
  /** Live site link. */
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "reformata",
    description: {
      pt: "Uma biblioteca on-line para ler com calma os textos que moldaram a fé reformada, com navegação simples, busca por temas e referências bíblicas para continuar o estudo.",
      en: "An online library for calmly reading the texts that shaped the Reformed faith, with simple navigation, search by topic and biblical references to keep studying.",
    },
    repo: "https://github.com/nelsomartinss/reformata",
    demo: "https://reformata-one.vercel.app/",
  },
];
