import { useEffect, useRef } from 'react';

// Camgöbeği vurgu rengi (#00B4D8) — noktalar ve bağlantı çizgileri bu tonun saydam halleriyle çizilir.
const ACCENT_RGB = '0, 180, 216';

/**
 * Hero arka planındaki "dijital bağlantı ağı": yavaşça süzülen noktalar ve yakın olanları birleştiren çizgiler.
 * Tamamen 2D ve düz renk; gölge, gradient yok. Bölüm ekrandan çıkınca durur, hareket azaltma tercihine uyar.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -1e4, y: -1e4, radius: 140 };

    let width = 0;
    let height = 0;
    let maxDistance = 125;
    let particles = [];
    let frameId = null;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = host.clientWidth;
      height = host.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 768;
      maxDistance = mobile ? 90 : 125;
      particles = Array.from({ length: mobile ? 18 : 42 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        alpha: Math.random() * 0.35 + 0.25,
      }));
    }

    function update(p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // İmleç yaklaşınca noktaları hafifçe iter.
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        p.x -= (dx / dist) * force * 1.5;
        p.y -= (dy / dist) * force * 1.5;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${(1 - dist / maxDistance) * 0.18})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${p.alpha})`;
        ctx.fill();
      }
    }

    function frame() {
      if (!visible) return;
      particles.forEach(update);
      draw();
      frameId = requestAnimationFrame(frame);
    }

    function start() {
      if (frameId === null && visible) frameId = requestAnimationFrame(frame);
    }

    function stop() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    }

    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw();
    });
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (reduceMotion) return;
        if (visible) start();
        else stop();
      },
      { threshold: 0.05 },
    );

    resize();
    // İlk kare senkron çizilir; animasyon karesi gelene kadar alan boş kalmaz.
    draw();
    if (!reduceMotion) {
      start();
      host.addEventListener('mousemove', onMouseMove, { passive: true });
      host.addEventListener('mouseleave', onMouseLeave, { passive: true });
    }
    resizeObserver.observe(host);
    visibilityObserver.observe(host);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener('mousemove', onMouseMove);
      host.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
