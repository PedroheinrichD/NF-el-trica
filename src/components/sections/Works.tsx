import { Photo } from "@/components/ui/Photo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { works } from "@/content/site";
import { cn } from "@/lib/cn";
import { messages } from "@/lib/whatsapp";

/**
 * Galeria horizontal.
 * - Sem JS ou com movimento reduzido: rolagem horizontal nativa.
 * - Celular e tablet: rolagem horizontal com snap.
 * - Desktop com movimento: a seção fixa e a rolagem vertical empurra a galeria (ver Motion.tsx).
 */
export function Works() {
  return (
    <section id="obras" data-works className="relative py-20 lg:flex lg:min-h-[100dvh] lg:items-center lg:py-0">
      <div data-works-scroller className="w-full overflow-x-clip lg:overflow-x-auto">
        <div
          data-works-track
          className="flex flex-col gap-10 lg:w-max lg:flex-row lg:items-center lg:gap-16 lg:pl-[max(2rem,calc((100vw-1320px)/2+2rem))] lg:pr-[max(2rem,calc((100vw-1320px)/2+2rem))]"
        >
          <div className="px-5 sm:px-8 lg:w-[26rem] lg:shrink-0 lg:px-0">
            <h2 data-split className="display t-h2">
              Obras entregues.
            </h2>
            <p data-reveal className="prose-tight mt-5 text-lg text-muted">
              Iluminação, automação e infraestrutura em residências de alto padrão.
            </p>
            <div data-reveal className="mt-8">
              <WhatsAppButton message={messages.works} source="obras" variant="ghost">
                Pedir orçamento
              </WhatsAppButton>
            </div>
            <div aria-hidden="true" className="mt-10 hidden h-px w-40 bg-line-strong lg:block">
              <div data-works-progress className="h-full origin-left scale-x-0 bg-amber" />
            </div>
          </div>

          <ul
            className="flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:scroll-pl-8 sm:px-8 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {works.map((work, i) => (
              <li key={work.src} className="group w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto">
                <figure>
                  <Photo
                    src={work.src}
                    alt={work.alt}
                    phY={`${14 + (i % 4) * 8}%`}
                    sizes="(min-width: 1024px) 40vw, 76vw"
                    className={cn(work.ratio, "w-full lg:h-[54dvh] lg:w-auto")}
                    innerClassName="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  <figcaption className="mt-3 w-0 min-w-full text-sm text-muted">
                    {work.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
