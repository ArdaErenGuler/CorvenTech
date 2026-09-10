/**
 * CorvenTech — site içerik modeli
 * Tüm metinler ve girişim bilgileri burada tutulur; bileşenler yalnızca bu veriyi render eder.
 * Yeni bir girişim eklemek için `ventures` dizisine bir nesne eklemek yeterlidir.
 */

export const company = {
  name: 'CorvenTech',
  description:
    'İki yazılımcının ortak girişimlerini tek çatı altında toplayan, fikirleri ölçeklenebilir ürünlere dönüştüren teknoloji şirketi.',
  // TODO: Gerçek kurumsal e-posta adresiyle değiştirin.
  email: 'iletisim@corventech.com',
  motto: 'Fikirden koda, koddan ürüne.',
};

export const navLinks = [
  { label: 'Girişimlerimiz', href: '#girisimlerimiz' },
  { label: 'Çözümlerimiz', href: '#cozumlerimiz' },
  { label: 'İletişim', href: '#iletisim' },
];

export const hero = {
  badge: 'İki geliştirici · Üç girişim · Tek çatı',
  title: {
    lead: 'Fikirleri Gerçeğe Dönüştüren',
    highlight: 'Kod Mimarisi',
  },
  description:
    'Envanter ve finans yönetiminden öğrenci ağlarına, kurumsal vitrinlerden rezervasyon sistemlerine; farklı alanlardaki girişimlerimizi aynı mühendislik disipliniyle geliştiriyoruz.',
  primaryCta: { label: 'Girişimlerimizi Keşfet', href: '#girisimlerimiz' },
  secondaryCta: { label: 'İletişime Geç', href: '#iletisim' },
  stats: [
    { value: '03', label: 'Girişim' },
    { value: '02', label: 'Kurucu geliştirici' },
    { value: '01', label: 'Ortak çatı' },
  ],
};

export const sections = {
  ventures: {
    tag: 'Girişimlerimiz',
    title: 'Tek çatı altında, bağımsız modüller',
    description:
      'Her girişimimiz kendi pazarına odaklanan bağımsız bir ürün; hepsi aynı mühendislik disipliniyle tasarlanıp geliştiriliyor.',
  },
  solutions: {
    tag: 'Çözümlerimiz',
    title: 'Girişimlerimizden süzülen, tekrar kullanılabilir mühendislik',
    description:
      'Kendi ürünlerimizi geliştirirken kurduğumuz modüler altyapıları, işletmenize özel çözümlere dönüştürüyoruz.',
    cta: { label: 'Projenizi konuşalım', href: '#iletisim' },
  },
  contact: {
    tag: 'İletişim',
    title: 'Bir fikriniz mi var? Birlikte koda dökelim.',
    description:
      'Yeni bir girişim, kurumsal bir yazılım ya da mevcut sisteminizin yeniden yapılandırılması; ihtiyacınızı dinleyip doğru mimariyi birlikte kuralım.',
    cta: { label: 'Bize Yazın' },
  },
};

/**
 * Girişim kartları.
 * `url` doldurulursa kart tıklanabilir bir bağlantıya dönüşür (yeni sekmede açılır).
 * `icon` değeri, components/ui/Icon.jsx içindeki ikon adlarından biri olmalıdır.
 */
export const ventures = [
  {
    id: 'gulerdepo',
    name: 'GülerDepo',
    category: 'Envanter Yönetimi',
    description:
      'Stok hesabı, finans ve avukat modüllerini tek panelde birleştiren envanter yönetim sistemi.',
    modules: ['Stok Hesabı', 'Finans', 'Avukat Modülü'],
    icon: 'package',
    url: null,
  },
  {
    id: 'dersmate',
    name: 'dersmate',
    category: 'Öğrenci Ağı Platformu',
    description:
      'YKS eşleştirme, dijital kurs ve forum altyapısıyla öğrencileri aynı ağda buluşturan platform.',
    modules: ['YKS Eşleştirme', 'Dijital Kurs', 'Forum'],
    icon: 'graduation',
    url: null,
  },
  {
    id: 'kby-rent-a-car',
    name: 'KBY Rent a Car',
    category: 'Kurumsal Vitrin & Rezervasyon',
    description:
      'Müşteriye özel tasarlanmış kurumsal vitrin ve uçtan uca araç rezervasyon çözümü.',
    modules: ['Kurumsal Vitrin', 'Online Rezervasyon', 'Müşteriye Özel'],
    icon: 'car',
    url: null,
  },
];

export const solutions = [
  {
    icon: 'layers',
    title: 'Kurumsal Yönetim Sistemleri',
    description:
      'Stok, finans ve hukuki süreçleri modüler panellerde toplayan, işletmeye özel yönetim yazılımları.',
  },
  {
    icon: 'users',
    title: 'Platform & Topluluk Altyapıları',
    description:
      'Eşleştirme, forum ve dijital içerik katmanlarıyla kullanıcıları bir araya getiren ağ platformları.',
  },
  {
    icon: 'monitor',
    title: 'Kurumsal Web & Rezervasyon',
    description:
      'Markaya özel vitrin siteleri ve müşterinin doğrudan işlem yapabildiği rezervasyon akışları.',
  },
  {
    icon: 'code',
    title: 'Uçtan Uca Ürün Geliştirme',
    description:
      'Fikir aşamasından yayına; mimari tasarım, geliştirme ve sürdürülebilir bakım tek ekipte.',
  },
];
