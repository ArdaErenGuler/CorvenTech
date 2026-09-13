/**
 * Instagram görsellerini üretir → sosyal/ klasörü.
 * Çalıştırmak için: npm run sosyal
 *
 * Üretilenler:
 *   profil-koyu.png / profil-acik.png / profil-camgobegi.png   1080x1080  profil fotoğrafı seçenekleri
 *   gonderi-1..7.png                                          1080x1350  tanıtım karuseli (7 kare)
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
import { company, ventures, hero } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal');
fs.mkdirSync(outDir, { recursive: true });

const C = {
  ink: '#0b0f19',
  inkSoft: '#111625',
  surface: '#161c2e',
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

/** Kaba genişlik tahminiyle satırlara böler (resvg kendiliğinden satır kırmaz). */
function wrap(text, size, maxWidth, factor = 0.53) {
  const limit = Math.max(8, Math.floor(maxWidth / (size * factor)));
  const lines = [];
  let line = '';
  for (const word of String(text).split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function txt(content, { x, y, size, weight = 600, fill = C.heading, anchor = 'start', spacing }) {
  const ls = spacing ? ` letter-spacing="${spacing}"` : '';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${ls}>${esc(content)}</text>`;
}

/** Satır dizisini alt alta yazar; son satırın taban çizgisini döndürür. */
function lines(arr, { x, y, size, weight = 600, fill = C.heading, lh = 1.3, anchor = 'start' }) {
  const svg = arr.map((line, i) => txt(line, { x, y: y + i * size * lh, size, weight, fill, anchor })).join('\n  ');
  return { svg, end: y + (arr.length - 1) * size * lh };
}

/** Amblem: halka (C) + içinden geçen T. id'ler çakışmasın diye her çağrıda benzersiz. */
let uid = 0;
function emblem({ x, y, size, fill = null, stops = LOGO_STOPS }) {
  const id = `e${uid++}`;
  const scale = size / 64;
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
    <g transform="translate(${x} ${y}) scale(${scale})">
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
};

function icon(name, { x, y, size, color = C.accent, stroke = 1.75 }) {
  const scale = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

/** Hero'daki yörüngelerin sade yansıması. */
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

function profile({ file, bg, fill, stops, ringTint }) {
  const S = 1080;
  const size = 660;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${bg}"/>
    ${ringTint ? `<circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 34}" fill="none" stroke="${ringTint}" stroke-width="3"/>` : ''}
    ${emblem({ x: (S - size) / 2, y: (S - size) / 2, size, fill, stops })}
  </svg>`;
  made.push(render(file, svg, S));
}

// Koyu: sitedeki görünümün aynısı. Açık: beyaz zemin. Camgöbeği: en uzaktan okunan seçenek.
profile({ file: 'profil-koyu.png', bg: C.ink, ringTint: 'rgba(72,202,228,0.22)' });
profile({ file: 'profil-acik.png', bg: C.light });
profile({ file: 'profil-camgobegi.png', bg: C.accent, fill: '#0b1c3a' });

/* ---------------------------------------------------------------- karusel */

const PW = 1080;
const PH = 1350;
const M = 88; // kenar boşluğu
const INNER = PW - M * 2;

/** Her karede tekrar eden üst ve alt şerit. */
function frame({ index, total, footer }) {
  const head = `${emblem({ x: M, y: 74, size: 58 })}
    ${txt(company.name, { x: M + 76, y: 118, size: 34, weight: 700 })}
    ${txt(`${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, { x: PW - M, y: 118, size: 28, weight: 600, fill: C.dim, anchor: 'end' })}
    <line x1="${M}" y1="166" x2="${PW - M}" y2="166" stroke="${C.line}" stroke-width="1.5"/>`;
  const foot = `<line x1="${M}" y1="${PH - 132}" x2="${PW - M}" y2="${PH - 132}" stroke="${C.line}" stroke-width="1.5"/>
    ${txt('www.corventech.tr', { x: M, y: PH - 74, size: 30, weight: 700, fill: C.accent })}
    ${footer ? txt(footer, { x: PW - M, y: PH - 74, size: 28, weight: 600, fill: C.dim, anchor: 'end' }) : ''}`;
  return { head, foot };
}

function post(index, total, body, footer) {
  const { head, foot } = frame({ index, total, footer });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${PW}" height="${PH}" viewBox="0 0 ${PW} ${PH}">
    <rect width="${PW}" height="${PH}" fill="${C.ink}"/>
    ${dotGrid(PW, PH)}
    ${head}
    ${body}
    ${foot}
  </svg>`;
}

const CAROUSEL = [];

// 1 — kapak
{
  const title = wrap(`${hero.title.lead} ${hero.title.highlight}`, 88, INNER);
  const head = lines(title, { x: M, y: 560, size: 88, weight: 700, lh: 1.16 });
  const sub = wrap('Kendi girişimlerini geliştiren iki yazılımcının ortak çatısı.', 38, INNER - 60);
  const subBlock = lines(sub, { x: M, y: head.end + 96, size: 38, weight: 600, fill: C.muted, lh: 1.4 });
  CAROUSEL.push(
    post(
      1,
      7,
      `${orbits(PW - 110, 430, 0.62)}
    ${txt(company.brandSub.toUpperCase(), { x: M, y: 300, size: 28, weight: 700, fill: C.accent, spacing: 6 })}
    ${head.svg}
    <line x1="${M}" y1="${head.end + 46}" x2="${M + 120}" y2="${head.end + 46}" stroke="${C.accent}" stroke-width="4"/>
    ${subBlock.svg}
    ${txt('Kaydır', { x: PW - M - 70, y: PH - 206, size: 30, weight: 700, fill: C.heading, anchor: 'end' })}
    ${icon('arrow-right', { x: PW - M - 48, y: PH - 232, size: 44, color: C.accent, stroke: 2 })}`,
      'Tanıtım',
    ),
  );
}

// 2–6 — girişimler
ventures.forEach((v, i) => {
  const nameBlock = lines(wrap(v.name, 76, INNER), { x: M, y: 525, size: 76, weight: 700, lh: 1.14 });
  const tagBlock = lines(wrap(v.tagline, 38, INNER - 40), {
    x: M,
    y: nameBlock.end + 80,
    size: 38,
    weight: 600,
    fill: C.body,
    lh: 1.42,
  });
  // Öne çıkan başlıklar: detay penceresindeki modüllerin adları.
  const divider = tagBlock.end + 62;
  const feats = v.modules
    .slice(0, 4)
    .map((m, k) => {
      const y = divider + 66 + k * 72;
      return `<circle cx="${M + 8}" cy="${y - 11}" r="6" fill="${C.accent}"/>
      ${txt(m.name, { x: M + 40, y, size: 34, weight: 600, fill: C.muted })}`;
    })
    .join('\n    ');
  const host = v.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  CAROUSEL.push(
    post(
      i + 2,
      7,
      `<rect x="${M}" y="240" width="132" height="132" rx="12" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>
      ${icon(v.icon, { x: M + 33, y: 273, size: 66, stroke: 1.6 })}
      ${txt(v.category, { x: M, y: 455, size: 30, weight: 700, fill: C.accent, spacing: 1 })}
      ${nameBlock.svg}
      ${tagBlock.svg}
      <line x1="${M}" y1="${divider}" x2="${PW - M}" y2="${divider}" stroke="${C.line}" stroke-width="1.5"/>
      ${feats}
      ${txt(host, { x: M, y: PH - 190, size: 34, weight: 700, fill: C.accentLight })}`,
      v.type === 'product' ? 'Ürün' : 'Web Sitesi',
    ),
  );
});

// 7 — kapanış
{
  const head = lines(['Bir fikriniz', 'mi var?'], { x: M, y: 420, size: 92, weight: 700, lh: 1.14 });
  const items = ['Web ve mobil uygulama', 'Kurumsal web sitesi', 'İşletme paneli ve otomasyon'];
  const list = items
    .map(
      (item, i) =>
        `${icon('check', { x: M + 2, y: 640 + i * 94, size: 40, stroke: 2.4 })}
      ${txt(item, { x: M + 68, y: 672 + i * 94, size: 40, weight: 600, fill: C.body })}`,
    )
    .join('\n    ');
  CAROUSEL.push(
    post(
      7,
      7,
      `${orbits(140, PH - 420, 0.5)}
    ${txt('İLETİŞİM', { x: M, y: 300, size: 28, weight: 700, fill: C.accent, spacing: 6 })}
    ${head.svg}
    ${list}
    <rect x="${M}" y="${PH - 420}" width="${INNER}" height="160" rx="12" fill="${C.inkSoft}" stroke="${C.line}" stroke-width="1.5"/>
    ${txt(company.email, { x: M + 44, y: PH - 358, size: 34, weight: 700 })}
    ${txt(company.instagram.handle, { x: M + 44, y: PH - 300, size: 32, weight: 600, fill: C.muted })}`,
      'Bize yazın',
    ),
  );
}

CAROUSEL.forEach((svg, i) => made.push(render(`gonderi-${i + 1}.png`, svg, PW)));

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
