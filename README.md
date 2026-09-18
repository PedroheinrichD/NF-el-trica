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

As fotos não vêm no repositório. Salve os arquivos em `public/obras/` **com estes nomes** e a página passa a usá-los sozinha (sem foto, aparece um fallback escuro com a linha de LED da marca; em `npm run dev` ele mostra o nome do arquivo que falta). Depois de adicionar fotos, rode `npm run build` de novo.

| Arquivo | Onde aparece | Sugestão de foto |
| --- | --- | --- |
| `sala-led-linear.jpg` | Hero e galeria | Sala com perfil de LED linear no forro |
| `eletricista-quadro.jpg` | Hero (foto pequena) | Eletricista no quadro de distribuição |
| `escada-estar.jpg` | Card de automação | Estar com escada e forro iluminado |
| `despensa-led.jpg` | Card de iluminação e galeria | Despensa com LED nas prateleiras |
| `eletricista-forro.jpg` | Seção de processo | Eletricista instalando no forro |
| `cozinha-marmore.jpg` | Galeria | Cozinha com LED indireto |
| `estar-forro-led.jpg` | Galeria | Estar com moldura de LED |
| `fachada.jpg` | Galeria | Fachada e área externa |
| `sanca-led.jpg` | Galeria | Sanca de LED com pendentes |

Use as originais (largura mínima de 1600px). Prints do Instagram têm pouca resolução e ficam borrados nos cards grandes. Para trocar o texto alternativo ou incluir mais obras, edite `photos` e `works` em `src/content/site.ts`.

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
