import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type PhotoProps = {
  /** Caminho a partir de /public, ex.: /obras/sala-led-linear.jpg */
  src: string;
  alt: string;
  sizes: string;
  /** Define proporção ou altura do quadro. */
  className?: string;
  /** Ponto do recorte da foto (object-position), ex.: "50% 30%". */
  position?: string;
  /** Preenche o pai (posição absoluta) em vez de ocupar o fluxo. */
  fill?: boolean;
  /** Sem cantos arredondados (quando o pai já recorta a foto). */
  square?: boolean;
  /** Foto acima da dobra: pré-carrega para não atrasar o LCP. */
  preload?: boolean;
  /** Camada mais alta que o quadro para o parallax do scroll. */
  parallax?: boolean;
  /** Revela o quadro com clip-path ao entrar na tela. */
  reveal?: boolean;
  /** Atributo data-hero para a animação de entrada do hero. */
  hero?: boolean;
  /** Posição vertical da linha de LED do fallback. */
  phY?: string;
  innerClassName?: string;
};

const isDev = process.env.NODE_ENV !== "production";

function fileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Mostra a foto real se o arquivo existir em /public.
 * Se não existir, mostra um fallback escuro com a linha de LED da marca,
 * para a página nunca ficar com imagem quebrada.
 */
export function Photo({
  src,
  alt,
  sizes,
  className,
  position,
  fill,
  square,
  preload,
  parallax,
  reveal,
  hero,
  phY,
  innerClassName,
}: PhotoProps) {
  const hasFile = fileExists(src);

  return (
    <div
      className={cn(
        fill ? "absolute inset-0" : "relative",
        "overflow-hidden bg-surface",
        !square && "rounded-[var(--radius-card)]",
        className,
      )}
      {...(reveal ? { "data-img-reveal": "" } : {})}
      {...(hero ? { "data-hero": "image" } : {})}
    >
      <div
        className={parallax ? "absolute inset-x-0 -top-[8%] h-[116%]" : "absolute inset-0"}
        {...(parallax ? { "data-parallax": "" } : {})}
      >
        {hasFile ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={cn("object-cover", innerClassName)}
            style={position ? { objectPosition: position } : undefined}
            data-photo-inner=""
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className={cn("ph", innerClassName)}
            style={phY ? ({ "--ph-y": phY } as CSSProperties) : undefined}
            data-photo-inner=""
          >
            {isDev && (
              <span className="absolute bottom-3 left-4 right-4 font-mono text-[11px] leading-snug text-muted">
                Foto pendente: public{src}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
