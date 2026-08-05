# Plano de implementação — ajustes pedidos pelo cliente

> **Atualização de 05/08/2026 — Fases 1, 2 e 3 executadas.**
>
> Migrado do site anterior (mdkengenharia.com.br): 8 disciplinas de projeto com as
> pranchas técnicas, 3 obras, Missão/Visão/Valores literais, telefone e e-mails
> reais, fundação em 2010.
>
> Construído: seção da equipe, capa nova, camada técnica no hero, menu com
> submenus, e 17 páginas internas (`/sobre`, `/servicos`, 12 páginas de
> disciplina, `/projetos`, `/areas-de-atuacao`, `/contato`).
>
> **B2, B3 e B8 resolvidos ou parcialmente resolvidos** — ver a tabela da seção 3.
> **B1 segue aberto e é o único risco relevante que permanece:** as páginas
> descrevem escopo e normas, mas nenhuma afirma quem assina a ART de cada
> disciplina. Não acrescentar essa promessa antes da resposta do cliente.

Base: `equipe/Edições do Site.docx` (5 comentários com prints) + 4 fotos da equipe em `equipe/`.

Premissa que atravessa o plano inteiro: **não fugir da proposta atual**. O site hoje é uma
home única, estática (Astro 5 + Tailwind 4), com conteúdo centralizado em `src/data/` e SEO
local ancorado em São Paulo/Grande SP. Todo pedido abaixo foi avaliado contra isso.

---

## 1. Resumo da avaliação

| # | Pedido do cliente | Veredito | Status |
|---|---|---|---|
| 1 | Foto de capa "mais tecnológica, mais atual" | ⚠️ Sim, mas não do jeito sugerido | ✅ Feito — capa nova + malha técnica animada |
| 2 | Hero está muito focado em instalações — abrir para toda a gama | ✅ Sim | ✅ Feito |
| 3 | Lista completa de projetos + Execução + Consultoria | ⚠️ Sim, com confirmação técnica | ✅ Feito — 12 frentes em `services.ts` |
| 4 | Levar para outra página, detalhando cada assunto | ✅ Sim | ✅ Feito — `/servicos` + 12 páginas |
| 5 | Visão, Missão e Valores | ✅ Sim, em outro lugar | ✅ Feito — home e `/sobre`, texto literal da empresa |
| 6 | Reordenar o menu + submenus | ✅ Sim | ✅ Feito — dropdown desktop + acordeão mobile |
| 6b | "Área de Atuação – Brasil" | ❌ Não como está | ✅ Resolvido — `/areas-de-atuacao` com cobertura dupla |
| 6c | Blog | ⚠️ Só com compromisso editorial | ⏸️ Não feito — depende de **B7** |
| 7 | Fotos da equipe | ✅ Sim | ✅ Feito — `/sobre#equipe` e home |

---

## 2. Análise item a item

### 2.1 Foto de capa "mais tecnológica" ⚠️

**O que ele mandou:** um print de busca do Google Imagens com fotos genéricas de tecnologia —
placa de circuito, mão tocando holograma, código binário, "advanced technology".

**Por que não fazer literalmente:**

1. **Licença.** As imagens do print são de bancos pagos (Getty, Shutterstock, iStock, 123RF,
   DepositPhotos). Estão marcadas "Licenciável". Baixar do Google é uso indevido — risco real
   de notificação. O projeto hoje usa Pexels (licença livre) via `scripts/fetch-images.mjs`.
2. **Contradiz o posicionamento.** Holograma e binário são visual de startup de software. Numa
   empresa de engenharia civil isso enfraquece a credibilidade em vez de aumentar: o cliente
   que procura projeto aprovado na prefeitura quer ver competência técnica, não efeito
   futurista.

**O que fazer no lugar** — "tecnológico e atual" traduzido para a linguagem da engenharia:

- **Opção A (recomendada, custo zero de licença):** usar a própria sala da MDK. As fotos do
  Miro e da Dayane foram feitas num escritório escuro, com o logo iluminado na parede e dois
  quadros de desenho estrutural ao fundo. É exatamente "moderno e atual", é real e é da marca.
  → **Pedir ao cliente uma foto horizontal ampla desse mesmo ambiente** (sem pessoa em primeiro
  plano, ou com a equipe ao fundo desfocada).
- **Opção B (imediata):** trocar a foto do Pexels por uma de vocabulário tecnológico-mas-de-obra:
  tela de BIM/CAD, tablet com modelo 3D em canteiro, levantamento com drone, fachada moderna à
  noite. Fluxo já existe: editar `WANTED` em `scripts/fetch-images.mjs`, apagar
  `src/assets/images/hero.jpg`, rodar `npm run fetch:images`.
- **Opção C (complementar, e é onde a sensação de "atual" mais aparece):** camada gráfica no
  hero — grid técnico animado sutil, linhas de planta em baixa opacidade sobre a foto. O hero já
  tem `bg-dots`; é evolução do que existe, não ruptura. ~1 arquivo (`Hero.astro`) + CSS.

Recomendação: **B agora + C junto**, e **A** quando o cliente mandar a foto do escritório.

---

### 2.2 Hero "muito voltado para projeto de instalações" ✅

Correto e fácil. Mas tem um custo escondido que precisa ser dito:

O H1 atual — *"Projetos de **instalações** e regularização de obras"* — é o que hoje posiciona
o site para `projeto hidráulico São Paulo` e `projeto elétrico São Paulo`, as buscas com maior
intenção de compra. Trocar por algo genérico tipo "soluções em engenharia" **perde ranqueamento
sem ganhar nada**, porque ninguém busca "soluções em engenharia".

**Solução que atende os dois lados:** abrir o H1 e recuperar os termos específicos logo abaixo
— e, principalmente, dar **uma página própria para cada disciplina** (item 2.4). Aí cada termo
tem sua própria página ranqueando, o que é melhor que hoje, não pior.

Proposta de texto (`Hero.astro` + `site.ts`):

- **H1:** `Projetos e obras com solução completa` — com "solução completa" em laranja.
- **Subtítulo:** citando as disciplinas por extenso (arquitetura, estrutura, instalações,
  incêndio, HVAC, impermeabilização) + execução e consultoria + São Paulo e Grande SP.
- **Highlights (3 chips):** `Projetos completos` · `Execução de obra` · `Consultoria e
  regularização`.

**Bônus de marca:** nas fotos do escritório a parede traz **"SOLUÇÕES QUE CONSTRUEM RESULTADOS"**
e **"PLANEJAR · EXECUTAR · ENTREGAR · FAZER MELHOR"**. Isso bate exatamente com o que ele
escreveu ("somos uma empresa que traz solução em projetos") e é melhor que o `tagline` atual do
`site.ts` (`Planejamento · Execução · Compromisso`). → Sugerir adotar a frase da parede como
assinatura oficial. Decisão do cliente.

---

### 2.3 Lista completa de serviços ⚠️

Ele pediu 15 itens em 3 grupos:

- **Projetos:** Arquitetura · Estrutura · Instalações Gerais · Hidráulica · Elétrica · Combate a
  Incêndio · Dados e Voz · HVAC · Impermeabilização
- **Execução de Obra:** Residencial · Comercial · Industrial
- **Consultoria de Obra:** Residencial · Comercial · Industrial

**Viável tecnicamente.** É reestruturar `src/data/services.ts` de `primary`/`secondary` para 3
categorias. Nenhum componente escreve texto de negócio, então o dado manda.

**Dois pontos de atenção, um deles sério:**

1. 🔴 **Responsabilidade técnica.** O site já promete "ART e RRT" e "responsabilidade técnica
   registrada". Anunciar projeto de **estrutura**, **combate a incêndio** e **HVAC** exige
   profissional habilitado assumindo a ART de cada uma — não é a mesma atribuição de quem faz
   hidráulica/elétrica. Anunciar o que não se pode assinar é exposição real (CREA e
   consumidor). **Antes de publicar, o cliente precisa dizer, item a item: faz com equipe
   própria, faz com parceiro, ou não faz.** As páginas dos itens de parceiro saem com redação
   diferente ("coordenamos com projetista habilitado").
2. **Layout.** 15 cards na home viram um paredão e quebram o ritmo atual. O desenho que
   preserva a proposta: **3 blocos na home** (Projetos / Execução / Consultoria), cada um com
   as disciplinas como lista de links enxuta e um "Ver todos os serviços →". O detalhamento
   mora nas páginas internas.
   → Isso substitui `MainServices.astro` + `SecondaryServices.astro` por um componente só.
   Também some a incoerência atual de "Impermeabilização" e "Consultoria" estarem no rodapé
   como secundários enquanto o cliente os considera linha principal.

---

### 2.4 Páginas internas detalhadas ✅ (maior item do plano)

*"E levasse para outra página ampliando os assuntos e detalhando cada um deles."*

Perfeitamente viável em Astro, e é o maior ganho de SEO do pacote: sai de 1 página para ~18,
cada uma podendo ranquear por um termo específico.

Estrutura proposta:

```
/servicos                      índice das 3 categorias
/servicos/[slug]               15 páginas geradas de services.ts (getStaticPaths)
/sobre                         história + missão/visão/valores + equipe
/projetos                      portfólio (em andamento / concluídos)
/areas-de-atuacao              cidades atendidas
/contato                       formulário + mapa + NAP
```

Custo técnico: baixo-médio (rota dinâmica + um layout de página de serviço, reaproveitando
`Section`, `SectionTitle`, `Button`, `Icon` que já existem).

🔴 **O gargalo não é código, é conteúdo.** Cada página precisa de ~400–600 palavras reais:
o que é, o que entra no escopo, o que o cliente recebe, normas aplicáveis, quando é obrigatório.
15 páginas de texto genérico ranqueiam pior que 1 página boa, e ainda dão trabalho de manter.

**Sequência recomendada:** publicar `/servicos` (índice) + as **3–4 disciplinas com maior
procura** (hidráulica, elétrica, regularização, arquitetura) já com texto de verdade. As demais
ficam como âncora no índice até o texto existir. Isso entrega valor sem publicar 11 páginas
vazias.

---

### 2.5 Visão, Missão e Valores ✅

O próprio cliente hesitou: *"não sei se nesse ponto fica legal"*. Ele apontou a faixa branca
logo abaixo do hero (`TrustBar.astro`).

**Recomendação: não colocar ali.** Aquela faixa é elemento de conversão — sobrepõe o hero e
segura o visitante nos 3 segundos iniciais. Trocar por Missão/Visão (texto institucional, que
ninguém lê na primeira dobra) derruba conversão.

Onde colocar:

- **Página `/sobre`:** bloco dedicado, MVV completo. Lugar natural.
- **Home:** já existe. A seção `About.astro` traz **Segurança · Qualidade · Prazo · Resultados**
  — isso *são* os valores. Basta rotular ("Nossos valores") e, se ele quiser, acrescentar duas
  linhas de Missão e Visão acima. Sem seção nova, sem quebrar o ritmo da página.

📋 **Pendente do cliente:** os textos de Missão e Visão. Não dá para inventar.

---

### 2.6 Menu — nova ordem e submenus ✅ / ❌

Ordem pedida:

```
Home
Sobre nós          → História da empresa · Direção Técnica
Nossos serviços "Portfólio"
Projetos           → Em andamento · Concluídos
Blog "Depoimentos"
Área de Atuação – Brasil
Contato
```

**Viável**, mas hoje a navbar é plana (`mainNav` é lista simples em `navigation.ts`, sem
suporte a filhos). Precisa de: dropdown no desktop com acessibilidade de teclado, acordeão no
drawer mobile, e `NavItem` ganhando `children?: NavItem[]`. Trabalho contido, ~2 arquivos.

Três ressalvas:

1. **"Nossos serviços 'Portfólio'"** — misturar os dois confunde o visitante e o Google.
   *Serviços* = o que a empresa faz (intenção de compra). *Projetos/Portfólio* = o que já
   entregou (prova social). Ele já pede "Projetos" como item separado logo abaixo, então
   sugiro: `Serviços` e `Projetos`, cada um no seu.
2. **"Blog 'Depoimentos'"** — são coisas diferentes. Depoimentos já existem
   (`Testimonials.astro`) e podem virar `/depoimentos`. Blog é compromisso: blog parado com 2
   posts de 2026 passa impressão de empresa inativa — pior que não ter. Ver 2.8.
3. 🔴 **"Área de Atuação – Brasil"** — **não implementar como está.** Todo o SEO local do site
   está montado em São Paulo e Grande SP: `cities.ts`, `areaServed` do JSON-LD, `LocalBusiness`,
   endereço, mapa. Trocar para "Brasil" **derruba o ranqueamento local** (é o que traz cliente
   hoje) e, para execução de obra, provavelmente não é verdade.
   **Alternativa honesta que mantém tudo:** *"Obra e execução: São Paulo e Grande SP. Projetos e
   consultoria: todo o Brasil."* Duas listas na mesma página, JSON-LD preservado.
   → **Precisa da confirmação do cliente**: ele realmente atende projeto remoto fora de SP?

---

### 2.7 Fotos da equipe ✅

Quatro fotos entregues:

| Arquivo | Pessoa | Cargo | Qualidade |
|---|---|---|---|
| `Diretor Técnico - Miro.jpeg` | Miro | Diretor Técnico | ✅ Estúdio, fundo MDK |
| `Diretora Comercial - Dayane Kilma.jpeg` | Dayane Kilma | Diretora Comercial | ✅ Estúdio, fundo MDK |
| `Hellen Vargas - Arquiteta.jpeg` | Hellen Vargas | Arquiteta | ⚠️ Externa, outro estilo |
| `Angelica - Diretora Adm.jpeg` | Angélica | Diretora Administrativa | ❌ Selfie, pouca luz, evento |

**O problema:** Miro e Dayane são do mesmo ensaio (fundo escuro, logo na parede, luz de
estúdio). Hellen é retrato externo com luz e enquadramento diferentes. Angélica é selfie de
celular num evento, na vertical, com o fundo cheio. Lado a lado numa grade, a diferença fica
evidente e derruba a percepção de profissionalismo do site inteiro — justamente o oposto do
efeito desejado.

**Como resolver:**

- **Ideal:** pedir foto da Angélica e da Hellen no mesmo ensaio do Miro e da Dayane. É o único
  caminho para um resultado realmente uniforme.
- **Enquanto isso (funciona bem):** recorte 4:5 fechado no rosto + **tratamento uniforme** em
  todas as quatro — leve dessaturação com aplicação da cor navy da marca no fundo, e um
  gradiente navy→transparente de baixo para cima onde entra o nome. O tratamento igual em todas
  esconde a diferença de origem. Padrão consolidado em site institucional.

**Implementação:**

- Arquivos vão para `src/assets/images/team/` com nome slug (`miro.jpg`, `dayane-kilma.jpg`,
  `hellen-vargas.jpg`, `angelica.jpg`).
- ⚙️ **Detalhe técnico:** `src/lib/images.ts` faz glob só de `*.jpg`. As fotos são `.jpeg` →
  converter na importação (ou estender o glob). Como as fotos da equipe são de arquivo local e
  não do Pexels, o mais limpo é importá-las direto no componente com `astro:assets`, sem passar
  por `images.json` (que existe para guardar crédito de fotógrafo — aqui não se aplica).
- Novo `src/data/team.ts` (nome, cargo, foto, e opcionalmente CREA/CAU e LinkedIn) + componente
  `src/components/home/Team.astro`, grade de 4, mesmo padrão visual dos cards existentes.
- Aparece na home (seção "Direção Técnica", logo após `About`) e completa em `/sobre`.

📋 **Pendentes do cliente:**
- Nome completo do "Miro" e da "Angélica" (só veio o primeiro nome).
- Nº de CREA/CAU dos responsáveis técnicos — é o dado que mais gera autoridade nessa seção, e
  conversa direto com o item "Direção Técnica" do menu que ele mesmo pediu.
- Autorização das quatro pessoas para uso de nome e imagem no site.

---

### 2.8 Blog ⚠️ (opcional, fora do escopo mínimo)

Astro tem content collections — implementar é fácil. O custo é editorial, não técnico: exige
~1 post por mês para render. Sem esse compromisso, **não fazer**. Se o cliente topar, entra
como fase separada, depois de tudo acima estar no ar.

---

## 3. Bloqueios — precisam de resposta antes do código

| # | Pergunta ao cliente | Status | Trava o quê |
|---|---|---|---|
| B1 | Quais disciplinas a MDK assina com equipe própria, quais com parceiro, quais não faz? | 🔴 Aberto | 2.3, 2.4 |
| B2 | "Área de Atuação – Brasil": é projeto remoto? Ou obra também? | 🟡 Parcial — o site anterior afirma *"atuamos com projetos e construção em todo o Brasil"*. Falta conciliar com o SEO local de SP | 2.6 |
| B3 | Textos de Missão e Visão | ✅ Resolvido — literais em `src/data/institutional.ts` | 2.5 |
| B4 | Adotar "Soluções que constroem resultados" como assinatura? | 🔴 Aberto | 2.2 |
| B5 | Nome completo do Miro e da Angélica + CREA/CAU dos RTs | 🟡 Parcial — o carimbo da prancha executiva identifica **Miro Bergamo** como projetista, desenhista e coordenador. Faltam o sobrenome da Angélica e os registros | 2.7 |
| B6 | Foto horizontal ampla do escritório (o do fundo dos retratos) | 🔴 Aberto | 2.1 |
| B7 | Blog: tem quem escreva 1 post/mês? | 🔴 Aberto | 2.8 |
| B8 | Texto real das páginas de serviço | 🟡 Parcial — só "Projeto Estrutural" tinha texto próprio no site anterior; os outros 7 estão com escopo redigido por nós, a aprovar | 2.4 |
| B9 | **Endereço: 83 (INPI) ou 71 (site anterior)?** Conferir contra o Google Meu Negócio | 🔴 Aberto | NAP / SEO local |
| B10 | Confirmar se a foto da "Residência NK" é obra da MDK | 🔴 Aberto | 2.7 / portfólio |

**Nada disso impede começar.** As fases 1 e 3 andam com o que já existe.

---

## 4. Fases de execução

### Fase 1 — Ganhos rápidos (não depende de página nova)

1. `site.ts`: tagline, `shortDescription` e SEO abertos para toda a gama de serviços.
2. `Hero.astro`: novo H1, subtítulo e highlights (2.2).
3. `Hero.astro`: camada gráfica técnica sutil sobre a foto (2.1-C).
4. `scripts/fetch-images.mjs`: nova foto de capa (2.1-B).
5. `src/data/team.ts` + `Team.astro` + fotos tratadas em `src/assets/images/team/` (2.7).
6. `About.astro`: rotular os 4 pilares como "Nossos valores"; Missão/Visão quando B3 chegar.

Entregável: home já responde a 4 dos 5 comentários e mostra a equipe. Nenhuma página nova.

### Fase 2 — Serviços e páginas internas (o grosso)

7. Reescrever `services.ts` nas 3 categorias com as 15 entradas (depende de **B1**).
8. Substituir `MainServices` + `SecondaryServices` por um componente de 3 blocos.
9. `/servicos` (índice) + `/servicos/[slug]` via `getStaticPaths`.
10. Redigir as 3–4 primeiras páginas com texto real (depende de **B8**).
11. `/sobre` com história, MVV e equipe completa.
12. Sitemap e JSON-LD `Service` por página.

### Fase 3 — Navegação

13. `NavItem` com `children`; dropdown desktop acessível + acordeão mobile.
14. Nova ordem do menu; trocar âncoras por URLs reais; remover flag `pending`.
15. `/projetos` com filtro Em andamento / Concluídos (depende de obras reais do cliente).
16. `/areas-de-atuacao` no formato de dupla cobertura (depende de **B2**).

### Fase 4 — Pendente

17. `/depoimentos` como página própria — **só depois de haver depoimento real autorizado**.
    Hoje `testimonials.ts` é 100% placeholder; uma página inteira de depoimento fabricado é
    pior que uma seção marcada como pendente. Por isso o item "Depoimentos" do menu aponta
    para a âncora da home, e não para uma página.
18. Blog em content collections — só com **B7** confirmado.
19. Formulário em `/contato` — hoje a página lista canais diretos. Um formulário exige
    destino para as mensagens (serviço de envio ou endpoint); sem isso ele engole o contato
    e o visitante vai embora achando que falou com a empresa.

---

## 5. O que fica de fora, e por quê

| Pedido | Motivo |
|---|---|
| Baixar as imagens do print do Google | Bancos pagos, licença. Substituído por 2.1 |
| Estética de holograma/circuito/binário | Contradiz o posicionamento de engenharia civil |
| Missão/Visão na faixa abaixo do hero | Aquela faixa é conversão; MVV vai para `/sobre` |
| "Área de Atuação – Brasil" literal | Destrói o SEO local; alternativa honesta em 2.6 |
| Serviços e Portfólio no mesmo item de menu | Intenções de busca diferentes; confunde visitante e Google |
| Blog sem compromisso editorial | Blog parado passa impressão de empresa inativa |
| Publicar as 15 páginas de uma vez | 15 textos genéricos ranqueiam pior que 4 bons |
