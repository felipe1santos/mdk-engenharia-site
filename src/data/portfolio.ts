/**
 * Servicos realizados.
 *
 * As fotos sao de banco de imagens (Pexels) e servem para validar o layout.
 * Substituir por fotos reais de obras da MDK antes de publicar — foto de banco
 * em portfolio passa a impressao errada e nao gera confianca local.
 *
 * `image` referencia a chave em src/data/images.json.
 */

export interface PortfolioItem {
  title: string;
  category: string;
  location: string;
  image: string;
  placeholder?: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    title: 'Projeto hidráulico residencial',
    category: 'Instalações Hidráulicas',
    location: 'São Paulo, SP',
    image: 'portfolio-1',
    placeholder: true,
  },
  {
    title: 'Instalações elétricas prediais',
    category: 'Instalações Elétricas',
    location: 'Guarulhos, SP',
    image: 'portfolio-2',
    placeholder: true,
  },
  {
    title: 'Regularização de edificação',
    category: 'Documentação',
    location: 'Osasco, SP',
    image: 'portfolio-3',
    placeholder: true,
  },
  {
    title: 'Estrutura em concreto armado',
    category: 'Execução',
    location: 'Barueri, SP',
    image: 'portfolio-4',
    placeholder: true,
  },
  {
    title: 'Reforma comercial',
    category: 'Reforma',
    location: 'São Paulo, SP',
    image: 'portfolio-5',
    placeholder: true,
  },
  {
    title: 'Supervisão de obra',
    category: 'Consultoria',
    location: 'Santana de Parnaíba, SP',
    image: 'portfolio-6',
    placeholder: true,
  },
];
