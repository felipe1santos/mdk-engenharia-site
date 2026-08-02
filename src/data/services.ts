/**
 * Servicos da MDK.
 *
 * `primary` sao os tres em destaque na home — o foco comercial atual da empresa.
 * `secondary` aparecem em grid compacto logo abaixo.
 *
 * O campo `image` referencia a chave em src/data/images.json, preenchida pelo
 * script scripts/fetch-images.mjs.
 */

export interface Service {
  id: string;
  title: string;
  /** Frase curta usada no card. */
  summary: string;
  /** Itens concretos do escopo — servem de conteudo indexavel para long-tail. */
  bullets: string[];
  icon: 'water' | 'bolt' | 'document' | 'building' | 'hammer' | 'shield' | 'clipboard';
  image?: string;
}

export const primaryServices: Service[] = [
  {
    id: 'projeto-hidraulico',
    title: 'Projeto de Instalações Hidráulicas',
    summary:
      'Dimensionamento completo de água fria, água quente, esgoto e águas pluviais, com memorial de cálculo e detalhamento executivo.',
    bullets: [
      'Água fria e água quente',
      'Esgoto sanitário e ventilação',
      'Captação de águas pluviais',
      'Memorial de cálculo e ART',
    ],
    icon: 'water',
    image: 'service-hidraulico',
  },
  {
    id: 'projeto-eletrico',
    title: 'Projeto de Instalações Elétricas',
    summary:
      'Projetos elétricos de baixa tensão conforme NBR 5410, do quadro de cargas ao diagrama unifilar, prontos para aprovação na concessionária.',
    bullets: [
      'Quadro de cargas e diagrama unifilar',
      'Dimensionamento de circuitos e proteções',
      'SPDA e aterramento',
      'Padrão de entrada da concessionária',
    ],
    icon: 'bolt',
    image: 'service-eletrico',
  },
  {
    id: 'regularizacao',
    title: 'Documentação e Regularização',
    summary:
      'Regularização de imóveis e aprovação de projetos junto à prefeitura, do levantamento inicial ao Habite-se.',
    bullets: [
      'Aprovação de projeto na prefeitura',
      'Regularização de construção existente',
      'Alvará de execução e Habite-se',
      'Emissão de ART e RRT',
    ],
    icon: 'document',
    image: 'service-documentacao',
  },
];

export const secondaryServices: Service[] = [
  {
    id: 'projeto-edificacoes',
    title: 'Projetos de Edificações',
    summary: 'Projeto arquitetônico e estrutural para obras residenciais e comerciais.',
    bullets: [],
    icon: 'building',
  },
  {
    id: 'execucao-reforma',
    title: 'Execução e Reforma',
    summary: 'Construção, reforma e ampliação com equipe própria e cronograma controlado.',
    bullets: [],
    icon: 'hammer',
  },
  {
    id: 'impermeabilizacao',
    title: 'Impermeabilização',
    summary: 'Tratamento de lajes, baldrames, reservatórios e áreas molhadas.',
    bullets: [],
    icon: 'shield',
  },
  {
    id: 'consultoria',
    title: 'Consultoria e Supervisão de Obra',
    summary: 'Acompanhamento técnico, laudos e fiscalização de execução.',
    bullets: [],
    icon: 'clipboard',
  },
];
