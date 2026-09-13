/**
 * Instagram görsellerini üretir → sosyal/ klasörü.
 * Çalıştırmak için: npm run sosyal   (ekran görüntüleri için önce: npm run ekran)
 *
 * Üretilenler:
 *   profil-koyu.png / profil-acik.png / profil-camgobegi.png   1080x1080  profil fotoğrafı seçenekleri
 *   post-01..09.png                                           1080x1350  tek tek paylaşılacak 9 gönderi
 *   hikaye-duyuru.png                                         1080x1920  açılış hikâyesi
 *   one-cikan-*.png                                           1080x1080  öne çıkanlar (highlight) kapakları
 *
 * Metinler src/data/site.js'den okunur; içerik değişirse görseller de bu komutla güncellenir.
 * Yazı tipi olarak Windows'un Segoe UI'ı kullanılır (sitedeki Manrope yerel olarak kurulu değil).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company, ventures, hero, solutions, process as steps } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal');
const shotDir = path.join(outDir, 'ekran');
fs.mkdirSync(outDir, { recursive: true });

const C = {
  ink: '#0b0f19',
  inkSoft: '#111625',
  surface: '#161c2e',
  surface2: '#1c243a',
  heading: '#f8fafc',
  body: '#e2e8f0',
  muted: '#94a3b8',
  dim: '#7b899d',
  accent: '#00b4d8',
  accentLight: '#48cae4',
  line: 'rgba(255,255,255,0.12)',
  lineStrong: 'rgba(255,255,255,0.2)',
  light: '#f8fafc',
};

const FONT = 'Segoe UI';
const LOGO_STOPS = [
  ['0%', '#142c5a'],
  ['55%', '#2b5b9c'],
  ['100%', '#4287c8'],
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** Kaba genişlik tahminiyle satırlara böler (resvg kendiliğinden satır kırmaz). */
function wrap(text, size, maxWidth, factor = 0.53) {
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

function txt(content, { x, y, size, weight = 600, fill = C.heading, anchor = 'start', spacing }) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : '';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}>${esc(content)}</text>`;
}

/** Satır dizisini alt alta yazar; son satırın taban çizgisini de döndürür. */
function lines(arr, { x, y, size, weight = 600, fill = C.heading, lh = 1.3, anchor = 'start' }) {
  const svg = arr.map((l, i) => txt(l, { x, y: y + i * size * lh, size, weight, fill, anchor })).join('\n  ');
  return { svg, end: y + (arr.length - 1) * size * lh };
}

let uid = 0;

/** Amblem: halka (C) + içinden geçen T. */
function emblem({ x, y, size, fill = null, stops = LOGO_STOPS }) {
  const id = `e${uid++}`;
  const paint = fill ?? `url(#grad-${id})`;
  const grad = fill
    ? ''
    : `<linearGradient id="grad-${id}" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">
        ${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}
      </linearGradient>`;
  return `<defs>
      ${grad}
      <mask id="mask-${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#000"/>
        <circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/>
        <rect x="24" y="20.4" width="40" height="13.2" fill="#000"/>
        <path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/>
      </mask>
    </defs>
    <g transform="translate(${x} ${y}) scale(${size / 64})">
      <circle cx="32" cy="32" r="21.2" fill="none" stroke="${paint}" stroke-width="7.6" mask="url(#mask-${id})"/>
      <path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="${paint}"/>
    </g>`;
}

/** 24x24 çizgi ikonlar (src/components/ui/Icon.jsx ile aynı yollar). */
const ICONS = {
  package:
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12M16.5 9.4 7.5 4.21"/>',
  graduation: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  flask:
    '<path d="M10 2v7.53a2 2 0 0 1-.21.9L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.07-10.12a2 2 0 0 1-.21-.9V2"/><path d="M8.5 2h7M7 16h10"/>',
  'trending-up': '<path d="m23 6-9.5 9.5-5-5L1 18M17 6h6v6"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  'git-branch': '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  users:
    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  server:
    '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'pen-tool':
    '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  rocket:
    '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
};

function icon(name, { x, y, size, color = C.accent, stroke = 1.75 }) {
  return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

/** İkon kutusu: ince kenarlıklı kare + ortasında ikon. */
function iconBox(name, { x, y, box = 132, glyph = 66 }) {
  return `<rect x="${x}" y="${y}" width="${box}" height="${box}" rx="12" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>
    ${icon(name, { x: x + (box - glyph) / 2, y: y + (box - glyph) / 2, size: glyph, stroke: 1.6 })}`;
}

function orbits(cx, cy, scale = 1, opacity = 1) {
  const rings = [
    { rx: 300, ry: 122, rotate: -24, o: 0.16 },
    { rx: 405, ry: 186, rotate: 27, o: 0.11 },
    { rx: 510, ry: 170, rotate: -62, o: 0.08 },
  ];
  return `<g transform="translate(${cx} ${cy}) scale(${scale})" fill="none" stroke="${C.accentLight}" stroke-width="${1.5 / scale}">
      ${rings.map((r) => `<ellipse rx="${r.rx}" ry="${r.ry}" transform="rotate(${r.rotate})" stroke-opacity="${(r.o * opacity).toFixed(3)}"/>`).join('\n      ')}
    </g>`;
}

/** Üstten aşağı sönümlenen nokta ızgarası (sitedeki arka planın aynısı). */
function dotGrid(w, h) {
  const id = `dots${uid++}`;
  return `<defs>
      <pattern id="${id}" width="34" height="34" patternUnits="userSpaceOnUse">
        <circle cx="1.6" cy="1.6" r="1.6" fill="${C.accentLight}" fill-opacity="0.1"/>
      </pattern>
      <linearGradient id="${id}-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
        <stop offset="70%" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <mask id="${id}-mask"><rect width="${w}" height="${h}" fill="url(#${id}-fade)"/></mask>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${id})" mask="url(#${id}-mask)"/>`;
}

/* ------------------------------------------------------- tarayıcı çerçevesi */

const SHOT_W = 1440;
const SHOT_H = 900;
// Üstten kırpma: mygenbio'nun üst şeridinde müşterinin kişisel e-postası ve telefonu var, görsele girmesin.
const SHOT_TOP = { mygen: 48 };

/**
 * Ekran görüntüsünü tarayıcı çerçevesi içinde çizer.
 * Görüntü üstten hizalanır, alttan taşan kısım kırpılır (çerez şeritleri böylece kadraj dışında kalır).
 */
function browserShot(id, { x, y, w, h, url }) {
  const file = path.join(shotDir, `${id}.png`);
  const bar = 56;
  const clip = `shot${uid++}`;
  const frame = `<rect x="${x}" y="${y}" width="${w}" height="${bar + h}" rx="14" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>
    ${[0, 1, 2].map((i) => `<circle cx="${x + 30 + i * 26}" cy="${y + bar / 2}" r="6.5" fill="rgba(255,255,255,0.18)"/>`).join('')}
    <rect x="${x + 120}" y="${y + bar / 2 - 15}" width="${Math.min(460, w - 160)}" height="30" rx="15" fill="${C.ink}"/>
    ${txt(url, { x: x + 142, y: y + bar / 2 + 8, size: 21, weight: 600, fill: C.dim })}
    <line x1="${x}" y1="${y + bar}" x2="${x + w}" y2="${y + bar}" stroke="${C.line}" stroke-width="1.5"/>`;

  if (!fs.existsSync(file)) {
    // Ekran görüntüsü yoksa boş çerçeve çizilir; "npm run ekran" hatırlatması konsola düşer.
    console.warn(`  ! ${id}.png yok — önce "npm run ekran" çalıştırın.`);
    return `${frame}<rect x="${x + 1}" y="${y + bar}" width="${w - 2}" height="${h}" fill="${C.inkSoft}"/>`;
  }

  const sy = SHOT_TOP[id] ?? 0;
  const scale = Math.max(w / SHOT_W, h / (SHOT_H - sy));
  const dw = SHOT_W * scale;
  const dx = x - (dw - w) / 2;
  const dy = y + bar - sy * scale;
  const data = fs.readFileSync(file).toString('base64');
  return `${frame}
    <defs><clipPath id="${clip}"><rect x="${x}" y="${y + bar}" width="${w}" height="${h}"/></clipPath></defs>
    <g clip-path="url(#${clip})">
      <image x="${dx}" y="${dy}" width="${dw}" height="${SHOT_H * scale}" href="data:image/png;base64,${data}"/>
    </g>`;
}

/* ---------------------------------------------------------------- çıktılar */

function render(name, svg, width) {
  const renderer = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  });
  const file = path.join(outDir, name);
  fs.writeFileSync(file, renderer.render().asPng());
  return { name, kb: Math.round(fs.statSync(file).size / 1024) };
}

const made = [];

/* ------------------------------------------------------------------ profil */

// Kullanımdaki profil fotoğrafı: koyu antrasit zemin, sol alttan sağ üste camgöbeği→mavi degrade amblem.
// Başka renk denemeleri için: node scripts/make-avatar.mjs
{
  const S = 1080;
  const size = 660;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="#0d1117"/>
    ${emblem({
      x: (S - size) / 2,
      y: (S - size) / 2,
      size,
      // Degrade sol alttan (açık) sağ üste (koyu) akar; emblem() gradyanının yönü budur.
      stops: [
        ['0%', '#5bd8f0'],
        ['100%', '#0077b6'],
      ],
    })}
  </svg>`;
  made.push(render('profil.png', svg, S));
}

/* --------------------------------------------------------------- gönderiler */

const PW = 1080;
const PH = 1350;
const M = 88;
const INNER = PW - M * 2;
const FOOT_LINE = PH - 132;

/** Her gönderide tekrar eden üst ve alt şerit. */
function shell(body, { label, footRight }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}">
    <rect width="${PW}" height="${PH}" fill="${C.ink}"/>
    ${dotGrid(PW, PH)}
    ${emblem({ x: M, y: 74, size: 58 })}
    ${txt(company.name, { x: M + 76, y: 118, size: 34, weight: 700 })}
    ${label ? txt(label, { x: PW - M, y: 118, size: 27, weight: 600, fill: C.dim, anchor: 'end' }) : ''}
    <line x1="${M}" y1="166" x2="${PW - M}" y2="166" stroke="${C.line}" stroke-width="1.5"/>
    ${body}
    <line x1="${M}" y1="${FOOT_LINE}" x2="${PW - M}" y2="${FOOT_LINE}" stroke="${C.line}" stroke-width="1.5"/>
    ${txt('www.corventech.tr', { x: M, y: PH - 74, size: 30, weight: 700, fill: C.accent })}
    ${footRight ? txt(footRight, { x: PW - M, y: PH - 74, size: 28, weight: 600, fill: C.dim, anchor: 'end' }) : ''}
  </svg>`;
}

/** Bölüm üst başlığı: küçük camgöbeği etiket + büyük başlık. */
function heading(kicker, title, { size = 68, y = 336 } = {}) {
  const block = lines(wrap(title, size, INNER), { x: M, y, size, weight: 700, lh: 1.16 });
  return {
    svg: `${txt(kicker.toUpperCase(), { x: M, y: y - 86, size: 27, weight: 700, fill: C.accent, spacing: 6 })}
    ${block.svg}`,
    end: block.end,
  };
}

const POSTS = [];

// 01 — sitenin tanıtımı
{
  const h = heading(company.brandSub, `${hero.title.lead} ${hero.title.highlight}`, { size: 62, y: 330 });
  POSTS.push({
    file: 'post-01-corventech.png',
    svg: shell(
      `${h.svg}
    ${lines(wrap('Girişimlerimiz, çözümlerimiz ve iletişim tek sayfada.', 32, INNER), { x: M, y: h.end + 74, size: 32, weight: 600, fill: C.muted, lh: 1.4 }).svg}
    ${browserShot('corventech', { x: M, y: 580, w: INNER, h: 420, url: 'www.corventech.tr' })}
    ${txt('Yeni sitemiz yayında.', { x: M, y: 1140, size: 34, weight: 700, fill: C.heading })}`,
      { label: 'Tanıtım', footRight: 'Yeni site' },
    ),
  });
}

// 02–06 — girişimler, her biri ayrı gönderi
ventures.forEach((v, i) => {
  const nameBlock = lines(wrap(v.name, 66, INNER), { x: M, y: 314, size: 66, weight: 700, lh: 1.14 });
  const tagBlock = lines(wrap(v.tagline, 34, INNER - 20), {
    x: M,
    y: nameBlock.end + 66,
    size: 34,
    weight: 600,
    fill: C.body,
    lh: 1.4,
  });
  const feats = v.modules
    .slice(0, 4)
    .map((m, k) => {
      const x = M + (k % 2) * 452;
      const y = 1096 + Math.floor(k / 2) * 62;
      return `<circle cx="${x + 7}" cy="${y - 10}" r="6" fill="${C.accent}"/>
      ${txt(m.name, { x: x + 36, y, size: 29, weight: 600, fill: C.muted })}`;
    })
    .join('\n    ');
  POSTS.push({
    file: `post-0${i + 2}-${v.id}.png`,
    svg: shell(
      `${txt(v.category, { x: M, y: 246, size: 28, weight: 700, fill: C.accent, spacing: 1 })}
    ${nameBlock.svg}
    ${tagBlock.svg}
    ${browserShot(v.id, { x: M, y: 500, w: INNER, h: 470, url: host(v.url) })}
    ${feats}`,
      { label: v.type === 'product' ? 'Ürün' : 'Web Sitesi', footRight: v.status },
    ),
  });
});

// 07 — çözümler
{
  const h = heading('Çözümlerimiz', 'Neler yapıyoruz?', { y: 300 });
  const rows = solutions
    .map((s, i) => {
      const y = 420 + i * 122;
      return `<line x1="${M}" y1="${y}" x2="${PW - M}" y2="${y}" stroke="${C.line}" stroke-width="1.5"/>
      ${icon(s.icon, { x: M + 4, y: y + 30, size: 48, stroke: 1.6 })}
      ${txt(s.title, { x: M + 82, y: y + 68, size: 40, weight: 700 })}`;
    })
    .join('\n    ');
  POSTS.push({
    file: 'post-07-cozumler.png',
    svg: shell(
      `${h.svg}
    ${rows}
    <line x1="${M}" y1="${420 + solutions.length * 122}" x2="${PW - M}" y2="${420 + solutions.length * 122}" stroke="${C.line}" stroke-width="1.5"/>`,
      { label: 'Hizmetler', footRight: 'Detaylar sitede' },
    ),
  });
}

// 08 — süreç
{
  const h = heading('Süreç', 'Nasıl çalışıyoruz?', { y: 300 });
  const rows = steps
    .map((s, i) => {
      const y = 400 + i * 200;
      const desc = lines(wrap(s.description, 28, INNER - 90), {
        x: M + 88,
        y: y + 108,
        size: 28,
        weight: 600,
        fill: C.muted,
        lh: 1.4,
      });
      return `${txt(String(i + 1).padStart(2, '0'), { x: M, y: y + 62, size: 40, weight: 700, fill: C.accent })}
      ${txt(s.title, { x: M + 88, y: y + 62, size: 42, weight: 700 })}
      ${desc.svg}`;
    })
    .join('\n    ');
  POSTS.push({ file: 'post-08-surec.png', svg: shell(`${h.svg}\n    ${rows}`, { label: 'Süreç', footRight: '4 adım' }) });
}

// 09 — müşteri çağrısı
{
  const h = heading('İletişim', 'Bir fikriniz mi var?', { size: 78, y: 340 });
  const items = ['Web ve mobil uygulama', 'Kurumsal web sitesi', 'İşletme paneli ve otomasyon'];
  const list = items
    .map(
      (item, i) =>
        `${icon('check', { x: M + 2, y: 520 + i * 92, size: 40, stroke: 2.4 })}
      ${txt(item, { x: M + 68, y: 552 + i * 92, size: 38, weight: 600, fill: C.body })}`,
    )
    .join('\n    ');
  POSTS.push({
    file: 'post-09-teklif.png',
    svg: shell(
      `${orbits(140, PH - 420, 0.5)}
    ${h.svg}
    ${lines(wrap('Ne yapmak istediğinizi yazın; ne kadar sürer, nasıl çalışır, ücretsiz konuşalım.', 32, INNER), { x: M, y: 440, size: 32, weight: 600, fill: C.muted, lh: 1.4 }).svg}
    ${list}
    <rect x="${M}" y="830" width="${INNER}" height="230" rx="12" fill="${C.inkSoft}" stroke="${C.line}" stroke-width="1.5"/>
    ${icon('mail', { x: M + 44, y: 884, size: 40 })}
    ${txt(company.email, { x: M + 106, y: 916, size: 34, weight: 700 })}
    ${icon('instagram', { x: M + 44, y: 964, size: 40 })}
    ${txt(company.instagram.handle, { x: M + 106, y: 996, size: 32, weight: 600, fill: C.muted })}
    ${txt('Bütün işlerimiz sitemizde', { x: M, y: 1136, size: 30, weight: 600, fill: C.muted })}`,
      { label: 'Teklif', footRight: 'Bize yazın' },
    ),
  });
}

for (const p of POSTS) made.push(render(p.file, p.svg, PW));

/* ---------------------------------------------------------------- hikâye */

{
  const SW = 1080;
  const SH = 1920;
  const head = lines(wrap(`${hero.title.lead} ${hero.title.highlight}`, 84, SW - M * 2), {
    x: M,
    y: 900,
    size: 84,
    weight: 700,
    lh: 1.16,
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SW}" height="${SH}" viewBox="0 0 ${SW} ${SH}">
    <rect width="${SW}" height="${SH}" fill="${C.ink}"/>
    ${dotGrid(SW, SH)}
    ${orbits(SW / 2, 520, 0.8)}
    ${emblem({ x: (SW - 220) / 2, y: 410, size: 220 })}
    ${txt(company.name, { x: SW / 2, y: 730, size: 68, weight: 700, anchor: 'middle' })}
    ${txt(company.brandSub.toUpperCase(), { x: SW / 2, y: 786, size: 26, weight: 700, fill: C.accent, spacing: 6, anchor: 'middle' })}
    ${head.svg}
    <line x1="${M}" y1="${head.end + 80}" x2="${M + 120}" y2="${head.end + 80}" stroke="${C.accent}" stroke-width="4"/>
    ${lines(wrap('Girişimlerimizi ve yaptığımız işleri sitemizde bir arada görebilirsiniz.', 38, SW - M * 2 - 80), { x: M, y: head.end + 170, size: 38, weight: 600, fill: C.muted, lh: 1.42 }).svg}
    <rect x="${M}" y="${SH - 420}" width="${SW - M * 2}" height="120" rx="12" fill="${C.accent}"/>
    ${txt('www.corventech.tr', { x: SW / 2, y: SH - 342, size: 42, weight: 700, fill: C.ink, anchor: 'middle' })}
    ${txt('Bağlantı profilimizde', { x: SW / 2, y: SH - 240, size: 30, weight: 600, fill: C.muted, anchor: 'middle' })}
  </svg>`;
  made.push(render('hikaye-duyuru.png', svg, SW));
}

/* -------------------------------------------------------- öne çıkanlar */

const HIGHLIGHTS = [
  { file: 'one-cikan-girisimler.png', icon: 'layers' },
  { file: 'one-cikan-surec.png', icon: 'git-branch' },
  { file: 'one-cikan-ekip.png', icon: 'users' },
  { file: 'one-cikan-iletisim.png', icon: 'mail' },
  { file: 'one-cikan-web.png', icon: 'globe' },
];

for (const h of HIGHLIGHTS) {
  const S = 1080;
  const size = 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${C.ink}"/>
    ${icon(h.icon, { x: (S - size) / 2, y: (S - size) / 2, size, color: C.accent, stroke: 1.4 })}
  </svg>`;
  made.push(render(h.file, svg, S));
}

/* ------------------------------------------------------------------ özet */

console.log(`sosyal/ → ${made.length} görsel`);
for (const m of made) console.log(`  ${m.name.padEnd(28)} ${m.kb} KB`);
