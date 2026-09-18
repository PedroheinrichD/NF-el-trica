import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Photo } from "@/components/ui/Photo";
import { WhatsAppButton, buttonBase, buttonVariants } from "@/components/ui/WhatsAppButton";
import { photos } from "@/content/site";
import { messages } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section id="topo" data-hero-section className="relative">
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-[1320px] items-center gap-10 px-5 pb-12 pt-24 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <div className="lg:col-span-7">
          <h1 data-hero="title" className="display t-hero max-w-[15ch]">
            Sua obra com a <span className="text-amber">elétrica resolvida.</span>
          </h1>
          <p data-hero="sub" className="prose-tight mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
            Projeto, instalação, automação e wallbox em Arujá e região. Orçamento direto pelo
            WhatsApp, sem enrolação.
          </p>
          <div data-hero="cta" className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton message={messages.hero} source="hero" magnetic className="w-full sm:w-auto">
              Pedir orçamento
            </WhatsAppButton>
            <a href="#obras" className={`${buttonBase} ${buttonVariants.ghost} w-full sm:w-auto`}>
              Ver obras
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <Photo
            {...photos.hero}
            hero
            parallax
            preload
            phY="22%"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] lg:max-h-[calc(100dvh-10rem)] lg:w-full"
          />
          <div className="absolute -bottom-6 -left-10 hidden w-[46%] lg:block">
            <Photo
              {...photos.heroSmall}
              hero
              phY="30%"
              sizes="20vw"
              className="aspect-[4/3] w-full ring-4 ring-ink"
            />
          </div>
        </div>
      </div>

      <div
        data-led
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-linear-to-r from-transparent via-amber to-transparent"
      />
    </section>
  );
}
