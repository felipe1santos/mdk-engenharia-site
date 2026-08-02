/**
 * Menu do site. Todos os itens finais ja existem; as paginas internas ainda nao
 * foram construidas, entao os links apontam para ancoras da home. Quando cada
 * pagina existir, basta trocar o href aqui — a navbar, o rodape e o drawer mobile
 * leem desta mesma lista.
 */

export interface NavItem {
  label: string;
  href: string;
  /** true enquanto o destino for uma ancora provisoria da home. */
  pending?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Serviços', href: '#servicos', pending: true },
  { label: 'Projetos', href: '#projetos', pending: true },
  { label: 'Sobre', href: '#sobre', pending: true },
  { label: 'Áreas de Atuação', href: '#areas-de-atuacao', pending: true },
  { label: 'Contato', href: '#contato', pending: true },
];

export const footerNav = {
  servicos: [
    { label: 'Projeto Hidráulico', href: '#servicos' },
    { label: 'Projeto Elétrico', href: '#servicos' },
    { label: 'Documentação e Regularização', href: '#servicos' },
    { label: 'Projetos de Edificações', href: '#servicos' },
    { label: 'Execução e Reforma', href: '#servicos' },
  ],
  institucional: [
    { label: 'Sobre a MDK', href: '#sobre' },
    { label: 'Obras Realizadas', href: '#projetos' },
    { label: 'Áreas de Atuação', href: '#areas-de-atuacao' },
    { label: 'Contato', href: '#contato' },
  ],
};
