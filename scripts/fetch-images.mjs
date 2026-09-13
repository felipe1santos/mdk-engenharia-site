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
  /*
   * SPDA na pagina de combate a incendio.
   *
   * A secao usava `service-eletrico` — a prancha isometrica de instalacao
   * eletrica do acervo. O cliente apontou o problema em 03/09/2026: aquela
   * imagem fala de projeto eletrico predial, nao de protecao contra descarga
   * atmosferica, e numa pagina de venda a ilustracao errada desmente o titulo.
   *
   * Foram baixadas duas candidatas. A busca "lightning rod building roof metal"
   * trouxe telhados parisienses com chaminés e uma antena de TV — nenhum captor
   * a vista, e o alt teria descrito coisa que a foto nao mostra. Descartada, e
   * a busca fica registrada aqui para ninguem repetir. Se um dia for preciso
   * uma foto do sistema em si, o caminho e material real de obra da MDK: banco
   * de imagens nao tem SPDA identificavel.
   */
  {
    key: 'spda-descarga',
    query: 'lightning strike city skyline storm',
    pick: 1,
    alt: 'Descarga atmosférica sobre edificações em área urbana durante tempestade',
    orientation: 'landscape',
  },

  /* ─────────────── ACERVO PROPRIO DA PAGINA DE COMBATE A INCENDIO ───────────────
   *
   * Todas as `incendio-*` existem para /servicos/regularizacao/bombeiros e para
   * mais nada. A pagina nasceu reaproveitando imagem da home e das paginas de
   * servico — hidrante da secao de orgaos, prancha de SPCI, foto de laje —, e o
   * cliente vetou isso em 03/09/2026: pagina de campanha com a mesma foto que o
   * visitante ja viu na home nao parece pagina de campanha, parece a mesma
   * pagina de novo.
   *
   * NAO USAR ESTAS CHAVES EM OUTRA PAGINA. O ponto delas e serem exclusivas; se
   * comecarem a circular pelo site, o problema volta.
   *
   * Sao fotografias de sistema instalado, nao de desenho tecnico — entao entram
   * com `object-cover`, diferente das pranchas do acervo da MDK.
   *
   * A CHAVE DESCREVE O QUE A FOTO MOSTRA, e nao onde ela e usada. A primeira
   * rodada nomeou por posicao (`incendio-hero`, `incendio-faixa`) e as fotos
   * acabaram em outros lugares, deixando o nome mentindo sobre o conteudo.
   *
   * BUSCAS QUE FALHARAM, registradas para ninguem repetir:
   *   - "sprinkler head ceiling close up" e "fire sprinkler water suppression
   *     system installation" trouxeram aspersor de irrigacao de jardim, nas
   *     duas tentativas. O Pexels nao tem bico de sprinkler de incendio
   *     identificavel — o slot foi abandonado, e nao preenchido com foto errada.
   *   - "industrial pump room pipes valves machinery" trouxe bomba circuladora
   *     de aquecimento, com manometro em graus Celsius. Nao e casa de bombas.
   *   - "lightning rod building roof metal" trouxe telhado com chaminé e antena
   *     de TV, sem captor a vista. Ver a nota de `spda-descarga`.
   *   - "firefighter gear helmet equipment dark" trouxe bombeiro fardado. NAO
   *     USAR: nesta pagina, cujo assunto e o Corpo de Bombeiros, pessoa de
   *     farda sugere que a MDK e a corporacao ou tem credenciamento dela —
   *     mesma ressalva do topo de src/data/agencies.ts sobre exibir brasao de
   *     orgao publico. A MDK e escritorio de engenharia: as fotos mostram
   *     sistema instalado, nao guarnicao.
   *
   * Duas buscas diferentes ("fire hose cabinet..." e "fire sprinkler pipes...")
   * chegaram a devolver o MESMO arquivo. Se aparecer foto repetida na pagina,
   * conferir o md5 antes de culpar o componente.
   */
  {
    key: 'incendio-abrigo-mangueiras',
    query: 'fire hose cabinet industrial building red pipes',
    alt: 'Abrigo de mangueiras de incêndio e hidrante de coluna instalados na fachada de uma edificação',
    orientation: 'landscape',
  },
  {
    key: 'incendio-hidrante-coluna',
    query: 'fire pump water supply pipes valves red industrial',
    alt: 'Hidrante de coluna com registros e engate rápido, instalado junto à parede',
    orientation: 'landscape',
  },
  /*
   * Barrilete/distribuidor de incendio — o mais proximo de "casa de bombas" que
   * o Pexels tem. O cliente mandou como referencia o print de um anuncio de
   * skid de bomba de incendio (bomba vermelha sobre base, com manometros e motor
   * diesel); aquele arquivo e peca de marketing de outra empresa, com titulo
   * embutido e sem licenca verificavel, entao nao vai para o site. Esta e o
   * equivalente licenciado do mesmo assunto.
   */
  {
    key: 'incendio-barrilete',
    query: 'fire hydrant system pipes building basement',
    pick: 1,
    alt: 'Distribuidor metálico de água para mangueiras de combate a incêndio, com registros de manobra',
    orientation: 'landscape',
  },
  {
    key: 'incendio-gongo-alarme',
    query: 'fire sprinkler pipes ceiling warehouse red',
    alt: 'Gongo hidráulico de alarme ligado à tubulação vermelha de um sistema de chuveiros automáticos',
    orientation: 'landscape',
  },
  {
    key: 'incendio-sirene',
    query: 'smoke detector ceiling fire alarm',
    alt: 'Sirene audiovisual de alarme de incêndio instalada no teto',
    orientation: 'landscape',
  },
  {
    key: 'incendio-extintor',
    query: 'fire extinguisher wall mounted red building',
    alt: 'Extintor de pó químico ABC instalado em suporte de parede, com rótulo de instruções de uso',
    orientation: 'landscape',
  },
  /* Escura o bastante para o H1 branco passar em contraste — e o hero da pagina. */
  {
    key: 'incendio-rota-fuga',
    query: 'emergency exit sign corridor green',
    alt: 'Sinalização de rota de fuga iluminada em corredor de edificação',
    orientation: 'landscape',
  },
  /* Fundo da faixa navy, sob cortina escura: precisa ser ambiente de pouca luz. */
  {
    key: 'incendio-galpao',
    query: 'industrial warehouse ceiling pipes dark interior',
    alt: 'Interior de galpão com tubulação aparente sob a laje e sinalização de saída de emergência',
    orientation: 'landscape',
  },
  {
    key: 'incendio-manometros',
    query: 'technician hands pressure gauge valve pipe maintenance',
    alt: 'Manômetros em linha, instalados na tubulação isolada de uma sala técnica',
    orientation: 'landscape',
  },

  /*
   * ACERVO DE REGULARIZACAO DE IMOVEL — `imovel-*`.
   *
   * Existem para a pagina-mae /servicos/regularizacao/prefeitura e para a
   * pagina de vendas /servicos/regularizacao/prefeitura/regularizacao-de-imovel,
   * que recebe o trafego pago de "regularizar imovel" e "habite-se".
   *
   * Vale aqui a mesma regra que valeu para o acervo `incendio-*`: pagina de
   * campanha nao repete a foto da home. Nenhuma destas chaves e usada em
   * qualquer outra pagina do site.
   *
   * O assunto e documental, nao de canteiro: o que ilustra regularizacao e
   * fachada pronta, levantamento em campo, prancha aprovada, escritura e chave
   * na mao — nao maquina pesada. A referencia de enquadramento e a secao
   * "Expansao sem riscos" do site da Nexxer, que o cliente mandou em 13/09/2026:
   * foto vertical grande ao lado do texto, com equipe tecnica em campo.
   */
  {
    /* Capa da pagina de vendas. Precisa ser casa pronta e bem acabada — e o
       imovel que o visitante quer poder vender, nao a obra dele. Vai atras de
       cortina escura, entao ceu claro nao atrapalha o contraste do H1. */
    key: 'imovel-fachada-residencial',
    query: 'modern house facade architecture exterior daylight',
    /* O indice 3 e o unico da busca que e casa inteira vista da rua, com o
       volume a direita e o portao a esquerda — que e onde entra o H1. Os
       primeiros resultados eram jardim, fachada recortada e porta de entrada
       noturna; nenhum se le como "imovel" a dois metros de distancia. */
    pick: 3,
    alt: 'Fachada de residência de dois pavimentos vista da entrada, com garagem e acesso pavimentado',
    orientation: 'landscape',
  },
  {
    /* A foto no formato da secao da Nexxer: equipe tecnica de colete e capacete
       em campo, conferindo documento. `portrait` porque ela ocupa a coluna alta
       ao lado do texto. */
    key: 'imovel-equipe-vistoria',
    query: 'engineers hard hat safety vest site inspection documents',
    alt: 'Equipe de engenharia com colete e capacete conferindo documentação em vistoria',
    orientation: 'portrait',
  },
  {
    /* Levantamento do que existe construido — a primeira etapa do servico. */
    key: 'imovel-levantamento-campo',
    query: 'land surveyor total station tripod measuring property',
    alt: 'Topógrafo operando estação total no levantamento de um terreno',
    orientation: 'landscape',
  },
  {
    /* Prancha e instrumento sobre a mesa: a etapa de projeto de regularizacao. */
    key: 'imovel-prancha-projeto',
    query: 'architectural floor plan blueprint desk scale ruler drawing',
    pick: 2,
    alt: 'Planta técnica sobre a prancheta, com escalímetro e instrumentos de desenho',
    orientation: 'landscape',
  },
  {
    /* Averbacao em cartorio — o fim da linha do servico. */
    key: 'imovel-escritura-assinatura',
    query: 'signing property contract document pen desk real estate',
    pick: 1,
    alt: 'Assinatura de documento de imóvel sobre a mesa, com contrato e caneta',
    orientation: 'landscape',
  },
  {
    /* O resultado: imovel regular, vendavel e financiavel. */
    key: 'imovel-chaves-entrega',
    query: 'house keys handover real estate agent client',
    alt: 'Entrega das chaves de um imóvel ao novo proprietário',
    orientation: 'landscape',
  },
  {
    /*
     * Faixa de cobertura: Sao Paulo vista do alto.
     *
     * Entrou no lugar de uma busca por fachada comercial, que devolveu uma loja
     * com letreiro em japones — imagem de outro pais numa pagina que vende
     * servico de prefeitura paulistana e um erro que o visitante nota. Esta e
     * Sao Paulo de verdade, e ainda diz sozinha o recorte de atuacao: quadra
     * densa, lote estreito, edificacao colada na divisa. E o retrato do imovel
     * que precisa de regularizacao.
     */
    key: 'imovel-sao-paulo-aerea',
    query: 'brazil sao paulo city buildings street aerial',
    pick: 4,
    alt: 'Vista aérea de São Paulo, com quadras densas de casas e edifícios',
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

    /*
     * Parte do acervo ja foi convertida para WebP depois de baixada, e o arquivo
     * .jpg original saiu do repositorio. Conferir so o .jpg fazia o script
     * rebaixar essas imagens a cada execucao e devolver um .jpg duplicado ao
     * lado do .webp — dois arquivos disputando a mesma chave em src/lib/images.ts.
     * A chave e o nome sem extensao, entao a existencia tem de ser checada assim.
     */
    const jaBaixada = (await exists(dest)) || (await exists(join(IMAGES_DIR, `${item.key}.webp`)));

    if (!FORCE && jaBaixada && manifest[item.key]) {
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
