"use client";

import { InstagramLogo, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useId, useState } from "react";
import { buttonBase, buttonVariants } from "@/components/ui/WhatsAppButton";
import { business, services } from "@/content/site";
import { cn } from "@/lib/cn";
import { messages, waLink } from "@/lib/whatsapp";

const OTHER = "Outro serviço";
const options = [...services.map((s) => s.name), OTHER];

const fieldClass =
  "w-full rounded-[var(--radius-field)] border border-line-strong bg-ink px-4 py-3.5 text-base text-text placeholder:text-muted/80 transition-colors duration-300 focus-visible:border-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/40";

/** Monta a mensagem do WhatsApp com o que o cliente escolher. */
export function Contact() {
  const uid = useId();
  const [service, setService] = useState("");
  const [place, setPlace] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);

  const serviceName = service === OTHER ? "" : service;
  const message = messages.custom(serviceName, place, details);

  return (
    <section id="contato" className="relative pb-20 pt-4 md:pb-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="grid gap-12 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
          <div className="lg:col-span-5">
            <h2 data-split className="display t-h2">
              Conte o que você precisa.
            </h2>
            <p data-reveal className="prose-tight mt-5 text-lg text-muted">
              A resposta vem direto no seu WhatsApp.
            </p>

            <ul data-reveal className="mt-10 flex flex-col gap-1 text-lg">
              <li>
                <a
                  href={`tel:+${business.whatsapp.number}`}
                  className="inline-flex min-h-11 items-center gap-3 text-text transition-colors duration-300 hover:text-amber"
                >
                  <Phone size={22} aria-hidden="true" className="text-amber" />
                  {business.whatsapp.display}
                </a>
              </li>
              <li>
                <a
                  href={business.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-text transition-colors duration-300 hover:text-amber"
                >
                  <InstagramLogo size={22} aria-hidden="true" className="text-amber" />
                  {business.instagram.handle}
                </a>
              </li>
              <li className="inline-flex min-h-11 items-center gap-3 text-muted">
                <MapPin size={22} aria-hidden="true" className="text-amber" />
                Atendimento em {business.city} e região
              </li>
            </ul>
          </div>

          <form
            data-reveal
            noValidate
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <fieldset aria-describedby={error ? `${uid}-error` : undefined}>
              <legend className="mb-3 text-base font-semibold">Qual serviço você precisa?</legend>
              <div className="flex flex-wrap gap-2.5">
                {options.map((name) => (
                  <label key={name} className="cursor-pointer">
                    <input
                      type="radio"
                      name={`${uid}-service`}
                      value={name}
                      checked={service === name}
                      onChange={() => {
                        setService(name);
                        setError(false);
                      }}
                      className="peer sr-only"
                    />
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-5 text-[0.95rem] font-medium transition-[background-color,color,border-color] duration-300 hover:border-amber peer-checked:border-amber peer-checked:bg-amber peer-checked:text-on-amber peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-amber">
                      {name}
                    </span>
                  </label>
                ))}
              </div>
              {error && (
                <p id={`${uid}-error`} role="alert" className="mt-3 text-sm font-medium text-amber">
                  Escolha um serviço para montar a mensagem.
                </p>
              )}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor={`${uid}-place`} className="text-base font-semibold">
                  Onde é o serviço?
                </label>
                <input
                  id={`${uid}-place`}
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Bairro e cidade"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={`${uid}-details`} className="text-base font-semibold">
                  Detalhes <span className="font-normal text-muted">(opcional)</span>
                </label>
                <input
                  id={`${uid}-details`}
                  type="text"
                  placeholder="Ex.: casa em obra, 3 quartos"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted">Mensagem que será enviada</p>
              <p
                aria-live="polite"
                className="rounded-[var(--radius-field)] bg-ink px-4 py-3.5 text-[0.95rem] leading-relaxed text-text/90"
              >
                {message}
              </p>
            </div>

            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              data-source="contato"
              data-magnetic="0.14"
              onClick={(e) => {
                if (!service) {
                  e.preventDefault();
                  setError(true);
                }
              }}
              className={cn(buttonBase, buttonVariants.primary, "w-full sm:w-auto sm:self-start")}
            >
              <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
              Pedir orçamento
              <span className="sr-only"> (abre o WhatsApp)</span>
            </a>
          </form>
        </div>
      </div>
    </section>
  );
}
