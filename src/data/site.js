/**
 * CorvenTech — site içerik modeli
 * Tüm metinler, girişimler, çözümler ve kişiler burada tutulur; bileşenler yalnızca bu veriyi render eder.
 * `icon` alanları components/ui/Icon.jsx içindeki ikon adlarından biri olmalıdır.
 */

export const company = {
  name: 'CorvenTech',
  brandSub: 'Yazılım & Girişim',
  motto: 'Fikirden koda, koddan ürüne.',
  description:
    'İki yazılımcının ortak girişimlerini tek çatı altında toplayan, fikirleri ölçeklenebilir ürünlere dönüştüren teknoloji şirketi.',
  // TODO: Gerçek kurumsal e-posta adresiyle değiştirin.
  email: 'iletisim@corventech.com',
  location: 'Ankara, Türkiye',
  // TODO: Şirket GitHub organizasyonu açıldığında adresi güncelleyin.
  social: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/ArdaErenGuler', icon: 'github' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ardaerenglr', icon: 'linkedin' },
  ],
  // Formspree form endpoint'i (örn. "https://formspree.io/f/xxxxxxxx").
  // Boş bırakılırsa iletişim formu, mesajı hazır bir e-posta olarak kullanıcının posta uygulamasında açar.
  formspreeEndpoint: '',
};

export const navLinks = [
  { label: 'Girişimlerimiz', href: '#girisimlerimiz' },
  { label: 'Çözümlerimiz', href: '#cozumlerimiz' },
  { label: 'Süreç', href: '#surec' },
  { label: 'Kurucular', href: '#kurucular' },
  { label: 'İletişim', href: '#iletisim' },
];

export const hero = {
  badge: 'İki geliştirici · İki girişim · Tek çatı',
  title: {
    lead: 'Fikirleri Gerçeğe Dönüştüren',
    highlight: 'Kod Mimarisi',
  },
  description:
    'Envanter ve finans yönetiminden öğrenci ağlarına; farklı alanlardaki girişimlerimizi aynı mühendislik disipliniyle tasarlıyor, geliştiriyor ve büyütüyoruz.',
  primaryCta: { label: 'Girişimlerimizi Keşfet', href: '#girisimlerimiz' },
  secondaryCta: { label: 'Bizimle Çalışın' },
  stats: [
    { value: '02', label: 'Aktif girişim' },
    { value: '02', label: 'Kurucu geliştirici' },
    { value: '03', label: 'Platform: web, mobil, API' },
  ],
};

export const sections = {
  ventures: {
    icon: 'layers',
    tag: 'Girişimlerimiz',
    title: 'Tek çatı altında iki bağımsız ürün',
    description:
      'Her girişimimiz kendi pazarına odaklanan bağımsız bir ürün; hepsi aynı mühendislik disipliniyle tasarlanıp geliştiriliyor.',
  },
  solutions: {
    icon: 'code',
    tag: 'Çözümlerimiz',
    title: 'Girişimlerimizden süzülen mühendislik',
    description:
      'Kendi ürünlerimizi geliştirirken kurduğumuz modüler altyapıları, işletmenize özel çözümlere dönüştürüyoruz.',
  },
  process: {
    icon: 'git-branch',
    tag: 'Nasıl Çalışıyoruz',
    title: 'Keşiften yayına dört adım',
    description:
      'Her projede aynı disiplin: önce anlamak, sonra mimariyi kurmak, ardından test ederek geliştirmek ve yayında da yanınızda kalmak.',
  },
  techStack: {
    icon: 'server',
    tag: 'Teknolojiler',
    title: 'Ürünlerimizde kullandığımız yığın',
    description:
      'Her aracı bir projede üretimde kullandık; listedeki hiçbir teknoloji sadece vitrin için değil.',
  },
  founders: {
    icon: 'users',
    tag: 'Kurucular',
    title: 'İki geliştirici, ortak bir çatı',
    description:
      'CorvenTech, iki yazılımcının bağımsız girişimlerini aynı mühendislik kültürü altında birleştirmesiyle kuruldu.',
  },
  cta: {
    title: 'Bir fikriniz mi var? Birlikte koda dökelim.',
    description:
      'Yeni bir girişim, kurumsal bir yazılım ya da mevcut sisteminizin yeniden yapılandırılması; ihtiyacınızı dinleyip doğru mimariyi birlikte kuralım.',
    button: 'Projenizi Anlatın',
  },
  contact: {
    tag: 'İletişim',
    title: 'Bize ulaşın',
    description:
      'İş birliği teklifleri, proje talepleri veya girişimlerimiz hakkında sorularınız için e-posta gönderebilir ya da iletişim formunu kullanabilirsiniz.',
    modalTitle: 'Bizimle İletişime Geçin',
    modalDescription:
      'Formu doldurun, en kısa sürede size dönüş yapalım. Dilerseniz doğrudan e-posta da gönderebilirsiniz.',
    subjects: ['Yeni proje talebi', 'İş birliği', 'GülerDepo hakkında', 'dersmate hakkında', 'Diğer'],
  },
};

/**
 * Girişimler.
 * `links.github` doluysa kartta ve modalda kaynak bağlantısı gösterilir; `links.website` eklenirse site bağlantısı da çıkar.
 */
export const ventures = [
  {
    id: 'gulerdepo',
    name: 'GülerDepo',
    category: 'Envanter Yönetimi',
    tagline: 'Stok, finans ve hukuki süreçler tek panelde',
    description:
      'Stok hesabı, finans ve avukat modüllerini tek panelde birleştiren, tarayıcı tabanlı envanter yönetim sistemi.',
    longDescription:
      'GülerDepo; küçük ve orta ölçekli işletmelerin stok giriş-çıkışlarını, cari hesaplarını, faturalarını ve kasa hareketlerini tek bir yönetim panelinden takip etmesi için geliştirildi. Modüler yapısı sayesinde yalnızca ihtiyaç duyulan bölümler açılır; raporlama ekranları işletmenin anlık durumunu özetler.',
    icon: 'package',
    platform: 'Web (tarayıcı tabanlı panel)',
    status: 'Aktif',
    modules: [
      { name: 'Stok Hesabı', description: 'Ürün giriş-çıkışları, stok seviyeleri ve stok raporları.' },
      { name: 'Finans', description: 'Kasa hareketleri, gelir-gider ve bütçe takibi.' },
      { name: 'Avukat Modülü', description: 'Hukuki süreç ve dosya takibi.' },
    ],
    features: ['Cari hesap takibi', 'Fatura yönetimi', 'Kasa & bütçe', 'Raporlama', 'Not & hatırlatma'],
    stack: ['PHP', 'SQL', 'HTML / CSS / JS'],
    links: {
      github: 'https://github.com/ArdaErenGuler/gulerdepo',
      website: null,
    },
  },
  {
    id: 'dersmate',
    name: 'dersmate',
    category: 'Öğrenci Ağı Platformu',
    tagline: 'Öğrencilerin birbirine ders verdiği akran ağı',
    description:
      'YKS eşleştirme, dijital kurs ve forum altyapısıyla öğrencileri aynı ağda buluşturan web ve mobil platform.',
    longDescription:
      'dersmate, öğrencilerin iyi oldukları konuyu anlatıp ihtiyaç duydukları dersi ücretsiz aldığı bir akran öğrenme platformu. Para transferi yoktur; ders anlatan taraf puan kazanır ve bu puan seviyeye dönüşür. Modüler monolit mimarisi, modül başına ayrı veritabanı şeması ve gerçek zamanlı sohbet altyapısıyla web ve mobilde aynı iş kurallarını paylaşır.',
    icon: 'graduation',
    platform: 'Web + iOS / Android',
    status: 'Aktif geliştirme',
    modules: [
      { name: 'YKS Eşleştirme', description: 'TYT / AYT ders ve konu bazlı akran eşleştirme.' },
      { name: 'Dijital Kurs', description: 'Planlanmış dersler, takvim ve kanıt akışıyla ders takibi.' },
      { name: 'Forum', description: 'Öneri kartları, tartışma ve paylaşım akışı.' },
    ],
    features: ['Puan ekonomisi', 'Canlı sohbet (SignalR)', 'Branş rozetleri', 'Moderasyon & güvenlik', 'Web + mobil istemci'],
    stack: ['.NET 8', 'PostgreSQL 16', 'Redis 7', 'React + Vite', 'Tailwind CSS', 'React Native (Expo)'],
    links: {
      github: 'https://github.com/Vellhale/dersmate',
      mobile: 'https://github.com/Vellhale/dersmate-mobil',
      website: null,
    },
  },
];

export const solutions = [
  {
    icon: 'layout',
    title: 'Web Uygulama Geliştirme',
    description:
      'Tarayıcıda çalışan, hızlı ve ölçeklenebilir arayüzler; yönetim panellerinden kullanıcı platformlarına.',
    tags: ['React', 'Vite', 'Tailwind CSS'],
  },
  {
    icon: 'smartphone',
    title: 'Mobil Uygulama',
    description: 'Web ile aynı iş kurallarını paylaşan, tek kod tabanından çıkan iOS ve Android istemcileri.',
    tags: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    icon: 'server',
    title: 'Backend & API',
    description: 'Modüler monolit mimari, gerçek zamanlı iletişim ve güvenli kimlik doğrulama katmanları.',
    tags: ['.NET 8', 'PHP', 'SignalR', 'REST'],
  },
  {
    icon: 'database',
    title: 'Veritabanı & Altyapı',
    description: 'Modül başına şema ayrımı, önbellekleme stratejisi ve konteynerli dağıtım.',
    tags: ['PostgreSQL', 'Redis', 'Docker'],
  },
  {
    icon: 'briefcase',
    title: 'Kurumsal Otomasyon',
    description: 'Stok, cari, fatura ve finans süreçlerini tek panelde toplayan işletmeye özel yazılımlar.',
    tags: ['Stok', 'Finans', 'Raporlama'],
  },
  {
    icon: 'pen-tool',
    title: 'Ürün Tasarımı & Arayüz',
    description: 'Tasarım sistemi, yeniden kullanılabilir bileşenler ve erişilebilir, tutarlı arayüzler.',
    tags: ['UI / UX', 'Tasarım Sistemi', 'Erişilebilirlik'],
  },
];

export const process = [
  {
    icon: 'search',
    title: 'Keşif & Analiz',
    description: 'İhtiyacı, kullanıcıyı ve mevcut süreci anlıyor; kapsamı birlikte netleştiriyoruz.',
    deliverable: 'Kapsam dokümanı',
  },
  {
    icon: 'pen-tool',
    title: 'Mimari & Tasarım',
    description: 'Veri modeli, modül sınırları ve arayüz akışları; kod yazılmadan önce mimari kararlar.',
    deliverable: 'Teknik plan & arayüz taslağı',
  },
  {
    icon: 'code',
    title: 'Geliştirme & Test',
    description: 'Modüler geliştirme, sürüm kontrolü ve otomatik testlerle güvenli ilerleme.',
    deliverable: 'Çalışan ara sürümler',
  },
  {
    icon: 'rocket',
    title: 'Yayın & Bakım',
    description: 'Konteynerli yayın, izleme ve geri bildirime dayalı sürekli iyileştirme.',
    deliverable: 'Canlı sistem & destek',
  },
];

export const techStack = [
  { group: 'Ön Yüz', icon: 'layout', items: ['React', 'Vite', 'Tailwind CSS', 'React Native', 'Expo'] },
  { group: 'Arka Uç', icon: 'server', items: ['.NET 8', 'PHP', 'SignalR', 'REST API'] },
  { group: 'Veri & Altyapı', icon: 'database', items: ['PostgreSQL', 'Redis', 'SQL', 'Docker', 'Git'] },
];

export const founders = [
  {
    id: 'arda-eren-guler',
    name: 'Arda Eren Güler',
    role: 'Kurucu Ortak · Full-Stack Geliştirici',
    initials: 'AG',
    focus: ['Web', 'Otomasyon', 'Ürün'],
    bio: 'Gazi Üniversitesi Yönetim Bilişim Sistemleri. GülerDepo\'yu geliştirdi; dersmate\'i kurucu ortağıyla birlikte büyütüyor.',
    links: {
      github: 'https://github.com/ArdaErenGuler',
      linkedin: 'https://www.linkedin.com/in/ardaerenglr',
    },
  },
  {
    // TODO: Kurucu ortağın adı, rolü, biyografisi ve bağlantıları eklenecek.
    id: 'kurucu-ortak',
    name: 'Kurucu Ortak',
    role: 'Kurucu Ortak · Geliştirici',
    initials: 'CT',
    focus: ['Backend', 'Mobil'],
    bio: 'Bu alan kurucu ortağın kısa biyografisi için ayrıldı; src/data/site.js içinden düzenlenebilir.',
    links: {},
  },
];
