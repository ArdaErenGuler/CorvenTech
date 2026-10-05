/**
 * Instagram kaydırmalı gönderisi (4 slayt, 1080x1350) → sosyal/kaydirmali/
 * Çalıştırmak için: npm run kaydirmali
 *
 * Slaytlar: 1 Neler yapıyoruz · 2 Paketlerimiz · 3 Süreç · 4 Bize ulaşın
 * Tek tema: koyu mor zemin.
 *
 * Dört slayt tek bir 4320 px genişliğindeki tuvale çizilir, sonra her slayt viewBox ile
 * kesilir; arka plandaki yörüngeler ve ışımalar slayt sınırlarından taşıp bir sonrakine
 * devam eder, kaydırırken tek parça görünür.
 * Metinler src/data/site.js'den okunur. Yazı tipi Segoe UI (Manrope yerelde kurulu değil).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company, solutions, packages, process as steps } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const W = 1080;
const H = 1350;
const N = 4;
const M = 84;
const INNER = W - M * 2;
const FONT = 'Segoe UI';

const THEMES = {
  koyu: {
    bgTop: '#1b1530',
    bgBottom: '#0d0b17',
    glowA: { color: '#8b5cf6', opacity: 0.4 },
    glowB: { color: '#6d28d9', opacity: 0.36 },
    orbit: '#a06cff',
    orbitOpacity: 1,
    heading: '#f8fafc',
    body: '#e4e2ee',
    muted: '#a39cb8',
    accent: '#7c3aed',
    accentText: '#a06cff',
    onAccent: '#ffffff',
    card: 'rgba(255,255,255,0.06)',
    cardStroke: 'rgba(255,255,255,0.16)',
    iconBox: 'rgba(124,58,237,0.18)',
    logo: [
      ['0%', '#b48cff'],
      ['100%', '#5b21b6'],
    ],
  },
};

/** 24x24 çizgi ikonlar (src/components/ui/Icon.jsx ile aynı yollar). */
const ICONS = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="0.3"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  server:
    '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="0.3"/><circle cx="6" cy="18" r="0.3"/>',
  'pen-tool':
    '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="0.3"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Kaba genişlik tahminiyle satırlara böler (resvg kendiliğinden satır kırmaz). */
function wrap(text, size, maxWidth, factor = 0.55) {
  const limit = Math.max(8, Math.floor(maxWidth / (size * factor)));
  const out = [];
  let line = '';
  for (const word of String(text).split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      out.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) out.push(line);
  return out;
}

let uid = 0;

function build(t) {
  const txt = (content, { x, y, size, weight = 600, fill = t.heading, anchor = 'start', spacing }) =>
    `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${
      spacing ? ` letter-spacing="${spacing}"` : ''
    }>${esc(content)}</text>`;

  const lines = (arr, { x, y, size, lh = 1.3, ...rest }) => ({
    svg: arr.map((l, i) => txt(l, { x, y: y + i * size * lh, size, ...rest })).join(''),
    end: y + (arr.length - 1) * size * lh,
  });

  const icon = (name, { x, y, size, color = t.accentText, stroke = 1.8 }) =>
    `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;

  const emblem = (x, y, size) => {
    const id = `e${uid++}`;
    return `<defs>
      <linearGradient id="g-${id}" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">
        ${t.logo.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}
      </linearGradient>
      <mask id="m-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#000"/>
        <circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/>
        <rect x="24" y="20.4" width="40" height="13.2" fill="#000"/>
        <path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/>
      </mask>
    </defs>
    <g transform="translate(${x} ${y}) scale(${size / 64})">
      <circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#g-${id})" stroke-width="7.6" mask="url(#m-${id})"/>
      <path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#g-${id})"/>
    </g>`;
  };

  const card = (x, y, w, h, { stroke = t.cardStroke, strokeWidth = 1.5 } = {}) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${t.card}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;

  /* ---------------------------------------------- tek parça arka plan */
  const CW = W * N;
  const background = `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${t.bgTop}"/><stop offset="100%" stop-color="${t.bgBottom}"/>
      </linearGradient>
      <radialGradient id="glowA"><stop offset="0%" stop-color="${t.glowA.color}" stop-opacity="${t.glowA.opacity}"/><stop offset="100%" stop-color="${t.glowA.color}" stop-opacity="0"/></radialGradient>
      <radialGradient id="glowB"><stop offset="0%" stop-color="${t.glowB.color}" stop-opacity="${t.glowB.opacity}"/><stop offset="100%" stop-color="${t.glowB.color}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${CW}" height="${H}" fill="url(#bg)"/>
    <ellipse cx="${W * 0.15}" cy="${H * 0.95}" rx="760" ry="560" fill="url(#glowA)"/>
    <ellipse cx="${W * 1.05}" cy="${H * 0.2}" rx="700" ry="520" fill="url(#glowB)"/>
    <ellipse cx="${W * 2.0}" cy="${H * 1.0}" rx="760" ry="560" fill="url(#glowA)"/>
    <ellipse cx="${W * 3.05}" cy="${H * 0.25}" rx="700" ry="520" fill="url(#glowB)"/>
    <ellipse cx="${W * 3.7}" cy="${H * 1.05}" rx="760" ry="560" fill="url(#glowA)"/>
    <g fill="none" stroke="${t.orbit}" stroke-width="1.6">
      ${[
        // Slayt sınırlarını kesen yörüngeler: kaydırınca bir sonrakinde devam eder.
        { cx: W * 1, cy: H * 0.86, rx: 640, ry: 190, r: -14, o: 0.16 },
        { cx: W * 2, cy: H * 0.12, rx: 620, ry: 170, r: 10, o: 0.14 },
        { cx: W * 3, cy: H * 0.9, rx: 660, ry: 200, r: -8, o: 0.16 },
        { cx: W * 1.5, cy: H * 0.5, rx: 1500, ry: 520, r: -6, o: 0.07 },
        { cx: W * 2.6, cy: H * 0.55, rx: 1600, ry: 560, r: 5, o: 0.06 },
      ]
        .map(
          (o) =>
            `<ellipse cx="${o.cx}" cy="${o.cy}" rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.r} ${o.cx} ${o.cy})" stroke-opacity="${(o.o * t.orbitOpacity).toFixed(3)}"/>`,
        )
        .join('\n      ')}
    </g>`;

  /* ---------------------------------------------- ortak çerçeve */
  const frame = (i, { swipe = true } = {}) => {
    const ox = i * W;
    const label = `${i + 1}/${N}`;
    return `${emblem(ox + M, 62, 54)}
    ${txt(company.name, { x: ox + M + 70, y: 103, size: 32, weight: 700 })}
    <rect x="${ox + W - M - 96}" y="66" width="96" height="46" rx="23" fill="${t.card}" stroke="${t.cardStroke}" stroke-width="1.5"/>
    ${txt(label, { x: ox + W - M - 48, y: 98, size: 24, weight: 700, fill: t.body, anchor: 'middle' })}
    ${txt('www.corventech.tr', { x: ox + M, y: H - 62, size: 26, weight: 700, fill: t.accentText })}
    ${
      swipe
        ? `${txt('Kaydır', { x: ox + W - M - 44, y: H - 62, size: 26, weight: 700, fill: t.muted, anchor: 'end' })}
    ${icon('arrow-right', { x: ox + W - M - 32, y: H - 86, size: 32, color: t.muted, stroke: 2.2 })}`
        : ''
    }`;
  };

  const head = (i, kicker, title, y = 296) => {
    const ox = i * W;
    return {
      svg: `${txt(kicker.toLocaleUpperCase('tr-TR'), { x: ox + M, y: 214, size: 26, weight: 700, fill: t.accentText, spacing: 5 })}
    ${txt(title, { x: ox + M, y, size: 88, weight: 800 })}`,
      end: y,
    };
  };

  const slides = [];

  /* ---------------------------------------------- 1 — Neler yapıyoruz? */
  {
    const ox = 0;
    const h = head(0, 'Hizmetlerimiz', 'Neler yapıyoruz?');
    const sub = lines(wrap('Fikirden yayına; işinizin dijital tarafını uçtan uca üstleniyoruz.', 32, INNER), {
      x: ox + M,
      y: h.end + 72,
      size: 32,
      fill: t.muted,
      lh: 1.36,
    });
    const gap = 22;
    const cw = (INNER - gap) / 2;
    const ch = 150;
    const top = sub.end + 60;
    const cards = solutions
      .map((s, k) => {
        const x = ox + M + (k % 2) * (cw + gap);
        const y = top + Math.floor(k / 2) * (ch + gap);
        const titleLines = wrap(s.title, 30, cw - 140, 0.56);
        const ty = y + ch / 2 + 11 - ((titleLines.length - 1) * 30 * 1.18) / 2;
        return `${card(x, y, cw, ch)}
      <rect x="${x + 28}" y="${y + (ch - 76) / 2}" width="76" height="76" rx="18" fill="${t.iconBox}"/>
      ${icon(s.icon, { x: x + 46, y: y + (ch - 40) / 2, size: 40 })}
      ${lines(titleLines, { x: x + 128, y: ty, size: 30, weight: 700, lh: 1.18 }).svg}`;
      })
      .join('\n    ');
    slides.push(`${frame(0)}\n    ${h.svg}\n    ${sub.svg}\n    ${cards}`);
  }

  /* ---------------------------------------------- 2 — Paketlerimiz */
  {
    const ox = W;
    const h = head(1, 'Paketler', 'Paketlerimiz');
    const gap = 22;
    const ch = 262;
    const top = h.end + 64;
    const cards = packages
      .map((p, k) => {
        const x = ox + M;
        const y = top + k * (ch + gap);
        const items = p.items.slice(0, 3);
        const badge = p.featured
          ? `<rect x="${x + INNER - 36 - 168}" y="${y + 34}" width="168" height="44" rx="22" fill="${t.accent}"/>
      ${txt('Önerilen', { x: x + INNER - 36 - 84, y: y + 64, size: 22, weight: 700, fill: t.onAccent, anchor: 'middle' })}`
          : '';
        return `${card(x, y, INNER, ch, p.featured ? { stroke: t.accent, strokeWidth: 3 } : {})}
      <rect x="${x + 36}" y="${y + 34}" width="64" height="64" rx="16" fill="${t.iconBox}"/>
      ${icon(p.icon, { x: x + 50, y: y + 48, size: 36 })}
      ${txt(p.name, { x: x + 122, y: y + 66, size: 36, weight: 800 })}
      ${txt(p.tagline, { x: x + 122, y: y + 100, size: 24, weight: 600, fill: t.muted })}
      ${badge}
      ${items
        .map(
          (item, j) => `${icon('check', { x: x + 40, y: y + 140 + j * 38, size: 26, stroke: 2.6 })}
      ${txt(item, { x: x + 80, y: y + 162 + j * 38, size: 25, weight: 600, fill: t.body })}`,
        )
        .join('\n      ')}`;
      })
      .join('\n    ');
    slides.push(`${frame(1)}\n    ${h.svg}\n    ${cards}`);
  }

  /* ---------------------------------------------- 3 — Süreç */
  {
    const ox = W * 2;
    const h = head(2, 'Süreç', 'Nasıl çalışıyoruz?');
    const top = h.end + 110;
    const step = 196;
    const cx = ox + M + 40;
    const rail = `<line x1="${cx}" y1="${top + 40}" x2="${cx}" y2="${top + step * (steps.length - 1)}" stroke="${t.accent}" stroke-opacity="0.45" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"/>`;
    const rows = steps
      .map((s, k) => {
        const y = top + k * step;
        const desc = lines(wrap(s.description, 28, INNER - 120), {
          x: ox + M + 120,
          y: y + 50,
          size: 28,
          fill: t.muted,
          lh: 1.36,
        });
        return `<circle cx="${cx}" cy="${y}" r="40" fill="${t.accent}"/>
      ${txt(String(k + 1).padStart(2, '0'), { x: cx, y: y + 11, size: 30, weight: 800, fill: t.onAccent, anchor: 'middle' })}
      ${txt(s.title, { x: ox + M + 120, y: y + 12, size: 42, weight: 800 })}
      ${desc.svg}`;
      })
      .join('\n    ');
    slides.push(`${frame(2)}\n    ${h.svg}\n    ${rail}\n    ${rows}`);
  }

  /* ---------------------------------------------- 4 — Bize ulaşın */
  {
    const ox = W * 3;
    const x = ox + M;
    const kicker = txt('İLETİŞİM', { x, y: 214, size: 26, weight: 700, fill: t.accentText, spacing: 5 });
    const big = lines(['Bize', 'ulaşın.'], { x, y: 356, size: 150, weight: 800, lh: 1.0 });
    const y1 = big.end + 120;
    const instagram = `${card(x, y1, INNER, 230, { stroke: t.accent, strokeWidth: 3 })}
    ${icon('instagram', { x: x + 40, y: y1 + 40, size: 44 })}
    ${txt("Instagram DM'den yazın", { x: x + 100, y: y1 + 74, size: 30, weight: 700, fill: t.muted })}
    ${txt(company.instagram.handle, { x: x + 40, y: y1 + 180, size: 86, weight: 800 })}`;
    const y2 = y1 + 230 + 24;
    const mail = `${card(x, y2, INNER, 190)}
    ${icon('mail', { x: x + 40, y: y2 + 38, size: 44 })}
    ${txt('E-posta', { x: x + 100, y: y2 + 72, size: 30, weight: 700, fill: t.muted })}
    ${txt(company.email, { x: x + 40, y: y2 + 150, size: 58, weight: 800 })}`;
    const y3 = y2 + 190 + 34;
    const cta = `<rect x="${x}" y="${y3}" width="${INNER}" height="96" rx="20" fill="${t.accent}"/>
    ${txt('Ücretsiz ön görüşme için hemen yazın', { x: ox + W / 2, y: y3 + 60, size: 34, weight: 700, fill: t.onAccent, anchor: 'middle' })}`;
    slides.push(`${frame(3, { swipe: false })}\n    ${kicker}\n    ${big.svg}\n    ${instagram}\n    ${mail}\n    ${cta}`);
  }

  return { CW, background, slides };
}

function render(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  })
    .render()
    .asPng();
}

const outDir = path.join(root, 'sosyal', 'kaydirmali');
fs.mkdirSync(outDir, { recursive: true });
const { background, slides } = build(THEMES.koyu);
// Her slayta yalnızca kendi içeriği eklenir: görüş alanı dışında kalan amblem maskeleri
// resvg'yi çökertiyor (geom.rs "Option::unwrap() on None").
const svgFor = (vx, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${vx} 0 ${W} ${H}">${background}\n    ${content}</svg>`;

const made = [];
for (let i = 0; i < N; i++) {
  const file = `kaydirmali-${i + 1}.png`;
  fs.writeFileSync(path.join(outDir, file), render(svgFor(i * W, slides[i]), W));
  made.push(file);
}
console.log(`sosyal/kaydirmali/ → ${made.join(', ')}`);
