/**
 * CorvenTech — site içerik modeli
 * Tüm metinler, girişimler, çözümler ve ekip bilgileri burada tutulur; bileşenler yalnızca bu veriyi render eder.
 * `icon` alanları components/ui/Icon.jsx içindeki ikon adlarından biri olmalıdır.
 */

export const company = {
  name: 'CorvenTech',
  // Kanonik adres. Değişirse index.html (canonical, og:url, og:image) ve
  // public/robots.txt, public/sitemap.xml, public/.htaccess içindeki adresler de güncellenmeli.
  url: 'https://www.corventech.tr',
  brandSub: 'Yazılım & Girişim',
  motto: 'Fikirden koda, koddan ürüne.',
  description:
    'Kendi girişimlerini geliştiren üç kişilik ekip. İşletmelere web, mobil ve sosyal medya yönetimi hizmeti veriyoruz.',
  email: 'corventech1@gmail.com',
  instagram: { handle: '@corventech.tr', url: 'https://www.instagram.com/corventech.tr/' },
};

/** İletişim kanalları: iletişim bölümü, iletişim penceresi ve footer bu listeyi kullanır. */
export const contactChannels = [
  {
    id: 'email',
    label: 'E-posta',
    value: company.email,
    url: `mailto:${company.email}`,
    icon: 'mail',
    action: 'E-posta Gönder',
    copyable: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: company.instagram.handle,
    url: company.instagram.url,
    icon: 'instagram',
    action: "Instagram'a Git",
    external: true,
  },
];

export const navLinks = [
  { label: 'Girişimlerimiz', href: '#girisimlerimiz' },
  { label: 'Çözümlerimiz', href: '#cozumlerimiz' },
  { label: 'Paketler', href: '#paketler' },
  { label: 'Süreç', href: '#surec' },
  { label: 'Hakkımızda', href: '#hakkimizda' },
  { label: 'İletişim', href: '#iletisim' },
];

export const hero = {
  title: {
    lead: 'Fikirleri Gerçeğe Dönüştüren',
    highlight: 'Kod Mimarisi',
  },
  description:
    'Kurumsal web sitelerinden işletme panellerine, sosyal medya yönetiminden içerik üretimine kadar; hem kendi ürünlerimizi geliştiriyor hem işletmelerin dijital işlerini üstleniyoruz.',
  primaryCta: { label: 'Girişimlerimizi Keşfet', href: '#girisimlerimiz' },
  secondaryCta: { label: 'İletişime Geç' },
};

export const sections = {
  ventures: {
    icon: 'layers',
    tag: 'Girişimlerimiz',
    title: 'Geliştirdiğimiz ürünler ve projeler',
    description:
      'Kendi ürünlerimiz ve hazırladığımız web siteleri. Sitelerini ziyaret edebilir, detaylarına göz atabilirsiniz.',
  },
  solutions: {
    icon: 'code',
    tag: 'Çözümlerimiz',
    title: 'Neler yapıyoruz?',
    description:
      'Kendi ürünlerimizi geliştirirken edindiğimiz deneyimi, işletmenize uygun çözümlere dönüştürüyoruz.',
  },
  packages: {
    icon: 'briefcase',
    tag: 'Paketler',
    title: 'Nasıl çalışmak istersiniz?',
    description:
      'Web sitesi, sosyal medya yönetimi ya da ikisi bir arada. Aşağıdakiler en sık tercih edilen çalışma biçimleri; içerik işinize göre değişebilir.',
    // Fiyat sitede yayınlanmaz; paket içeriği işe göre değiştiği için rakam iletişimde paylaşılır.
    note: 'Paket içerikleri her işte değiştiği için fiyatı sitede yayınlamıyoruz. Ne yapmak istediğinizi yazın, size özel paketi ve fiyatı birlikte belirleyelim.',
  },
  process: {
    icon: 'git-branch',
    tag: 'Süreç',
    title: 'Nasıl çalışıyoruz?',
    description: 'Her projede aynı dört adımı izliyoruz. Böylece her aşamada neler olduğunu bilirsiniz.',
  },
  about: {
    icon: 'users',
    tag: 'Ekibimiz',
    title: 'Hakkımızda',
    description:
      'CorvenTech, kendi girişimlerini geliştiren üç kişilik bir ekip. Fikirleri, insanların gerçekten kullanacağı çalışan ürünlere dönüştürüyoruz.',
  },
  contact: {
    icon: 'mail',
    tag: 'İletişim',
    title: 'Bize ulaşın',
    description:
      'Sorularınız, önerileriniz ve iş birlikleri için e-posta gönderebilir ya da Instagram üzerinden yazabilirsiniz.',
    modalTitle: 'Bizimle İletişime Geçin',
    modalDescription: 'Size uygun kanaldan yazın, en kısa sürede dönüş yapalım.',
  },
};

/** Girişim türleri: kart etiketi ve filtre sekmeleri bu adları kullanır. */
export const ventureTypes = {
  product: 'Ürün',
  website: 'Web Sitesi',
};

export const ventureFilters = [
  { id: 'all', label: 'Tümü' },
  { id: 'product', label: 'Ürünler' },
  { id: 'website', label: 'Web Siteleri' },
];

/**
 * Girişimler ve projeler.
 * Kartta: type, category, name, description ve url.
 * Detay penceresinde: tagline, longDescription, platform, status, modules ve stack.
 * `linkLabel` verilmezse detay penceresindeki düğme "Siteyi Ziyaret Et" yazar.
 */
export const ventures = [
  {
    id: 'gulerdepo',
    type: 'product',
    name: 'GülerDepo',
    category: 'Stok ve Envanter Yönetimi',
    tagline: 'İşletmeye özel stok, maliyet ve harcama takibi',
    description:
      'İşletmelerin stokunu, maliyetini ve günlük harcamalarını takip ettiği web uygulaması. Finans ve avukat modülleri de içeriyor.',
    longDescription:
      'GülerDepo, işletmelerin stok, maliyet ve harcamalarını tek yerden takip etmesi için geliştirildi. Her işletme kendi paneline kullanıcı adı ve şifreyle girer. Panel telefona da uyumludur; sahada hızlıca stok düşülebilir.',
    icon: 'package',
    platform: 'Web paneli (mobil uyumlu)',
    status: 'Yayında',
    modules: [
      { name: 'Maliyet hesabı', description: 'Her ürünün kilo, metre ya da adet başına maliyetini hesaplar.' },
      { name: 'Günlük harcama raporu', description: 'Seçilen günün bütün harcamalarını ve toplam tutarı tek ekranda gösterir.' },
      { name: 'Geçmiş tarihli kayıt', description: 'Unutulan günlerin alış ve kullanım kayıtları sonradan doğru tarihle girilebilir.' },
      { name: 'Telefondan hızlı işlem', description: 'Birden fazla ürün tek tuşla stoktan düşülebilir.' },
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    url: 'https://www.gulerdepo.com',
  },
  {
    id: 'dersmate',
    type: 'product',
    name: 'dersmate',
    category: 'Öğrenci Sosyal Ağı',
    tagline: 'Öğrencilerin buluştuğu, paylaştığı ve birbirine yardım ettiği sosyal ağ',
    description:
      'Öğrenciler için sosyal ağ ve forum. Soru sorulur, kaynak paylaşılır, arkadaş edinilir; bilen öğrenci bilmeyene konuyu anlatır.',
    longDescription:
      'dersmate, öğrencileri aynı yerde buluşturan bir sosyal ağ. Öğrenciler toplulukta soru sorar, kaynak ve deneyim paylaşır, yeni arkadaşlar edinip sohbet eder. Bir konuda zorlanan öğrenci, o konuyu bilen başka bir öğrenciyle buluşup konuyu ondan dinleyebilir. Şimdilik YKS (TYT ve AYT) öğrencilerine odaklanıyor.',
    icon: 'graduation',
    platform: 'Web (mobil uygulama yakında)',
    status: 'Yayında',
    modules: [
      { name: 'Topluluk (forum)', description: 'Sınav, soru ve kaynak gibi başlıklarda öğrenciler yazışır ve birbirine yardım eder.' },
      { name: 'Keşfet', description: 'Derse, konuya ya da üniversiteye göre diğer öğrenciler bulunur.' },
      { name: 'Sohbet', description: 'Arkadaş olunan öğrencilerle birebir mesajlaşılır.' },
      { name: 'Birbirine ders anlatma', description: 'Bir konuyu bilen öğrenci, o konuda zorlanan arkadaşına anlatır.' },
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', '.NET 8', 'PostgreSQL', 'Redis', 'SignalR'],
    url: 'https://www.dersmate.com',
  },
  {
    id: 'siteflowtr',
    type: 'product',
    name: 'SiteFlowTR',
    category: 'Site Yönetim Paneli',
    tagline: 'Web sitenizi kod yazmadan düzenleyin',
    description:
      'Var olan bir web sitesini tarayıcıdan düzenlemeye yarayan panel. Yazılar, görseller, SEO ayarları ve takip kodları tek yerden değişir.',
    longDescription:
      'SiteFlowTR, site sahiplerinin web sitelerini kod bilmeden güncellemesi için geliştirildi. Site panele bir kez bağlanır; sonra sayfalar, görseller ve SEO ayarları buradan düzenlenir. Kullanmak için giriş yapmak gerekir.',
    icon: 'edit',
    platform: 'Web paneli',
    status: 'Yayında',
    modules: [
      { name: 'Sayfa düzenleyici', description: 'Sayfa panelde açılır; yazı ve görseller buradan değiştirilir, hazır bölümler eklenir.' },
      {
        name: 'SEO ayarları',
        description: 'Başlık, açıklama ve görsel etiketleri düzenlenir. Panel sayfaya 100 üzerinden puan verir ve site haritası oluşturur.',
      },
      { name: 'Sayfa yedekleri', description: 'Sayfanın eski sürümleri listelenir, istenirse eski sürüme dönülür.' },
      { name: 'Takip kodları', description: 'Google Analytics, Google Tag Manager, Meta ve TikTok kodları panelden siteye eklenir.' },
    ],
    stack: ['React 19', 'Vite', 'Node.js', 'Express'],
    url: 'https://panel.broxdigital.com',
    linkLabel: 'Panele Git',
  },
  {
    id: 'mygen',
    type: 'website',
    name: 'My-Gen Biyoteknoloji',
    category: 'Ürün Kataloğu Sitesi',
    tagline: 'Laboratuvar ürünlerini bulup fiyat sorabileceğiniz katalog',
    description:
      "İzmir'deki My-Gen Biyoteknoloji için hazırlanan laboratuvar ürünleri kataloğu. Ürün arama, karşılaştırma ve fiyat sorma formu içeriyor.",
    longDescription:
      "My-Gen Biyoteknoloji'nin ELISA kitleri, antikorlar ve proteinler gibi laboratuvar ürünlerini listeleyen katalog sitesi. Ziyaretçi ürün arayabiliyor, ürünleri karşılaştırabiliyor ve formla fiyat sorabiliyor. Sitede satış yapılmıyor.",
    icon: 'flask',
    platform: 'Web sitesi',
    status: 'Yayında',
    modules: [
      { name: 'Ürün arama', description: 'Gen adı ya da ürün kodu yazarken öneriler çıkar; sonuçlar kategoriye göre daraltılır.' },
      { name: 'Ürün karşılaştırma', description: 'Ürünler bir listeye eklenip yan yana karşılaştırılır.' },
      { name: 'Ürün sayfaları', description: 'Her üründe teknik bilgiler, görseller ve PDF kullanım kılavuzu bulunur.' },
      { name: 'Fiyat sorma formu', description: 'Fiyatlar sitede yazmaz; ziyaretçi ürün sayfasındaki formla fiyat sorar.' },
    ],
    stack: ['Node.js', 'Express', 'Tailwind CSS', 'JavaScript'],
    url: 'https://www.mygenbio.com.tr',
  },
  {
    id: 'broxdigital',
    type: 'website',
    name: 'Brox Digital',
    category: 'Ajans Tanıtım Sitesi',
    tagline: 'Dijital pazarlama ajansı için tek sayfalık tanıtım sitesi',
    description:
      'Dijital pazarlama ajansı Brox Digital için hazırlanan tanıtım sitesi. Reklam, web sitesi ve SEO hizmetlerini tek sayfada anlatıyor.',
    longDescription:
      'Brox Digital; Google, Meta, TikTok ve Yandex reklamlarını yöneten, web sitesi kuran ve SEO çalışmaları yapan bir dijital pazarlama ajansı. Tanıtım sitesi hizmetleri, referansları ve sık sorulan soruları tek sayfada topluyor.',
    icon: 'trending-up',
    platform: 'Web sitesi',
    status: 'Yayında',
    modules: [
      { name: 'Hizmet tanıtımı', description: 'Reklam yönetimi, web tasarımı, SEO ve ölçümleme hizmetleri ayrı ayrı anlatılır.' },
      { name: 'Referanslar', description: 'Ajansın çalıştığı markalar ve yapılan işler gösterilir.' },
      { name: 'Sık sorulan sorular', description: 'Ziyaretçinin merak ettiği konular tek yerde cevaplanır.' },
      { name: 'Tek sayfa yapı', description: 'Hakkımızda, hizmetler, referanslar ve iletişim aynı sayfada; menüden ilgili bölüme geçilir.' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://www.broxdigital.com',
  },
];

export const solutions = [
  {
    icon: 'layout',
    title: 'Web Uygulamaları',
    description: 'Tarayıcıda çalışan, hızlı ve kullanışlı uygulamalar: yönetim panellerinden kullanıcı platformlarına kadar.',
  },
  {
    icon: 'smartphone',
    title: 'Mobil Uygulamalar',
    description: 'iOS ve Android için, web sürümüyle aynı verileri kullanan mobil uygulamalar.',
  },
  {
    icon: 'globe',
    title: 'Kurumsal Web Siteleri',
    description: 'Markanızı doğru anlatan, hızlı açılan ve her ekranda düzgün görünen web siteleri.',
  },
  {
    icon: 'briefcase',
    title: 'İşletme Otomasyonu',
    description: 'Stok, cari hesap, fatura ve kasa işlerini tek panelden takip edebileceğiniz yazılımlar.',
  },
  {
    icon: 'server',
    title: 'Sunucu ve Altyapı',
    description: 'Uygulamanızın arkasında sorunsuz çalışan sunucu, veritabanı ve bağlantı altyapısı.',
  },
  {
    icon: 'pen-tool',
    title: 'Arayüz Tasarımı',
    description: 'Kolay anlaşılan, göze hoş gelen ve herkesin rahatça kullanabileceği ekranlar.',
  },
  {
    icon: 'instagram',
    title: 'Sosyal Medya Yönetimi',
    description: 'Hesabınızın içeriğini planlıyor, gönderileri hazırlayıp paylaşıyor ve mesajları takip ediyoruz.',
  },
  {
    icon: 'edit',
    title: 'İçerik ve Görsel Üretimi',
    description: 'Gönderi görselleri, hikâye taslakları ve tanıtım metinleri; markanızın diline uygun şekilde.',
  },
];

/**
 * Hizmet paketleri. Şirket kuruluşu tamamlanana kadar sitede fiyat yayınlanmaz;
 * paketler yalnızca kapsamı anlatır, rakam iletişim üzerinden paylaşılır.
 */
export const packages = [
  {
    id: 'web',
    icon: 'layout',
    name: 'Web Paketi',
    tagline: 'Çok sayfalı kurumsal web sitesi',
    items: [
      'Çok sayfalı, mobil uyumlu kurumsal site',
      'Alan adı, hosting ve kurumsal e-posta kurulumu',
      'Arama motorları için temel düzenlemeler',
      'İçerik paneli: yazıyı ve görseli kendiniz değiştirirsiniz',
      'Google İşletme Profili bağlantısı',
    ],
    footnote: 'Kurulum tek seferlik; site yayına girdikten sonra aylık bakım ve güncellemeyle devam eder.',
  },
  {
    id: 'sosyal-medya',
    icon: 'instagram',
    name: 'Sosyal Medya Paketi',
    tagline: 'Hesabınızı biz yönetelim',
    items: [
      'Ayda 5 gönderi tasarımı ve paylaşımı',
      'Ayda 5 fotoğraf / görsel üretimi',
      'İki günde bir 4 hikâye taslağı',
      'İçerik takvimi ve paylaşım saatleri',
      'Profil düzeni: biyografi, öne çıkanlar, kategori',
      'Aylık erişim ve etkileşim raporu',
    ],
    footnote: 'Aylık çalışır. Gönderi ve hikâye sayısı işinize göre artırılabilir.',
  },
  {
    id: 'web-sosyal-medya',
    icon: 'layers',
    name: 'Web + Sosyal Medya',
    tagline: 'İkisi bir arada, tek elden',
    featured: true,
    items: [
      'Web paketinin tamamı',
      'Sosyal medya paketinin tamamı',
      'Sitede ve sosyal medyada tek görsel dil',
      'Tek ekip, tek muhatap',
      'Önceliklendirilmiş destek',
    ],
    footnote: 'Siteyi yapan ekip sosyal medyayı da yürüttüğü için iki tarafın dili birbirini tutar.',
  },
];

export const process = [
  {
    icon: 'search',
    title: 'Dinliyoruz',
    description: 'Ne istediğinizi ve ürünü kimin kullanacağını birlikte konuşup netleştiriyoruz.',
  },
  {
    icon: 'pen-tool',
    title: 'Planlıyoruz',
    description: 'Kod yazmaya başlamadan önce ekranları ve sistemin nasıl çalışacağını birlikte belirliyoruz.',
  },
  {
    icon: 'code',
    title: 'Geliştiriyoruz',
    description: 'Projeyi adım adım geliştiriyor, her aşamayı test edip size gösteriyoruz.',
  },
  {
    icon: 'rocket',
    title: 'Yayına Alıyoruz',
    description: 'Projeyi yayına alıyor, sonrasında da güncelleme ve destekle yanınızda oluyoruz.',
  },
];

/**
 * Ekip. Fotoğraf eklemek için görseli public/images/ekip/ klasörüne koyup `photo` alanına yolunu yazın
 * (örn. '/images/ekip/arda-eren-guler.jpg'). Fotoğraf yoksa baş harfler gösterilir.
 */
export const founders = [
  {
    id: 'arda-eren-guler',
    name: 'Arda Eren Güler',
    role: 'Kurucu Ortak',
    photo: null,
    links: {
      linkedin: 'https://www.linkedin.com/in/ardaerenglr',
      github: 'https://github.com/ArdaErenGuler',
    },
  },
  {
    id: 'abdullah-cosar',
    name: 'Abdullah Coşar',
    role: 'Kurucu Ortak',
    photo: null,
    links: {
      linkedin: 'https://www.linkedin.com/in/abdullahcosar/',
      github: 'https://github.com/Vellhale',
    },
  },
  {
    id: 'melih-gurevin',
    name: 'Melih Gürevin',
    role: 'Kurucu Ortak',
    photo: null,
    links: {
      linkedin:
        'https://www.linkedin.com/in/gazi-%C3%BCniversitesi-y%C3%B6netim-bili%C5%9Fim-sistemleri-toplulu%C4%9Fu-59583434a',
      github: 'https://github.com/gurevinmelih5-lang',
    },
  },
];
