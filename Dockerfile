# Build multi-stage: o Node so existe na etapa de build. A imagem final e um
# nginx com os arquivos estaticos — sem runtime de Node, sem node_modules e sem
# nada do que o site nao precisa em producao.
#
# Coolify: apontar para este Dockerfile e expor a porta 80.

# ---------- build ----------
FROM node:22-alpine AS build

WORKDIR /app

# Copiar apenas os manifests primeiro faz o Docker reaproveitar a camada de
# dependencias quando so o codigo muda.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Configuracao de ambiente do build. Os padroes sao os do preview: se as
# variaveis nao chegarem do Coolify, o resultado e um preview com indexacao
# bloqueada — nunca um site de producao exposto por engano.
#
# No lancamento, definir no Coolify como Build Variables:
#   PUBLIC_SITE_URL=https://www.mdkengenharia.com.br
#   PUBLIC_NOINDEX=false
ARG PUBLIC_SITE_URL=https://mdk.nr1sistema.com.br
ARG PUBLIC_NOINDEX=true
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_NOINDEX=$PUBLIC_NOINDEX

RUN npm run build

# ---------- runtime ----------
FROM nginx:1.27-alpine AS runtime

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 127.0.0.1 explicito em vez de `localhost`: o resolver do busybox tenta ::1
# primeiro, o que fazia o healthcheck falhar com "connection refused".
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
