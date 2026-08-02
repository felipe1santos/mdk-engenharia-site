/**
 * Cidades atendidas — conteudo de SEO local.
 *
 * Quatorze entradas, cada uma com uma frase natural do servico correspondente.
 * O numero e limitado de proposito: listas exaustivas de combinacoes
 * servico x cidade configuram doorway content e sao penalizadas pelo Google.
 *
 * Esta lista tambem alimenta `areaServed` no JSON-LD.
 */

export interface City {
  name: string;
  /** Frase indexavel, combinando servico + local. */
  phrase: string;
  /** Destaque visual — cidades onde a empresa tem presenca mais forte. */
  featured?: boolean;
}

export const cities: City[] = [
  { name: 'São Paulo', phrase: 'Projeto hidráulico e elétrico em São Paulo', featured: true },
  { name: 'Guarulhos', phrase: 'Regularização de obras em Guarulhos', featured: true },
  { name: 'Osasco', phrase: 'Projeto elétrico em Osasco', featured: true },
  { name: 'Barueri', phrase: 'Aprovação de projeto na prefeitura de Barueri' },
  { name: 'Santana de Parnaíba', phrase: 'Projeto de edificações em Santana de Parnaíba' },
  { name: 'Caieiras', phrase: 'Construção civil em Caieiras' },
  { name: 'Franco da Rocha', phrase: 'Documentação para projeto em Franco da Rocha' },
  { name: 'Mairiporã', phrase: 'Projeto hidráulico em Mairiporã' },
  { name: 'Cajamar', phrase: 'Regularização de imóveis em Cajamar' },
  { name: 'Carapicuíba', phrase: 'Projeto elétrico residencial em Carapicuíba' },
  { name: 'Taboão da Serra', phrase: 'Reforma e ampliação em Taboão da Serra' },
  { name: 'Cotia', phrase: 'Consultoria de engenharia civil em Cotia' },
  { name: 'Santo André', phrase: 'Projeto de instalações em Santo André' },
  { name: 'São Bernardo do Campo', phrase: 'Habite-se e regularização em São Bernardo do Campo' },
];
