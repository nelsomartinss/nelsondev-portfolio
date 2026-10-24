import type { Localized } from "@/i18n/config";

// TODO: replace the placeholder education with your own.

export type Education = {
  title: Localized;
  institution: string;
  period: string;
  status: "completed" | "inProgress";
};

export const education: Education[] = [
  {
    title: {
      pt: "Bacharelado em Ciência da Computação",
      en: "B.Sc. in Computer Science",
    },
    institution: "Universidade Exemplo",
    period: "2020 — 2024",
    status: "completed",
  },
  {
    title: {
      pt: "Pós-graduação em Inteligência Artificial",
      en: "Postgraduate degree in Artificial Intelligence",
    },
    institution: "Instituto Exemplo",
    period: "2025 — 2026",
    status: "inProgress",
  },
  {
    title: {
      pt: "Certificação em Desenvolvimento Web",
      en: "Web Development Certification",
    },
    institution: "Plataforma Exemplo",
    period: "2024",
    status: "completed",
  },
];
