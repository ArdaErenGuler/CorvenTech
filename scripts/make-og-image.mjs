/**
 * Paylaşım (Open Graph) kapak görselini üretir: public/og-cover.png (1200x630).
 * Çalıştırmak için: npm run og
 * Görseli değiştirmek isterseniz aşağıdaki SVG'yi düzenleyip komutu yeniden çalıştırın.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { ventures } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public', 'og-cover.png');

const COLORS = {
  ink: '#0d0b17',
  inkSoft: '#131022',
  heading: '#f8fafc',
  muted: '#a39cb8',
  accent: '#7c3aed',
  accentLight: '#a06cff',
  line: 'rgba(255,255,255,0.12)',
};

/** Hero'daki yörünge çizgilerinin sade bir yansıması. */
const orbits = [
  { rx: 300, ry: 122, rotate: -24, opacity: 0.14 },
  { rx: 405, ry: 186, rotate: 27, opacity: 0.1 },
  { rx: 510, ry: 170, rotate: -62, opacity: 0.08 },
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="logo" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">
      <stop offset="0%" stop-color="#2a1160"/>
      <stop offset="55%" stop-color="#6330cc"/>
      <stop offset="100%" stop-color="#8f5cf7"/>
    </linearGradient>
    <mask id="logoMask">
      <rect width="64" height="64" fill="#000"/>
      <circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/>
      <rect x="24" y="20.4" width="40" height="13.2" fill="#000"/>
      <path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/>
    </mask>
  </defs>

  <rect width="1200" height="630" fill="${COLORS.ink}"/>
  <g transform="translate(820 315)" fill="none" stroke="${COLORS.accentLight}">
    ${orbits
      .map(
        (o) =>
          `<ellipse rx="${o.rx}" ry="${o.ry}" transform="rotate(${o.rotate})" stroke-opacity="${o.opacity}" stroke-width="1.5"/>`,
      )
      .join('\n    ')}
  </g>
  <circle cx="820" cy="315" r="4" fill="${COLORS.accentLight}" fill-opacity="0.5"/>

  <!-- Amblem -->
  <g transform="translate(96 84) scale(1.35)">
    <circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#logo)" stroke-width="7.6" mask="url(#logoMask)"/>
    <path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#logo)"/>
  </g>
  <text x="218" y="132" font-family="Segoe UI" font-size="40" font-weight="700" fill="${COLORS.heading}">CorvenTech</text>
  <text x="219" y="160" font-family="Segoe UI" font-size="17" font-weight="600" letter-spacing="3" fill="${COLORS.accentLight}">YAZILIM &amp; GİRİŞİM</text>

  <!-- Başlık -->
  <text x="96" y="330" font-family="Segoe UI" font-size="68" font-weight="700" fill="${COLORS.heading}">Fikirleri Gerçeğe Dönüştüren</text>
  <text x="96" y="416" font-family="Segoe UI" font-size="68" font-weight="700" fill="${COLORS.accentLight}">Kod Mimarisi</text>

  <!-- Girişimler -->
  <line x1="96" y1="486" x2="1104" y2="486" stroke="${COLORS.line}" stroke-width="1"/>
  <text x="96" y="536" font-family="Segoe UI" font-size="22" font-weight="600" fill="${COLORS.muted}">${ventures.map((v) => v.name).join(' · ')}</text>
  <text x="96" y="576" font-family="Segoe UI" font-size="20" font-weight="600" fill="${COLORS.accentLight}">www.corventech.tr</text>
</svg>`;

const renderer = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: {
    fontDirs: ['C:\\Windows\\Fonts'],
    defaultFontFamily: 'Segoe UI',
    loadSystemFonts: true,
  },
});

fs.writeFileSync(output, renderer.render().asPng());
const kb = Math.round(fs.statSync(output).size / 1024);
console.log(`public/og-cover.png yazıldı — 1200x630, ${kb} KB`);
if (kb > 300) console.warn('UYARI: 300 KB üzeri; WhatsApp önizlemeyi atlayabilir.');
