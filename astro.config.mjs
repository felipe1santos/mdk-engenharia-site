// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * URL publica do site. Define canonical, Open Graph e sitemap de uma vez so —
 * nenhum outro arquivo repete a URL.
 *
 * O padrao e o subdominio de preview, e nao o dominio final, de proposito: se a
 * variavel nao chegar ao build por qualquer motivo, o resultado e um preview
 * corretamente identificado, e nao o site de producao apontando canonical para
 * um dominio que ainda nao existe.
 *
 * No lancamento, definir PUBLIC_SITE_URL=https://www.mdkengenharia.com.br e
 * PUBLIC_NOINDEX=false. Ver o checklist no README.
 */
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://mdk.nr1sistema.com.br';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Formatos modernos com fallback automatico pelo <Picture> do astro:assets.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
