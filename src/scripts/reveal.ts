/**
 * Comportamentos de rolagem da home.
 *
 * Tudo com IntersectionObserver e listeners passivos, sem biblioteca. AOS ou
 * GSAP resolveriam o mesmo com dezenas de KB a mais — peso ruim num site cujo
 * produto e a posicao no Google.
 *
 * Cada bloco checa `prefersReducedMotion` e degrada para o estado final estatico.
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ *
 * Revelacao ao entrar na viewport
 * ------------------------------------------------------------------ */

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        // Uma vez revelado, nao volta: reanimar ao rolar para cima distrai.
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ *
 * Contadores da faixa de numeros
 * ------------------------------------------------------------------ */

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function animateCounter(el: HTMLElement, target: number): void {
  const duration = 1800;
  const start = performance.now();

  function frame(now: number): void {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOutCubic(progress) * target).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach((el) => {
      const value = Number(el.dataset.counter ?? 0);
      el.textContent = value.toLocaleString('pt-BR');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        animateCounter(el, Number(el.dataset.counter ?? 0));
        observer.unobserve(el);
      }
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ *
 * Navbar: fundo solido e compactacao ao rolar
 * ------------------------------------------------------------------ */

function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const bg = document.querySelector<HTMLElement>('[data-header-bg]');
  const inner = document.querySelector<HTMLElement>('[data-header-inner]');
  const fab = document.querySelector<HTMLElement>('[data-whatsapp-fab]');
  if (!header) return;

  const THRESHOLD = 60;
  let ticking = false;

  function apply(): void {
    const scrolled = window.scrollY > THRESHOLD;

    header!.classList.toggle('is-scrolled', scrolled);
    if (bg) bg.style.opacity = scrolled ? '1' : '0';
    if (inner) {
      inner.classList.toggle('py-2.5', scrolled);
      inner.classList.toggle('py-4', !scrolled);
    }
    // O botao do WhatsApp so aparece depois da primeira dobra, para nao cobrir o hero.
    if (fab) fab.classList.toggle('is-visible', window.scrollY > 400);

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    },
    { passive: true },
  );

  apply();
}

/* ------------------------------------------------------------------ *
 * Menu mobile
 * ------------------------------------------------------------------ */

function initDrawer(): void {
  const drawer = document.querySelector<HTMLElement>('[data-drawer]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  const backdrop = document.querySelector<HTMLElement>('[data-drawer-backdrop]');
  const panel = document.querySelector<HTMLElement>('[data-drawer-panel]');
  if (!drawer || !openBtn || !panel) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';

  function open(): void {
    drawer!.classList.add('is-open');
    openBtn!.setAttribute('aria-expanded', 'true');
    // Trava o scroll do fundo enquanto o drawer esta aberto.
    document.body.style.overflow = 'hidden';
    panel!.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }

  function close(): void {
    drawer!.classList.remove('is-open');
    openBtn!.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn!.focus();
  }

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  // Clicar num link do menu navega para a ancora e fecha o drawer.
  drawer.querySelectorAll('[data-drawer-link]').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (!drawer.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      close();
      return;
    }

    // Confina o foco no drawer: sem isso, Tab passearia pela pagina atras do overlay.
    if (event.key !== 'Tab') return;

    const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (items.length === 0) return;

    const first = items[0]!;
    const last = items[items.length - 1]!;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

/* ------------------------------------------------------------------ *
 * Parallax do hero
 * ------------------------------------------------------------------ */

function initParallax(): void {
  const layer = document.querySelector<HTMLElement>('[data-parallax]');
  if (!layer || prefersReducedMotion) return;

  let ticking = false;

  function apply(): void {
    const offset = Math.min(window.scrollY, window.innerHeight) * 0.28;
    layer!.style.transform = `translate3d(0, ${offset}px, 0)`;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    },
    { passive: true },
  );

  apply();
}

/* ------------------------------------------------------------------ *
 * Carrossel de depoimentos
 * ------------------------------------------------------------------ */

function initSlider(): void {
  const track = document.querySelector<HTMLElement>('[data-slider-track]');
  const prev = document.querySelector<HTMLButtonElement>('[data-slider-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-slider-next]');
  if (!track) return;

  /** Avanca um cartao por vez, medindo o item real em vez de chutar um valor fixo. */
  function step(): number {
    const first = track!.querySelector<HTMLElement>('li');
    if (!first) return track!.clientWidth;
    const gap = parseFloat(getComputedStyle(track!).columnGap || '24');
    return first.offsetWidth + gap;
  }

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  next?.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  /** Desabilita a seta quando nao ha mais para onde ir, em vez de deixar um botao morto. */
  function syncButtons(): void {
    const max = track!.scrollWidth - track!.clientWidth - 2;
    if (prev) prev.disabled = track!.scrollLeft <= 2;
    if (next) next.disabled = track!.scrollLeft >= max;
    [prev, next].forEach((btn) => {
      if (!btn) return;
      btn.classList.toggle('opacity-40', btn.disabled);
      btn.classList.toggle('cursor-not-allowed', btn.disabled);
      btn.classList.toggle('cursor-pointer', !btn.disabled);
    });
  }

  track.addEventListener('scroll', syncButtons, { passive: true });
  window.addEventListener('resize', syncButtons, { passive: true });
  syncButtons();
}

/* ------------------------------------------------------------------ */

function init(): void {
  initReveal();
  initCounters();
  initHeader();
  initDrawer();
  initParallax();
  initSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
