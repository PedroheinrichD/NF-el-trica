import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { waLink } from "@/lib/whatsapp";

type Props = {
  message: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  magnetic?: boolean;
  /** Onde o botão está na página, útil para medir de onde vêm os contatos. */
  source?: string;
};

export const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[0.95rem] font-semibold transition-[scale,background-color,border-color,color] duration-300 ease-[var(--ease-out)] active:scale-[0.97]";

export const buttonVariants = {
  primary: "bg-amber text-on-amber hover:bg-amber-hi",
  ghost:
    "border border-line-strong text-text hover:border-amber hover:text-amber",
} as const;

/** Link para o WhatsApp com a mensagem já preenchida. */
export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className,
  magnetic,
  source,
}: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-source={source}
      {...(magnetic ? { "data-magnetic": "0.18" } : {})}
      className={cn(buttonBase, buttonVariants[variant], className)}
    >
      <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
      {children}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  );
}
