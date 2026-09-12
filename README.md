# CorvenTech

İki yazılımcının ortak girişimlerini tek çatı altında toplayan CorvenTech'in kurumsal portfolyo sitesi.
Görsel dil ve bölüm dizilimi [gaziybstoplulugu](https://github.com/ArdaErenGuler/gaziybstoplulugu) projesini referans alır.

**Teknolojiler:** React · Vite · Tailwind CSS v4

## Kurulum

```bash
npm install
npm run dev      # geliştirme sunucusu → http://localhost:5173
npm run build    # üretim derlemesi → dist/
npm run preview  # derlemeyi yerelde önizle
npm run og       # paylaşım kapak görselini üretir → public/og-cover.png
```

## Yayına alma (cPanel)

Canlı adres: **https://www.corventech.tr**

1. `npm run build` çalıştırın.
2. `dist/` klasörünün **içindekileri** (klasörün kendisini değil) cPanel → File Manager ile `public_html` içine yükleyin. Gizli dosyaları göstermeyi açın, `.htaccess` de yüklenmeli.
3. cPanel → SSL/TLS Status → **Run AutoSSL**. Sertifika gelene kadar `.htaccess` içindeki https yönlendirmesi devreye girmez.
4. Kontrol: `https://www.corventech.tr/og-cover.png` açılmalı; `http://corventech.tr` adresi `https://www.corventech.tr` adresine yönlenmeli.

`public/` içindeki dosyalar (`.htaccess`, `robots.txt`, `sitemap.xml`, `og-cover.png`, `favicon.svg`) derlemede olduğu gibi `dist/` köküne kopyalanır.

Alan adı değişirse şu dört yeri güncelleyin: `index.html` (canonical, og:url, og:image), `src/data/site.js` (`company.url`), `public/robots.txt`, `public/sitemap.xml`, `public/.htaccess`.

## Sayfa yapısı

| Bölüm | İçerik |
| --- | --- |
| Navbar | Logo, 5 bağlantı, "Bize Ulaşın" düğmesi; mobilde sağdan açılan çekmece |
| Hero | Hareketli bağlantı ağı (canvas), başlık ve iki düğme |
| Girişimlerimiz | GülerDepo, dersmate, SiteFlowTR, My-Gen Biyoteknoloji, Brox Digital; "Tümü / Ürünler / Web Siteleri" filtresi ve detay penceresi |
| Çözümlerimiz | 6 hizmet kartı |
| Süreç | 4 adımlı çalışma süreci |
| Hakkımızda | Kısa tanıtım ve iki kurucu kartı (fotoğraf, LinkedIn, GitHub) |
| İletişim | E-posta ve Instagram kartları |
| Footer | Marka, girişimler, hızlı bağlantılar, iletişim |

## Tasarım sistemi

Koyu, mat antrasit-lacivert tema; tokenlar `src/index.css` içindeki `@theme` bloğunda tanımlı:

| Token | Değer | Kullanım |
| --- | --- | --- |
| `ink` | `#0B0F19` | Sayfa zemini |
| `ink-soft` | `#111625` | Şerit bölümler, footer |
| `surface` / `surface-2` | `#161C2E` / `#1C243A` | Kartlar, pencereler, ikincil düğmeler |
| `heading` / `body` / `muted` | `#F8FAFC` / `#E2E8F0` / `#94A3B8` | Başlık, metin, ikincil metin |
| `accent` | `#00B4D8` | Marka vurgusu, birincil düğme, ikonlar |
| `line` | `rgba(255,255,255,.08)` | Kenarlık ve ayraçlar |

Fontlar: **Plus Jakarta Sans** (metin ve başlık), **Space Grotesk** (etiketler).
Camgöbeği zemin üzerindeki metinler, okunabilirlik için koyu renktedir.

## Klasör yapısı

```
src/
├── data/site.js            # Tüm içerik: şirket, iletişim, girişimler, çözümler, süreç, ekip
├── context/UIContext.jsx   # Açık pencere ve bildirim (toast) durumu
├── hooks/                  # useInView, useActiveSection, useScrolled
├── utils/url.js            # Adresten alan adı çıkarma
├── components/
│   ├── layout/             # Navbar, MobileDrawer, Footer
│   ├── ui/                 # Button, Badge, Chip, Card, Modal, Toast, Section, SectionHeader, Icon, …
│   ├── cards/              # VentureCard, SolutionCard, ProcessStep, FounderCard, ContactCard
│   ├── modals/             # VentureModal, ContactModal
│   └── hero/HeroCanvas.jsx # Hero arka plan animasyonu
├── sections/               # Hero, Ventures, Solutions, Process, About, Contact
├── App.jsx
└── index.css               # Tailwind + tasarım tokenları
```

## İçerik güncelleme

Metinlerin tamamı `src/data/site.js` içindedir; bileşenlere dokunmadan düzenlenebilir.

- **Yeni girişim:** `ventures` dizisine bir nesne ekleyin. `type` alanı `product` (Ürün) ya da `website` (Web Sitesi) olmalı; filtre sayıları kendiliğinden güncellenir. `url` alanı kartta ve detay penceresinde site bağlantısı olarak gösterilir.
- **Ekip fotoğrafı:** Görseli `public/images/ekip/` klasörüne koyup ilgili kişinin `photo` alanına yolunu yazın (örn. `/images/ekip/arda-eren-guler.jpg`). Fotoğraf yoksa baş harfler gösterilir.
- **İletişim:** `company.email` ve `company.instagram` alanları; iletişim bölümü, pencere ve footer bu bilgileri kullanır.
- **İkonlar:** `src/components/ui/Icon.jsx` içindeki `PATHS` nesnesine yeni ikon eklenebilir.
