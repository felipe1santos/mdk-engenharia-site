# Site institucional — MDK Engenharia

Site da MDK Engenharia e Arquitetura LTDA - ME (São Paulo/SP). Astro 5 + Tailwind 4,
saída estática.

São 18 páginas: home, institucional, portfólio, áreas de atuação, contato e uma página por
disciplina de serviço.

| Rota | Conteúdo |
|---|---|
| `/` | Home |
| `/sobre` | História, missão/visão/valores e direção técnica |
| `/servicos` | Índice das frentes, divididas entre projeto e obra |
| `/servicos/[slug]` | Uma página por disciplina — escopo, entregáveis, normas e FAQ |
| `/servicos/regularizacao/[slug]` | Prefeitura, Corpo de Bombeiros e CETESB — o que resolvemos em cada órgão |
| `/projetos` | Obras em andamento e concluídas |
| `/areas-de-atuacao` | Cobertura presencial e remota, cidades atendidas e mapa |
| `/contato` | Canais de contato, fluxo do orçamento e mapa |

As páginas de serviço são geradas de `src/data/services.ts`. Serviço sem o campo `detail`
não vira rota — é o mecanismo para publicar em etapas sem deixar link quebrado.

Especificação: [`docs/superpowers/specs/2026-08-02-mdk-home-design.md`](docs/superpowers/specs/2026-08-02-mdk-home-design.md)
Plano dos ajustes do cliente: [`docs/superpowers/plans/2026-08-05-ajustes-cliente.md`](docs/superpowers/plans/2026-08-05-ajustes-cliente.md)

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Serve o `dist/` já construído |
| `npm run check` | Verificação de tipos (`astro check`) |
| `npm run fetch:images` | Baixa as imagens do Pexels (rodar uma vez) |
| `npm run build:logo` | Extrai o logo e o favicon da arte da marca |

## Onde editar o conteúdo

Nenhum componente contém texto de negócio. Tudo vive em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `site.ts` | Razão social, CNPJ, endereço, telefone, WhatsApp, e-mail, horário, redes, SEO |
| `services.ts` | Disciplinas de projeto e frentes de execução/consultoria |
| `institutional.ts` | Missão, Visão, Valores e textos da seção "Sobre" |
| `team.ts` | Direção técnica e equipe |
| `renders.ts` | Estudos em 3D exibidos na home e em `/projetos` |
| `agencies.ts` | Prefeitura, Corpo de Bombeiros e CETESB — serviços, etapas, base legal e FAQ |
| `cities.ts` | Cidades atendidas (SEO local e `areaServed` do JSON-LD) |
| `stats.ts` | Números da faixa laranja |
| `testimonials.ts` | Depoimentos |
| `portfolio.ts` | Obras realizadas |
| `navigation.ts` | Menu e links do rodapé |

Trocar o telefone, por exemplo, é editar `site.ts` — o rodapé, o mapa, o link do WhatsApp e
o dado estruturado passam a usar o valor novo automaticamente.

## Conteúdo pendente

Está tudo marcado com `PLACEHOLDER` em `src/data/`. Blocos com dados fictícios aparecem no
site com um contorno tracejado e a etiqueta **conteúdo a confirmar** — o marcador some
sozinho quando a flag `placeholder` sai do arquivo de dados.

> ### ⚠️ Antes de tirar o `noindex` e divulgar
>
> **Os depoimentos em `src/data/testimonials.ts` são fictícios.** Foram escritos como
> conteúdo de demonstração enquanto o perfil no Google Meu Negócio não existe. Publicar
> depoimento fabricado em site comercial é publicidade enganosa (CDC, art. 37). Substituir
> por avaliações reais antes de liberar a indexação. A flag `fictitious` marca cada item.

Falta o cliente fornecer:

- Horário de atendimento real
- **Depoimentos reais autorizados** (ver aviso acima)
- Números reais de projetos, obras e m² (anos de mercado já sai da fundação em 2010)
- Nome completo da Diretora Administrativa e o CREA/CAU dos responsáveis técnicos
  (`src/data/team.ts`)
- Confirmar se a foto da "Residência NK" é obra da MDK (`src/data/portfolio.ts`)
- Quais disciplinas de projeto são assinadas com equipe própria e quais com parceiro
- **Logo em vetor** (`.ai`, `.svg` ou `.pdf`). Só existe um JPEG de 802 px; o logo atual foi
  extraído dele e fica levemente suave em telas retina
- **Decisão sobre o "K"**: na arte do manual o símbolo é `|<` — coluna de armação à esquerda,
  chevron abrindo para a direita. O cliente pediu a orientação oposta, `>|`: chevron com a boca
  virada para o "D" e a coluna à direita, servindo de haste. `scripts/extract-logo.mjs` espelha
  o bloco inteiro (coluna + chevron) uma única vez, e navbar, rodapé, símbolo e favicon derivam
  daí. Registrar essa versão como oficial junto ao designer, sobretudo porque o pedido no INPI
  (nº 941017087) está em exame e o manual atribui significado ao "K INVERTIDO"
- Confirmação das coordenadas do endereço (ver nota em `src/data/site.ts`)

Plano dos ajustes pedidos pelo cliente:
[`docs/superpowers/plans/2026-08-05-ajustes-cliente.md`](docs/superpowers/plans/2026-08-05-ajustes-cliente.md)

### Marca registrada

O pedido no INPI (nº 941017087) ainda está **em exame**. O site não pode usar "®" nem a
expressão "Marca Registrada" — só o nome. Revisar quando o registro for concedido.

## Imagens

Há três origens em `src/assets/images/`:

| Prefixo | Origem | Observação |
|---|---|---|
| `service-*` | Acervo da MDK (site anterior) | Pranchas técnicas, exibidas com `object-contain` sobre fundo branco. Quatro delas vieram entre 301 px e 430 px e ficam suaves em tela retina — pedir os arquivos originais ao cliente |
| `obra-*`, `equipe-*` | Acervo da MDK | Fotos reais. As da equipe são recortadas em 4:5 e uniformizadas por CSS em `Team.astro` |
| `render-*` | Acervo da MDK | Renders 3D extraídos do PDF de apresentação enviado pelo cliente, em resolução original |
| `hero`, `about`, `cta`, `portfolio-*` | Pexels | Banco de imagens, via `npm run fetch:images` |

`npm run fetch:images` lê `PEXELS_API_KEY` de `.env` (copie de `.env.example`) e baixa as
fotos para `src/assets/images/`.

Roda **uma vez, localmente**. A chave não entra no bundle: o site publicado não faz nenhuma
requisição ao Pexels. As imagens são otimizadas para WebP/AVIF durante o build.

Para trocar uma foto, edite a lista `WANTED` em `scripts/fetch-images.mjs`, apague o arquivo
correspondente em `src/assets/images/` e rode o comando de novo. O campo `pick` escolhe qual
resultado da busca usar, já que o primeiro nem sempre é o melhor.

## Ambientes

| | Preview | Produção |
|---|---|---|
| Domínio | `mdk.nr1sistema.com.br` | `www.mdkengenharia.com.br` |
| `PUBLIC_SITE_URL` | (padrão) | `https://www.mdkengenharia.com.br` |
| `PUBLIC_NOINDEX` | (padrão: `true`) | `false` |
| Indexação | bloqueada | liberada |

O padrão do build é o **preview, com indexação bloqueada**. É deliberado: se as
variáveis não chegarem ao build, o pior resultado possível é um preview
corretamente marcado — nunca um site indexado por engano no domínio errado.

Preview indexado é problema real: vira conteúdo duplicado competindo com o
domínio definitivo e coloca a marca do cliente num domínio de terceiro nos
resultados de busca.

### Checklist de lançamento

1. Apontar o DNS de `mdkengenharia.com.br` para a VPS
2. No Coolify, definir as duas variáveis acima como **Build Variables**
3. Trocar o domínio da aplicação no Coolify e emitir o certificado
4. Redeploy e conferir `/robots.txt` e a meta `robots` no HTML
5. Preencher o conteúdo pendente listado acima antes de divulgar

## Deploy (Coolify na VPS)

O repositório traz `Dockerfile` e `nginx.conf` prontos. No Coolify:

1. Nova aplicação → origem GitHub → este repositório
2. Build pack: **Dockerfile**
3. Porta exposta: **80**
4. Domínio: apontar o DNS e deixar o Coolify emitir o certificado

O build roda `npm ci && npm run build` em `node:22-alpine` e a imagem final é um
`nginx:alpine` servindo só os arquivos estáticos — sem Node em produção.

Testar a imagem localmente:

```bash
docker build -t mdk-site .
docker run --rm -p 8080:80 mdk-site
```

O domínio e a indexação vêm das variáveis de ambiente descritas em
[Ambientes](#ambientes) — não há URL fixa no código. O `robots.txt` é gerado no build
por `src/pages/robots.txt.ts`.

## Estrutura

```
src/
  data/          conteúdo do site (fonte única)
  layouts/       BaseLayout.astro — <head>, SEO, JSON-LD
  components/
    layout/      Navbar, Footer, PageHero, WhatsAppFab
    home/        seções da home, reaproveitadas nas páginas internas
    ui/          Section, SectionTitle, Button, Icon
  lib/images.ts  resolve chaves de imagem para os arquivos
  scripts/       reveal.ts — animações de rolagem
  pages/         index, sobre, servicos/, projetos, areas-de-atuacao, contato
scripts/         fetch-images.mjs, extract-logo.mjs
```

As seções em `components/home/` aceitam props e são reaproveitadas nas páginas internas
(`About`, `Team`, `Portfolio`, `ServiceAreas`, `MapSection`, `FinalCta`). O objetivo é que
a mesma informação nunca exista em dois markups diferentes — mudar o texto em `src/data/`
atualiza todas as páginas que o exibem.
