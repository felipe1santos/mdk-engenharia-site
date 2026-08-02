/**
 * Faixa de numeros.
 *
 * TODOS OS VALORES SAO PLACEHOLDER. Numeros inventados em site institucional sao
 * risco real: viram propaganda enganosa se o cliente nao puder comprova-los.
 * Enquanto `placeholder` for true, o componente marca visualmente o bloco.
 * Substituir pelos numeros reais da MDK e remover a flag.
 */

export interface Stat {
  value: number;
  /** Sufixo exibido apos o numero, ex.: '+' ou 'm²'. */
  suffix?: string;
  prefix?: string;
  label: string;
  icon: 'building' | 'blueprint' | 'calendar' | 'ruler';
  placeholder?: boolean;
}

export const stats: Stat[] = [
  { value: 250, prefix: '+', label: 'Projetos entregues', icon: 'blueprint', placeholder: true },
  { value: 180, prefix: '+', label: 'Obras acompanhadas', icon: 'building', placeholder: true },
  { value: 12, prefix: '+', label: 'Anos de experiência', icon: 'calendar', placeholder: true },
  { value: 90000, prefix: '+', label: 'm² projetados', icon: 'ruler', placeholder: true },
];
