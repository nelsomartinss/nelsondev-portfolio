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
    role: { pt: "Desenvolvedor Fullstack", en: "Fullstack Developer" },
    company: "Empresa Atual",
    location: { pt: "Remoto", en: "Remote" },
    start: "2024",
    bullets: {
      pt: [
        "Desenvolvo features ponta a ponta em Next.js e Node.js para milhares de usuários.",
        "Integrei LLMs ao produto (resumos, busca semântica e assistentes) com avaliação de qualidade contínua.",
        "Adotei agentes de código no fluxo do time, reduzindo o tempo de revisão de PRs.",
      ],
      en: [
        "Build end-to-end features in Next.js and Node.js for thousands of users.",
        "Integrated LLMs into the product (summaries, semantic search and assistants) with continuous quality evals.",
        "Brought coding agents into the team workflow, cutting PR review time.",
      ],
    },
  },
  {
    role: { pt: "Desenvolvedor Frontend", en: "Frontend Developer" },
    company: "Empresa Anterior",
    location: { pt: "São Paulo, SP", en: "São Paulo, Brazil" },
    start: "2022",
    end: "2024",
    bullets: {
      pt: [
        "Construí um design system em React usado por 4 produtos.",
        "Melhorei o Core Web Vitals das páginas principais em mais de 40%.",
      ],
      en: [
        "Built a React design system used across 4 products.",
        "Improved Core Web Vitals on key pages by over 40%.",
      ],
    },
  },
  {
    role: {
      pt: "Estagiário de Desenvolvimento",
      en: "Software Development Intern",
    },
    company: "Primeira Empresa",
    location: { pt: "Híbrido", en: "Hybrid" },
    start: "2021",
    end: "2022",
    bullets: {
      pt: ["Automatizei rotinas internas com scripts em Python e APIs REST."],
      en: ["Automated internal routines with Python scripts and REST APIs."],
    },
  },
];
