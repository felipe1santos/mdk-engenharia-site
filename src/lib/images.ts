/**
 * Ponte entre as chaves usadas em src/data/ e os arquivos reais em
 * src/assets/images/.
 *
 * Os componentes referenciam imagens por chave ('hero', 'portfolio-1'), nunca
 * por caminho. Assim, trocar uma foto de banco por uma foto real de obra e
 * substituir o arquivo — nenhum componente muda.
 *
 * O glob e `eager` para que o astro:assets receba ImageMetadata em build time e
 * consiga gerar WebP/AVIF com width e height corretos.
 */

import type { ImageMetadata } from 'astro';
import manifest from '../data/images.json';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.jpg', {
  eager: true,
});

type ImageKey = keyof typeof manifest;

const byKey = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const key = path.split('/').pop()!.replace(/\.jpg$/, '');
  byKey.set(key, mod.default);
}

export interface SiteImage {
  src: ImageMetadata;
  alt: string;
  credit: string;
  creditUrl: string;
}

/**
 * Resolve uma chave de imagem. Lanca em build time se a chave nao existir —
 * falhar no build e melhor que publicar uma pagina com imagem quebrada.
 */
export function getImage(key: string): SiteImage {
  const src = byKey.get(key);
  const meta = (manifest as Record<string, (typeof manifest)[ImageKey]>)[key];

  if (!src || !meta) {
    throw new Error(
      `Imagem "${key}" nao encontrada. Rode "npm run fetch:images" ou confira src/data/images.json.`,
    );
  }

  return {
    src,
    alt: meta.alt,
    credit: meta.photographer,
    creditUrl: meta.photographerUrl,
  };
}

/**
 * Creditos dos fotografos, disponiveis caso o cliente queira exibi-los.
 * A licenca do Pexels nao exige atribuicao, entao hoje o rodape traz apenas a
 * origem. Os nomes ficam registrados em src/data/images.json.
 */
export function imageCredits(): string[] {
  return [...new Set(Object.values(manifest).map((m) => m.photographer))].sort();
}
