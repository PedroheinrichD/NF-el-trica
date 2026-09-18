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

/**
 * Posição de cada card. 6 serviços, 6 células, sem buraco.
 * Até 1279px o grid tem 2 colunas (1 no celular). Do xl em diante: automação e o
 * cartaz do wallbox ocupam 2 linhas e os outros quatro dividem a linha de baixo.
 */
const spans: Record<string, string> = {
  automacao: "sm:col-span-2 xl:col-span-8 xl:row-span-2 min-h-[22rem]",
  wallbox: "xl:col-span-4 xl:row-span-2",
  iluminacao: "xl:col-span-3",
  quadros: "xl:col-span-3",
  "infra-seca": "xl:col-span-3",
  geral: "sm:col-span-2 xl:col-span-3",
};

const tones: Record<Service["tone"], string> = {
  image: "text-text",
  poster: "border border-line bg-surface",
  pattern: "border border-line bg-surface-2",
  surface: "border border-line bg-surface",
};

const cardBase =
  "group relative isolate overflow-hidden rounded-[var(--radius-card)] transition-[scale] duration-300 ease-[var(--ease-out)] active:scale-[0.985]";

const arrowBase =
  "grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-[translate,background-color,color,border-color] duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-amber group-hover:bg-amber group-hover:text-on-amber";

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
          className="mt-12 grid gap-4 sm:grid-cols-2 xl:auto-rows-[minmax(14rem,auto)] xl:grid-cols-12"
        >
          {services.map((service) => {
            const href = waLink(messages.service(service.name));
            const key = service.id;

            // Arte pronta (cartaz): aparece inteira, sem texto por cima. A altura do
            // card vem da proporção da própria imagem, então nada é cortado.
            if (service.tone === "poster" && service.image) {
              return (
                <a
                  key={key}
                  data-reveal-item
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(cardBase, "flex flex-col", tones.poster, spans[key])}
                >
                  <Photo
                    {...service.image}
                    square
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[1089/1444] w-full"
                    innerClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  />
                  <div className="flex min-h-16 items-center justify-between gap-4 px-6 py-3">
                    <h3 className="display t-h3">{service.name}</h3>
                    <span aria-hidden="true" className={arrowBase}>
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <span className="sr-only">Pedir orçamento pelo WhatsApp (abre o WhatsApp)</span>
                </a>
              );
            }

            const ServiceIcon = icons[key];
            const onImage = service.tone === "image";

            return (
              <a
                key={key}
                data-reveal-item
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  cardBase,
                  "flex min-h-[14rem] flex-col justify-end p-6 md:p-7",
                  tones[service.tone],
                  spans[key],
                )}
              >
                {onImage && service.image && (
                  <>
                    <Photo
                      {...service.image}
                      fill
                      phY="26%"
                      sizes="(min-width: 1280px) 66vw, 100vw"
                      innerClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/55 via-45% to-transparent"
                    />
                  </>
                )}
                {service.tone === "pattern" && <div aria-hidden="true" className="conduit" />}

                {!onImage && (
                  <span
                    aria-hidden="true"
                    className="mb-auto grid size-11 place-items-center rounded-full border border-line-strong text-amber"
                  >
                    <ServiceIcon size={22} />
                  </span>
                )}

                <span aria-hidden="true" className={cn(arrowBase, "absolute right-5 top-5")}>
                  <ArrowUpRight size={20} />
                </span>

                <h3 className="display t-h3 relative">{service.name}</h3>
                <p
                  className={cn(
                    "relative mt-2 max-w-[38ch] text-[0.95rem] leading-relaxed",
                    onImage ? "text-text/80" : "text-muted",
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
