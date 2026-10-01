# Entrega do projeto — Website SkyPlant

Documento de entrega para publicação em **https://skyplant.pt**.

---

## 1. O que é este projeto

Website **estático** (institucional / landing page) da SkyPlant.

- **Tecnologia:** HTML + CSS + JavaScript puro (vanilla). **Sem framework, sem build, sem dependências.**
- Não é preciso Node, npm, nem compilar nada. Os ficheiros servem-se tal como estão.
- Idioma: Português (PT-PT).

## 2. Como publicar

Basta servir o conteúdo desta pasta a partir da **raiz** do domínio `skyplant.pt`, de modo a que `index.html` fique acessível em `https://skyplant.pt/`.

Funciona em qualquer alojamento de sites estáticos ou servidor web comum:
- Apache / Nginx / LiteSpeed (cPanel, Plesk, etc.) — copiar os ficheiros para a pasta pública (ex.: `public_html/`).
- Ou serviços como Netlify, Vercel, Cloudflare Pages, GitHub Pages.

**Nada de especial a configurar no servidor** além de:
- Garantir **HTTPS** ativo (certificado SSL) — os URLs internos (canonical, Open Graph) já assumem `https://skyplant.pt`.
- A página de erro 404 é opcional (não incluída).

### Estrutura de ficheiros
```
index.html                     → página principal
politica-de-privacidade.html   → página legal
termos-e-condicoes.html        → página legal
robots.txt / sitemap.xml       → SEO
css/style.css                  → todo o estilo
js/main.js                     → toda a interação (sem dependências)
assets/                        → imagens, logótipo e ícone
  logo.png, icon.png           → logótipo e favicon
  hero/                        → imagem de fundo do cabeçalho
  servicos/<serviço>/          → foto de cada card de serviço (card.jpg|png)
  culturas/                    → foto de cada cultura (jpg|jpeg|png)
  galeria/, sobre/, share/     → restantes imagens
```

## 3. Já está feito (não é preciso mexer)

- ✅ Todos os URLs internos apontam para **https://skyplant.pt** (canonical, Open Graph, Twitter, sitemap, robots, dados estruturados).
- ✅ Email de contacto definido: **comercial@skyplant.pt**.
- ✅ Favicon / ícone do separador e logótipo configurados.
- ✅ SEO base: meta tags, Open Graph (pré-visualização de links), `sitemap.xml`, `robots.txt`, dados estruturados (LocalBusiness).

## 4. ⚠️ Pendente / a confirmar antes do lançamento

| # | Assunto | Detalhe |
|---|---------|---------|
| 1 | **Otimizar imagens** | Algumas fotos estão muito pesadas (ver secção 5). Para desempenho web deviam ser comprimidas. **Recomendado fazer antes de ir para o ar.** |
| 2 | **Formulário de contacto** | Atualmente usa `mailto:` — abre o programa de email do visitante, **não envia para um servidor**. Para receber pedidos de forma fiável, integrar um backend (ex.: [Formspree](https://formspree.io)) alterando o `action`/lógica em `js/main.js`. |
| 3 | **Vídeo do cabeçalho (hero)** | Previsto substituir a imagem de fundo por um vídeo; **ainda não implementado** (continua a imagem). O vídeo original tem de ser muito comprimido para web (alvo: < 10 MB). |
| 4 | **Galerias dos cards de Serviços** | Ao clicar num card abre um portefólio (`data-gallery` em `index.html`) que aponta para ficheiros `galeria-1..4.jpg` que ainda não existem nas pastas. Adicionar as fotos ou atualizar os nomes. |
| 5 | **Confirmar HTTPS** | Garantir certificado SSL válido em skyplant.pt. |
| 6 | **Email ativo** | Confirmar que `comercial@skyplant.pt` existe e está a ser lido. |

## 5. Imagens a otimizar (as mais pesadas)

Alvo recomendado: ~200–400 KB por foto (atualmente muitas estão em vários MB).

```
assets/culturas/arroz.jpg                       15 MB
assets/culturas/olival.jpg                      9.8 MB
assets/servicos/transporte/Transporte - Carga.jpg  9.2 MB
assets/culturas/pomares.jpeg                    8.1 MB
assets/culturas/amendoal.jpg                    8.1 MB
assets/culturas/vinha.jpg                       4.1 MB
assets/culturas/milho.png                       4.1 MB
```

Sugestão: redimensionar para máx. ~1920 px de largura e exportar como JPEG qualidade ~80 (ou WebP). Ferramentas: [Squoosh](https://squoosh.app), ImageMagick, ou o próprio fluxo da empresa.

> Nota: nomes de ficheiros com **espaços e acentos** (ex.: `Transporte - Carga.jpg`, `Monitorizaçao saude culturas…png`) devem ser evitados na web. Preferir minúsculas, sem espaços nem acentos (ex.: `transporte-carga.jpg`).

## 6. Notas técnicas úteis

- **Imagens de culturas e serviços têm fallback de extensão automático** (via `js/main.js`): o site tenta carregar `.jpg`, depois `.jpeg`, depois `.png`. Manter os nomes em minúsculas.
- Se faltar a foto de um serviço, o card mostra um placeholder "Imagem em breve" em vez de um ícone de imagem partida.
- O site é **case-sensitive** em servidores Linux — manter extensões e nomes de ficheiros exatamente como referenciados no HTML.

---

*Projeto entregue por [o teu nome/empresa]. Para dúvidas sobre o código durante a transição, contactar [o teu contacto].*
