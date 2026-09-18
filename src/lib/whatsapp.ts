import { business } from "@/content/site";

/** Monta o link do WhatsApp com a mensagem já preenchida. */
export function waLink(message: string) {
  return `https://wa.me/${business.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Prefixo comum a todas as mensagens, para o dono saber de onde o contato veio. */
const intro = "Olá! Vim pelo site da NF Elétrica";

export const messages = {
  generic: `${intro} e gostaria de pedir um orçamento.`,
  hero: `${intro} e gostaria de pedir um orçamento.`,
  works: `${intro} e vi as obras. Quero um orçamento para o meu projeto.`,
  faq: `${intro} e tenho uma dúvida sobre o serviço.`,
  service: (serviceName: string) =>
    `${intro} e gostaria de um orçamento de ${serviceName.toLowerCase()}.`,
  /** Mensagem montada pelo formulário da seção final. serviceName vazio = "outro serviço". */
  custom: (serviceName: string, place: string, details: string) => {
    const parts = [
      serviceName
        ? `${intro} e gostaria de um orçamento de ${serviceName.toLowerCase()}.`
        : `${intro} e gostaria de pedir um orçamento.`,
    ];
    if (place.trim()) parts.push(`Local: ${place.trim()}.`);
    if (details.trim()) parts.push(details.trim());
    return parts.join(" ");
  },
};
