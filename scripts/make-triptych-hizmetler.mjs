/**
 * CorvenTech "Neler yapıyoruz?" üçlüsü (mor tema) → sosyal/uclu/hizmetler-1.png, -2.png, -3.png, -onizleme.png
 * Çalıştırmak için: npm run hizmetler
 *
 * 1) Neler yapıyoruz? (hizmetler)  2) Paketlerimiz  3) Nasıl çalışıyoruz? + iletişim.
 * Her gönderi tek başına anlamlıdır; üçünü ızgarada birleştiren şey ortak arka plandır.
 * CorvenTech logosu ve adresi yalnızca ortadaki (2.) gönderide görünür.
 * Metinler src/data/site.js'den okunur. Yazı tipi Segoe UI.
 * Yükleme sırası: önce 3, sonra 2, en son 1 (ızgarada soldan sağa 1-2-3 görünsün).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company, solutions, packages, process as steps } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal', 'uclu');
fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;
const N = 3;
const CW = W * N;
const M = 84;
const INNER = W - M * 2;
const FONT = 'Segoe UI';

const T = {
  bgTop: '#1b1530',
  bgBottom: '#0b0914',
  head: '#f8fafc',
  body: '#e4e2ee',
  muted: '#a39cb8',
  accent: '#7c3aed',
  accentText: '#a06cff',
  card: 'rgba(255,255,255,0.07)',
  cardStroke: 'rgba(255,255,255,0.18)',
  iconFill: 'rgba(124,58,237,0.24)',
  iconStroke: 'rgba(167,139,250,0.55)',
  logo: [
    ['0%', '#b48cff'],
    ['100%', '#5b21b6'],
  ],
};

const ICONS = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="0.3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="0.3"/><circle cx="6" cy="18" r="0.3"/>',
  'pen-tool': '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="0.3"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = (c, x, y, size, fill, { weight = 600, anchor = 'start', spacing } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${spacing ? ` letter-spacing="${spacing}"` : ''}>${esc(c)}</text>`;

function wrap(text, size, maxWidth, factor = 0.53) {
  const limit = Math.max(8, Math.floor(maxWidth / (size * factor)));
  const out = [];
  let line = '';
  for (const word of String(text).split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      out.push(line);
      line = word;
    } else line = next;
  }
  if (line) out.push(line);
  return out;
}

const icon = (name, x, y, size, color = T.accentText, stroke = 1.8) =>
  `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;

const card = (x, y, w, h, { stroke = T.cardStroke, sw = 1.5, fill = T.card } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;

const fitTitle = (text, max = 120) => Math.min(max, Math.floor(INNER / (text.length * 0.56)));

/* ------------------------------------------------------------ ortak arka plan */

const background = `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${T.bgTop}"/><stop offset="100%" stop-color="${T.bgBottom}"/></linearGradient>
    <radialGradient id="ga"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.5"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/></radialGradient>
    <radialGradient id="gb"><stop offset="0%" stop-color="#6d28d9" stop-opacity="0.42"/><stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/></radialGradient>
    <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#a06cff" stop-opacity="0"/><stop offset="30%" stop-color="#a06cff" stop-opacity="0.9"/><stop offset="70%" stop-color="#c4b5fd" stop-opacity="0.9"/><stop offset="100%" stop-color="#a06cff" stop-opacity="0"/></linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#a06cff" stop-opacity="0.9"/><stop offset="100%" stop-color="#a06cff" stop-opacity="0.2"/></linearGradient>
    <filter id="glow" x="-5%" y="-100%" width="110%" height="300%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="${CW}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.5}" cy="${H * 0.95}" rx="900" ry="560" fill="url(#ga)"/>
  <ellipse cx="${W * 1.5}" cy="${H * 0.7}" rx="1400" ry="560" fill="url(#gb)"/>
  <ellipse cx="${W * 2.6}" cy="${H * 0.15}" rx="900" ry="560" fill="url(#ga)"/>
  <text x="${CW / 2}" y="930" font-family="${FONT}" font-size="560" font-weight="800" letter-spacing="-10" text-anchor="middle" fill="none" stroke="#a06cff" stroke-opacity="0.1" stroke-width="2.5">CORVENTECH</text>
  <g opacity="0.5">
    <path d="M-60 1180 C 700 560, 1500 1100, 2300 620 S 3100 380, 3320 520" fill="none" stroke="url(#arc)" stroke-width="12" opacity="0.75" filter="url(#glow)"/>
    <path d="M-60 1180 C 700 560, 1500 1100, 2300 620 S 3100 380, 3320 520" fill="none" stroke="url(#arc)" stroke-width="3"/>
  </g>
  <rect x="${M}" y="${H - 130}" width="${CW - M * 2}" height="2" fill="url(#rule)"/>`;

const emblem = (ox) => `<defs>
    <linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">${T.logo.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>
    <mask id="lm" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#000"/><circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/><rect x="24" y="20.4" width="40" height="13.2" fill="#000"/><path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/></mask>
  </defs>
  <g transform="translate(${ox + M} 62) scale(${54 / 64})"><circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#lg)" stroke-width="7.6" mask="url(#lm)"/><path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#lg)"/></g>
  ${txt(company.name, ox + M + 70, 103, 32, T.head, { weight: 700 })}`;

/** Alt bilgi: seri noktaları. Logo ve adres yalnızca ortadaki gönderide. */
function chrome(i, { left = '', right = '' } = {}) {
  const ox = i * W;
  const dots = [0, 1, 2]
    .map((d) => `<circle cx="${ox + W / 2 + (d - 1) * 28}" cy="${H - 70}" r="${d === i ? 7 : 5}" fill="${d === i ? T.accentText : 'rgba(255,255,255,0.28)'}"/>`)
    .join('');
  if (i === 1) {
    return `${emblem(ox)}
  ${txt(company.name.toLocaleLowerCase('tr-TR') === 'corventech' ? 'Yazılım & Girişim' : '', ox + M, H - 62, 24, T.accentText, { weight: 700 })}
  ${txt('www.corventech.tr', ox + W - M, H - 62, 24, T.accentText, { weight: 700, anchor: 'end' })}
  ${dots}`;
  }
  return `${left ? txt(left, ox + M, H - 62, 24, T.accentText, { weight: 700 }) : ''}
  ${right ? txt(right, ox + W - M, H - 62, 24, T.accentText, { weight: 700, anchor: 'end' }) : ''}
  ${dots}`;
}

/* -------------------------------------------- 1. gönderi: Neler yapıyoruz? */

const ox1 = 0;
const t1 = 'Neler yapıyoruz?';
const s1 = fitTitle(t1);
const sub1 = wrap('Fikirden yayına, işinizin dijital tarafını uçtan uca üstleniyoruz.', 34, INNER);
const gap = 18;
const cw = (INNER - gap) / 2;
const chh = 132;
const top1 = 610;
const panel1 = `${chrome(0, { left: 'Hizmetlerimiz' })}
  ${txt('HİZMETLERİMİZ', ox1 + M, 260, 28, T.accentText, { weight: 700, spacing: 6 })}
  ${txt(t1, ox1 + M, 260 + s1 * 0.95, s1, T.head, { weight: 800, spacing: -4 })}
  ${sub1.map((l, i) => txt(l, ox1 + M, 260 + s1 * 0.95 + 70 + i * 46, 34, T.muted)).join('\n  ')}
  ${solutions
    .map((s, k) => {
      const x = ox1 + M + (k % 2) * (cw + gap);
      const y = top1 + Math.floor(k / 2) * (chh + gap);
      const lines = wrap(s.title, 29, cw - 130, 0.56);
      const ty = y + chh / 2 + 10 - ((lines.length - 1) * 29 * 1.15) / 2;
      return `${card(x, y, cw, chh)}
  <circle cx="${x + 56}" cy="${y + chh / 2}" r="34" fill="${T.iconFill}" stroke="${T.iconStroke}" stroke-width="2"/>
  ${icon(s.icon, x + 38, y + chh / 2 - 18, 36)}
  ${lines.map((l, j) => txt(l, x + 108, ty + j * 33, 29, T.head, { weight: 800 })).join('')}`;
    })
    .join('\n  ')}`;

/* ------------------------------------------------- 2. gönderi: Paketlerimiz */

const ox2 = W;
const t2 = 'Paketlerimiz';
const s2 = fitTitle(t2);
const pch = 238;
const pgap = 18;
const top2 = 450;
const panel2 = `${chrome(1)}
  ${txt('PAKETLER', ox2 + M, 260, 28, T.accentText, { weight: 700, spacing: 6 })}
  ${txt(t2, ox2 + M, 260 + s2 * 0.95, s2, T.head, { weight: 800, spacing: -4 })}
  ${packages
    .map((p, k) => {
      const x = ox2 + M;
      const y = top2 + k * (pch + pgap);
      const badge = p.featured
        ? `<rect x="${x + INNER - 30 - 160}" y="${y + 26}" width="160" height="42" rx="21" fill="${T.accent}"/>
  ${txt('Önerilen', x + INNER - 30 - 80, y + 55, 22, '#ffffff', { weight: 800, anchor: 'middle' })}`
        : '';
      return `${card(x, y, INNER, pch, p.featured ? { stroke: T.accent, sw: 3 } : {})}
  <circle cx="${x + 62}" cy="${y + 56}" r="32" fill="${T.iconFill}" stroke="${T.iconStroke}" stroke-width="2"/>
  ${icon(p.icon, x + 44, y + 38, 36)}
  ${txt(p.name, x + 112, y + 54, 34, T.head, { weight: 800 })}
  ${txt(p.tagline, x + 112, y + 86, 23, T.muted)}
  ${badge}
  ${p.items
    .slice(0, 3)
    .map(
      (it, j) => `${icon('check', x + 36, y + 118 + j * 36, 24, T.accentText, 2.6)}
  ${txt(it, x + 76, y + 138 + j * 36, 24, T.body)}`,
    )
    .join('\n  ')}`;
    })
    .join('\n  ')}`;

/* ---------------------------------------- 3. gönderi: Süreç ve iletişim */

const ox3 = W * 2;
const t3 = 'Nasıl çalışıyoruz?';
const s3 = fitTitle(t3);
const stepH = 128;
const top3 = 470;
const cxn = ox3 + M + 36;
const panel3 = `${chrome(2, { left: 'Süreç', right: 'Bize ulaşın' })}
  ${txt('SÜREÇ', ox3 + M, 260, 28, T.accentText, { weight: 700, spacing: 6 })}
  ${txt(t3, ox3 + M, 260 + s3 * 0.95, s3, T.head, { weight: 800, spacing: -4 })}
  <line x1="${cxn}" y1="${top3 + 36}" x2="${cxn}" y2="${top3 + stepH * (steps.length - 1)}" stroke="${T.accent}" stroke-opacity="0.5" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"/>
  ${steps
    .map((st, k) => {
      const y = top3 + k * stepH;
      const d = wrap(st.description, 24, INNER - 120).slice(0, 2);
      return `<circle cx="${cxn}" cy="${y}" r="36" fill="${T.accent}"/>
  ${txt(String(k + 1).padStart(2, '0'), cxn, y + 10, 26, '#ffffff', { weight: 800, anchor: 'middle' })}
  ${txt(st.title, ox3 + M + 100, y + 4, 36, T.head, { weight: 800 })}
  ${d.map((l, j) => txt(l, ox3 + M + 100, y + 38 + j * 28, 24, T.muted)).join('\n  ')}`;
    })
    .join('\n  ')}
  ${card(ox3 + M, 1000, INNER, 190, { stroke: T.accent, sw: 3 })}
  ${txt('Bize ulaşın', ox3 + M + 36, 1050, 24, T.accentText, { weight: 700, spacing: 3 })}
  ${txt(company.instagram.handle, ox3 + M + 36, 1116, 62, T.head, { weight: 800, spacing: -1 })}
  ${txt(`DM ya da ${company.email}`, ox3 + M + 36, 1160, 28, T.muted)}`;

/* ------------------------------------------------------------------ çıktı */

const svgFor = (vx, vw, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${vw}" height="${H}" viewBox="${vx} 0 ${vw} ${H}">${background}\n  ${content}</svg>`;
const render = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  })
    .render()
    .asPng();

// Tuvalin tamamı tek parça çizilip üç dilime bölünür (bkz. make-triptych.mjs).
const all = [panel1, panel2, panel3].join('\n  ');
const b64 = render(svgFor(0, CW, all), CW).toString('base64');
for (let i = 0; i < N; i++) {
  const slice = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><image x="${-i * W}" y="0" width="${CW}" height="${H}" href="data:image/png;base64,${b64}"/></svg>`;
  fs.writeFileSync(path.join(outDir, `hizmetler-${i + 1}.png`), render(slice, W));
}
fs.writeFileSync(path.join(outDir, 'hizmetler-onizleme.png'), render(svgFor(0, CW, all), 2160));
console.log('sosyal/uclu/ → hizmetler-1.png, hizmetler-2.png, hizmetler-3.png, hizmetler-onizleme.png');
