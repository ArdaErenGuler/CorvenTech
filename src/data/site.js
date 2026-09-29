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
  // Numara sitede yazı olarak gösterilmez, yalnızca bu bağlantının içinde durur.
  // wa.me numarayı ülke koduyla ve boşluksuz ister.
  whatsapp: {
    url: 'https://wa.me/905368861807?text=Merhaba%2C%20CorvenTech%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.',
  },
};

/** İletişim kanalları: iletişim bölümü, iletişim penceresi ve footer bu listeyi kullanır. */
export const contactChannels = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    // Numara yerine çağrı metni yazılır; numara yalnızca bağlantının içindedir.
    value: 'Mesaj gönderin, aynı gün dönelim',
    shortLabel: 'WhatsApp',
    url: company.whatsapp.url,
    icon: 'message-circle',
    action: "WhatsApp'tan Yaz",
    external: true,
  },
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

// Yedi bağlantı dar masaüstünde taşmasın diye etiketler kısa tutulur.
export const navLinks = [
  { label: 'Girişimler', href: '#girisimlerimiz' },
  { label: 'Referanslar', href: '#referanslar' },
  { label: 'Çözümler', href: '#cozumlerimiz' },
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
    title: 'Kendi geliştirdiğimiz ürünler',
    description:
      'Fikrinden yayına kadar kendi geliştirdiğimiz ürünler. Sitelerini ziyaret edebilir, detaylarına göz atabilirsiniz.',
  },
  solutions: {
    icon: 'code',
    tag: 'Çözümlerimiz',
    title: 'Neler yapıyoruz?',
    description:
      'Kendi ürünlerimizi geliştirirken edindiğimiz deneyimi, işletmenize uygun çözümlere dönüştürüyoruz.',
  },
  references: {
    icon: 'globe',
    tag: 'Referanslar',
    title: 'Müşterilerimiz için yaptığımız siteler',
    description:
      'Teslim ettiğimiz ve yayında olan web siteleri. Kartın üzerine tıklayarak sitelerin kendisini gezebilirsiniz.',
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
      'En hızlısı WhatsApp: yazın, aynı gün dönelim. Dilerseniz e-posta ya da Instagram üzerinden de ulaşabilirsiniz.',
    modalTitle: 'Bizimle İletişime Geçin',
    modalDescription: 'Size uygun kanaldan yazın, en kısa sürede dönüş yapalım.',
  },
};

/**
 * Kendi geliştirdiğimiz ürünler. Müşteriler için yapılan web siteleri burada değil,
 * `references` dizisinde durur.
 * Satırda: category, name, description ve url.
 * Detay penceresinde: tagline, longDescription, platform, status, modules ve stack.
 * `linkLabel` verilmezse detay penceresindeki düğme "Siteyi Ziyaret Et" yazar.
 */
export const ventures = [
  {
    id: 'gulerdepo',
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
 * Müşteriler için yapılan web siteleri. Girişimlerden ayrı tutulur; liste uzadıkça ızgara
 * kendiliğinden satır ekler, bölümün boyu kontrolden çıkmaz.
 * Yeni referans için bu diziye bir nesne eklemek yeterli; başka dosyaya dokunulmaz.
 * `domain` alanı punycode adresin okunur hâlidir; bağlantı `url` üzerinden kurulur.
 */
export const references = [
  {
    id: 'mygen',
    name: 'My-Gen Biyoteknoloji',
    category: 'Laboratuvar Ürünleri Kataloğu',
    domain: 'mygenbio.com.tr',
    url: 'https://www.mygenbio.com.tr',
  },
  {
    id: 'broxdigital',
    name: 'Brox Digital',
    category: 'Dijital Pazarlama Ajansı',
    domain: 'broxdigital.com',
    url: 'https://www.broxdigital.com',
  },
  {
    id: 'tugce-mimarlik',
    name: 'Tuğçe Mimarlık',
    category: 'Mimarlık ve Mühendislik Ofisi',
    location: 'İzmir',
    domain: 'tugcemimarlik.com.tr',
    url: 'https://www.tugcemimarlik.com.tr/',
  },
  {
    id: 'patika-pet-kuafor',
    name: 'Patika Pet Kuaför',
    category: 'Kedi ve Köpek Kuaförü',
    location: 'Balıkesir',
    domain: 'balıkesirpatikapetkuaför.com.tr',
    url: 'https://www.xn--balkesirpatikapetkuafr-fic11l.com.tr/',
  },
  {
    id: 'bircan-pet-kuafor',
    name: 'Bir-Can Pet Kuaför',
    category: 'Pet Kuaförü ve Köpek Eğitimi',
    domain: 'bircanpetkuaför.com.tr',
    url: 'https://www.xn--bircanpetkuafr-7pb.com.tr/',
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
      linkedin: 'https://www.linkedin.com/in/melih-gurevin',
      github: 'https://github.com/gurevinmelih5-lang',
    },
  },
];
