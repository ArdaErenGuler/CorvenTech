/**
 * Fotoğraflı Instagram kapakları → sosyal/kapaklar/kapak-0N.png
 * Çalıştırmak için: npm run kapaklar
 *
 * sosyal/kapak-gorselleri/ içindeki kapak-01 ... kapak-08 (png/jpg) görsellerinin üstüne
 * başlık, logo ve alt bilgiyi ekler. Olmayan numaralar atlanır.
 * Tek numaralar açık (koyu metin), çift numaralar koyu (açık metin) tema: akışta dama tahtası gibi durur.
 * Görsel üst yarısı boş olacak şekilde üretilmeli (bkz. sosyal/kapak-promptlari.txt).
 * Yazı tipi Segoe UI (yerelde kurulu).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'sosyal', 'kapak-gorselleri');
const outDir = path.join(root, 'sosyal', 'kapaklar');
fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;
const M = 84;
const FONT = 'Segoe UI';

const COVERS = [
  { kicker: 'Web sitesi', title: [['Web siteniz,', false], ['vitrininiz.', true]] },
  { kicker: 'Mobil uygulama', title: [['Fikriniz', false], ['cebinizde.', true]] },
  { kicker: 'Sosyal medya yönetimi', title: [['Hesabınızı', false], ['biz yönetelim.', true]] },
  { kicker: 'Paketlerimiz', title: [['Size uygun', false], ['paketi seçin.', true]] },
  { kicker: 'Nasıl çalışıyoruz?', title: [['Fikirden yayına', false], ['4 adım.', true]] },
  { kicker: 'Arama motoru görünürlüğü', title: [['Aranınca', false], ['bulunun.', true]] },
  { kicker: 'İşletme yazılımı', title: [['Stoğunuz', false], ['kontrol altında.', true]] },
  { kicker: 'İletişim', title: [['Hadi', false], ['konuşalım.', true]] },
];

const THEMES = {
  acik: {
    head: '#1a1033',
    accent: '#6d28d9',
    muted: '#4c3d73',
    fadeTop: '#ffffff',
    fadeBottom: '#ffffff',
    fadeOpacity: 0.78,
    logo: [
      ['0%', '#2a1160'],
      ['55%', '#6330cc'],
      ['100%', '#8f5cf7'],
    ],
  },
  koyu: {
    head: '#f8fafc',
    accent: '#b79cff',
    muted: '#cfc6e6',
    fadeTop: '#05030c',
    fadeBottom: '#05030c',
    fadeOpacity: 0.72,
    logo: [
      ['0%', '#b48cff'],
      ['100%', '#5b21b6'],
    ],
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const txt = (c, x, y, size, fill, { weight = 600, anchor = 'start', spacing, extra = '' } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${spacing ? ` letter-spacing="${spacing}"` : ''} ${extra}>${esc(c)}</text>`;

function findSource(n) {
  for (const ext of ['png', 'jpg', 'jpeg']) {
    const file = path.join(srcDir, `kapak-${String(n).padStart(2, '0')}.${ext}`);
    if (fs.existsSync(file)) return { file, mime: ext === 'png' ? 'image/png' : 'image/jpeg' };
  }
  return null;
}

/** Görselin boyutunu başlığından okur (png/jpg), böylece görseli kadraja doldurabiliriz. */
function imageSize(buf) {
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error('Görsel boyutu okunamadı');
}

function coverSvg(n, src) {
  const t = n % 2 === 1 ? THEMES.acik : THEMES.koyu;
  const c = COVERS[n - 1];
  const buf = fs.readFileSync(src.file);
  const { w, h } = imageSize(buf);
  const scale = Math.max(W / w, H / h);
  const dw = w * scale;
  const dh = h * scale;
  const dx = (W - dw) / 2;
  const dy = H - dh; // görsel alttan hizalanır; üst kırpılır

  // En uzun satır kenar boşluklarına sığacak şekilde başlık boyutu küçülür (en çok 150 px).
  const longest = Math.max(...c.title.map(([text]) => text.length));
  const size = Math.min(150, Math.floor((W - M * 2) / (longest * 0.5)));
  const title = c.title
    .map(
      ([text, hl], i) =>
        `<text x="${M}" y="${290 + i * size}" font-family="${FONT}" font-size="${size}" font-weight="800" letter-spacing="-5" fill="${hl ? t.accent : t.head}">${esc(text)}</text>`,
    )
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="ft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${t.fadeTop}" stop-opacity="${t.fadeOpacity}"/><stop offset="100%" stop-color="${t.fadeTop}" stop-opacity="0"/></linearGradient>
    <linearGradient id="fb" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="${t.fadeBottom}" stop-opacity="${t.fadeOpacity}"/><stop offset="100%" stop-color="${t.fadeBottom}" stop-opacity="0"/></linearGradient>
    <linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">${t.logo.map(([o, col]) => `<stop offset="${o}" stop-color="${col}"/>`).join('')}</linearGradient>
    <mask id="lm" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#000"/><circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/><rect x="24" y="20.4" width="40" height="13.2" fill="#000"/><path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="${t.fadeTop}"/>
  <image x="${dx}" y="${dy}" width="${dw}" height="${dh}" href="data:${src.mime};base64,${buf.toString('base64')}"/>
  <rect width="${W}" height="520" fill="url(#ft)"/>
  <rect y="${H - 260}" width="${W}" height="260" fill="url(#fb)"/>
  <g transform="translate(${M} 62) scale(${54 / 64})"><circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#lg)" stroke-width="7.6" mask="url(#lm)"/><path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#lg)"/></g>
  ${txt(company.name, M + 70, 103, 32, t.head, { weight: 700 })}
  ${txt(c.kicker.toLocaleUpperCase('tr-TR'), W - M, 100, 22, t.accent, { weight: 700, anchor: 'end', spacing: 4 })}
  ${title}
  ${txt('www.corventech.tr', M, H - 62, 26, t.accent, { weight: 700 })}
  ${txt(company.instagram.handle, W - M, H - 62, 26, t.muted, { weight: 700, anchor: 'end' })}
</svg>`;
}

const made = [];
const missing = [];
for (let n = 1; n <= COVERS.length; n++) {
  const src = findSource(n);
  if (!src) {
    missing.push(n);
    continue;
  }
  const png = new Resvg(coverSvg(n, src), {
    fitTo: { mode: 'width', value: W },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  })
    .render()
    .asPng();
  const file = `kapak-${String(n).padStart(2, '0')}.png`;
  fs.writeFileSync(path.join(outDir, file), png);
  made.push(file);
}

console.log(`sosyal/kapaklar/ → ${made.length} kapak: ${made.join(', ') || '-'}`);
if (missing.length) console.log(`Görseli olmayan: ${missing.map((n) => `kapak-${String(n).padStart(2, '0')}`).join(', ')} (sosyal/kapak-gorselleri içine ekleyin)`);
