/**
 * Fonte unica de verdade do site.
 *
 * Todo dado institucional da MDK vive aqui. Nenhum componente escreve telefone,
 * endereco ou razao social no corpo — todos importam deste modulo. Isso garante
 * que o NAP (Nome, Endereco, Telefone) seja identico no rodape, no JSON-LD e na
 * secao de mapa; NAP divergente entre partes da pagina prejudica o ranqueamento
 * no Google Meu Negocio.
 *
 * Itens marcados PLACEHOLDER aguardam confirmacao do cliente.
 */

export const site = {
  name: 'MDK Engenharia',
  legalName: 'MDK Engenharia e Arquitetura LTDA - ME',
  cnpj: '27.333.759/0001-42',
  tagline: 'Planejamento · Execução · Compromisso',
  /** Ano de fundacao declarado pela empresa no site anterior. */
  foundedYear: 2010,
  shortDescription:
    'Projetos de arquitetura, estrutura e instalações, execução e consultoria de obra, documentação e regularização em São Paulo e Grande São Paulo.',

  /**
   * Endereco conforme registro INPI no 941017087.
   *
   * DIVERGENCIA RESOLVIDA: o site anterior da empresa informava o numero 71,
   * mas o carimbo da prancha executiva enviada pelo cliente
   * (equipe/Drawing1-Model.pdf, projeto assinado em 11/03/2026) traz
   * "RUA CARLOS DUARTE FERREIRA, 83 - JARDIM PERI - SP". Documento tecnico
   * recente e assinado tem mais peso que a pagina antiga, e bate com o INPI —
   * entao 83 fica.
   *
   * Falta so conferir o que consta no Google Meu Negocio quando o perfil for
   * criado: NAP divergente entre site, perfil e registro derruba a busca local.
   */
  address: {
    street: 'Rua Carlos Duarte Ferreira, 83',
    district: 'Jardim Peri',
    city: 'São Paulo',
    state: 'SP',
    zip: '02650-020',
    country: 'BR',

    /**
     * Coordenadas do geocoder do OpenStreetMap para a rua (nao para o numero 83).
     * O OSM situa a via em Vila Amelia/Cachoeirinha e o Google, no Jardim Peri —
     * bairros vizinhos —, entao o ponto exato nao esta confirmado.
     *
     * Enquanto `geoConfirmed` for false, o JSON-LD sai sem `geo` e o Google
     * geocodifica pelo endereco postal, que esta completo e correto. Publicar
     * coordenada errada e pior que nao publicar nenhuma: colocaria a empresa no
     * lugar errado no mapa de resultados.
     *
     * Para confirmar: abrir o Google Maps no endereco, clicar com o botao
     * direito sobre o imovel, copiar as coordenadas e marcar geoConfirmed: true.
     */
    lat: -23.464043,
    lng: -46.6562506,
    geoConfirmed: false,
  },

  /**
   * Telefone e e-mails. A base veio de mdkengenharia.com.br/contrate-nos; o
   * numero corporativo e o e-mail da diretoria tecnica foram informados pelo
   * cliente em 11/08/2026.
   *
   * `phoneDisplay`, `phoneE164` e `whatsappE164` sao o canal PRINCIPAL: e o que
   * o rodape, o botao flutuante, os CTAs, o card do mapa e o `telephone` do
   * JSON-LD usam. Trocar aqui troca em toda parte — nenhum componente escreve
   * numero no corpo.
   *
   * O numero anterior continua atendendo e virou secundario (`phoneAlt*`).
   * Aparece so na pagina de contato: manter dois numeros com o mesmo peso
   * espalhados pelo site divide o atendimento e, para a busca local, NAP com
   * telefone ambiguo e pior que um so telefone consistente.
   */
  contact: {
    phoneDisplay: '(11) 97647-9889',
    phoneE164: '+5511976479889',
    whatsappE164: '5511976479889',
    /** Numero anterior, ainda em uso. Listado apenas em /contato. */
    phoneAltDisplay: '(11) 99347-1608',
    phoneAltE164: '+5511993471608',
    whatsappMessage:
      'Olá! Vim pelo site e gostaria de solicitar um orçamento com a MDK Engenharia.',
    email: 'contato@mdkengenharia.com.br',
    /** Caixa dedicada a pedidos de orcamento. */
    emailOrcamento: 'orcamento@mdkengenharia.com.br',
    /**
     * Caixa da diretoria tecnica — Miro Bergamo, Diretor Tecnico (team.ts).
     * O rotulo foi deduzido do cargo dele; se a caixa tiver outra finalidade,
     * corrigir o texto do canal em /contato.
     */
    emailTecnico: 'miro@mdkengenharia.com.br',
    /** Caixa usada para recrutamento. */
    emailRh: 'mdkengenharia@mdkengenharia.com.br',
    /** PLACEHOLDER: horario de atendimento real. */
    hours: 'Segunda a sexta, das 8h às 18h',
    hoursSchema: 'Mo-Fr 08:00-18:00',
  },

  /** PLACEHOLDER: perfis reais. Remover os que nao existirem. */
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
  },

  seo: {
    title: 'MDK Engenharia | Projetos, Execução e Regularização de Obras em São Paulo',
    description:
      'MDK Engenharia e Arquitetura: projetos de arquitetura, estrutura, instalações, SPCI, gases medicinais e drenagem, além de execução, consultoria e regularização de obras em São Paulo e Grande SP.',
    keywords: [
      'projeto arquitetônico São Paulo',
      'projeto estrutural São Paulo',
      'projeto hidráulico São Paulo',
      'projeto elétrico São Paulo',
      'projeto de SPCI',
      'projeto de gases medicinais',
      'projeto de drenagem',
      'projeto industrial',
      'regularização de obras',
      'aprovação de projeto prefeitura',
      'AVCB Corpo de Bombeiros',
      'licenciamento CETESB',
      'engenharia civil São Paulo',
      'construção civil São Paulo',
    ],
  },
} as const;

/** Anos de mercado, calculados a partir da fundacao — nunca escritos a mao. */
export const yearsInBusiness = new Date().getFullYear() - site.foundedYear;

/** Endereco em linha unica, usado no rodape e no card do mapa. */
export const fullAddress = `${site.address.street} — ${site.address.district}, ${site.address.city}/${site.address.state}, CEP ${site.address.zip}`;

/** Link do WhatsApp com mensagem pre-preenchida. */
export const whatsappUrl = `https://wa.me/${site.contact.whatsappE164}?text=${encodeURIComponent(
  site.contact.whatsappMessage,
)}`;

/** Consulta usada tanto no iframe do mapa quanto no botao "Como chegar". */
export const mapsQuery = encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}, ${site.address.zip}`,
);

/**
 * Embed do Google Maps sem chave de API. A Maps JavaScript API exigiria chave,
 * conta de faturamento e exporia a chave no cliente para o mesmo resultado visual.
 */
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&hl=pt-BR&z=16&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
