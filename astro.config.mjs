// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio final ainda nao definido. Trocar aqui atualiza canonical, OG e sitemap
// de uma vez so — nenhum outro arquivo repete a URL.
const SITE_URL = 'https://www.mdkengenharia.com.br';

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
