import type { Localized } from "@/i18n/config";

// TODO: replace the placeholders below with your real data.

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nelsondev.vercel.app",
};

export const profile = {
  name: "Nelson Martins",
  handle: "nelson",
  role: {
    pt: "Desenvolvedor Fullstack · Engenheiro de IA",
    en: "Fullstack Developer · AI Engineer",
  } satisfies Localized,
  summary: {
    pt: "Construo produtos web de ponta a ponta — da interface ao banco de dados — e integro modelos de linguagem, agentes e automações para que o software trabalhe por quem o usa.",
    en: "I build web products end to end — from the interface to the database — and integrate language models, agents and automations so software works for the people using it.",
  } satisfies Localized,
  highlights: ["TypeScript", "Next.js", "Node.js", "Python", "LLMs"],
  about: {
    pt: [
      "Sou desenvolvedor fullstack com foco em aplicações web modernas. Gosto de entender o problema antes do código e de entregar software simples, rápido e fácil de manter.",
      "Nos últimos tempos, a inteligência artificial virou parte central do meu trabalho: integro LLMs a produtos reais com RAG, function calling e agentes, e uso ferramentas como o Claude Code no dia a dia para projetar, revisar e entregar mais rápido — sem abrir mão da qualidade.",
      "Fora do código, estou sempre estudando algo novo, tomando café e compartilhando o que aprendo.",
    ],
    en: [
      "I'm a fullstack developer focused on modern web applications. I like to understand the problem before the code and to ship software that is simple, fast and easy to maintain.",
      "Lately, artificial intelligence has become central to my work: I integrate LLMs into real products with RAG, function calling and agents, and I use tools like Claude Code daily to design, review and ship faster — without trading off quality.",
      "Away from the keyboard, I'm always learning something new, drinking coffee and sharing what I learn.",
    ],
  } satisfies Localized<string[]>,
  stack: [
    {
      label: { pt: "Frontend", en: "Frontend" },
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      label: { pt: "Backend", en: "Backend" },
      items: ["Node.js", "Python", "PostgreSQL", "REST · GraphQL"],
    },
    {
      label: { pt: "IA & LLMs", en: "AI & LLMs" },
      items: ["Claude API", "RAG", "Agentes", "Embeddings"],
    },
    {
      label: { pt: "DevOps", en: "DevOps" },
      items: ["Docker", "CI/CD", "Vercel", "AWS"],
    },
  ] satisfies { label: Localized; items: string[] }[],
};
