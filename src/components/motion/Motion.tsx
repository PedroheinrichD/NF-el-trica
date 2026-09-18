"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Sistema de movimento da página. Roda uma vez, lê os atributos data-* do HTML
 * renderizado no servidor e não renderiza nada.
 *
 *  data-hero          entrada do hero (título, subtítulo, botões, fotos)
 *  data-split         título que sobe linha a linha
 *  data-reveal        bloco que sobe e aparece
 *  data-reveal-group  filhos [data-reveal-item] entram em sequência
 *  data-img-reveal    foto que abre com clip-path
 *  data-works         galeria horizontal fixada (só desktop)
 *  data-process       barramento e disjuntores do processo
 *  data-magnetic      botão que segue o ponteiro (só mouse)
 *
 * Com prefers-reduced-motion nada aqui anima: só o estado do header e da barra fixa.
 */

const $ = <T extends HTMLElement = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const EASE = "power4.out";

/** Divide o título em linhas mascaradas. Depois da animação, chame split.revert(). */
function splitLines(el: HTMLElement) {
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
  split.masks.forEach((mask) => mask.classList.add("split-mask"));
  gsap.set(el, { autoAlpha: 1 });
  return split;
}

/** Estado da interface ligado ao scroll (não é animação, vale também com movimento reduzido). */
function initState() {
  const header = $("[data-header]");
  const cta = $("[data-sticky-cta]");
  const hero = $("[data-hero-section]");
  const contact = $("#contato");

  ScrollTrigger.create({
    start: 24,
    end: "max",
    onToggle: (self) => header?.setAttribute("data-scrolled", String(self.isActive)),
  });

  if (cta && hero && contact) {
    ScrollTrigger.create({
      trigger: hero,
      start: "bottom 30%",
      endTrigger: contact,
      end: "top 70%",
      onToggle: (self) => cta.setAttribute("data-visible", String(self.isActive)),
    });
  }
}

function initHero() {
  const hero = $("[data-hero-section]");
  if (!hero) return;

  const title = $<HTMLElement>('[data-hero="title"]');
  const sub = $('[data-hero="sub"]');
  const cta = $('[data-hero="cta"]');
  const photos = $$('[data-hero="image"]');
  const led = $("[data-led]");

  gsap.set([sub, cta, ...photos], { autoAlpha: 1 });

  const tl = gsap.timeline({ defaults: { ease: EASE } });

  // a luz abre primeiro (fotos), depois o texto entra na ordem de leitura
  tl.fromTo(
    photos,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.2,
      stagger: 0.18,
      onComplete: () => gsap.set(photos, { clearProps: "clipPath" }),
    },
    0,
  ).fromTo(
    photos.map((p) => p.querySelector("[data-photo-inner]")),
    { scale: 1.14 },
    { scale: 1, duration: 1.7, stagger: 0.18 },
    0,
  );

  if (title) {
    const split = splitLines(title);
    tl.fromTo(
      split.lines,
      { yPercent: 115 },
      { yPercent: 0, duration: 1.1, stagger: 0.1, onComplete: () => split.revert() },
      0.15,
    );
  }

  tl.fromTo(sub, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.55).fromTo(
    cta,
    { y: 18, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8 },
    0.72,
  );

  if (led) {
    tl.fromTo(led, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "expo.out" }, 0.4);
  }

  // a foto principal sobe mais devagar que a página
  const parallax = $("[data-hero-section] [data-parallax]");
  if (parallax) {
    gsap.to(parallax, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
    });
  }
}

function initReveals() {
  $$("[data-split]").forEach((el) => {
    const split = splitLines(el);
    gsap.fromTo(
      split.lines,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1,
        ease: EASE,
        stagger: 0.1,
        onComplete: () => split.revert(),
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      },
    );
  });

  $$("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 26, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE,
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    );
  });

  $$("[data-reveal-group]").forEach((group) => {
    gsap.fromTo(
      $$("[data-reveal-item]", group),
      { y: 34, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.95,
        ease: EASE,
        stagger: 0.09,
        clearProps: "transform",
        scrollTrigger: { trigger: group, start: "top 82%", once: true },
      },
    );
  });

  $$("[data-img-reveal]").forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
      .fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: EASE, clearProps: "clipPath" },
      )
      .fromTo(
        el.querySelector("[data-photo-inner]"),
        { scale: 1.1 },
        { scale: 1, duration: 1.3, ease: EASE },
        0,
      );
  });
}

/** Cada disjuntor "liga" quando a rolagem chega nele; a linha acende junto. */
function initProcess() {
  const list = $("[data-process]");
  const fill = $("[data-bus-fill]");
  if (!list) return;

  if (fill) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.6 },
      },
    );
  }

  $$("[data-step]", list).forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 62%",
      onEnter: () => step.classList.add("is-on"),
      onLeaveBack: () => step.classList.remove("is-on"),
    });
  });
}

/** Desktop: a seção fixa e o scroll vertical empurra a galeria para o lado. */
function initWorksPan(mm: gsap.MatchMedia) {
  mm.add("(min-width: 1024px)", () => {
    const section = $("[data-works]");
    const scroller = $("[data-works-scroller]");
    const track = $("[data-works-track]");
    const bar = $("[data-works-progress]");
    if (!section || !scroller || !track) return;

    gsap.set(scroller, { overflowX: "hidden" });
    const distance = () => Math.max(0, track.scrollWidth - scroller.clientWidth);

    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        // mede o pin antes dos gatilhos das seções abaixo dele (senão eles disparam cedo)
        refreshPriority: 1,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
        },
      },
    });
  });
}

function initMagnetic(cleanups: Array<() => void>) {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  $$("[data-magnetic]").forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic ?? "") || 0.18;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * strength);
      yTo((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    });
  });
}

export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    let cancelled = false;
    let started = false;
    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    const start = () => {
      if (cancelled || started) return;
      started = true;

      try {
        ctx = gsap.context(() => {
          initState();
          if (reduce) return;
          initHero();
          initReveals();
          initProcess();
        });

        if (!reduce) {
          mm = gsap.matchMedia();
          initWorksPan(mm);
          initMagnetic(cleanups);

          lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -72 } });
          lenis.on("scroll", ScrollTrigger.update);
          tick = (time: number) => lenis?.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
        }

        const onLayout = () => ScrollTrigger.refresh();
        window.addEventListener("nf:layout", onLayout);
        cleanups.push(() => window.removeEventListener("nf:layout", onLayout));

        ScrollTrigger.refresh();
      } catch (error) {
        // se algo falhar, o conteúdo precisa continuar visível
        console.error("Falha ao iniciar o movimento", error);
        document.documentElement.classList.remove("has-motion");
      }
    };

    // as linhas do título dependem da fonte final; espera no máximo 1,5s
    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 1500)),
    ]).then(start);

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      mm?.revert();
      ctx?.revert();
    };
  }, []);

  return null;
}
