/**
 * Orgaos em que a MDK protocola e acompanha processos.
 *
 * Vieram da referencia enviada pelo cliente (Bombeiro, Prefeitura e CETESB) e do
 * panfleto impresso da empresa, que lista servico por servico dentro de cada um.
 *
 * Sao o desdobramento de /servicos/regularizacao: aquela pagina explica a
 * frente inteira, estas explicam o que muda em cada balcao. Existem separadas
 * porque a busca tambem e separada — quem procura "AVCB" nao procura "Habite-se",
 * e uma pagina so nao ranqueia bem para as duas.
 *
 * NOTA SOBRE A IMAGEM DOS BOMBEIROS: a referencia trazia o emblema do "Corpo de
 * Bombeiros Civil do Brasil", que e uma associacao privada e nao o Corpo de
 * Bombeiros da Policia Militar — este sim o orgao que emite AVCB em Sao Paulo.
 * Alem de sugerir vinculo inexistente, apontaria para o orgao errado. Trocado
 * por fotografia de sinalizacao e equipamento.
 *
 * A legislacao citada e a do municipio e do estado de Sao Paulo, onde a empresa
 * atua presencialmente. Em outro municipio muda a lei, nao o roteiro.
 */

export interface AgencyStep {
  title: string;
  text: string;
}

export interface AgencyService {
  title: string;
  text: string;
}

export interface Agency {
  /** Tambem e o slug em /servicos/regularizacao/[slug]. */
  id: string;
  /** Rotulo curto, usado nos cards. */
  name: string;
  /** Nome do orgao por extenso. */
  fullName: string;
  /** Frase de uma linha exibida sob o nome no card. */
  tagline: string;
  summary: string;
  image: string;
  icon: 'building' | 'flame' | 'leaf';
  seo: { title: string; description: string; keywords: string[] };
  detail: {
    intro: string[];
    services: AgencyService[];
    /** O que o cliente precisa ter em maos para comecar. */
    documents: string[];
    steps: AgencyStep[];
    norms: string[];
    faq: { q: string; a: string }[];
  };
}

export const agencies: Agency[] = [
  {
    id: 'prefeitura',
    name: 'Prefeitura',
    fullName: 'Prefeitura Municipal',
    tagline: 'Aprovação, alvará, regularização e Habite-se',
    summary:
      'Aprovação de projeto, alvará de execução, regularização de construção existente, desdobro e Certificado de Conclusão.',
    image: 'orgao-prefeitura',
    icon: 'building',
    seo: {
      title: 'Aprovação de Projeto e Habite-se na Prefeitura | MDK Engenharia',
      description:
        'Aprovação de projeto na prefeitura, alvará de execução, auto de regularização, desdobro, desmembramento e unificação de IPTU, Habite-se e certificado de acessibilidade em São Paulo.',
      keywords: [
        'aprovação de projeto na prefeitura',
        'alvará de aprovação e execução',
        'auto de regularização São Paulo',
        'habite-se São Paulo',
        'certificado de conclusão',
        'desdobro de terreno',
        'desmembramento e unificação de IPTU',
        'licença para residência unifamiliar',
        'certificado de acessibilidade',
        'regularização de imóvel São Paulo',
      ],
    },
    detail: {
      intro: [
        'É na prefeitura que a obra deixa de ser intenção e vira imóvel com existência legal. Sem o alvará, construir é infração; sem o Certificado de Conclusão — o Habite-se —, o imóvel não é averbado em cartório, não financia e não vende com segurança.',
        'Conduzimos o processo do começo ao fim: levantamos o que existe, comparamos com o que está aprovado e com o que a legislação vigente permite, montamos as peças no padrão exigido e respondemos às exigências até a emissão do documento.',
      ],
      services: [
        {
          title: 'Alvará de Aprovação e Execução',
          text: 'Aprovação do projeto e autorização para construir. É a etapa que verifica recuos, taxa de ocupação, coeficiente de aproveitamento e gabarito contra a lei de zoneamento do lote.',
        },
        {
          title: 'Auto de Regularização',
          text: 'Caminho para construção já executada sem alvará ou em desacordo com o aprovado. Depende do que foi construído e do que a legislação atual admite manter — por isso começa sempre por diagnóstico, e não por promessa de prazo.',
        },
        {
          title: 'Licença para residência unifamiliar',
          text: 'Procedimento simplificado para casa isolada, com exigências e trâmite próprios, mais rápidos que os de uma edificação de porte.',
        },
        {
          title: 'Desdobro, desmembramento e unificação',
          text: 'Divisão de um lote em dois ou mais, ou junção de lotes em um só, com o consequente ajuste do cadastro de IPTU. É pré-requisito para vender parte de um terreno ou construir uma edificação sobre lotes hoje separados.',
        },
        {
          title: 'Certificado de Conclusão (Habite-se)',
          text: 'Atesta que a obra foi concluída conforme o projeto aprovado. Sem ele não há averbação em cartório, e o imóvel continua constando com a área antiga na matrícula.',
        },
        {
          title: 'Certificado de Acessibilidade',
          text: 'Projeto, diretrizes e aprovação de acessibilidade conforme a NBR 9050. Exigido para edificações de uso coletivo e condição para o funcionamento de vários tipos de estabelecimento.',
        },
      ],
      documents: [
        'Matrícula atualizada do imóvel',
        'IPTU ou espelho cadastral do lote',
        'Projeto anteriormente aprovado, se houver',
        'Documento de identificação do proprietário',
        'Levantamento do que existe hoje construído — nós fazemos, quando não houver',
      ],
      steps: [
        {
          title: 'Diagnóstico',
          text: 'Verificamos a matrícula, o cadastro e o zoneamento, e comparamos com o que está construído. É aqui que aparece se o caminho é aprovação, regularização ou adequação prévia.',
        },
        {
          title: 'Projeto e peças técnicas',
          text: 'Montagem do projeto no padrão do município, com memorial, quadro de áreas e as ARTs/RRTs correspondentes.',
        },
        {
          title: 'Protocolo',
          text: 'Abertura do processo no sistema eletrônico da prefeitura, com recolhimento de taxas e acompanhamento do andamento.',
        },
        {
          title: 'Exigências',
          text: 'Resposta técnica a cada comunicado do órgão. É a etapa que mais alonga processo quando mal conduzida — e onde a experiência com o balcão pesa mais que o projeto.',
        },
        {
          title: 'Emissão',
          text: 'Saída do alvará, do auto de regularização ou do Certificado de Conclusão, conforme o caso.',
        },
      ],
      norms: [
        'Lei 16.642/2017 — Código de Obras e Edificações do Município de São Paulo',
        'Lei 16.402/2016 — Parcelamento, Uso e Ocupação do Solo de São Paulo',
        'NBR 9050 — acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos',
        'Legislação municipal específica, quando a obra for fora da capital',
      ],
      faq: [
        {
          q: 'Dá para regularizar qualquer construção?',
          a: 'Não. Construção sobre recuo obrigatório, em área não edificável ou invadindo faixa de servidão pode não ter caminho sem demolição parcial. O diagnóstico existe justamente para identificar isso antes de um processo ser protocolado — e não depois.',
        },
        {
          q: 'Quanto tempo leva?',
          a: 'Depende muito mais do órgão e da complexidade do caso do que do projeto. Processos simples podem sair em poucos meses; casos com exigência de adequação física levam mais. Damos a estimativa depois do diagnóstico — antes disso, qualquer número seria chute.',
        },
        {
          q: 'Preciso de Habite-se para financiar o imóvel?',
          a: 'Para financiar a construção averbada, sim. O banco trabalha com a matrícula, e a área construída só entra na matrícula depois da averbação, que por sua vez depende do Certificado de Conclusão.',
        },
        {
          q: 'Reforma precisa de aprovação?',
          a: 'Se alterar área construída, número de pavimentos ou elementos estruturais, precisa. Reforma apenas de acabamento normalmente não. Vale confirmar antes de começar: regularizar depois é sempre mais caro do que aprovar antes.',
        },
      ],
    },
  },
  {
    id: 'bombeiros',
    name: 'Bombeiros',
    fullName: 'Corpo de Bombeiros',
    tagline: 'Projeto de incêndio, AVCB e CLCB',
    summary:
      'Projeto de prevenção e combate a incêndio, F.A.T., AVCB e CLCB — inclusive renovações — com acompanhamento até a vistoria.',
    image: 'orgao-bombeiros',
    icon: 'flame',
    seo: {
      title: 'AVCB, CLCB e Projeto de Incêndio no Corpo de Bombeiros | MDK Engenharia',
      description:
        'Projeto de prevenção e combate a incêndio, F.A.T., AVCB e CLCB com renovação. Classificação da edificação, protocolo no Corpo de Bombeiros e acompanhamento até a vistoria.',
      keywords: [
        'AVCB São Paulo',
        'CLCB Corpo de Bombeiros',
        'projeto de prevenção e combate a incêndio',
        'renovação de AVCB',
        'PSCIP projeto técnico',
        'F.A.T. formulário de atendimento técnico',
        'laudo de exigências bombeiros',
        'regularização no Corpo de Bombeiros',
        'vistoria do Corpo de Bombeiros',
      ],
    },
    detail: {
      intro: [
        'O Auto de Vistoria do Corpo de Bombeiros — o AVCB — é o documento que atesta que a edificação atende às medidas de segurança contra incêndio exigidas para a sua ocupação. Sem ele, o estabelecimento não obtém licença de funcionamento, e o seguro pode ser negado em caso de sinistro.',
        'O que a edificação precisa ter não é uma lista fixa: varia com a área, a altura e o uso. Por isso o trabalho começa pela classificação correta — é ela que define se o caso pede um simples CLCB ou um projeto técnico completo com hidrantes, sprinklers e reserva de incêndio.',
      ],
      services: [
        {
          title: 'Projeto de prevenção e combate a incêndio',
          text: 'Projeto técnico com as medidas de segurança exigidas pela classificação: compartimentação, saídas de emergência, iluminação e sinalização, detecção, alarme, extintores, hidrantes e chuveiros automáticos.',
        },
        {
          title: 'AVCB — Auto de Vistoria',
          text: 'Para edificações que exigem projeto técnico. Inclui protocolo, resposta a exigências, acompanhamento da vistoria e entrega do auto.',
        },
        {
          title: 'CLCB — Certificado de Licença',
          text: 'Via simplificada para edificações de menor porte e risco, sem necessidade de projeto técnico completo. A classificação define se o seu caso se enquadra.',
        },
        {
          title: 'F.A.T. — Formulário de Atendimento Técnico',
          text: 'Consulta formal ao Corpo de Bombeiros para esclarecer a aplicação de uma exigência a um caso concreto. Usado quando a edificação tem particularidade que a Instrução Técnica não resolve diretamente.',
        },
        {
          title: 'Renovações',
          text: 'O AVCB e o CLCB têm prazo de validade. A renovação exige comprovar que o sistema continua em condição de uso — e é onde aparece a manutenção que ficou para trás.',
        },
        {
          title: 'Adequação de edificação existente',
          text: 'Levantamento do que existe hoje, comparação com o exigido e plano de adequação faseado, priorizando o que é condição para a emissão.',
        },
      ],
      documents: [
        'Planta da edificação, mesmo que antiga',
        'Contrato social ou documento da atividade exercida',
        'AVCB ou CLCB anterior, no caso de renovação',
        'Área construída e altura da edificação',
        'Relação de equipamentos de combate já instalados',
      ],
      steps: [
        {
          title: 'Classificação',
          text: 'Enquadramento por ocupação, área e altura. Define o pacote de medidas de segurança aplicável e se o caminho é AVCB ou CLCB.',
        },
        {
          title: 'Projeto técnico',
          text: 'Desenho das medidas exigidas e memorial de cálculo hidráulico, quando houver rede de hidrantes ou sprinklers.',
        },
        {
          title: 'Protocolo',
          text: 'Abertura do processo no sistema do Corpo de Bombeiros e acompanhamento da análise.',
        },
        {
          title: 'Execução das medidas',
          text: 'Instalação dos sistemas conforme o projeto aprovado — feita por nós ou acompanhada tecnicamente, se o cliente já tiver instalador.',
        },
        {
          title: 'Vistoria e emissão',
          text: 'Acompanhamento da vistoria no local e entrega do AVCB ou CLCB.',
        },
      ],
      norms: [
        'Decreto Estadual 63.911/2018 — Regulamento de Segurança contra Incêndios do Estado de São Paulo',
        'Instruções Técnicas do Corpo de Bombeiros da Polícia Militar do Estado de São Paulo',
        'NBR 13714 — sistemas de hidrantes e mangotinhos',
        'NBR 10897 — sistemas de chuveiros automáticos',
        'NBR 9077 — saídas de emergência em edifícios',
        'NBR 12693 — sistemas de proteção por extintores',
        'NBR 17240 — detecção e alarme de incêndio',
      ],
      faq: [
        {
          q: 'Qual a diferença entre AVCB e CLCB?',
          a: 'O CLCB é a via simplificada, para edificações de menor porte e risco, e dispensa projeto técnico completo. O AVCB é exigido quando a classificação pede projeto técnico. A área, a altura e a ocupação definem em qual você se enquadra — não é escolha.',
        },
        {
          q: 'Meu prédio é antigo e nunca teve AVCB. Tem solução?',
          a: 'Na maioria dos casos, sim. Edificações existentes seguem regras específicas, que consideram o que é viável adequar sem descaracterizar a construção. O caminho começa por um levantamento do que existe hoje.',
        },
        {
          q: 'O AVCB vence?',
          a: 'Vence. O prazo varia com o tipo de edificação e de ocupação. A renovação não é apenas burocrática: exige demonstrar que os sistemas continuam operantes, com manutenção em dia.',
        },
        {
          q: 'Preciso de AVCB para alugar um imóvel comercial?',
          a: 'Em geral, sim — o documento costuma ser condição para a licença de funcionamento. Vale verificar antes de assinar contrato: descobrir depois que o imóvel não tem condição de obter o auto significa reformar por conta própria ou perder o ponto.',
        },
      ],
    },
  },
  {
    id: 'cetesb',
    name: 'CETESB',
    fullName: 'CETESB — Companhia Ambiental do Estado de São Paulo',
    tagline: 'Licenciamento e dispensa de licença ambiental',
    summary:
      'Dispensa de licença ambiental e licenciamento de atividades sujeitas a controle: licença prévia, de instalação e de operação.',
    image: 'orgao-cetesb',
    icon: 'leaf',
    seo: {
      title: 'Licenciamento Ambiental e Dispensa de Licença na CETESB | MDK Engenharia',
      description:
        'Dispensa de licença ambiental e licenciamento na CETESB: licença prévia, de instalação e de operação para atividades industriais e comerciais no Estado de São Paulo.',
      keywords: [
        'dispensa de licença ambiental CETESB',
        'licenciamento ambiental São Paulo',
        'licença prévia de instalação e operação',
        'CETESB licença de operação',
        'licenciamento ambiental industrial',
        'regularização ambiental empresa',
        'consulta prévia CETESB',
      ],
    },
    detail: {
      intro: [
        'Nem toda atividade precisa de licença ambiental — mas quase toda precisa provar que não precisa. A dispensa de licença é justamente esse documento: a manifestação formal da CETESB de que a atividade, do jeito e no porte em que é exercida, não está sujeita ao licenciamento.',
        'É o que costuma travar abertura de empresa e emissão de alvará de funcionamento, porque a prefeitura pede a manifestação ambiental e o empreendedor descobre a exigência já com o ponto alugado. Resolvemos os dois casos: a dispensa e, quando a atividade realmente é passível de licenciamento, o processo completo.',
      ],
      services: [
        {
          title: 'Dispensa de licença ambiental',
          text: 'Enquadramento da atividade e obtenção da manifestação formal de que ela não está sujeita ao licenciamento. É o caso da maior parte das atividades comerciais e de serviço.',
        },
        {
          title: 'Licença Prévia (LP)',
          text: 'Aprova a localização e a concepção do empreendimento, atestando viabilidade ambiental na fase de planejamento. Vem antes de qualquer obra.',
        },
        {
          title: 'Licença de Instalação (LI)',
          text: 'Autoriza a construção conforme os planos e programas ambientais aprovados na etapa anterior.',
        },
        {
          title: 'Licença de Operação (LO)',
          text: 'Autoriza o início da atividade, depois de verificadas as medidas de controle ambiental exigidas. É a licença que a fiscalização pede no dia a dia.',
        },
        {
          title: 'Renovação de licença',
          text: 'A LO tem prazo. A renovação precisa ser requerida com antecedência — perder o prazo pode significar operar irregularmente mesmo tendo sido licenciado.',
        },
        {
          title: 'Regularização ambiental',
          text: 'Para atividade que já opera sem a licença exigida. Envolve levantamento do passivo, plano de adequação e negociação do prazo com o órgão.',
        },
      ],
      documents: [
        'CNPJ e contrato social com o objeto social atualizado',
        'Descrição do processo produtivo ou da atividade exercida',
        'Endereço, área do imóvel e área construída',
        'Consumo de água e energia e destinação de efluentes',
        'Licenças ambientais anteriores, se houver',
      ],
      steps: [
        {
          title: 'Enquadramento da atividade',
          text: 'Verificamos se a atividade, no porte exercido, está sujeita a licenciamento ou é passível de dispensa. Essa definição muda todo o caminho seguinte.',
        },
        {
          title: 'Montagem do processo',
          text: 'Formulários, memorial de caracterização do empreendimento e documentação técnica no padrão do órgão.',
        },
        {
          title: 'Protocolo e análise',
          text: 'Abertura do processo na agência ambiental competente e acompanhamento até a manifestação.',
        },
        {
          title: 'Exigências e vistoria',
          text: 'Resposta técnica às exigências e acompanhamento de vistoria, quando o processo pedir.',
        },
        {
          title: 'Emissão',
          text: 'Entrega da dispensa ou da licença, com orientação sobre prazo de validade e condicionantes a cumprir.',
        },
      ],
      norms: [
        'Lei Estadual 997/1976 — controle da poluição do meio ambiente no Estado de São Paulo',
        'Decreto Estadual 8.468/1976 — regulamenta a Lei 997/1976',
        'Resolução CONAMA 237/1997 — procedimentos e critérios do licenciamento ambiental',
        'Deliberações e decisões de diretoria da CETESB aplicáveis à atividade',
      ],
      faq: [
        {
          q: 'Minha empresa é pequena. Preciso de licença ambiental?',
          a: 'Provavelmente não — mas provavelmente precisa da dispensa. A maior parte das atividades comerciais e de serviço não é passível de licenciamento, e a manifestação formal da CETESB nesse sentido é o que a prefeitura costuma exigir para liberar o funcionamento.',
        },
        {
          q: 'Quanto tempo leva a dispensa?',
          a: 'É o processo mais rápido dos três órgãos com que trabalhamos, mas o prazo depende da agência e da fila. O maior ganho de tempo está no enquadramento correto logo no início: pedir a coisa errada significa recomeçar.',
        },
        {
          q: 'Já opero sem licença. O que acontece?',
          a: 'Operar sem a licença exigida sujeita a autuação e, em casos mais graves, à interdição. A regularização é possível e o caminho começa por um levantamento honesto do que existe — quanto antes iniciado, maior a margem de negociação de prazo com o órgão.',
        },
      ],
    },
  },
];

export function getAgency(id: string): Agency | undefined {
  return agencies.find((a) => a.id === id);
}
