import type { Localized } from "@/i18n/config";

// TODO: replace the placeholder experience with your own (most recent first).

export type Experience = {
  role: Localized;
  company: string;
  location: Localized;
  start: string;
  /** Omit for the current position. */
  end?: string;
  bullets: Localized<string[]>;
};

export const experience: Experience[] = [
  {
    role: { pt: "Desenvolvedor Júnior I", en: "Junior Developer I" },
    company: "JSD Telecom",
    location: { pt: "João Pessoa, PB", en: "João Pessoa, Brazil" },
    start: "2025",
    bullets: {
      pt: [
        "Desenvolvo features ponta a ponta em React, Node.js e PHP para diversos usuários.",
      ],
      en: [
        "I develop end-to-end features using React, Node.js, and PHP for a variety of users.",
      ],
    },
  },
  {
    role: { pt: "Desenvolvedor Backend", en: "Backend Developer" },
    company: "Fábrica de Software UBTech Office/Unipê",
    location: { pt: "João Pessoa, PB", en: "João Pessoa, Brazil" },
    start: "Jan - 2023",
    end: "Julh - 2023",
    bullets: {
      pt: [
        "Atuei no desenvolvimento de soluções de software voltadas para demandas reais de clientes, colaborando com a equipe da Fábrica de Software do UBTech Office/UNIPÊ.",
      ],
      en: [
        "I worked on the development of software solutions tailored to real client needs, collaborating with the Software Factory team at the UBTech Office/UNIPÊ.",
      ],
    },
  },
];
