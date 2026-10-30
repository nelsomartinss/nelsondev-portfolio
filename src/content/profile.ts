import type { Localized } from "@/i18n/config";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nelsondev.vercel.app",
};

export const profile = {
  name: "Nelson Martins",
  role: {
    pt: "Desenvolvedor fullstack",
    en: "Fullstack developer",
  } satisfies Localized,
  summary: {
    pt: "Transformo ideias e necessidades do seu negócio em sites e sistemas simples de usar, rápidos e confiáveis — do primeiro protótipo até o produto no ar.",
    en: "I turn your business ideas and needs into websites and systems that are simple to use, fast and reliable — from the first prototype to going live.",
  } satisfies Localized,
  about: {
    pt: [
      "Sou desenvolvedor em João Pessoa (PB). Antes de escrever qualquer código, procuro entender o problema: o que precisa melhorar, para quem e por quê. Assim, o que entrego resolve a dor de verdade e é fácil de usar e de manter.",
      "Uso ferramentas de inteligência artificial no dia a dia para entregar com mais agilidade, sem abrir mão da qualidade — e estou sempre aprendendo algo novo.",
    ],
    en: [
      "I'm a developer based in João Pessoa, Brazil. Before writing any code, I make sure I understand the problem: what needs to improve, for whom and why. That way, what I deliver solves the real pain and is easy to use and maintain.",
      "I use artificial intelligence tools every day to deliver faster without cutting corners on quality — and I'm always learning something new.",
    ],
  } satisfies Localized<string[]>,
  /** Shown as one discreet line in "About me", for technical readers. */
  tools: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Nest.js",
    "Tailwind CSS",
    "MongoDB",
    "MySQL",
    "Docker",
    "Vercel",
    "Claude Code",
    "Codex",
  ],
};
