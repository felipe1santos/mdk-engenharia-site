/**
 * SEO local — paginas de bairro e de subprefeitura da Zona Norte de Sao Paulo.
 *
 * POR QUE ESTA ESTRUTURA, E NAO UMA PAGINA POR BAIRRO
 *
 * O pedido era "SEO local a partir do Jardim Peri". A tentacao obvia seria gerar
 * "projeto eletrico em <bairro>" para os cem bairros da Zona Norte. Duas razoes
 * para nao fazer isso:
 *
 * 1. Volume de busca. Consultamos o Planejador de Palavras-chave do Google em
 *    14/08/2026 com termos hiperlocais no formato pedido pelo cliente
 *    ("projeto eletrico jardim peri", "regularizacao de imovel na prefeitura de
 *    sao paulo", "engenheiro civil zona norte sao paulo"). Todos voltaram na
 *    faixa 0-10 buscas/mes, e o proprio Google respondeu "use palavras-chave
 *    diferentes para gerar mais resultados". Busca por bairro nao existe em
 *    volume relevante: quem esta no Jardim Peri digita "projeto eletrico" e o
 *    Google usa a localizacao dele para ordenar o resultado. Quem ganha essa
 *    busca e quem tem proximidade, perfil no Google Meu Negocio e NAP
 *    consistente — nao quem tem uma pagina com o nome do bairro no title.
 *
 * 2. Doorway content. Combinacao exaustiva servico x bairro e explicitamente
 *    penalizada pelo Google, e a mesma ressalva ja esta registrada em
 *    src/data/cities.ts.
 *
 * A saida foi organizar por SUBPREFEITURA, que nao e um recorte de marketing: e
 * onde o processo e efetivamente protocolado e analisado. Cada pagina responde a
 * uma pergunta que a pessoa realmente faz ("onde aprovo minha planta se moro na
 * Casa Verde?") e traz conteudo diferente das outras, porque as exigencias e o
 * perfil construtivo mudam de fato entre elas.
 *
 * `jardim-peri` e a excecao e existe por outro motivo: e o endereco da sede
 * (src/data/site.ts). Pagina de sede sustenta o sinal de proximidade e da ao
 * perfil do Google Meu Negocio um destino coerente para o link do site.
 *
 * FONTE DA DIVISAO ADMINISTRATIVA: portal da Prefeitura de Sao Paulo. O Jardim
 * Peri aparece no site da Subprefeitura Casa Verde/Cachoeirinha/Limao, dentro do
 * distrito de Vila Nova Cachoeirinha (prefeitura.sp.gov.br/web/casa_verde).
 *
 * NAO ACRESCENTAR AQUI: numero de obras feitas no bairro, tempo de resposta da
 * subprefeitura ou prazo de analise. Sao dados que a empresa nao forneceu e que,
 * escritos por conta propria, viram promessa que ninguem se comprometeu a
 * cumprir.
 */

export interface DistrictDemand {
  title: string;
  text: string;
}

export interface District {
  /** Slug da rota /areas-de-atuacao/[slug]. */
  slug: string;
  /** Nome curto, usado em cards e trilha. */
  name: string;
  /** Como aparece no H1. */
  heading: string;
  /** Rotulo do recorte administrativo, exibido acima do titulo. */
  kind: 'Sede' | 'Subprefeitura';
  /** Distritos oficiais cobertos pelo recorte. */
  districts: string[];
  /** Bairros atendidos — conteudo indexavel e util para quem procura o proprio. */
  neighborhoods: string[];
  /** Paragrafos de abertura. */
  intro: string[];
  /** O que a regiao demanda na pratica. */
  demands: DistrictDemand[];
  /** Servicos em destaque na pagina, por id de src/data/services.ts. */
  services: string[];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string; keywords: string[] };
}

export const districts: District[] = [
  {
    slug: 'jardim-peri',
    name: 'Jardim Peri',
    heading: 'Engenharia e projetos no <span class="text-orange-500">Jardim Peri</span>',
    kind: 'Sede',
    districts: ['Vila Nova Cachoeirinha'],
    neighborhoods: [
      'Jardim Peri',
      'Vila Amélia',
      'Jardim Guarani',
      'Parque Peruche',
      'Vila Nova Cachoeirinha',
      'Jardim Antártica',
      'Vila Espanhola',
      'Jardim Líbano',
    ],
    intro: [
      'O escritório da MDK fica no Jardim Peri, na Rua Carlos Duarte Ferreira, 83. Não é um endereço de fachada: é de onde saem as visitas técnicas, onde os projetos são desenhados e onde o cliente da região consegue sentar com o responsável técnico sem atravessar a cidade.',
      'Para obra, proximidade não é detalhe. Medição, conferência de execução e resposta a exigência de órgão pedem alguém no local no mesmo dia — e é isso que muda quando o escritório está no bairro, e não do outro lado do rio.',
    ],
    demands: [
      {
        title: 'Reforma e ampliação de casa',
        text: 'Bairro consolidado, com lotes antigos e muita construção feita em etapas ao longo de décadas. Ampliar um pavimento, fechar uma área ou legalizar o que já foi construído exige levantamento do existente antes de qualquer projeto — é o serviço mais pedido aqui.',
      },
      {
        title: 'Regularização de construção existente',
        text: 'Imóvel construído sem processo aprovado não financia, não vende com segurança e pode gerar multa. O caminho começa pelo diagnóstico: o que existe, o que está aprovado e o que a legislação atual permite manter.',
      },
      {
        title: 'Comércio e pequena indústria',
        text: 'Ao longo das vias principais há comércio de rua, oficinas e galpões pequenos. Mudança de uso, adequação de acessibilidade e processo no Corpo de Bombeiros são os pontos que mais travam a licença de funcionamento.',
      },
      {
        title: 'Projeto elétrico e hidráulico predial',
        text: 'Instalação executada sem dimensionamento é a origem mais comum de reforma prematura. Projetamos conforme NBR 5410 e NBR 5626, com memorial de cálculo e ART.',
      },
    ],
    services: ['projeto-eletrico', 'projeto-hidraulico', 'regularizacao', 'projeto-arquitetonico'],
    faq: [
      {
        q: 'Vocês atendem presencialmente no Jardim Peri e nos bairros vizinhos?',
        a: 'Sim. O escritório fica no próprio bairro, na Rua Carlos Duarte Ferreira, 83. Visita técnica na região é agendada direto pelo WhatsApp, sem custo de deslocamento embutido no orçamento.',
      },
      {
        q: 'Onde é protocolado o processo de um imóvel no Jardim Peri?',
        a: 'O bairro fica no distrito de Vila Nova Cachoeirinha, dentro da Subprefeitura Casa Verde/Cachoeirinha/Limão. Os processos de aprovação e regularização de edificação em São Paulo tramitam pelo sistema eletrônico da Prefeitura, com a análise vinculada à subprefeitura da região.',
      },
      {
        q: 'Dá para saber se meu imóvel está regular antes de contratar o projeto?',
        a: 'Dá, e é por aí que começamos. O diagnóstico documental compara o que existe hoje com o que consta aprovado na Prefeitura e com o que a legislação vigente admite. Só depois disso definimos a rota — aprovação, regularização ou adequação prévia.',
      },
    ],
    seo: {
      title: 'Engenharia e Projetos no Jardim Peri, Zona Norte SP | MDK Engenharia',
      description:
        'Escritório de engenharia no Jardim Peri, São Paulo: projeto elétrico, hidráulico, arquitetônico, regularização de imóvel e aprovação na Prefeitura. Atendimento presencial na Zona Norte.',
      keywords: [
        'engenharia Jardim Peri',
        'projeto elétrico Jardim Peri',
        'projeto hidráulico Jardim Peri',
        'regularização de imóvel Jardim Peri',
        'engenheiro civil Vila Nova Cachoeirinha',
        'escritório de engenharia Zona Norte SP',
        'arquiteto Jardim Peri São Paulo',
      ],
    },
  },

  {
    slug: 'casa-verde-cachoeirinha-limao',
    name: 'Casa Verde, Cachoeirinha e Limão',
    heading:
      'Projetos e regularização na <span class="text-orange-500">Casa Verde, Cachoeirinha e Limão</span>',
    kind: 'Subprefeitura',
    districts: ['Casa Verde', 'Cachoeirinha', 'Limão'],
    neighborhoods: [
      'Casa Verde',
      'Casa Verde Alta',
      'Vila Nova Cachoeirinha',
      'Jardim Peri',
      'Limão',
      'Parque Peruche',
      'Vila Bandeirantes',
      'Jardim São Paulo',
      'Vila Sabrina',
      'Jardim das Laranjeiras',
    ],
    intro: [
      'É a subprefeitura onde fica a sede da MDK, e a região que atendemos com mais frequência. Três distritos com perfis diferentes: Casa Verde com ocupação vertical crescente, Cachoeirinha predominantemente residencial horizontal e Limão com forte presença de comércio e galpões na faixa próxima à Marginal Tietê.',
      'Essa mistura muda o tipo de processo. Prédio novo pede projeto completo e compatibilização entre disciplinas; casa antiga pede levantamento e regularização; galpão pede adequação de segurança e licença de funcionamento. Trabalhamos as três frentes.',
    ],
    demands: [
      {
        title: 'Aprovação de edificação nova',
        text: 'Verificação de recuos, taxa de ocupação e coeficiente de aproveitamento antes de desenhar, seguida do projeto legal no padrão exigido e do acompanhamento do processo até o alvará.',
      },
      {
        title: 'Auto de Regularização',
        text: 'Para construção existente sem processo aprovado. Depende do que foi construído, de quando, e do que a legislação atual admite manter — por isso o diagnóstico vem antes do prazo.',
      },
      {
        title: 'Galpões e comércio no Limão',
        text: 'Mudança de uso, adequação de acessibilidade conforme NBR 9050, projeto de combate a incêndio e AVCB. É o pacote que destrava a licença de funcionamento.',
      },
      {
        title: 'Certificado de Conclusão (Habite-se)',
        text: 'Obra concluída sem o certificado continua irregular no cadastro. Reunimos as peças, a documentação técnica e conduzimos o processo até a emissão.',
      },
    ],
    services: ['regularizacao', 'projeto-arquitetonico', 'projeto-estrutural', 'projeto-spci'],
    faq: [
      {
        q: 'Quais bairros a Subprefeitura Casa Verde/Cachoeirinha/Limão cobre?',
        a: 'Os distritos de Casa Verde, Cachoeirinha e Limão, que reúnem bairros como Casa Verde Alta, Vila Nova Cachoeirinha, Jardim Peri, Parque Peruche, Jardim São Paulo e Vila Bandeirantes, entre outros.',
      },
      {
        q: 'Preciso ir à subprefeitura para protocolar o processo?',
        a: 'Na maior parte dos casos, não. Os processos de licenciamento de edificações em São Paulo são eletrônicos, com o profissional responsável assinando digitalmente. O que sobra de presencial é a vistoria, quando a fase do processo exige.',
      },
    ],
    seo: {
      title: 'Projetos e Regularização na Casa Verde, Cachoeirinha e Limão | MDK Engenharia',
      description:
        'Aprovação de projeto, regularização de imóvel e Habite-se na Subprefeitura Casa Verde/Cachoeirinha/Limão. Projetos elétrico, hidráulico, estrutural e de incêndio na Zona Norte de São Paulo.',
      keywords: [
        'regularização de imóvel Casa Verde',
        'aprovação de projeto subprefeitura Casa Verde',
        'engenheiro civil Cachoeirinha SP',
        'projeto elétrico Limão São Paulo',
        'habite-se Casa Verde',
        'projeto de incêndio galpão Limão',
      ],
    },
  },

  {
    slug: 'santana-tucuruvi',
    name: 'Santana e Tucuruvi',
    heading: 'Projetos e regularização em <span class="text-orange-500">Santana e Tucuruvi</span>',
    kind: 'Subprefeitura',
    districts: ['Santana', 'Tucuruvi', 'Mandaqui'],
    neighborhoods: [
      'Santana',
      'Tucuruvi',
      'Mandaqui',
      'Vila Guilherme',
      'Carandiru',
      'Jardim São Paulo',
      'Água Fria',
      'Parada Inglesa',
      'Vila Mazzei',
      'Horto Florestal',
    ],
    intro: [
      'Região com a verticalização mais antiga da Zona Norte e boa parte do estoque construído antes das normas atuais de desempenho, acessibilidade e segurança contra incêndio. Isso define a demanda: menos terreno vazio, mais retrofit, reforma e adequação de edifício existente.',
      'Prédio antigo tem duas frentes que costumam andar juntas: a documental — AVCB vencido ou inexistente, obra irregular no cadastro — e a física — instalação elétrica subdimensionada para a carga de hoje, infiltração e prumada hidráulica no fim da vida útil. Tratamos as duas com o mesmo responsável técnico.',
    ],
    demands: [
      {
        title: 'AVCB e regularização de edifício',
        text: 'Edificação existente segue regras próprias de regularização junto ao Corpo de Bombeiros, que consideram o que é viável adequar. Começa por levantar o que existe e comparar com o que a classificação exige.',
      },
      {
        title: 'Retrofit de instalações',
        text: 'Reforma de prumadas hidráulicas, requalificação elétrica com quadro de cargas atualizado, SPDA e iluminação de emergência. Projeto antes da obra evita fechar parede duas vezes.',
      },
      {
        title: 'Laudos e perícia',
        text: 'Laudo de patologias — trincas, infiltração, umidade —, vistoria cautelar de vizinhança antes de obra ao lado e parecer técnico para uso em negociação ou assembleia.',
      },
      {
        title: 'Reforma comercial e mudança de uso',
        text: 'Nas avenidas principais, o gargalo é a adequação para licença de funcionamento: acessibilidade, saídas de emergência e projeto de combate a incêndio.',
      },
    ],
    services: ['projeto-spci', 'consultoria-obra', 'projeto-eletrico', 'impermeabilizacao'],
    faq: [
      {
        q: 'Meu prédio em Santana é antigo e nunca teve AVCB. Tem solução?',
        a: 'Na maioria dos casos, sim. Edificações existentes seguem regras específicas de regularização, que consideram o que é possível adequar sem descaracterizar a construção. O primeiro passo é o levantamento do que existe hoje, comparado com o que a classificação da edificação exige.',
      },
      {
        q: 'Vocês fazem laudo para assembleia de condomínio?',
        a: 'Fazemos. O parecer sai com conclusão objetiva, registro fotográfico, recomendações priorizadas por criticidade e ART de serviço técnico — que é o que dá peso ao documento numa discussão entre condôminos ou numa negociação com a construtora.',
      },
    ],
    seo: {
      title: 'Projetos, AVCB e Laudos em Santana e Tucuruvi | MDK Engenharia',
      description:
        'Regularização de edifício, AVCB, laudos técnicos, retrofit elétrico e hidráulico em Santana, Tucuruvi e Mandaqui, Zona Norte de São Paulo.',
      keywords: [
        'engenheiro civil Santana São Paulo',
        'AVCB Santana SP',
        'laudo técnico Tucuruvi',
        'regularização de prédio Santana',
        'retrofit elétrico condomínio Zona Norte',
        'vistoria cautelar de vizinhança Santana',
      ],
    },
  },

  {
    slug: 'freguesia-do-o-brasilandia',
    name: 'Freguesia do Ó e Brasilândia',
    heading:
      'Projetos e regularização na <span class="text-orange-500">Freguesia do Ó e Brasilândia</span>',
    kind: 'Subprefeitura',
    districts: ['Freguesia do Ó', 'Brasilândia'],
    neighborhoods: [
      'Freguesia do Ó',
      'Brasilândia',
      'Vila Nova Cachoeirinha',
      'City América',
      'Jardim Vista Alegre',
      'Vila Penteado',
      'Jardim Damasceno',
      'Parque Maria Domitila',
      'Vila Zatt',
    ],
    intro: [
      'Região de topografia acidentada e ocupação em grande parte horizontal, com muita construção erguida em etapas. Isso concentra a demanda em dois pontos: regularização do que já existe e projeto de contenção e drenagem em terreno com desnível.',
      'Terreno em declive muda o projeto inteiro. Fundação, arrimo, caminho da água da chuva e acesso ao lote deixam de ser detalhe e passam a definir o custo da obra — e são exatamente os itens que, mal resolvidos, aparecem anos depois como trinca, recalque ou alagamento.',
    ],
    demands: [
      {
        title: 'Regularização e Auto de Regularização',
        text: 'Levantamento do que foi construído, comparação com o aprovado e com o que a lei vigente admite, e condução do processo. Nem toda construção tem caminho — o diagnóstico existe para dizer isso no começo.',
      },
      {
        title: 'Contenção e projeto estrutural em declive',
        text: 'Arrimo, fundação em terreno inclinado e verificação de estabilidade. Dimensionamento com memorial de cálculo e ART, a partir da sondagem do solo.',
      },
      {
        title: 'Drenagem de lote',
        text: 'Cálculo de vazão, captação, condução e destinação da água da chuva, com reserva de retenção quando a taxa de impermeabilização exigir.',
      },
      {
        title: 'Desdobro e unificação de lote',
        text: 'Desdobro, desmembramento e unificação de IPTU, com as peças técnicas no padrão exigido pela Prefeitura.',
      },
    ],
    services: ['projeto-estrutural', 'projeto-drenagem', 'regularizacao', 'projeto-arquitetonico'],
    faq: [
      {
        q: 'Terreno em declive encarece muito a obra?',
        a: 'Encarece a fundação e a contenção, e essa parte não tem como economizar com segurança. O que dá para fazer é reduzir o volume de terra movimentada e adequar a implantação ao terreno em vez de forçar um platô — decisão que se toma no projeto, não no canteiro.',
      },
      {
        q: 'Dá para regularizar qualquer construção?',
        a: 'Não. Construção em área não edificável, invasão de recuo obrigatório ou de faixa de servidão pode não ter caminho de regularização sem demolição parcial. O diagnóstico identifica isso antes de qualquer processo ser protocolado.',
      },
    ],
    seo: {
      title: 'Projetos e Regularização na Freguesia do Ó e Brasilândia | MDK Engenharia',
      description:
        'Regularização de imóvel, projeto estrutural, contenção em declive, drenagem e desdobro de lote na Freguesia do Ó e Brasilândia, Zona Norte de São Paulo.',
      keywords: [
        'regularização de imóvel Freguesia do Ó',
        'engenheiro civil Brasilândia',
        'projeto de contenção muro de arrimo Zona Norte',
        'desdobro de lote São Paulo',
        'projeto estrutural terreno em declive',
        'drenagem de terreno Freguesia do Ó',
      ],
    },
  },

  {
    slug: 'vila-maria-vila-guilherme',
    name: 'Vila Maria e Vila Guilherme',
    heading:
      'Projetos industriais na <span class="text-orange-500">Vila Maria e Vila Guilherme</span>',
    kind: 'Subprefeitura',
    districts: ['Vila Maria', 'Vila Guilherme', 'Vila Medeiros'],
    neighborhoods: [
      'Vila Maria',
      'Vila Guilherme',
      'Vila Medeiros',
      'Parque Novo Mundo',
      'Jardim Japão',
      'Vila Sabrina',
      'Vila Ede',
      'Jardim Brasil',
    ],
    intro: [
      'A faixa mais industrial da Zona Norte. Galpões, centros de distribuição e indústria leve concentrados no eixo da Marginal Tietê, com um estoque construído que em boa parte antecede as exigências atuais de segurança contra incêndio e das normas regulamentadoras.',
      'Aqui o projeto começa pelo processo, não pelo prédio: o que entra, por onde passa, o que sai. Layout mal resolvido não se conserta com obra — vira custo operacional todo mês.',
    ],
    demands: [
      {
        title: 'Adequação de galpão em operação',
        text: 'Levantamento do que existe, comparação com a exigência aplicável e plano de adequação faseado, para interferir o mínimo possível na produção.',
      },
      {
        title: 'SPCI, AVCB e sprinklers',
        text: 'Classificação da edificação, rede de hidrantes, chuveiros automáticos, reserva técnica de incêndio, rotas de fuga e condução do processo até o Auto de Vistoria.',
      },
      {
        title: 'Licenciamento na CETESB',
        text: 'Dispensa de licença ambiental ou licenciamento da atividade, tratado junto com o projeto para evitar retrabalho quando a exigência ambiental impacta o layout.',
      },
      {
        title: 'Infraestrutura elétrica e utilidades',
        text: 'Alimentação em média e baixa tensão, quadro de cargas, ar comprimido, tubulação de processo e efluentes industriais.',
      },
    ],
    services: ['projeto-industrial', 'projeto-spci', 'projeto-eletrico', 'consultoria-obra'],
    faq: [
      {
        q: 'Vocês fazem adequação de planta que já está operando?',
        a: 'Sim, e é o caso mais comum. Começa por um levantamento do que existe, comparado com a exigência aplicável e com a necessidade de produção. O plano de adequação é faseado para não parar a operação.',
      },
      {
        q: 'Projeto industrial precisa de licenciamento ambiental?',
        a: 'Depende da atividade e do porte. Boa parte das atividades industriais em São Paulo passa pela CETESB, e o licenciamento traz exigências que impactam o projeto — tratamento de efluentes, controle de emissões, armazenamento de produtos. Tratamos as duas frentes juntas.',
      },
    ],
    seo: {
      title: 'Projetos Industriais, SPCI e AVCB na Vila Maria e Vila Guilherme | MDK Engenharia',
      description:
        'Projeto industrial, adequação de galpão, SPCI, AVCB e licenciamento CETESB na Vila Maria, Vila Guilherme e Parque Novo Mundo, Zona Norte de São Paulo.',
      keywords: [
        'projeto industrial Vila Maria',
        'AVCB galpão Vila Guilherme',
        'adequação de galpão São Paulo',
        'projeto de sprinkler galpão',
        'licenciamento CETESB Zona Norte',
        'projeto elétrico industrial São Paulo',
      ],
    },
  },

  {
    slug: 'pirituba-jaragua-perus',
    name: 'Pirituba, Jaraguá e Perus',
    heading:
      'Projetos e regularização em <span class="text-orange-500">Pirituba, Jaraguá e Perus</span>',
    kind: 'Subprefeitura',
    districts: ['Pirituba', 'Jaraguá', 'São Domingos', 'Perus', 'Anhanguera'],
    neighborhoods: [
      'Pirituba',
      'Jaraguá',
      'São Domingos',
      'Perus',
      'Anhanguera',
      'City América',
      'Vila Clarice',
      'Parque São Domingos',
      'Jardim Britânia',
    ],
    intro: [
      'A ponta noroeste da cidade, onde ainda há terreno disponível e loteamento em formação — perfil oposto ao de Santana. Aqui aparece obra nova residencial, condomínio horizontal e galpão logístico aproveitando o acesso à Anhanguera e ao Rodoanel.',
      'Terreno vazio parece simplificar, mas concentra as decisões que mais custam depois: sondagem do solo, cota de implantação, caminho da água e capacidade das redes públicas. É o que definimos antes do projeto arquitetônico fechar.',
    ],
    demands: [
      {
        title: 'Obra nova residencial e comercial',
        text: 'Do estudo preliminar ao executivo, com as disciplinas compatibilizadas entre si antes de abrir o canteiro.',
      },
      {
        title: 'Drenagem e reservatório de retenção',
        text: 'Terreno com área impermeabilizada acima do limite legal precisa reter parte da chuva antes de lançar na rede pública. O reservatório entra no projeto e é condição para a aprovação.',
      },
      {
        title: 'Galpão logístico',
        text: 'Layout de fluxo, piso industrial dimensionado para a carga real, docas, infraestrutura elétrica e projeto de combate a incêndio.',
      },
      {
        title: 'Execução de obra com equipe própria',
        text: 'Para quem quer um único responsável do projeto à entrega, com cronograma físico-financeiro e medição por etapa concluída.',
      },
    ],
    services: ['projeto-arquitetonico', 'projeto-drenagem', 'execucao-obra', 'projeto-industrial'],
    faq: [
      {
        q: 'Quando o reservatório de retenção é exigido?',
        a: 'Em São Paulo, a lei municipal exige para terrenos com área impermeabilizada acima do limite estabelecido. O volume é calculado a partir da área do lote e da taxa de impermeabilização.',
      },
      {
        q: 'Vocês executam a obra ou só fazem o projeto?',
        a: 'As duas coisas, e o cliente escolhe. Quem projeta e executa carrega a responsabilidade inteira — não existe a conversa de que o problema foi do projeto ou da mão de obra. Também executamos obra projetada por outro escritório, começando por uma análise de construtibilidade.',
      },
    ],
    seo: {
      title: 'Projetos e Execução de Obra em Pirituba, Jaraguá e Perus | MDK Engenharia',
      description:
        'Projeto arquitetônico, drenagem, reservatório de retenção, galpão logístico e execução de obra em Pirituba, Jaraguá, São Domingos e Perus, Zona Norte de São Paulo.',
      keywords: [
        'engenheiro civil Pirituba',
        'projeto arquitetônico Jaraguá SP',
        'reservatório de retenção piscinão São Paulo',
        'construtora Perus São Paulo',
        'galpão logístico projeto Anhanguera',
        'aprovação de projeto Pirituba',
      ],
    },
  },
];

export function getDistrict(slug: string): District | undefined {
  return districts.find((d) => d.slug === slug);
}

/** Pagina da sede — recebe destaque no hub e nos cards. */
export const headquartersDistrict = districts.find((d) => d.kind === 'Sede')!;

/** Recortes por subprefeitura, na ordem de proximidade com a sede. */
export const subprefectureDistricts = districts.filter((d) => d.kind === 'Subprefeitura');
