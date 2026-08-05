/**
 * Projetos executivos do acervo da MDK — o que a empresa desenha, nao o que
 * constroi. Por isso ganham secao propria e nao entram misturados ao portfolio
 * de obra: uma coisa e a prancha, outra e o canteiro.
 *
 * Fontes: "Apresentação em 3D_R01.pdf" (renderizacoes) e a prancha executiva
 * ARQ 001 (desenhos), ambos enviados pelo cliente. Imagens extraidas dos PDFs
 * em resolucao original.
 *
 * SOBRE O NOME: por precaucao, o projeto era identificado apenas pela tipologia
 * enquanto nao houvesse autorizacao para divulgar o estabelecimento. A duvida se
 * resolveu sozinha — o cliente enviou a prancha e a apresentacao justamente para
 * publicar, com carimbo e nome legiveis. O nome fica.
 *
 * NAO INVENTAR DADO TECNICO AQUI. Area, prazo, custo e numero de vagas nao
 * constam da prancha; enquanto o cliente nao informar, nao existem no site. Os
 * textos entre aspas na apresentacao estao transcritos literalmente em `notes`.
 */

export interface SpecItem {
  label: string;
  value: string;
}

export interface Drawing {
  /** Chave em src/data/images.json. */
  image: string;
  title: string;
  /** O que o desenho resolve — nao o que ele mostra. */
  caption: string;
  /** Escala do carimbo. Ausente na prancha completa, que traz duas. */
  scale?: string;
}

/**
 * Bloco de ambiente: o texto transcrito da apresentacao mais as vistas
 * correspondentes. Manter juntos evita que a pagina vire uma galeria muda.
 */
export interface ProjectSection {
  id: string;
  title: string;
  lead: string;
  /** Transcricao literal dos slides. Nao reescrever. */
  notes: string[];
  /** Chaves em src/data/images.json. */
  images: string[];
}

export interface RenderProject {
  id: string;
  /** Rota da pagina propria, sob /projetos/. */
  slug: string;
  title: string;
  /** Tipologia e escopo, exibidos abaixo do titulo. */
  subtitle: string;
  description: string;
  /** Destaques do estudo, em texto curto. */
  highlights: string[];
  /**
   * O antes e o depois que o cliente pediu.
   *
   * Nao sao duas fotos de epocas diferentes: o "antes" e o arranjo ortogonal dos
   * veiculos que o desenho registra em cinza claro, e o "depois" e o arranjo em
   * leque sobreposto em preto — a decisao de projeto propriamente dita. O render
   * ao lado mostra o mesmo salao ja modelado, para quem nao le planta.
   */
  comparison: {
    intro: string;
    before: { image: string; label: string; caption: string };
    after: { image: string; label: string; caption: string };
  };
  /** Prancha executiva. O primeiro item e o usado na comparacao acima. */
  drawings: Drawing[];
  /** Renders 3D, na ordem da apresentacao. */
  images: string[];
  /**
   * Capa da secao resumida. As vistas nao tem o mesmo peso: a fachada situa o
   * projeto, as internas so fazem sentido depois dele.
   */
  cover: string;
  /** Texto da apresentacao, agrupado por ambiente. Usado na pagina propria. */
  sections: ProjectSection[];
  /** Ambientes que aparecem na planta baixa. */
  spaces: string[];
  /** Carimbo da prancha. */
  spec: SpecItem[];
  /** Cotas lidas do detalhamento. Sao as medidas que o instalador confere. */
  dimensions: SpecItem[];
  /** Frase de fecho da apresentacao, transcrita. */
  closing: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

export const renderProjects: RenderProject[] = [
  {
    id: 'oficina-francisco',
    slug: '/projetos/oficina-francisco',
    title: 'Oficina Mecânica Francisco',
    subtitle: 'Projeto executivo de arquitetura · Guarulhos/SP',
    description:
      'Oficina de manutenção automotiva com salão de elevadores, mezanino técnico, escritórios e sala de espera de clientes. O desenho resolveu a distribuição dos elevadores antes de a obra começar: o alinhamento ortogonal dos veículos, estudado primeiro, deu lugar a um arranjo em leque — a solução adotada para otimizar a circulação dentro do salão.',
    highlights: [
      'Integração entre área técnica, atendimento e administração',
      'Layout otimizado para circulação de veículos',
      'Estrutura preparada para múltiplos atendimentos simultâneos',
      'Ambiente moderno, funcional e eficiente',
    ],
    comparison: {
      intro:
        'A prancha registra as duas hipóteses no mesmo desenho: o arranjo ortogonal dos veículos aparece em cinza claro, e o arranjo em leque que foi adotado vem sobreposto em preto, com os elevadores marcados em vermelho. É a decisão de projeto inteira em uma folha.',
      before: {
        image: 'projeto-layout-elevadores',
        label: 'No papel',
        caption:
          'Layout de distribuição de elevadores. Em cinza claro, o arranjo ortogonal estudado antes; em preto, com os elevadores em vermelho, o arranjo em leque adotado.',
      },
      after: {
        image: 'render-oficina-4',
        label: 'No 3D',
        caption:
          'O mesmo salão modelado, visto de cima: os elevadores nas posições definidas pela planta e a circulação central livre para manobra.',
      },
    },
    drawings: [
      {
        image: 'projeto-layout-elevadores',
        title: 'Layout de distribuição de elevadores',
        caption:
          'Compara o arranjo ortogonal dos veículos, em cinza claro, com o arranjo em leque adotado, em preto e vermelho.',
        scale: '1:75',
      },
      {
        image: 'projeto-detalhe-elevadores',
        title: 'Detalhamento dos elevadores',
        caption:
          'Vistas frontal, lateral e superior dos elevadores Forta Tech, cotadas — o que o instalador confere antes de furar o piso.',
        scale: '1:75',
      },
      {
        image: 'projeto-corte-espera',
        title: 'Corte da sala de espera',
        caption:
          'Seção pela área de espera, com o playground suspenso e o pé-direito resultante.',
        scale: '1:50',
      },
      {
        image: 'projeto-prancha-completa',
        title: 'Prancha ARQ 001',
        caption:
          'A folha A3 inteira, com planta, cortes, detalhes e carimbo nas escalas 1:50 e 1:75.',
      },
    ],
    images: [
      'render-oficina-1',
      'render-oficina-2',
      'render-oficina-3',
      'render-oficina-4',
      'render-oficina-5',
      'render-oficina-6',
    ],
    cover: 'render-oficina-1',
    sections: [
      {
        id: 'fachada',
        title: 'Fachada',
        lead:
          'A frente do edifício precisa fazer duas coisas ao mesmo tempo: deixar o veículo entrar e dizer, da calçada, que ali dentro se trabalha com técnica.',
        notes: [
          'Arquitetura contemporânea com linguagem industrial',
          'Grandes vãos para entrada de veículos',
          'Painéis metálicos e design moderno',
          'Identidade visual forte e tecnológica',
        ],
        images: ['render-oficina-1', 'render-oficina-2'],
      },
      {
        id: 'salao',
        title: 'Salão de elevadores',
        lead:
          'O coração da operação, e o ambiente que definiu o restante da planta: a posição dos elevadores determina por onde o carro entra, onde ele manobra e quanto sobra para trabalhar em volta.',
        notes: [
          'Espaço principal destinado à manutenção automotiva',
          'Elevadores hidráulicos',
          'Circulação central para manobra',
          'Estrutura preparada para múltiplos atendimentos simultâneos',
        ],
        images: ['render-oficina-3', 'render-oficina-4'],
      },
      {
        id: 'mezanino',
        title: 'Mezanino técnico',
        lead:
          'O apoio sai do chão do salão e sobe. Ferramenta e peça deixam de disputar espaço com o veículo, e quem está em cima enxerga a operação inteira.',
        notes: [
          'Estrutura metálica superior',
          'Espaço destinado a armazenamento e circulação técnica',
          'Organização de ferramentas e peças',
          'Visão ampla da área operacional',
        ],
        images: ['render-oficina-5'],
      },
      {
        id: 'espera',
        title: 'Sala de espera e atendimento',
        lead:
          'Quem deixa o carro fica. A espera foi projetada como ambiente próprio — com playground suspenso, detalhado em corte na prancha —, e não como sobra de circulação.',
        notes: [
          'Espaço dedicado ao conforto do cliente',
          'Assentos e área de espera',
          'Ambiente organizado e funcional',
          'Experiência confortável para clientes',
        ],
        images: ['render-oficina-6'],
      },
    ],
    spaces: [
      'Estacionamento na frente da loja',
      'Salão de elevadores',
      'Dois escritórios',
      'WC de clientes',
      'Casa de bonecas',
      'Sala de espera com TV e playground suspenso',
    ],
    spec: [
      { label: 'Projeto', value: 'Oficina Mecânica Francisco' },
      { label: 'Local', value: 'Guarulhos/SP' },
      { label: 'Escopo', value: 'Projeto executivo de arquitetura' },
      { label: 'Prancha', value: 'ARQ 001 · revisão 00 · formato A3' },
      { label: 'Escalas', value: '1:50 e 1:75' },
      { label: 'Elevadores', value: 'Forta Tech' },
      { label: 'Data', value: '11/03/2026' },
      { label: 'Projeto, desenho e coordenação', value: 'Miro Bergamo' },
    ],
    dimensions: [
      { label: 'Elevador de frente', value: 'vão de 3,39 m · altura 2,73 m' },
      { label: 'Elevador lateral', value: 'altura livre de 2,52 m a 2,72 m' },
      { label: 'Elevador superior', value: 'vão de 3,37 m' },
    ],
    closing: 'Estrutura preparada para alto desempenho operacional',
    seo: {
      title: 'Oficina Mecânica Francisco — projeto executivo de arquitetura | MDK Engenharia',
      description:
        'Projeto executivo de arquitetura de uma oficina automotiva em Guarulhos/SP: layout de distribuição dos elevadores, mezanino técnico, sala de espera e renders 3D dos ambientes.',
      keywords: [
        'projeto de oficina mecânica',
        'projeto arquitetônico de oficina automotiva',
        'layout de elevadores automotivos',
        'projeto executivo Guarulhos',
        'render 3D de oficina',
      ],
    },
  },
];

/** Projeto em destaque — hoje ha um so, mas a home nunca deve assumir isso. */
export const featuredProject = renderProjects[0];
