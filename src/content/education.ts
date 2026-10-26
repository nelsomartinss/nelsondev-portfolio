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
      pt: "Graduação em Análise e Desenvolvimento de Sistemas",
      en: "B.Sc. in Computer Science",
    },
    institution: " Centro Universitário de João Pessoa.",
    period: "2023 — 2025",
    status: "completed",
  },
  {
    title: {
      pt: "Responsive Web Design",
      en: "Responsive Web Design",
    },
    institution: "Free Code Camp",
    period: "2024",
    status: "completed",
  },
  {
    title: {
      pt: "curso.dev/ia",
      en: "curso.dev/ia",
    },
    institution: "curso.dev",
    period: "2026",
    status: "inProgress",
  },
];
