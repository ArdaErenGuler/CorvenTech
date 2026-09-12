import { useEffect, useRef } from 'react';

const TAU = Math.PI * 2;

/**
 * Girişimler tek bir merkezin çevresinde: her yörünge bir ürün.
 * a/b = temel yarıçapa oranla yarı eksenler, tilt = derece, period = saniye, dir = dönüş yönü.
 */
const ORBITS = [
  { a: 0.74, b: 0.3, tilt: -24, period: 18, phase: 0.12, dir: 1, accent: true, alpha: 0.11, lineWidth: 1 },
  { a: 1.0, b: 0.46, tilt: 27, period: 24, phase: 0.58, dir: -1, accent: false, alpha: 0.09, lineWidth: 1.25 },
  { a: 1.26, b: 0.42, tilt: -62, period: 30, phase: 0.33, dir: 1, accent: true, alpha: 0.09, lineWidth: 1 },
  { a: 1.54, b: 0.66, tilt: 9, period: 36, phase: 0.84, dir: 1, accent: false, alpha: 0.08, lineWidth: 1.5 },
];

const TRAIL_LENGTH = 6; // düğümün arkasında çizilen önceki konum sayısı
const TRAIL_STEP = 0.017; // örnekler arası açı farkı (radyan)

/** Tema değişkenindeki rengi "r, g, b" dizesine çevirir; okunamazsa yedek değeri verir. */
function readRgb(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = value.startsWith('#') ? value.slice(1) : '';
  if (hex.length !== 6) return fallback;
  const int = Number.parseInt(hex, 16);
  if (Number.isNaN(int)) return fallback;
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

/**
 * Hero arka planı: eğik elips yörüngeler ve üzerlerinde dolaşan küçük düğümler.
 * Yörünge yolları yalnızca ölçü değişince, düğümler her karede çizilir.
 * Bölüm ekrandan çıkınca animasyon durur; hareket azaltma tercihinde tek kare çizilir.
 */
export default function HeroCanvas() {
  const pathsRef = useRef(null);
  const nodesRef = useRef(null);

  useEffect(() => {
    const pathsCanvas = pathsRef.current;
    const nodesCanvas = nodesRef.current;
    const host = pathsCanvas?.parentElement;
    if (!pathsCanvas || !nodesCanvas || !host) return;

    const pathsCtx = pathsCanvas.getContext('2d');
    const nodesCtx = nodesCanvas.getContext('2d');
    const accent = readRgb('--color-accent', '0, 180, 216');
    const accentLight = readRgb('--color-accent-light', '72, 202, 228');

    // Düğüm izinin yarıçapı ve rengi yalnızca sıraya bağlı: bir kez hesaplanır.
    const trail = Array.from({ length: TRAIL_LENGTH }, (_, index) => {
      const ratio = (index + 1) / (TRAIL_LENGTH + 1);
      const fade = (1 - ratio) ** 2;
      return {
        radius: 0.6 + 1.3 * (1 - ratio),
        fill: `rgba(${accentLight}, ${(0.5 * fade).toFixed(3)})`,
      };
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let geometry = [];
    let frameId = null;
    let startedAt = 0;
    let onScreen = true;

    const point = { x: 0, y: 0 };

    function positionAt(geo, phi) {
      const x = geo.a * Math.cos(phi);
      const y = geo.b * Math.sin(phi);
      point.x = centerX + x * geo.cos - y * geo.sin;
      point.y = centerY + x * geo.sin + y * geo.cos;
      return point;
    }

    function drawPaths() {
      pathsCtx.clearRect(0, 0, width, height);
      ORBITS.forEach((orbit, index) => {
        const geo = geometry[index];
        pathsCtx.beginPath();
        pathsCtx.ellipse(centerX, centerY, geo.a, geo.b, geo.rotation, 0, TAU);
        pathsCtx.lineWidth = orbit.lineWidth;
        pathsCtx.strokeStyle = orbit.accent
          ? `rgba(${accentLight}, ${orbit.alpha})`
          : `rgba(255, 255, 255, ${orbit.alpha})`;
        pathsCtx.stroke();
      });

      // Merkezdeki şirket
      pathsCtx.beginPath();
      pathsCtx.arc(centerX, centerY, 2.2, 0, TAU);
      pathsCtx.fillStyle = `rgba(${accentLight}, 0.5)`;
      pathsCtx.fill();
      pathsCtx.beginPath();
      pathsCtx.arc(centerX, centerY, 8, 0, TAU);
      pathsCtx.lineWidth = 1;
      pathsCtx.strokeStyle = `rgba(${accentLight}, 0.14)`;
      pathsCtx.stroke();
    }

    function drawNodes(seconds) {
      nodesCtx.clearRect(0, 0, width, height);
      ORBITS.forEach((orbit, index) => {
        const geo = geometry[index];
        const phi = (orbit.phase + (orbit.dir * seconds) / orbit.period) * TAU;

        for (let step = TRAIL_LENGTH; step >= 1; step--) {
          const sample = trail[step - 1];
          positionAt(geo, phi - orbit.dir * step * TRAIL_STEP);
          nodesCtx.beginPath();
          nodesCtx.arc(point.x, point.y, sample.radius, 0, TAU);
          nodesCtx.fillStyle = sample.fill;
          nodesCtx.fill();
        }

        positionAt(geo, phi);
        nodesCtx.beginPath();
        nodesCtx.arc(point.x, point.y, 2, 0, TAU);
        nodesCtx.fillStyle = `rgba(${accent}, 0.8)`;
        nodesCtx.fill();
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      if (!width || !height) return;

      for (const canvas of [pathsCanvas, nodesCanvas]) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      pathsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodesCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Merkez, yazının biraz sağında kalır.
      centerX = width * 0.58;
      centerY = height * 0.5;
      const radius = Math.max(Math.min(width, height) * 0.42, Math.max(width, height) * 0.2, 160);

      geometry = ORBITS.map((orbit) => {
        const rotation = (orbit.tilt * Math.PI) / 180;
        return {
          a: orbit.a * radius,
          b: orbit.b * radius,
          rotation,
          cos: Math.cos(rotation),
          sin: Math.sin(rotation),
        };
      });

      drawPaths();
    }

    function frame(now) {
      drawNodes((now - startedAt) / 1000);
      frameId = requestAnimationFrame(frame);
    }

    function start() {
      if (frameId !== null || reduceMotion.matches || !onScreen) return;
      startedAt = performance.now();
      frameId = requestAnimationFrame(frame);
    }

    function stop() {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    function applyMotionPreference() {
      if (reduceMotion.matches) {
        stop();
        drawNodes(0);
      } else {
        start();
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion.matches) drawNodes(0);
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) applyMotionPreference();
        else stop();
      },
      { threshold: 0.02 },
    );

    resize();
    drawNodes(0); // ilk kare senkron çizilir, alan boş kalmaz
    applyMotionPreference();
    resizeObserver.observe(host);
    visibilityObserver.observe(host);
    reduceMotion.addEventListener('change', applyMotionPreference);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reduceMotion.removeEventListener('change', applyMotionPreference);
    };
  }, []);

  return (
    <>
      <canvas ref={pathsRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <canvas ref={nodesRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
    </>
  );
}
