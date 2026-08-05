/**
 * Extrai o logo da MDK da arte oficial (o JPEG do manual de marca) e gera os
 * arquivos usados pelo site, com fundo transparente.
 *
 *   npm run build:logo
 *
 * PROVISORIO. A unica fonte disponivel e um JPEG de 802 px, entao o logo sai em
 * ~406 px de largura — suficiente para a navbar em 2x, mas nao para uso maior.
 * Solicitar ao designer o arquivo vetorial (.ai / .svg / .pdf) e substituir
 * src/assets/logo/ antes de publicar.
 *
 * As coordenadas de recorte abaixo foram medidas por analise de pixels da arte:
 *   banda 1  y 62-172   marca "MDK" com coluna de armacao e chevron
 *   banda 2  y 195-214  linha "ENGENHARIA"
 *   banda 3  y 235-246  tagline "PLANEJAMENTO / EXECUCAO / COMPROMISSO"
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'WhatsApp Image 2026-07-30 at 17.09.39.jpeg');
const OUT_DIR = join(ROOT, 'src', 'assets', 'logo');
const PUBLIC_DIR = join(ROOT, 'public');

/** Recortes medidos na arte, com 4 px de folga. */
const CROPS = {
  /** Marca + "ENGENHARIA". Usado na navbar. */
  logo: { left: 51, top: 58, width: 413, height: 161 },
  /** Marca + "ENGENHARIA" + tagline. Usado no rodape. */
  logoFull: { left: 51, top: 58, width: 413, height: 193 },
  /**
   * So o simbolo (chevron + coluna de armacao). Usado no favicon e no cartao da
   * secao Sobre.
   *
   * Coincide de proposito com SYMBOL_BLOCK: o "D" termina em x=322 e o simbolo
   * comeca em x=325, entao qualquer folga maior traz o antialiasing da barriga
   * do D — que, isolado no favicon, aparece como uma lasca clara flutuando a
   * esquerda do chevron.
   */
  symbol: { left: 324, top: 58, width: 139, height: 118 },
};

/**
 * O simbolo inteiro: coluna de armacao + chevron, tratados como um bloco unico.
 *
 * Medido por varredura de pixels na arte. Na faixa da marca (y 61..173), a tinta
 * do simbolo vai de x=325 a x=461: a coluna de armacao ocupa 325..360 e o
 * chevron laranja, 360..461. O retangulo abaixo abre 1 px de folga de cada lado,
 * o que mantem o simbolo na mesma posicao depois do espelho.
 *
 * A altura fica limitada a faixa da marca de proposito: mais abaixo estao a
 * linha "ENGENHARIA" e a tagline, que atravessam a mesma faixa horizontal e nao
 * podem entrar no espelhamento.
 */
const SYMBOL_BLOCK = { left: 324, top: 58, width: 139, height: 118 };

/**
 * Corrige o "K" da marca.
 *
 * Na arte do manual o simbolo e `|<`: coluna de armacao a esquerda e chevron
 * abrindo para a direita. O cliente pediu a orientacao oposta — chevron com a
 * boca virada para o "D" e a coluna de armacao a direita, servindo de haste.
 *
 * O espelho e do BLOCO INTEIRO, nao do chevron sozinho. Espelhar so o chevron
 * (versao anterior deste script) produzia `|>`: a boca fechava contra a haste,
 * os bracos apontavam para longe dela e a forma deixava de ler como K. Virando
 * coluna e chevron juntos, a relacao entre as duas pecas se preserva e o
 * resultado e `>|`, que e o que o cliente aprovou.
 *
 * Como o retangulo espelhado volta exatamente sobre si mesmo, o fundo do painel
 * vai junto e nao sobra franja de antialiasing para mascarar.
 *
 * O espelho e aplicado uma unica vez, na arte inteira, e todos os recortes
 * derivam dela — assim navbar, rodape, simbolo e favicon nunca divergem.
 */
async function correctedSource() {
  const symbol = await sharp(SOURCE).extract(SYMBOL_BLOCK).flop().toBuffer();

  return sharp(SOURCE)
    .composite([{ input: symbol, left: SYMBOL_BLOCK.left, top: SYMBOL_BLOCK.top }])
    .toBuffer();
}

/**
 * Fundo do painel claro na arte: #F0F0F0, nao branco puro. Usar 255 como
 * referencia deixaria um retangulo cinza visivel ao redor do logo.
 */
const BG = 240;
/** Ruido de compressao do JPEG abaixo deste valor conta como fundo. */
const NOISE_FLOOR = 8;

/**
 * Remove o fundo do painel convertendo luminancia em alpha.
 *
 * alpha cresce conforme o pixel se afasta do cinza de fundo, o que zera o fundo,
 * preserva o laranja (canal azul proximo de zero) e mantem o antialiasing das
 * bordas. Em seguida a cor e des-premultiplicada para nao sair lavada sobre
 * fundos escuros.
 *
 * Com `toWhite`, os pixels azul-marinho viram branco e o laranja e preservado —
 * e a versao do logo para fundos escuros (navbar sobre o hero, rodape).
 */
function keyOutWhite(data, channels, toWhite) {
  const out = Buffer.alloc((data.length / channels) * 4);
  const scale = 255 / (BG - NOISE_FLOOR);

  for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const raw = BG - Math.min(r, g, b) - NOISE_FLOOR;
    const alpha = raw <= 0 ? 0 : Math.min(255, Math.round(raw * scale));
    if (alpha === 0) {
      out[j] = out[j + 1] = out[j + 2] = out[j + 3] = 0;
      continue;
    }

    const a = alpha / 255;
    let cr = Math.round((r - BG * (1 - a)) / a);
    let cg = Math.round((g - BG * (1 - a)) / a);
    let cb = Math.round((b - BG * (1 - a)) / a);
    cr = Math.max(0, Math.min(255, cr));
    cg = Math.max(0, Math.min(255, cg));
    cb = Math.max(0, Math.min(255, cb));

    // Laranja tem canal vermelho bem acima do azul; o azul-marinho, nao.
    const isOrange = cr - cb > 45;
    if (toWhite && !isOrange) {
      cr = cg = cb = 255;
    }

    out[j] = cr;
    out[j + 1] = cg;
    out[j + 2] = cb;
    out[j + 3] = alpha;
  }
  return out;
}

async function emit(art, crop, name, toWhite) {
  const { data, info } = await sharp(art)
    .extract(crop)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = keyOutWhite(data, info.channels, toWhite);
  const dest = join(OUT_DIR, `${name}.png`);

  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  console.log(`+ src/assets/logo/${name}.png  ${info.width}x${info.height}`);
  return { rgba, info };
}

async function emitFavicon(art) {
  const { data, info } = await sharp(art)
    .extract(CROPS.symbol)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = keyOutWhite(data, info.channels, true);

  const symbol = await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize({ width: 300, height: 250, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 512, height: 512, channels: 4, background: { r: 10, g: 28, b: 56, alpha: 1 } },
  })
    .composite([{ input: symbol, gravity: 'center' }])
    .png()
    .toFile(join(PUBLIC_DIR, 'favicon.png'));

  await sharp(join(PUBLIC_DIR, 'favicon.png'))
    .resize(180, 180)
    .png()
    .toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'));

  console.log('+ public/favicon.png  512x512');
  console.log('+ public/apple-touch-icon.png  180x180');
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  const art = await correctedSource();

  await emit(art, CROPS.logo, 'mdk-logo-dark', false);
  await emit(art, CROPS.logo, 'mdk-logo-light', true);
  await emit(art, CROPS.logoFull, 'mdk-logo-full-light', true);
  await emit(art, CROPS.symbol, 'mdk-symbol-light', true);
  await emitFavicon(art);
}

main();
