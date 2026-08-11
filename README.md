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

> ### 🔴 O site está indexável com depoimentos fictícios
>
> **Os depoimentos em `src/data/testimonials.ts` são fictícios.** Foram escritos como
> conteúdo de demonstração enquanto o perfil no Google Meu Negócio não existe. A flag
> `fictitious` marca cada item.
>
> Em 05/08/2026 o `PUBLIC_NOINDEX` foi para `false` em produção, a pedido do cliente,
> **com os depoimentos ainda fictícios**. O risco foi apontado e a decisão de publicar
> assim mesmo é dele. Publicar depoimento fabricado em site comercial é publicidade
> enganosa (CDC, art. 37), e a exposição é da MDK, não de quem hospeda.
>
> Substituir por avaliações reais e autorizadas é a pendência mais urgente do projeto.
> Enquanto não houver, o caminho reversível é voltar `PUBLIC_NOINDEX=true` no Coolify e
> redeployar — leva um minuto e tira o conteúdo do índice.

Falta o cliente fornecer:

- Horário de atendimento real
- **Depoimentos reais autorizados** (ver aviso acima)
- Números reais de projetos, obras e m² (anos de mercado já sai da fundação em 2010)
- Nome completo da Diretora Administrativa e o CREA/CAU dos responsáveis técnicos
  (`src/data/team.ts`)
- Confirmar se a foto da "Residência NK" é obra da MDK (`src/data/portfolio.ts`)
- Quais disciplinas de projeto são assinadas com equipe própria e quais com parceiro
- **Fotos de obra em resolução original**, para os banners das páginas internas (ver
  [Ressalvas do lote](#ressalvas-do-lote-enviado-em-11082026))
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

Há quatro origens em `src/assets/images/`:

| Prefixo | Origem | Observação |
|---|---|---|
| `service-*` | Acervo da MDK (site anterior) | Pranchas técnicas, exibidas com `object-contain` sobre fundo branco. Quatro delas vieram entre 301 px e 430 px e ficam suaves em tela retina — pedir os arquivos originais ao cliente |
| `obra-*`, `equipe-*` | Acervo da MDK | Fotos reais. As da equipe são recortadas em 4:5 e uniformizadas por CSS em `Team.astro` |
| `render-*` | Acervo da MDK | Renders 3D extraídos do PDF de apresentação enviado pelo cliente, em resolução original |
| `banner-*`, `apoio-*`, `servico-projetos` | Enviadas pelo cliente (ajustes R01) | Já em `.webp`. Fotos de banco de terceiro, com resolução baixa — ver ressalva abaixo |
| `hero`, `about`, `cta`, `portfolio-*` | Pexels | Banco de imagens, via `npm run fetch:images` |

`src/lib/images.ts` aceita `.jpg` e `.webp` no mesmo diretório. O acervo antigo é JPEG; material
novo entra direto em WebP. A chave é o nome do arquivo sem extensão, então os dois convivem.

### Ressalvas do lote enviado em 11/08/2026

**Uma imagem não foi usada.** `18fa34f9…jpg` traz a faixa "Adobe Stock #851644146" impressa na
lateral. É arquivo de comparação, não licenciado; publicar assim é uso indevido de obra
protegida.

**Três imagens foram usadas por decisão expressa do cliente, com ressalva registrada.** Elas
são as capas dos cards de órgão em "O que fazemos" (`agency.cover` em `src/data/agencies.ts`):

- `BOMBEIRO.jpg` é o brasão do Corpo de Bombeiros da PM-SP e `CETESB.jpg` é o logotipo da
  CETESB. **Exibir a marca de um órgão público num card de serviço sugere credenciamento ou
  vínculo que a MDK não tem.** A ressalva foi apresentada duas vezes — inclusive com a
  alternativa em fotografia já implementada e no ar — e o cliente confirmou os arquivos em
  11/08/2026. A decisão é dele. Trocar de volta é editar `cover` e `coverFit` de cada órgão:
  as fotos de contexto continuam no acervo, em `agency.image`, usadas pela seção `Agencies`
  das páginas internas.
- `PREFEITURA.jpg` é ilustração gerada por IA com texto inventado e ilegível ("JUBOR",
  "LEGICI", "LABOR LAW") e tema de direito trabalhista, não de prefeitura. Idem: apontado e
  confirmado.

Brasão e logotipo entram com `object-contain` sobre fundo claro, não `object-cover` — recortar
um logo decepa justamente o desenho que identifica o órgão.

As demais fotos do lote são utilizáveis, mas vieram entre 626 px e 1199 px de largura. Como
banner de primeira dobra elas são ampliadas e ficam suaves em tela retina. **Pedir ao cliente os
arquivos em resolução original**, ou fotos reais de obra da própria MDK, que resolveriam
resolução e identidade de uma vez.

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

Estado em 05/08/2026:

- [x] Variáveis definidas no Coolify como Build Variables, ambas com **Available at
      Buildtime** marcado — sem isso elas não chegam aos `ARG` do `Dockerfile`
- [x] `PUBLIC_SITE_URL=https://www.mdkengenharia.com.br` e `PUBLIC_NOINDEX=false`
- [x] Domínio final adicionado no Coolify, ao lado do de preview
- [x] `/robots.txt`, a meta `robots`, o canonical e o sitemap conferidos no ar
- [ ] **Apontar o DNS** de `mdkengenharia.com.br` para a VPS (`187.77.34.112`, registros
      `A` para a raiz e para `www`). Até isso acontecer, o domínio serve o Google Sites
      antigo e o certificado do Let's Encrypt não tem como ser emitido
- [ ] Depois que o DNS propagar: remover `https://mdk.nr1sistema.com.br` do campo Domains
      e mudar Direction para **Redirect to www**. Enquanto os dois domínios coexistem,
      o site responde nos dois — o canonical aponta para o definitivo e o buscador
      consolida, mas manter os dois indefinidamente é hospedar conteúdo duplicado
- [ ] Substituir os depoimentos fictícios (ver o aviso em [Conteúdo pendente](#conteúdo-pendente))

## Deploy (Coolify na VPS)

O repositório traz `Dockerfile` e `nginx.conf` prontos. A aplicação já existe no Coolify
como `mdk-engenharia-site`, no projeto *My first project* → ambiente *production*, com:

- Build pack **Dockerfile**, porta **80**
- Origem **Public GitHub**, `felipe1santos/mdk-engenharia-site`, branch `main`, `HEAD`
- **Inject Build Args to Dockerfile** ligado — é o que faz as variáveis virarem `ARG`
- Auto Deploy ligado no Coolify, mas **sem webhook no GitHub**: na prática todo deploy é
  manual. A URL de webhook que o Coolify expõe é `http://` sem TLS, então o segredo
  trafegaria em texto claro; configurar isso só depois de pôr o painel atrás de HTTPS

Duas armadilhas que já custaram tempo:

- **Mudar variável exige rebuild sem cache.** A imagem é marcada como `uuid:commit-sha`;
  com o mesmo commit, um redeploy comum reaproveita a imagem e os novos build args nunca
  entram. Usar *Advanced → Force deploy (without cache)*.
- **Os campos do painel são Livewire.** Preencher por script sem disparar evento de
  teclado não salva, e a tela continua mostrando o valor digitado como se tivesse salvo.
  Conferir recarregando a página antes de deployar.

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
