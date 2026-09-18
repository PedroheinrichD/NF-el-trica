import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";
import { Motion } from "@/components/motion/Motion";
import { business } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const description =
  "Instalação elétrica para obras e residências em Arujá e região: automação, wallbox, iluminação LED e quadros de distribuição. Orçamento pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: "NF Elétrica | Instalações elétricas, automação e wallbox em Arujá",
  description,
  openGraph: {
    title: "NF Elétrica | Sua obra com a elétrica resolvida",
    description,
    siteName: business.name,
    locale: "pt_BR",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

/** Marca o <html> antes da primeira pintura para o CSS esconder o que vai animar. */
const motionGate = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("has-motion")}}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: business.name,
  description,
  url: business.siteUrl,
  telephone: `+${business.whatsapp.number}`,
  sameAs: [business.instagram.url],
  areaServed: { "@type": "City", name: "Arujá" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Arujá",
    addressRegion: "SP",
    addressCountry: "BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#conteudo"
          className="fixed left-4 top-4 z-[var(--z-skip)] -translate-y-24 rounded-full bg-amber px-5 py-3 font-semibold text-on-amber focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <StickyCta />
        <Motion />
      </body>
    </html>
  );
}
