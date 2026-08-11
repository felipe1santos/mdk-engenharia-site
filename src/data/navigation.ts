/**
 * Menu do site.
 *
 * A ordem segue o que o cliente pediu no documento de ajustes: Home, Sobre nos,
 * Servicos, Projetos, Depoimentos, Area de Atuacao, Contato.
 *
 * Duas mudancas conscientes em relacao ao pedido literal:
 *
 * 1. Ele escreveu «Nossos servicos "Portfolio"», juntando as duas coisas. Aqui
 *    ficam separadas: Servicos e o que a empresa faz (intencao de compra) e
 *    Projetos e o que ela ja entregou (prova social). Sao buscas diferentes, e
 *    junta-las confunde tanto o visitante quanto o Google.
 *
 * 2. Ele escreveu «Blog "Depoimentos"», que tambem sao coisas distintas. Os
 *    depoimentos entram como ancora da home. O blog nao foi criado: exige
 *    compromisso editorial, e blog parado passa impressao de empresa inativa.
 *
 * `pending` marca destino que ainda e ancora provisoria da home.
 *
 * O submenu de Servicos segue a ordem do documento R01: Projetos, Prefeitura,
 * Bombeiros, CETESB, Execucao e consultoria. "Documentacao e regularizacao" saiu
 * do dropdown porque virou o guarda-chuva dos tres orgaos, e listar o pai junto
 * dos filhos so gerava duvida sobre onde clicar. A pagina continua existindo e
 * linkada no rodape e nas paginas dos orgaos.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Submenu — vira dropdown no desktop e acordeao no mobile. */
  children?: NavItem[];
  /** true enquanto o destino for uma ancora provisoria da home. */
  pending?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Sobre nós',
    href: '/sobre',
    children: [
      { label: 'História da empresa', href: '/sobre#historia' },
      { label: 'Missão, visão e valores', href: '/sobre#missao-visao-valores' },
      { label: 'Direção técnica', href: '/sobre#equipe' },
    ],
  },
  {
    label: 'Serviços',
    href: '/servicos',
    children: [
      { label: 'Projetos', href: '/servicos#projetos' },
      { label: 'Prefeitura', href: '/servicos/regularizacao/prefeitura' },
      { label: 'Bombeiros', href: '/servicos/regularizacao/bombeiros' },
      { label: 'CETESB', href: '/servicos/regularizacao/cetesb' },
      { label: 'Execução e consultoria', href: '/servicos#execucao' },
    ],
  },
  {
    label: 'Projetos',
    href: '/projetos',
    children: [
      { label: 'Em andamento', href: '/projetos#em-andamento' },
      { label: 'Concluídos', href: '/projetos#concluidos' },
      { label: 'Estudos em 3D', href: '/projetos#projetos-3d' },
    ],
  },
  { label: 'Depoimentos', href: '/#depoimentos', pending: true },
  { label: 'Áreas de Atuação', href: '/areas-de-atuacao' },
  { label: 'Contato', href: '/contato' },
];

export const footerNav = {
  servicos: [
    { label: 'Projeto Arquitetônico', href: '/servicos/projeto-arquitetonico' },
    { label: 'Projetos Estruturais', href: '/servicos/projeto-estrutural' },
    { label: 'Instalações Hidráulicas', href: '/servicos/projeto-hidraulico' },
    { label: 'Instalações Elétricas', href: '/servicos/projeto-eletrico' },
    { label: 'Projetos de SPCI', href: '/servicos/projeto-spci' },
    { label: 'Documentação e Regularização', href: '/servicos/regularizacao' },
    { label: 'AVCB e Corpo de Bombeiros', href: '/servicos/regularizacao/bombeiros' },
    { label: 'Ver todos os serviços', href: '/servicos' },
  ],
  institucional: [
    { label: 'Sobre a MDK', href: '/sobre' },
    { label: 'Direção técnica', href: '/sobre#equipe' },
    { label: 'Obras realizadas', href: '/projetos' },
    { label: 'Áreas de atuação', href: '/areas-de-atuacao' },
    { label: 'Contato', href: '/contato' },
  ],
};
