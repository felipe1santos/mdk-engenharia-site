/**
 * Guias — conteudo editorial de SEO.
 *
 * POR QUE ESTAS QUATRO PAGINAS, E NAO OUTRAS
 *
 * Consulta ao Planejador de Palavras-chave do Google em 14/08/2026, mercado
 * Brasil, janela ago/2025 a jul/2026 (a conta esta pausada, entao o Google
 * devolve faixa e nao numero exato):
 *
 *   habite-se ......................... 10 mil - 100 mil buscas/mes, conc. baixa
 *   habite-se o que e / prefeitura .....  1 mil - 10 mil,  conc. baixa
 *   regularizacao de imovel ............  1 mil - 10 mil,  conc. media
 *   projeto eletrico / residencial .....  1 mil - 10 mil,  conc. baixa
 *   planta eletrica (+ variantes) ......  1 mil - 10 mil,  conc. baixa
 *   aprovacao de projeto na prefeitura .    100 - 1 mil,   conc. baixa
 *   imovel irregular / legalizacao .....    100 - 1 mil,   conc. baixa
 *
 * Sao buscas informacionais: quem digita "habite-se" quer entender o que e, nao
 * contratar. Por isso nao viraram paginas de servico — /servicos/regularizacao
 * ja existe e disputa a busca comercial. Duas paginas nossas competindo pelo
 * mesmo termo se canibalizam; o guia captura o topo do funil e encaminha para o
 * servico correspondente, que continua sendo a pagina de conversao.
 *
 * LIMITE DELIBERADO DO TEXTO: nenhum guia promete prazo, custo ou resultado, e
 * nenhum afirma qual profissional assina a responsabilidade tecnica por
 * disciplina — mesma ressalva registrada em src/data/services.ts. Onde a regra
 * varia por municipio ou por caso, o texto diz isso em vez de inventar um numero.
 * Guia de SEO que erra informacao legal custa mais caro que a visita que traz.
 */

export interface GuideSection {
  title: string;
  /** Paragrafos. */
  body: string[];
  /** Lista opcional ao final do bloco. */
  list?: string[];
}

export interface Guide {
  /** Slug da rota /guias/[slug]. */
  slug: string;
  /** Titulo curto, usado em cards e trilha. */
  name: string;
  /** H1 da pagina, com marcacao. */
  heading: string;
  /** Frase de apoio do hero. */
  summary: string;
  /** Rotulo do hero. */
  eyebrow: string;
  intro: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
  /** Servicos para onde o guia encaminha, por id de src/data/services.ts. */
  services: string[];
  seo: { title: string; description: string; keywords: string[] };
}

export const guides: Guide[] = [
  {
    slug: 'habite-se',
    name: 'Habite-se',
    heading: 'Habite-se: o que é, <span class="text-orange-500">documentos e como conseguir</span>',
    summary:
      'O documento que declara a obra concluída e apta para uso. Sem ele, o imóvel não financia, não escritura com segurança e continua irregular no cadastro da Prefeitura.',
    eyebrow: 'Guia',
    intro: [
      'Habite-se é o nome popular do documento que a Prefeitura emite quando reconhece que a obra terminou de acordo com o projeto aprovado e pode ser ocupada. Em São Paulo capital ele se chama Certificado de Conclusão; em outros municípios aparece como Auto de Conclusão, Carta de Habitação ou o próprio Habite-se.',
      'O nome muda, a função não: é o que fecha o ciclo aberto pelo alvará. Alvará autoriza construir; o Habite-se atesta que o que foi construído corresponde ao que foi autorizado.',
    ],
    sections: [
      {
        title: 'Para que serve na prática',
        body: [
          'Enquanto não existe, a obra permanece registrada como em andamento. Isso trava uma lista concreta de coisas:',
        ],
        list: [
          'Financiamento bancário do imóvel — o banco exige a averbação da construção na matrícula, e a averbação depende do Habite-se',
          'Averbação da construção no Cartório de Registro de Imóveis',
          'Venda com segurança jurídica: imóvel sem averbação vale menos e restringe o comprador',
          'Ligação definitiva de água e energia, em boa parte dos casos',
          'Licença de funcionamento, quando o imóvel é comercial ou industrial',
          'Regularidade perante a Prefeitura, evitando autuação e cobrança retroativa',
        ],
      },
      {
        title: 'Quando pedir',
        body: [
          'Depois da obra concluída e com o alvará ainda válido. O pedido é feito pelo responsável técnico, que declara a conformidade entre o executado e o projeto aprovado — e responde por essa declaração.',
          'É aí que aparece o problema mais comum: a obra saiu diferente do projeto. Parede deslocada, ampliação não prevista, área a mais. Nesse caso não existe atalho: ou o projeto é atualizado e reaprovado antes do pedido, ou o processo volta como exigência.',
        ],
      },
      {
        title: 'Documentos normalmente exigidos',
        body: [
          'A lista muda conforme o município, o porte e o uso da edificação. O conjunto típico é este:',
        ],
        list: [
          'Alvará de aprovação e execução, dentro da validade',
          'Projeto aprovado e, quando houve alteração, o projeto atualizado reaprovado',
          'ART ou RRT de execução da obra, com baixa',
          'Certidão negativa de débitos da obra junto ao INSS (CND da obra)',
          'Comprovante de ligação definitiva de água e esgoto',
          'AVCB ou CLCB do Corpo de Bombeiros, quando a classificação da edificação exigir',
          'Documentação do imóvel: matrícula atualizada e IPTU',
          'Laudos e comprovações específicas conforme o uso — acessibilidade, gás, elevadores',
        ],
      },
      {
        title: 'Habite-se parcial',
        body: [
          'Empreendimento executado por etapas pode receber o certificado por parte concluída — uma torre de um conjunto, um pavimento de uso comercial. A parte precisa estar completa e utilizável de forma independente, com acessos, instalações e segurança próprios.',
          'É útil para liberar ocupação e receita antes de a obra inteira terminar, mas não dispensa o documento final do restante.',
        ],
      },
      {
        title: 'E se a obra é antiga e nunca teve Habite-se?',
        body: [
          'Aí o caminho não é o Habite-se: é a regularização. Construção erguida sem processo, ou concluída fora do que foi aprovado, precisa primeiro ser regularizada — em São Paulo, pelo Auto de Regularização — para só então existir no cadastro.',
          'A viabilidade depende do que foi construído e do que a legislação vigente admite manter. Construção em área não edificável ou sobre recuo obrigatório pode não ter caminho sem demolição parcial. Por isso o diagnóstico vem antes de qualquer promessa de prazo.',
        ],
      },
    ],
    faq: [
      {
        q: 'Habite-se e Certificado de Conclusão são a mesma coisa?',
        a: 'Na prática, sim. "Habite-se" é o nome consagrado pelo uso; em São Paulo capital o documento oficial é o Certificado de Conclusão, previsto no Código de Obras e Edificações do município. Outros municípios usam Auto de Conclusão ou Carta de Habitação.',
      },
      {
        q: 'Quanto tempo demora para sair?',
        a: 'Depende muito mais do órgão e da consistência da documentação do que do imóvel. Processo com documentação completa e obra fiel ao projeto anda; processo com divergência entre o executado e o aprovado volta como exigência e recomeça a contagem. Qualquer prazo dado antes de olhar o caso é chute.',
      },
      {
        q: 'Dá para morar no imóvel sem Habite-se?',
        a: 'Fisicamente, as pessoas moram. Juridicamente, a edificação está irregular: fica sujeita a autuação, não é averbada na matrícula e não serve de garantia em financiamento. O risco não aparece no dia a dia — aparece na hora de vender, financiar ou inventariar.',
      },
      {
        q: 'Quem pode solicitar o Habite-se?',
        a: 'O proprietário, sempre acompanhado do responsável técnico habilitado, que emite a anotação ou o registro de responsabilidade e declara a conformidade da obra executada com o projeto aprovado.',
      },
    ],
    services: ['regularizacao', 'consultoria-obra'],
    seo: {
      title: 'Habite-se: o que é, documentos e como conseguir | MDK Engenharia',
      description:
        'Guia do Habite-se (Certificado de Conclusão): para que serve, quando pedir, documentos exigidos, Habite-se parcial e o que fazer quando a obra antiga nunca teve o documento.',
      keywords: [
        'habite-se',
        'habite-se o que é',
        'habite-se prefeitura',
        'certificado de conclusão São Paulo',
        'documentos para habite-se',
        'habite-se parcial',
        'averbação de construção matrícula',
      ],
    },
  },

  {
    slug: 'regularizacao-de-imovel',
    name: 'Regularização de imóvel',
    heading:
      'Como regularizar um imóvel: <span class="text-orange-500">o passo a passo real</span>',
    summary:
      'Imóvel irregular vale menos, não financia e pode gerar multa. O caminho depende do que foi construído, de quando, e do que a lei atual permite manter.',
    eyebrow: 'Guia',
    intro: [
      'Imóvel irregular é aquele cuja construção não corresponde ao que consta aprovado na Prefeitura — ou que nunca teve processo nenhum. É mais comum do que parece: casa ampliada em etapas, edícula construída depois, sobrado que virou dois, comércio que ocupou a garagem.',
      'Regularizar é fazer o cadastro alcançar a realidade. Não é papelada por papelada: é o que devolve valor de mercado, destrava financiamento e encerra a exposição a autuação.',
    ],
    sections: [
      {
        title: 'Primeiro passo: o diagnóstico',
        body: [
          'Antes de protocolar qualquer coisa, três informações precisam estar na mesa: o que existe fisicamente hoje, o que consta aprovado na Prefeitura e o que a legislação vigente admite manter.',
          'O levantamento do existente é medição em campo, não estimativa por foto. O que consta aprovado sai da consulta ao processo e à documentação do imóvel. A comparação entre os três define a rota — e, em alguns casos, define que não há rota sem alterar a construção.',
        ],
      },
      {
        title: 'As rotas possíveis',
        body: ['Dependendo do diagnóstico, o caminho é um destes:'],
        list: [
          'Auto de Regularização — para construção existente sem processo aprovado, dentro do que a legislação municipal admite',
          'Regularização com adequação prévia — quando parte do construído precisa ser alterada antes de o processo ser aceito',
          'Aprovação e execução — quando a obra ainda não começou ou está em andamento',
          'Desdobro, desmembramento ou unificação — quando o problema é a divisão do lote e do IPTU, não a edificação',
          'Sem caminho viável — construção em área não edificável, sobre faixa de servidão ou invadindo recuo obrigatório pode exigir demolição parcial',
        ],
      },
      {
        title: 'O que costuma travar o processo',
        body: [
          'Os pontos que mais devolvem exigência não são burocráticos: são físicos. Recuo obrigatório ocupado, taxa de ocupação acima do permitido, ausência de iluminação e ventilação mínimas nos ambientes, acessibilidade não atendida em uso comercial.',
          'Existe ainda o item que ninguém antecipa: a divergência entre a área construída real e a área lançada no IPTU. Ela precisa ser resolvida, e resolver quase sempre significa recolher diferença.',
        ],
      },
      {
        title: 'Regularização na Prefeitura, nos Bombeiros e na CETESB',
        body: [
          'Regularizar o imóvel na Prefeitura não regulariza a atividade. Uso comercial ou industrial normalmente exige também o processo no Corpo de Bombeiros — AVCB ou CLCB, conforme a classificação da edificação — e, para atividades sujeitas a controle ambiental, o licenciamento ou a dispensa na CETESB.',
          'São três balcões com exigências próprias e prazos independentes. Tocá-los em sequência, um depois do outro, é o que faz a regularização levar anos. Tocá-los em paralelo, com as peças técnicas produzidas de uma vez, é o que encurta.',
        ],
      },
      {
        title: 'E o registro em cartório',
        body: [
          'A regularização municipal produz o documento; a averbação na matrícula é que faz a construção existir para o direito. Sem averbação, o banco não financia e a venda continua limitada.',
          'É o passo que muita gente esquece depois de ganhar o processo na Prefeitura — e sem ele boa parte do benefício da regularização não se realiza.',
        ],
      },
    ],
    faq: [
      {
        q: 'Quanto custa regularizar um imóvel?',
        a: 'Varia com a área, com o uso e com a rota. Além do serviço técnico, entram taxas municipais, eventual recolhimento de diferença de IPTU, custas de cartório e, quando o diagnóstico apontar, a obra de adequação. Um número dado antes do diagnóstico é chute.',
      },
      {
        q: 'Consigo regularizar imóvel financiado?',
        a: 'Em geral sim, e frequentemente o financiamento é o motivo do pedido — o banco condiciona a liberação à averbação da construção. O que muda é a necessidade de alinhar a documentação com a instituição financeira durante o processo.',
      },
      {
        q: 'Preciso de engenheiro ou arquiteto para regularizar?',
        a: 'Precisa. O processo exige peças técnicas e responsabilidade técnica registrada (ART no CREA ou RRT no CAU). O proprietário assina como interessado, mas o levantamento, o projeto e a declaração técnica são de profissional habilitado.',
      },
      {
        q: 'Qual a diferença entre regularizar e aprovar?',
        a: 'Aprovar é pedir autorização antes de construir. Regularizar é enquadrar depois, o que é sempre mais caro e mais restrito: a lei que vale na regularização é a vigente hoje, não a da época em que a construção foi erguida.',
      },
    ],
    services: ['regularizacao', 'projeto-arquitetonico', 'consultoria-obra'],
    seo: {
      title: 'Como Regularizar um Imóvel: Passo a Passo | MDK Engenharia',
      description:
        'Guia de regularização de imóvel: diagnóstico, rotas possíveis, Auto de Regularização, o que trava o processo, Prefeitura, Bombeiros, CETESB e averbação em cartório.',
      keywords: [
        'regularização de imóvel',
        'como regularizar um imóvel',
        'imóvel irregular o que fazer',
        'auto de regularização São Paulo',
        'legalização de imóvel',
        'averbação de construção',
        'regularizar construção sem projeto',
      ],
    },
  },

  {
    slug: 'projeto-eletrico-residencial',
    name: 'Projeto elétrico residencial',
    heading:
      'Projeto elétrico residencial: <span class="text-orange-500">o que é e o que ele entrega</span>',
    summary:
      'Não é desenho de tomada na planta. É o cálculo que define cada circuito, cada condutor e cada proteção — e o que separa disjuntor desarmando na hora certa de cabo aquecendo dentro do eletroduto.',
    eyebrow: 'Guia',
    intro: [
      'Projeto elétrico residencial é o conjunto de cálculos e desenhos que define como a energia chega, se distribui e é protegida dentro da casa. A peça mais conhecida é a planta elétrica — a que mostra pontos e circuitos —, mas ela é a saída, não o projeto.',
      'O que sustenta a planta é o dimensionamento: previsão de carga por ambiente, divisão de circuitos, seção dos condutores por capacidade de condução e queda de tensão, e escolha das proteções. Sem isso, o desenho vira palpite bonito.',
    ],
    sections: [
      {
        title: 'O que a NBR 5410 exige',
        body: [
          'A norma brasileira de instalações elétricas de baixa tensão define os mínimos que uma residência precisa atender. Os pontos que mais aparecem na prática:',
        ],
        list: [
          'Circuitos independentes para iluminação e para tomadas de uso geral',
          'Circuito exclusivo para cada equipamento de corrente acima do limite normativo — chuveiro, forno, ar-condicionado',
          'Quantidade mínima de pontos de tomada por ambiente, conforme área e perímetro',
          'Proteção diferencial-residual (DR) nas áreas molhadas e nas tomadas externas',
          'Aterramento e equipotencialização',
          'Dispositivo de proteção contra surtos (DPS) no quadro',
          'Seção mínima de condutor por tipo de circuito',
        ],
      },
      {
        title: 'O que o projeto entrega',
        body: ['Um projeto elétrico residencial completo sai com:'],
        list: [
          'Planta de pontos, circuitos e encaminhamento de eletrodutos',
          'Quadro de cargas com a previsão por circuito e o balanceamento de fases',
          'Diagrama unifilar do quadro de distribuição',
          'Detalhe do padrão de entrada, no formato aceito pela concessionária',
          'Memorial de cálculo e memorial descritivo',
          'Lista de materiais',
          'ART de projeto',
        ],
      },
      {
        title: 'Padrão de entrada: onde mais se perde tempo',
        body: [
          'O padrão de entrada é definido pela carga instalada, que sai do quadro de cargas. É ele que determina o tipo de fornecimento — monofásico, bifásico ou trifásico — e o dimensionamento do ramal.',
          'Errar aqui custa duas vezes: o padrão é construído, a concessionária reprova, e refazer significa quebrar. Por isso o padrão entra no projeto, e não como decisão do eletricista no dia da instalação.',
        ],
      },
      {
        title: 'Reforma: quando o projeto compensa mais',
        body: [
          'Instalação de casa antiga costuma ter dois problemas somados: seção de condutor dimensionada para o consumo de outra época e ausência de circuitos dedicados para os equipamentos atuais. O sintoma é disjuntor desarmando, tomada aquecendo e chuveiro fraco quando outro aparelho liga.',
          'Numa reforma, o projeto se paga na decisão de escopo: ele mostra o que precisa ser trocado de fato e o que pode ser aproveitado, em vez de refazer a casa inteira por precaução ou remendar o trecho errado.',
        ],
      },
      {
        title: 'Planta elétrica não é projeto',
        body: [
          'Muita busca por "planta elétrica" termina num desenho genérico baixado da internet. Ele até indica onde ficam as tomadas, mas não conhece a carga da casa, a distância do quadro, o tipo de eletroduto nem o padrão da concessionária local.',
          'O desenho sem o cálculo não protege ninguém — e não tem ART, o que significa que, se algo acontecer, não há responsável técnico atrás dele.',
        ],
      },
    ],
    faq: [
      {
        q: 'Projeto elétrico é obrigatório em casa?',
        a: 'A concessionária exige projeto para entrada acima do padrão residencial simples, e a Prefeitura pode exigir conforme o porte da obra. Fora a exigência formal, a NBR 5410 se aplica a qualquer instalação — e o seguro residencial costuma pedir conformidade em caso de sinistro elétrico.',
      },
      {
        q: 'Qual a diferença entre projeto elétrico e planta elétrica?',
        a: 'A planta é uma das peças do projeto: mostra pontos, circuitos e encaminhamento. O projeto inclui ainda o quadro de cargas, o diagrama unifilar, o dimensionamento dos condutores e das proteções, o padrão de entrada e o memorial de cálculo que justifica tudo isso.',
      },
      {
        q: 'SPDA é obrigatório em residência?',
        a: 'Depende do resultado da análise de risco da NBR 5419, que considera altura, localização, tipo de ocupação e o que há dentro da edificação. Não é uma regra fixa por tipo de imóvel — é o resultado do cálculo que define.',
      },
      {
        q: 'O eletricista não resolve sem projeto?',
        a: 'Um bom eletricista executa muito bem o que está dimensionado. O que ele não faz — nem é papel dele — é calcular carga, dimensionar condutor por queda de tensão e assumir responsabilidade técnica pelo conjunto. São funções diferentes, e a obra precisa das duas.',
      },
    ],
    services: ['projeto-eletrico', 'projeto-hidraulico', 'consultoria-obra'],
    seo: {
      title: 'Projeto Elétrico Residencial: o que é e o que entrega | MDK Engenharia',
      description:
        'Guia do projeto elétrico residencial: exigências da NBR 5410, quadro de cargas, diagrama unifilar, padrão de entrada, planta elétrica e por que desenho não substitui dimensionamento.',
      keywords: [
        'projeto elétrico residencial',
        'planta elétrica residencial',
        'projeto elétrico NBR 5410',
        'quadro de cargas residencial',
        'padrão de entrada de energia',
        'diagrama unifilar',
        'projeto elétrico para reforma',
      ],
    },
  },

  {
    slug: 'aprovacao-de-projeto-na-prefeitura',
    name: 'Aprovação na Prefeitura',
    heading:
      'Aprovação de projeto na Prefeitura: <span class="text-orange-500">etapas e documentos</span>',
    summary:
      'O que a Prefeitura analisa, o que ela devolve como exigência e por que a maior parte do prazo se decide antes de o processo ser protocolado.',
    eyebrow: 'Guia',
    intro: [
      'Aprovar um projeto é obter da Prefeitura a autorização para construir — o alvará. A análise não julga o partido arquitetônico: verifica se a edificação proposta cabe na legislação daquele lote.',
      'Quase todo o prazo de um processo se define antes do protocolo. Projeto que chega ao balcão já compatível com a lei anda; projeto que chega para "ver se passa" volta como exigência, e cada volta reinicia a contagem.',
    ],
    sections: [
      {
        title: 'O que a Prefeitura verifica',
        body: [
          'A análise é objetiva e sempre gira em torno dos mesmos parâmetros, definidos pelo Código de Obras e pela lei de uso e ocupação do solo do município:',
        ],
        list: [
          'Zoneamento e usos permitidos no lote',
          'Coeficiente de aproveitamento — quanto se pode construir',
          'Taxa de ocupação — quanto do terreno pode ser coberto',
          'Recuos frontal, laterais e de fundo',
          'Gabarito de altura',
          'Taxa de permeabilidade e, quando aplicável, reservatório de retenção',
          'Vagas de estacionamento exigidas pelo uso',
          'Iluminação e ventilação mínimas dos ambientes',
          'Acessibilidade conforme NBR 9050',
        ],
      },
      {
        title: 'Antes do projeto: a consulta de viabilidade',
        body: [
          'A etapa que mais economiza tempo é a primeira, e é a mais pulada. Levantar os parâmetros do lote antes de desenhar evita o cenário mais caro: projeto pronto, cliente aprovou, e o recuo não fecha.',
          'Nessa fase também aparecem as condicionantes que não estão no zoneamento — tombamento, área de proteção, faixa não edificável, servidão, alinhamento viário previsto. Todas mudam o projeto, e nenhuma perdoa quem descobriu depois.',
        ],
      },
      {
        title: 'Documentação típica do processo',
        body: [
          'A lista exata varia com o município e com o tipo de pedido. O núcleo se repete:',
        ],
        list: [
          'Projeto legal no padrão exigido — plantas, cortes, elevações, implantação e quadro de áreas',
          'Documentação do imóvel: matrícula atualizada e IPTU',
          'Documentos do proprietário e procuração, quando houver representante',
          'ART ou RRT do responsável técnico pelo projeto',
          'Memorial descritivo',
          'Peças complementares conforme o caso: acessibilidade, drenagem, segurança contra incêndio',
        ],
      },
      {
        title: 'Alvará de aprovação e alvará de execução',
        body: [
          'São coisas distintas, e em São Paulo costumam sair juntos no mesmo documento. A aprovação valida o projeto; a execução autoriza abrir o canteiro.',
          'Prazo de validade importa: alvará vencido com obra inacabada exige renovação, e o pedido de Habite-se depende de alvará válido. É a armadilha mais comum em obra que parou no meio.',
        ],
      },
      {
        title: 'Projeto legal não é projeto executivo',
        body: [
          'O projeto legal traz o que a Prefeitura precisa verificar. O executivo traz o que a obra precisa para ser construída — detalhamento, compatibilização entre disciplinas, especificação.',
          'Tocar a obra apenas com o projeto legal é o que produz decisão improvisada no canteiro: furo em viga não previsto, shaft que não existe, forro que não fecha. Sai mais caro do que ter feito o executivo.',
        ],
      },
    ],
    faq: [
      {
        q: 'Preciso aprovar projeto para reforma?',
        a: 'Depende do que muda. Reforma que altera área construída, layout de áreas molhadas, fachada ou elementos estruturais normalmente exige aprovação. Reforma só de acabamento, em geral não. Vale confirmar antes: regularizar depois custa mais.',
      },
      {
        q: 'Quanto tempo leva a aprovação?',
        a: 'Depende do órgão, do tipo de pedido e — principalmente — da qualidade do que foi protocolado. Processo sem exigência anda no prazo do município; processo com exigência recomeça a cada retorno. É por isso que a verificação de parâmetros antes de desenhar é a etapa que mais encurta o total.',
      },
      {
        q: 'O processo é presencial?',
        a: 'Em São Paulo e na maioria das capitais o licenciamento de edificações é eletrônico, com assinatura digital do responsável técnico e do proprietário. Presencial sobra para vistoria, quando a fase exige.',
      },
      {
        q: 'Posso construir enquanto o processo está em análise?',
        a: 'Não. Construir sem alvará expõe a obra a embargo e multa, e transforma um processo de aprovação em processo de regularização — que é mais restrito, porque passa a valer a lei vigente e o que já foi construído deixa de ser negociável.',
      },
    ],
    services: ['regularizacao', 'projeto-arquitetonico', 'projeto-estrutural'],
    seo: {
      title: 'Aprovação de Projeto na Prefeitura: Etapas e Documentos | MDK Engenharia',
      description:
        'Guia da aprovação de projeto na Prefeitura: parâmetros analisados, consulta de viabilidade, documentos exigidos, alvará de aprovação e execução e a diferença entre projeto legal e executivo.',
      keywords: [
        'aprovação de projeto na prefeitura',
        'projeto para prefeitura',
        'alvará de aprovação e execução',
        'projeto legal prefeitura São Paulo',
        'documentos para aprovar projeto',
        'consulta de viabilidade lote',
        'coeficiente de aproveitamento taxa de ocupação',
      ],
    },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
