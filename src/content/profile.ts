import type { Localized } from "@/i18n/config";

// TODO: replace the placeholders below with your real data.

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nelsondev.vercel.app",
};

export const profile = {
  name: "Nelson Martins",
  handle: "nelsondev",
  role: {
    pt: "Desenvolvedor Fullstack",
    en: "Fullstack Developer",
  } satisfies Localized,
  summary: {
    pt: "Construo produtos web de ponta a ponta — da interface ao banco de dados — e integro modelos de linguagem, agentes e automações para que o software trabalhe por quem o usa.",
    en: "I build web products end to end — from the interface to the database — and integrate language models, agents and automations so software works for the people using it.",
  } satisfies Localized,
  highlights: [
    "React",
    "Next.js",
    "Node.js",
    "Nest.js",
    "LLMs",
    "Codex",
    "Claude",
  ],
  about: {
    pt: [
      "Sou desenvolvedor fullstack com foco em aplicações web modernas. Gosto de entender o problema e a dor que o cliente possui antes de pensar no código e de entregar software simples, rápido e fácil de manter.",
      "Nos últimos tempos, a inteligência artificial virou parte central do meu trabalho: integro LLMs a produtos reais e uso ferramentas como o Claude Code no dia a dia para projetar, revisar e entregar mais rápido — sem abrir mão da qualidade.",
      "Fora do código, estou sempre estudando algo novo!",
    ],
    en: [
      "I am a full-stack developer focused on modern web applications. I like to understand the problem and the pain points a client is facing before thinking about the code, with the goal of delivering software that is simple, fast, and easy to maintain.",
      "Lately, artificial intelligence has become a core part of my work: I integrate LLMs into real-world products and use tools like Claude Code in my daily workflow to design, review, and deliver faster—without compromising on quality.",
      "When I’m not coding, I’m always studying something new!",
    ],
  } satisfies Localized<string[]>,
  stack: [
    {
      label: { pt: "Frontend", en: "Frontend" },
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      label: { pt: "Backend", en: "Backend" },
      items: ["Node.js", "Nest.js", "MongoDB", "MySQL"],
    },
    {
      label: { pt: "IA & LLMs", en: "AI & LLMs" },
      items: ["Claude Code", "Codex", "Agentes"],
    },
    {
      label: { pt: "DevOps", en: "DevOps" },
      items: ["Docker", "CI/CD", "Vercel"],
    },
  ] satisfies { label: Localized; items: string[] }[],
};
