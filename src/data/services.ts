/**
 * Servicos da MDK — fonte unica dos cards da home, do indice /servicos e das
 * paginas /servicos/[slug].
 *
 * A lista veio do site anterior da empresa (mdkengenharia.com.br, secao
 * "Nossos Trabalhos > Projetos"), mais as frentes de Execucao e Consultoria
 * pedidas no documento de ajustes. E o escopo que a MDK ja anuncia
 * publicamente — nao uma suposicao nossa.
 *
 * `category` separa o nucleo tecnico (projeto) das frentes complementares
 * (obra). A home exibe as de projeto em cards grandes e as de obra em grid
 * compacto; o indice /servicos usa a mesma divisao.
 *
 * `detail` alimenta a pagina interna. Servico sem `detail` nao ganha pagina —
 * e o mecanismo para publicar em etapas sem link quebrado, ja que
 * `getStaticPaths` filtra por esse campo.
 *
 * ATENCAO, LIMITE DELIBERADO DO TEXTO: as paginas descrevem o escopo tecnico de
 * cada disciplina e as normas aplicaveis, mas nao afirmam quem assina a ART/RRT.
 * Cada disciplina exige profissional com a atribuicao correspondente, e ainda
 * falta o cliente informar, item a item, o que e feito com equipe propria e o
 * que e coordenado com parceiro (bloqueio B1 do plano em docs/superpowers/).
 * Nao acrescentar promessa de responsabilidade tecnica por disciplina antes disso.
 */

export type ServiceCategory = 'projeto' | 'obra';

export interface ServiceScopeGroup {
  title: string;
  items: string[];
}

export interface ServiceDetail {
  /** Paragrafos de abertura da pagina. */
  intro: string[];
  /** Blocos de escopo — o que o servico cobre, na pratica. */
  scope: ServiceScopeGroup[];
  /** Pecas que o cliente recebe ao final. */
  deliverables: string[];
  /** Normas e exigencias legais aplicaveis. */
  norms?: string[];
  /** Duvidas frequentes; viram FAQPage no dado estruturado. */
  faq?: { q: string; a: string }[];
}

export interface Service {
  /** Tambem e o slug da pagina interna. */
  id: string;
  title: string;
  category: ServiceCategory;
  /** Frase curta usada no card. */
  summary: string;
  /** Itens concretos do escopo — conteudo indexavel para long-tail. */
  bullets: string[];
  icon:
    | 'water'
    | 'bolt'
    | 'document'
    | 'building'
    | 'hammer'
    | 'shield'
    | 'clipboard'
    | 'compass'
    | 'pillar'
    | 'flame'
    | 'medical'
    | 'drain'
    | 'factory'
    | 'wind';
  image?: string;
  seo?: { title: string; description: string; keywords?: string[] };
  detail?: ServiceDetail;
}

export const services: Service[] = [
  // ─────────────────────────────── PROJETOS ───────────────────────────────
  {
    id: 'projeto-arquitetonico',
    title: 'Projeto Arquitetônico',
    category: 'projeto',
    summary:
      'Concepção e detalhamento do partido arquitetônico, do estudo preliminar ao projeto executivo pronto para aprovação e obra.',
    bullets: [
      'Estudo preliminar e anteprojeto',
      'Projeto legal para aprovação',
      'Projeto executivo e detalhamento',
      'Compatibilização com as demais disciplinas',
    ],
    icon: 'compass',
    image: 'service-arquitetonico',
    seo: {
      title: 'Projeto Arquitetônico em São Paulo | MDK Engenharia',
      description:
        'Projeto arquitetônico residencial, comercial e industrial: estudo preliminar, projeto legal para aprovação na prefeitura e projeto executivo detalhado.',
      keywords: [
        'projeto arquitetônico São Paulo',
        'projeto legal para aprovação',
        'projeto executivo de arquitetura',
        'estudo preliminar e anteprojeto',
        'arquiteto para reforma São Paulo',
        'projeto de acessibilidade NBR 9050',
      ],
    },
    detail: {
      intro: [
        'O projeto arquitetônico define o que a obra vai ser antes de qualquer coisa ser construída: como os ambientes se organizam, por onde as pessoas circulam, como a luz entra, o que a fachada comunica. É a peça que orienta todas as outras disciplinas.',
        'Trabalhamos em etapas, e cada etapa fecha com uma decisão aprovada por você. Isso evita o cenário mais caro da construção civil: descobrir na obra que a solução não era a desejada, quando mudar já custa dez vezes mais que no papel.',
      ],
      scope: [
        {
          title: 'Concepção',
          items: [
            'Levantamento das necessidades e do programa de ambientes',
            'Análise do terreno, da orientação solar e das condicionantes legais',
            'Estudo preliminar com alternativas de implantação',
            'Anteprojeto com plantas, cortes e volumetria',
          ],
        },
        {
          title: 'Aprovação',
          items: [
            'Verificação de recuos, taxa de ocupação e coeficiente de aproveitamento',
            'Projeto legal no padrão exigido pela prefeitura',
            'Acessibilidade conforme NBR 9050',
            'Acompanhamento do processo até o alvará',
          ],
        },
        {
          title: 'Execução',
          items: [
            'Plantas de piso, forro, cobertura e paginação',
            'Detalhamento de esquadrias, escadas e áreas molhadas',
            'Compatibilização com estrutura e instalações',
            'Caderno de acabamentos',
          ],
        },
      ],
      deliverables: [
        'Plantas, cortes e elevações em escala',
        'Projeto legal protocolável na prefeitura',
        'Projeto executivo com detalhes construtivos',
        'Memorial descritivo',
      ],
      norms: [
        'NBR 6492 — representação de projetos de arquitetura',
        'NBR 9050 — acessibilidade a edificações',
        'NBR 15575 — desempenho de edificações habitacionais',
        'Código de Obras e Lei de Parcelamento, Uso e Ocupação do Solo do município',
      ],
      faq: [
        {
          q: 'Projeto legal e projeto executivo são a mesma coisa?',
          a: 'Não. O projeto legal é a versão que a prefeitura analisa para emitir o alvará — traz o que a legislação exige verificar. O projeto executivo é a versão que vai para a obra, com o detalhamento necessário para construir. Uma obra tocada só com o projeto legal acaba resolvida no improviso, no canteiro.',
        },
        {
          q: 'Preciso de projeto arquitetônico para uma reforma?',
          a: 'Depende do que muda. Reforma que altera área construída, layout de áreas molhadas ou elementos estruturais precisa de projeto e, na maioria dos casos, de aprovação. Reforma só de acabamento normalmente não. Vale confirmar antes de começar: regularizar depois custa mais.',
        },
      ],
    },
  },
  {
    id: 'projeto-estrutural',
    title: 'Projetos Estruturais',
    category: 'projeto',
    summary:
      'Conceber, distribuir, interligar, analisar e dimensionar os elementos do sistema estrutural para suportar com segurança o conjunto de cargas previsto.',
    bullets: [
      'Concepção e análise estrutural',
      'Dimensionamento dos elementos',
      'Detalhamento e desenho de fôrmas e armação',
      'Memorial de cálculo e ART',
    ],
    icon: 'pillar',
    image: 'service-estrutural',
    seo: {
      title: 'Projeto Estrutural em São Paulo | MDK Engenharia',
      description:
        'Projeto estrutural em concreto armado, alvenaria estrutural e aço: concepção, análise, dimensionamento, detalhamento e memorial de cálculo.',
      keywords: [
        'projeto estrutural São Paulo',
        'cálculo estrutural concreto armado',
        'projeto de fundações',
        'alvenaria estrutural projeto',
        'estrutura metálica projeto',
        'memorial de cálculo estrutural',
      ],
    },
    detail: {
      intro: [
        'O projeto estrutural é o processo de conceber, distribuir, interligar, analisar e dimensionar os elementos de um sistema estrutural destinado a suportar com segurança — resistência e estabilidade — um determinado conjunto de cargas, sem exceder os limites dos materiais empregados.',
        'É a disciplina onde erro não perdoa e economia mal feita sai cara duas vezes: superdimensionar desperdiça concreto e aço em toda a obra; subdimensionar compromete a segurança. O dimensionamento correto é o que separa os dois.',
      ],
      scope: [
        {
          title: 'Etapas do projeto',
          items: [
            'Concepção estrutural — definição do sistema e lançamento dos elementos',
            'Análise estrutural — modelagem e verificação do comportamento',
            'Síntese estrutural — compatibilização das soluções',
            'Dimensionamento dos elementos',
            'Detalhamento e desenho',
          ],
        },
        {
          title: 'Sistemas atendidos',
          items: [
            'Concreto armado moldado no local',
            'Alvenaria estrutural',
            'Estrutura metálica',
            'Fundações rasas e profundas',
          ],
        },
        {
          title: 'Cargas consideradas',
          items: [
            'Peso próprio e cargas permanentes',
            'Sobrecargas de utilização por tipo de ambiente',
            'Ação do vento',
            'Recalques e condicionantes do solo',
          ],
        },
      ],
      deliverables: [
        'Plantas de fôrmas de todos os pavimentos',
        'Detalhamento de armação com quantitativo de aço',
        'Projeto de fundações',
        'Memorial de cálculo',
        'ART de projeto',
      ],
      norms: [
        'NBR 6118 — projeto de estruturas de concreto',
        'NBR 6120 — cargas para o cálculo de estruturas de edificações',
        'NBR 6123 — forças devidas ao vento em edificações',
        'NBR 8800 — projeto de estruturas de aço',
        'NBR 6122 — projeto e execução de fundações',
      ],
      faq: [
        {
          q: 'Dá para fazer o projeto estrutural sem sondagem do solo?',
          a: 'Não com segurança. A fundação depende da capacidade de carga do terreno, e essa informação vem do ensaio de sondagem. Sem ele, o dimensionamento vira estimativa — e a fundação é justamente a parte da obra mais cara de corrigir depois.',
        },
        {
          q: 'O projeto estrutural precisa conversar com as outras disciplinas?',
          a: 'Precisa, e é onde mais se perde dinheiro quando não acontece. Furo de viga não previsto para passar tubulação, shaft que não existe, forro que não fecha: tudo isso aparece na obra quando estrutura e instalações foram projetadas separadamente. Por isso compatibilizamos as disciplinas antes de fechar o projeto.',
        },
      ],
    },
  },
  {
    id: 'projeto-hidraulico',
    title: 'Instalações Hidráulicas',
    category: 'projeto',
    summary:
      'Dimensionamento completo de água fria, água quente, esgoto e águas pluviais, com memorial de cálculo e detalhamento executivo.',
    bullets: [
      'Água fria e água quente',
      'Esgoto sanitário e ventilação',
      'Captação de águas pluviais',
      'Memorial de cálculo e ART',
    ],
    icon: 'water',
    image: 'service-hidraulico',
    seo: {
      title: 'Projeto Hidráulico em São Paulo | MDK Engenharia',
      description:
        'Projeto de instalações hidráulicas prediais: água fria e quente, esgoto sanitário, ventilação e águas pluviais, com memorial de cálculo e detalhamento executivo.',
      keywords: [
        'projeto hidráulico São Paulo',
        'projeto de água fria e água quente',
        'projeto de esgoto sanitário',
        'projeto de águas pluviais',
        'dimensionamento de reservatório',
        'projeto hidrossanitário predial',
      ],
    },
    detail: {
      intro: [
        'Instalação hidráulica bem projetada é aquela de que ninguém se lembra: a água chega com pressão em todos os pontos, o esgoto escoa sem cheiro e a chuva vai para onde deve ir. Quando o projeto falha, o sintoma aparece anos depois — e quase sempre dentro da parede.',
        'Dimensionamos cada trecho a partir do consumo real da edificação, e não por diâmetro padrão repetido. É o que evita o chuveiro fraco no último pavimento e o golpe de aríete que trinca a tubulação.',
      ],
      scope: [
        {
          title: 'Água fria e quente',
          items: [
            'Dimensionamento do ramal predial e do hidrômetro',
            'Reservatórios inferior e superior, com cálculo de consumo diário',
            'Barrilete, colunas, ramais e sub-ramais',
            'Sistema de aquecimento e retorno de água quente',
            'Pressurização, quando a altura da edificação exigir',
          ],
        },
        {
          title: 'Esgoto e ventilação',
          items: [
            'Ramais de descarga, tubos de queda e coletores',
            'Colunas de ventilação',
            'Caixas de inspeção e de gordura',
            'Interligação com a rede pública ou solução local',
          ],
        },
        {
          title: 'Águas pluviais',
          items: [
            'Cálculo de vazão a partir do índice pluviométrico local',
            'Calhas, condutores verticais e horizontais',
            'Ralos e caixas de areia',
            'Destinação final e reserva de retenção, quando exigida',
          ],
        },
      ],
      deliverables: [
        'Plantas por pavimento com traçado e diâmetros',
        'Isométricos das prumadas',
        'Detalhes de barrilete, reservatório e casa de bombas',
        'Memorial de cálculo e lista de materiais',
        'ART de projeto',
      ],
      norms: [
        'NBR 5626 — sistemas prediais de água fria e água quente',
        'NBR 8160 — sistemas prediais de esgoto sanitário',
        'NBR 10844 — instalações prediais de águas pluviais',
        'NBR 7198 — sistemas prediais de água quente',
      ],
      faq: [
        {
          q: 'O projeto hidráulico é obrigatório para aprovar a obra?',
          a: 'Para edificações de porte, sim — e a concessionária exige o projeto para ligar água e esgoto. Mesmo quando a prefeitura não pede, o projeto compensa: instalação executada sem dimensionamento é a origem mais comum de reforma prematura em área molhada.',
        },
        {
          q: 'Vocês projetam reaproveitamento de água de chuva?',
          a: 'Sim. Entra no projeto de águas pluviais, com reservatório, filtragem e rede separada dos pontos de água potável. Em terrenos com grande área impermeabilizada, a reserva de retenção pode ser exigida pela legislação municipal — nesse caso os dois sistemas são estudados juntos.',
        },
      ],
    },
  },
  {
    id: 'projeto-eletrico',
    title: 'Instalações Elétricas',
    category: 'projeto',
    summary:
      'Projetos elétricos de baixa tensão conforme NBR 5410, do quadro de cargas ao diagrama unifilar, prontos para aprovação na concessionária.',
    bullets: [
      'Quadro de cargas e diagrama unifilar',
      'Dimensionamento de circuitos e proteções',
      'SPDA e aterramento',
      'Padrão de entrada da concessionária',
    ],
    icon: 'bolt',
    image: 'service-eletrico',
    seo: {
      title: 'Projeto Elétrico em São Paulo | MDK Engenharia',
      description:
        'Projeto de instalações elétricas de baixa tensão conforme NBR 5410: quadro de cargas, diagrama unifilar, SPDA, aterramento e padrão de entrada.',
      keywords: [
        'projeto elétrico São Paulo',
        'projeto elétrico NBR 5410',
        'quadro de cargas e diagrama unifilar',
        'padrão de entrada de energia',
        'projeto de SPDA e aterramento',
        'projeto elétrico predial',
      ],
    },
    detail: {
      intro: [
        'Projeto elétrico é dimensionamento, não desenho de tomadas. Cada circuito nasce de uma carga calculada, cada condutor de uma corrente, cada proteção de um curto-circuito previsto. É isso que faz o disjuntor desarmar na hora certa em vez de o cabo aquecer dentro do eletroduto.',
        'Entregamos o projeto no formato que a concessionária aceita e a obra consegue executar — com o padrão de entrada compatível com a carga instalada, que é onde mais se perde tempo em ligação nova.',
      ],
      scope: [
        {
          title: 'Dimensionamento',
          items: [
            'Previsão de cargas por ambiente e quadro de cargas geral',
            'Divisão de circuitos e balanceamento de fases',
            'Dimensionamento de condutores por capacidade e queda de tensão',
            'Proteção contra sobrecorrente e diferencial-residual (DR)',
            'Padrão de entrada e definição do tipo de fornecimento',
          ],
        },
        {
          title: 'Proteção contra descargas atmosféricas',
          items: [
            'Análise de risco conforme NBR 5419',
            'Sistema de captação, descidas e aterramento',
            'Equalização de potenciais',
            'Dispositivos de proteção contra surtos (DPS)',
          ],
        },
        {
          title: 'Sistemas complementares',
          items: [
            'Infraestrutura de dados e voz',
            'Iluminação de emergência',
            'Automação e comando de iluminação',
            'Infraestrutura para geração fotovoltaica',
          ],
        },
      ],
      deliverables: [
        'Plantas de pontos, circuitos e encaminhamentos',
        'Diagrama unifilar e quadro de cargas',
        'Detalhe do padrão de entrada no formato da concessionária',
        'Projeto de SPDA e malha de aterramento',
        'Memorial de cálculo e ART',
      ],
      norms: [
        'NBR 5410 — instalações elétricas de baixa tensão',
        'NBR 5419 — proteção contra descargas atmosféricas',
        'NBR 14039 — instalações elétricas de média tensão',
        'Normas técnicas da concessionária local para o padrão de entrada',
      ],
      faq: [
        {
          q: 'A concessionária exige projeto para ligar a energia?',
          a: 'Para entrada acima do padrão residencial simples, sim. O projeto define a carga instalada, o tipo de fornecimento (monofásico, bifásico ou trifásico) e o padrão de entrada correspondente. Errar esse dimensionamento significa refazer o padrão depois de construído.',
        },
        {
          q: 'SPDA é obrigatório?',
          a: 'Depende do resultado da análise de risco da NBR 5419, que considera a altura, a localização, o tipo de ocupação e o que há dentro da edificação. A análise faz parte do projeto — e é ela, não uma regra fixa, que define se o sistema é exigido.',
        },
      ],
    },
  },
  {
    id: 'projeto-spci',
    title: 'Projetos de SPCI',
    category: 'projeto',
    summary:
      'Sistemas de proteção e combate a incêndio dimensionados conforme as Instruções Técnicas do Corpo de Bombeiros, do projeto ao AVCB.',
    bullets: [
      'Hidrantes, mangotinhos e sprinklers',
      'Casa de bombas e reserva técnica de incêndio',
      'Saídas de emergência, sinalização e extintores',
      'Aprovação no Corpo de Bombeiros',
    ],
    icon: 'flame',
    image: 'service-spci',
    seo: {
      title: 'Projeto de SPCI e AVCB em São Paulo | MDK Engenharia',
      description:
        'Projeto de sistema de proteção e combate a incêndio conforme as Instruções Técnicas do Corpo de Bombeiros: hidrantes, sprinklers, saídas de emergência e AVCB.',
      keywords: [
        'projeto de SPCI São Paulo',
        'projeto de combate a incêndio',
        'projeto de hidrantes e sprinklers',
        'AVCB projeto técnico',
        'saídas de emergência NBR 9077',
        'casa de bombas de incêndio',
      ],
    },
    detail: {
      intro: [
        'O projeto de SPCI define as medidas de segurança que a edificação precisa ter para funcionar legalmente — e para dar às pessoas tempo de sair. As exigências não são as mesmas para todo prédio: variam com a área, a altura e a ocupação, e é a classificação correta que determina o pacote.',
        'Conduzimos o processo no Corpo de Bombeiros do início ao Auto de Vistoria (AVCB). Sem ele, a edificação não obtém licença de funcionamento e o seguro pode ser negado em caso de sinistro.',
      ],
      scope: [
        {
          title: 'Classificação e medidas',
          items: [
            'Enquadramento por ocupação, área e altura',
            'Definição das medidas de segurança exigidas',
            'Compartimentação horizontal e vertical',
            'Controle de materiais de acabamento',
          ],
        },
        {
          title: 'Sistemas hidráulicos de combate',
          items: [
            'Rede de hidrantes e mangotinhos',
            'Chuveiros automáticos (sprinklers)',
            'Reserva técnica de incêndio e casa de bombas',
            'Dimensionamento hidráulico da rede',
          ],
        },
        {
          title: 'Rotas de fuga e alarme',
          items: [
            'Dimensionamento das saídas de emergência',
            'Iluminação de emergência',
            'Sinalização de abandono',
            'Detecção e alarme de incêndio',
            'Extintores por classe de risco',
          ],
        },
      ],
      deliverables: [
        'Projeto técnico no padrão do Corpo de Bombeiros',
        'Memorial de cálculo hidráulico',
        'Plantas de rotas de fuga e sinalização',
        'Protocolo e acompanhamento do processo até o AVCB',
        'ART de projeto',
      ],
      norms: [
        'Instruções Técnicas do Corpo de Bombeiros da Polícia Militar do Estado de São Paulo',
        'NBR 13714 — sistemas de hidrantes e mangotinhos',
        'NBR 10897 — sistemas de chuveiros automáticos',
        'NBR 9077 — saídas de emergência em edifícios',
        'NBR 12693 — sistemas de proteção por extintores',
      ],
      faq: [
        {
          q: 'Toda edificação precisa de AVCB?',
          a: 'Não. A exigência depende da área, da altura e da ocupação. Edificações menores e de menor risco podem se enquadrar em regimes simplificados. O primeiro passo do projeto é justamente a classificação, que define o que se aplica ao seu caso.',
        },
        {
          q: 'Meu prédio é antigo e nunca teve AVCB. Tem solução?',
          a: 'Na maioria dos casos, sim. Edificações existentes seguem regras específicas de regularização, que consideram o que é viável adequar. O caminho começa por um levantamento do que existe hoje e uma comparação com o que a classificação exige.',
        },
      ],
    },
  },
  {
    id: 'projeto-gases-medicinais',
    title: 'Gases Medicinais',
    category: 'projeto',
    summary:
      'Redes de gases medicinais para unidades de saúde conforme RDC 50 e NBR 13932, da central de suprimento aos postos de utilização.',
    bullets: [
      'Central de suprimento e reserva',
      'Rede de oxigênio, ar comprimido e vácuo',
      'Painéis de alarme e válvulas de seccionamento',
      'Postos de utilização por ambiente',
    ],
    icon: 'medical',
    image: 'service-gases-medicinais',
    seo: {
      title: 'Projeto de Gases Medicinais | MDK Engenharia',
      description:
        'Projeto de rede de gases medicinais para hospitais e clínicas: central de suprimento, oxigênio, ar comprimido medicinal, vácuo clínico, alarmes e postos de utilização.',
      keywords: [
        'projeto de gases medicinais',
        'rede de oxigênio hospitalar',
        'ar comprimido medicinal e vácuo clínico',
        'central de gases medicinais',
        'RDC 50 projeto físico saúde',
        'NBR 12188 gases medicinais',
      ],
    },
    detail: {
      intro: [
        'Rede de gases medicinais é instalação crítica: o oxigênio que chega ao leito não pode faltar nem por minutos, e a pressão precisa ser constante em todos os postos, com a unidade cheia. É por isso que a norma exige redundância de suprimento e alarmes em pontos específicos.',
        'Projetamos o sistema completo, da central até o posto de utilização de cada ambiente, dimensionado pelo perfil de consumo real da unidade e pela simultaneidade prevista.',
      ],
      scope: [
        {
          title: 'Central de suprimento',
          items: [
            'Dimensionamento da fonte primária, secundária e de reserva',
            'Central de cilindros, tanque criogênico ou usina concentradora',
            'Compressores de ar medicinal e bombas de vácuo',
            'Sala técnica, ventilação e segurança da central',
          ],
        },
        {
          title: 'Rede de distribuição',
          items: [
            'Oxigênio medicinal',
            'Ar comprimido medicinal',
            'Vácuo clínico',
            'Óxido nitroso e nitrogênio, quando aplicável',
            'Dimensionamento por vazão e simultaneidade',
          ],
        },
        {
          title: 'Controle e segurança',
          items: [
            'Válvulas de seccionamento por setor',
            'Painéis de alarme operacional e de emergência',
            'Postos de utilização por tipo de ambiente',
            'Identificação e código de cores das tubulações',
          ],
        },
      ],
      deliverables: [
        'Plantas da rede e isométricos',
        'Detalhamento da central de suprimento',
        'Memorial de cálculo de vazão e perda de carga',
        'Especificação de materiais e componentes',
        'ART de projeto',
      ],
      norms: [
        'RDC 50/2002 — ANVISA, projetos físicos de estabelecimentos de saúde',
        'NBR 12188 — sistemas centralizados de suprimento de gases medicinais',
        'NBR 13587 — instalação de sistemas de gases medicinais',
      ],
      faq: [
        {
          q: 'Clínica pequena também precisa de projeto de gases?',
          a: 'Se houver rede canalizada, sim — e o projeto integra o processo de licenciamento sanitário. Consultórios que usam apenas cilindros portáteis seguem outras regras, mas ainda assim há requisitos de armazenamento e sinalização a atender.',
        },
        {
          q: 'A rede de gases interfere nas outras instalações?',
          a: 'Bastante. Ela disputa espaço em forro e shaft com elétrica, hidráulica e climatização, e tem exigências próprias de afastamento e identificação. Por isso é uma das disciplinas que mais se beneficia de compatibilização antes da obra.',
        },
      ],
    },
  },
  {
    id: 'projeto-drenagem',
    title: 'Projetos de Drenagem',
    category: 'projeto',
    summary:
      'Drenagem de águas pluviais e redes enterradas, do lote ao sistema urbano, com dimensionamento hidráulico e detalhes de execução.',
    bullets: [
      'Micro e macrodrenagem',
      'Reservatório de retenção (piscinão)',
      'Bocas de lobo, poços de visita e galerias',
      'Compatibilização com redes de água e esgoto',
    ],
    icon: 'drain',
    image: 'service-drenagem',
    seo: {
      title: 'Projeto de Drenagem em São Paulo | MDK Engenharia',
      description:
        'Projeto de drenagem de águas pluviais: micro e macrodrenagem, reservatório de retenção, galerias, bocas de lobo e compatibilização com as redes enterradas.',
      keywords: [
        'projeto de drenagem São Paulo',
        'reservatório de retenção piscinão',
        'micro e macrodrenagem',
        'projeto de águas pluviais urbanas',
        'galerias e bocas de lobo',
        'Lei 13.276/2002 reservatório',
      ],
    },
    detail: {
      intro: [
        'Drenagem é a disciplina que só aparece quando falha — e aí aparece alagando. O projeto calcula quanta água a chuva de projeto traz para aquele terreno e garante caminho para ela sair sem transbordar, sem erodir e sem jogar o problema no vizinho.',
        'Em São Paulo há uma camada a mais: terrenos com área impermeabilizada acima do limite legal precisam reter parte da chuva antes de lançar na rede pública. Esse reservatório entra no projeto e é condição para a aprovação.',
      ],
      scope: [
        {
          title: 'Estudo hidrológico',
          items: [
            'Definição da chuva de projeto e do tempo de retorno',
            'Cálculo de vazão por área de contribuição',
            'Análise de declividades e pontos de lançamento',
            'Taxa de impermeabilização do terreno',
          ],
        },
        {
          title: 'Microdrenagem',
          items: [
            'Bocas de lobo, grelhas e sarjetas',
            'Ramais, poços de visita e caixas de passagem',
            'Dimensionamento de galerias',
            'Drenagem de subsolo e rebaixamento de lençol',
          ],
        },
        {
          title: 'Retenção e lançamento',
          items: [
            'Reservatório de retenção dimensionado pela legislação municipal',
            'Dispositivo de descarga controlada',
            'Interligação com a rede pública',
            'Soluções de infiltração, quando o solo permite',
          ],
        },
      ],
      deliverables: [
        'Planta de drenagem com traçado, cotas e declividades',
        'Perfis das redes',
        'Detalhamento do reservatório de retenção',
        'Memorial de cálculo hidrológico e hidráulico',
        'ART de projeto',
      ],
      norms: [
        'NBR 10844 — instalações prediais de águas pluviais',
        'NBR 12266 — projeto e execução de valas para redes enterradas',
        'Lei Municipal 13.276/2002 (São Paulo) — reservatório de retenção',
        'Diretrizes da concessionária de saneamento para lançamento',
      ],
      faq: [
        {
          q: 'Quando o reservatório de retenção é exigido?',
          a: 'Em São Paulo, a lei municipal exige para terrenos com área impermeabilizada acima do limite estabelecido. O volume é calculado a partir da área do lote e da taxa de impermeabilização. Outros municípios têm regras próprias, que verificamos caso a caso.',
        },
        {
          q: 'Drenagem e águas pluviais prediais são a mesma coisa?',
          a: 'São etapas do mesmo caminho da água. As águas pluviais prediais tratam do telhado, das calhas e dos condutores até o térreo. A drenagem cuida do que acontece do solo em diante — captação no terreno, galerias e lançamento. Projetos separados que não conversam geram exatamente o ponto onde a água acumula.',
        },
      ],
    },
  },
  {
    id: 'projeto-industrial',
    title: 'Projetos Industriais',
    category: 'projeto',
    summary:
      'Projetos para plantas industriais: layout, utilidades, tubulação e infraestrutura de processo, com foco em operação e manutenção.',
    bullets: [
      'Layout industrial e fluxo de processo',
      'Tubulação e utilidades',
      'Infraestrutura elétrica e de automação',
      'Adequação às normas regulamentadoras',
    ],
    icon: 'factory',
    image: 'service-industrial',
    seo: {
      title: 'Projeto Industrial | MDK Engenharia',
      description:
        'Projetos para plantas industriais: layout e fluxo de processo, utilidades, tubulação, infraestrutura elétrica e adequação às normas regulamentadoras.',
      keywords: [
        'projeto industrial São Paulo',
        'layout industrial e fluxo de processo',
        'projeto de utilidades industriais',
        'tubulação industrial projeto',
        'adequação NR-12 e NR-13',
        'projeto elétrico industrial',
      ],
    },
    detail: {
      intro: [
        'Numa planta industrial, o prédio existe em função do processo. O projeto começa pelo fluxo — o que entra, por onde passa, o que sai — e só depois define estrutura, instalações e fechamentos. Inverter essa ordem é o que produz galpão bonito onde a operação não cabe.',
        'Projetamos considerando também o que vem depois da inauguração: espaço para manutenção, acesso a equipamentos, rota de troca de peças pesadas e margem para a próxima linha de produção.',
      ],
      scope: [
        {
          title: 'Layout e processo',
          items: [
            'Arranjo físico a partir do fluxo produtivo',
            'Circulação de pessoas, empilhadeiras e cargas',
            'Áreas de estoque, expedição e apoio',
            'Previsão de expansão',
          ],
        },
        {
          title: 'Utilidades',
          items: [
            'Ar comprimido industrial',
            'Vapor e água de processo',
            'Tubulação de processo e suportação',
            'Efluentes industriais',
          ],
        },
        {
          title: 'Infraestrutura',
          items: [
            'Alimentação elétrica e distribuição em média e baixa tensão',
            'Infraestrutura de automação e instrumentação',
            'Iluminação industrial',
            'Piso industrial e cargas de equipamento',
          ],
        },
      ],
      deliverables: [
        'Planta de layout e fluxograma de processo',
        'Projetos de utilidades e tubulação',
        'Projeto elétrico industrial',
        'Memoriais e especificações técnicas',
        'ART de projeto',
      ],
      norms: [
        'NR-10 — segurança em instalações e serviços em eletricidade',
        'NR-12 — segurança no trabalho em máquinas e equipamentos',
        'NR-13 — caldeiras, vasos de pressão e tubulações',
        'NBR 14432 — exigências de resistência ao fogo de elementos construtivos',
      ],
      faq: [
        {
          q: 'Vocês fazem adequação de planta já em operação?',
          a: 'Sim, e é o caso mais comum. Começa por um levantamento do que existe, comparado com a exigência aplicável e com a necessidade de produção. O plano de adequação é então faseado para interferir o mínimo possível na operação.',
        },
        {
          q: 'Projeto industrial precisa de licenciamento ambiental?',
          a: 'Depende da atividade e do porte. Boa parte das atividades industriais em São Paulo passa pela CETESB, e o licenciamento tem exigências que impactam o projeto — tratamento de efluentes, controle de emissões, armazenamento de produtos. Tratamos as duas frentes juntas para evitar retrabalho.',
        },
      ],
    },
  },

  {
    id: 'projeto-ar-condicionado',
    title: 'Instalações de Ar-Condicionado',
    category: 'projeto',
    summary:
      'Projeto de climatização com cálculo de carga térmica ambiente a ambiente, do dimensionamento dos equipamentos ao encaminhamento de drenos e infraestrutura elétrica.',
    bullets: [
      'Cálculo de carga térmica por ambiente',
      'Seleção de equipamentos e sistema',
      'Rede frigorígena, drenos e ventilação',
      'Infraestrutura elétrica dedicada',
    ],
    icon: 'wind',
    seo: {
      title: 'Projeto de Ar-Condicionado e Climatização | MDK Engenharia',
      description:
        'Projeto de instalações de ar-condicionado: cálculo de carga térmica, seleção de equipamentos, rede frigorígena, drenos, renovação de ar e infraestrutura elétrica.',
      keywords: [
        'projeto de ar-condicionado São Paulo',
        'cálculo de carga térmica',
        'projeto de climatização VRF',
        'projeto de ar-condicionado split',
        'NBR 16401 climatização',
        'renovação de ar e exaustão',
      ],
    },
    detail: {
      intro: [
        'Climatização mal dimensionada aparece de duas formas, e nenhuma barata: equipamento pequeno demais que roda no limite e nunca atinge a temperatura, ou grande demais que liga e desliga o tempo todo, gasta energia e não retira umidade do ar.',
        'O ponto de partida é o cálculo de carga térmica ambiente a ambiente — orientação solar, área envidraçada, número de pessoas, equipamentos, iluminação. É esse número que define o equipamento, e não a tabela de "BTU por metro quadrado".',
      ],
      scope: [
        {
          title: 'Dimensionamento',
          items: [
            'Cálculo de carga térmica por ambiente',
            'Definição do sistema (split, multi-split, VRF ou self)',
            'Seleção e posicionamento de evaporadoras e condensadoras',
            'Renovação de ar e exaustão',
          ],
        },
        {
          title: 'Rede e infraestrutura',
          items: [
            'Traçado e dimensionamento da rede frigorígena',
            'Encaminhamento de drenos com caimento',
            'Infraestrutura elétrica dedicada por equipamento',
            'Suportes, bases de condensadora e acesso para manutenção',
          ],
        },
        {
          title: 'Compatibilização',
          items: [
            'Coordenação com forro, estrutura e demais instalações',
            'Espaço técnico para manutenção e troca de filtros',
            'Tratamento acústico das condensadoras',
            'Previsão de shafts e passagens',
          ],
        },
      ],
      deliverables: [
        'Planta com posicionamento de equipamentos e traçados',
        'Memorial de cálculo de carga térmica',
        'Especificação técnica dos equipamentos',
        'Detalhes de instalação e suportação',
        'ART de projeto',
      ],
      norms: [
        'NBR 16401 — instalações de ar-condicionado de conforto',
        'NBR 16655 — instalação de sistemas de condicionamento de ar',
        'Portaria 3.523/1998 do Ministério da Saúde — qualidade do ar em ambientes climatizados',
      ],
      faq: [
        {
          q: 'Dá para instalar ar-condicionado sem projeto?',
          a: 'Em um ambiente isolado, o instalador resolve. Em obra com vários ambientes, não: a rede frigorígena, os drenos e a alimentação elétrica precisam ser previstos antes do forro fechar. Sem isso, ou o dreno fica sem caimento e vaza, ou a tubulação aparece por fora da parede.',
        },
        {
          q: 'Qual a diferença entre split e VRF?',
          a: 'O split atende um ambiente por condensadora. O VRF liga várias evaporadoras a uma condensadora só, modulando a vazão de refrigerante — sai mais caro na instalação e compensa em edificações com muitos ambientes, tanto em espaço de fachada quanto em consumo. O cálculo de carga mostra a partir de que ponto vale.',
        },
      ],
    },
  },

  // ─────────────────── EXECUCAO, CONSULTORIA E DOCUMENTACAO ───────────────────
  {
    id: 'regularizacao',
    title: 'Documentação e Regularização',
    category: 'obra',
    summary:
      'Aprovação e regularização junto à Prefeitura, Corpo de Bombeiros e CETESB, do levantamento inicial ao Habite-se.',
    bullets: [
      'Alvará de aprovação, execução e Habite-se',
      'Auto de regularização e desdobro',
      'AVCB e CLCB no Corpo de Bombeiros',
      'Dispensa de licença ambiental na CETESB',
    ],
    icon: 'document',
    image: 'service-documentacao',
    seo: {
      title: 'Regularização de Obras e Habite-se em São Paulo | MDK Engenharia',
      description:
        'Aprovação e regularização de obras: prefeitura, Corpo de Bombeiros e CETESB. Alvará de execução, regularização de construção existente e Habite-se.',
      keywords: [
        'regularização de obras São Paulo',
        'habite-se São Paulo',
        'auto de regularização',
        'alvará de aprovação e execução',
        'AVCB e CLCB',
        'dispensa de licença ambiental CETESB',
        'desdobro e desmembramento de IPTU',
      ],
    },
    detail: {
      intro: [
        'Imóvel irregular vale menos, não financia, não vende com segurança e pode gerar multa. A regularização resolve isso — mas o caminho depende do que já foi construído, de quando, e do que a legislação vigente permite manter.',
        'Fazemos o diagnóstico antes de prometer prazo. Levantamos o que existe, comparamos com o que está aprovado e com o que a lei atual admite, e só então definimos a rota: aprovação, regularização ou adequação prévia.',
      ],
      scope: [
        {
          title: 'Prefeitura',
          items: [
            'Alvará de Aprovação e Execução',
            'Auto de Regularização de construção existente',
            'Licença para residência unifamiliar',
            'Desdobro, desmembramento e unificação de IPTU',
            'Certificado de Conclusão (Habite-se)',
            'Certificado de Acessibilidade — projeto, diretrizes e aprovação',
          ],
        },
        {
          title: 'Corpo de Bombeiros',
          items: [
            'Projeto de prevenção e combate a incêndio',
            'F.A.T. — Formulário de Atendimento Técnico',
            'AVCB e CLCB, incluindo renovações',
            'Classificação da edificação e acompanhamento da vistoria',
          ],
        },
        {
          title: 'CETESB e demais órgãos',
          items: [
            'Dispensa de licença ambiental',
            'Licenciamento de atividades sujeitas a controle',
            'Licença prévia, de instalação e de operação',
            'Interface com concessionárias de água e energia',
          ],
        },
      ],
      deliverables: [
        'Diagnóstico documental do imóvel',
        'Peças técnicas no padrão de cada órgão',
        'Protocolo, acompanhamento e resposta a exigências',
        'ART e RRT correspondentes',
        'Documento final: alvará, Habite-se, AVCB ou licença',
      ],
      norms: [
        'Código de Obras e Edificações do município',
        'Lei de Parcelamento, Uso e Ocupação do Solo',
        'Instruções Técnicas do Corpo de Bombeiros',
        'Legislação ambiental estadual aplicável à atividade',
      ],
      faq: [
        {
          q: 'Quanto tempo leva uma regularização?',
          a: 'O prazo depende muito mais do órgão e da complexidade do caso do que do projeto em si. Processos simples podem sair em poucos meses; casos com exigências de adequação física levam mais. Damos uma estimativa realista depois do diagnóstico — antes disso, qualquer número seria chute.',
        },
        {
          q: 'Dá para regularizar qualquer construção?',
          a: 'Não. Construção em área não edificável, invasão de recuo obrigatório ou de faixa de servidão pode não ter caminho de regularização sem demolição parcial. O diagnóstico existe justamente para identificar isso no começo, e não depois de um processo protocolado.',
        },
      ],
    },
  },
  {
    id: 'execucao-obra',
    title: 'Execução de Obra',
    category: 'obra',
    summary:
      'Obras residenciais, comerciais e industriais com equipe própria e cronograma controlado.',
    bullets: [
      'Obra residencial',
      'Obra comercial',
      'Obra industrial',
      'Cronograma físico-financeiro',
    ],
    icon: 'hammer',
    seo: {
      title: 'Execução de Obras Residenciais, Comerciais e Industriais | MDK Engenharia',
      description:
        'Execução de obra com equipe própria e cronograma controlado: obras residenciais, comerciais e industriais, do canteiro à entrega.',
      keywords: [
        'execução de obra São Paulo',
        'construtora obra residencial',
        'reforma comercial São Paulo',
        'obra industrial galpão',
        'cronograma físico-financeiro obra',
        'empresa de construção civil São Paulo',
      ],
    },
    detail: {
      intro: [
        'Executar é onde o projeto encontra a realidade. Assumimos a obra com cronograma físico-financeiro definido, equipe própria nas frentes principais e medição por etapa concluída — não por tempo decorrido.',
        'Quem projeta e executa carrega a responsabilidade inteira. Não existe a conversa de que o problema foi do projeto ou da mão de obra: é nossa.',
      ],
      scope: [
        {
          title: 'Segmentos',
          items: [
            'Obra residencial — casas, sobrados e edifícios',
            'Obra comercial — lojas, escritórios e retrofit',
            'Obra industrial — galpões, ampliações e adequações',
          ],
        },
        {
          title: 'Gestão do canteiro',
          items: [
            'Cronograma físico-financeiro e curva de desembolso',
            'Compras e controle de materiais',
            'Coordenação de equipes e subempreiteiros',
            'Segurança do trabalho e documentação do canteiro',
          ],
        },
        {
          title: 'Controle',
          items: [
            'Medição por etapa concluída',
            'Registro fotográfico do avanço',
            'Controle de qualidade dos serviços',
            'Diário de obra',
          ],
        },
      ],
      deliverables: [
        'Cronograma físico-financeiro',
        'Relatórios periódicos de avanço',
        'As built das instalações ao final',
        'Obra entregue com documentação para o Habite-se',
      ],
      faq: [
        {
          q: 'Vocês executam obra projetada por outro escritório?',
          a: 'Sim. Nesse caso começamos por uma análise de construtibilidade do projeto recebido — é comum encontrar incompatibilidades entre disciplinas que precisam ser resolvidas antes de abrir o canteiro, e não durante.',
        },
        {
          q: 'Como funciona a medição?',
          a: 'Por etapa efetivamente concluída e verificada, seguindo o cronograma físico-financeiro acordado no início. Isso alinha o desembolso ao avanço real da obra, em vez de ao calendário.',
        },
      ],
    },
  },
  {
    id: 'consultoria-obra',
    title: 'Consultoria de Obra',
    category: 'obra',
    summary:
      'Acompanhamento técnico, laudos e fiscalização de execução em obras residenciais, comerciais e industriais.',
    bullets: [
      'Fiscalização e acompanhamento técnico',
      'Análise de projeto e de orçamento',
      'Laudos e vistorias',
      'Perícia em patologias construtivas',
    ],
    icon: 'clipboard',
    seo: {
      title: 'Consultoria e Fiscalização de Obra | MDK Engenharia',
      description:
        'Consultoria técnica de obra: fiscalização de execução, análise de projeto e orçamento, laudos, vistorias e diagnóstico de patologias construtivas.',
      keywords: [
        'consultoria de obra São Paulo',
        'fiscalização de obra',
        'laudo de patologias construtivas',
        'vistoria cautelar de vizinhança',
        'análise de orçamento de obra',
        'parecer técnico de engenharia',
      ],
    },
    detail: {
      intro: [
        'Nem todo cliente quer entregar a obra inteira. Muitos já têm construtor e precisam de alguém do seu lado, olhando tecnicamente o que está sendo feito, se o que foi cobrado foi executado e se o que foi executado está correto.',
        'É esse o papel da consultoria: representar o interesse técnico de quem paga a obra, com registro do que foi verificado.',
      ],
      scope: [
        {
          title: 'Antes da obra',
          items: [
            'Análise crítica de projetos e compatibilização',
            'Revisão de orçamento e de composição de custos',
            'Análise de contrato do ponto de vista técnico',
            'Verificação da documentação e das licenças',
          ],
        },
        {
          title: 'Durante a obra',
          items: [
            'Visitas técnicas periódicas com relatório',
            'Conferência de medição contra avanço real',
            'Verificação de conformidade com projeto e normas',
            'Apoio em decisões técnicas e mudanças de escopo',
          ],
        },
        {
          title: 'Laudos e diagnósticos',
          items: [
            'Vistoria de recebimento de imóvel',
            'Laudo de patologias — trincas, infiltrações e umidade',
            'Vistoria cautelar de vizinhança',
            'Parecer técnico para uso em negociação',
          ],
        },
      ],
      deliverables: [
        'Relatórios de visita com registro fotográfico',
        'Parecer técnico com conclusão objetiva',
        'Laudos com ART de serviço técnico',
        'Recomendações priorizadas por criticidade',
      ],
      faq: [
        {
          q: 'A consultoria substitui o engenheiro da obra?',
          a: 'Não. O responsável técnico pela execução continua sendo o da construtora. A consultoria atua do lado do contratante, verificando de forma independente — são papéis diferentes, e é justamente essa independência que dá valor ao parecer.',
        },
        {
          q: 'Faz sentido contratar consultoria numa obra pequena?',
          a: 'Faz, principalmente na análise de projeto e orçamento antes de fechar contrato. É onde o custo da consultoria costuma se pagar com folga: em obra pequena, uma decisão errada no início pesa proporcionalmente mais.',
        },
      ],
    },
  },
  {
    id: 'impermeabilizacao',
    title: 'Impermeabilização',
    category: 'obra',
    summary: 'Tratamento de lajes, baldrames, reservatórios e áreas molhadas.',
    bullets: [
      'Lajes e coberturas',
      'Baldrames e contenções',
      'Reservatórios e piscinas',
      'Áreas molhadas',
    ],
    icon: 'shield',
    seo: {
      title: 'Impermeabilização de Lajes e Reservatórios | MDK Engenharia',
      description:
        'Projeto e execução de impermeabilização: lajes, coberturas, baldrames, reservatórios, piscinas e áreas molhadas, com especificação por tipo de exposição.',
      keywords: [
        'impermeabilização São Paulo',
        'impermeabilização de laje',
        'impermeabilização de reservatório',
        'manta asfáltica aplicação',
        'impermeabilização pressão negativa',
        'NBR 9575 impermeabilização',
      ],
    },
    detail: {
      intro: [
        'Infiltração raramente é problema do material: é da especificação errada, do detalhe mal executado ou do sistema aplicado sobre base inadequada. Cada situação pede um sistema diferente, e é isso que define se a impermeabilização dura anos ou meses.',
        'Especificamos pelo tipo de exposição — água de percolação, pressão positiva ou negativa, tráfego, insolação — e detalhamos os pontos onde a impermeabilização de fato falha: ralos, rodapés, juntas e encontros.',
      ],
      scope: [
        {
          title: 'Áreas atendidas',
          items: [
            'Lajes expostas e coberturas',
            'Baldrames, contenções e subsolos',
            'Reservatórios de água e piscinas',
            'Banheiros, cozinhas e áreas de serviço',
            'Jardineiras e floreiras',
          ],
        },
        {
          title: 'Sistemas',
          items: [
            'Mantas asfálticas',
            'Membranas líquidas',
            'Argamassa polimérica e cristalizante',
            'Sistemas para pressão negativa',
          ],
        },
        {
          title: 'Detalhamento',
          items: [
            'Caimentos e pontos de escoamento',
            'Reforço em ralos, rodapés e juntas',
            'Proteção mecânica',
            'Teste de estanqueidade',
          ],
        },
      ],
      deliverables: [
        'Especificação técnica por área',
        'Detalhes construtivos dos pontos críticos',
        'Execução com teste de estanqueidade',
        'Termo de garantia do sistema aplicado',
      ],
      norms: [
        'NBR 9575 — impermeabilização, seleção e projeto',
        'NBR 9574 — execução de impermeabilização',
      ],
      faq: [
        {
          q: 'Dá para impermeabilizar por dentro, sem quebrar o piso?',
          a: 'Em alguns casos, sim — existem sistemas para pressão negativa que atuam pelo lado oposto ao da água. Mas nem toda situação aceita: depende da origem da umidade e do estado da base. O diagnóstico define o que é possível antes de qualquer promessa.',
        },
        {
          q: 'Qual a garantia de uma impermeabilização?',
          a: 'Varia com o sistema e com as condições de exposição. O ponto mais importante não é o prazo no papel: é a proteção mecânica e a manutenção. Manta exposta a tráfego sem proteção falha muito antes do fim da garantia nominal.',
        },
      ],
    },
  },
];

/** Disciplinas de projeto — o nucleo tecnico da empresa. */
export const primaryServices = services.filter((s) => s.category === 'projeto');

/** Frentes complementares: documentacao, execucao, consultoria e impermeabilizacao. */
export const secondaryServices = services.filter((s) => s.category === 'obra');

/** Servicos que ganham pagina propria em /servicos/[slug]. */
export const detailedServices = services.filter((s) => s.detail);

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

/** Segmentos atendidos em execucao e consultoria de obra. */
export const segments = ['Residencial', 'Comercial', 'Industrial'] as const;
