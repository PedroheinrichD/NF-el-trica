# NF Elétrica: landing page

Landing page de serviços elétricos (Arujá e região) com botões que abrem o WhatsApp com a mensagem já montada.

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 + CSS global · GSAP (ScrollTrigger, SplitText) + Lenis · Phosphor Icons

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Copie `.env.example` para `.env.local` e ajuste `NEXT_PUBLIC_SITE_URL` para o domínio final (usado na prévia do link no WhatsApp).

## O que editar

| O quê | Onde |
| --- | --- |
| Telefone, Instagram, cidade, serviços, etapas, perguntas, depoimentos | `src/content/site.ts` |
| Textos das mensagens de WhatsApp | `src/lib/whatsapp.ts` |
| Cores, raios, tipografia, camadas | `src/app/globals.css` (bloco `@theme`) |

## Fotos

As fotos ficam em `public/obras/` (JPEG otimizado, cerca de 100 a 170 KB cada). Onde o arquivo não existir, a página mostra um fallback escuro com a linha de LED da marca, e em `npm run dev` ele indica o nome do arquivo que falta. Depois de trocar ou adicionar fotos, rode `npm run build` de novo. Se ao trocar uma foto pelo mesmo nome a antiga continuar aparecendo, apague a pasta `.next` (o Next guarda as imagens otimizadas em cache por algumas horas).

| Arquivo | Onde aparece |
| --- | --- |
| `cozinha-sanca-led.jpg` | Hero (foto principal) e galeria |
| `sala-led-linear.jpg` | Hero (foto pequena) e galeria |
| `fachada-noturna.jpg` | Card de automação e galeria |
| `forro-perfil-led.jpg` | Card de iluminação e galeria |
| `banheiro-nicho-led.jpg` | Seção de processo e galeria |
| `wallbox-cartaz.jpg` | Card do wallbox (só ele; a arte aparece inteira, sem corte, em proporção 1089x1444) |
| `cozinha-moldura-led.jpg` | Galeria |
| `cozinha-led-bancada.jpg` | Galeria |

Para trocar uma foto, salve a nova com o mesmo nome. Para incluir mais obras, adicione a imagem na pasta e uma entrada em `works` (ou ajuste `photos`) em `src/content/site.ts`. Cada foto tem `alt` (texto para leitores de tela), `position` (ponto do recorte, ex.: `"50% 30%"`) e, na galeria, `ratio` (proporção do quadro). Use fotos originais com pelo menos 1600px de largura; prints do Instagram ficam borrados nos cards grandes. Seria ótimo ter também uma foto de um eletricista trabalhando (por exemplo no quadro de distribuição) para a seção de processo.

## Depoimentos

Os três depoimentos que vêm no projeto são **exemplos de layout** e aparecem com a etiqueta "Exemplo de layout". Antes de publicar, troque pelos feedbacks reais dos clientes (os mesmos do destaque "Feedbacks" do Instagram), com autorização deles, e mude `exemplo` para `false`. Depoimento inventado apresentado como real é publicidade enganosa.

## Movimento

Tudo fica em `src/components/motion/Motion.tsx`, guiado por atributos `data-*` no HTML (a lista está no topo do arquivo).

- Rolagem suave (Lenis) e todas as animações respeitam `prefers-reduced-motion`. Com movimento reduzido nada anima e a galeria vira rolagem horizontal nativa.
- No desktop a seção "Obras" fixa na tela e a rolagem vertical empurra a galeria para o lado. No celular e no tablet ela é uma faixa com rolagem horizontal e snap.
- Se o JavaScript falhar, o conteúdo aparece sozinho após 5 segundos.
- Ao mexer no layout de seções abaixo da galeria, mantenha `refreshPriority: 1` no gatilho fixado, senão as animações abaixo dele disparam cedo.

## Decisões de design

- Tema escuro em toda a página, herdado do logo preto e amarelo. Um único destaque (amarelo `#f0b429`).
- Formas: botões em pílula, cards com 24px, campos com 14px.
- Tipografia: Bricolage Grotesque (títulos) e Geist (texto), via `next/font`.
- Sem cursor customizado, sem números inventados de obras ou clientes.
