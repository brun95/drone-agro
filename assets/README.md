# Imagens do site SkyPlant

Cada pasta corresponde a uma **secção** da página. Para trocar uma imagem,
substitua o ficheiro **mantendo o mesmo nome** — o site passa a mostrá-la
automaticamente, sem mexer no código.

As imagens atuais são **placeholders** (fundo verde com etiqueta). Basta
substituí-las pelas fotos reais com o mesmo nome e dimensões recomendadas.

> Dica: exporte as fotos em **JPG** (ou WebP) já com o tamanho indicado.
> Fotos muito maiores tornam o site lento; use uma qualidade ~80%.

---

## Mapa das pastas → secções do site

| Pasta | Secção no site | Ficheiro(s) | Dimensão (px) |
|---|---|---|---|
| `hero/` | Cabeçalho principal (fundo) | `hero-vineyard.jpg` | 1920×1080+ |
| `sobre/` | "Quem Somos" (foto lateral) | `equipa.jpg` | 1000×750 |
| `servicos/pulverizacao/` | Cartão + galeria "Pulverização & Aplicação" | `card.jpg`, `galeria-1…4.jpg` | card 600×340 · galeria 1200×800 |
| `servicos/sementeira/` | Cartão + galeria "Sementeira & Dispersão Aérea" | `card.jpg`, `galeria-1…4.jpg` | card 600×340 · galeria 1200×800 |
| `servicos/monitorizacao/` | Cartão + galeria "Monitorização & Saúde das Culturas" | `card.jpg`, `galeria-1…4.jpg` | card 600×340 · galeria 1200×800 |
| `servicos/transporte/` | Cartão + galeria "Transporte & Logística Aérea" | `card.jpg`, `galeria-1…4.jpg` | card 600×340 · galeria 1200×800 |
| `culturas/` | Secção "Culturas" | `olival.jpg`, `vinha.jpg`, `arroz.jpg`, `amendoal.jpg`, `cereais.jpg` | 400×530 (retrato) |
| `share/` | Imagem de partilha (WhatsApp/Facebook/Google) | `og-cover.jpg` | 1200×630 |
| `galeria/` | Portfólio — **secção oculta** (ver nota) | `destaque-vertical.jpg` (400×700), `ndvi-vinha.jpg` (600×340), `sementeira-cereais.jpg` (600×340), `vista-aerea.jpg` (900×400), `fertilizacao-arroz.jpg` (400×400) | conforme indicado |
| `testemunhos/` | Testemunhos — **secção oculta** (ver nota) | `manuel.jpg`, `ana.jpg`, `joao.jpg` | 160×160 (quadrado) |

`favicon.svg` — ícone do separador do navegador (não é foto).

---

## Como funcionam as galerias dos serviços

Cada cartão de serviço abre uma **galeria (lightbox)** ao ser clicado, com as 4
imagens `galeria-1.jpg … galeria-4.jpg` dessa pasta. Para acrescentar ou remover
imagens da galeria, edite o atributo `data-gallery="…"` do respetivo
`<article class="service-card">` em `index.html` (lista de caminhos separada por `|`).

## Secções ocultas (`galeria/` e `testemunhos/`)

As secções **Portfólio** e **Testemunhos** estão comentadas no `index.html`
(`<!-- ... -->`). As imagens já estão preparadas; para as ativar, retire os
comentários dessas secções no `index.html`.

## Imagem de partilha (`share/og-cover.jpg`)

É a miniatura que aparece ao partilhar o link. O código aponta para o URL
absoluto `https://brun95.github.io/drone-agro/assets/share/og-cover.jpg`.
Quando o domínio final (ex.: `skyplant.pt`) estiver ativo, atualize esse URL
nas meta tags `og:image` / `twitter:image` e no bloco de dados estruturados.
