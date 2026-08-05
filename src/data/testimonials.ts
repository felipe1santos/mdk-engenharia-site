/**
 * Depoimentos.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  ATENÇÃO — CONTEÚDO FICTÍCIO                                             │
 * │                                                                          │
 * │  Nenhum destes depoimentos é real. Foram escritos como conteúdo de        │
 * │  demonstração, a pedido do cliente, enquanto o perfil no Google Meu       │
 * │  Negócio não existe e não há avaliação verdadeira para exibir.            │
 * │                                                                          │
 * │  Publicar depoimento fabricado em site comercial é publicidade enganosa   │
 * │  (CDC, art. 37) e, com nome de pessoa real, também é uso indevido de      │
 * │  imagem. SUBSTITUIR POR AVALIAÇÕES REAIS ANTES DE TIRAR O `noindex` E     │
 * │  DIVULGAR O SITE.                                                        │
 * │                                                                          │
 * │  A flag `fictitious` existe para isso: enquanto qualquer item a tiver,    │
 * │  o componente marca o bloco e o build de produção pode ser configurado    │
 * │  para falhar. Ver a nota em README.md > Conteúdo pendente.                │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * Os textos foram ancorados nos serviços que a empresa realmente presta —
 * regularização em prefeitura, AVCB, projeto de instalações, execução de obra —
 * para que o conteúdo faça sentido para quem lê e sirva de referência de tom
 * quando os depoimentos reais chegarem.
 */

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Iniciais exibidas no avatar enquanto nao houver foto ou logo do cliente. */
  initials: string;
  /** Serviço a que o depoimento se refere; vira etiqueta no card. */
  service?: string;
  /** true enquanto o texto for ficticio. Ver o aviso no topo do arquivo. */
  fictitious?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Comprei um sobrado que estava fora da planta aprovada e não conseguia financiar. A MDK levantou o que existia, mostrou o que dava para regularizar e o que não dava, e conduziu o processo na prefeitura até sair o Habite-se. O que mais me tranquilizou foi receber o diagnóstico antes do orçamento, sem promessa de prazo que ninguém cumpre.',
    author: 'Renato Aguiar',
    role: 'Proprietário',
    company: 'Residência em Santana, São Paulo',
    initials: 'RA',
    service: 'Regularização e Habite-se',
    fictitious: true,
  },
  {
    quote:
      'Precisávamos do AVCB para abrir a unidade e já tínhamos perdido dois meses com outro escritório. Eles refizeram a classificação, ajustaram o projeto de hidrantes e as rotas de fuga, e acompanharam a vistoria do Corpo de Bombeiros. Saiu na primeira vistoria — o que, no nosso caso, significou não atrasar a inauguração.',
    author: 'Camila Nogueira',
    role: 'Gerente administrativa',
    company: 'Rede de clínicas em Guarulhos',
    initials: 'CN',
    service: 'Projeto de SPCI e AVCB',
    fictitious: true,
  },
  {
    quote:
      'Contratei projeto de instalações para um galpão de manutenção automotiva. Entregaram hidráulica, elétrica e ar-condicionado compatibilizados entre si e com a estrutura, mais o 3D que me ajudou a decidir o layout dos elevadores antes de gastar. Na obra não teve furo de viga improvisado nem tubulação passando onde não cabia.',
    author: 'Diego Sampaio',
    role: 'Sócio-proprietário',
    company: 'Oficina automotiva, Zona Norte de São Paulo',
    initials: 'DS',
    service: 'Projeto de instalações e 3D',
    fictitious: true,
  },
  {
    quote:
      'Fizeram a execução da nossa casa do zero, com cronograma físico-financeiro e medição por etapa concluída. Atrasou duas semanas por causa de chuva, e nos avisaram antes de eu perguntar. É a segunda obra que faço na vida e a primeira em que eu soube, o tempo todo, em que pé estava o meu dinheiro.',
    author: 'Patrícia Lemos',
    role: 'Cliente',
    company: 'Residência unifamiliar, Mairiporã',
    initials: 'PL',
    service: 'Execução de obra',
    fictitious: true,
  },
];
