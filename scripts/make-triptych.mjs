/**
 * Instagram üçlü (panorama) gönderisi: üç görsel profil ızgarasında yan yana tek resim gibi görünür.
 * Çalıştırmak için: node scripts/make-triptych.mjs <girişim-id>      örn. gulerdepo
 *   → sosyal/uclu/<id>-1.png, -2.png, -3.png (1080x1350) ve <id>-onizleme.png
 *
 * Sıra: 1) başlık  2) sitenin ekran görüntüsü (iki yana taşar)  3) özellik listesi.
 * Gönderi sırası Instagram'da 1, 2, 3 şeklinde yüklenir; ızgarada en son yüklenen solda görünür,
 * bu yüzden önce 3'ü, sonra 2'yi, en son 1'i paylaşın.
 * Ekran görüntüsü için önce: npm run ekran. Yazı tipi Segoe UI.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { company, ventures, references } from '../src/data/site.js';

const id = process.argv[2];
const item = [...ventures, ...references].find((v) => v.id === id);
if (!item) {
  console.error(`Kullanım: node scripts/make-triptych.mjs <id>\nGeçerli id'ler: ${[...ventures, ...references].map((v) => v.id).join(', ')}`);
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'sosyal', 'uclu');
fs.mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 1350;
const N = 3;
const CW = W * N;
const M = 84;
const FONT = 'Segoe UI';

// Temalar: "mor" CorvenTech teması (varsayılan), "marka" ürünün kendi renk paleti.
// Üçüncü argüman: node scripts/make-triptych.mjs gulerdepo marka
const THEMES = {
  mor: {
    suffix: '',
    bgTop: '#1b1530',
    bgBottom: '#0b0914',
    glowA: '#8b5cf6',
    glowB: '#6d28d9',
    arcA: '#a06cff',
    arcB: '#c4b5fd',
    head: '#f8fafc',
    body: '#e4e2ee',
    muted: '#a39cb8',
    accent: '#7c3aed',
    accentText: '#a06cff',
    onAccent: '#ffffff',
    iconFill: 'rgba(124,58,237,0.24)',
    iconStroke: 'rgba(167,139,250,0.55)',
    card: 'rgba(255,255,255,0.07)',
    cardStroke: 'rgba(255,255,255,0.18)',
    logo: [
      ['0%', '#b48cff'],
      ['100%', '#5b21b6'],
    ],
  },
};

// "marka" teması: her ürünün sitesinden alınan kendi renkleri.
const BRAND_BASE = {
  suffix: '-marka',
  head: '#ffffff',
  onAccent: '#ffffff',
  card: 'rgba(255,255,255,0.09)',
  cardStroke: 'rgba(255,255,255,0.22)',
};
const BRAND = {
  // GülerDepo: lacivert zemin, sarı vurgu (butonlar), açık mavi ışıma.
  gulerdepo: {
    suffix: '-marka',
    bgTop: '#27508f',
    bgBottom: '#0c1a36',
    glowA: '#4f8ff7',
    glowB: '#ffc107',
    arcA: '#ffc107',
    arcB: '#ffe08a',
    head: '#ffffff',
    body: '#e8eefb',
    muted: '#b4c4e4',
    accent: '#ffc107',
    accentText: '#ffc107',
    onAccent: '#1b1b1b',
    iconFill: 'rgba(255,193,7,0.16)',
    iconStroke: 'rgba(255,193,7,0.6)',
    card: 'rgba(255,255,255,0.09)',
    cardStroke: 'rgba(255,255,255,0.22)',
    logo: [
      ['0%', '#ffe08a'],
      ['100%', '#ffc107'],
    ],
  },
  // dersmate: giriş ekranındaki deniz mavisi geçiş, mavi buton, beyaz yüzeyler.
  dersmate: {
    suffix: '-marka',
    bgTop: '#0a7fc0',
    bgBottom: '#06213f',
    glowA: '#27b4ea',
    glowB: '#0a5fa0',
    arcA: '#5fd0f7',
    arcB: '#c6efff',
    head: '#ffffff',
    body: '#e6f4fc',
    muted: '#b3d6ec',
    accent: '#0a8fd6',
    accentText: '#6dd3fa',
    onAccent: '#ffffff',
    iconFill: 'rgba(95,208,247,0.16)',
    iconStroke: 'rgba(95,208,247,0.6)',
    card: 'rgba(255,255,255,0.10)',
    cardStroke: 'rgba(255,255,255,0.24)',
    logo: [
      ['0%', '#c6efff'],
      ['100%', '#5fd0f7'],
    ],
  },
  // SiteFlowTR: koyu mor-indigo zemin, mavi buton.
  siteflowtr: {
    ...BRAND_BASE,
    bgTop: '#3d1d85',
    bgBottom: '#10062b',
    glowA: '#7c4dff',
    glowB: '#2d7ff9',
    arcA: '#6ea8ff',
    arcB: '#c2d9ff',
    body: '#ece6ff',
    muted: '#bdb0e0',
    accent: '#2f7de1',
    accentText: '#8bbcff',
    iconFill: 'rgba(110,168,255,0.16)',
    iconStroke: 'rgba(110,168,255,0.6)',
    logo: [
      ['0%', '#c2d9ff'],
      ['100%', '#6ea8ff'],
    ],
  },
  // My-Gen: mavi katalog sitesi, turuncu vurgu.
  mygen: {
    ...BRAND_BASE,
    bgTop: '#2f78c4',
    bgBottom: '#0a2140',
    glowA: '#59b4ff',
    glowB: '#ff8a3d',
    arcA: '#7cc4ff',
    arcB: '#d6ecff',
    body: '#e8f3fc',
    muted: '#b6d3ec',
    accent: '#ff8a3d',
    accentText: '#ffb27a',
    onAccent: '#1d1206',
    iconFill: 'rgba(255,138,61,0.16)',
    iconStroke: 'rgba(255,138,61,0.6)',
    logo: [
      ['0%', '#ffd0a8'],
      ['100%', '#ff8a3d'],
    ],
  },
  // Brox Digital: koyu lacivert zemin, turuncu vurgu.
  broxdigital: {
    ...BRAND_BASE,
    bgTop: '#13294f',
    bgBottom: '#050a18',
    glowA: '#2b7fff',
    glowB: '#ff7a1a',
    arcA: '#ff7a1a',
    arcB: '#ffc08a',
    body: '#e9eefc',
    muted: '#aebbd9',
    accent: '#ff7a1a',
    accentText: '#ff9a4d',
    onAccent: '#1c0e03',
    iconFill: 'rgba(255,122,26,0.16)',
    iconStroke: 'rgba(255,122,26,0.6)',
    logo: [
      ['0%', '#ffc08a'],
      ['100%', '#ff7a1a'],
    ],
  },
  // Patika Pet Kuaför: adaçayı yeşili, krem beyaz.
  'patika-pet-kuafor': {
    ...BRAND_BASE,
    bgTop: '#2f5a43',
    bgBottom: '#0c1c14',
    glowA: '#6fa386',
    glowB: '#a9d4a9',
    arcA: '#9fd0a8',
    arcB: '#dff0df',
    head: '#f6fbf6',
    body: '#e6f1e8',
    muted: '#b3cdb9',
    accent: '#6f9a6f',
    accentText: '#b4dcb4',
    iconFill: 'rgba(159,208,168,0.16)',
    iconStroke: 'rgba(159,208,168,0.6)',
    logo: [
      ['0%', '#dff0df'],
      ['100%', '#9fd0a8'],
    ],
  },
  // Bir-Can Pet Kuaför: canlı yeşil.
  'bircan-pet-kuafor': {
    ...BRAND_BASE,
    bgTop: '#1c5a35',
    bgBottom: '#07150d',
    glowA: '#22a455',
    glowB: '#7ee0a6',
    arcA: '#4fd389',
    arcB: '#c9f5da',
    body: '#e5f6ec',
    muted: '#a9cfba',
    accent: '#1fa152',
    accentText: '#74dea1',
    iconFill: 'rgba(79,211,137,0.16)',
    iconStroke: 'rgba(79,211,137,0.6)',
    logo: [
      ['0%', '#c9f5da'],
      ['100%', '#4fd389'],
    ],
  },
  // Tuğçe Mimarlık: koyu zemin, altın vurgu.
  'tugce-mimarlik': {
    ...BRAND_BASE,
    bgTop: '#322a1b',
    bgBottom: '#0b0906',
    glowA: '#c9a45a',
    glowB: '#8a6a2c',
    arcA: '#c9a45a',
    arcB: '#ead9ab',
    head: '#f7f1e4',
    body: '#ece3cf',
    muted: '#b9ae98',
    accent: '#c9a45a',
    accentText: '#d9b66b',
    onAccent: '#1b1405',
    iconFill: 'rgba(201,164,90,0.16)',
    iconStroke: 'rgba(201,164,90,0.6)',
    logo: [
      ['0%', '#ead9ab'],
      ['100%', '#c9a45a'],
    ],
  },
};

// Her ürüne özel metinler: ortadaki başlık (sitenin kendi anlatımı) ve 3. gönderideki çağrı.
const REF_CTA = `Siteniz için yazın · ${company.instagram.handle}`;
const COPY = {
  gulerdepo: { head: ['Kişiye özel,', 'modüler stok.'], cta: `Demo için yazın · ${company.instagram.handle}` },
  dersmate: {
    head: ['Bildiğini anlat,', 'ücretsiz öğren.'],
    cta: 'Ücretsiz katıl · www.dersmate.com',
    icons: ['users', 'search', 'message', 'graduation'], // modül sırasına göre
  },
  siteflowtr: {
    head: ['Kod yazmadan,', 'siz düzenleyin.'],
    cta: `Panel için yazın · ${company.instagram.handle}`,
    icons: ['edit', 'search', 'layers', 'code'],
  },
  // Müşteri siteleri: veride modül/slogan yok, içerik sitelerde görülenlerden yazıldı.
  mygen: {
    tagline: 'Laboratuvar ürünlerini bulup fiyat sorabileceğiniz katalog',
    head: ['Aradığınızı bulun,', 'fiyat sorun.'],
    cta: REF_CTA,
    icons: ['search', 'layers', 'globe', 'edit'],
    modules: [
      { name: 'Ürün arama', description: 'Gen adı ya da ürün kodu yazarken öneriler çıkar; sonuçlar kategoriye göre daraltılır.' },
      { name: 'Ürün karşılaştırma', description: 'Ürünler bir listeye eklenip yan yana karşılaştırılır.' },
      { name: 'Ürün sayfaları', description: 'Her üründe teknik bilgiler, görseller ve PDF kullanım kılavuzu bulunur.' },
      { name: 'Fiyat sorma formu', description: 'Fiyatlar sitede yazmaz; ziyaretçi ürün sayfasındaki formla fiyat sorar.' },
    ],
  },
  broxdigital: {
    tagline: 'Dijital pazarlama ajansı için tek sayfalık tanıtım sitesi',
    head: ['Performansı', 'veriyle büyütüyoruz.'],
    cta: REF_CTA,
    icons: ['briefcase', 'users', 'search', 'layers'],
    modules: [
      { name: 'Hizmet tanıtımı', description: 'Reklam yönetimi, web tasarımı, SEO ve ölçümleme hizmetleri ayrı ayrı anlatılır.' },
      { name: 'Referanslar', description: 'Ajansın çalıştığı markalar ve yapılan işler gösterilir.' },
      { name: 'Sık sorulan sorular', description: 'Ziyaretçinin merak ettiği konular tek yerde cevaplanır.' },
      { name: 'Tek sayfa yapı', description: 'Hakkımızda, hizmetler, referanslar ve iletişim aynı sayfada; menüden ilgili bölüme geçilir.' },
    ],
  },
  'patika-pet-kuafor': {
    tagline: 'Hizmetlerini, galerisini ve randevusunu anlatan pet kuaför sitesi',
    head: ['Dostunuz için', 'buradayız.'],
    cta: REF_CTA,
    icons: ['edit', 'users', 'layers', 'graduation'],
    // Hizmet metinleri sitenin kaynak kodundan (github.com/gurevinmelih5-lang/patika-pet-kuaf-r) alındı.
    modules: [
      { name: 'Köpek tıraşı', description: 'Irk özelliğine ve tüy yapısına uygun makas veya makine kesimi.' },
      { name: 'Kedi tıraşı', description: 'Sedasyonsuz ve anestezisiz, stres seviyesi en düşükte tutularak yapılır.' },
      { name: 'Banyo ve kurutma', description: 'Tüy ve deri tipine özel premium şampuanla yıkama, stressiz kurutma.' },
      { name: 'Irka özel tıraş', description: 'Poodle, Pomeranian, Malta Teriyeri gibi ırkların özel makas kesimi.' },
    ],
  },
  'bircan-pet-kuafor': {
    tagline: 'Bakım, tıraş ve köpek eğitimi hizmetlerini anlatan site',
    head: ['Sevimli dostlarımız', 'bizimle güvende.'],
    cta: REF_CTA,
    icons: ['edit', 'graduation', 'users', 'globe'],
    modules: [
      { name: 'Bakım ve tıraş', description: 'Evcil dostlara özel, hijyenik ve sakin ortamda bakım ve tıraş hizmetleri.' },
      { name: 'Köpek eğitimi', description: 'Köpek eğitimi hizmeti sitede ayrı bir sayfada anlatılıyor.' },
      { name: 'Hakkımızda', description: 'İşletmenin hikâyesi ve çalışma biçimi tek sayfada.' },
      { name: 'Randevu al', description: 'Ziyaretçi sitedeki butonla randevu alabiliyor.' },
    ],
  },
  'tugce-mimarlik': {
    tagline: 'Projelerini ve felsefesini anlatan mimarlık stüdyosu sitesi',
    head: ['Mimarlık ve', 'tasarım stüdyosu.'],
    cta: REF_CTA,
    icons: ['edit', 'briefcase', 'layers', 'globe'],
    modules: [
      { name: 'Mimari proje ruhsatlandırma', description: 'Belediye ruhsat süreçleri ve mimari proje onayları.' },
      { name: 'Mimarlık ve iç mimarlık', description: 'Konut, villa, ticari ve karma kullanımlı yapılar için tasarım.' },
      { name: 'İç mekan ve tadilat', description: 'İç mekan tasarımı ve anahtar teslim tadilat projeleri.' },
      { name: '3 boyutlu görselleştirme', description: 'Gerçekçi 3B görseller ve aydınlatma simülasyonları.' },
    ],
  },
};
const copy = COPY[id] ?? { head: ['Sitemizi', 'inceleyin.'], cta: `Bize yazın · ${company.instagram.handle}` };
// Veride modül/slogan yoksa (müşteri siteleri) COPY'deki metinler kullanılır.
const modulesAll = copy.modules ?? item.modules ?? [];
const taglineText = copy.tagline ?? item.tagline ?? '';
// Ekran görüntüsünde üstten kırpılacak piksel: üst şeritteki telefon / e-posta görünmesin.
const SHOT_TOP = { mygen: 48, 'patika-pet-kuafor': 80, 'bircan-pet-kuafor': 80 };
const shotTop = SHOT_TOP[id] ?? 0;

const themeName = process.argv[3] ?? 'mor';
const T = themeName === 'marka' ? BRAND[id] : THEMES[themeName];
if (!T) {
  console.error(`Geçersiz tema: ${themeName} (mor | marka). "marka" yalnızca şunlar için tanımlı: ${Object.keys(BRAND).join(', ')}`);
  process.exit(1);
}

const ICONS = {
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="0.3"/>',
  server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="0.3"/><circle cx="6" cy="18" r="0.3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  graduation: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
};
const ICON_ORDER = ['briefcase', 'edit', 'layers', 'smartphone', 'server', 'globe', 'search'];

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

const icon = (name, x, y, size, color) =>
  `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;

/* ----------------------------------------------------------- ortak arka plan */

// Her gönderi tek başına anlamlı bir mesaj taşır (başlık, içerik, alt bilgi). Gönderileri ızgarada
// birbirine bağlayan şey yalnızca arka plandır: ışık yayı, alt çizgi, ışımalar ve soluk dev yazı.
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const isReference = references.some((r) => r.id === id); // müşteri sitesi mi, kendi ürünümüz mü
// Ürünler (SiteFlowTR, dersmate, GülerDepo) ile müşteri web siteleri gönderilerde ayrı etiketlenir.
const LABELS = isReference
  ? { kind: 'Web sitesi', live: 'Yaptığımız site', listKicker: 'Site bölümleri', listTitle: 'Sitede neler var?' }
  : { kind: 'Ürün', live: 'Canlı ürün', listKicker: 'Özellikler', listTitle: 'Neler yapıyor?' };
const listTitleSize = Math.min(120, Math.floor((1080 - 84 * 2) / (LABELS.listTitle.length * 0.56)));
// Noktalı (punycode) adres yerine okunur alan adı varsa o kullanılır.
const urlText = item.domain ?? host(item.url);
const ghost = item.name.toLocaleUpperCase('tr-TR');

const background = `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${T.bgTop}"/><stop offset="100%" stop-color="${T.bgBottom}"/></linearGradient>
    <radialGradient id="ga"><stop offset="0%" stop-color="${T.glowA}" stop-opacity="0.5"/><stop offset="100%" stop-color="${T.glowA}" stop-opacity="0"/></radialGradient>
    <radialGradient id="gb"><stop offset="0%" stop-color="${T.glowB}" stop-opacity="0.42"/><stop offset="100%" stop-color="${T.glowB}" stop-opacity="0"/></radialGradient>
    <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${T.arcA}" stop-opacity="0"/><stop offset="30%" stop-color="${T.arcA}" stop-opacity="0.9"/><stop offset="70%" stop-color="${T.arcB}" stop-opacity="0.9"/><stop offset="100%" stop-color="${T.arcA}" stop-opacity="0"/></linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${T.arcA}" stop-opacity="0.9"/><stop offset="100%" stop-color="${T.arcA}" stop-opacity="0.2"/></linearGradient>
    <filter id="sh" x="-20%" y="-20%" width="140%" height="170%"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="glow" x="-5%" y="-100%" width="110%" height="300%"><feGaussianBlur stdDeviation="14"/></filter>
  </defs>
  <rect width="${CW}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${W * 0.5}" cy="${H * 0.95}" rx="900" ry="560" fill="url(#ga)"/>
  <ellipse cx="${W * 1.5}" cy="${H * 0.75}" rx="1400" ry="560" fill="url(#gb)"/>
  <ellipse cx="${W * 2.6}" cy="${H * 0.2}" rx="900" ry="560" fill="url(#ga)"/>
  <text x="${CW / 2}" y="930" font-family="${FONT}" font-size="560" font-weight="800" letter-spacing="-10" text-anchor="middle" fill="none" stroke="${T.arcA}" stroke-opacity="0.12" stroke-width="2.5">${esc(ghost)}</text>
  <path d="M-60 1180 C 700 560, 1500 1100, 2300 620 S 3100 380, 3320 520" fill="none" stroke="url(#arc)" stroke-width="12" opacity="0.75" filter="url(#glow)"/>
  <path d="M-60 1180 C 700 560, 1500 1100, 2300 620 S 3100 380, 3320 520" fill="none" stroke="url(#arc)" stroke-width="3"/>
  <rect x="${M}" y="${H - 130}" width="${CW - M * 2}" height="2" fill="url(#rule)"/>`;

/* ---------------------------------------------------- her gönderide ortak parçalar */

const emblemAt = (ox, k) => `<defs>
    <linearGradient id="lg${k}" gradientUnits="userSpaceOnUse" x1="8" y1="58" x2="56" y2="8">${T.logo.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>
    <mask id="lm${k}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64"><rect width="64" height="64" fill="#000"/><circle cx="32" cy="32" r="21.2" fill="none" stroke="#fff" stroke-width="7.6"/><rect x="24" y="20.4" width="40" height="13.2" fill="#000"/><path d="M27.1 31H40.9L39.8 64H28.2Z" fill="#000"/></mask>
  </defs>
  <g transform="translate(${ox + M} 62) scale(${54 / 64})"><circle cx="32" cy="32" r="21.2" fill="none" stroke="url(#lg${k})" stroke-width="7.6" mask="url(#lm${k})"/><path d="M20.25 23H56L53.6 31H38.3L37.4 58H30.6L29.7 31H17.23A14.8 14.8 0 0 1 20.25 23Z" fill="url(#lg${k})"/></g>
  ${txt(company.name, ox + M + 70, 103, 32, T.head, { weight: 700 })}`;

/**
 * Alt bilgi (seri noktaları) ve marka. CorvenTech logosu ve adresi yalnızca ortadaki (2.) gönderide
 * görünür; yan gönderilerde ürünün kendi adresi yazar.
 */
const chrome = (i) => {
  const ox = i * W;
  const dots = [0, 1, 2]
    .map((d) => `<circle cx="${ox + W / 2 + (d - 1) * 28}" cy="${H - 70}" r="${d === i ? 7 : 5}" fill="${d === i ? T.accentText : 'rgba(255,255,255,0.28)'}"/>`)
    .join('');
  if (i === 1) {
    return `${emblemAt(ox, i)}
  ${txt(isReference ? 'CorvenTech tarafından yapıldı' : 'CorvenTech ürünü', ox + M, H - 62, 24, T.accentText, { weight: 700 })}
  ${txt(host(company.url), ox + W - M, H - 62, 24, T.accentText, { weight: 700, anchor: 'end' })}
  ${dots}`;
  }
  return `${txt(urlText, ox + (i === 0 ? M : W - M), H - 62, 24, T.accentText, { weight: 700, anchor: i === 0 ? 'start' : 'end' })}
  ${dots}`;
};

/* ---------------------------------------------- 1. gönderi: ürünün kendisi */

const titleSize = Math.min(180, Math.floor((W - M * 2) / (item.name.length * 0.56)));
const tagLines = wrap(taglineText, 46, 900);
const panel1 = `${chrome(0)}
  ${txt(`${LABELS.kind} · ${item.category}`.toLocaleUpperCase('tr-TR'), M, 300, 26, T.accentText, { weight: 700, spacing: 4 })}
  ${txt(item.name, M, 300 + titleSize * 0.9, titleSize, T.head, { weight: 800, spacing: -Math.round(titleSize * 0.03) })}
  ${tagLines.map((l, i) => txt(l, M, 300 + titleSize * 0.9 + 90 + i * 58, 46, T.muted, { weight: 600 })).join('\n  ')}
  ${modulesAll
    .slice(0, 3)
    .map((m, k) => {
      const y = 800 + k * 120;
      const w = Math.round(m.name.length * 34 * 0.56 + 104);
      return `<rect x="${M}" y="${y}" width="${w}" height="92" rx="46" fill="${T.card}" stroke="${T.cardStroke}" stroke-width="1.5"/>
  <circle cx="${M + 46}" cy="${y + 46}" r="10" fill="${T.accent}"/>
  ${txt(m.name, M + 78, y + 59, 34, T.body, { weight: 700 })}`;
    })
    .join('\n  ')}`;

/* ---------------------------------------- 2. gönderi: canlı site, ekran görüntüsü */

const ox2 = W;
const shotFile = path.join(root, 'sosyal', 'ekran', `${id}.png`);
const fw = W - M * 2;
const fx = ox2 + M;
const headSize = Math.min(120, Math.floor((W - M * 2) / (Math.max(...copy.head.map((l) => l.length)) * 0.56)));
const bar = 54;
const fy = 580;
const ch = 398; // sitenin üst bölümü (sarı çizgiye kadar); altında beyaz şerit kalmasın
const s = fw / 1440;
let panel2 = `${chrome(1)}
  ${txt(LABELS.live.toLocaleUpperCase('tr-TR'), ox2 + M, 260, 28, T.accentText, { weight: 700, spacing: 6 })}
  ${txt(copy.head[0], ox2 + M, 380, headSize, T.head, { weight: 800, spacing: -4 })}
  ${txt(copy.head[1], ox2 + M, 380 + headSize, headSize, T.accentText, { weight: 800, spacing: -4 })}
  <rect x="${fx + 10}" y="${fy + 44}" width="${fw - 20}" height="${bar + ch}" rx="22" fill="#000" opacity="0.65" filter="url(#sh)"/>
  <rect x="${fx}" y="${fy}" width="${fw}" height="${bar + ch}" rx="22" fill="#120f1e" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
  ${[0, 1, 2].map((d) => `<circle cx="${fx + 34 + d * 26}" cy="${fy + bar / 2}" r="6.5" fill="rgba(255,255,255,0.26)"/>`).join('')}
  <rect x="${fx + 124}" y="${fy + bar / 2 - 15}" width="440" height="30" rx="15" fill="rgba(255,255,255,0.09)"/>
  ${txt(urlText, fx + 146, fy + bar / 2 + 8, 21, T.muted)}`;
if (fs.existsSync(shotFile)) {
  const data = fs.readFileSync(shotFile).toString('base64');
  panel2 += `<defs><clipPath id="sc"><rect x="${fx + 1}" y="${fy + bar}" width="${fw - 2}" height="${ch - 1}"/></clipPath></defs>
  <g clip-path="url(#sc)"><image x="${fx}" y="${fy + bar - shotTop * s}" width="${fw}" height="${900 * s}" href="data:image/png;base64,${data}"/></g>`;
} else {
  console.warn(`! sosyal/ekran/${id}.png yok. Önce "npm run ekran" çalıştırın.`);
}
panel2 += `\n  ${txt(urlText, ox2 + W / 2, fy + bar + ch + 96, 46, T.head, { weight: 800, anchor: 'middle' })}`;

/* ------------------------------------------------ 3. gönderi: özellikler ve çağrı */

const ox3 = W * 2;
const mods = modulesAll.slice(0, 4);
const rowH = 142;
const top = 540;
let panel3 = `${chrome(2)}
  ${txt(LABELS.listKicker.toLocaleUpperCase('tr-TR'), ox3 + M, 260, 28, T.accentText, { weight: 700, spacing: 6 })}
  ${txt(LABELS.listTitle, ox3 + M, 380, listTitleSize, T.head, { weight: 800, spacing: -4 })}`;
panel3 += mods
  .map((m, i) => {
    const y = top + i * rowH;
    const desc = wrap(m.description, 26, W - M * 2 - 120).slice(0, 2);
    return `<line x1="${ox3 + M}" y1="${y - 30}" x2="${ox3 + W - M}" y2="${y - 30}" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  <circle cx="${ox3 + M + 36}" cy="${y + 26}" r="36" fill="${T.iconFill}" stroke="${T.iconStroke}" stroke-width="2"/>
  ${icon((copy.icons ?? ICON_ORDER)[i % (copy.icons ?? ICON_ORDER).length], ox3 + M + 16, y + 6, 40, T.accentText)}
  ${txt(m.name, ox3 + M + 104, y + 22, 36, T.head, { weight: 800 })}
  ${desc.map((l, k) => txt(l, ox3 + M + 104, y + 58 + k * 31, 26, T.muted)).join('\n  ')}`;
  })
  .join('\n  ');
panel3 += `\n  <rect x="${ox3 + M}" y="${H - 250}" width="${W - M * 2}" height="92" rx="20" fill="${T.accent}"/>
  ${txt(copy.cta, ox3 + W / 2, H - 250 + 59, 34, T.onAccent, { weight: 800, anchor: 'middle' })}`;

/* ------------------------------------------------------------------- çıktı */

const svgFor = (vx, vw, content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${vw}" height="${H}" viewBox="${vx} 0 ${vw} ${H}">${background}\n  ${content}</svg>`;
const render = (svg, width) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontDirs: ['C:\\Windows\\Fonts'], defaultFontFamily: FONT, loadSystemFonts: true },
  })
    .render()
    .asPng();

// Tuvalin tamamı tek parça çizilir, sonra üç dilime bölünür: panel sınırlarını aşan parçalar
// (dev başlık, geniş pencere, ışık yayı) komşu gönderide de eksiksiz görünür. Doğrudan dilim
// çizmek eksik kalıyor, ayrıca amblem maskesi görüş alanının dışına taşınca resvg çöküyor.
const full = render(svgFor(0, CW, [panel1, panel2, panel3].join('\n  ')), CW);
const b64 = full.toString('base64');
for (let i = 0; i < N; i++) {
  const slice = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><image x="${-i * W}" y="0" width="${CW}" height="${H}" href="data:image/png;base64,${b64}"/></svg>`;
  fs.writeFileSync(path.join(outDir, `${id}${T.suffix}-${i + 1}.png`), render(slice, W));
}
fs.writeFileSync(path.join(outDir, `${id}${T.suffix}-onizleme.png`), render(svgFor(0, CW, [panel1, panel2, panel3].join('\n  ')), 2160));
console.log(`sosyal/uclu/ → ${id}${T.suffix}-1.png, -2.png, -3.png, -onizleme.png`);
