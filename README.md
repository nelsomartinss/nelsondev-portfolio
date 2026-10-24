# nelson.dev

Portfólio pessoal de um desenvolvedor de software: fullstack, com foco em IA.

Interface minimalista "text-first" no estilo GitHub, com figuras de fundo desenhadas em ASCII, binário e halftone num `<canvas>`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com): tokens de tema em `src/app/globals.css`
- i18n nativo do Next (`proxy.ts` + `next/root-params`): rotas `/pt` e `/en`
- Fontes: Geist (texto) e JetBrains Mono (UI de terminal)

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
npm run format
```

## Editando o conteúdo

Todo o conteúdo fica em `src/content/`, com campos traduzidos (`{ pt, en }`):

| Arquivo         | O quê                                              |
| --------------- | -------------------------------------------------- |
| `profile.ts`    | nome, cargo, resumo, sobre mim, stack, URL do site |
| `projects.ts`   | projetos (marque `ai: true` para o selo de IA)     |
| `experience.ts` | experiências (sem `end` = emprego atual)           |
| `education.ts`  | formação acadêmica e certificações                 |
| `contact.ts`    | WhatsApp, e-mail, LinkedIn e GitHub                |

Os textos da interface (menus, botões, rodapé) ficam em `src/i18n/dictionaries/`.

Defina `NEXT_PUBLIC_SITE_URL` no deploy para gerar sitemap e metadados com o domínio certo.

## Figuras de fundo

`src/components/ascii/AsciiCanvas.tsx` lê uma imagem de `public/figures/`, amostra a luminância numa grade e redesenha cada célula de acordo com o modo escolhido:

| `mode`     | Resultado                              |
| ---------- | -------------------------------------- |
| `ascii`    | caracteres da rampa ` .:-=+*#%@`       |
| `binary`   | dígitos 0/1                            |
| `halftone` | pontos com raio proporcional ao brilho |

As figuras são imagens em tons de cinza (SVG ou PNG): quanto mais claro, mais denso. Para criar outra, basta passá-la para `<Figure src=… mode=… />`.

| Figura          | Seção           | Origem                                          |
| --------------- | --------------- | ----------------------------------------------- |
| `saturn.svg`    | início          | desenho autoral, ASCII que se forma e se desfaz |
| `satellite.svg` | projetos (esq.) | desenho autoral, em binário 0/1                 |
| `chip.svg`      | projetos (dir.) | desenho autoral                                 |
| `folder.svg`    | experiência     | desenho autoral, ASCII que se forma e se desfaz |
| `eye.svg`       | sobre           | desenho autoral                                 |
| `hands.png`     | contatos        | imagem das mãos ("Criação de Adão")             |

O Saturno e a pasta usam `cycle` no `AsciiCanvas`: os caracteres chegam de posições aleatórias, formam a figura, ficam alguns segundos e se dispersam, em loop. Perto do mouse eles são empurrados, brilham e embaralham.

Para regerar a imagem das mãos a partir de outra fonte, use `scripts/prepare-figures.py`:

```bash
pip install pillow
python scripts/prepare-figures.py --hands maos.png
```

O brilho que segue o mouse pela página inteira é o `PointerGlow`, uma grade de caracteres fixa atrás do conteúdo.

A animação pausa fora da tela e respeita `prefers-reduced-motion`.
