"use client";

import { Plus } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { faq } from "@/content/site";
import { messages } from "@/lib/whatsapp";

/** Duas colunas independentes: abrir uma pergunta não move a coluna ao lado. */
const half = Math.ceil(faq.length / 2);
const columns = [faq.slice(0, half), faq.slice(half)];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((current) => (current === i ? null : i));
    // a altura da página muda: avisa o sistema de scroll depois da transição
    window.setTimeout(() => window.dispatchEvent(new Event("nf:layout")), 500);
  };

  return (
    <section id="duvidas" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <h2 data-split className="display t-h2 max-w-[18ch]">
          Perguntas que aparecem antes do orçamento.
        </h2>

        <div data-reveal-group className="mt-12 grid gap-x-12 lg:grid-cols-2">
          {columns.map((items, col) => (
            <div key={col} className="flex flex-col">
              {items.map((item, j) => {
                const i = col === 0 ? j : half + j;
                const isOpen = open === i;
                return (
                  <div
                    key={item.q}
                    data-reveal-item
                    data-open={isOpen}
                    className="acc border-b border-line"
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-btn-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        onClick={() => toggle(i)}
                        className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-lg font-semibold"
                      >
                        {item.q}
                        <Plus
                          size={22}
                          aria-hidden="true"
                          className="acc-icon shrink-0 text-amber transition-transform duration-300 ease-[var(--ease-out)]"
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="acc-panel"
                    >
                      <div>
                        <p className="prose-tight pb-6 pr-10 text-muted">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10">
          <WhatsAppButton message={messages.faq} source="duvidas" variant="ghost">
            Tirar dúvida
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
