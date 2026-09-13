/**
 * Profil fotoğrafı seçenekleri + karşılaştırma tablosu (Instagram'daki gibi daire kırpımıyla).
 * Çalıştırmak için: node scripts/make-avatar.mjs → sosyal/profil-secenek/
 */
import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const outDir = path.resolve('sosyal/profil-secenek');
fs.mkdirSync(outDir, { recursive: true });

const T_PATH = 'M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z';
const STEM_CUT = 'M27.1 31H40.9L39.8 64H28.2Z';

let uid = 0;
/** Amblem: düz renk ya da degrade (iki durak). */
function mark(fill, x, y, size) {
  const id = `m${uid++}`;
  const grad = Array.isArray(fill);
  const paint = grad ? `url(#g${id})` : fill;
  return `<defs>
      ${grad ? `<linearGradient id="g${id}" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="${fill[0]}"/><stop offset="100%" stop-color="${fill[1]}"/>
      </linearGradient>` : ''}
      <mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
        <rect width="64" height="64" fill="#000"/>
        <circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/>
        <rect x="24" y="20.4" width="40" height="13.2" fill="#000"/>
        <path d="${STEM_CUT}" fill="#000"/>
      </mask>
    </defs>
    <g transform="translate(${x} ${y}) scale(${size / 64})">
      <circle cx="32" cy="32" r="21.2" fill="none" stroke="${paint}" stroke-width="7.6" mask="url(#${id})"/>
      <path d="${T_PATH}" fill="${paint}"/>
    </g>`;
}

// Zeminler koyu ama tam siyah değil; amblem canlı mavi tonlarında.
const OPTIONS = [
  { id: '1-degrade-camgobegi', label: 'Degrade camgöbeği→mavi', bg: '#0d1117', fg: ['#5bd8f0', '#0077b6'], scale: 0.6 },
  { id: '2-marka-camgobegi', label: 'Marka camgöbeği (düz)', bg: '#0d1117', fg: '#00b4d8', scale: 0.6 },
  { id: '3-gok-mavisi', label: 'Açık gök mavisi', bg: '#0d1117', fg: '#38bdf8', scale: 0.6 },
  { id: '4-canli-mavi', label: 'Canlı mavi', bg: '#0f1218', fg: '#3b82f6', scale: 0.6 },
  { id: '5-degrade-mavi', label: 'Degrade açık→koyu mavi', bg: '#0d1117', fg: ['#7cc6ff', '#1d4ed8'], scale: 0.6 },
  { id: '6-tam-kadraj', label: 'Degrade, tam kadraj', bg: '#0d1117', fg: ['#5bd8f0', '#0077b6'], scale: 0.8 },
];

const S = 1080;
const render = (svg, w) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: w },
    font: { fontDirs: ['C:\\Windows\\Fonts'], loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
  })
    .render()
    .asPng();

for (const o of OPTIONS) {
  const size = S * o.scale;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
    <rect width="${S}" height="${S}" fill="${o.bg}"/>
    ${mark(o.fg, (S - size) / 2, (S - size) / 2, size)}
  </svg>`;
  fs.writeFileSync(path.join(outDir, `${o.id}.png`), render(svg, S));
}

// Karşılaştırma tablosu: 3x2, daire kırpımlı, numaralı
const T = 300;
const GAP = 34;
const PAD = 40;
const W = PAD * 2 + T * 3 + GAP * 2;
const H = PAD * 2 + (T + 54) * 2 + GAP;
const tiles = OPTIONS.map((o, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = PAD + col * (T + GAP);
  const y = PAD + row * (T + 54 + GAP);
  const size = T * o.scale;
  const clip = `c${uid++}`;
  return `<defs><clipPath id="${clip}"><circle cx="${x + T / 2}" cy="${y + T / 2}" r="${T / 2}"/></clipPath></defs>
    <g clip-path="url(#${clip})">
      <rect x="${x}" y="${y}" width="${T}" height="${T}" fill="${o.bg}"/>
      ${mark(o.fg, x + (T - size) / 2, y + (T - size) / 2, size)}
    </g>
    <circle cx="${x + T / 2}" cy="${y + T / 2}" r="${T / 2}" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
    <text x="${x + T / 2}" y="${y + T + 30}" font-family="Segoe UI" font-size="21" font-weight="700" fill="#111318" text-anchor="middle">${i + 1}</text>
    <text x="${x + T / 2}" y="${y + T + 52}" font-family="Segoe UI" font-size="17" font-weight="600" fill="#5b6472" text-anchor="middle">${o.label}</text>`;
}).join('\n');

fs.writeFileSync(
  path.join(outDir, 'karsilastirma.png'),
  render(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <rect width="${W}" height="${H}" fill="#f7f8fa"/>${tiles}</svg>`,
    W,
  ),
);
console.log('hazır:', fs.readdirSync(outDir).join(', '));
