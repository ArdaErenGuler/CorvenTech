# CorvenTech

İki yazılımcının ortak girişimlerini tek çatı altında toplayan CorvenTech'in kurumsal portfolyo sitesi.

**Teknolojiler:** React · Vite · Tailwind CSS v4

## Kurulum

```bash
npm install
npm run dev      # geliştirme sunucusu → http://localhost:5173
npm run build    # üretim derlemesi → dist/
npm run preview  # derlemeyi yerelde önizle
```

## Tasarım sistemi

Flat (2D) tasarım: gradient, 3D efekt ve gölge yok. Tokenlar `src/index.css` içindeki `@theme` bloğunda tanımlı:

| Token          | Değer     | Kullanım                          |
| -------------- | --------- | --------------------------------- |
| `white`        | `#FFFFFF` | Zemin                             |
| `accent`       | `#00B4D8` | Vurgu, ikon, buton                |
| `accent-soft`  | `#E6F7FB` | İkon zemini, etiketler            |
| `ink`          | `#2B2D42` | Ana metin                         |
| `ink-muted`    | `#5C5F77` | İkincil metin                     |
| `line`         | `#E7E8EE` | Kenarlık ve ayraçlar              |

Tailwind'in `shadow-*` / `drop-shadow-*` sınıfları tema seviyesinde kapatılmıştır. Camgöbeği zemin üzerindeki metinler, okunabilirlik için koyu arduvaz renktedir.

Fontlar: başlıklar **Poppins**, metin **Inter**.

## Klasör yapısı

```
src/
├── data/site.js            # Tüm içerik (girişimler, çözümler, metinler)
├── hooks/                  # useInView, useActiveSection, useScrolled
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── ui/                 # Container, Section, SectionHeader, Button, Icon, Logo, Reveal
│   └── cards/              # VentureCard, SolutionItem
├── sections/               # Hero, Ventures, Solutions, Contact
├── App.jsx
└── index.css               # Tailwind + tasarım tokenları
```

## İçerik güncelleme

Metinlerin tamamı `src/data/site.js` içindedir; bileşenlere dokunmadan düzenlenebilir.

- **Yeni girişim eklemek:** `ventures` dizisine bir nesne ekleyin. `url` alanı doldurulursa kart tıklanabilir bağlantıya dönüşür.
- **E-posta:** `company.email` alanı şu an yer tutucudur; gerçek adresle değiştirin.
- **İkonlar:** `src/components/ui/Icon.jsx` içindeki `PATHS` nesnesine yeni ikon eklenebilir.
