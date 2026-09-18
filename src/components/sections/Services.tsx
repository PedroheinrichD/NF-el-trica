import {
  ArrowUpRight,
  Circuitry,
  HouseLine,
  LightbulbFilament,
  Path,
  PlugCharging,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Photo } from "@/components/ui/Photo";
import { services, type Service } from "@/content/site";
import { cn } from "@/lib/cn";
import { messages, waLink } from "@/lib/whatsapp";

const icons: Record<string, Icon> = {
  automacao: HouseLine,
  wallbox: PlugCharging,
  iluminacao: LightbulbFilament,
  quadros: Circuitry,
  "infra-seca": Path,
  geral: Wrench,
};

/** Posição de cada card no grid. 6 serviços, 6 células, sem buraco. */
const spans: Record<string, string> = {
  automacao: "sm:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[22rem]",
  wallbox: "lg:col-span-5",
  iluminacao: "lg:col-span-5",
  quadros: "lg:col-span-4",
  "infra-seca": "lg:col-span-4",
  geral: "sm:col-span-2 lg:col-span-4",
};

const tones: Record<Service["tone"], string> = {
  image: "text-text",
  amber: "bg-amber text-on-amber",
  pattern: "border border-line bg-surface-2",
  surface: "border border-line bg-surface",
};

export function Services() {
  return (
    <section id="servicos" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2 data-split className="display t-h2 max-w-[18ch]">
          Tudo o que a sua obra pede de elétrica.
        </h2>
        <p data-reveal className="prose-tight mt-5 text-lg text-muted">
          Escolha o serviço e fale direto com a gente. A mensagem já vai pronta no WhatsApp.
        </p>

        <div
          data-reveal-group
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[16rem] lg:grid-cols-12"
        >
          {services.map((service) => {
            const ServiceIcon = icons[service.id];
            const onImage = service.tone === "image";
            const onAmber = service.tone === "amber";

            return (
              <a
                key={service.id}
                data-reveal-item
                href={waLink(messages.service(service.name))}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative isolate flex min-h-[14rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-6 transition-[scale] duration-300 ease-[var(--ease-out)] active:scale-[0.985] md:p-7",
                  tones[service.tone],
                  spans[service.id],
                )}
              >
                {onImage && service.image && (
                  <>
                    <Photo
                      {...service.image}
                      fill
                      phY="26%"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      innerClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/35 to-transparent"
                    />
                  </>
                )}
                {service.tone === "pattern" && <div aria-hidden="true" className="conduit" />}

                {!onImage && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mb-auto grid size-11 place-items-center rounded-full border",
                      onAmber ? "border-on-amber/25" : "border-line-strong text-amber",
                    )}
                  >
                    <ServiceIcon size={22} />
                  </span>
                )}

                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-5 top-5 grid size-11 place-items-center rounded-full border transition-[translate,background-color,color,border-color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    onAmber
                      ? "border-on-amber/25 group-hover:bg-on-amber group-hover:text-amber"
                      : "border-line-strong group-hover:border-amber group-hover:bg-amber group-hover:text-on-amber",
                  )}
                >
                  <ArrowUpRight size={20} />
                </span>

                <h3 className="display t-h3 relative">{service.name}</h3>
                <p
                  className={cn(
                    "relative mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed",
                    onAmber ? "text-on-amber/80" : onImage ? "text-text/80" : "text-muted",
                  )}
                >
                  {service.description}
                </p>
                <span className="sr-only">Pedir orçamento pelo WhatsApp (abre o WhatsApp)</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
