# CorvenTech

İki yazılımcının ortak girişimlerini tek çatı altında toplayan CorvenTech'in kurumsal portfolyo sitesi.

**Teknolojiler:** React · Vite · Tailwind CSS v4

## Kurulum

```bash
npm install
npm run dev      # geliştirme sunucusu → http://localhost:5173
npm run build    # üretim derlemesi → dist/
npm run preview  # derlemeyi yerelde önizle
npm run og       # paylaşım kapak görselini üretir → public/og-cover.png
npm run ekran    # girişim sitelerinin ekran görüntülerini alır → sosyal/ekran/
npm run sosyal   # Instagram görsellerini üretir → sosyal/
npm run zip      # derleyip cPanel'e yüklenecek tek zip üretir → corventech-site.zip
```

## Yayına alma (cPanel)

Canlı adres: **https://www.corventech.tr**

1. `npm run build` çalıştırın.
2. `npm run zip` ile `corventech-site.zip` üretin; cPanel → File Manager ile `public_html` içine yükleyip **Extract** deyin. (Elle yüklerseniz `dist/` klasörünün içindekileri yükleyin ve gizli dosyaları göstermeyi açın; `.htaccess` de gitmeli.)
3. cPanel → SSL/TLS Status → **Run AutoSSL**. Sertifika gelene kadar `.htaccess` içindeki https yönlendirmesi devreye girmez.
4. Kontrol: `https://www.corventech.tr/og-cover.png` açılmalı; `http://corventech.tr` adresi `https://www.corventech.tr` adresine yönlenmeli.

`public/` içindeki dosyalar (`.htaccess`, `robots.txt`, `sitemap.xml`, `og-cover.png`, `favicon.svg`) derlemede olduğu gibi `dist/` köküne kopyalanır.

Alan adı değişirse şu dört yeri güncelleyin: `index.html` (canonical, og:url, og:image), `src/data/site.js` (`company.url`), `public/robots.txt`, `public/sitemap.xml`, `public/.htaccess`.

## Sosyal medya

`npm run sosyal` komutu `sosyal/` klasörüne Instagram görsellerini üretir: profil fotoğrafı (3 seçenek), tek tek paylaşılacak 9 gönderi, açılış hikâyesi ve öne çıkan kapakları. Gönderilerdeki ekran görüntüleri `npm run ekran` ile kurulu Chrome/Edge üzerinden alınır ve `sosyal/ekran/` içinde tutulur (depoya girmez). Metinler `src/data/site.js`'den okunur; şablon `scripts/make-social.mjs` içindedir. Hesap ayarları, biyografi ve gönderi metinleri için `sosyal/instagram-rehber.md`.

## Sayfa yapısı

| Bölüm | İçerik |
| --- | --- |
| Navbar | Logo, 7 bağlantı, "Bize Ulaşın" düğmesi; aktif bölüm noktayla işaretlenir, mobilde sağdan açılan çekmece |
| Hero | Yörünge animasyonu (canvas), sola dayalı başlık ve iki düğme |
| 01 Girişimlerimiz | Kendi ürünlerimiz: GülerDepo, dersmate, SiteFlowTR; liste satırları ve detay penceresi |
| 02 Referanslar | Müşteriler için yapılan siteler; kart ızgarası, liste uzadıkça satır ekler |
| 03 Çözümlerimiz | 8 hizmet (yazılım + sosyal medya), iki sütunlu çizgili liste |
| 04 Paketler | Web, Sosyal Medya ve birleşik paket; fiyat yazılmaz, teklif düğmesiyle iletişime yönlendirir |
| 05 Süreç | 4 adım, ızgara çizgileriyle bölünmüş alanlar |
| 06 Hakkımızda | Kısa tanıtım ve üç kurucu satırı (fotoğraf, LinkedIn, GitHub) |
| 07 İletişim | WhatsApp, e-posta ve Instagram satırları |
| Footer | Marka, menü, iletişim ve telif satırı |

## Tasarım sistemi

Koyu antrasit-lacivert tema, camgöbeği marka vurgusu. Tokenlar `src/index.css` içindeki `@theme` bloğunda:

| Token | Değer | Kullanım |
| --- | --- | --- |
| `ink` | `#0B0F19` | Sayfa zemini (tüm sayfa tek zemin) |
| `ink-soft` | `#111625` | Pencere içi bilgi kutuları |
| `surface` / `surface-2` | `#161C2E` / `#1C243A` | Pencereler, ikincil düğmeler, satır hover |
| `heading` / `body` / `muted` / `dim` | `#F8FAFC` / `#E2E8F0` / `#94A3B8` / `#7B899D` | Metin hiyerarşisi |
| `accent` / `accent-light` | `#00B4D8` / `#48CAE4` | Marka vurgusu, birincil düğme, ikonlar |
| `line` / `line-strong` | `rgba(255,255,255,.12)` / `.20` | Kenarlık ve ayraçlar |

**Kurallar:**

- **Tek yazı tipi ailesi: Manrope.** Hiyerarşi yalnızca ağırlık (400–800) ve boyutla kurulur; ayrı bir etiket fontu yoktur.
- **Bölüm başlığı:** sıra numarası + ince çizgi + etiket üst satırda, başlık sola dayalı, açıklama geniş ekranda sağ sütunda. Ortalanmış rozet kalıbı kullanılmaz.
- **Yüzeyler:** cam/bevel parlaması, kutu gölgesi ve atmosferik ışık lekesi yok. Ayrım kenarlık, düz zemin tonu ve boşlukla kurulur. Tek gölge tokenı (`shadow-overlay`) yalnızca pencere ve çekmecede kullanılır.
- **Köşeler:** kart ve düğme 8px (`rounded-lg`), etiket 4px (`rounded`), pencere 12px (`rounded-xl`). Hap biçim kullanılmaz.
- **Bölüm ayrımı:** dönüşümlü açık/koyu şerit yok; bölümler üstlerindeki tek saç teli çizgiyle ayrılır. Izgara ayraçları hücre kenarlığıyla çizilir (ebeveyn zemini + `gap-px` yöntemi giriş animasyonuyla çakışır).
- **Arka plan:** yukarıdan aşağı sönümlenen ince nokta ızgarası.
- Camgöbeği zemin üzerindeki metinler, okunabilirlik için koyu renktedir.

## Klasör yapısı

```
src/
├── data/site.js            # Tüm içerik: şirket, iletişim, girişimler, çözümler, süreç, ekip
├── context/UIContext.jsx   # Açık pencere ve bildirim (toast) durumu
├── hooks/                  # useInView, useActiveSection, useScrolled, useFocusTrap
├── utils/url.js            # Adresten alan adı çıkarma
├── components/
│   ├── layout/             # Navbar, MobileDrawer, Footer
│   ├── ui/                 # Button, Badge, Chip, Modal, Toast, Section, SectionHeader, Icon, Logo, Reveal
│   ├── cards/              # VentureRow, FounderCard, ContactCard
│   ├── modals/             # VentureModal, ContactModal
│   └── hero/HeroCanvas.jsx # Hero arka plan animasyonu
├── sections/               # Hero, Ventures, References, Solutions, Packages, Process, About, Contact
├── App.jsx
└── index.css               # Tailwind + tasarım tokenları
```

## İçerik güncelleme

Metinlerin tamamı `src/data/site.js` içindedir; bileşenlere dokunmadan düzenlenebilir.

- **Paket:** `packages` dizisine bir nesne ekleyin. Sitede fiyat yayınlanmaz; `items` kapsamı, `footnote` ise bakım/çalışma biçimini anlatır. Fiyat metni `sections.packages.note` içindedir.
- **Yeni referans:** `references` dizisine `{ id, name, category, location?, domain, url }` ekleyin; ızgara kendiliğinden büyür, başka dosyaya dokunulmaz. `domain` punycode adresin okunur hâlidir.
- **Yeni girişim:** `ventures` dizisine bir nesne ekleyin (yalnızca kendi ürünlerimiz). `url` alanı satırda ve detay penceresinde site bağlantısı olarak gösterilir.
- **Ekip fotoğrafı:** Görseli `public/images/ekip/` klasörüne koyup ilgili kişinin `photo` alanına yolunu yazın (örn. `/images/ekip/arda-eren-guler.jpg`). Fotoğraf yoksa baş harfler gösterilir.
- **İletişim:** `company.email`, `company.instagram` ve `company.whatsapp` alanları; iletişim bölümü, pencere ve footer `contactChannels` listesini kullanır. WhatsApp bağlantısı wa.me biçiminde ülke kodlu ve boşluksuz yazılır. **Numara sitede yazı olarak gösterilmez**, yalnızca bağlantının içinde durur; satırda numara yerine çağrı metni (`value`) görünür, footer ise `shortLabel` alanını kullanır.
- **İkonlar:** `src/components/ui/Icon.jsx` içindeki `PATHS` nesnesine yeni ikon eklenebilir.
