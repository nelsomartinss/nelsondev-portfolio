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
    name: "docs-copilot",
    description: {
      pt: "Assistente que responde perguntas sobre a documentação interna de uma empresa usando RAG, com citações das fontes.",
      en: "Assistant that answers questions about a company's internal docs using RAG, with source citations.",
    },
    language: "TypeScript",
    tags: ["Next.js", "Claude API", "pgvector"],
    ai: true,
    repo: "https://github.com/nelsomartinss",
    demo: "https://example.com",
  },
  {
    name: "agent-tasks",
    description: {
      pt: "Agente que lê issues, propõe um plano e abre pull requests com as mudanças para revisão humana.",
      en: "Agent that reads issues, proposes a plan and opens pull requests with the changes for human review.",
    },
    language: "Python",
    tags: ["FastAPI", "Tool use", "GitHub API"],
    ai: true,
    repo: "https://github.com/nelsomartinss",
  },
  {
    name: "shop-api",
    description: {
      pt: "API de e-commerce com autenticação, pagamentos e filas, pronta para escalar horizontalmente.",
      en: "E-commerce API with auth, payments and queues, ready to scale horizontally.",
    },
    language: "TypeScript",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    repo: "https://github.com/nelsomartinss",
  },
  {
    name: "insight-dash",
    description: {
      pt: "Dashboard que resume métricas de produto em linguagem natural e alerta sobre anomalias.",
      en: "Dashboard that summarizes product metrics in natural language and flags anomalies.",
    },
    language: "TypeScript",
    tags: ["React", "Embeddings", "Charts"],
    ai: true,
    demo: "https://example.com",
  },
  {
    name: "nelsondev-portfolio",
    description: {
      pt: "Este portfólio: Next.js, Tailwind e figuras renderizadas em ASCII e halftone num canvas.",
      en: "This portfolio: Next.js, Tailwind and figures rendered as ASCII and halftone on a canvas.",
    },
    language: "TypeScript",
    tags: ["Next.js", "Canvas", "i18n"],
    repo: "https://github.com/nelsomartinss/nelsondev-portfolio",
  },
  {
    name: "cli-notes",
    description: {
      pt: "CLI para criar e buscar anotações em Markdown direto do terminal, com busca semântica opcional.",
      en: "CLI to write and search Markdown notes from the terminal, with optional semantic search.",
    },
    language: "Go",
    tags: ["CLI", "SQLite"],
    repo: "https://github.com/nelsomartinss",
  },
];

/** GitHub linguist colors for the language dot. */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
};
