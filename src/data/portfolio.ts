/**
 * Obras da MDK.
 *
 * As fotos e os identificadores (FRJ, MB, NK) vieram do site anterior da
 * empresa, secoes "Em Andamento" e "Concluidos". As duas primeiras sao
 * registros reais de canteiro; a terceira esta marcada como placeholder
 * enquanto o cliente nao confirmar que a foto e de obra propria.
 *
 * `location` e opcional de proposito: o site anterior nao informava a cidade de
 * nenhuma obra e inventar o dado prejudicaria justamente o SEO local, que
 * depende de coerencia entre o que a pagina afirma e o que o Google verifica.
 *
 * `image` referencia a chave em src/data/images.json.
 */

export interface PortfolioItem {
  title: string;
  category: string;
  /** Cidade/UF. Omitir quando nao confirmado — ver nota acima. */
  location?: string;
  /** Fase da obra, usada como etiqueta secundaria. */
  status: 'Em andamento' | 'Concluída';
  image: string;
  placeholder?: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    title: 'Residência FRJ',
    category: 'Execução de Obra',
    status: 'Em andamento',
    image: 'obra-frj',
  },
  {
    title: 'Residência MB',
    category: 'Execução de Obra',
    status: 'Em andamento',
    image: 'obra-mb',
  },
  {
    title: 'Residência NK',
    category: 'Execução de Obra',
    status: 'Concluída',
    image: 'obra-nk',
    placeholder: true,
  },
];
