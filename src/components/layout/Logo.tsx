import { Lightning } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/content/site";

/** Marca em texto. Quando houver o arquivo do logo, troque este componente por <Image>. */
export function Logo() {
  return (
    <a href="#topo" className="group inline-flex min-h-11 items-center gap-2.5" aria-label={`${business.name}, início`}>
      <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-amber transition-colors duration-300 group-hover:border-amber">
        <Lightning size={22} weight="fill" aria-hidden="true" />
      </span>
      <span className="display text-[1.35rem] leading-none">
        NF <span className="font-medium text-muted">Elétrica</span>
      </span>
    </a>
  );
}
