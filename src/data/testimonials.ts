/**
 * Depoimentos.
 *
 * TODOS PLACEHOLDER. Depoimento fabricado com nome de pessoa real e ilicito, e
 * com nome ficticio e enganoso — por isso os textos abaixo se identificam como
 * exemplo e o componente marca o bloco visualmente enquanto `placeholder` for true.
 *
 * Substituir pelos depoimentos reais autorizados pelos clientes da MDK.
 */

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Iniciais exibidas no avatar enquanto nao houver foto ou logo do cliente. */
  initials: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      '[DEPOIMENTO 1 — texto de exemplo] Espaço reservado para o depoimento real do cliente sobre o projeto executado pela MDK Engenharia.',
    author: '[Nome do cliente]',
    role: 'Cliente',
    company: '[Empresa]',
    initials: 'MD',
    placeholder: true,
  },
  {
    quote:
      '[DEPOIMENTO 2 — texto de exemplo] Espaço reservado para o depoimento real do cliente sobre o processo de regularização conduzido pela MDK.',
    author: '[Nome do cliente]',
    role: 'Cliente',
    company: '[Empresa]',
    initials: 'MD',
    placeholder: true,
  },
  {
    quote:
      '[DEPOIMENTO 3 — texto de exemplo] Espaço reservado para o depoimento real do cliente sobre o acompanhamento técnico da obra.',
    author: '[Nome do cliente]',
    role: 'Cliente',
    company: '[Empresa]',
    initials: 'MD',
    placeholder: true,
  },
];
