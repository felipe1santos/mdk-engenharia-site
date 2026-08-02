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
  shortDescription:
    'Projetos de instalações hidráulicas e elétricas, documentação e regularização de obras em São Paulo e Grande São Paulo.',

  /** Endereco conforme registro INPI no 941017087. */
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

  contact: {
    /** PLACEHOLDER: telefone real do cliente. */
    phoneDisplay: '(11) 0000-0000',
    phoneE164: '+551100000000',
    /** PLACEHOLDER: WhatsApp real do cliente. */
    whatsappE164: '5511000000000',
    whatsappMessage:
      'Olá! Vim pelo site e gostaria de solicitar um orçamento com a MDK Engenharia.',
    /** PLACEHOLDER: e-mail comercial. O do INPI e do escritorio de marcas, nao da MDK. */
    email: 'contato@mdkengenharia.com.br',
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
    title: 'MDK Engenharia | Projetos Hidráulicos, Elétricos e Regularização em São Paulo',
    description:
      'MDK Engenharia e Arquitetura: projetos de instalações hidráulicas e elétricas, documentação e regularização de obras em São Paulo e Grande SP. Planejamento, execução e compromisso.',
    keywords: [
      'projeto hidráulico São Paulo',
      'projeto elétrico São Paulo',
      'regularização de obras',
      'documentação para projeto',
      'aprovação de projeto prefeitura',
      'engenharia civil São Paulo',
      'projeto de edificações',
      'construção civil São Paulo',
    ],
  },
} as const;

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
