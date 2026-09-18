"use client";

import { InstagramLogo, List, X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { business, nav } from "@/content/site";
import { messages } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header data-header className="site-header fixed inset-x-0 top-0 z-[var(--z-header)]">
      <div className="mx-auto flex h-[68px] max-w-[1320px] items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.95rem] font-medium text-muted transition-colors duration-300 hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* no celular a barra fixa de baixo assume este botão */}
          <div className="hidden sm:block">
            <WhatsAppButton message={messages.generic} source="header" className="min-h-11! px-5!">
              Pedir orçamento
            </WhatsAppButton>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label="Abrir menu"
            className="grid size-11 place-items-center rounded-full border border-line-strong text-text transition-colors duration-300 hover:border-amber lg:hidden"
          >
            <List size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="menu-panel fixed inset-0 z-[var(--z-menu)] flex flex-col overflow-y-auto overscroll-contain bg-ink px-5 pb-8 sm:px-8"
        >
          <div className="flex h-[68px] shrink-0 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              aria-label="Fechar menu"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-text transition-colors duration-300 hover:border-amber"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Menu principal" className="mt-10">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex min-h-16 items-center text-[2rem]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <WhatsAppButton message={messages.generic} source="menu" className="w-full">
              Pedir orçamento
            </WhatsAppButton>
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors duration-300 hover:text-text"
            >
              <InstagramLogo size={22} aria-hidden="true" />
              {business.instagram.handle}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
