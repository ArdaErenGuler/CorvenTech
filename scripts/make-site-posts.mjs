/**
 * Sitelerimiz için Instagram gönderileri (8 adet, 1080x1350) → sosyal/kaydirmali/post-0N-<id>.png
 * ve açıklamalar → sosyal/kaydirmali/aciklamalar-siteler.txt
 * Çalıştırmak için: npm run siteler   (ekran görüntüleri için önce: npm run ekran)
 *
 * Tema, kaydırmalı gönderiyle (make-carousel.mjs) aynı: koyu mor zemin, mor ışımalar.
 * Sıra: kendi ürünlerimiz → referanslar → Tuğçe Mimarlık en sonda.
 * Yazı tipi Segoe UI (yerelde kurulu).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company, ventures, references } from '../src/data/site.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal', 'kaydirmali');
const shotDir = path.join(root, 'sosyal', 'ekran');
fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;
const M = 84;
const INNER = W - M * 2;
const FONT = 'Segoe UI';

const T = {
  bgTop: '#1b1530',
  bgBottom: '#0d0b17',
  heading: '#f8fafc',
  body: '#e4e2ee',
  muted: '#a39cb8',
  accentText: '#a06cff',
  card: 'rgba(255,255,255,0.06)',
  cardStroke: 'rgba(255,255,255,0.16)',
  logo: [
    ['0%', '#b48cff'],
    ['100%', '#5b21b6'],
  ],
};

/* ------------------------------------------------------------------ içerik */

const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const ref = (id) => references.find((r) => r.id === id);
const venture = (id) => ventures.find((v) => v.id === id);

// Ekran görüntüsünün kırpılması: üst şeritte telefon/e-posta olanlar ve çerez şeritleri görünmesin.
const SHOT_TOP = { mygen: 48, 'patika-pet-kuafor': 80, 'bircan-pet-kuafor': 80 };
const SHOT_BOTTOM = { dersmate: 90, mygen: 180, broxdigital: 90, 'patika-pet-kuafor': 70 };
const SHOT_W = 1440;
const SHOT_H = 900;

const tag = (list) => list.map((t) => `#${t}`).join(' ');

/** Her gönderi: görsel için bilgiler + Instagram açıklaması. */
const POSTS = [
  {
    id: 'gulerdepo',
    label: 'Ürün',
    kicker: venture('gulerdepo').category,
    title: venture('gulerdepo').name,
    tagline: venture('gulerdepo').tagline,
    url: host(venture('gulerdepo').url),
    items: ['Maliyet hesabı', 'Günlük harcama', 'Stok takibi'],
    caption: `GülerDepo — işletmeler için stok, maliyet ve harcama takibi.

Depoda ne var, bir ürün size kaça mal oluyor, bugün ne kadar harcadınız? Üçü de tek panelde.

${venture('gulerdepo')
  .modules.slice(0, 4)
  .map((m) => `• ${m.name}`)
  .join('\n')}

Panel telefonda da çalışıyor; sahada stok düşmek için bilgisayar başına geçmiyorsunuz.`,
    tags: ['stoktakip', 'depoyönetimi', 'işletmeyazılımı', 'envanteryönetimi', 'kobi', 'maliyethesabı'],
  },
  {
    id: 'dersmate',
    label: 'Ürün',
    kicker: venture('dersmate').category,
    title: venture('dersmate').name,
    tagline: venture('dersmate').tagline,
    url: host(venture('dersmate').url),
    items: ['Topluluk', 'Keşfet', 'Sohbet'],
    caption: `dersmate — öğrencilerin buluştuğu, paylaştığı ve birbirine yardım ettiği sosyal ağ.

Takıldığın konuyu soruyorsun, bilen anlatıyor; sen de bildiğin dersi anlatıyorsun. Para değil, zaman ve bilgi takas ediliyor.

• Topluluk (forum)
• Keşfet
• Sohbet
• Birbirine ders anlatma

Web'de yayında, mobil uygulaması yolda.`,
    tags: ['öğrenci', 'üniversite', 'eğitim', 'akranöğrenmesi', 'ders', 'dersmate'],
  },
  {
    id: 'siteflowtr',
    label: 'Ürün',
    kicker: venture('siteflowtr').category,
    title: venture('siteflowtr').name,
    tagline: venture('siteflowtr').tagline,
    url: host(venture('siteflowtr').url),
    items: ['Sayfa düzenleyici', 'SEO ayarları', 'Sayfa yedekleri'],
    caption: `SiteFlowTR — web sitenizi kod yazmadan düzenlediğiniz panel.

Bir yazı değişecek ya da bir fotoğraf güncellenecek diye kimseyi beklemiyorsunuz: panele giriyor, düzenliyor, kaydediyorsunuz.

• Sayfa düzenleyici
• SEO ayarları
• Sayfa yedekleri
• Takip kodları

Yaptığımız web sitelerini bu panelle birlikte teslim ediyoruz.`,
    tags: ['webtasarım', 'yönetimpaneli', 'seo', 'kurumsalwebsitesi', 'içerikyönetimi'],
  },
  {
    id: 'mygen',
    label: 'Referans',
    kicker: ref('mygen').category,
    title: ref('mygen').name,
    tagline: 'Laboratuvar ürünlerini bulup fiyat sorabileceğiniz katalog',
    url: host(ref('mygen').url),
    items: ['Ürün arama', 'Ürün karşılaştırma', 'Fiyat sorma formu'],
    caption: `My-Gen Biyoteknoloji — laboratuvar ürünleri kataloğu.

Binlerce ELISA kiti, antikor ve protein arasından aradığını bulup fiyat sorabildiğin bir katalog sitesi hazırladık.

• Ürün arama
• Ürün karşılaştırma
• Ürün sayfaları
• Fiyat sorma formu`,
    tags: ['biyoteknoloji', 'laboratuvar', 'webtasarım', 'kurumsalwebsitesi', 'ürünkataloğu'],
  },
  {
    id: 'broxdigital',
    label: 'Referans',
    kicker: ref('broxdigital').category,
    title: ref('broxdigital').name,
    tagline: 'Dijital pazarlama ajansı için tek sayfalık tanıtım sitesi',
    url: host(ref('broxdigital').url),
    items: ['Hizmet tanıtımı', 'Referanslar', 'Sık sorulan sorular'],
    caption: `Brox Digital — dijital pazarlama ajansı için tek sayfalık tanıtım sitesi.

Hizmetler, referanslar ve sık sorulan sorular tek sayfada; ziyaretçi aşağı kaydırdıkça hikâyeyi baştan sona okuyor.

• Hizmet tanıtımı
• Referanslar
• Sık sorulan sorular
• Tek sayfa yapı`,
    tags: ['webtasarım', 'landingpage', 'dijitalpazarlama', 'tekssayfa', 'kurumsalkimlik'],
  },
  {
    id: 'patika-pet-kuafor',
    label: 'Referans',
    kicker: `${ref('patika-pet-kuafor').category} · ${ref('patika-pet-kuafor').location}`,
    title: ref('patika-pet-kuafor').name,
    tagline: 'Güvenli ve hijyenik bakım anlatan pet kuaför sitesi',
    url: host(ref('patika-pet-kuafor').domain),
    items: ['Hizmetler', 'Galeri', 'WhatsApp randevu'],
    caption: `Patika Pet Kuaför (Balıkesir) — kedi ve köpek kuaförü için web sitesi hazırladık.

Hizmetler, galeri ve sık sorulan sorular bir arada; randevu için tek dokunuşla WhatsApp'a geçiliyor.

• Hizmetler
• Galeri
• Sık sorulan sorular
• WhatsApp ile randevu`,
    tags: ['petkuaför', 'köpekkuaförü', 'kedibakımı', 'balıkesir', 'webtasarım', 'kurumsalwebsitesi'],
  },
  {
    id: 'bircan-pet-kuafor',
    label: 'Referans',
    kicker: ref('bircan-pet-kuafor').category,
    title: ref('bircan-pet-kuafor').name,
    tagline: 'Bakım, tıraş ve köpek eğitimi hizmetlerini anlatan site',
    url: host(ref('bircan-pet-kuafor').domain),
    items: ['Hizmetler', 'Köpek eğitimi', 'Randevu al'],
    caption: `Bir-Can Pet Kuaför ve Köpek Eğitimi — bakım ve eğitim hizmetleri için web sitesi.

Hizmetler ve köpek eğitimi ayrı sayfalarda anlatılıyor; ziyaretçi tek tıkla randevu alıyor.

• Hizmetler
• Köpek eğitimi
• Hakkımızda
• Randevu`,
    tags: ['petkuaför', 'köpekeğitimi', 'köpekbakımı', 'webtasarım', 'kurumsalwebsitesi'],
  },
  {
    id: 'tugce-mimarlik',
    label: 'Referans',
    kicker: `${ref('tugce-mimarlik').category} · ${ref('tugce-mimarlik').location}`,
    title: ref('tugce-mimarlik').name,
    tagline: 'Projelerini ve felsefesini anlatan mimarlık stüdyosu sitesi',
    url: host(ref('tugce-mimarlik').domain),
    items: ['Projeler', 'Felsefe ve stüdyo', 'Randevu al'],
    caption: `Tuğçe Mimarlık (İzmir) — mimarlık ve mühendislik ofisi için web sitesi.

Projeler, ofisin felsefesi ve çalışma alanları tek sitede; ziyaretçi buradan randevu alabiliyor.

• Projelerimiz
• Felsefemiz ve stüdyo
• Disiplinler
• Randevu al`,
    tags: ['mimarlık', 'içmimari', 'izmir', 'mimarlıkofisi', 'webtasarım', 'kurumsalwebsitesi'],
  },
];

/* ------------------------------------------------------------- çizim yardımcıları */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

const txt = (content, { x, y, size, weight = 600, fill = T.heading, anchor = 'start', spacing }) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${
    spacing ? ` letter-spacing="${spacing}"` : ''
  }>${esc(content)}</text>`;

function lines(arr, { x, y, size, weight = 600, fill = T.heading, lh = 1.3 }) {
  return {
    svg: arr.map((l, i) => txt(l, { x, y: y + i * size * lh, size, weight, fill })).join(''),
    end: y + (arr.length - 1) * size * lh,
  };
}

const emblem = (x, y, size) => `<defs>
    <linearGradient id="lg" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">
      ${T.logo.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}
    </linearGradient>
    <mask id="lm" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
      <rect width="64" height="64" fill="#000"/>
      <circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/>
      <rect x="24" y="20.4" width="40" height="13.2" fill="#000"/>
      <path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/>
    </mask>
  </defs>
  <g transform="translate(${x} ${y}) scale(${size / 64})">
    <circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#lg)" stroke-width="7.6" mask="url(#lm)"/>
    <path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#lg)"/>
  </g>`;

/** Zemin + ışımalar + yörüngeler (kaydırmalı gönderiyle aynı görünüm). */
function backdrop(glowY) {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${T.bgTop}"/><stop offset="100%" stop-color="${T.bgBottom}"/></linearGradient>
    <radialGradient id="ga"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.4"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/></radialGradient>
    <radialGradient id="gb"><stop offset="0%" stop-color="#6d28d9" stop-opacity="0.36"/><stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.3}" cy="${glowY - 40}" rx="700" ry="520" fill="url(#ga)"/>
  <ellipse cx="${W * 0.85}" cy="${glowY + 120}" rx="620" ry="480" fill="url(#gb)"/>
  <g fill="none" stroke="#a06cff" stroke-width="1.6">
    <ellipse cx="${W}" cy="${H * 0.86}" rx="640" ry="190" transform="rotate(-14 ${W} ${H * 0.86})" stroke-opacity="0.16"/>
    <ellipse cx="0" cy="${H * 0.12}" rx="620" ry="170" transform="rotate(10 0 ${H * 0.12})" stroke-opacity="0.14"/>
  </g>`;
}

/** Ekran görüntüsünü tarayıcı çerçevesi içinde çizer. */
function browserShot(id, { x, y, w, h, url }) {
  const file = path.join(shotDir, `${id}.png`);
  const bar = 54;
  const frame = `<defs><filter id="sh" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="26"/></filter></defs>
    <rect x="${x + 10}" y="${y + 34}" width="${w - 20}" height="${bar + h}" rx="18" fill="#000" opacity="0.6" filter="url(#sh)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${bar + h}" rx="18" fill="#120f1e" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
    ${[0, 1, 2].map((i) => `<circle cx="${x + 32 + i * 26}" cy="${y + bar / 2}" r="6.5" fill="rgba(255,255,255,0.22)"/>`).join('')}
    <rect x="${x + 124}" y="${y + bar / 2 - 15}" width="${Math.min(480, w - 170)}" height="30" rx="15" fill="rgba(255,255,255,0.08)"/>
    ${txt(url, { x: x + 146, y: y + bar / 2 + 8, size: 21, weight: 600, fill: T.muted })}
    <line x1="${x}" y1="${y + bar}" x2="${x + w}" y2="${y + bar}" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>`;

  if (!fs.existsSync(file)) {
    console.warn(`  ! ${id}.png yok — önce "npm run ekran" çalıştırın.`);
    return frame;
  }

  const sy = SHOT_TOP[id] ?? 0;
  const sb = SHOT_BOTTOM[id] ?? 0;
  const scale = Math.max(w / SHOT_W, h / (SHOT_H - sy - sb));
  const dw = SHOT_W * scale;
  const dx = x - (dw - w) / 2;
  const dy = y + bar - sy * scale;
  const data = fs.readFileSync(file).toString('base64');
  return `${frame}
    <defs><clipPath id="clip"><rect x="${x + 1}" y="${y + bar}" width="${w - 2}" height="${h - 1}"/></clipPath></defs>
    <g clip-path="url(#clip)"><image x="${dx}" y="${dy}" width="${dw}" height="${SHOT_H * scale}" href="data:image/png;base64,${data}"/></g>`;
}

/** Yuvarlak kenarlı özellik etiketleri; sığdığı kadarını tek satıra dizer. */
function chips(items, y, size = 27) {
  let x = M;
  const out = [];
  for (const item of items) {
    const w = Math.round(item.length * size * 0.55 + 46);
    if (x + w > W - M) break;
    out.push(`<rect x="${x}" y="${y}" width="${w}" height="${size + 26}" rx="${(size + 26) / 2}" fill="${T.card}" stroke="${T.cardStroke}" stroke-width="1.5"/>
      <circle cx="${x + 22}" cy="${y + (size + 26) / 2}" r="5" fill="#7c3aed"/>
      ${txt(item, { x: x + 38, y: y + (size + 26) / 2 + size * 0.36, size, weight: 600, fill: T.body })}`);
    x += w + 14;
  }
  return out.join('\n    ');
}

function postSvg(p, n, total) {
  const shotId = p.id;
  const titleBlock = lines(wrap(p.title, 92, INNER), { x: M, y: 296, size: 92, weight: 800, lh: 1.08 });
  const tagBlock = lines(wrap(p.tagline, 33, INNER), {
    x: M,
    y: titleBlock.end + 62,
    size: 33,
    fill: T.muted,
    lh: 1.38,
  });
  const frameY = tagBlock.end + 54;
  const avail = SHOT_H - (SHOT_TOP[shotId] ?? 0) - (SHOT_BOTTOM[shotId] ?? 0);
  const frameH = Math.min(H - 150 - 40 - frameY - 54, Math.round(avail * (INNER / SHOT_W) * 1.04));
  const chipY = frameY + 54 + frameH + 44;
  const pill = `<rect x="${W - M - (p.label.length * 14 + 44)}" y="66" width="${p.label.length * 14 + 44}" height="46" rx="23" fill="${T.card}" stroke="${T.cardStroke}" stroke-width="1.5"/>
    ${txt(p.label, { x: W - M - (p.label.length * 14 + 44) / 2, y: 97, size: 24, weight: 700, fill: T.body, anchor: 'middle' })}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${backdrop(frameY + (frameH + 54) / 2)}
    ${emblem(M, 62, 54)}
    ${txt(company.name, { x: M + 70, y: 103, size: 32, weight: 700 })}
    ${pill}
    ${txt(p.kicker.toLocaleUpperCase('tr-TR'), { x: M, y: 214, size: 26, weight: 700, fill: T.accentText, spacing: 5 })}
    ${titleBlock.svg}
    ${tagBlock.svg}
    ${browserShot(shotId, { x: M, y: frameY, w: INNER, h: frameH, url: p.url })}
    ${chips(p.items, chipY)}
    ${txt('www.corventech.tr', { x: M, y: H - 62, size: 26, weight: 700, fill: T.accentText })}
  </svg>`;
}

/* ---------------------------------------------------------------------- çıktı */

const made = [];
POSTS.forEach((p, i) => {
  const n = i + 1;
  const file = `post-${String(n).padStart(2, '0')}-${p.id}.png`;
  const png = new Resvg(postSvg(p, n, POSTS.length), {
    fitTo: { mode: 'width', value: W },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  })
    .render()
    .asPng();
  fs.writeFileSync(path.join(outDir, file), png);
  made.push({ file, p });
});

const bar = '='.repeat(50);
const captions = made
  .map(
    ({ file, p }, i) => `${bar}
${i + 1} — ${p.title}   [${file}]
${bar}

${p.caption}

${host(company.url)}

${tag(p.tags)} #corventech`,
  )
  .join('\n\n');

fs.writeFileSync(
  path.join(outDir, 'aciklamalar-siteler.txt'),
  `CorvenTech — Instagram gönderi açıklamaları (sitelerimiz)
Sırayla kopyalayıp yapıştırın. Görsel adı her başlığın yanında.

${captions}
`,
);

console.log(`sosyal/kaydirmali/ → ${made.length} gönderi + aciklamalar-siteler.txt`);
for (const m of made) console.log(`  ${m.file}`);
