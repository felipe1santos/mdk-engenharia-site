/**
 * Baixa as imagens do site a partir do banco de imagens Pexels.
 *
 * EXECUTAR LOCALMENTE, UMA VEZ:  npm run fetch:images
 *
 * A chave da API e lida de .env (que esta no .gitignore) e usada apenas aqui.
 * As imagens baixadas ficam versionadas em src/assets/images/ e sao otimizadas
 * em build time pelo astro:assets. O site publicado nao faz nenhuma requisicao
 * ao Pexels e nao embarca chave alguma.
 *
 * Imagens ja baixadas sao puladas. Use --force para rebaixar tudo.
 */

import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES_DIR = join(ROOT, 'src', 'assets', 'images');
const MANIFEST = join(ROOT, 'src', 'data', 'images.json');
const FORCE = process.argv.includes('--force');

/**
 * Cada entrada vira um arquivo <key>.jpg.
 * `query` e o termo de busca; `alt` e o texto alternativo real usado no HTML —
 * escrito a mao porque alt gerado por banco de imagens nao descreve o contexto
 * e nao ajuda nem acessibilidade nem SEO.
 *
 * `pick` escolhe qual resultado usar (0 = primeiro). Existe porque o primeiro
 * resultado nem sempre e o melhor: em varias buscas de eletrica o topo vinha com
 * quadros enferrujados e pichados, ruins para um site institucional. Fixar o
 * indice mantem o download reproduzivel.
 */
const WANTED = [
  {
    /**
     * A capa anterior era um trabalhador de mascara segurando planta impressa.
     * O cliente pediu algo "mais tecnologico, mais atual" — e a mascara datava a
     * foto. Esta troca por uma torre em construcao ao entardecer: escura o
     * bastante para o texto passar em contraste, com a massa da imagem a direita
     * e ceu livre a esquerda, onde fica o H1.
     */
    key: 'hero',
    query: 'construction site drone aerial modern building',
    pick: 1,
    alt: 'Edifício em construção com guindaste ao entardecer em área urbana',
    orientation: 'landscape',
  },
  {
    key: 'service-documentacao',
    query: 'architect documents blueprint desk',
    alt: 'Documentação técnica e plantas sobre a mesa de projeto',
    orientation: 'landscape',
  },
  {
    key: 'orgao-prefeitura',
    query: 'architect stamp approval blueprint documents',
    pick: 3,
    alt: 'Análise de projeto arquitetônico sobre a mesa, com planta de implantação',
    orientation: 'landscape',
  },
  {
    /*
     * Sinalizacao e abrigo de equipamentos, nao brasao de corporacao.
     *
     * A referencia enviada pelo cliente trazia o emblema do "Corpo de Bombeiros
     * Civil do Brasil" — associacao privada, que nao e o Corpo de Bombeiros da
     * Policia Militar, o orgao que de fato emite o AVCB em Sao Paulo. Usar
     * brasao de terceiro sugere vinculo inexistente e ainda apontaria para o
     * orgao errado.
     */
    key: 'orgao-bombeiros',
    query: 'fire hydrant hose reel building safety',
    pick: 1,
    alt: 'Abrigo de extintor e mangotinho com sinalização de emergência em edificação',
    orientation: 'landscape',
  },
  {
    key: 'orgao-cetesb',
    query: 'industrial plant green trees environment',
    pick: 3,
    alt: 'Vista aérea de planta industrial cercada por área verde preservada',
    orientation: 'landscape',
  },
  {
    key: 'about',
    query: 'civil engineer team construction site helmet',
    alt: 'Equipe de engenharia civil em visita técnica à obra',
    orientation: 'landscape',
  },
  {
    key: 'cta',
    query: 'modern building construction crane sky',
    alt: 'Edificação moderna em fase de construção',
    orientation: 'landscape',
  },
];

/*
 * As imagens de servico (`service-arquitetonico`, `service-estrutural`,
 * `service-hidraulico`, `service-eletrico`, `service-spci`,
 * `service-gases-medicinais`, `service-drenagem`, `service-industrial`), as de
 * obra (`obra-*`) e as da equipe (`equipe-*`) NAO estao nesta lista de proposito:
 * vieram do acervo da MDK, nao do Pexels. Se voltarem para o WANTED, um
 * `--force` sobrescreve material do cliente por foto de banco.
 *
 * As antigas `portfolio-1..6` sairam quando o portfolio passou a usar fotos
 * reais de obra. Estao no historico do git se um dia fizerem falta.
 */

function loadKey() {
  try {
    process.loadEnvFile(join(ROOT, '.env'));
  } catch {
    // .env ausente — a chave ainda pode vir do ambiente.
  }
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    console.error(
      '\nPEXELS_API_KEY nao encontrada.\n' +
        'Copie .env.example para .env e preencha com a sua chave de https://www.pexels.com/api/\n',
    );
    process.exit(1);
  }
  return key;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function search(key, item) {
  const pick = item.pick ?? 0;
  const url =
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(item.query)}` +
    `&per_page=${pick + 1}&orientation=${item.orientation}&size=large`;

  const res = await fetch(url, { headers: { Authorization: key } });
  if (!res.ok) {
    throw new Error(`Pexels respondeu ${res.status} ${res.statusText} para "${item.query}"`);
  }
  const body = await res.json();
  const photo = body.photos?.[pick];
  if (!photo) throw new Error(`Nenhum resultado no indice ${pick} para "${item.query}"`);
  return photo;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download falhou: ${res.status} ${res.statusText}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const key = loadKey();
  await mkdir(IMAGES_DIR, { recursive: true });

  let manifest = {};
  if (await exists(MANIFEST)) {
    manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
  }

  for (const item of WANTED) {
    const file = `${item.key}.jpg`;
    const dest = join(IMAGES_DIR, file);

    if (!FORCE && (await exists(dest)) && manifest[item.key]) {
      console.log(`· ${item.key} — ja existe, pulando`);
      continue;
    }

    try {
      const photo = await search(key, item);
      await download(photo.src.large2x, dest);
      manifest[item.key] = {
        file,
        alt: item.alt,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
        sourceUrl: photo.url,
      };
      console.log(`+ ${item.key} — ${photo.photographer}`);
    } catch (err) {
      console.error(`! ${item.key} — ${err.message}`);
    }
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nManifesto gravado em src/data/images.json (${Object.keys(manifest).length} imagens).`);
}

main();
