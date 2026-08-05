/**
 * Faixa de numeros.
 *
 * Numeros inventados em site institucional sao risco real: viram propaganda
 * enganosa se o cliente nao puder comprova-los. Enquanto qualquer item tiver
 * `placeholder`, o componente marca visualmente o bloco inteiro.
 *
 * "Anos de mercado" ja e real: sai da fundacao em 2010 declarada pela empresa
 * (src/data/site.ts) e se atualiza sozinho a cada ano. Os outros tres seguem
 * PLACEHOLDER ate o cliente informar os valores.
 */
import { yearsInBusiness } from './site';

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
  { value: yearsInBusiness, label: 'Anos de mercado', icon: 'calendar' },
  { value: 90000, prefix: '+', label: 'm² projetados', icon: 'ruler', placeholder: true },
];
