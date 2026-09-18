import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { business, nav } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line pb-28 pt-14 md:pb-10">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-4 text-muted">{business.tagline}</p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center text-muted transition-colors duration-300 hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-1">
          <a
            href={`tel:+${business.whatsapp.number}`}
            className="inline-flex min-h-11 items-center text-text transition-colors duration-300 hover:text-amber"
          >
            {business.whatsapp.display}
          </a>
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors duration-300 hover:text-text"
          >
            <InstagramLogo size={20} aria-hidden="true" />
            {business.instagram.handle}
          </a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[1320px] px-5 text-sm text-muted sm:px-8">
        © {new Date().getFullYear()} {business.name}. {business.city}.
      </p>
    </footer>
  );
}
