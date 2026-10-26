```text
                                       .'`:-~-:'
                   `:/[[u[~-:`. .`:~[oNNNNNN8888~.
                :[PPPPPPPoouu[//[uPPPou//~--^.-N8~
              :PNNNNNNNNNPPoou[[~-:^.       ~~88N'
            'uNN8888888NNNPPPu/~~~~-^.    '[oNNo'
           .oN888MMMMM888Nou[uuu[/~-:^  `/oNNP:
           /NN88MMM@@M8PouoPPPou[/-:^^~uPPNo-
          ^PNN88888NNPPN8NNPPou/~:^:[oPPP/`
       ^[NNPPPoooPN88888NNNou/-^-/uooou:.
     -P888o[uoPNNNNNNNNPu[~::-/uooou-^.
   -N88Nu^ .uoPPPPouu[~-:-~/uuu[~:^`^`
 'PMMPu`    '/[///---~/uouu/-^`^:::^`
'M@M-/       .:~[[uoPoo/:``^-~--::^'
/@8- ^~~/[[oPNNNNNo/:``:-~~--:::`.
 ~M@@MMMM888P[~:`.  '^^:::^`'..
   ':~~:^'.
```

# nelson.dev

> `~/nelson $ whoami`: portfólio de um desenvolvedor fullstack com foco em IA.

Interface minimalista e _text-first_, no espírito do GitHub, sobre um fundo de figuras desenhadas com caracteres. O Saturno acima é o mesmo da página inicial, gerado a partir de [`public/figures/saturn.svg`](public/figures/saturn.svg). No site ele se monta caractere por caractere, fica alguns segundos e se desfaz como poeira.

**Next.js 16** · **TypeScript** · **Tailwind CSS v4** · **Canvas 2D** · **PT / EN**

---

## Destaques

- **Figuras em ASCII, binário e halftone** desenhadas em tempo real num `<canvas>` a partir de imagens em tons de cinza.
- **Saturno e pasta animados**, que se formam e se desfazem em loop. Perto do mouse, os caracteres se afastam, brilham e embaralham.
- **Brilho que segue o mouse pela página inteira**, feito com uma grade de caracteres fixa atrás do conteúdo.
- **Bilíngue (PT/EN)**: a raiz redireciona pelo idioma do navegador, e trocar de idioma mantém a seção atual.
- **Responsivo**: no celular ficam só o Saturno e as mãos, para o conteúdo respirar.
- **Contatos práticos**: copiar número e e-mail, abrir no WhatsApp, links para LinkedIn e GitHub.
- **Acessível e leve**: páginas estáticas, animações pausadas fora da tela e respeito a `prefers-reduced-motion`.

## Stack

| Camada    | Escolha                                                                      |
| --------- | ---------------------------------------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Cache Components)              |
| Linguagem | TypeScript (strict)                                                          |
| Estilo    | [Tailwind CSS v4](https://tailwindcss.com), paleta GitHub Dark em tokens CSS |
| i18n      | nativo do Next: `proxy.ts` + `next/root-params`, rotas `/pt` e `/en`         |
| Fontes    | Geist (texto) e JetBrains Mono (interface de terminal)                       |
| Ícones    | [lucide-react](https://lucide.dev) + SVGs de marca inline                    |

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
│   ├── globals.css        # paleta e utilitários
│   ├── sitemap.ts, robots.ts, icon.svg
├── components/
│   ├── ascii/             # motor das figuras (AsciiCanvas, renderers, PointerGlow)
│   ├── layout/            # Header, Footer, LocaleSwitcher
│   ├── sections/          # Hero, Projects, Experience, Education, About, Contact
│   └── ui/                # Section, Card, Tag, Button, CopyButton, Typewriter
├── content/               # todo o conteúdo do site (PT e EN)
├── i18n/                  # idiomas e dicionários da interface
└── proxy.ts               # redireciona / para o idioma do navegador
public/figures/            # imagens-fonte das figuras
scripts/prepare-figures.py # prepara a imagem das mãos
```

## Editando o conteúdo

Todo o texto do site fica em dois lugares. Nenhum componente precisa ser alterado.

| Arquivo                            | O quê                                                |
| ---------------------------------- | ---------------------------------------------------- |
| `src/content/profile.ts`           | nome, cargo, resumo, "sobre mim", stack, URL do site |
| `src/content/projects.ts`          | projetos (`ai: true` exibe o selo de IA)             |
| `src/content/experience.ts`        | experiências (sem `end` = emprego atual)             |
| `src/content/education.ts`         | formação acadêmica e certificações                   |
| `src/content/contact.ts`           | WhatsApp, e-mail, LinkedIn e GitHub                  |
| `src/i18n/dictionaries/{pt,en}.ts` | textos da interface: menu, botões, títulos, rodapé   |

Os campos traduzidos usam o formato `{ pt: "...", en: "..." }`.

## Figuras em ASCII

[`AsciiCanvas`](src/components/ascii/AsciiCanvas.tsx) carrega uma imagem de `public/figures/` e mede o brilho de cada célula de uma grade. Depois redesenha cada célula num destes modos: quanto mais clara a área, mais denso o caractere ou maior o ponto.

| `mode`     | Resultado                                  |
| ---------- | ------------------------------------------ |
| `ascii`    | caracteres de uma rampa, como ` .:-=+*#%@` |
| `binary`   | dígitos 0/1 que alternam devagar           |
| `halftone` | pontos com raio proporcional ao brilho     |

Com `cycle`, os caracteres chegam de posições aleatórias, formam a figura, ficam alguns segundos e se dispersam, em loop.

| Figura          | Seção       | Modo              | Celular |
| --------------- | ----------- | ----------------- | :-----: |
| `saturn.svg`    | início      | `ascii` + `cycle` |   sim   |
| `satellite.svg` | projetos    | `binary`          |   não   |
| `chip.svg`      | projetos    | `ascii`           |   não   |
| `folder.svg`    | experiência | `ascii` + `cycle` |   não   |
| `eye.svg`       | sobre       | `ascii`           |   não   |
| `hands.png`     | contatos    | `halftone`        |   sim   |

Os SVGs são desenhos autorais. Para criar uma figura nova, basta desenhar uma imagem em tons de cinza com fundo transparente e usá-la num `<Figure src="…" mode="…" />`.

Para regerar a imagem das mãos a partir de outra fonte:

```bash
pip install pillow
python scripts/prepare-figures.py --hands maos.png
```

## Deploy

O projeto funciona na [Vercel](https://vercel.com) sem configuração extra. Defina a variável de ambiente abaixo para o sitemap e os metadados usarem o domínio certo:

```bash
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

---

<p align="center"><sub>feito com ☕ e Claude</sub></p>
