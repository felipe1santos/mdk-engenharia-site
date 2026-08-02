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
RUN npm run build

# ---------- runtime ----------
FROM nginx:1.27-alpine AS runtime

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
