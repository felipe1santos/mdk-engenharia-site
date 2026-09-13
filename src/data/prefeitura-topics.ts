/**
 * Os assuntos em que a frente de Prefeitura se divide.
 *
 * POR QUE ESTE ARQUIVO EXISTE. `agencies.ts` descreve o balcao inteiro numa
 * pagina so — bom para quem procura "regularizacao na prefeitura", ruim para
 * trafego pago. Quem clica num anuncio de "habite-se" nao quer ler sobre
 * desdobro de lote antes de achar o que procurava, e uma pagina que fala de
 * tudo converte pior do que quatro que falam de uma coisa cada.
 *
 * Entao /servicos/regularizacao/prefeitura virou pagina-mae: explica a frente e
 * distribui para o assunto especifico. Esta lista e o indice dessa distribuicao.
 *
 * `href` APONTA PARA DOIS LUGARES DIFERENTES, DE PROPOSITO:
 *
 *   - Assunto com pagina propria recebe a URL dela.
 *   - Assunto que ainda nao tem recebe a ancora da sua secao na pagina-mae,
 *     que traz o conteudo completo do tema.
 *
 * Assim nenhum card leva a lugar nenhum enquanto as paginas nao existem, e
 * publicar uma nova e trocar o `href` e o `tipo` de uma entrada. O visitante
 * nunca ve um link morto, e o Google nunca indexa um 404.
 *
 * A ORDEM E A DE INTENCAO DE COMPRA, nao a alfabetica: "regularizacao de
 * imovel" e o termo de maior volume e o de maior urgencia (quem busca ja tem
 * problema), entao vem primeiro e e o unico com pagina de vendas ate agora.
 */

export type TopicoTipo = 'pagina' | 'secao';

export interface PrefeituraTopico {
  id: string;
  /** Titulo do card e da secao correspondente na pagina-mae. */
  titulo: string;
  /** Uma linha sob o titulo, no card. */
  tagline: string;
  /** Paragrafo do card. */
  resumo: string;
  icon: 'building' | 'document' | 'clipboard' | 'ruler' | 'shield' | 'check';
  /** URL da pagina propria, ou ancora da secao na pagina-mae. */
  href: string;
  tipo: TopicoTipo;
  /** Rotulo do link do card — muda conforme o destino. */
  cta: string;
  /** Conteudo da secao na pagina-mae. Tambem serve de resumo para o buscador. */
  secao: {
    intro: string;
    /** O que entra no escopo deste assunto especifico. */
    itens: { titulo: string; texto: string }[];
    /** Frase curta de fechamento, com o gancho de contato. */
    nota?: string;
  };
}

export const prefeituraTopicos: PrefeituraTopico[] = [
  {
    id: 'regularizacao-de-imovel',
    titulo: 'Regularização de imóvel',
    tagline: 'Construção existente sem alvará ou fora do que foi aprovado',
    resumo:
      'O imóvel já está construído, mas a prefeitura e o cartório não sabem disso. Fazemos o levantamento do que existe, o projeto de regularização e o processo até o auto sair — e a área construída entrar na matrícula.',
    icon: 'building',
    href: '/servicos/regularizacao/prefeitura/regularizacao-de-imovel',
    tipo: 'pagina',
    cta: 'Ver a página completa',
    secao: {
      intro:
        'É o caminho para a construção que foi executada sem alvará, ou em desacordo com o projeto aprovado. Termina no Auto de Regularização, que é o documento que permite averbar a construção em cartório.',
      itens: [
        {
          titulo: 'Levantamento do que existe',
          texto:
            'Medição em campo de tudo que está construído hoje, incluindo ampliações, edículas e pavimentos que não constam em lugar nenhum.',
        },
        {
          titulo: 'Análise de viabilidade legal',
          texto:
            'Comparação do que existe com a matrícula, o cadastro de IPTU e a legislação vigente. É o que diz o que dá para manter, o que precisa de adequação e o que não tem caminho.',
        },
        {
          titulo: 'Projeto e processo',
          texto:
            'Peças técnicas no padrão do município, protocolo, resposta às exigências e acompanhamento até a emissão do auto.',
        },
      ],
    },
  },
  {
    id: 'habite-se',
    titulo: 'Habite-se',
    tagline: 'Certificado de Conclusão da obra concluída conforme o aprovado',
    resumo:
      'A obra acabou e o alvará existe, mas falta o documento que fecha o ciclo. Sem ele o imóvel não é averbado, não financia e continua constando na matrícula com a área antiga.',
    icon: 'check',
    href: '#habite-se',
    tipo: 'secao',
    cta: 'Ver detalhes',
    secao: {
      intro:
        'O Certificado de Conclusão — o Habite-se — atesta que a obra foi executada conforme o projeto aprovado. É a peça que o cartório exige para averbar a construção na matrícula, e o banco para financiar.',
      itens: [
        {
          titulo: 'Conferência prévia do executado',
          texto:
            'Antes de protocolar, comparamos a obra com o projeto aprovado. Divergência descoberta na vistoria do órgão custa muito mais caro do que descoberta antes dela.',
        },
        {
          titulo: 'Protocolo e vistoria',
          texto:
            'Abertura do processo, recolhimento de taxas, acompanhamento da análise e da vistoria, quando houver.',
        },
        {
          titulo: 'Averbação em cartório',
          texto:
            'Com o certificado em mãos, orientamos a averbação no Registro de Imóveis — que é onde a área construída finalmente entra na matrícula.',
        },
      ],
      nota: 'Se a obra saiu diferente do aprovado, o caminho não é o Habite-se direto: é regularizar primeiro. Falamos disso no diagnóstico.',
    },
  },
  {
    id: 'aprovacao-e-alvara',
    titulo: 'Aprovação e Alvará',
    tagline: 'Aprovação do projeto e autorização para construir',
    resumo:
      'Antes de começar a obra. Verificamos o que o zoneamento do lote permite, montamos o projeto no padrão do município e conduzimos o processo até a autorização para executar.',
    icon: 'document',
    href: '#aprovacao-e-alvara',
    tipo: 'secao',
    cta: 'Ver detalhes',
    secao: {
      intro:
        'O Alvará de Aprovação e Execução é o que separa uma obra legal de uma infração. A análise confere recuos, taxa de ocupação, coeficiente de aproveitamento e gabarito contra a lei de zoneamento do lote.',
      itens: [
        {
          titulo: 'Consulta de zoneamento',
          texto:
            'O que o lote admite em área construída, altura e uso — antes de desenhar qualquer coisa. É a etapa que evita projetar o que não seria aprovado.',
        },
        {
          titulo: 'Projeto legal e peças técnicas',
          texto:
            'Plantas, cortes, fachadas, memorial, quadro de áreas e as ARTs/RRTs correspondentes, no padrão exigido pelo município.',
        },
        {
          titulo: 'Licença para residência unifamiliar',
          texto:
            'Casa isolada tem procedimento simplificado, com trâmite próprio e mais rápido que o de uma edificação de porte.',
        },
      ],
    },
  },
  {
    id: 'desdobro-de-lote',
    titulo: 'Desdobro de lote',
    tagline: 'Dividir um lote, juntar dois e ajustar o IPTU',
    resumo:
      'Desdobro, desmembramento e unificação, com o ajuste do cadastro de IPTU que vem junto. É pré-requisito para vender parte de um terreno ou construir sobre lotes hoje separados.',
    icon: 'ruler',
    href: '#desdobro-de-lote',
    tipo: 'secao',
    cta: 'Ver detalhes',
    secao: {
      intro:
        'Terreno também tem documentação, e ela precisa bater com a realidade antes de qualquer negócio. Dividir, juntar ou remembrar lotes é processo na prefeitura, com reflexo no cadastro fiscal e na matrícula.',
      itens: [
        {
          titulo: 'Desdobro e desmembramento',
          texto:
            'Divisão de um lote em dois ou mais, respeitando a área e a testada mínimas que a lei de parcelamento exige para a zona.',
        },
        {
          titulo: 'Unificação de lotes',
          texto:
            'Junção de lotes contíguos em um só — condição para construir uma edificação que atravessa a divisa de dois terrenos.',
        },
        {
          titulo: 'Desmembramento e unificação de IPTU',
          texto:
            'Ajuste do cadastro fiscal para acompanhar a nova configuração. Sem ele, o carnê continua chegando pela divisão antiga.',
        },
      ],
    },
  },
];
