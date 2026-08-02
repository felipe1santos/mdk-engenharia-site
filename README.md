# Site institucional — MDK Engenharia

Site da MDK Engenharia e Arquitetura LTDA - ME (São Paulo/SP). Astro 5 + Tailwind 4,
saída estática.

Nesta etapa existe apenas a **home**, para validar design, branding e estrutura de SEO
antes de construir as páginas internas. A navbar já traz todos os links finais; enquanto as
páginas não existem, apontam para âncoras da home.

Especificação: [`docs/superpowers/specs/2026-08-02-mdk-home-design.md`](docs/superpowers/specs/2026-08-02-mdk-home-design.md)

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
| `services.ts` | Serviços principais e secundários |
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

Falta o cliente fornecer:

- Telefone, WhatsApp, e-mail e horário de atendimento
- Depoimentos reais autorizados
- Números reais (projetos, obras, anos, m²)
- Fotos reais de obras (hoje: banco de imagens)
- **Logo em vetor** (`.ai`, `.svg` ou `.pdf`). Só existe um JPEG de 802 px; o logo atual foi
  extraído dele e fica levemente suave em telas retina
- Confirmação das coordenadas do endereço (ver nota em `src/data/site.ts`)

### Marca registrada

O pedido no INPI (nº 941017087) ainda está **em exame**. O site não pode usar "®" nem a
expressão "Marca Registrada" — só o nome. Revisar quando o registro for concedido.

## Imagens

`npm run fetch:images` lê `PEXELS_API_KEY` de `.env` (copie de `.env.example`) e baixa as
fotos para `src/assets/images/`.

Roda **uma vez, localmente**. A chave não entra no bundle: o site publicado não faz nenhuma
requisição ao Pexels. As imagens são otimizadas para WebP/AVIF durante o build.

Para trocar uma foto, edite a lista `WANTED` em `scripts/fetch-images.mjs`, apague o arquivo
correspondente em `src/assets/images/` e rode o comando de novo. O campo `pick` escolhe qual
resultado da busca usar, já que o primeiro nem sempre é o melhor.

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

Antes de publicar, trocar `SITE_URL` em `astro.config.mjs` e a linha `Sitemap:` em
`public/robots.txt` pelo domínio real.

## Estrutura

```
src/
  data/          conteúdo do site (fonte única)
  layouts/       BaseLayout.astro — <head>, SEO, JSON-LD
  components/
    layout/      Navbar, Footer, WhatsAppFab
    home/        seções da home, na ordem de rolagem
    ui/          Section, SectionTitle, Button, Icon
  lib/images.ts  resolve chaves de imagem para os arquivos
  scripts/       reveal.ts — animações de rolagem
  pages/         index.astro
scripts/         fetch-images.mjs, extract-logo.mjs
```
