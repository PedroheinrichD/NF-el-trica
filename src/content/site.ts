/**
 * Todo o texto e os dados da página ficam aqui.
 * Para trocar telefone, serviços, perguntas ou depoimentos, edite este arquivo.
 * As fotos ficam em /public/obras (veja o README).
 */

export const business = {
  name: "NF Elétrica",
  tagline: "Energia que conecta",
  city: "Arujá, SP",
  whatsapp: { number: "5511985285972", display: "(11) 98528-5972" },
  instagram: {
    handle: "@n.f__eletrica",
    url: "https://www.instagram.com/n.f__eletrica/",
  },
  // Domínio próprio (NEXT_PUBLIC_SITE_URL) > domínio de produção da Vercel > localhost
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Obras", href: "#obras" },
  { label: "Processo", href: "#processo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
] as const;

/** Fotos esperadas em /public/obras. Se o arquivo não existir, a página mostra um fallback. */
export type Picture = {
  src: string;
  alt: string;
  /** Ponto do recorte quando a foto é cortada (object-position), ex.: "50% 30%". */
  position?: string;
};

export const photos = {
  hero: {
    src: "/obras/cozinha-sanca-led.jpg",
    alt: "Cozinha com parede de porcelanato, três pendentes, sanca de LED quente e LED indireto sob a bancada",
    position: "50% 38%",
  },
  heroSmall: {
    src: "/obras/sala-led-linear.jpg",
    alt: "Sala ampla com moldura de LED linear branco no forro e reflexos no piso",
    position: "50% 30%",
  },
  automation: {
    src: "/obras/fachada-noturna.jpg",
    alt: "Fachada de casa à noite com spots embutidos no beiral e LED linear no forro da garagem",
    position: "50% 62%",
  },
  lighting: {
    src: "/obras/forro-perfil-led.jpg",
    alt: "Forro com perfis de LED linear embutidos formando uma moldura sobre a cozinha",
    position: "50% 45%",
  },
  wallbox: {
    src: "/obras/wallbox-cartaz.jpg",
    alt: "Cartaz da NF Elétrica sobre instalação de wallbox: um carro elétrico carregando na garagem ao lado do carregador na parede. Vantagens: carregamento mais rápido e eficiente, mais segurança, valorização do imóvel, mais economia e solução sustentável. Atendimento rápido e agendamento flexível.",
  },
  process: {
    src: "/obras/banheiro-nicho-led.jpg",
    alt: "Banheiro com nicho iluminado por LED, banheira e forro com spots embutidos",
    position: "50% 55%",
  },
} satisfies Record<string, Picture>;

export type Service = {
  id: string;
  name: string;
  description: string;
  /** image: foto de fundo · poster: arte pronta exibida inteira · pattern e surface: só texto */
  tone: "image" | "poster" | "pattern" | "surface";
  image?: Picture;
};

export const services: Service[] = [
  {
    id: "automacao",
    name: "Automação residencial",
    description:
      "Iluminação e cenas controladas pelo celular, previstas na instalação desde a obra.",
    tone: "image",
    image: photos.automation,
  },
  {
    id: "wallbox",
    name: "Wallbox",
    description: "Carregador de carro elétrico com circuito dedicado e proteção adequada.",
    tone: "poster",
    image: photos.wallbox,
  },
  {
    id: "iluminacao",
    name: "Iluminação e LED",
    description: "Perfis lineares, sancas e fitas de LED com acabamento limpo.",
    tone: "image",
    image: photos.lighting,
  },
  {
    id: "quadros",
    name: "Quadros de distribuição",
    description: "QDC organizado, identificado e dimensionado para a carga da casa.",
    tone: "surface",
  },
  {
    id: "infra-seca",
    name: "Infraestrutura seca",
    description: "Eletrodutos e caixas planejados antes de a parede fechar.",
    tone: "pattern",
  },
  {
    id: "geral",
    name: "Elétrica geral",
    description: "Reparos, ampliações e troca de instalações antigas.",
    tone: "surface",
  },
];

export type Work = Picture & {
  caption: string;
  /** Proporção do quadro, próxima à da foto original para não cortar. */
  ratio: string;
};

export const works: Work[] = [
  {
    src: "/obras/cozinha-moldura-led.jpg",
    alt: "Cozinha com moldura de LED linear no forro ao redor do pilar, armários escuros e vista para a piscina",
    caption: "Cozinha com moldura de LED linear",
    ratio: "aspect-[6/7]",
  },
  {
    src: "/obras/cozinha-led-bancada.jpg",
    alt: "Cozinha e estar em porcelanato branco com LED indireto sob a bancada refletindo no piso",
    caption: "LED indireto na bancada e no piso",
    ratio: "aspect-[3/5]",
  },
  {
    src: "/obras/fachada-noturna.jpg",
    alt: "Fachada de casa à noite com spots embutidos no beiral e LED linear no forro da garagem",
    caption: "Fachada com spots e LED linear",
    ratio: "aspect-[8/7]",
  },
  {
    src: "/obras/banheiro-nicho-led.jpg",
    alt: "Banheiro com nicho iluminado por LED, banheira e forro com spots embutidos",
    caption: "Banheiro com nicho iluminado",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/obras/forro-perfil-led.jpg",
    alt: "Forro com perfis de LED linear embutidos formando uma moldura sobre a cozinha",
    caption: "Forro com perfil de LED linear",
    ratio: "aspect-[6/7]",
  },
  {
    src: "/obras/sala-led-linear.jpg",
    alt: "Sala ampla com moldura de LED linear branco no forro e reflexos no piso",
    caption: "Sala com moldura de LED no forro",
    ratio: "aspect-[4/7]",
  },
  {
    src: "/obras/cozinha-sanca-led.jpg",
    alt: "Cozinha com parede de porcelanato, três pendentes, sanca de LED quente e LED indireto sob a bancada",
    caption: "Cozinha com sanca de LED e pendentes",
    ratio: "aspect-[3/4]",
  },
];

export const steps = [
  {
    title: "Conversa",
    text: "Você conta o que precisa pelo WhatsApp e envia fotos ou a planta do local.",
  },
  {
    title: "Visita e orçamento",
    text: "Avaliamos o local e passamos um orçamento claro, com o que está incluso.",
  },
  {
    title: "Execução",
    text: "Instalação organizada, com pouca sujeira e sem retrabalho para a equipe da obra.",
  },
  {
    title: "Teste e entrega",
    text: "Testamos circuito por circuito e deixamos o quadro identificado.",
  },
] as const;

/**
 * ATENÇÃO: os depoimentos abaixo são EXEMPLOS de layout (exemplo: true).
 * Troque pelos feedbacks reais dos clientes (os mesmos do destaque "Feedbacks"
 * do Instagram), com autorização deles, e mude para exemplo: false.
 * Depoimento inventado apresentado como real é publicidade enganosa.
 */
export const testimonials = [
  {
    quote:
      "O quadro ficou todo identificado e a obra andou sem retrabalho. Foi a parte mais tranquila da reforma.",
    name: "Renata Moura",
    role: "Moradora, Arujá",
    exemplo: true,
  },
  {
    quote: "Instalaram o wallbox em um dia e explicaram como o circuito foi protegido.",
    name: "Carlos Eduardo Pires",
    role: "Instalação de wallbox",
    exemplo: true,
  },
  {
    quote: "A iluminação ficou como o projeto de arquitetura pedia, sem fio aparente.",
    name: "Larissa Amaral",
    role: "Arquiteta",
    exemplo: true,
  },
] as const;

export const faq = [
  {
    q: "Como peço um orçamento?",
    a: "Pelo WhatsApp. Conte o tipo de serviço e envie fotos ou a planta. Se for preciso, combinamos uma visita.",
  },
  {
    q: "Vocês atendem fora de Arujá?",
    a: "Atendemos Arujá e região. Chame no WhatsApp com o endereço da obra para confirmar.",
  },
  {
    q: "Instalam wallbox de qualquer marca?",
    a: "Fazemos o circuito e a instalação do equipamento. Envie o modelo do seu carregador para avaliarmos.",
  },
  {
    q: "Posso contratar só a parte elétrica da obra?",
    a: "Sim. Entramos na infraestrutura e seguimos até o acabamento, alinhados com a equipe da obra.",
  },
  {
    q: "A automação precisa ser planejada desde o início?",
    a: "Quanto antes, melhor. A infraestrutura seca define o que dá para automatizar sem quebrar parede depois.",
  },
] as const;
