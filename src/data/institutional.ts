/**
 * Textos institucionais da MDK.
 *
 * Missao, Visao e Valores sao reproducao literal do que a empresa publica em
 * mdkengenharia.com.br/sobre-nos. Nao reescrever sem autorizacao: sao a palavra
 * oficial da empresa sobre ela mesma, nao copy de marketing.
 *
 * Os pilares (`values`) vem do manual de marca e continuam sendo o resumo
 * pratico exibido ao lado da foto na secao "Sobre".
 */

export const institutional = {
  /** Paragrafos de abertura da secao "Sobre", baseados no texto da empresa. */
  intro: [
    'A MDK Engenharia e Arquitetura é especializada em obras residenciais, comerciais e industriais. Fundada em 2010, atua com projetos e construção em todo o Brasil, com qualidade e foco nas necessidades de cada cliente.',
    'A armação de coluna presente na marca não é enfeite: é o símbolo do que sustenta o trabalho — estabilidade, solidez e resistência. É assim que tratamos projeto e obra.',
  ],

  missionVisionValues: [
    {
      title: 'Missão',
      text: 'Atuar no mercado com integridade, ética, competência, eficiência, qualidade e inovação, tornando-se primeira empresa em soluções de Engenharia, Projetos e Construção.',
      icon: 'compass',
    },
    {
      title: 'Visão',
      text: 'Melhoria contínua e inovação tecnológica para disponibilização de soluções que atendam e superem as expectativas de nossos clientes.',
      icon: 'blueprint',
    },
    {
      title: 'Valores',
      text: 'A valorização do homem e a sustentabilidade das atividades da empresa, seja como recurso ou no resultado de suas operações.',
      icon: 'shield',
    },
  ] as const,

  /** Pilares do manual de marca, exibidos ao lado da foto. */
  values: [
    { title: 'Segurança', text: 'Normas técnicas seguidas à risca em cada projeto.' },
    { title: 'Qualidade', text: 'Detalhamento executivo que evita retrabalho na obra.' },
    { title: 'Prazo', text: 'Cronograma definido e cumprido, da entrega à aprovação.' },
    { title: 'Resultados', text: 'Projeto aprovado e obra regularizada, sem pendências.' },
  ],
} as const;
