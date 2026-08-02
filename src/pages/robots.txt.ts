import type { APIRoute } from 'astro';

/**
 * robots.txt gerado no build.
 *
 * Precisa ser dinamico porque o arquivo muda conforme o ambiente: o subdominio
 * de preview bloqueia tudo, o dominio final libera tudo e aponta o sitemap.
 * Um arquivo estatico em public/ nao conseguiria distinguir os dois e acabaria
 * liberando a indexacao do preview.
 *
 * Ver a nota sobre PUBLIC_NOINDEX em src/layouts/BaseLayout.astro.
 */
const noindex = import.meta.env.PUBLIC_NOINDEX !== 'false';

export const GET: APIRoute = ({ site }) => {
  const body = noindex
    ? [
        '# Ambiente de preview — indexacao bloqueada de proposito.',
        '# Ver o checklist de lancamento no README.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : [
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
