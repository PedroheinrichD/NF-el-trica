import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { messages } from "@/lib/whatsapp";

/** Barra de contato fixa no celular. Aparece depois do hero (ver Motion.tsx). */
export function StickyCta() {
  return (
    <div
      data-sticky-cta
      data-visible="false"
      className="sticky-cta fixed inset-x-0 bottom-0 z-[var(--z-sticky-cta)] bg-linear-to-t from-ink via-ink/90 to-transparent px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6 md:hidden"
    >
      <WhatsAppButton message={messages.generic} source="barra-fixa" className="w-full">
        Pedir orçamento
      </WhatsAppButton>
    </div>
  );
}
