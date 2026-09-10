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
```

## Sayfa yapısı

| Bölüm | İçerik |
| --- | --- |
| Navbar | Logo, 5 bağlantı, "Bize Ulaşın" düğmesi; mobilde sağdan açılan çekmece |
| Hero | Hareketli bağlantı ağı (canvas), başlık, iki CTA, istatistik satırı |
| Girişimlerimiz | GülerDepo ve dersmate kartları; "Detayları Gör" ile detay modalı |
| Çözümlerimiz | 6 hizmet kartı |
| Süreç | 4 adımlı çalışma süreci |
| Teknolojiler | Ön yüz / arka uç / veri grupları |
| Kurucular | Kurucu kartları + iş birliği çağrısı |
| CTA | "Bir fikriniz mi var?" çağrı kutusu |
| İletişim | Bilgi kartı; iletişim formu modalı |
| Footer | 4 sütun: marka, girişimler, bağlantılar, iletişim |

## Tasarım sistemi

Koyu, mat antrasit-lacivert tema; tokenlar `src/index.css` içindeki `@theme` bloğunda tanımlı:

| Token | Değer | Kullanım |
| --- | --- | --- |
| `ink` | `#0B0F19` | Sayfa zemini |
| `ink-soft` | `#111625` | Şerit bölümler, footer |
| `surface` / `surface-2` | `#161C2E` / `#1C243A` | Kartlar, modallar, ikincil düğmeler |
| `heading` / `body` / `muted` | `#F8FAFC` / `#E2E8F0` / `#94A3B8` | Başlık, metin, ikincil metin |
| `accent` | `#00B4D8` | Marka vurgusu, birincil düğme, ikonlar |
| `line` | `rgba(255,255,255,.08)` | Kenarlık ve ayraçlar |

Fontlar: **Plus Jakarta Sans** (metin ve başlık), **Space Grotesk** (etiketler).
Camgöbeği zemin üzerindeki metinler, okunabilirlik için koyu renktedir.

## Klasör yapısı

```
src/
├── data/site.js            # Tüm içerik: şirket, girişimler, çözümler, süreç, kurucular
├── context/UIContext.jsx   # Açık modal ve toast durumu
├── hooks/                  # useInView, useActiveSection, useScrolled
├── components/
│   ├── layout/             # Navbar, MobileDrawer, Footer
│   ├── ui/                 # Button, Badge, Chip, Card, Modal, Toast, FormField, Section, …
│   ├── cards/              # VentureCard, SolutionCard, ProcessStep, FounderCard
│   ├── modals/             # VentureModal, ContactModal
│   └── hero/HeroCanvas.jsx # Hero arka plan animasyonu
├── sections/               # Hero, Ventures, Solutions, Process, TechStack, Founders, CtaBanner, Contact
├── App.jsx
└── index.css               # Tailwind + tasarım tokenları
```

## İçerik güncelleme

Metinlerin tamamı `src/data/site.js` içindedir; bileşenlere dokunmadan düzenlenebilir.

- **Yeni girişim:** `ventures` dizisine bir nesne ekleyin. `links.website` doldurulursa modalda "Siteye Git" düğmesi çıkar.
- **Kurucu ortak:** `founders` dizisindeki ikinci kayıt yer tutucudur (`TODO`); ad, rol, biyografi ve bağlantıları ekleyin.
- **E-posta:** `company.email` yer tutucudur (`TODO`); gerçek adresle değiştirin.
- **İletişim formu:** `company.formspreeEndpoint` boşken form, mesajı hazır bir e-posta olarak kullanıcının posta uygulamasında açar. Bir [Formspree](https://formspree.io) endpoint'i girilirse mesajlar doğrudan gönderilir.
- **İkonlar:** `src/components/ui/Icon.jsx` içindeki `PATHS` nesnesine yeni ikon eklenebilir.
