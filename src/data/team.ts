/**
 * Direcao e equipe tecnica da MDK.
 *
 * As fotos vieram do cliente (pasta equipe/). Duas sao de ensaio no escritorio
 * — mesmo fundo, mesma luz — e duas foram feitas em outro contexto. Todas foram
 * recortadas em 4:5 e recebem o mesmo tratamento visual no componente
 * (dessaturacao + tinta navy da marca), que e o que faz as quatro lerem como um
 * conjunto apesar da origem diferente.
 *
 * PENDENTE (ver docs/superpowers/plans/2026-08-05-ajustes-cliente.md, B5):
 * - Nome completo de Angelica — so veio o primeiro nome.
 * - Numero de CREA/CAU dos responsaveis tecnicos. E o dado que mais constroi
 *   autoridade nesta secao; o campo `registry` ja existe para receber.
 * - Autorizacao das quatro pessoas para uso de nome e imagem no site.
 *
 * RESOLVIDO: o nome completo do diretor tecnico saiu do carimbo da prancha
 * executiva enviada pelo cliente (equipe/Drawing1-Model.pdf), onde ele assina
 * como projetista, desenhista e coordenador.
 */

export interface TeamMember {
  name: string;
  role: string;
  /** Registro profissional (CREA/CAU), quando houver. */
  registry?: string;
  image: string;
  /** true enquanto o nome ou o registro estiver incompleto. */
  placeholder?: boolean;
}

export const team: TeamMember[] = [
  {
    name: 'Miro Bergamo',
    role: 'Diretor Técnico',
    image: 'equipe-miro',
  },
  {
    name: 'Dayane Kilma',
    role: 'Diretora Comercial',
    image: 'equipe-dayane',
  },
  {
    name: 'Angélica',
    role: 'Diretora Administrativa',
    image: 'equipe-angelica',
    placeholder: true,
  },
  {
    name: 'Hellen Vargas',
    role: 'Arquiteta',
    image: 'equipe-hellen',
  },
];
