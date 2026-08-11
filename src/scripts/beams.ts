/**
 * Malha de vigas em 3D no canto da secao de disciplinas de projeto.
 *
 * Existe so na pagina /servicos, que e o destino do trafego pago. E um elemento
 * decorativo: some inteiro sem quebrar nada, e a pagina nao depende dele para
 * informar nem para converter.
 *
 * POR QUE O three ENTRA POR `import()` DINAMICO. O modulo minificado passa de
 * 150 KB comprimido. Numa pagina de campanha, onde LCP e INP saem do bolso — em
 * taxa de conversao e no indice de qualidade do anuncio —, isso nao pode entrar
 * no bundle inicial. O import so dispara quando a secao chega perto da viewport,
 * e nunca dispara nos casos abaixo.
 *
 * QUANDO NAO RODA, de proposito:
 *   - `prefers-reduced-motion`: rotacao continua e gatilho de enjoo vestibular;
 *   - ponteiro grosso ou tela estreita (celular): e onde o custo de bateria e de
 *     dados pesa mais e onde o canto da tela nem sobra para o enfeite;
 *   - `deviceMemory` baixa ou poucos nucleos: aparelho fraco engasga no canvas e
 *     a pagina inteira trava junto;
 *   - sem WebGL.
 *
 * O QUE A CENA FAZ. Uma trelica de vigas em wireframe, girando devagar. O giro e
 * a opacidade sao dirigidos pelo progresso da rolagem dentro da secao — nao por
 * um relogio —, entao o desenho "monta" conforme o visitante desce. Fora da
 * viewport o loop para: `requestAnimationFrame` so e reagendado com a secao
 * visivel, o que zera o custo no resto da pagina.
 */

/* Tipos do three sem trazer o runtime junto: `import type` some na compilacao,
   entao o modulo continua entrando so pelo `import()` dinamico la embaixo. */
import type * as Three from 'three';

/* Sem isto o arquivo seria tratado como script global, e `init` colidiria com a
   funcao de mesmo nome em reveal.ts. */
export {};

const SELECTOR = '[data-beams]';

interface Nav {
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

/** Decide se vale a pena baixar 150 KB e ligar um canvas nesta maquina. */
function shouldRun(host: HTMLElement): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (!window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return false;

  const nav = navigator as Navigator & Nav;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 4) return false;

  return !!host.isConnected;
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

async function mount(host: HTMLElement): Promise<void> {
  const THREE = await import('three');

  const scene = new THREE.Scene();

  /* Camera ortografica, e nao em perspectiva: viga vista em projecao paralela e
     como um desenho tecnico se le. Perspectiva daria ar de render de jogo. */
  const frustum = 7;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 0.1, 100);
  camera.position.set(9, 7, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearAlpha(0);
  /* Teto em 2: acima disso o ganho visual nao paga o custo de preenchimento. */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  host.appendChild(renderer.domElement);

  /* Laranja da marca, o mesmo --color-orange-500 de global.css. */
  const orange = new THREE.LineBasicMaterial({ color: 0xe85c00, transparent: true, opacity: 0.85 });
  const steel = new THREE.LineBasicMaterial({ color: 0x9fb4d6, transparent: true, opacity: 0.45 });

  const truss = new THREE.Group();

  /**
   * Uma viga = as arestas de um paralelepipedo fino. `EdgesGeometry` em cima de
   * `BoxGeometry` da o wireframe limpo do perfil; `WireframeGeometry` traria
   * tambem as diagonais de triangulacao da malha, que nao existem numa viga.
   */
  function beam(
    len: number,
    thick: number,
    material: Three.LineBasicMaterial,
  ): Three.LineSegments {
    const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(len, thick, thick));
    return new THREE.LineSegments(geo, material);
  }

  const SPAN = 9;
  const BAYS = 6;
  const step = SPAN / BAYS;
  const height = 2.4;

  // Banzos superior e inferior, nos dois planos da trelica.
  for (const z of [-1.2, 1.2]) {
    for (const y of [-height / 2, height / 2]) {
      const chord = beam(SPAN, 0.16, y > 0 ? orange : steel);
      chord.position.set(0, y, z);
      truss.add(chord);
    }
  }

  // Montantes e diagonais — o que faz a peca ler como trelica, e nao como caixa.
  for (let i = 0; i <= BAYS; i++) {
    const x = -SPAN / 2 + i * step;

    for (const z of [-1.2, 1.2]) {
      const post = beam(height, 0.12, steel);
      post.rotation.z = Math.PI / 2;
      post.position.set(x, 0, z);
      truss.add(post);

      if (i < BAYS) {
        const diagLen = Math.hypot(step, height);
        const diag = beam(diagLen, 0.09, steel);
        diag.rotation.z = (i % 2 === 0 ? 1 : -1) * Math.atan2(height, step);
        diag.position.set(x + step / 2, 0, z);
        truss.add(diag);
      }
    }

    // Travamento entre os dois planos.
    const brace = beam(2.4, 0.09, i % 2 === 0 ? orange : steel);
    brace.rotation.y = Math.PI / 2;
    brace.position.set(x, height / 2, 0);
    truss.add(brace);
  }

  scene.add(truss);

  let progress = 0;
  let visible = false;
  let frame = 0;
  let width = 0;
  let height2 = 0;

  function resize(): void {
    const rect = host.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    if (rect.width === width && rect.height === height2) return;

    width = rect.width;
    height2 = rect.height;

    const aspect = width / height2;
    camera.left = -frustum * aspect;
    camera.right = frustum * aspect;
    camera.top = frustum;
    camera.bottom = -frustum;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height2, false);
  }

  function render(): void {
    frame = 0;
    if (!visible) return;

    resize();

    /* A rolagem dirige o giro. `progress` vai de 0 a 1 enquanto a secao cruza a
       viewport, entao a trelica gira pouco mais de um quarto de volta do inicio
       ao fim — movimento que se percebe sem virar cata-vento. */
    truss.rotation.y = -0.6 + progress * 1.9;
    truss.rotation.x = 0.22 - progress * 0.35;

    /* Entra e sai por fade nas pontas, para nao aparecer cortado na borda. */
    const fade = Math.min(1, Math.min(progress, 1 - progress) * 6 + 0.15);
    orange.opacity = 0.85 * fade;
    steel.opacity = 0.45 * fade;

    renderer.render(scene, camera);
  }

  function schedule(): void {
    if (frame || !visible) return;
    frame = requestAnimationFrame(render);
  }

  function onScroll(): void {
    const section = host.closest('section') ?? host;
    const rect = section.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
    schedule();
  }

  /* O loop so existe com a secao na tela. Fora dela o observer desliga tudo e a
     pagina volta a nao pagar nada por este enfeite. */
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        onScroll();
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: '120px' },
  );
  io.observe(host);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  onScroll();
}

function init(): void {
  const host = document.querySelector<HTMLElement>(SELECTOR);
  if (!host || !shouldRun(host) || !hasWebGL()) return;

  /* Só baixa o three quando a seção está chegando. Um visitante que converte no
     primeiro botão nunca paga por este arquivo. */
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      io.disconnect();
      mount(host).catch(() => {
        /* Enfeite: se o WebGL cair ou o chunk nao carregar, a secao continua
           inteira sem ele. Nao ha o que reportar ao visitante. */
      });
    },
    { rootMargin: '400px' },
  );
  io.observe(host);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
