# nelson.dev

Portfólio de **Nelson Martins**, desenvolvedor fullstack.

Um site simples e direto, no visual do GitHub: quem é, o que já fez, onde trabalhou e como entrar em contato, em português e inglês, com tema claro e escuro.

**Next.js 16** · **TypeScript** · **Tailwind CSS v4** · **PT / EN**

---

## O que tem no site

- **Seções:** início, projetos, experiência, formação, sobre mim e contato.
- **Contato em um clique:** copiar número e e-mail, abrir no WhatsApp, links para LinkedIn e GitHub.
- **Tema claro e escuro:** segue o tema do aparelho, e a escolha feita no botão fica salva.
- **Português e inglês:** a página inicial abre no idioma do navegador, e trocar de idioma mantém a seção atual.
- **Leve e acessível:** páginas estáticas e responsivas, navegáveis por teclado.

## Stack

| Camada    | Escolha                                                               |
| --------- | --------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Cache Components)       |
| Linguagem | TypeScript (strict)                                                   |
| Estilo    | [Tailwind CSS v4](https://tailwindcss.com), paletas GitHub Light/Dark |
| i18n      | nativo do Next: `proxy.ts` + `next/root-params`, rotas `/pt` e `/en`  |
| Fonte     | Geist                                                                 |
| Ícones    | [lucide-react](https://lucide.dev) + SVGs de marca inline             |

## Rodando localmente

Requer Node.js 20+.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script           | O que faz                        |
| ---------------- | -------------------------------- |
| `npm run dev`    | servidor de desenvolvimento      |
| `npm run build`  | build de produção                |
| `npm run start`  | serve o build de produção        |
| `npm run lint`   | ESLint                           |
| `npm run format` | Prettier (com ordem do Tailwind) |

## Estrutura

```text
src/
├── app/
│   ├── [locale]/          # layout e página, gerados para /pt e /en
│   ├── globals.css        # paletas clara/escura e utilitários
│   ├── sitemap.ts, robots.ts, icon.svg
├── components/
│   ├── layout/            # Header, Footer, LocaleSwitcher, ThemeToggle
│   ├── sections/          # Hero, Projects, Experience, Education, About, Contact
│   └── ui/                # Section, Card, Tag, Button, CopyButton
├── content/               # todo o conteúdo do site (PT e EN)
├── i18n/                  # idiomas e dicionários da interface
└── proxy.ts               # redireciona / para o idioma do navegador
```

## Editando o conteúdo

Todo o texto do site fica em dois lugares. Nenhum componente precisa ser alterado.

| Arquivo                            | O quê                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `src/content/profile.ts`           | nome, cargo, resumo, "sobre mim", ferramentas, URL do site              |
| `src/content/projects.ts`          | projetos (descrição, link do site e do código)                          |
| `src/content/experience.ts`        | experiências; promoções entram em `positions` (sem `end` = cargo atual) |
| `src/content/education.ts`         | formação acadêmica e certificações                                      |
| `src/content/contact.ts`           | WhatsApp, e-mail, LinkedIn e GitHub                                     |
| `src/i18n/dictionaries/{pt,en}.ts` | textos da interface: menu, botões, títulos, rodapé                      |

Os campos traduzidos usam o formato `{ pt: "...", en: "..." }`.

## Deploy

O projeto funciona na [Vercel](https://vercel.com) sem configuração extra. Defina a variável de ambiente abaixo para o sitemap e os metadados usarem o domínio certo:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

## Licença

O código está sob a licença [MIT](LICENSE): pode estudar, copiar e adaptar à vontade, mantendo o aviso de copyright.

Os textos e dados pessoais em `src/content/` (nome, histórico, contatos) não fazem parte dessa permissão. Se for usar este projeto como base, troque-os pelos seus.

---

<p align="center"><sub>feito com ☕ e <img src=".github/assets/claude.svg" alt="Claude" height="12"></sub></p>
