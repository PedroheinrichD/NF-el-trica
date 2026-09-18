import { Photo } from "@/components/ui/Photo";
import { photos, steps } from "@/content/site";

export function Process() {
  return (
    <section id="processo" className="relative py-20 md:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 data-split className="display t-h2 max-w-[16ch]">
              Do primeiro contato à energia ligada.
            </h2>
            <Photo
              {...photos.process}
              reveal
              phY="34%"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-10 aspect-[4/3] w-full max-w-md"
            />
          </div>
        </div>

        <ol data-process className="relative lg:col-span-7">
          {/* barramento: a linha acende conforme a rolagem passa pelos disjuntores */}
          <div
            aria-hidden="true"
            className="absolute bottom-16 left-[1.375rem] top-16 w-px bg-line-strong"
          >
            <div data-bus-fill className="h-full origin-top bg-amber" />
          </div>

          {steps.map((step) => (
            <li
              key={step.title}
              data-step
              className="relative grid grid-cols-[2.75rem_1fr] gap-6 py-6 md:gap-8 md:py-8"
            >
              <span className="breaker" aria-hidden="true">
                <span className="breaker-lever" />
              </span>
              <div className="step-body pt-1">
                <h3 className="display t-h3">{step.title}</h3>
                <p className="prose-tight mt-2 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
