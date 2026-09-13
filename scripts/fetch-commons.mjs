/**
 * Baixa imagens do Wikimedia Commons.
 *
 * EXECUTAR LOCALMENTE:  node scripts/fetch-commons.mjs
 *
 * POR QUE EXISTE, ALEM DO PEXELS. O acervo de combate a incendio precisava de
 * duas fotos que o Pexels simplesmente nao tem: casa de bombas de incendio e
 * bico de sprinkler. Foram cinco buscas diferentes no Pexels — "fire pump
 * station", "fire fighting pump system", "sprinkler head ceiling close up",
 * entre outras — e o retorno era bomba de aquecimento predial e aspersor de
 * irrigacao de jardim. O Commons tem as duas, fotografadas em instalacao real.
 *
 * DIFERENCA DE LICENCA EM RELACAO AO PEXELS, E POR ISSO ESTE ARQUIVO E SEPARADO:
 * a licenca do Pexels dispensa atribuicao; a do Commons nao, salvo CC0. Cada
 * entrada aqui grava `license`, `licenseUrl` e `attribution` no manifesto, e o
 * rodape do site exibe o credito — ver `imageCredits()` em src/lib/images.ts e o
 * Footer. Publicar CC BY-SA sem credito descumpre a licenca, entao NAO REMOVER
 * o credito do rodape enquanto houver imagem CC aqui.
 *
 * Imagem ja baixada e pulada, como no fetch-images.
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES_DIR = join(ROOT, 'src', 'assets', 'images');
const MANIFEST = join(ROOT, 'src', 'data', 'images.json');
const FORCE = process.argv.includes('--force');

/**
 * A API do Commons pede User-Agent identificavel. Requisicao anonima e
 * bloqueada.
 */
const UA = {
  'User-Agent': 'MDK-Engenharia-site/1.0 (https://www.mdkengenharia.com.br; contato@mdkengenharia.com.br)',
};

/**
 * `file` e o nome exato do arquivo no Commons, sem o prefixo "File:".
 * `alt` e escrito a mao, como no fetch-images: descreve o que a foto mostra
 * para quem nao a ve.
 */
const WANTED = [
  {
    key: 'incendio-casa-bombas',
    file: 'Fire pumps plantroom, Sydney, 2022.jpg',
    alt: 'Casa de bombas de incêndio: conjunto de bombas e motor sobre base, barrilete, registros de manobra e painel de comando',
  },
  {
    key: 'incendio-sprinkler',
    file: 'Fusable link sprinkler head.jpg',
    alt: 'Chuveiro automático de incêndio do tipo fusível, instalado no teto, em detalhe',
  },
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Tira as tags HTML que o Commons devolve dentro dos campos de metadado. */
function texto(meta, campo) {
  const bruto = meta?.[campo]?.value ?? '';
  return String(bruto)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const URLS_DE_LICENCA = {
  cc0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'cc by 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'cc by 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'cc by-sa 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'cc by-sa 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'cc by-sa 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

async function buscar(item) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
    `&titles=${encodeURIComponent(`File:${item.file}`)}` +
    '&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600';

  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`Commons respondeu ${res.status} para "${item.file}"`);

  const body = await res.json();
  const page = Object.values(body.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info) throw new Error(`Arquivo nao encontrado: "${item.file}"`);

  const meta = info.extmetadata ?? {};
  const licenca = texto(meta, 'LicenseShortName') || 'ver página do arquivo';

  return {
    /* `thumburl` vem redimensionado em 1600 px. O original do Commons chega a
       passar de 20 MB, e o astro:assets reprocessa tudo de novo no build — nao
       ha ganho em versionar o arquivo cru. */
    downloadUrl: info.thumburl ?? info.url,
    autor: texto(meta, 'Artist') || 'autor não informado',
    licenca,
    licencaUrl: URLS_DE_LICENCA[licenca.toLowerCase()] ?? info.descriptionurl,
    pagina: info.descriptionurl,
  };
}

async function main() {
  await mkdir(IMAGES_DIR, { recursive: true });

  let manifest = {};
  if (await exists(MANIFEST)) {
    manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  }

  for (const item of WANTED) {
    const arquivo = `${item.key}.webp`;
    const destino = join(IMAGES_DIR, arquivo);

    if (!FORCE && (await exists(destino)) && manifest[item.key]) {
      console.log(`· ${item.key} — ja existe, pulando`);
      continue;
    }

    try {
      const dados = await buscar(item);
      const res = await fetch(dados.downloadUrl, { headers: UA });
      if (!res.ok) throw new Error(`Download falhou: ${res.status}`);

      /* Direto para WebP, sem passar por JPEG intermediario: e o formato que o
         repositorio adotou para material novo. */
      const buffer = Buffer.from(await res.arrayBuffer());
      await sharp(buffer).webp({ quality: 82 }).toFile(destino);

      manifest[item.key] = {
        file: arquivo,
        alt: item.alt,
        photographer: dados.autor,
        photographerUrl: dados.pagina,
        sourceUrl: dados.pagina,
        source: 'Wikimedia Commons',
        license: dados.licenca,
        licenseUrl: dados.licencaUrl,
        /* String pronta para o rodape. Montada aqui, e nao no componente, para
           que o credito acompanhe a imagem no manifesto. */
        attribution: `${dados.autor}, via Wikimedia Commons (${dados.licenca})`,
      };

      console.log(`+ ${item.key} — ${dados.autor} · ${dados.licenca}`);
    } catch (err) {
      console.error(`! ${item.key} — ${err.message}`);
    }
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nManifesto gravado (${Object.keys(manifest).length} imagens).`);
}

main();
