# Site institucional MDK Engenharia — Home

Data: 2026-08-02
Status: aprovado para implementação

## Contexto

MDK Engenharia e Arquitetura LTDA - ME (CNPJ 27.333.759/0001-42), São Paulo/SP. Empresa de
engenharia civil com pedido de marca no INPI sob nº 941017087, classe NCL(12) 37, protocolado
em 10/09/2025 e ainda em exame.

O objetivo desta entrega é a **home** de um site institucional: validar design, branding e
estrutura de SEO antes de construir as demais páginas. A navbar já contém todos os links
finais; as páginas internas vêm depois.

### Foco comercial

Serviços primários (destaque na home): projetos de instalações hidráulicas, projetos de
instalações elétricas, documentação e regularização de obras.

Serviços secundários: projetos de edificações, execução e reforma, impermeabilização,
consultoria e supervisão de obra.

## Branding

Paleta amostrada diretamente da arte oficial (`WhatsApp Image 2026-07-30 at 17.09.39.jpeg`):

| Token | Hex | Uso |
|---|---|---|
| `navy-900` | `#061225` | fundos profundos, rodapé |
| `navy-800` | `#0A1C38` | cor-marca principal, navbar sólida |
| `navy-700` | `#12294F` | cards elevados, bordas |
| `orange-500` | `#E85C00` | CTA, destaques, faixa de números |
| `orange-400` | `#FF6B0A` | hover |
| `off-white` | `#F5F6F8` | fundo de seções alternadas |

Tagline do manual: **Planejamento · Execução · Compromisso**. Valores associados:
Segurança · Qualidade · Prazo · Resultados.

O "K" invertido do logo representa rigidez estrutural; a textura de armação de coluna
representa estabilidade e solidez. Esse significado aparece na seção Sobre.

Tipografia: Montserrat (títulos) e Inter (corpo), self-hosted via `@fontsource` — sem
requisição a Google Fonts, o que remove um bloqueio de render e um vazamento de IP do
visitante para terceiros.

## Decisões

### Stack

Astro 5 + Tailwind 4 + TypeScript, saída estática (`output: 'static'`).

Astro em vez de Next.js porque a home é conteúdo estático cuja única métrica é ranquear:
HTML pré-renderizado sem runtime de framework entrega o melhor LCP possível. Componentes
`.astro` eliminam a duplicação de navbar/rodapé que HTML puro traria nas 6 páginas futuras.

### Hospedagem

GitHub → VPS Hostinger via Coolify. `Dockerfile` multi-stage: build em `node:22-alpine`,
runtime `nginx:alpine` servindo `dist/`. `nginx.conf` com gzip, cache imutável em
`/_astro/*` e fallback 404.

### Imagens

Script `scripts/fetch-images.mjs` executado **uma vez, localmente**. Lê `PEXELS_API_KEY` de
`.env` (gitignored), baixa as fotos para `src/assets/images/` e grava créditos em
`src/data/images.json`.

A chave nunca entra no bundle: o site publicado não faz nenhuma chamada ao Pexels. As
imagens são otimizadas para WebP/AVIF em build time por `astro:assets`, com `width`/`height`
explícitos para evitar CLS.

### Mapa

Google Maps Embed via `<iframe>`, sem chave de API. A alternativa (Maps JavaScript API)
exigiria chave, conta de faturamento e exporia a chave no cliente, entregando o mesmo
resultado visual. `loading="lazy"` e `referrerpolicy="no-referrer-when-downgrade"`.

### Animações de rolagem

`IntersectionObserver` próprio, sem biblioteca: fade + subida ao entrar na viewport, stagger
em grids, contadores animados, navbar que encolhe, parallax leve no hero.

AOS e GSAP foram descartados: adicionam peso de JS a um site cujo produto é a posição no
Google. Todo movimento é suprimido sob `prefers-reduced-motion: reduce`.

## Arquitetura

```
src/
  data/          site.ts services.ts cities.ts stats.ts
                 testimonials.ts portfolio.ts navigation.ts
  layouts/       BaseLayout.astro
  components/
    layout/      Navbar.astro Footer.astro WhatsAppFab.astro
    home/        Hero TrustBar MainServices SecondaryServices About
                 StatsBand Portfolio Testimonials ServiceAreas
                 MapSection FinalCta
    ui/          Section.astro Button.astro Reveal.astro SectionTitle.astro
  pages/         index.astro
  scripts/       reveal.ts
  styles/        global.css
```

**Regra de isolamento:** nenhum componente contém texto de negócio no corpo. Todo conteúdo
— telefone, endereço, serviços, cidades, números, depoimentos — vive em `src/data/`. Trocar
o telefone é editar um arquivo, não caçar em dez componentes. Cada componente recebe seus
dados por props ou importa um único módulo de `data/`, e pode ser lido sem abrir os outros.

`site.ts` é a fonte única do NAP (nome, endereço, telefone). O JSON-LD, o rodapé, a seção de
mapa e o link do WhatsApp derivam todos dele, o que impede o dado divergir entre partes da
página — divergência de NAP prejudica ranqueamento local.

## Seções da home

Ordem de rolagem:

1. **Navbar** — sticky. Transparente sobre o hero, `navy-800` sólida com sombra ao rolar.
   Logo à esquerda, clicável, leva a `/`. Links: Home, Serviços, Projetos, Sobre, Áreas de
   Atuação, Contato. CTA laranja "Solicitar Orçamento" abre o WhatsApp. Mobile: hambúrguer
   com drawer full-screen. Links de páginas ainda não construídas apontam para âncoras da
   home.
2. **Hero** — foto de fundo, overlay gradiente `navy-900`, H1 com a proposta de valor,
   subtítulo, dois CTAs, indicador de scroll.
3. **TrustBar** — faixa com os três pilares do manual.
4. **MainServices** — três cards com foto, ícone, título e descrição.
5. **SecondaryServices** — grid compacto dos demais serviços.
6. **About** — texto institucional e o significado do K invertido, com imagem.
7. **StatsBand** — faixa laranja diagonal com contadores animados.
8. **Portfolio** — grid de obras com overlay no hover.
9. **Testimonials** — carrossel de depoimentos.
10. **ServiceAreas** — cidades atendidas, imediatamente acima do rodapé.
11. **MapSection** — mapa incorporado e card de endereço com botão "Como chegar".
12. **FinalCta** — faixa `navy-800` com chamada para orçamento.
13. **Footer** — quatro colunas (marca, serviços, institucional, contato) e barra inferior
    com razão social e CNPJ.
14. **WhatsAppFab** — botão flutuante fixo.

Todo elemento interativo usa `cursor: pointer`.

## SEO

- `lang="pt-BR"`, title, meta description, canonical, Open Graph e Twitter Card.
- H1 único no hero; hierarquia H2/H3 consistente.
- `alt` descritivo em toda imagem.
- `sitemap.xml` e `robots.txt` via `@astrojs/sitemap`.
- JSON-LD `ProfessionalService`: nome legal, endereço postal, geo, telefone, e-mail,
  `areaServed` com as cidades, horário de funcionamento, `sameAs`.

Cidades alvo (14, zona norte de São Paulo e Grande SP): São Paulo, Guarulhos, Osasco,
Barueri, Santana de Parnaíba, Caieiras, Franco da Rocha, Mairiporã, Cajamar, Carapicuíba,
Taboão da Serra, Cotia, Santo André, São Bernardo do Campo.

Cada cidade aparece com uma frase natural do serviço correspondente. O número foi limitado
deliberadamente: listas exaustivas de combinações serviço × cidade configuram doorway
content e são penalizadas pelo Google. Quatorze entradas bem escritas rendem mais que cem
empilhadas.

## Conteúdo pendente

Marcado no código como `PLACEHOLDER` e concentrado em `src/data/`:

- Telefone, WhatsApp, e-mail e horário de atendimento.
- Depoimentos e nomes de clientes.
- Números da faixa de estatísticas.
- Fotos reais de obras (hoje: banco de imagens).
- Logo em vetor. Só existe um JPEG de 802 px; o logo da navbar foi recortado dele e ficará
  levemente suave em telas retina. Solicitar `.ai`/`.svg`/`.pdf` ao designer antes de
  publicar.

Endereço e CNPJ vêm do registro INPI: Rua Carlos Duarte Ferreira, 83 — Jardim Peri, São
Paulo/SP, CEP 02650-020.

## Restrições

**Marca não registrada.** O pedido INPI está em exame. O site não pode usar "®" nem a
expressão "Marca Registrada" — seria declaração falsa. Usar apenas o nome. Revisar quando o
INPI conceder.

**Sem números ou depoimentos inventados.** Placeholders ficam visivelmente marcados até o
cliente fornecer os dados reais.

## Verificação

- `npm run build` conclui sem erros nem avisos.
- Screenshots em 375 px, 768 px e 1440 px.
- Checklist manual: âncoras resolvem, toda imagem tem `alt`, contraste AA nos textos sobre
  fundo escuro, JSON-LD válido, nenhum segredo em `dist/`.

Sem testes unitários: a entrega é markup estático e um observador de rolagem de quarenta
linhas. Não há lógica de domínio a testar, e suíte sem asserção de valor é cerimônia.
