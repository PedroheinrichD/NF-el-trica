import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { business, testimonials } from "@/content/site";
import { cn } from "@/lib/cn";

type Testimonial = (typeof testimonials)[number];

function Attribution({ item }: { item: Testimonial }) {
  return (
    <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span>
        <span className="block font-semibold">{item.name}</span>
        <span className="block text-sm text-muted">{item.role}</span>
      </span>
      {item.exemplo && (
        <span className="rounded-full border border-line-strong px-3 py-1 text-xs text-muted">
          Exemplo de layout
        </span>
      )}
    </figcaption>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section id="depoimentos" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2 data-split className="display t-h2 max-w-[16ch]">
          O que dizem os clientes.
        </h2>

        <div data-reveal-group className="mt-12 grid gap-4 lg:grid-cols-12">
          <figure
            data-reveal-item
            className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-surface p-7 md:p-10 lg:col-span-7"
          >
            <span aria-hidden="true" className="quote-mark text-7xl text-amber">
              “
            </span>
            <blockquote className="display mt-2 text-[1.6rem] leading-[1.2] md:text-[2rem]">
              {featured.quote}
            </blockquote>
            <Attribution item={featured} />
          </figure>

          <div className="grid gap-4 lg:col-span-5">
            {rest.map((item, i) => (
              <figure
                key={item.name}
                data-reveal-item
                className={cn(
                  "flex flex-col justify-between rounded-[var(--radius-card)] p-7",
                  i === 0 ? "bg-surface-2" : "border border-line bg-surface",
                )}
              >
                <blockquote className="text-lg leading-snug">“{item.quote}”</blockquote>
                <Attribution item={item} />
              </figure>
            ))}
          </div>
        </div>

        <a
          data-reveal
          href={business.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-amber transition-colors duration-300 hover:text-amber-hi"
        >
          Ver mais feedbacks no Instagram
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
