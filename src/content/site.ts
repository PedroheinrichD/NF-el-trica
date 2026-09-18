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
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const nav = [
  { label: "Serviços", href: "#servicos" },
  { label: "Obras", href: "#obras" },
  { label: "Processo", href: "#processo" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Dúvidas", href: "#duvidas" },
] as const;

/** Fotos esperadas em /public/obras. Se o arquivo não existir, a página mostra um fallback. */
export const photos = {
  hero: {
    src: "/obras/sala-led-linear.jpg",
    alt: "Sala integrada com perfil de LED linear embutido no forro",
  },
  heroSmall: {
    src: "/obras/eletricista-quadro.jpg",
    alt: "Eletricista da NF Elétrica organizando o quadro de distribuição",
  },
  automation: {
    src: "/obras/escada-estar.jpg",
    alt: "Estar e escada com iluminação de forro controlada por automação",
  },
  lighting: {
    src: "/obras/despensa-led.jpg",
    alt: "Despensa com fita de LED embutida sob cada prateleira de granito",
  },
  process: {
    src: "/obras/eletricista-forro.jpg",
    alt: "Eletricista da NF Elétrica instalando luminária no forro de uma obra",
  },
} as const;

export type Service = {
  id: string;
  name: string;
  description: string;
  tone: "image" | "amber" | "pattern" | "surface";
  image?: { src: string; alt: string };
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
    tone: "amber",
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

export const works = [
  {
    src: "/obras/cozinha-marmore.jpg",
    alt: "Cozinha com porcelanato claro, pendentes e LED indireto sob a bancada",
    caption: "Cozinha com LED indireto na bancada",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/obras/estar-forro-led.jpg",
    alt: "Sala de estar com moldura de LED linear no forro e escada ao fundo",
    caption: "Estar com moldura de LED no forro",
    ratio: "aspect-[4/5]",
  },
  {
    src: "/obras/fachada.jpg",
    alt: "Fachada e área externa de uma casa térrea de alto padrão",
    caption: "Fachada e área externa",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/obras/despensa-led.jpg",
    alt: "Despensa com fita de LED embutida sob cada prateleira de granito",
    caption: "Despensa com LED em cada prateleira",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/obras/sanca-led.jpg",
    alt: "Sanca de LED dourada sobre cozinha com ilha em quartzo",
    caption: "Sanca de LED e pendentes",
    ratio: "aspect-[4/3]",
  },
  {
    src: "/obras/sala-led-linear.jpg",
    alt: "Sala ampla com perfil de LED linear embutido no forro",
    caption: "Sala com perfil de LED linear",
    ratio: "aspect-[4/5]",
  },
] as const;

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
