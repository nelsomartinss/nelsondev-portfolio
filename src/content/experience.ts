import type { Localized } from "@/i18n/config";

export type Position = {
  role: Localized;
  start: string;
  /** Omit for the current position. */
  end?: string;
};

export type Experience = {
  company: string;
  location: Localized;
  /** Roles held at the company, most recent first: add a new one on top for each promotion. */
  positions: Position[];
  bullets: Localized<string[]>;
};

export const experience: Experience[] = [
  {
    company: "JSD Telecom",
    location: { pt: "João Pessoa, PB", en: "João Pessoa, Brazil" },
    positions: [
      {
        role: { pt: "Desenvolvedor Júnior I", en: "Junior Developer I" },
        start: "2025",
      },
    ],
    bullets: {
      pt: [
        "Crio e melhoro funcionalidades dos sistemas da empresa, do que o usuário vê na tela ao que funciona nos bastidores.",
      ],
      en: [
        "I build and improve features in the company's systems, from what users see on screen to what runs behind the scenes.",
      ],
    },
  },
  {
    company: "Fábrica de Software UBTech Office/Unipê",
    location: { pt: "João Pessoa, PB", en: "João Pessoa, Brazil" },
    positions: [
      {
        role: { pt: "Desenvolvedor Backend", en: "Backend Developer" },
        start: "Jan 2023",
        end: "Jul 2023",
      },
    ],
    bullets: {
      pt: [
        "Desenvolvi soluções para demandas reais de clientes, trabalhando em equipe na Fábrica de Software do UBTech Office/UNIPÊ.",
      ],
      en: [
        "I built solutions for real client needs, working as part of the UBTech Office/UNIPÊ Software Factory team.",
      ],
    },
  },
];
